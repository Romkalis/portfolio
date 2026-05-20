import {withBase} from "@/utils/withBase";
import type { Metadata } from "next";
import { sitePreferences } from "@/data/preferences";

export const metadata: Metadata = {
  title: "Terms & Conditions – PixelPowerShop",
  description: "Review the terms and conditions for purchasing products at PixelPowerShop. Understand your rights and obligations when buying skins and in-game items for CS2, Dota 2, and Fortnite.",
  alternates: {
    canonical: `https://${sitePreferences.name}/terms-and-conditions/`,
  },
  openGraph: {
    title: "Terms & Conditions – PixelPowerShop",
    description: "Review the terms and conditions for purchasing products at PixelPowerShop. Understand your rights and obligations when buying skins and in-game items for CS2, Dota 2, and Fortnite.",
    url: `https://${sitePreferences.name}/terms-and-conditions/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main className="agreements container">
        <h1 className="sec__title">Terms and Conditions</h1>
        <p className="date-title">
          Effective Date: January 1, 2025 <br />
          Last Updated: January 1, 2025
        </p>

        <p>
          Welcome to PixelPowerShop.com! By accessing or using our website and services, you agree to comply with and be bound by these Terms and Conditions (“Terms”), along with our
          <a href={withBase("/privacy-policy/")} title="Privacy Policy" aria-label={"Privacy Policy Link"}>Privacy Policy</a>.
          If you do not agree to these Terms, you must not use our website or services.
        </p>

        <p>
          Please read these Terms carefully as they outline important information regarding your rights and responsibilities when using PixelPowerShop.com.
        </p>

        <h2>1. Use of Our Services</h2>
        <h3>1.1 Eligibility</h3>
        <p>
          You must be at least 18 years of age to use our services. By accessing and using PixelPowerShop.com, you confirm that you are at least 18 years old or have the necessary consent from a legal guardian to use the site.
        </p>
        <h3>1.2 Account Creation</h3>
        <p>
          To place an order, you may need to create an account on PixelPowerShop.com. You are responsible for maintaining the confidentiality of your account information, including your username and password. You agree to notify us immediately of any unauthorized use of your account.
        </p>

        <h2>2. Product Purchases</h2>
        <h3>2.1 Products Available for Purchase</h3>
        <p>
          PixelPowerShop.com offers digital products, including in-game skins, credits, currency, and other gaming-related items. All products are subject to availability and may be withdrawn from sale at any time.
        </p>
        <h3>2.2 Pricing and Payment</h3>
        <p>
          All prices listed on PixelPowerShop.com are in USD or your local currency, unless otherwise stated. Prices are subject to change without notice. We accept various payment methods, including credit/debit cards, PayPal, and cryptocurrency. By purchasing a product, you authorize us to charge the applicable amount for the items you select.
        </p>
        <h3>2.3 Order Confirmation and Payment Processing</h3>
        <p>
          When you place an order, we will send you an order confirmation email. Payment processing is handled by trusted third-party payment providers, and we do not store full payment information. We are not liable for any issues or disputes that arise during the payment process.
        </p>
        <h3>2.4 Delivery of Products</h3>
        <p>
          Once payment is processed, products are typically delivered within minutes to your game account or provided through a secure code. You are responsible for ensuring that the delivery information provided is accurate. We are not liable for undelivered products due to incorrect account details or errors.
        </p>

        <h2>3. Refunds and Cancellations</h2>
        <h3>3.1 Refund Policy</h3>
        <p>
          Due to the digital nature of our products, we do not offer refunds once a product has been delivered. However, if you experience an issue with your order, such as receiving the wrong item, please contact our customer support team within 48 hours for assistance.
        </p>
        <h3>3.2 Cancellations</h3>
        <p>
          Once your payment has been processed and the order is confirmed, it cannot be canceled. If you encounter issues with a product or delivery, we encourage you to reach out to our support team.
        </p>

        <h2>4. User Conduct</h2>
        <h3>4.1 Acceptable Use</h3>
        <p>
          You agree to use PixelPowerShop.com for lawful purposes only. You must not use the site for any illegal activities, including fraud, money laundering, or violating intellectual property rights. You must not engage in any behavior that disrupts or interferes with the operation of the website or services.
        </p>
        <h3>4.2 Account Security</h3>
        <p>
          You are responsible for maintaining the security of your account and any activities that occur under your account. Do not share your login credentials with anyone. Notify us immediately if you suspect any unauthorized use of your account.
        </p>

        <h2>5. Intellectual Property</h2>
        <h3>5.1 Ownership</h3>
        <p>
          All content on PixelPowerShop.com, including but not limited to text, graphics, logos, images, videos, and software, is the property of PixelPowerShop.com or its licensors and is protected by copyright, trademark, and other intellectual property laws. You are granted a limited, non-exclusive, non-transferable license to use the website for personal, non-commercial purposes.
        </p>
        <h3>5.2 Prohibited Use</h3>
        <p>
          You may not reproduce, modify, distribute, or display any content from PixelPowerShop.com without our prior written consent.
        </p>

        <h2>6. Limitation of Liability</h2>
        <h3>6.1 No Warranty</h3>
        <p>
          PixelPowerShop.com provides our services and products “as is” without any warranties of any kind, express or implied. We do not guarantee that the website will be error-free, uninterrupted, or free of viruses.
        </p>
        <h3>6.2 Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, PixelPowerShop.com will not be liable for any damages, including but not limited to lost profits, loss of data, or any other direct, indirect, incidental, special, or consequential damages arising from your use of the website or services.
        </p>

        <h2>7. Privacy and Data Protection</h2>
        <p>
          Your use of PixelPowerShop.com is also governed by our <a href={withBase("/privacy-policy/")} title="Privacy Policy" aria-label={"Privacy Policy Link"}>Privacy Policy</a>,
          which outlines how we collect, use, and protect your personal data. By using our website, you consent to our data practices as described in the Privacy Policy.
        </p>

        <h2>8. Termination</h2>
        <h3>8.1 Termination of Services</h3>
        <p>
          We reserve the right to suspend or terminate your access to PixelPowerShop.com at any time, without notice, for any reason, including but not limited to violations of these Terms. You may also close your account at any time by contacting us.
        </p>
        <h3>8.2 Effects of Termination</h3>
        <p>
          Upon termination of your access, you will no longer have the right to access any content or products on PixelPowerShop.com. Any outstanding obligations or payments must be fulfilled.
        </p>

        <h2>9. Governing Law and Dispute Resolution</h2>
        <h3>9.1 Governing Law</h3>
        <p>
          These Terms are governed by and construed in accordance with the laws of the jurisdiction in which PixelPowerShop.com operates. Any disputes related to these Terms or your use of PixelPowerShop.com will be subject to the exclusive jurisdiction of the courts in that jurisdiction.
        </p>
        <h3>9.2 Dispute Resolution</h3>
        <p>
          In the event of a dispute, we encourage you to contact our customer support team for resolution. If the dispute cannot be resolved informally, you agree to submit the matter to arbitration or mediation in accordance with the applicable laws.
        </p>

        <h2>10. Modifications to These Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. Any changes will be posted on this page, with the revised date noted at the top. By continuing to use our website and services after the changes are posted, you accept the updated Terms.
        </p>

        <h2>11. Contact Us</h2>
        <p>
          If you have any questions or concerns regarding these Terms and Conditions, please contact us at: <br />
          📧 <a href="mailto:contact@demo-portfolio.example" title="contact@demo-portfolio.example" aria-label={"mail Link"}>contact@demo-portfolio.example</a> <br />
          🌐 <a href="#" title="www.PixelPowerShop.com" aria-label={"Homepage Link"}>www.PixelPowerShop.com</a>
        </p>
      </main>

    </>
  );
}
