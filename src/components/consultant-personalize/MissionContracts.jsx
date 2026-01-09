import { useState } from "react";
import LocalPagination from "../section/LocalPagination";
import MissionContractCard from "../card/MissionContractCard";
export default function MissionContracts({ proposals }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const newProposalsTotalPages = Math.ceil(proposals?.length / itemsPerPage);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };
  return (
    <div className="tailwind">
      <>
        {proposals?.length === 0 ? (
          <p className="text-center mt30" style={{ fontWeight: "900" }}>
            No new mission contracts found
          </p>
        ) : (
          <>
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
                      Start Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-6 text-left font-semibold"
                    >
                      End Date
                    </th>
                    <th
                      scope="col"
                      className="py-3 px-4 text-left font-semibold"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {getPaginatedData(proposals)?.map((proposal, i) => (
                    <MissionContractCard data={proposal} key={i} />
                  ))}
                </tbody>
              </table>
              <div className="mt30">
                <LocalPagination
                  currentPage={currentPage}
                  totalPages={newProposalsTotalPages}
                  onPaginate={handlePaginate}
                />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
