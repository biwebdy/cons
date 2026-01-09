import { CONSULTANTS_LINKS } from "@/app/constants";
import Banner from "@/components/banner-elements/Banner";
import { getProposal } from "@/data/proposals";
import ConsultantProposalTable from "@/components/section/ConsultantProposalTable";

export const metadata = {
  title: "Expertree | View Proposal",
};

export default async function page({ params }) {
  const { id } = params;
  const proposal = await getProposal(id);
  console.log("proposal", proposal);
  return (
    <>
      <Banner
        title="View Proposal"
        navLinks={CONSULTANTS_LINKS}
        description={"You can view, accept or reject the proposal here."}
      />
      <ConsultantProposalTable proposal={proposal.data} />
    </>
  );
}
