//ROLES
//Should show for L3 but hide for L4\

import SubClientForm from "@/components/client-personalize/SubClientForm";
import Banner from "@/components/banner-elements/Banner";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
export const metadata = {
  title: "Expertree | Client Accounts",
};

export default async function page() {
  const user = await getUserMeLoader();
  const { client } = user?.data;
  return (
    <>
      <Banner
        title="Sub Client Profile"
        isClient={true}
        description={"Add Sub Client Profile"}
      />
      <SubClientForm client={client} isEdit={false} />
    </>
  );
}
