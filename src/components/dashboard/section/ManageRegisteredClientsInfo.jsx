import RegisteredClientDashboardCard from "@/components/card/RegisteredClientDashboardCard";
import Pagination from "@/components/section/Pagination";

export default function ManageRegisteredClientsInfo({
  companies,
  totalPages,
  page,
}) {
  return (
    <div className="tailwind">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Header Section */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-[50px] w-full">
                <div className="lg:w-3/4">
                  <h2 className="text-2xl font-semibold text-[#02153d]">
                    Manage Registered Clients
                  </h2>
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-6 text-left font-semibold"
                        >
                          Company Name
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
                          Phone Number
                        </th>
                        <th
                          scope="col"
                          className="py-3 px-4 text-left font-semibold"
                        >
                          Message
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {companies?.length > 0 && (
                        <>
                          {companies?.map((item, i) => (
                            <RegisteredClientDashboardCard
                              key={i}
                              data={item}
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
