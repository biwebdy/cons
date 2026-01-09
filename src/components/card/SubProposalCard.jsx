"use client";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { blurByStatus } from "@/utils/displayStatus";

export default function SubProposalCard({ data }) {
  const router = useRouter();

  const handleViewProfile = () => {
    localStorage?.setItem("consultantView", true);
    router?.push(`/consultant-profile/${data?.consultant?.id}`);
  };

  const handleViewProposal = () => {
    router?.push(`/view-proposal/${data?.id}`);
  };

  const displayedStatus = () => {
    if (data?.status === "PendingL3Approval") {
      return "Waiting your approval";
    } else if (
      data?.status === "AcceptedByConsultant" ||
      data?.status === "OfferCreated" ||
      data?.status === "SigningCompletedByConsultant" ||
      data?.status === "ProposalCompleted"
    ) {
      return "Accepted";
    } else if (
      data?.status === "RejectedByConsultant" ||
      data?.status === "RejectedByAdmin" ||
      data?.status === "RejectedByL3" ||
      data?.status === "RejectedByL1"
    ) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };

  const getStatusStyle = () => {
    const status = displayedStatus();
    if (status === "Waiting your approval") {
      return "pending-style style1";
    } else if (status === "Accepted") {
      return "pending-style style2";
    } else if (status === "Rejected") {
      return "pending-style style3";
    } else {
      return "pending-style style1";
    }
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 pl-4">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center cursor-pointer"
          onClick={handleViewProfile}
        >
          {blurByStatus(data?.status) ? (
            <div className="ml-0 lg:ml-4">
              <h5 className="font-semibold text-[#02153d] blur">
                First Last Name
              </h5>
            </div>
          ) : (
            <div className="ml-0 lg:ml-4">
              <h5 className="font-semibold text-[#02153d]">
                {data?.consultant?.firstName} {data?.consultant?.lastName}
              </h5>
            </div>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <h5 className="font-semibold text-[#02153d] ">
          {data?.client?.accountOwnerFirstName}{" "}
          {data?.client?.accountOwnerLastName}
        </h5>
      </td>
      <td className="py-4 px-6">
        <h5 className={`font-medium text-gray-800 ${getStatusStyle()}`}>
          {displayedStatus()}
        </h5>
      </td>

      <td className="py-4 px-6">
        <h5 className="font-medium text-gray-800">
          {formatDateWithDaysDisplay(data?.startDate)}
        </h5>
      </td>

      <td className="py-4 px-6">
        <h5 className="font-medium text-gray-800">
          {formatDateWithDaysDisplay(data?.endDate)}
        </h5>
      </td>

      <td className="py-4 pr-4">
        <button
          onClick={handleViewProposal}
          className="bg-[#02153d] hover:bg-[#032a6f] text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center"
        >
          <Eye size={18} className="mr-2" />
          View Proposal
        </button>
      </td>
    </tr>
  );
}
