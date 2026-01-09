//ROLES
//Should show for L3 but hide for L4\

import SubClientForm from "@/components/client-personalize/SubClientForm";
import Banner from "@/components/banner-elements/Banner";

import { getSubClientData } from "@/data/client";
export const metadata = {
  title: "Expertree | Client Accounts",
};

export default async function page({ params }) {
  const { id } = params;
  const response = await getSubClientData(id);
  const subclient = response?.data;
  const client = subclient?.parentClient;
  return (
    <>
      <Banner
        title="Sub Client Profile"
        isClient={true}
        description={"Edit Sub Client Profile"}
      />
      <SubClientForm subclient={subclient} isEdit={true} client={client} />
    </>
  );
}
