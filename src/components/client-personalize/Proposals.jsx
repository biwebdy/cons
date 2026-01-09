import { useEffect, useState } from "react";
import LocalPagination from "../section/LocalPagination";
import ProposalCard from "../card/ProposalCard";
import { getClientProposalsByStatus } from "@/data/proposals";
import { blurByStatus } from "@/utils/displayStatus";

export default function Proposals({ id, proposalsStatus }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [proposalsData, setProposalsData] = useState([]);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getProposals = async () => {
      const resp = await getClientProposalsByStatus(
        currentPage,
        itemsPerPage,
        id,
        proposalsStatus
      );
      setProposalsData(resp?.data);
      setTotalPages(resp?.meta?.pagination?.pageCount || 1);
    };
    getProposals();
  }, [currentPage, id]);

  return (
    <div className="tailwind">
      {proposalsData?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-bold text-gray-700">No proposals found</p>
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
                  Start Date
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  End Date
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
              {proposalsData?.map((proposal, i) => (
                <ProposalCard
                  data={proposal}
                  key={i}
                  isBlur={blurByStatus(proposal?.status)}
                />
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            <LocalPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPaginate={handlePaginate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
