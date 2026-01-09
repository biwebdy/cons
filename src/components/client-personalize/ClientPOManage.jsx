"use client";

import { useEffect, useState } from "react";
import LocalPagination from "../section/LocalPagination";
import Image from "next/image";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import { useRouter } from "next/navigation";
import { getFullOffersByClientId } from "@/data/offers";
export default function ClientPOManage({ id }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const newPOSTotalPages = Math.ceil(purchaseOrders?.length / itemsPerPage);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getPurchaseOrders = async () => {
      const resp = await getFullOffersByClientId(
        id,
        currentPage,
        itemsPerPage,
        "SigningCompletedByClient",
        false
      );

      setPurchaseOrders(resp?.data);

      setTotalPages(resp?.meta?.pagination?.pageCount || 1);
    };
    getPurchaseOrders();
  }, [currentPage, id]);

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };
  return (
    <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
      <div className="navtab-style1">
        <>
          {!purchaseOrders || purchaseOrders?.length === 0 ? (
            <p className="text-center mt30" style={{ fontWeight: "900" }}>
              No purchase orders found
            </p>
          ) : (
            <>
              <table className="table-style3 table at-savesearch">
                <thead className="t-head">
                  <tr>
                    <th scope="col">Consultant</th>
                    <th scope="col">Start Date</th>
                    <th scope="col">End Date</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody className="t-body">
                  {getPaginatedData(purchaseOrders)?.map((purchaseOrder, i) => (
                    <>
                      <tr key={i}>
                        <th className="ps-0" scope="row">
                          <div className=" p-0 mb-0 box-shadow-none">
                            <div className="d-lg-flex align-items-lg-center">
                              <div className="thumb w60 position-relative rounded-circle mb15-md">
                                <Image
                                  height={60}
                                  width={60}
                                  className="rounded-circle mx-auto"
                                  src={
                                    handleImgResponse(
                                      purchaseOrder?.proposal?.consultant
                                        ?.profilePicture
                                    )
                                      ? handleImgResponse(
                                          purchaseOrder?.proposal?.consultant
                                            ?.profilePicture
                                        )
                                      : "/images/user.png"
                                  }
                                  alt="thumb"
                                />
                              </div>
                              <div className="details ml15 ml0-md mb15-md">
                                <h5 className="title mb-2">
                                  {
                                    purchaseOrder?.proposal?.consultant
                                      ?.firstName
                                  }{" "}
                                  {
                                    purchaseOrder?.proposal?.consultant
                                      ?.lastName
                                  }
                                </h5>
                              </div>
                            </div>
                          </div>
                        </th>

                        <td className="vam">
                          <h5 className="mb-0">
                            {formatDateWithDaysDisplay(
                              purchaseOrder?.proposal?.startDate
                            )}
                          </h5>
                        </td>
                        <td className="vam">
                          <h5 className="mb-0">
                            {formatDateWithDaysDisplay(
                              purchaseOrder?.proposal?.endDate
                            )}
                          </h5>
                        </td>

                        <td className="vam">
                          <button
                            onClick={() =>
                              router.push(
                                `/purchase-order?offerId=${purchaseOrder?.id}`
                              )
                            }
                            className="btn-prm"
                          >
                            Add Purchase Order
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
              <div className="mt30">
                <LocalPagination
                  currentPage={currentPage}
                  totalPages={newPOSTotalPages}
                  onPaginate={handlePaginate}
                />
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
}
