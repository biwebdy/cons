"use client";
import { use, useEffect, useState } from "react";
import ClientProjectsManage from "./ClientProjectsManage";
import ClientProposalsManage from "./ClientProposalsManage";
import ClientOffersManage from "./ClientsOfferManage";

import {
  FileText,
  ClipboardCheck,
  Receipt,
  Briefcase,
  User,
} from "lucide-react";
import ClientAccountsManage from "./ClientAccountsManage";

import { getClientNotifications } from "@/data/client";

//ROLES what is the status of the proposal that awaits L3 approval
export default function ClientManageSection({ id }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [notifications, setNotifications] = useState({
    offersNotification: false,
    proposalsNotification: false,
  });
  useEffect(() => {
    const getNotifications = async () => {
      const resp = await getClientNotifications(id);
      console.log(
        "Resp getClientNotifications (notifications are resp.data)",
        resp
      );
      setNotifications(resp?.data);
    };
    getNotifications();
  }, []);
  const tabs = [
    {
      title: "Proposals",
      icon: <FileText size={40} className="text-[#02153d]" />,
      isNotification: notifications?.proposalsNotification,
    },

    {
      title: "Offers Received",
      icon: <ClipboardCheck size={40} className="text-[#02153d]" />,
      isNotification: notifications?.offersNotification,
    },

    {
      title: "Projects",
      icon: <Briefcase size={40} className="text-[#02153d]" />,
      isNotification: notifications?.projectsNotification,
    },

    {
      title: "Sub Accounts",
      icon: <User size={40} className="text-[#02153d]" />,
      isNotification: false,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Vertical Tabs */}
      <div className="w-full lg:w-1/4">
        <nav className="bg-white rounded-lg shadow-sm p-4">
          <div className="space-y-2">
            {tabs.map((item, i) => (
              <>
                <div
                  key={i}
                  className={`relative w-full flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                    selectedTab === i
                      ? "bg-[#FDE7C6] text-[#02153d]"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTab(i)}
                >
                  <div className="flex-shrink-0">{item?.icon}</div>
                  <span className="font-medium">{item?.title}</span>
                  {item?.isNotification && (
                    <span className="absolute -top-1 -left-3 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </div>
              </>
            ))}
          </div>
        </nav>
      </div>

      {/* Content Area */}
      <div className="w-full lg:w-3/4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {selectedTab === 0 && <ClientProposalsManage id={id} />}
          {/* {selectedTab === 1 && <ClientSubProposals id={id} />} */}
          {selectedTab === 1 && <ClientOffersManage id={id} />}
          {selectedTab === 2 && <ClientProjectsManage id={id} />}
          {selectedTab === 3 && <ClientAccountsManage id={id} />}
        </div>
      </div>
    </div>
  );
}
