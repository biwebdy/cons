//ROLES
//show in pathes
import { CLIENTS_LINKS } from "@/app/constants";
import ProposalView from "@/components/section/ProposalView";
import Banner from "@/components/banner-elements/Banner";
import { getProposal } from "@/data/proposals";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
export const metadata = {
  title: "Expertree | View Proposal",
};

export default async function page({ params }) {
  const user = await getUserMeLoader();
  const { id } = params;
  const proposal = await getProposal(id);
  const isParent = user?.data?.role?.name === "L3";
  return (
    <>
      <Banner
        title="View Proposal"
        isClient={isParent}
        isSubClient={!isParent}
        description={"You can view, accept or reject the proposal here."}
      />
      <ProposalView proposalData={proposal.data} isParent={isParent} />
    </>
  );
}
