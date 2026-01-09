import { useEffect, useState } from "react";
import LocalPagination from "../section/LocalPagination";
import OfferCard from "../card/OfferCard";
import { getFullOffersByClientId } from "@/data/offers";

export default function NewOffers(props) {
  const { id, isSubClient } = props;
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
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
        isSubClient
          ? ["SigningCompletedByClient"]
          : ["Pending", "SigningCompletedByClient", "SigningStartedByClient"],

        false
      );

      setOffers(resp?.data);
    };
    getOffers();
  }, [currentPage, id]);
  console.log("After b");
  return (
    <div className="tailwind">
      {offers?.length === 0 ? (
        <div className="text-center" style={{ fontWeight: "900" }}>
          No new offers found
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
                    Status
                  </th>
                  <th scope="col" className="py-3 px-4 text-left font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="t-body">
                {offers?.map((offer, i) => (
                  <OfferCard data={offer} key={i} />
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
