import { CONSULTANTS_LINKS } from "@/app/constants";
import BannerLogo from "@/components/banner-elements/BannerLogo";
import Navlist from "@/components/banner-elements/Navlist";
import ProjectInitition from "@/components/consultant/ProjectInitiation";
import { getSingleConsultantData } from "@/data/consultants";
import { strapiLOV } from "@/data/loaders";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
export const metadata = {
  title: "Expertree | Project Initiation",
};
export const revalidate = 10;
export default async function page() {
  const user = await getUserMeLoader();
  const consultant = user?.data?.consultant;
  const [cons, lov] = await Promise.all([
    getSingleConsultantData(consultant?.id),
    strapiLOV(),
  ]);
  const navLinks = CONSULTANTS_LINKS;
  return (
    <>
      <section className="  profile-bnr pb-0 ">
        <div className="container" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "-12px" }}>
            <BannerLogo color="yellow" />
          </div>
          <div
            className="row align-items-center justify-content-between"
            style={{ paddingTop: "180px" }}
          >
            <div className="col-lg-8">
              <div className="pr30 pr0-lg mb30-md position-relative">
                <h1 className="animate-up-1 mb25 text-white hero-title proxima">
                  Project Initiation
                </h1>
                <h3 className="text animate-up-2 text-white nsan">
                  Please fill the following information <br /> to start the
                  project.
                </h3>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="navlist">
                <Navlist links={navLinks} withLogout={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProjectInitition cons={cons?.data} lov={lov} />
    </>
  );
}
