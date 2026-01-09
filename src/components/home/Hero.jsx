import Link from "next/link";
import BannerLogo from "../banner-elements/BannerLogo";
import { PUBLIC_LINKS } from "@/app/constants";
import { Award, CircleCheckBig, Users } from "lucide-react";

export default function HomeHero({ lang }) {
  return (
    <>
      <section className="home-bnr pb-0">
        <div className="tailwind container mx-auto relative">
          <div className="hide-mobile absolute top-[10px] left-[-12px]">
            <BannerLogo color="yellow" />
          </div>
          <div className="hero-content flex flex-wrap items-center justify-between">
            <div className="w-full lg:w-8/12">
              <div className="relative pr-0 lg:pr-[30px] md:mb-[30px]">
                <h1 className="hero-title md:text-[68px] md:leading-[75px] text-[38px] leading-[40px] font-proxima animate-up-1 mb-[25px] text-white">
                  {lang === "fr" ? (
                    <>
                      Accédez à des consultants en <br />
                      <span className="text-yellow">
                        sciences de la vie
                      </span>{" "}
                      vérifiés, à des tarifs transparents et optimisés
                    </>
                  ) : lang === "ger" ? (
                    <>
                      Zugang zu geprüften <br />
                      <span className="text-yellow">Life-Science</span>-Beratern
                      zu transparenten, kostenoptimierten Preisen
                    </>
                  ) : (
                    <>
                      Access to vetted <br />
                      <span className="text-yellow">Life Sciences</span>{" "}
                      Consultants, at transparent, cost-optimized rates
                    </>
                  )}{" "}
                  <br />
                </h1>
                <h3 className="text text-[30px] leading-[28px] font-nunito animate-up-2 text-white italic">
                  {lang === "fr"
                    ? "Propulsé par l'automatisation et l'IA, avec une paie 100 % digitale."
                    : lang === "ger"
                    ? "Angetrieben durch Automatisierung und KI, mit 100 % digitaler Lohnabrechnung."
                    : "Powered by automation, AI-Driven, and 100% digital payroll."}
                </h3>
                <div className="flex flex-wrap items-center mt-[30px] animate-up-3">
                  <Link
                    className="btn-scn mr-[20px] text-center mt-[20px]"
                    href="/register"
                  >
                    {lang === "fr"
                      ? "S'inscrire en tant que consultant"
                      : lang === "ger"
                      ? "Als Berater registrieren"
                      : "Register as a Consultant"}
                  </Link>
                  <Link
                    className="btn-prm mr-[20px]  text-center mt-[20px]"
                    href="/register-client"
                  >
                    {lang === "fr"
                      ? "S'inscrire en tant que client"
                      : lang === "ger"
                      ? "Als Kunde registrieren"
                      : "Register as a Client"}
                  </Link>
                </div>

                <div className="flex flex-wrap items-center mt-[30px] animate-up-3 gap-6">
                  <div>
                    {" "}
                    <Users className="text-yellow" size={30} />{" "}
                    <span className="text-white font-bold ml-4">
                      {lang === "fr"
                        ? "100+ Consultants"
                        : lang === "ger"
                        ? "100+ Berater"
                        : "100+ Consultants"}
                    </span>
                  </div>
                  <div>
                    <Award className="text-yellow" size={30} />{" "}
                    <span className="text-white font-bold ml-4">
                      {lang === "fr"
                        ? "Experts vérifiés"
                        : lang === "ger"
                        ? "Geprüfte Experten"
                        : "Verified Experts"}
                    </span>
                  </div>
                  <div>
                    <CircleCheckBig className="text-yellow" size={30} />{" "}
                    <span className="text-white font-bold ml-4">
                      {lang === "fr"
                        ? "Spécialisés dans l'industrie"
                        : lang === "ger"
                        ? "Für Lebensmittelunternehmen"
                        : "Industry Specialized"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="navlist"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
