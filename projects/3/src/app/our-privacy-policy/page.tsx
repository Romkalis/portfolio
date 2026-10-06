import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Protection Details | AstraReels.com",
  description: "Learn how AstraReels.com collects, uses, and protects your personal data. We value your privacy and ensure full compliance with GDPR to keep your information safe",
  alternates: {
    canonical: `https://${sitePreferences.name}/our-privacy-policy/`,
  },
  openGraph: {
    title: "Privacy Policy & Data Protection Details | AstraReels.com",
    description: "Learn how AstraReels.com collects, uses, and protects your personal data. We value your privacy and ensure full compliance with GDPR to keep your information safe",
    url: `https://${sitePreferences.name}/our-privacy-policy/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="main-wrap container">
      <section className="politics">
        <h1 className="sec__title" title="Privacy Policy for AstraReels.com">
          Privacy Policy for AstraReels.com
        </h1>
        <p className="text">Last updated: October 29, 2025</p>

        <p className="text">
          Welcome to AstraReels.com! (“we”, “our”, or “us”). Your privacy matters a lot to us. This Privacy Policy explains how we collect, use, and keep your personal info safe when you visit or use our site. We are serious about protecting your info and follow the rules in the General Data Protection Regulation (GDPR) and other privacy laws.
        </p>

        <div>
          <p className="sub">1. Info We Grab</p>
          <ul>
            <li>Personal Info: Like your name, email, or how to reach you when you give it to us (like in contact forms).</li>
            <li>Tech Info: Things like your IP address, what kind of browser you use, your device details, and your operating system.</li>
            <li>Cookies and Usage Info: Stuff about how you use our site, like what pages you visit, how long you stay, and where you came from.</li>
          </ul>
          <p className="text">We only grab the info we need to make the site work better and run smoothly.</p>
        </div>

        <div>
          <p className="sub">2. How We Use Your Info</p>
          <ul>
            <li>Keep AstraReels.com up and running and make it better.</li>
            <li>Make your experience personal and show you stuff you'll like.</li>
            <li>Answer your questions or help you out.</li>
            <li>See how people are using the site and how well it's working.</li>
            <li>Follow the law and stop bad stuff from happening.</li>
          </ul>
        </div>

        <div>
          <p className="sub">3. Cookies</p>
          <p className="text">
            AstraReels.com uses cookies to make your browsing better. Cookies help us see what you do on the site, remember what you like, and show you cool stuff.
          </p>
          <p className="text">
            You can turn cookies off in your browser, but heads up, some parts of the site might not work right without them. Check out our Cookie Policy for more.
          </p>
        </div>

        <div>
          <p className="sub">4. Keeping Your Info</p>
          <p className="text">
            We keep your info only as long as we need it for the reasons in this Privacy Policy, or if the law says we have to keep it longer. When we don't need it anymore, we'll delete it for good.
          </p>
        </div>

        <div>
          <p className="sub">5. GDPR Stuff</p>
          <p className="text">If you're in Europe, you get these rights under the GDPR:</p>
          <ul>
            <li>You can see your personal info.</li>
            <li>You can fix wrong info or delete it.</li>
            <li>You can tell us to stop using your info.</li>
            <li>You can move your info somewhere else.</li>
            <li>You can take back your permission anytime.</li>
          </ul>
          <p className="text">To use these rights, email us at <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a>. We'll get back to you quickly.</p>
        </div>

        <div>
          <p className="sub">6. Keeping Your Info Safe</p>
          <p className="text">
            We use tech and other ways to keep your personal info safe from people who shouldn't see it or mess with it. But just so you know, nothing on the internet is 100% safe.
          </p>
        </div>

        <div>
          <p className="sub">7. Other Sites</p>
          <p className="text">
            Our site might have links to other websites. We're not in charge of their privacy stuff. Check their privacy policies before you give them any info.
          </p>
        </div>

        <div>
          <p className="sub">8. Kids' Privacy</p>
          <p className="text">
            AstraReels.com is not for kids under 18. We don't grab info from kids on purpose. If we find out we did, we'll delete it ASAP.
          </p>
        </div>

        <div>
          <p className="sub">9. Changes to This Policy</p>
          <p className="text">
            We might change this Privacy Policy now and then to match how we do things or because of legal stuff. The Last updated date at the top will always show when we last changed it.
          </p>
        </div>

        <div>
          <p className="sub">10. Get In Touch</p>
          <p className="text">
            If you have any questions about this Privacy Policy or how we handle your info, reach out:
          </p>
          <ul>
            <li>📧 <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a></li>
            <li>📞 +1 (000) 000-0000</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
