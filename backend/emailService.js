const nodemailer = require('nodemailer');

const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.hostinger.com',
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for other ports
    requireTLS: smtpPort !== 465, // specifically useful for port 587
    family: 4, // Forces IPv4 explicitly to combat Render ETIMEDOUT routing issues
    auth: {
        user: process.env.SMTP_USER || 'hello@wayoband.com',
        pass: process.env.SMTP_PASS, // Make sure to provide this in .env
    },
});

/**
 * Sends an email to the admin with the submitted details.
 * @param {Object} data The submitted form data.
 * @param {String} type The type of submission ('waitlist' or 'contact').
 */
const sendAdminNotification = async (data, type) => {
    const adminEmail = process.env.SMTP_USER || 'hello@wayoband.com';

    let subject = '';
    let htmlContent = '';

    if (type === 'waitlist') {
        subject = `🎯 New Waitlist Reservation: ${data.name}`;
        htmlContent = `
      <h2>New Waitlist Sign-up!</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>City:</strong> ${data.city}</p>
      <p><strong>Wayo is for my:</strong> ${data.target_user}</p>
    `;
    } else if (type === 'contact') {
        subject = `✉️ New Contact Query: ${data.topic}`;
        htmlContent = `
      <h2>New Contact Form Submission!</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
      <p><strong>Topic:</strong> ${data.topic}</p>
      <p><strong>Message:</strong><br/>${data.message}</p>
    `;
    }

    const mailOptions = {
        from: adminEmail,
        to: adminEmail, // Emailing the admin account itself
        replyTo: data.email,
        subject: subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Admin notification email sent for ${type}`);
    } catch (error) {
        console.error('Error sending admin notification:', error);
    }
};

/**
 * Sends a confirmation email to the user.
 * @param {String} userEmail The user's email address.
 * @param {String} userName The user's name.
 * @param {String} type The type of submission ('waitlist' or 'contact').
 */
const sendUserConfirmation = async (userEmail, userName, type) => {
    const fromEmail = process.env.SMTP_USER || 'hello@wayoband.com';

    let subject = '';
    let htmlContent = '';

    if (type === 'waitlist') {
        subject = 'Welcome to the Wayo Band Waitlist! 🎉';
        htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4A90E2;">Hi ${userName},</h2>
        <p>Thank you for reserving your spot early for <strong>Wayo Band</strong>!</p>
        <p>We are thrilled to have you on board. You'll be among the first to know when we launch and will receive exclusive updates safely delivered to your inbox.</p>
        <p>Stay tuned!</p>
        <p>Best regards,<br/><strong>The Wayo Band Team</strong></p>
      </div>
    `;
    } else if (type === 'contact') {
        subject = 'We received your message – Wayo Band';
        htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #4A90E2;">Hi ${userName},</h2>
        <p>Thank you for reaching out to us!</p>
        <p>We have successfully received your message and our team will get back to you within <strong>24 hours on working days</strong>.</p>
        <p>We appreciate your patience and look forward to speaking with you soon.</p>
        <p>Best regards,<br/><strong>The Wayo Band Team</strong></p>
      </div>
    `;
    }

    const mailOptions = {
        from: `"Wayo Band" <${fromEmail}>`,
        to: userEmail,
        subject: subject,
        html: htmlContent,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`User confirmation email sent to ${userEmail} for ${type}`);
    } catch (error) {
        console.error('Error sending user confirmation:', error);
    }
};

module.exports = {
    sendAdminNotification,
    sendUserConfirmation,
};
