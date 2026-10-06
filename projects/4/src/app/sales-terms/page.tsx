import {withBase} from "@/utils/withBase";
import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";

export const metadata: Metadata = {
  title: "Terms of Sale – PixelPowerShop | Buy Dota 2, CS2 & Fortnite Skins",
  description: "Read PixelPowerShop's Terms of Sale for purchasing digital products. Understand your rights and obligations when buying Dota 2, CS2, and Fortnite skins, in-game currency, and more.",
  alternates: {
    canonical: `https://${sitePreferences.name}/sales-terms/`,
  },
  openGraph: {
    title: "Terms of Sale – PixelPowerShop | Buy Dota 2, CS2 & Fortnite Skins",
    description: "Read PixelPowerShop's Terms of Sale for purchasing digital products. Understand your rights and obligations when buying Dota 2, CS2, and Fortnite skins, in-game currency, and more.",
    url: `https://${sitePreferences.name}/sales-terms/`,
    siteName: `${sitePreferences.name}`,
  },
};


export default function Home() {

  return (
    <>
      <main className="agreements container">
        <h1 className="sec__title">Terms of Sales</h1>
        <p className="date-title">
          Effective Date: January 1, 2025 <br/>
          Last Updated: January 1, 2025
        </p>

        <p>
          These Terms of Sales (“Terms”) govern the sale of digital products and services on PixelPowerShop.com (“we,”
          “our,” or “us”).
          By purchasing products from our website, you (“you” or “Customer”) agree to comply with these Terms of Sales,
          as well as our <a href={withBase("/privacy-policy/")} title="Privacy Policy"> Privacy Policy</a> and <a
          href={withBase("/terms-and-conditions/")} title="Terms and Conditions" aria-label={'Terms policy link'}>Terms and Conditions</a>.
          Please read these Terms carefully before making any purchase.
        </p>

        <h2>1. General Information</h2>
        <h3>1.1 Product Availability</h3>
        <p>
          PixelPowerShop.com offers digital products such as in-game skins, currency, credits, and other cosmetic items
          for popular games such as CS2, Valorant, and Fortnite.
          All products are subject to availability. We reserve the right to withdraw or amend any product without prior
          notice.
        </p>
        <h3>1.2 Product Descriptions</h3>
        <p>
          We strive to provide accurate descriptions and images of all products listed on our website. However, we do
          not guarantee that all product descriptions are free from errors or omissions.
          Products may vary slightly due to updates from game developers or changes in product availability.
        </p>

        <h2>2. Order Process</h2>
        <h3>2.1 Placing an Order</h3>
        <p>
          To place an order, you must browse the available products and add them to your shopping cart. You will be
          required to provide necessary details, such as your game account information and payment information, during
          the checkout process.
          By confirming your order, you agree to purchase the selected items.
        </p>
        <h3>2.2 Order Confirmation</h3>
        <p>
          Once your order is placed, you will receive an email confirming your order. The confirmation will include your
          order details and the expected delivery time for your items.
          Please verify that the details are correct as soon as possible. If any discrepancies are found, please contact
          us immediately.
        </p>
        <h3>2.3 Price and Currency</h3>
        <p>
          Prices are listed in USD (or your local currency) and are subject to change without notice. The price charged
          for each item will be the price listed on the website at the time of your order, and any applicable taxes or
          fees will be added at checkout.
          All transactions are processed securely, and you will be charged based on the selected payment method.
        </p>

        <h2>3. Payment</h2>
        <h3>3.1 Payment Methods</h3>
        <p>
          We accept a variety of payment methods, including but not limited to credit/debit cards, PayPal, and
          cryptocurrency. All payments must be made in full before the delivery of digital products.
          By providing payment information, you authorize us to charge the total purchase amount.
        </p>
        <h3>3.2 Payment Security</h3>
        <p>
          Your payment information is securely processed by third-party payment processors. We do not store any
          sensitive payment data, and all transactions are encrypted to ensure your security.
        </p>
        <h3>3.3 Payment Issues</h3>
        <p>
          If your payment fails to process, your order will not be completed. In such cases, we will notify you and
          request an alternative payment method. If we are unable to complete your transaction, your order will be
          canceled.
        </p>

        <h2>4. Delivery of Products</h2>
        <h3>4.1 Instant Delivery</h3>
        <p>
          After successful payment, digital products are typically delivered within minutes. Depending on the product,
          items will be delivered to your in-game account or provided as a secure redemption code.
          Delivery time may vary based on the game or product and is subject to the availability of the items.
        </p>
        <h3>4.2 Delivery Issues</h3>
        <p>
          If you encounter any issues with the delivery of your product, such as delays or incorrect items, please
          contact our customer support team immediately. We will work to resolve any delivery problems as quickly as
          possible.
        </p>

        <h2>5. Refund and Cancellation Policy</h2>
        <h3>5.1 Refund Policy</h3>
        <p>
          Due to the nature of our digital products, we do not offer refunds once the product has been delivered.
          However, if you experience an issue with your purchase, such as receiving an incorrect item or a failure in
          delivery, you may request a resolution through our customer support.
          Refunds are only issued if we are unable to resolve the issue.
        </p>
        <h3>5.2 Cancellation of Orders</h3>
        <p>
          Orders cannot be canceled once payment has been processed and the items are being prepared for delivery. If
          you need to modify an order before it is processed, please contact our support team as soon as possible.
          However, we cannot guarantee that changes or cancellations will be possible once the order is confirmed.
        </p>

        <h2>6. Account Security</h2>
        <h3>6.1 Your Responsibility</h3>
        <p>
          You are responsible for ensuring that the information you provide when placing an order is accurate and
          complete. This includes providing the correct game account details and ensuring your payment method is valid.
        </p>
        <h3>6.2 Account Access</h3>
        <p>
          You are responsible for the security of your account and any activities that occur under your account. If you
          suspect any unauthorized use of your account, you must notify us immediately. We will take appropriate steps
          to protect your account and resolve the issue.
        </p>

        <h2>7. Customer Support</h2>
        <h3>7.1 Support Availability</h3>
        <p>
          If you experience any issues with your purchase, delivery, or account, our customer support team is available
          24/7. Please contact us through the contact form on our website or via email, and we will assist you in
          resolving any issues.
        </p>
        <h3>7.2 Dispute Resolution</h3>
        <p>
          We strive to resolve any disputes or concerns that arise with our products and services. If you are
          unsatisfied with a product or service, please contact us directly so we can address your concerns in a timely
          manner.
        </p>

        <h2>8. Limitation of Liability</h2>
        <h3>8.1 No Warranty</h3>
        <p>
          PixelPowerShop.com provides all products and services "as is" without warranties of any kind, either express
          or implied. We do not guarantee that the products will meet your expectations or that the website will be free
          from errors, viruses, or interruptions.
        </p>
        <h3>8.2 Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, PixelPowerShop.com will not be held liable for any direct, indirect,
          incidental, special, or consequential damages arising from the use of our website or the purchase of digital
          products.
          This includes, but is not limited to, any loss of data or profits.
        </p>

        <h2>9. Intellectual Property</h2>
        <h3>9.1 Ownership of Content</h3>
        <p>
          All content on PixelPowerShop.com, including text, graphics, logos, images, and product descriptions, is owned
          by PixelPowerShop.com or its licensors and is protected by copyright and trademark laws.
          You may not copy, modify, distribute, or display any content from PixelPowerShop.com without prior written
          permission.
        </p>

        <h2>10. Changes to These Terms</h2>
        <p>
          We reserve the right to update these Terms of Sales at any time. When we make significant changes, we will
          post the updated terms on this page and update the "Last Updated" date at the top of the document.
          By continuing to use our services after the changes are posted, you accept the updated Terms.
        </p>

        <h2>11. Contact Information</h2>
        <p>
          For any questions or concerns regarding these Terms of Sales, please contact us at: <br/>
          📧 <a href="mailto:contact@demo-portfolio.example"
               title="contact@demo-portfolio.example" aria-label={'Mail link'}>contact@demo-portfolio.example</a> <br/>
          🌐 <a href="#" title="www.PixelPowerShop.com" aria-label={'Homepage link'}>www.PixelPowerShop.com</a>
        </p>
      </main>

    </>
  );
}
