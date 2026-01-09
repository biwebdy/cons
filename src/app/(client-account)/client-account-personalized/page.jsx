import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import SubClientManage from "@/components/client-account-personalize/SubClientManage";

import Image from "next/image";

import Banner from "@/components/banner-elements/Banner";

export const metadata = {
  title: "Expertree | Client Dashboard",
};
export const revalidate = 0;

export default async function page() {
  const user = await getUserMeLoader();

  const id = user?.data?.client?.id || "NO_ID";

  return (
    <div className="tailwind">
      <Banner
        title="Client Account Dashboard"
        isClient={false}
        isSubClient={true}
        description={
          "Manage projects, proposals, and consultant relationships in one place."
        }
      />

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
                    Browse and select suitable consultants from the{" "}
                    <span className="font-bold">Browse Consultants</span>{" "}
                    section.
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
                    Request a consultant using the{" "}
                    <span className="font-bold">Work with Me</span> button.
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
                    Wait for proposal responses in the{" "}
                    <span className="font-bold">Proposals</span> tab.
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
                    Access consultant details in{" "}
                    <span className="font-bold">Offers</span> and request an
                    interview if needed.
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
                  <p className="text-[#02153d] text-sm">
                    Accept the offer, attach your purchase order, and sign the
                    contract online.
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

            {/* Step 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 transform transition duration-300 hover:scale-105 hover:shadow-lg">
              <div className="flex items-start">
                <div className="flex-grow">
                  <div className="inline-block bg-[#02153d] text-white rounded-full px-3 py-1 text-sm font-bold mb-3">
                    STEP 6
                  </div>
                  <p className="text-[#02153d] text-sm">
                    Approve monthly timesheets via the{" "}
                    <span className="font-bold">Projects</span> tab.
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
          <SubClientManage id={id} />
        </div>
      </section>
    </div>
  );
}
