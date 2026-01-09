import DashboardNavigation from "../header/DashboardNavigation";
import Pagination from "@/components/section/Pagination";
import ManageProjectCard from "../../card/ConsultantDashboardCard";
import DeleteModal from "../../modals/DeleteModal";
import { getProjectData, getProjectsData } from "@/data/projects";
import DashboardProjectCard from "@/components/card/DashboardProjectCard";

export default async function ManageProjectInfo({ pageR }) {
  const page = pageR ? parseInt(pageR, 10) : 1;
  const pageSize = 10;

  const response = await getProjectsData(page, pageSize, {
    id: "desc",
  });

  const projects = response?.data;
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
              <h2>Manage Projects</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30  position-relative">
              <div className="navtab-style1">
                <div className="packages_table table-responsive">
                  <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Client</th>
                        <th scope="col">Consultant</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="t-body">
                      {projects?.map((item, i) => (
                        <DashboardProjectCard key={i} data={item} />
                      ))}
                    </tbody>
                  </table>
                  <div className="mt30">
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      url={"/secure/manage-projects"}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal />
    </>
  );
}
