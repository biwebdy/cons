"use client";
import { useEffect, useState } from "react";
import ClientProjectsManage from "../client-personalize/ClientProjectsManage";
import ClientProposalsManage from "../client-personalize/ClientProposalsManage";

import { FileText, ClipboardCheck, Briefcase } from "lucide-react";
import ClientOffersManage from "../client-personalize/ClientsOfferManage";
import { getClientNotifications } from "@/data/client";

export default function SubClientManage({ id }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const [notifications, setNotifications] = useState({
    offersNotification: false,
    proposalsNotification: false,
    subClientOfferNotification: false,
    projectsNotification: false,
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
    console.log("After b");
  }, []);
  const tabs = [
    {
      title: "Proposals Sent",
      icon: <FileText size={40} className="text-[#02153d]" />,
      isNotification: notifications?.proposalsNotification,
    },
    {
      title: "Offers",
      icon: <ClipboardCheck size={40} className="text-[#02153d]" />,
      isNotification: notifications?.subClientOfferNotification,
    },
    {
      title: "Projects",
      icon: <Briefcase size={40} className="text-[#02153d]" />,
      isNotification: notifications?.projectsNotification,
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
                }`}
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
            <ClientProposalsManage id={id} isSubClient={true} />
          )}
          {selectedTab === 1 && (
            <ClientOffersManage id={id} isSubClient={true} />
          )}
          {selectedTab === 2 && (
            <ClientProjectsManage id={id} isSubClient={true} />
          )}
        </div>
      </div>
    </div>
  );
}
