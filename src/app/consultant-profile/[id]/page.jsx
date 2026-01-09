import ConsultantProfile from "@/components/section/ConsultantProfile";
import { getSingleConsultantData } from "@/data/consultants";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export const metadata = {
  title: "Expertree | Consultant",
};
export const revalidate = 10;
export default async function page({ params }) {
  const { id } = params;
  const [consultantResponse, user] = await Promise.all([
    getSingleConsultantData(id),
    getUserMeLoader(),
  ]);
  return (
    <>
      <ConsultantProfile consultant={consultantResponse?.data} user={user} />
    </>
  );
}
