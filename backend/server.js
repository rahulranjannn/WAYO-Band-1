require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendAdminNotification, sendUserConfirmation } = require('./emailService');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');

let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });
} else {
    console.warn('WARNING: Missing RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET environment variables.');
}

const app = express();
app.set('trust proxy', 1);

const PORT = process.env.PORT || 5000;

// Strict CORS Configuration
app.use(cors({ origin: [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173'] }));

// Basic middlewares
// We must parse raw body for Razorpay Webhooks. We create a middleware hook for it.
app.use('/api/webhook/razorpay', express.raw({ type: 'application/json' }));
app.use(express.json());

// Initialize Supabase Client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('WARNING: Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
}

if (!supabaseServiceKey) {
    console.warn('WARNING: Missing SUPABASE_SERVICE_ROLE_KEY. Secured backend queries will fail.');
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key');
const supabaseAdmin = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || 'placeholder_key');

// Health Check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'WAYO Band backend API is running' });
});

/*
 * Note: Add your exact route logic below. 
 * E.g., handling form submissions and sending to Supabase or mailing with Nodemailer.
 */

// Rate Limiting Config
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per block
    message: { error: 'Too many requests, please try again later.' }
});

// Example: Waitlist Registration
app.post('/api/waitlist', apiLimiter, async (req, res) => {
    const { name, phone, email, city, target_user } = req.body;

    if (!name || !phone || !email || !city || !target_user) {
        return res.status(400).json({ error: 'Missing required waitlist fields.' });
    }

    const { data, error } = await supabase
        .from('waitlist_reservations')
        .insert([{
            name,
            phone,
            email,
            city,
            wayo_is_for_my: target_user
        }]);

    if (error) {
        console.error('Waitlist insertion error:', error);
        return res.status(500).json({ error: 'Failed to save waitlist reservation.' });
    }

    // Async send notifications
    sendAdminNotification({ name, phone, email, city, target_user }, 'waitlist');
    sendUserConfirmation(email, name, 'waitlist');

    res.status(201).json({ message: 'Waitlist reservation successful', data });
});

// Example: Contact Query
app.post('/api/contact', apiLimiter, async (req, res) => {
    const { name, email, phone, topic, message } = req.body;

    if (!name || !email || !topic || !message) {
        return res.status(400).json({ error: 'Missing required contact fields.' });
    }

    const { data, error } = await supabase
        .from('contact_queries')
        .insert([{
            name,
            email,
            phone: phone || null,  // Phone is optional
            subject: topic,
            message
        }]);

    if (error) {
        console.error('Contact query insertion error:', error);
        return res.status(500).json({ error: 'Failed to save contact query.' });
    }

    // Async send notifications
    sendAdminNotification({ name, email, phone, topic, message }, 'contact');
    sendUserConfirmation(email, name, 'contact');

    res.status(201).json({ message: 'Contact query submitted successfully', data });
});

// Product Review
app.post('/api/reviews', async (req, res) => {
    const { reviewer_name, rating, review_text } = req.body;

    if (!reviewer_name || !rating || !review_text) {
        return res.status(400).json({ error: 'Missing required review fields.' });
    }

    const { data, error } = await supabase
        .from('product_reviews')
        .insert([{
            reviewer_name,
            rating,
            review_text
        }]);

    if (error) {
        console.error('Product review insertion error:', error);
        return res.status(500).json({ error: 'Failed to save product review.' });
    }

    res.status(201).json({ message: 'Review submitted successfully', data });
});

// Admin Data Extractor Dashboard hook
app.get('/api/admin/data', async (req, res) => {
    try {
        const [ordersRes, promosRes, waitlistRes, contactsRes, reviewsRes] = await Promise.all([
            supabaseAdmin.from('orders').select('*').order('created_at', { ascending: false }),
            supabaseAdmin.from('promo_codes').select('*'),
            supabaseAdmin.from('waitlist_reservations').select('*'), // Crash removed, no tracking on column 
            supabaseAdmin.from('contact_queries').select('*').order('created_at', { ascending: false }),
            supabaseAdmin.from('product_reviews').select('*') // Fallback pure fetch mapping 
        ]);

        res.json({
            orders: ordersRes.data || [],
            promos: promosRes.data || [],
            waitlist: waitlistRes.data || [],
            contacts: contactsRes.data || [],
            reviews: reviewsRes.data || []
        });
    } catch (error) {
        console.error('Admin Fetch Error:', error);
        res.status(500).json({ error: 'Failed to fetch admin data' });
    }
});

// Fetch User Specific Orders Bypassing RLS
app.get('/api/orders/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) return res.status(400).json({ error: "User ID required" });

        const { data, error } = await supabaseAdmin
            .from('orders')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data || []);
    } catch (err) {
        console.error('User Orders Fetch Error:', err);
        res.status(500).json({ error: 'Failed to fetch user orders' });
    }
});

// Validate Promo Code
app.post('/api/validate-promo', async (req, res) => {
    try {
        const { code } = req.body;
        if (!code) {
            return res.status(400).json({ error: "Promo code required." });
        }

        const { data, error } = await supabaseAdmin
            .from('promo_codes')
            .select('*')
            .eq('code', code.toUpperCase())
            .eq('is_active', true)
            .single();

        if (error || !data) {
            return res.status(400).json({ error: "Invalid or expired code" });
        }

        res.json(data);
    } catch (err) {
        console.error('Promo Validation Error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/api/admin/update-order', async (req, res) => {
    try {
        const { orderId, newStatus } = req.body;
        const { error } = await supabaseAdmin.from('orders').update({ shipping_status: newStatus }).eq('id', orderId);
        if (error) throw error;
        res.json({ success: true });
    } catch (err) {
        console.error('Update status sync err:', err);
        res.status(500).json({ error: err.message });
    }
});

// Razorpay Order Creation Route
app.post('/api/create-razorpay-order', async (req, res) => {
    try {
        const { items, promoCode, amount } = req.body;
        if (!items || items.length === 0) return res.status(400).json({ error: "Cart is empty" });
        if (!amount || amount <= 0) return res.status(400).json({ error: "Invalid amount" });

        const amountInPaise = Math.round(amount * 100);

        // Razorpay REQUIRES amount, currency, and receipt
        const options = {
            amount: amountInPaise,
            currency: "INR",
            receipt: `rcpt_${Date.now()}`
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error("Razorpay API Error:", error);
        res.status(400).json({ error: error.message || "Failed to create order" });
    }
});

app.post('/api/verify-payment', async (req, res) => {
    try {
        const { 
            razorpay_order_id, razorpay_payment_id, razorpay_signature,
            user_id, customer_email, items_ordered, shipping_address,
            subtotal, promo_code_used, discount_applied, total_amount
        } = req.body;

        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ error: 'Razorpay secret key missing on server.' });
        }

        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            
            // Insert securely via Admin Hook bypassing RLS
            const { error: dbError } = await supabaseAdmin.from('orders').insert([{
                user_id: user_id || 'guest',
                customer_email,
                items_ordered,
                shipping_address,
                subtotal,
                promo_code_used: promo_code_used || null,
                discount_applied: discount_applied || 0,
                total_amount,
                payment_status: 'paid',
                shipping_status: 'processing',
                razorpay_order_id,
                razorpay_payment_id
            }]);

            if (dbError) {
                console.error("Database order insertion error:", dbError);
                return res.status(500).json({ success: false, error: 'Database save failed.' });
            }

            // Async send emails
            sendAdminNotification({ 
                customer_email, 
                total_amount, 
                user_id: user_id || 'guest',
                items_ordered 
            }, 'order');
            
            sendUserConfirmation(customer_email, '', 'order', { total_amount });

            // Meta CAPI
            try {
                console.log("🚀 Starting Meta CAPI Process...");

                if (!process.env.META_PIXEL_ID || !process.env.META_CAPI_TOKEN) {
                    console.error("❌ MISSING META ENV VARIABLES. CAPI ABORTED.");
                } else {
                    const hashData = (data) => data ? crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex') : '';
                    
                    const eventData = {
                        data: [
                            {
                                event_name: "Purchase",
                                event_time: Math.floor(Date.now() / 1000),
                                action_source: "website",
                                user_data: {
                                    client_ip_address: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.ip,
                                    client_user_agent: req.headers['user-agent'],
                                    em: [hashData(customer_email)]
                                },
                                custom_data: {
                                    currency: "INR",
                                    value: total_amount
                                }
                            }
                        ]
                    };

                    if (process.env.META_TEST_EVENT_CODE) {
                        eventData.test_event_code = process.env.META_TEST_EVENT_CODE;
                    }

                    console.log("📦 CAPI Payload:", JSON.stringify(eventData, null, 2));

                    const response = await fetch(`https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(eventData)
                    });

                    console.log("✅ Meta Response:", await response.text());
                }
            } catch (capiErr) {
                console.error("🔥 CAPI CRASH:", capiErr);
            }

            res.json({ success: true, message: 'Payment verified and saved successfully' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ success: false, error: 'Payment verification failed' });
    }
});

// Razorpay Webhook Fulfillment 
app.post('/api/webhook/razorpay', (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) return res.status(500).send("Webhook secret missing on server.");

    const signature = req.headers['x-razorpay-signature'];

    // Secure Crypto verification hashing against the raw buffer!
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(req.body);
    const digest = shasum.digest('hex');

    if (digest === signature) {
        // Since we bypassed JSON parsing above, parse safely to use body logic
        const parsedBody = JSON.parse(req.body.toString());
        console.log("Valid Webhook Received:", parsedBody);

        // TODO: Database fulfillment routing 

        res.status(200).send('OK');
    } else {
        console.error("Invalid Razorpay Webhook Signature.");
        res.status(400).send('Invalid signature');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Ensure you have configured your .env file with Supabase credentials.');
});
