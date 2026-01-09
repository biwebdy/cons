import { CONSULTANTS_LINKS } from "@/app/constants";
import BannerLogo from "@/components/banner-elements/BannerLogo";
import Navlist from "@/components/banner-elements/Navlist";
import ProjectDetails from "@/components/section/ProjectDetails";
import { getProjectData } from "@/data/projects";
import Image from "next/image";

export const metadata = {
  title: "Expertree | Project",
};
export const revalidate = 10;
export default async function page({ params }) {
  const project = await getProjectData(params?.id);
  const navLinks = CONSULTANTS_LINKS;

  return (
    <>
      <section className="  cons-profile-bnr pb-0 ">
        <div
          className="container"
          style={{ position: "relative", margin: "50px 0px" }}
        >
          <div style={{ position: "absolute", top: "10px", left: "-12px" }}>
            <BannerLogo color="yellow" />
          </div>
          <div
            className="row align-items-center justify-content-between"
            style={{ paddingTop: "180px" }}
          >
            <div className="col-lg-8"></div>
            <div className="col-lg-6 ">
              <div className="navlist">
                <Navlist links={navLinks} withLogout={true} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProjectDetails project={project?.data} isCons={true} />
    </>
  );
}
