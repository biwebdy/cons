import CookieConsent from "@/components/CookieConsent/CookiesConsent";
import Header from "@/components/header/Header";
import HomeHero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import HowItWorks from "@/components/home/HowItWorks";
import ValuePropsSection from "@/components/home/ValuePropsSection";

export const metadata = {
  title: "Expertree",
  description:
    "Expertree is a platform that connects consultants with clients to solve business problems in the Life Science Industry.",
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
      <HomeHero />
      <ValuePropsSection />
      <WhatWeOffer />
      <AboutUs />
      <HowItWorks />

      <CookieConsent />
    </>
  );
}
