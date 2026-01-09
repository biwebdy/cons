import Image from "next/image";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import {
  Phone,
  Mail,
  BriefcaseBusiness,
  MapPin,
  CalendarCheck,
  CalendarPlus,
  Info,
} from "lucide-react";
import { useState } from "react";
import ConfirmModal from "../modals/ConfrimModal";
import { approveProposalL3 } from "@/data/proposals";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import { blurByStatus, displayProposalStatus } from "@/utils/displayStatus";

export default function ProposalDetailTable({
  proposal,
  client,
  consultant,
  isParent,
}) {
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const handleApproveClick = () => {
    setShowApproveModal(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const confirmApprove = async () => {
    setShowApproveModal(false);
    const response = await approveProposalL3(proposal?.id, "approve");

    if (response?.status === 200) {
      // Show success modal after approval
      proposal.status = "Pending";
      setShowSuccessModal(true);
    } else {
      // Show error modal after rejection
      setShowErrorModal(true);
    }
  };

  const confirmReject = async () => {
    setShowRejectModal(false);
    const response = await approveProposalL3(proposal?.id, "reject");

    if (response?.status === 200) {
      // Show success modal after approval
      proposal.status = "Rejected";
      setShowSuccessModal(true);
    } else {
      // Show error modal after rejection
      setShowErrorModal(true);
    }
  };

  return (
    <div className="tailwind mb-8 rounded-xl shadow-lg overflow-hidden">
      <div className="rounded-lg p-8">
        {/* Client Info Table */}

        {proposal?.status === "PendingL3Approval" && isParent && (
          <div className="flex justify-end gap-4">
            <button className="btn-danger my-2" onClick={handleRejectClick}>
              Reject
            </button>
            <button className="btn-prm my-2" onClick={handleApproveClick}>
              Approve
            </button>
          </div>
        )}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 mt-8">
          <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
            <h4 className="text-xl font-semibold">Client Info</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-[#faf7f6] ">
            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Name
              </span>
              <div className="flex items-center gap-3 w-full md:w-2/3">
                <Image
                  width={50}
                  height={50}
                  className="rounded-full"
                  src={
                    handleImgResponse(client?.profilePicture)
                      ? handleImgResponse(client?.profilePicture)
                      : "/images/user.png"
                  }
                  alt="Client logo"
                />
                <span className="font-bold text-[#02153d]">
                  {client?.accountOwnerFirstName} {client?.accountOwnerLastName}
                </span>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Phone
              </span>
              <div className="w-full md:w-2/3">
                <a
                  href={`tel:${client?.phoneNumber}`}
                  className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                >
                  <Phone size={16} />
                  <span className="font-bold">
                    {client?.phoneNumber || "N/A"}
                  </span>
                </a>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Email
              </span>
              <div className="w-full md:w-2/3">
                <a
                  href={`mailto:${client?.email}`}
                  className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                >
                  <Mail size={16} />
                  <span className="font-bold">{client?.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Consultant Info Table */}
        {consultant && !blurByStatus(proposal?.status) && (
          <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
            <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
              <h4 className="text-xl font-semibold">Consultant Info</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-[#faf7f6] ">
              <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                <span className="font-medium text-[#02153d] w-full md:w-1/3">
                  Name
                </span>
                <div className="flex items-center gap-3 w-full md:w-2/3">
                  <Image
                    width={50}
                    height={50}
                    className="rounded-full"
                    src={
                      handleImgResponse(consultant?.profilePicture)
                        ? handleImgResponse(consultant?.profilePicture)
                        : "/images/user.png"
                    }
                    alt="Client logo"
                  />
                  <span className="font-bold text-[#02153d]">
                    {consultant?.firstName} {consultant?.lastName}
                  </span>
                </div>
              </div>
              <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                <span className="font-medium text-[#02153d] w-full md:w-1/3">
                  Email
                </span>
                <div className="w-full md:w-2/3">
                  <a
                    href={`mailto:${consultant?.email}`}
                    className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                  >
                    <Mail size={16} />
                    <span className="font-bold">{consultant?.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Proposal Info Table */}
        <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 ">
          <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
            <h4 className="text-xl font-semibold">Proposal Info</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200 bg-[#faf7f6] ">
            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Job Title
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <BriefcaseBusiness size={16} className="text-[#02153d]" />
                <span className="font-bold text-[#02153d]">
                  {proposal?.typeOfWork}
                </span>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Status
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <Info size={16} className="text-[#02153d]" />
                <span className="font-bold text-[#02153d]">
                  {displayProposalStatus(proposal?.status)}
                </span>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Location
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <MapPin size={16} className="text-[#02153d]" />
                <span className="font-bold text-[#02153d]">
                  {proposal?.missionLocation}
                </span>
              </div>
            </div>
            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Rate
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <span className="font-bold text-[#02153d]">
                  CHF{" "}
                  {proposal?.fees
                    ? `${proposal.fees} / ${proposal.rateType || "hour"}`
                    : "Not specified"}
                </span>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                Start Date
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <CalendarPlus size={16} className="text-[#02153d]" />
                <span className="font-bold text-[#02153d]">
                  {formatDateWithDaysDisplay(proposal?.startDate)}
                </span>
              </div>
            </div>

            <div className=" p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
              <span className="font-medium text-[#02153d] w-full md:w-1/3">
                End Date
              </span>
              <div className="w-full md:w-2/3 flex items-center gap-2">
                <CalendarCheck size={16} className="text-[#02153d]" />
                <span className="font-bold text-[#02153d]">
                  {formatDateWithDaysDisplay(proposal?.endDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Proposal Details */}
        <div className="overflow-hidden rounded-lg border border-gray-200">
          <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
            <h4 className="text-xl font-semibold">Details</h4>
          </div>

          <div className="bg-[#faf7f6]  p-6">
            <div className="text-[#02153d]">
              <p className="whitespace-pre-line">
                {proposal?.details || "No additional details provided."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modals */}
      <ConfirmModal
        isVisible={showApproveModal}
        onclose={() => setShowApproveModal(false)}
        onConfirm={confirmApprove}
        title="Approve Proposal"
        message="Are you sure you want to approve this proposal?"
        buttonTitle="Approve"
        btnType={"prm"}
      />

      <ConfirmModal
        isVisible={showRejectModal}
        onclose={() => setShowRejectModal(false)}
        onConfirm={confirmReject}
        title="Reject Proposal"
        message="Are you sure you want to reject this proposal?"
        buttonTitle="Reject"
        btnType={"danger"}
      />

      {/* Success Modal */}
      <SuccessModal
        isVisible={showSuccessModal}
        onclose={() => setShowSuccessModal(false)}
        title="Proposal Status Updated Successfully"
        message="The proposal status has been updated successfully."
      />

      <FailModal
        isVisible={showErrorModal}
        title={"Something Went Wrong!"}
        message={"Something went wrong. Please try again."}
        onclose={() => setShowErrorModal(false)}
      />
    </div>
  );
}
