"use client";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useState } from "react";
import ConsultantRejectProposal from "../modals/ConsultantRejectProppsal";
import { signMissionContract } from "@/data/proposals";
import { setCookie } from "@/data/services/token";
import { useRouter } from "next/navigation";

export default function MissionContractCard({ data }) {
  const router = useRouter();
  const [rejectProposalModalVisible, setRejectProposalModalVisible] =
    useState(false);

  const handleSignMissionContract = async () => {
    try {
      const resp = await signMissionContract(data?.id);
      let redirectUrl = "/project-initiation";
      // alert(JSON.stringify(resp));
      if (Object.keys(resp?.data)?.length > 0) {
        if (resp?.data?.doccuSign?.url) {
          redirectUrl = resp.data.doccuSign.url;
          await setCookie("proposalId", data?.id);
          await setCookie("envelopeId", resp?.data?.doccuSign?.envelopeId);
        } else {
          await setCookie("proposalId", data?.id);
        }
        router.push(redirectUrl);
        return;
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <>
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-4 px-6">
          <div className="flex items-center space-x-3 ">
            <div className="relative w-12 h-12 rounded-full overflow-hidden">
              <Image
                height={48}
                width={48}
                className="object-cover"
                src={
                  handleImgResponse(data?.client?.logo)
                    ? handleImgResponse(data?.client?.logo)
                    : "/images/user.png"
                }
                alt="consultant"
              />
            </div>
            <div>
              <h5 className="text-gray-800 font-medium">
                {data?.client?.name}
              </h5>
            </div>
          </div>
        </td>

        <td className="w-full">
          <div className="overflow-x-auto whitespace-nowrap">
            <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              {formatDateWithDaysDisplay(data?.startDate)}
            </span>
          </div>
        </td>

        <td className="w-full">
          <div className="overflow-x-auto whitespace-nowrap">
            <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-800">
              {formatDateWithDaysDisplay(data?.endDate)}
            </span>
          </div>
        </td>

        <td className="py-4 px-4 flex items-center ">
          <button className="btn-prm" onClick={handleSignMissionContract}>
            Sign Mission Contract
          </button>

          <button
            className="btn-danger text-white ml20"
            onClick={() => setRejectProposalModalVisible(true)}
          >
            Reject
          </button>
        </td>
      </tr>

      {rejectProposalModalVisible && (
        <tr>
          <td>
            <ConsultantRejectProposal
              isVisible={rejectProposalModalVisible}
              onclose={() => setRejectProposalModalVisible(false)}
              proposal={data}
            />
          </td>
        </tr>
      )}
    </>
  );
}
