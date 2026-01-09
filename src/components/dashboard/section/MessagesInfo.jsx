import { getMessagesData } from "@/data/contactus";
import DashboardNavigation from "../header/DashboardNavigation";
import MessageDashboard from "./MessageDashboard";
import Pagination from "@/components/section/Pagination";

export default async function MessagesInfo({ pageR }) {
  const page = pageR ? parseInt(pageR, 10) : 1;
  const pageSize = 10;

  const response = await getMessagesData(page, pageSize);
  const messages = response?.data;
  const totalPages = response?.meta?.pagination?.pageCount;
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              <h2>Messages</h2>
              <p className="text">View Messages from Contact Us page</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
              <div className="packages_table table-responsive">
                <div className="navtab-style1">
                  {messages?.map((message, i) => (
                    <div key={i} className="col-md-12">
                      <MessageDashboard i={i} message={message} />
                    </div>
                  ))}
                </div>
                <div className="mt30">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    url={"/secure/messages"}
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
