"use client";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye } from "lucide-react";
import { displayProposalStatus } from "@/utils/displayStatus";

export default function ProposalCard({ data, isBlur = false }) {
  const router = useRouter();

  const handleViewProfile = () => {
    localStorage?.setItem("consultantView", true);
    router?.push(`/consultant-profile/${data?.consultant?.id}`);
  };

  const handleViewProposal = () => {
    router?.push(`/view-proposal/${data?.id}`);
  };

  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      <td className="py-4 pl-4">
        <div
          className="flex flex-col lg:flex-row items-start lg:items-center cursor-pointer"
          onClick={handleViewProfile}
        >
          <div className="relative mb-3 lg:mb-0">
            <Image
              height={60}
              width={60}
              className={`rounded-full object-cover ${
                !isBlur ? "" : "blurImg"
              } `}
              src={
                handleImgResponse(data?.consultant?.profilePicture) && !isBlur
                  ? handleImgResponse(data?.consultant?.profilePicture)
                  : !isBlur &&
                    !handleImgResponse(data?.consultant?.profilePicture)
                  ? "/images/user.png"
                  : "/images/blur-profile/blur1.webp"
              }
              alt="Consultant profile"
            />
          </div>
          <div className="ml-0 lg:ml-4">
            {!isBlur ? (
              <h5 className="font-semibold text-[#02153d] mb-2">
                {data?.consultant?.firstName} {data?.consultant?.lastName}
              </h5>
            ) : (
              <h5 className="font-semibold text-[#02153d] mb-2 blur">
                First Last Name
              </h5>
            )}
          </div>
        </div>
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

      <td className="py-4 px-6">
        <h5 className="font-medium text-gray-800">
          {displayProposalStatus(data?.status)}
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
