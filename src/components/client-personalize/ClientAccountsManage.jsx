"use client";
import { useRouter } from "next/navigation";
import LocalPagination from "../section/LocalPagination";
import { getSubClientsData } from "@/data/client";
import { useEffect, useState } from "react";
export default function ClientAccountsManage({ id }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [accountsData, setAccountsData] = useState([]);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getAccounts = async () => {
      const resp = await getSubClientsData(id, currentPage, itemsPerPage);

      setAccountsData(resp?.data);
      setTotalPages(resp?.meta?.pagination?.pageCount || 1);
    };
    getAccounts();
  }, [currentPage, id]);

  return (
    <>
      <div className="tailwind">
        <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
          <div className="navtab-style1">
            <div className="flex justify-end mb-4">
              <button
                className="btn-prm"
                onClick={() => {
                  router.push(`/sub-client-profile`);
                }}
              >
                Add Account
              </button>
            </div>
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
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {accountsData?.map((account, i) => (
                    <tr
                      key={i}
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(`/sub-client-profile/${account?.id}`)
                      }
                    >
                      <td className="py-4 px-6">
                        <h5 className="mb-0">
                          {account?.accountOwnerFirstName}{" "}
                          {account?.accountOwnerLastName}
                        </h5>
                      </td>
                      <td className="py-4 px-6">
                        <h5 className="mb-0">{account?.email}</h5>
                      </td>
                    </tr>
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
          </div>
        </div>
      </div>
    </>
  );
}
