import type {Metadata} from "next";
import {sitePreferences} from "@/data/preferences";
import AboutPage from "@/components/aboutPage/AboutPage";

export const metadata: Metadata = {
  title: "Learn More About Our Gaming World | AstraReels.com",
  description: "At AstraReels.com, we’re a team of creators who live and breathe gaming. Our mission is to share exciting, entertain, and bring people together through the joy of play.",
  alternates: {
    canonical: `https://${sitePreferences.name}/about-page/`,
  },
  openGraph: {
    title: "Learn More About Our Gaming World | AstraReels.com",
    description: "At AstraReels.com, we’re a team of creators who live and breathe gaming. Our mission is to share exciting, entertain, and bring people together through the joy of play.",
    url: `https://${sitePreferences.name}/about-page/`,
    siteName: `${sitePreferences.name}`,
  },
};

export default function Home() {

  return (
    <>
      <main>
        <AboutPage />
      </main>
    </>
  );
}
