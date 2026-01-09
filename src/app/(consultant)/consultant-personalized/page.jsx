import { CONSULTANTS_LINKS } from "@/app/constants";
import BannerLogo from "@/components/banner-elements/BannerLogo";
import Navlist from "@/components/banner-elements/Navlist";
import ConsultantManageSection from "@/components/section/ConsultantManageSection";
import { getConsultantProjectsData } from "@/data/projects";
import { getProposalsData } from "@/data/proposals";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import {
  User,
  FileText,
  MessageSquare,
  FileSignature,
  Play,
  Clock,
} from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Expertree | Consultant",
};
export const revalidate = 0;

export default async function page() {
  const user = await getUserMeLoader();

  const [projects, proposals] = await Promise.all([
    getConsultantProjectsData(1, 100, { id: "desc" }),
    getProposalsData(1, 100, { id: "desc" }),
  ]);

  const navLinks = CONSULTANTS_LINKS;

  return (
    <div className="tailwind">
      {/* Hero Banner */}
      <section className="client-personalized-bnr relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[#083B5D] bg-opacity-65"></div>
        <div className="container mx-auto relative z-10 px-4">
          <div className="absolute top-4 sm:top-6 left-[40px]">
            <BannerLogo color="yellow" />
          </div>

          <div className="flex flex-col lg:flex-row items-start justify-between pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16">
            <div className="w-full lg:w-7/12 mb-6 sm:mb-8 lg:mb-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 animate-up-1">
                YOUR PERSONALIZED DASHBOARD
              </h1>
              <h3 className="text-lg sm:text-xl md:text-2xl text-white font-light animate-up-2">
                Welcome to your personalized dashboard.
                <br className="hidden sm:block" />
                Manage your projects, view your proposals and more.
              </h3>
            </div>

            <div className="w-full lg:w-auto mt-6 sm:mt-8 lg:mt-0">
              <Navlist links={navLinks} withLogout={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gradient-to-r from-[#FDE7C6] to-[#FFF5E9] py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#02153d] text-center mb-8">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 1
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Set up and frequently update your account information via{" "}
                    <span className="font-bold">My Profile</span>.
                  </p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/images/icon/arrow.png"
                  alt="arrow"
                  className="ml-2 transform rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 2
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Review and respond to client proposals within 24h from{" "}
                    <span className="font-bold">Proposals received</span> tab.
                  </p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/images/icon/arrow.png"
                  alt="arrow"
                  className="ml-2 transform rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 3
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Client may request an interview.
                  </p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/images/icon/arrow.png"
                  alt="arrow"
                  className="ml-2 transform rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 4
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Sign the mission contract online from{" "}
                    <span className="font-bold">Mission contracts</span> tab.
                  </p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/images/icon/arrow.png"
                  alt="arrow"
                  className="ml-2 transform rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 5
                  </div>
                  <p className="text-[#02153d] text-sm">Start the project.</p>
                </div>
                <Image
                  width={20}
                  height={20}
                  src="/images/icon/arrow.png"
                  alt="arrow"
                  className="ml-2 transform rotate-90 md:rotate-0"
                />
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 6
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Submit monthly timesheets for client approval via the{" "}
                    <span className="font-bold">Project</span> tab.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <ConsultantManageSection
            proposals={proposals}
            projects={projects}
            frameworkContract={
              user?.data?.consultant?.frameworkContract?.[0] || null
            }
          />
        </div>
      </section>
    </div>
  );
}
