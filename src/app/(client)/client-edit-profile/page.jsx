import EditClient from "@/components/client/EditClient";
import { getSingleCompanyData } from "@/data/client";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export const metadata = {
  title: "Expertree - Consultant SaaS | Consultants Listing",
};

export default async function page() {
  const user = await getUserMeLoader();
  const { client } = user?.data;
  return (
    <>
      <EditClient client={client} />{" "}
    </>
  );
}
