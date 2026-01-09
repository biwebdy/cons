"use client";
import DashboardNavigation from "../header/DashboardNavigation";
import ClientPersonalInfo from "./ClientPersonalInfo";
import { Building2, Users } from "lucide-react";
import Link from "next/link";

export default function ClientProfileDashboard(props) {
  const { client } = props;

  return (
    <div className="tailwind">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="mb-4 lg:mb-0">
            <DashboardNavigation />
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-[50px] w-full">
            <div className="lg:w-3/4">
              <h2 className="text-2xl font-semibold text-[#02153d]">
                {client?.id ? "Edit" : "Add"} Client
              </h2>
            </div>

            {client?.parentClient?.id ? (
              <div className="lg:w-1/4 lg:text-right">
                <Link
                  href={`/secure/client-profile/${client?.parentClient?.id}`}
                  className="inline-flex items-center px-4 py-2 bg-[#02153d] text-white rounded-lg hover:bg-[#032a6f] transition-colors shadow-sm"
                >
                  <Building2 className="w-5 h-5 mr-2" />
                  View Client
                </Link>
              </div>
            ) : (
              <div className="lg:w-1/4 lg:text-right">
                <Link
                  href={`/secure/client-accounts/${client?.id}`}
                  className="inline-flex items-center px-4 py-2 bg-[#02153d] text-white rounded-lg hover:bg-[#032a6f] transition-colors shadow-sm"
                >
                  <Users className="w-5 h-5 mr-2" />
                  View Sub Accounts
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6">
          <ClientPersonalInfo client={client} />
        </div>
      </div>
    </div>
  );
}
