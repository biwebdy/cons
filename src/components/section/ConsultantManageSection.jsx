"use client";
import { useState } from "react";
import ConsultantMissionContracts from "../consultant-personalize/ConsultantMissionContracts";
import ConsultantProjectsSection from "../consultant-personalize/ConsultantProjectsSection";
import ConsultantProposalSection from "../consultant-personalize/ConsultantProposalSection";
import { handleImgResponse } from "@/utils/utility";
import {
  FileText,
  ClipboardCheck,
  Briefcase,
  FileSignature,
} from "lucide-react";

export default function ConsultantManageSection({
  proposals,
  projects,
  frameworkContract,
}) {
  const pendingSigningProposals = proposals?.data?.filter(
    (proposal) =>
      proposal?.status === "PendingConsultantSigning" ||
      proposal?.status === "SigningStartedByConsultant"
  );
  const newProposals = proposals?.data?.filter(
    (proposal) => proposal?.status === "Pending"
  );
  const oldProposals = proposals?.data?.filter(
    (proposal) =>
      proposal?.status !== "Pending" &&
      proposal?.status !== "PendingL3Approval" &&
      proposal?.status !== "PendingConsultantSigning" &&
      proposal?.status !== "SigningStartedByConsultant" &&
      proposal?.status !== "RejectedByL3"
  );
  const oldProjects = projects?.data?.filter(
    (project) => project?.status !== "Ongoing"
  );
  const newProjects = projects?.data?.filter(
    (project) => project?.status === "Ongoing"
  );

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    {
      title: "Mission Contracts to Sign",
      icon: <FileSignature size={40} className="text-[#02153d]" />,
      isNotification: pendingSigningProposals?.length > 0,
    },
    {
      title: "Proposals Received",
      icon: <FileText size={40} className="text-[#02153d]" />,
      isNotification: newProposals?.length > 0,
    },
    {
      title: "Projects",
      icon: <Briefcase size={40} className="text-[#02153d]" />,
      isNotification: newProjects?.length > 0,
    },
    {
      title: "View Framework Contract",
      icon: <ClipboardCheck size={40} className="text-[#02153d] " />,
      isNotification: false,
      hide: !frameworkContract?.url,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Vertical Tabs */}
      <div className="w-full lg:w-1/4">
        <nav className="bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-2">
            {tabs.map((item, i) => (
              <div
                key={i}
                className={`relative w-full flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedTab === i
                    ? "bg-[#FDE7C6] text-[#02153d]"
                    : "hover:bg-gray-100"
                } ${item.hide ? "hidden" : ""}`}
                onClick={() => setSelectedTab(i)}
              >
                <div className="flex-shrink-0">{item?.icon}</div>
                <span className="font-medium">{item?.title}</span>
                {item?.isNotification && (
                  <span className="absolute -top-1 -left-3 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-3/4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {selectedTab === 0 && (
            <ConsultantMissionContracts proposals={pendingSigningProposals} />
          )}
          {selectedTab === 1 && (
            <ConsultantProposalSection
              newProposals={newProposals}
              oldProposals={oldProposals}
            />
          )}
          {selectedTab === 2 && (
            <ConsultantProjectsSection
              oldProjects={oldProjects}
              newProjects={newProjects}
            />
          )}
          {selectedTab === 3 && (
            <div className="flex items-center justify-center">
              <a
                target="_blank"
                href={handleImgResponse(frameworkContract)}
                className="text-[#1f4b3f] hover:text-[#1f4b3f] flex items-center space-x-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                <FileSignature size={35} className="text-[#02153d]" />
                <span className="font-medium">
                  Click to View Framework Contract
                </span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
