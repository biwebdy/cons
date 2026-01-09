"use client";

import { useState } from "react";
import NewProposals from "./NewProposals";
import OldProposals from "./OldProposals";

export default function ConsultantProposalSection({
  newProposals,
  oldProposals,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["New Proposals", "Old Proposals"];

  return (
    <>
      <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
        <div className="navtab-style1">
          <nav>
            <div className="nav nav-tabs mb30">
              {tabs?.map((item, i) => (
                <button
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
          {selectedTab === 0 && <NewProposals proposals={newProposals} />}
          {selectedTab === 1 && <OldProposals proposals={oldProposals} />}
        </div>
      </div>
    </>
  );
}
