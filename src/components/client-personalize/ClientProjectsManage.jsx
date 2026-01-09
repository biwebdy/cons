"use client";

import { useState } from "react";
import Projects from "./Projects";

export default function ClientProjectsManage({ id }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["Ongoing", "Completed"];

  return (
    <>
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
            {selectedTab === 0 && <Projects id={id} notOngoing={false} />}
            {selectedTab === 1 && <Projects id={id} notOngoing={true} />}
          </div>
        </div>
      </>
    </>
  );
}
