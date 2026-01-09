import ConsultantProfile from "@/components/section/ConsultantProfile";
import { getSingleConsultantDataByUserID } from "@/data/consultants";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export const metadata = {
  title: "Expertree | Consultant",
};
export const revalidate = 10;
export default async function page() {
  const user = await getUserMeLoader();
  const consultant = await getSingleConsultantDataByUserID(user?.data?.id);

  return (
    <>
      <ConsultantProfile consultant={consultant?.data} user={user} />
    </>
  );
}
