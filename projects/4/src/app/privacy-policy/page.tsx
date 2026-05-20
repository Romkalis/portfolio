import type { Metadata } from "next";
import { sitePreferences } from "@/data/preferences";

export const metadata: Metadata = {
  title: "Privacy Policy – PixelPowerShop",
  description: "Read PixelPowerShop's privacy policy to learn how we protect your personal data when purchasing skins and in-game currency for CS2, Dota 2, and Fortnite.",
  alternates: {
    canonical: `https://${sitePreferences.name}/privacy-policy/`,
  },
  openGraph: {
    title: "Privacy Policy – PixelPowerShop",
    description: "Read PixelPowerShop's privacy policy to learn how we protect your personal data when purchasing skins and in-game currency for CS2, Dota 2, and Fortnite.",
    url: `https://${sitePreferences.name}/privacy-policy/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main className="agreements container">
        <h1 className="sec__title">Privacy Policy</h1>
        <p className="date-title">
          Effective Date: January 1, 2025 <br />
          Last Updated: January 1, 2025
        </p>

        <p>
          PixelPowerShop.com (“we,” “our,” or “us”) respects your privacy and is committed to protecting your personal data.
          This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our website and services.
        </p>

        <h2>1. Information We Collect</h2>
        <p>
          We may collect the following types of information when you visit or make a purchase on PixelPowerShop.com:
        </p>
        <ul aria-label={'Information list'}>
          <li><strong>Personal Information:</strong> Name, email address, Discord username, and payment details (collected securely through our payment partners).</li>
          <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data (to help us improve our website experience).</li>
          <li><strong>Transactional Information:</strong> Details about your orders, items purchased, and communication history with our support team.</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <p>We use your information for the following purposes:</p>
        <ul aria-label={'Information list'}>
          <li>To process and deliver your orders.</li>
          <li>To provide customer support and respond to inquiries.</li>
          <li>To improve our website, products, and services.</li>
          <li>To send important updates, such as order confirmations or policy changes.</li>
          <li>To prevent fraudulent transactions and ensure account security.</li>
        </ul>
        <p>We will never sell, rent, or share your personal information with third parties for marketing purposes.</p>

        <h2>3. Data Security</h2>
        <p>
          We use industry-standard security measures to protect your personal data, including encryption, secure servers, and SSL technology.
          Your payment information is processed only by verified third-party payment providers — we do not store full credit card or payment details on our servers.
        </p>

        <h2>4. Cookies and Tracking Technologies</h2>
        <p>
          PixelPowerShop.com uses cookies to enhance your browsing experience, analyze traffic, and remember your preferences.
          You can control or disable cookies in your browser settings, but this may affect certain website functionalities.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may use third-party services for analytics, payment processing, or marketing. These providers only receive the data necessary to perform their functions
          and are obligated to protect your information under strict privacy terms.
        </p>

        <h2>6. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul aria-label={'Information list'}>
          <li>Access and receive a copy of your personal data.</li>
          <li>Request correction or deletion of your data.</li>
          <li>Withdraw consent for data processing.</li>
          <li>File a complaint with your local data protection authority.</li>
        </ul>
        <p>To exercise these rights, contact us at: <a href="mailto:contact@demo-portfolio.example" title={'contact@demo-portfolio.example'} aria-label={'Mail us link'}>contact@demo-portfolio.example</a></p>

        <h2>7. Data Retention</h2>
        <p>
          We retain personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy — typically for the duration of your account activity or as required by law.
        </p>

        <h2>8. Children’s Privacy</h2>
        <p>
          Our services are intended for users aged 18 and older. We do not knowingly collect personal information from minors.
          If we discover that a minor has provided us with personal data, we will promptly delete it.
        </p>

        <h2>9. Updates to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised “Last Updated” date.
          Continued use of our website after such updates constitutes acceptance of the new terms.
        </p>

        <h2>10. Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us: <br />
          📧 <a href="mailto:contact@demo-portfolio.example" title={'contact@demo-portfolio.example'} aria-label={'Mail link'}>contact@demo-portfolio.example</a> <br />
          🌐 <a href="#" title={'www.PixelPowerShop.com'} aria-label={'Homepage link'}>www.PixelPowerShop.com</a>
        </p>
      </main>

    </>
  );
}
