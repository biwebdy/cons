"use client";
import Pagination from "@/components/section/Pagination";
import Link from "next/link";
import ClientDashboardCard from "../../card/ClientDashboardCard";
import DashboardNavigation from "../header/DashboardNavigation";

export default function ManageClientsInfo({ page, companies, totalPages }) {
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
                    Manage Clients
                  </h2>
                </div>
                <div className="lg:w-1/4 lg:text-right">
                  <Link
                    href="/secure/client-profile"
                    className="inline-flex items-center px-4 py-2 bg-[#02153d] text-white rounded-lg hover:bg-[#032a6f] transition-colors shadow-sm"
                  >
                    Add Client
                  </Link>
                </div>
              </div>
            </div>

            <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
              <div className="navtab-style1">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
                    <thead className="bg-[#ede5e1] text-[#02153d]">
                      <tr>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-semibold"
                        >
                          Client
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left font-semibold"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left font-semibold"
                        >
                          Account Owner Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left font-semibold"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left font-semibold"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-semibold"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies?.length > 0 && (
                        <>
                          {companies?.map((item, i) => (
                            <ClientDashboardCard
                              key={i}
                              data={item}
                              page={page}
                            />
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                  <div className="mt-8">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      url={"/secure/manage-clients"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
