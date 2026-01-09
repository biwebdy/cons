"use client";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import SendOfferModal from "../modals/SendOfferModal";
import RejectReasonModal from "../modals/RejectReasonModal";
import { useState } from "react";
import { displayProposalStatus } from "@/utils/displayStatus";

export default function DashboardProposalCard({ data }) {
  const [sendOfferModalVisible, setSendOfferModalVisible] = useState(false);
  const [viewRejectionModalVisible, setViewRejectionModalVisible] =
    useState(false);
  const handleSendOffer = (files) => {
    setSendOfferModalVisible(false);
  };

  return (
    <>
      <tr>
        <th className="ps-0" scope="row">
          <div className=" p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="thumb w60 position-relative rounded-circle mb15-md">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={
                    handleImgResponse(data?.client?.logo)
                      ? handleImgResponse(data?.client?.logo)
                      : "/images/user.png"
                  }
                  alt="thumb"
                />
              </div>
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-2">{data?.client?.name}</h5>
              </div>
            </div>
          </div>
        </th>

        <th className="ps-0" scope="row">
          <div className="p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="thumb w60 position-relative rounded-circle mb15-md">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={
                    handleImgResponse(data?.consultant?.profilePicture)
                      ? handleImgResponse(data?.consultant?.profilePicture)
                      : "/images/user.png"
                  }
                  alt="thumb"
                />
              </div>
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-2">
                  {data?.consultant?.firstName} {data?.consultant?.lastName}
                </h5>
              </div>
            </div>
          </div>
        </th>

        <td className="vam">
          <h5
            className={`mb-0 ${
              displayProposalStatus(data?.status) === "Accepted"
                ? "pending-style style2"
                : displayProposalStatus(data?.status) === "Rejected"
                ? "pending-style style3"
                : "pending-style style1"
            }`}
          >
            {displayProposalStatus(data?.status)}
          </h5>
        </td>

        <td className="vam">
          <h5 className="mb-0">{formatDateWithDaysDisplay(data?.startDate)}</h5>
        </td>
        <td className="vam">
          <h5 className="mb-0">{formatDateWithDaysDisplay(data?.endDate)}</h5>
        </td>

        <td className="vam">{data?.details}</td>
      </tr>

      {sendOfferModalVisible && (
        <tr>
          <td>
            {" "}
            <SendOfferModal
              isVisible={sendOfferModalVisible}
              onclose={() => setSendOfferModalVisible(false)}
              onSend={(files) => {
                handleSendOffer(files);
              }}
              client={data?.client?.name}
            />
          </td>
        </tr>
      )}

      {viewRejectionModalVisible && (
        <tr>
          <td>
            {" "}
            <RejectReasonModal
              isVisible={viewRejectionModalVisible}
              onclose={() => setViewRejectionModalVisible(false)}
              title={"Rejection Reason"}
              message={data?.rejectionDetails}
            />
          </td>
        </tr>
      )}
    </>
  );
}
