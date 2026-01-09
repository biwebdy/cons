import CookieConsent from "@/components/CookieConsent/CookiesConsent";
import Header from "@/components/header/Header";
import HomeHero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata = {
  title: "Expertree",
  description:
    "Expertree ist eine Plattform, die Berater mit Kunden verbindet, um Geschäftsschwierigkeiten in der Lebensmittelindustrie zu lösen.",
  openGraph: {
    images: [
      {
        url: "/images/logos/logo-yellow.png",
      },
    ],
  },
};
export const revalidate = 10;
export default function Home() {
  return (
    <>
      <Header />
      <HomeHero lang="ger" />
      <WhatWeOffer lang="ger" />
      <AboutUs lang="ger" />
      <HowItWorks lang="ger" />

      <CookieConsent />
    </>
  );
}
