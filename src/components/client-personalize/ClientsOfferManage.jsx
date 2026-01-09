"use client";

import { useState } from "react";
import NewOffers from "./NewOffers";
import OldOffers from "./OldOffers";

export default function ClientOffersManage({ id, isSubClient = false }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = ["New Offers", "Old Offers"];

  return (
    <>
      <>
        <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
          <div className="navtab-style1">
            <nav>
              <div className="nav nav-tabs mb30 ">
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
            {selectedTab === 0 && (
              <NewOffers id={id} isSubClient={isSubClient} />
            )}
            {selectedTab === 1 && <OldOffers id={id} />}
          </div>
        </div>
      </>
    </>
  );
}
