import { getFrontEndURL } from "@/data/common/serverVariable";
import { redirect } from "next/navigation";
import DashboardNavigation from "../header/DashboardNavigation";
export default async function DashboardInfo() {
  redirect(getFrontEndURL() + "/secure/manage-consultants");
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Dashboard</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative"></div>
          </div>
          <div className="col-md-6 col-xxl-4">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative"></div>
          </div>
        </div>
      </div>
    </>
  );
}
