import { LegalPageLayout } from '../components/LegalPageLayout';
import { SEO } from '../components/SEO';

export function TermsPage() {
    return (
        <LegalPageLayout title="Terms of Service" lastUpdated="March 2026">
            <SEO
                title="Terms of Service | WAYO Band"
                description="WAYO Band Terms of Service. Read the terms governing the use of the WAYO Band website and pre-order registration."
                path="/terms"
            />
            <p>
                <strong>Effective Date:</strong> March 2026<br />
                <strong>Last Updated:</strong> March 2026
            </p>

            <p>
                These Terms of Service ("Terms") govern your use of the WAYO Band website located at wayoband.com ("Site") and any related services provided by PSU Pro Enterprises ("we", "us", or "our"), operating under the brand name WAYO Band.
            </p>
            <p>
                By accessing or using our Site, you agree to be bound by these Terms. If you disagree with any part of these Terms, please do not use our Site.
            </p>

            <hr />

            <h2>1. About WAYO Band</h2>
            <p>
                WAYO Band is a product developed and owned by <strong>PSU Pro Enterprises</strong>, a company registered in India. The WAYO Band is a child safety proximity wristband system currently in pre-launch phase, expected to ship in April 2026.
            </p>

            <hr />

            <h2>2. Use of This Website</h2>
            <h3>2.1 Permitted Use</h3>
            <p>You may use this Site to:</p>
            <ul>
                <li>Learn about the WAYO Band product</li>
                <li>Register your interest in the waitlist</li>
                <li>Contact us with questions</li>
            </ul>

            <h3>2.2 Prohibited Use</h3>
            <p>You may not:</p>
            <ul>
                <li>Use the Site for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to any part of the Site</li>
                <li>Copy, reproduce, or redistribute any content without permission</li>
                <li>Submit false or misleading information in our waitlist form</li>
            </ul>

            <hr />

            <h2>3. Waitlist Registration</h2>
            <p>By registering on our waitlist, you:</p>
            <ul>
                <li>Provide accurate personal information (name, phone, email, city)</li>
                <li>Consent to receive WhatsApp and email communications from <strong>PSU Pro Enterprises</strong> regarding WAYO Band's launch</li>
                <li>Understand that registration does not constitute a purchase or guarantee of product availability</li>
                <li>Can withdraw your registration at any time by contacting us</li>
            </ul>
            <p><strong>No payment is required or collected at registration.</strong></p>

            <hr />

            <h2>4. Intellectual Property</h2>
            <p>
                All content on this Site — including the WAYO Band name, logo, product concept, copy, images, and design — is the intellectual property of <strong>PSU Pro Enterprises</strong> and is protected under applicable Indian intellectual property laws.
            </p>
            <p>
                You may not reproduce, distribute, or create derivative works from any content on this Site without our prior written consent.
            </p>

            <hr />

            <h2>5. Disclaimer of Warranties</h2>
            <p>
                The Site and its content are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied.
            </p>
            <p><strong>PSU Pro Enterprises</strong> does not warrant that:</p>
            <ul>
                <li>The Site will be uninterrupted or error-free</li>
                <li>Product specifications, features, or launch dates are final and may change without notice</li>
                <li>Any information on the Site is complete or current</li>
            </ul>

            <hr />

            <h2>6. Limitation of Liability</h2>
            <p>
                To the fullest extent permitted by law, <strong>PSU Pro Enterprises</strong> shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use this Site or the WAYO Band product.
            </p>

            <hr />

            <h2>7. Changes to Terms</h2>
            <p>
                We reserve the right to modify these Terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the Site after changes constitutes acceptance of the new Terms.
            </p>

            <hr />

            <h2>8. Governing Law</h2>
            <p>
                These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in <strong>Ranchi, Jharkhand, India</strong>.
            </p>

            <hr />

            <h2>9. Contact Us</h2>
            <p>For any questions regarding these Terms:</p>
            <p>
                <strong>PSU Pro Enterprises</strong><br />
                Brand: WAYO Band<br />
                Website: wayoband.com<br />
                Email: hello@wayoband.com
            </p>
        </LegalPageLayout>
    );
}
