import Image from "next/image";
import Navlist from "./Navlist";
import {
  CLIENTS_LINKS,
  CONSULTANTS_LINKS,
  SUBCLIENTS_LINKS,
} from "@/app/constants";
import Link from "next/link";
export default function Banner({ title, description, isClient, isSubClient }) {
  const navLinks = isClient
    ? CLIENTS_LINKS
    : isSubClient
    ? SUBCLIENTS_LINKS
    : CONSULTANTS_LINKS;
  return (
    <>
      <section className="tailwind ">
        <div className="bg-blue-brand h-[415px] md:h-[500px]">
          <div className="container mx-auto px-4 relative">
            <Link href={"/"} className="absolute top-4 sm:top-6 left-[40px]">
              <Image
                height={75}
                width={250}
                src={`/images/logos/logo-yellow.svg`}
                alt="Expertree Logo"
                className="w-[150px] h-[50px] sm:w-[250px] sm:h-[70px] md:w-[250px] md:h-[75px]"
              />
            </Link>
            <div className="flex flex-wrap items-center justify-between pt-[90px] md:pt-[180px]">
              <div className="w-full lg:w-8/12 mb-6 sm:mb-8 lg:mb-0 ml-[40px]">
                <div className="pr-0 lg:pr-8 mb-0 md:mb-8 relative">
                  <h1 className="mb-6 text-white text-3xl sm:text-4xl md:text-5xl font-bold animate-up-1 proxima">
                    {title}
                  </h1>
                  {description && (
                    <h3 className="text text-[20px] leading-[28px] font-nunito animate-up-2 text-white">
                      {description}
                    </h3>
                  )}
                </div>
              </div>
              <div className="w-full lg:w-auto mt-6 sm:mt-8 lg:mt-0">
                <div className="navlist">
                  <Navlist links={navLinks} withLogout={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
