require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
const { sendAdminNotification, sendUserConfirmation } = require('./emailService');

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


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Ensure you have configured your .env file with Supabase credentials.');
});
