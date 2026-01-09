import Pagination from "@/components/section/Pagination";
import DashboardNavigation from "../header/DashboardNavigation";

import DashboardOfferCard from "@/components/card/DashboardOfferCard";
import { getOffersData } from "@/data/offers";

export default async function ManageOffers({ pageR }) {
  const page = pageR ? parseInt(pageR, 10) : 1;
  const pageSize = 10;

  const response = await getOffersData(
    page,
    pageSize,
    {
      id: "desc",
    },
    null
  );

  // Sort offers to show POSubmittedByClient status first
  const sortedOffers = response?.data?.sort((a, b) => {
    if (a.status === "POSubmittedByClient") return -1;
    if (b.status === "POSubmittedByClient") return 1;
    return 0;
  });

  const totalPages = response?.meta?.pagination?.pageCount;

  return (
    <>
      <div className="tailwind">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-[50px] w-full">
          <div className="lg:w-3/4">
            <h2 className="text-2xl font-semibold text-[#02153d]">
              Manage Offers
            </h2>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-[#ede5e1] text-[#02153d]">
              <tr>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Client
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Consultant
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Offer Contract
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Mission Contract
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Purchase Order
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="t-body">
              {sortedOffers?.map((item, i) => (
                <DashboardOfferCard key={i} data={item} />
              ))}
            </tbody>
          </table>
          <div className="mt30">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              url={"/secure/manage-offers"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

//  <div className="tailwind">
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Header Section */}
//         <div className="w-full">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
//               <div className="mb-4 lg:mb-0">
//                 <DashboardNavigation />
//               </div>

//             </div>

//             <div className="freelancer-style1 bdr1 hover-box-shadow row ms-0 grey-bg">
//               <div className="navtab-style1">
//                 <nav>
//                   <div className="nav nav-tabs mb30">
//                     {tabs?.map((item, i) => (
//                       <button
//                         key={i}
//                         className={`nav-link fw500  grey-bg ${
//                           selectedTab == i ? "active" : ""
//                         }`}
//                         onClick={() => setSelectedTab(i)}
//                       >
//                         {item.title}
//                       </button>
//                     ))}
//                   </div>
//                 </nav>
//                 <div className="p-6">
//                   {selectedTab === 0 && <ConsultantsList status="TOAPPROVE" />}
//                   {selectedTab === 1 && <ConsultantsList status="APPROVED" />}
//                   {selectedTab === 2 && <ConsultantsList status="REJECTED" />}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <DeleteModal />
//       <ActivateModal />
//       <DeactivateModal />
//     </div>
//   );
// }
// <div className="overflow-x-auto">
//   <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
//     <thead className="bg-[#ede5e1] text-[#02153d]">
//       <tr>
//         <th scope="col" className="py-3 px-4 text-left font-semibold">
//           Consultant
//         </th>
//         <th scope="col" className="py-3 px-6 text-left font-semibold">
//           Rate
//         </th>
//         <th scope="col" className="py-3 px-6 text-left font-semibold">
//           Status
//         </th>
//         <th scope="col" className="py-3 px-4 text-left font-semibold">
//           Action
//         </th>
//       </tr>
//     </thead>
//     <tbody>
//       {consultants?.map((item, i) => (
//         <ConsultantDashboardCard key={i} data={item} page={page} />
//       ))}
//     </tbody>
//   </table>
//   <div className="mt-8">
//     <LocalPagination
//       currentPage={page}
//       totalPages={totalPages}
//       onPaginate={handlePaginate}
//     />
//   </div>
// </div>;
