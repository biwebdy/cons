import Banner from "@/components/banner-elements/Banner";
import ConsultantsListing from "@/components/section/ConsultantsListing";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export const metadata = {
  title: "Expertree - Consultant SaaS | Consultants Listing",
};

export default async function page() {
  const user = await getUserMeLoader();
  const isSubClient = user?.data?.role.name === "L4";
  return (
    <>
      <Banner
        title="Consultants Listing"
        isClient={!isSubClient}
        isSubClient={isSubClient}
        description={"Discover hundreds of trusted consultants."}
      />
      <ConsultantsListing />
    </>
  );
}
