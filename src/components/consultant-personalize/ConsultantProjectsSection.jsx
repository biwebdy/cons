"use client";

import { useState } from "react";
import ConsProjects from "./ConsProjects";

export default function ConsultantProjectsSection({
  oldProjects,
  newProjects,
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Ongoing", "Completed"];

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
          {selectedTab === 0 && <ConsProjects projects={newProjects} />}
          {selectedTab === 1 && <ConsProjects projects={oldProjects} />}
        </div>
      </div>
    </>
  );
}
