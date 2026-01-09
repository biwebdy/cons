"use client";

import MissionContracts from "./MissionContracts";

export default function ConsultantMissionContracts({ proposals }) {
  return (
    <>
      <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
        <div className="navtab-style1 grey-bg">
          <MissionContracts proposals={proposals} />
        </div>
      </div>
    </>
  );
}
