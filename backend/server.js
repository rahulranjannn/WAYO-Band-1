require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendAdminNotification, sendUserConfirmation } = require('./emailService');
const Razorpay = require('razorpay');
const crypto = require('crypto');

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
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client using environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.warn('WARNING: Missing SUPABASE_URL or SUPABASE_ANON_KEY environment variables.');
}

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder_key');

// Health Check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'WAYO Band backend API is running' });
});

/*
 * Note: Add your exact route logic below. 
 * E.g., handling form submissions and sending to Supabase or mailing with Nodemailer.
 */

// Example: Waitlist Registration
app.post('/api/waitlist', async (req, res) => {
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
app.post('/api/contact', async (req, res) => {
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

// Razorpay Order Creation Route
app.post('/api/create-razorpay-order', async (req, res) => {
  try {
    const { items, promoCode } = req.body;
    if (!items || items.length === 0) return res.status(400).json({ error: "Cart is empty" });

    let calculatedTotal = 0;
    items.forEach(item => {
        let itemPrice = (item.model === 'Wayo Plus' || item.title?.includes('Plus') || item.model === 'plus') ? 1499 : 999;
        if (item.hasExtraBand) itemPrice += 500;
        calculatedTotal += (itemPrice * item.quantity);
    });

    if (promoCode === 'LAUNCH10') {
        calculatedTotal = Math.round(calculatedTotal * 0.9);
    }

    const amountInPaise = Math.round(calculatedTotal * 100);

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

app.post('/api/verify-payment', (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        
        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({ error: 'Razorpay secret key missing on server.' });
        }

        const generated_signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest('hex');

        if (generated_signature === razorpay_signature) {
            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, error: 'Invalid payment signature' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ success: false, error: 'Payment verification failed' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Ensure you have configured your .env file with Supabase credentials.');
});
