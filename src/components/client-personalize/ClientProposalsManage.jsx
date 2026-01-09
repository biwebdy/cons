"use client";

import { useState } from "react";
import Proposals from "./Proposals";
import SubClientProposals from "./ClientSubProposals";

export default function ClientProposalsManage({ id, isSubClient = false }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = isSubClient
    ? ["Accepted Proposals", "Pending Proposals", "Rejected Proposals"]
    : [
        "Awaiting Your Approval",
        "Accepted Proposals",
        "Pending Proposals",
        "Rejected Proposals",
      ];

  return (
    <>
      <div className="freelancer-style1 bdr1 hover-box-shadow row  grey-bg">
        <div className="navtab-style1">
          <nav>
            <div className="nav nav-tabs mb30">
              {tabs?.map((item, i) => (
                <button
                  style={{ padding: "10px 12px" }}
                  key={i}
                  className={`nav-link fw500  grey-bg ${
                    selectedTab == i ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab(i)}
                >
                  {item}
                </button>
              ))}
            </div>
          </nav>

          {isSubClient ? (
            <>
              {selectedTab === 0 && (
                <Proposals
                  proposalsStatus={[
                    "PendingConsultantSigning",
                    "AcceptedByConsultant",
                    "ApprovedByAdmin",
                    "SigningStartedByConsultant",
                    "SigningCompletedByConsultant",
                    "OfferCreated",
                    "ProposalCompleted",
                  ]}
                  id={id}
                />
              )}
              {selectedTab === 1 && (
                <Proposals
                  proposalsStatus={[
                    "Pending",
                    "PendingL3Approval",
                    "PendingConsultantSigning",
                    "ApprovedByL3",
                    "ApprovedByL1",
                  ]}
                  id={id}
                />
              )}
              {selectedTab === 2 && (
                <Proposals
                  proposalsStatus={[
                    "RejectedByConsultant",
                    "RejectedByAdmin",
                    "RejectedByL3",
                    "RejectedByL1",
                  ]}
                  id={id}
                />
              )}
            </>
          ) : (
            <>
              {selectedTab === 0 && (
                <SubClientProposals
                  proposalsStatus={["PendingL3Approval"]}
                  id={id}
                />
              )}
              {selectedTab === 1 && (
                <Proposals
                  proposalsStatus={[
                    "PendingConsultantSigning",
                    "AcceptedByConsultant",
                    "ApprovedByAdmin",
                    "SigningStartedByConsultant",
                    "SigningCompletedByConsultant",
                    "OfferCreated",
                    "ProposalCompleted",
                  ]}
                  id={id}
                />
              )}
              {selectedTab === 2 && (
                <Proposals
                  proposalsStatus={[
                    "Pending",
                    "PendingConsultantSigning",
                    "ApprovedByL3",
                    "ApprovedByL1",
                  ]}
                  id={id}
                />
              )}
              {selectedTab === 3 && (
                <Proposals
                  proposalsStatus={[
                    "RejectedByConsultant",
                    "RejectedByAdmin",
                    "RejectedByL3",
                    "RejectedByL1",
                  ]}
                  id={id}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
