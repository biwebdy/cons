import CookieConsent from "@/components/CookieConsent/CookiesConsent";
import Header from "@/components/header/Header";
import HomeHero from "@/components/home/Hero";
import AboutUs from "@/components/home/AboutUs";
import WhatWeOffer from "@/components/home/WhatWeOffer";
import HowItWorks from "@/components/home/HowItWorks";

export const metadata = {
  title: "Expertree",
  description:
    "Expertree est une plateforme qui connecte les consultants avec les clients pour résoudre les problèmes commerciaux dans l'industrie de la vie.",
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
      <HomeHero lang="fr" />
      <WhatWeOffer lang="fr" />
      <AboutUs lang="fr" />
      <HowItWorks lang="fr" />

      <CookieConsent />
    </>
  );
}
