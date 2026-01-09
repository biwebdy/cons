"use client";
import { FormProvider } from "@/utils/formContext";
import DashboardNavigation from "../header/DashboardNavigation";
// import BankingInfo from "./consultant-profile/BankingInfo";
import EditConsultant from "@/components/consultant/EditConsultant";
import AddConsultant from "./consultant-profile/AddConsultant";

export default function ConsultantProfileDashboard(props) {
  const { cons, pageTitle, isRegister, lov, isEdit } = props;
  return (
    <>
      <FormProvider>
        <div className="dashboard__content hover-bgc-color">
          <div className="form-style1">
            <div className="row pb40">
              {!isRegister && (
                <div className="col-lg-12">
                  <DashboardNavigation />
                </div>
              )}

              <div className="col-lg-9">
                <div className="dashboard_title_area">
                  <h2>{pageTitle}</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12">
                {isEdit ? (
                  <div className="bgc-white">
                    <EditConsultant cons={cons} lov={lov} isAdmin={true} />
                  </div>
                ) : (
                  <AddConsultant lov={lov} />
                )}
              </div>
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
}
