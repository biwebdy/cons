import Banner from "@/components/banner-elements/Banner";
import PuchaseOrder from "@/components/section/PurchaseOrder";
import { getOfferById } from "@/data/offers";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export const metadata = {
  title: "Expertree | Purchase Order",
};
export const revalidate = 10;

export default async function page({ searchParams }) {
  const offerId = searchParams?.offerId;
  let offerData = null;
  const user = await getUserMeLoader();
  if (offerId) {
    const response = await getOfferById(offerId);
    offerData = response?.data;
  }
  const isParent = user?.data?.role?.name === "L3";

  return (
    <>
      <Banner
        title="Purchase Order"
        isClient={isParent}
        isSubClient={!isParent}
      />

      <PuchaseOrder offerData={offerData} />
    </>
  );
}
