"use client";
import {
  Briefcase,
  FileCheck,
  FileText,
  LogOut,
  MessageSquare,
  UserCheck,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

export default function DashboardSidebar() {
  const [offersNotification, setOffersNotification] = useState(false);
  const [proposalsNotification, setProposalsNotification] = useState(false);
  const [projectsNotification, setProjectsNotification] = useState(false);
  const [clientsNotification, setClientsNotification] = useState(false);
  const [registeredClientsNotification, setRegisteredClientsNotification] =
    useState(false);

  const path = usePathname();
  const router = useRouter();

  const getNotifications = async () => {
    try {
      const response = await fetch("/api/admin/notifications", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      const data = resp?.data;

      setOffersNotification(data?.offersNotification || false);
      setProposalsNotification(data?.proposalsNotification || false);
      setProjectsNotification(data?.projectsNotification || false);
      setClientsNotification(data?.clientsNotification || false);
      setRegisteredClientsNotification(
        data?.registeredClientsNotification || false
      );
    } catch (error) {
      console.error("Failed to fetch notifications:", error);

      setOffersNotification(false);
      setProposalsNotification(false);
      setProjectsNotification(false);
      setClientsNotification(false);
      setRegisteredClientsNotification(false);
    }
  };

  useEffect(() => {
    getNotifications();
    setTimeout(() => {
      getNotifications();
    }, 3000);
    const intervalId = setInterval(getNotifications, 30000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const dasboardNavigation = useMemo(
    () => [
      {
        id: 4,
        name: "Messages",
        icon: <MessageSquare size={40} className="text-[#02153d]" />,
        path: "/secure/messages",
      },
      {
        id: 9,
        name: "Manage Consultants",
        icon: <Users size={40} className="text-[#02153d]" />,
        path: "/secure/manage-consultants",
      },
      {
        id: 14,
        name: "Manage Clients",
        icon: <UserCheck size={40} className="text-[#02153d]" />,
        path: "/secure/manage-clients",
        isNotification: clientsNotification,
      },
      {
        id: 9,
        name: "Manage Proposals",
        icon: <FileText size={40} className="text-[#02153d]" />,
        path: "/secure/manage-proposals",
        isNotification: proposalsNotification,
      },
      {
        id: 10,
        name: "Manage Offers",
        icon: <FileCheck size={40} className="text-[#02153d]" />,
        path: "/secure/manage-offers",
        isNotification: offersNotification,
      },
      {
        id: 11,
        name: "Manage Projects",
        icon: <Briefcase size={40} className="text-[#02153d]" />,
        path: "/secure/manage-projects",
        isNotification: projectsNotification,
      },
      {
        id: 12,
        name: "Manage Registered Clients",
        icon: <UserCheck size={40} className="text-[#02153d]" />,
        path: "/secure/manage-registered-clients",
        isNotification: registeredClientsNotification,
      },
      {
        id: 15,
        name: "Logout",
        icon: <LogOut size={40} className="text-[#02153d]" />,
        path: "/login",
      },
    ],
    [
      offersNotification,
      proposalsNotification,
      projectsNotification,
      clientsNotification,
      registeredClientsNotification,
    ]
  );

  return (
    <div className="tailwind">
      <div className="w-full">
        <nav className="bg-white rounded-lg shadow-sm p-4 ">
          <div className="space-y-2">
            {dasboardNavigation.map((item, i) => (
              <div
                key={i}
                className={`relative w-full flex items-center space-x-3 p-4 rounded-lg transition-all duration-200 cursor-pointer ${
                  path === item.path
                    ? "bg-[#FDE7C6] text-[#02153d]"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => router.push(item.path)}
              >
                <div className="flex-shrink-0">{item?.icon}</div>
                <span className="font-medium">{item?.name}</span>
                {item?.isNotification && (
                  <span className="absolute -top-1 -left-3 w-3 h-3 bg-red-500 rounded-full"></span>
                )}
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
