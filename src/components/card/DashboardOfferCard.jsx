"use client";

import { updateOfferByAdmin } from "@/data/offers";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import * as LucideIcons from "lucide-react";

export default function DashboardOfferCard({ data }) {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);

  const displayedStatus = () => {
    if (data?.status === "POSubmittedByClient") {
      return "Waiting your approval";
    } else if (
      data?.status === "AcceptedByClient" ||
      data?.status === "SigningCompletedByClient" ||
      data?.status === "ProjectStarted" ||
      data?.status === "PendingConsultantSigning"
    ) {
      return "Accepted";
    } else if (
      data?.status === "RejectedByClient" ||
      data?.status === "RejectedByAdmin"
    ) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };

  const handleApprovePO = async () => {
    try {
      const response = await updateOfferByAdmin(data?.id, {
        status: "POApprovedByAdmin",
      });

      if (response?.status === 200) {
        setSuccessModalVisible(true);
      } else {
        setFailModalVisible(true);
      }
    } catch (error) {
      console.error("Error approving PO:", error);
      setFailModalVisible(true);
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    // Refresh the page to show updated status
    window.location.reload();
  };

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <Image
                height={48}
                width={48}
                className="rounded-full"
                src={
                  handleImgResponse(data?.proposal?.client?.logo)
                    ? handleImgResponse(data?.proposal?.client?.logo)
                    : "/images/user.png"
                }
                alt={data?.proposal?.client?.name || "Client"}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {data?.proposal?.client?.name || "N/A"}
              </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <Image
                height={48}
                width={48}
                className="rounded-full"
                src={
                  handleImgResponse(data?.proposal?.consultant?.profilePicture)
                    ? handleImgResponse(
                        data?.proposal?.consultant?.profilePicture
                      )
                    : "/images/user.png"
                }
                alt={data?.proposal?.consultant?.firstName || "Consultant"}
              />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {data?.proposal?.consultant
                  ? `${data?.proposal?.consultant?.firstName} ${data?.proposal?.consultant?.lastName}`
                  : "N/A"}
              </div>
            </div>
          </div>
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          {data?.status === "POSubmittedByClient" ? (
            <div className="flex space-x-2">
              <button
                onClick={handleApprovePO}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Approve
              </button>
              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                Reject
              </button>
            </div>
          ) : displayedStatus() === "Accepted" ? (
            <span className="text-sm text-green-600">Accepted</span>
          ) : displayedStatus() === "Rejected" ? (
            <span className="text-sm text-red-600">Rejected</span>
          ) : (
            <span className="text-sm text-blue-600">Pending</span>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          {data?.offerContract?.url ? (
            <a
              target="_blank"
              href={handleImgResponse(data?.offerContract)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View Contract
            </a>
          ) : (
            <span className="text-sm text-gray-500">N/A</span>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          {data?.proposal?.missionContract?.url ? (
            <a
              target="_blank"
              href={handleImgResponse(data?.proposal?.missionContract)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View Contract
            </a>
          ) : (
            <span className="text-sm text-gray-500">N/A</span>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          {data?.purchaseOrder?.url ? (
            <a
              target="_blank"
              href={handleImgResponse(data?.purchaseOrder)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View PO
            </a>
          ) : (
            <span className="text-sm text-gray-500">N/A</span>
          )}
        </td>

        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex space-x-2">
            <Link
              href={`/secure/offer/${data?.id}`}
              className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
              data-tooltip-id="view"
              data-tooltip-content="View"
            >
              {getIcon("Eye")}
            </Link>
          </div>
        </td>
      </tr>

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalVisible}
        title="Purchase Order Approved"
        message="The purchase order has been successfully approved. The project is now active."
        onclose={handleSuccessModalClose}
      />

      {/* Fail Modal */}
      <FailModal
        isVisible={failModalVisible}
        title="Approval Failed"
        message="There was an error while approving the purchase order. Please try again."
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
