import {withBase} from "@/utils/withBase";
import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";

export const metadata: Metadata = {
  title: "Terms & Conditions — User Agreement & GDPR Compliance",
  description: "Read the Terms & Conditions of AstraReels.com to understand your rights and our responsibilities. We ensure transparent, fair, and GDPR-compliant use of our website",
  alternates: {
    canonical: `https://${sitePreferences.name}/terms-of-use/`,
  },
  openGraph: {
    title: "Terms & Conditions — User Agreement & GDPR Compliance",
    description: "Read the Terms & Conditions of AstraReels.com to understand your rights and our responsibilities. We ensure transparent, fair, and GDPR-compliant use of our website",
    url: `https://${sitePreferences.name}/terms-of-use/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function TermsAndConditions() {
  return (
    <main className="main-wrap container">
      <section className="politics">
        <h1 className="sec__title" title="Terms & Conditions for AstraReels.com">
          Terms & Conditions for AstraReels.com
        </h1>
        <p className="text">Last updated: October 29, 2025</p>

        <p className="text">
          Welcome to AstraReels.com! (“we”, “our”, “us”). These are our rules for using our site. By using AstraReels.com, you’re saying you agree to them. If you don’t, please don’t use our website.
        </p>

        <div>
          <p className="sub">1. General Info</p>
          <p className="text">
            AstraReels.com is all about entertainment. We give you info about online games and write reviews.
            We're not a gambling or betting site where you use real money. Everything here is just for fun and giving you information.
          </p>
          <p className="text">
            By using our site, you're telling us you're at least 18 years old, or the legal age where you live.
          </p>
        </div>

        <div>
          <p className="sub">2. Using the Website</p>
          <p className="text">
            Please only use our site for things that are okay and don't break any rules or hurt anyone else.
          </p>
          <ul>
            <li>Don’t copy, share, or change anything on our site without asking.</li>
            <li>Don’t use our site to do bad or illegal things.</li>
            <li>Don’t mess with our site so it doesn't work right or isn't safe.</li>
          </ul>
          <p className="text">
            If you break these rules, we might have to stop you from using our site.
          </p>
        </div>

        <div>
          <p className="sub">3. Our Stuff</p>
          <p className="text">
            Everything on AstraReels.com, like the words, pictures, and logos, belongs to us or people who let us use it.
            You can't copy, reuse, or share any of it without asking us first.
          </p>
        </div>

        <div>
          <p className="sub">4. We're Not Responsible</p>
          <p className="text">
            We try to keep everything correct and up to date, but AstraReels.com is provided as is.
            We don't promise that the info here will always be right, complete, or that the site will always be available.
            Use the site how you want.
          </p>
          <p className="text">
            We're not responsible for any problems you have from using our site, like losing your data, money, or your good name.
          </p>
        </div>

        <div>
          <p className="sub">5. Links to Other Sites</p>
          <p className="text">
            We might have links to other websites that we think will help you.
            We don't control these sites and aren't responsible for what's on them, their rules, or what they do.
            If you go to these sites, it's your call.
          </p>
        </div>

        <div>
          <p className="sub">6. Your Privacy (GDPR)</p>
          <p className="text">
            If you live in Europe, we follow the rules about your personal info (GDPR). We promise to:
          </p>
          <ul>
            <li>Use your info fairly and honestly.</li>
            <li>Only ask for what we need.</li>
            <li>Keep your data safe.</li>
            <li>Let you see, change, or delete your info if you want.</li>
          </ul>
          <p className="text">
            Check out our <a href={withBase("/our-privacy-policy/")}>Privacy Policy</a> or email us at <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a> for more info.
          </p>
        </div>

        <div>
          <p className="sub">7. Third-Party Responsibility</p>
          <p className="text">
            Sometimes we might show you info or talk about games that other companies control.
            We don't own these games, so we're not responsible if you have problems.
          </p>
          <p className="text">
            All names and trademarks belong to the companies that own them.
          </p>
        </div>

        <div>
          <p className="sub">8. Changes to These Rules</p>
          <p className="text">
            We might change these rules sometimes. When we do, we'll change the Last updated date on this page.
            Check back here to see if anything's different.
          </p>
        </div>

        <div>
          <p className="sub">9. Stopping Your Access</p>
          <p className="text">
            We can stop you from using AstraReels.com if you break these rules or do something bad. We might not even warn you.
          </p>
        </div>

        <div>
          <p className="sub">10. Get in Touch</p>
          <p className="text">If you have any questions about these rules or your privacy, email us:</p>
          <ul>
            <li>📧 <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a></li>
            <li>📞 +1 (000) 000-0000</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
