"use client";
import { formatDateWithDaysDisplay } from "@/utils/utility";
import ProposalModal from "../modals/ProposalModal";
import { useState } from "react";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import { createProposal, createSubClientProposal } from "@/data/proposals";
import { MoveUpRight } from "lucide-react";

export default function ConsultantAbout(props) {
  const { consultant, showDetails, user } = props;
  const [proposalModalVisible, setProposalModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const rate = Math.round(consultant?.preferences?.rate / 0.955);

  const handleWorkWithCons = () => {
    setProposalModalVisible(true);
  };
  const handleSetProposalSent = async (form) => {
    setProposalModalVisible(false);
    consultant.isWorkingWithCurrentClient = true;
    if (user?.data?.role.name === "L4") {
      const response = await createSubClientProposal(form);
      consultant.isWorkingWithCurrentClient = true;
      if (isFinite(response?.data?.id)) {
        setSuccessModalVisible(true);
      } else {
        setFailModalVisible(true);
      }
    } else {
      const response = await createProposal(form);
      if (isFinite(response?.data?.id)) {
        setSuccessModalVisible(true);
      } else {
        setFailModalVisible(true);
      }
    }
  };

  return (
    <>
      <div className=" pt25 ">
        {!consultant?.isWorkingWithCurrentClient && (
          <div className="d-grid">
            <button onClick={handleWorkWithCons} className="btn-prm">
              Work With Me
              <MoveUpRight size={24} />
            </button>
          </div>
        )}

        <h3 className="widget-title text-blue" style={{ marginTop: "20px" }}>
          {rate}
          <small className="fz15 fw500">CHF /per hour</small>
        </h3>
        <div className="category-list mt20 text-blue">
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-30-days text-thm2 pe-2 vam" />
              Available on{" "}
            </span>
            <span>
              {" "}
              {formatDateWithDaysDisplay(
                consultant?.preferences?.availableDate
              )}
            </span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-calendar text-thm2 pe-2 vam" />
              Day Available / week
            </span>
            <span> {consultant?.preferences?.daysAvailable} days</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-calendar text-thm2 pe-2 vam" />
              Home Office Days
            </span>
            <span> {consultant?.preferences?.homeOfficePercentage} days</span>
          </a>
          <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
            <span className="text">
              <i className="flaticon-30-days text-thm2 pe-2 vam" />
              Date of Birth
            </span>
            <span>{formatDateWithDaysDisplay(consultant?.dob)}</span>
          </a>
          {consultant?.gender && (
            <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
              <span className="text">
                <i className="flaticon-mars text-thm2 pe-2 vam" />
                Gender
              </span>
              <span>{consultant?.gender}</span>
            </a>
          )}
          {consultant?.nationality && (
            <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
              <span className="text">
                <i className="flaticon-flag text-thm2 pe-2 vam" />
                Nationality
              </span>
              <span>{consultant?.nationality}</span>
            </a>
          )}
          {showDetails ? (
            <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
              <span className="text">
                <i className="flaticon-call text-thm2 pe-2 vam" />
                Phone Number
              </span>
              <span>{consultant?.phoneNumber}</span>
            </a>
          ) : (
            <a className="d-flex align-items-center justify-content-between bdrb1 pb-2">
              <span className="text">
                <i className="flaticon-call text-thm2 pe-2 vam" />
                Phone Number
              </span>
              <span className="blur"> +987 654321</span>
            </a>
          )}
        </div>
      </div>

      <ProposalModal
        onclose={() => setProposalModalVisible(false)}
        isVisible={proposalModalVisible}
        consultant={consultant}
        client={user?.data?.client}
        onProposalSent={handleSetProposalSent}
      />

      <SuccessModal
        isVisible={successModalVisible}
        title={"Proposal Sent!"}
        message={
          "We have received your proposal. We will get back to you soon."
        }
        onclose={() => window.location.reload()}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={
          "Something went wrong while sending the proposal. Please try again."
        }
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
