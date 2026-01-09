import { useState } from "react";
import ProposalCard1 from "../card/ProposalCard1";
import LocalPagination from "../section/LocalPagination";
export default function OldProposals(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { proposals } = props;

  const oldProposalsTotalPages = Math.ceil(proposals?.length / itemsPerPage);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };
  return (
    <>
      {proposals?.length === 0 ? (
        <p className="text-center mt30" style={{ fontWeight: "900" }}>
          No old proposals found
        </p>
      ) : (
        <>
          <table className="table-style3 table at-savesearch">
            <thead className="t-head">
              <tr>
                <th scope="col">Client</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Status</th>
                <th scope="col">Mission Contract</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {getPaginatedData(proposals)?.map((proposal, i) => (
                <ProposalCard1 data={proposal} key={i} isOld={true} />
              ))}
            </tbody>
          </table>
          <div className="mt30">
            <LocalPagination
              currentPage={currentPage}
              totalPages={oldProposalsTotalPages}
              onPaginate={handlePaginate}
            />
          </div>
        </>
      )}
    </>
  );
}
