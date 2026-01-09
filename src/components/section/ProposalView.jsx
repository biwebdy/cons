"use client";

import ProposalDetailTable from "./ProposalDetailTable";

export default function ProposalView({ proposalData, isParent }) {
  const { client, consultant } = proposalData;

  return (
    <div className="tailwind container mx-auto py-8">
      <div className="flex flex-wrap">
        <div className="w-full  mx-auto">
          <ProposalDetailTable
            proposal={proposalData}
            client={client}
            consultant={consultant}
            isParent={isParent}
          />
        </div>
      </div>
    </div>
  );
}
