import DoccuSignVerify from "@/components/callback/DoccuSignVerify";
import PageNotFound from "@/components/section/PageNotFound";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { redirect } from "next/navigation";

const Page = async ({ searchParams }) => {
  const user = await getUserMeLoader();
  if (searchParams?.event !== "signing_complete") {
    return <PageNotFound />;
  }

  return (
    <>
      <DoccuSignVerify scenario={"OFFER"} />
    </>
  );
};

export default Page;
