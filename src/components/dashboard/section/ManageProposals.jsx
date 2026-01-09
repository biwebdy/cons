import DashboardProposalCard from "@/components/card/DashboardProposalCard";
import DashboardNavigation from "../header/DashboardNavigation";
import { getAdminProposalsData } from "@/data/proposals";
import Pagination from "@/components/section/Pagination";

export default async function ManageProposals({ pageR }) {
  const page = pageR ? parseInt(pageR, 10) : 1;
  const pageSize = 10;

  const response = await getAdminProposalsData(
    page,
    pageSize,
    {},
    {
      id: "desc",
    }
  );
  const proposals = response?.data;
  const totalPages = response?.meta?.pagination?.pageCount;

  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-9">
            <div className="dashboard_title_area">
              <h2>Manage Proposals</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <table className="table-style3 table at-savesearch">
                  <thead className="t-head">
                    <tr>
                      <th scope="col">Client</th>
                      <th scope="col">Consultant</th>
                      <th scope="col">Status</th>
                      <th scope="col">Start Date</th>
                      <th scope="col">End Date</th>

                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tbody className="t-body">
                    {proposals?.map((item, i) => (
                      <DashboardProposalCard key={i} data={item} />
                    ))}
                  </tbody>
                </table>
                <div className="mt30">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    url={"/secure/manage-proposals"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
