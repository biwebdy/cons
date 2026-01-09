import Banner from "@/components/banner-elements/Banner";
import ProjectDetails from "@/components/section/ProjectDetails";
import { getProjectData } from "@/data/projects";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";
export const metadata = {
  title: "Expertree | Project",
};
export const revalidate = 10;
export default async function page({ params }) {
  const project = await getProjectData(params?.id);
  const user = await getUserMeLoader();
  const isParent = user?.data?.role?.name === "L3";

  return (
    <>
      <Banner
        title="Project Details"
        isClient={isParent}
        isSubClient={!isParent}
      />

      <ProjectDetails project={project?.data} isCons={false} />
    </>
  );
}
