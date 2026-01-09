import { useEffect, useState } from "react";
import LocalPagination from "../section/LocalPagination";
import { getFullOffersByClientId } from "@/data/offers";
import OldOfferCard from "../card/OldOfferCard";

export default function OldOffers(props) {
  const { id } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [offers, setOffers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getOffers = async () => {
      const resp = await getFullOffersByClientId(
        id,
        currentPage,
        itemsPerPage,
        ["Pending", "SigningCompletedByClient"],
        true
      );
      setOffers(resp?.data);
      setTotalPages(resp?.meta?.pagination?.pageCount || 1);
    };
    getOffers();
  }, [currentPage, id]);

  return (
    <div className="tailwind">
      {offers?.length === 0 ? (
        <div className="text-center" style={{ fontWeight: "900" }}>
          No old offers found
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-[#ede5e1] text-[#02153d]">
                <tr>
                  <th scope="col" className="py-3 px-4 text-left font-semibold">
                    Consultant
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    Offer Date
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    Start Date
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    End Date
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    Contract
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    PO
                  </th>
                  <th scope="col" className="py-3 px-6 text-left font-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="t-body">
                {offers?.map((offer, i) => (
                  <OldOfferCard data={offer} key={i} isOld={true} />
                ))}
              </tbody>
            </table>

            <div className="mt30">
              <LocalPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPaginate={handlePaginate}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
