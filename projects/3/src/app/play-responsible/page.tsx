import {withBase} from "@/utils/withBase";
import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";

export const metadata: Metadata = {
  title: "Play Responsibly — Enjoy Games the Right Way | AstraReels.com",
  description: "At AstraReels.com, we promote healthy gaming habits. Discover tips for balanced play, learn about restrictions, explore how we support responsible entertainment online.",
  alternates: {
    canonical: `https://${sitePreferences.name}/play-responsible/`,
  },
  openGraph: {
    title: "Play Responsibly — Enjoy Games the Right Way | AstraReels.com",
    description: "At AstraReels.com, we promote healthy gaming habits. Discover tips for balanced play, learn about restrictions, explore how we support responsible entertainment online.",
    url: `https://${sitePreferences.name}/play-responsible/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="main-wrap container">
      <section className="politics">
        <h1 className="sec__title" title="Play Responsibly">
          Play Responsibly
        </h1>
        <p className="text">Last updated: October 17, 2025</p>

        <p className="text">
          Hey there! At AstraReels.com, we're all about keeping things fun, chill, and creative. Gaming should be a good time, not a drag. We think games should make you happy and keep you entertained without messing up your real-life balance. So, here’s how we roll when it comes to keeping your play safe and fun.
        </p>

        <div>
          <p className="sub">🎯 Our Thinking</p>
          <p className="text">
            We want everyone to chill out and see gaming as just a way to relax, hang out, and see what's out there. Our thing is all about fun. There's no real money, betting, or any of that stuff involved.
          </p>
          <p className="text">
            We're all for good online habits and being cool about how much time you spend online.
          </p>
        </div>

        <div>
          <p className="sub">Some Good Ideas for Chilling While Gaming</p>
          <ul>
            <li>Time it out. Decide how long you're gonna play before you start, and stick with it.</li>
            <li>Take it easy. Get up and walk around now and then to give your head and eyes a rest.</li>
            <li>Keep it real. Gaming is about laughing. It’s not a contest or a quest to be perfect.</li>
            <li>Know when to stop. If you're bored or getting mad, just quit and do something else.</li>
            <li>Mix it up. Hang with friends, do stuff outside, and try other fun things too.</li>
          </ul>
        </div>

        <div>
          <p className="sub">Who Can Play</p>
          <p className="text">
            You have to be 18 or older to use AstraReels.com—or old enough based on where you live. We don't go after kids' info, and we don't keep it if we know about it.
          </p>
          <p className="text">
            If we figure out someone under 18 gave us their info, we zap it right away to stick to the rules (GDPR).
          </p>
        </div>

        <div>
          <p className="sub">Your Info</p>
          <p className="text">
            Because we care about GDPR, we keep any info we get (like from cookies or analytics) safe and sound. You can see, fix, or trash your info anytime by emailing <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a>.
          </p>
          <p className="text">
            Check out our <a href={withBase("/our-privacy-policy/")}>Privacy Policy</a> for all the details.
          </p>
        </div>

        <div>
          <p className="sub">Need a Hand?</p>
          <p className="text">
            If you're feeling like gaming is too much, there are spots that can help you get things back on track:
          </p>
          <ul>
            <li><strong>Demo resource</strong> — placeholder for responsible gaming information (portfolio sample)</li>
            <li><strong>Gambling Therapy</strong> — Free help and talks online</li>
            <li><strong>Mind</strong> — Help for your feelings</li>
          </ul>
          <p className="text">
            Even though AstraReels.com isn't about real gambling, we still think it's cool to support places that keep things healthy online.
          </p>
        </div>

        <div>
          <p className="sub">Hit Us Up</p>
          <p className="text">Got questions about safe play or GDPR? Get in touch anytime:</p>
          <ul>
            <li>📧 <a href="mailto:contact@demo-portfolio.example">contact@demo-portfolio.example</a></li>
            <li>📞 +1 (000) 000-0000</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
