import ConsultantDashboardCard from "@/components/card/ConsultantDashboardCard";
import LocalPagination from "@/components/section/LocalPagination";
import { getconsultantsDataByApprovalStatus } from "@/data/consultants";
import { useEffect, useState } from "react";

export default function ConsultantsList({ status }) {
  const [page, setPage] = useState(1);
  const [consultants, setConsultants] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const handleGetPendingConsultants = async () => {
      const filters = {
        approval: status,
      };
      const response = await getconsultantsDataByApprovalStatus(
        page,
        pageSize,
        filters,
        {
          id: "desc",
        },
        true
      );

      setTotalPages(response?.meta?.pagination?.pageCount);
      setConsultants(response?.data);
    };

    handleGetPendingConsultants();
  }, [page]);

  const handlePaginate = (page) => {
    setPage(page);
  };

  return (
    <div className="tailwind">
      {consultants?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-bold text-gray-700">
            No consultants found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-[#ede5e1] text-[#02153d]">
              <tr>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Consultant
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Rate
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {consultants?.map((item, i) => (
                <ConsultantDashboardCard key={i} data={item} page={page} />
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            <LocalPagination
              currentPage={page}
              totalPages={totalPages}
              onPaginate={handlePaginate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
