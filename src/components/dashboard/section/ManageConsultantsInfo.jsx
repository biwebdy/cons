"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import DeleteModal from "../../modals/DeleteModal";
import Link from "next/link";
import DeactivateModal from "../../modals/DeactivateModal";
import ActivateModal from "../../modals/ActivateModal";
import { useState } from "react";
import ConsultantsList from "./ConsultantsList";
import { ClipboardCheck, UserCheck, XCircle } from "lucide-react";

export default function ManageConsultantsInfo({}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    {
      title: "Pending",
      icon: <ClipboardCheck size={40} className="text-[#02153d]" />,
    },
    {
      title: "Approved",
      icon: <UserCheck size={40} className="text-[#02153d]" />,
    },
    {
      title: "Rejected",
      icon: <XCircle size={40} className="text-[#02153d]" />,
    },
  ];

  return (
    <div className="tailwind">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Header Section */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="mb-4 lg:mb-0">
                <DashboardNavigation />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-[50px] w-full">
                <div className="lg:w-3/4">
                  <h2 className="text-2xl font-semibold text-[#02153d]">
                    Manage Consultants
                  </h2>
                </div>
                <div className="lg:w-1/4 lg:text-right">
                  <Link
                    href="/secure/consultant-profile"
                    className="inline-flex items-center px-4 py-2 bg-[#02153d] text-white rounded-lg hover:bg-[#032a6f] transition-colors shadow-sm"
                  >
                    Add Consultant
                  </Link>
                </div>
              </div>
            </div>

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
                        {item.title}
                      </button>
                    ))}
                  </div>
                </nav>
                <div className="p-6">
                  {selectedTab === 0 && <ConsultantsList status="TOAPPROVE" />}
                  {selectedTab === 1 && <ConsultantsList status="APPROVED" />}
                  {selectedTab === 2 && <ConsultantsList status="REJECTED" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal />
      <ActivateModal />
      <DeactivateModal />
    </div>
  );
}
