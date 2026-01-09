"use client";
import RejectOfferModal from "@/components/modals/RejectOfferModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { updateOffer, signOffer } from "@/data/offers";
import {
  formatDateWithDaysDisplay,
  formatStrapiDate,
  handleImgResponse,
} from "@/utils/utility";
import Image from "next/image";
import { useState } from "react";
import { setCookie } from "@/data/services/token";
import { useRouter } from "next/navigation";

export default function OfferCard({ data, isOld }) {
  const router = useRouter();
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [approvedModalVisible, setApprovedModalVisible] = useState(false);

  const handleShowRejectModal = () => {
    setRejectModalVisible(true);
  };
  const handleReject = async () => {
    const resp = await updateOffer(data?.id, { status: "RejectedByClient" });
    if (resp?.status === 200) {
      location?.reload();
    }
  };

  const displayedStatus = () => {
    if (
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
    } else if (data?.status === "POSubmitted") {
      return "Pending Consultant Signing";
    } else {
      return "Pending";
    }
  };

  const addPurchaseOrder = async () => {
    router?.push("/purchase-order?offerId=" + data?.id);
  };

  const handleViewProfile = () => {
    localStorage?.setItem("consultantView", true);
    router?.push(`/consultant-profile/${data?.proposal?.consultant?.id}`);
  };

  const handleAcceptProposal = async () => {
    const signResp = await signOffer(data?.id);
    await setCookie("offerId", data?.id);
    await setCookie("envelopeId", signResp?.data?.doccuSign?.envelopeId);
    router.push(signResp?.data?.doccuSign?.url);
  };

  return (
    <>
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
                className="rounded-full object-cover"
                src={
                  handleImgResponse(data?.proposal?.consultant?.profilePicture)
                    ? handleImgResponse(
                        data?.proposal?.consultant?.profilePicture
                      )
                    : "/images/user.png"
                }
                alt="Consultant profile"
              />
            </div>
            <div className="ml-0 lg:ml-4">
              <h5 className="font-semibold text-[#02153d] mb-2">
                {data?.proposal?.consultant?.firstName}{" "}
                {data?.proposal?.consultant?.lastName}
              </h5>
            </div>
          </div>
        </td>
        <td className="py-4 px-6">
          <h5 className="font-medium text-gray-800">
            {formatStrapiDate(data?.createdAt)}
          </h5>
        </td>
        <td className="py-4 px-6">
          <h5 className="font-medium text-gray-800">
            {formatDateWithDaysDisplay(data?.proposal?.startDate)}
          </h5>
        </td>
        <td className="py-4 px-6">
          <h5 className="font-medium text-gray-800">
            {formatDateWithDaysDisplay(data?.proposal?.endDate)}
          </h5>
        </td>
        <td className="py-4 px-6">
          <h5 className="font-medium text-gray-800">{displayedStatus()}</h5>
        </td>

        {data?.status === "Pending" ||
        data.status === "SigningStartedByClient" ? (
          <td className="py-4 px-6">
            <div className="d-flex">
              <button className="btn-prm" onClick={handleAcceptProposal}>
                Accept
              </button>
              <button
                className="btn-danger"
                onClick={handleShowRejectModal}
                style={{ marginLeft: "15px" }}
              >
                Reject
              </button>
            </div>
          </td>
        ) : (
          <>
            {data?.purchaseOrder?.url ? (
              <td className="py-4 px-6">
                <h5 className="mb-0">
                  <a
                    target="_blank"
                    href={handleImgResponse(data?.purchaseOrder)}
                    style={{ color: "#1f4b3f" }}
                  >
                    {" "}
                    <i
                      className="flaticon-contract text-thm2 pe-2 vam"
                      style={{ fontSize: "35px" }}
                    />{" "}
                    Click to Download{" "}
                  </a>
                </h5>
              </td>
            ) : (
              <td className="py-4 px-6">
                <button className="btn-prm" onClick={addPurchaseOrder}>
                  Add Purchase Order
                </button>
              </td>
            )}
          </>
        )}

        {isOld && (
          <td className="py-4 px-6">
            <h5 className="mb-0">
              <a
                target="_blank"
                href={handleImgResponse(data?.offerContract)}
                style={{ color: "#1f4b3f" }}
              >
                {" "}
                <i
                  className="flaticon-contract text-thm2 pe-2 vam"
                  style={{ fontSize: "35px" }}
                />{" "}
                Click to Download{" "}
              </a>
            </h5>
          </td>
        )}
      </tr>

      <RejectOfferModal
        onReject={handleReject}
        isVisible={rejectModalVisible}
        onclose={() => setRejectModalVisible(false)}
      />

      <SuccessModal
        isVisible={approvedModalVisible}
        title={"Pleasure Doing Business!"}
        message={
          "Thank you for trusting us with your business. We will get back to you soon!"
        }
        onclose={() => setApprovedModalVisible(false)}
      />
    </>
  );
}
