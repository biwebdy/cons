import BannerLogo from "@/components/banner-elements/BannerLogo";
import LogoutIcon from "@/components/LogoutFromServerPages/LogoutIcons";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Expertree | Approval Page",
};
export const revalidate = 10;
export default async function page() {
  const user = await getUserMeLoader(false, true);
  if (user?.data?.consultant?.approval === "APPROVED") {
    redirect("/consultant-personalized");
  }

  if (user?.data?.consultant?.approval === "REJECTED") {
    return (
      <div
        className="container"
        style={{ height: "70vh", paddingTop: "100px" }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 className="animate-up-1 mb25 text-thm2">
            Your account is rejected.
          </h1>
          <p className="text animate-up-2">
            Please contact us if you think this is a mistake.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="container"
        style={{ height: "70vh", paddingTop: "100px" }}
      >
        <div
          className="text-center text-lg-start d-flex align-items-center"
          style={{ justifyContent: "space-between" }}
        >
          <div className="dashboard_header_logo position-relative  ">
            <BannerLogo color="blue" />
          </div>
          <div className="d-flex align-items-center">
            <LogoutIcon />{" "}
            <span className="ms-2" style={{ marginTop: "-10px" }}>
              Logout
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <h1 className="animate-up-1 mb25 text-thm2">
            Your account is not approved yet.
          </h1>
          <p className="text animate-up-2" style={{ fontWeight: "bold" }}>
            An email will be sent to you once your account is approved.
            <br />
            Please note that we may contact you before approving your account.
          </p>
        </div>
      </div>
    );
  }
}
