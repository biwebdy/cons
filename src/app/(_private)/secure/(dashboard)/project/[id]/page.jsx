import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardProject from "@/components/dashboard/section/DashboardProject";
import { getProjectData } from "@/data/projects";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Consultant",
};
export const revalidate = 10;
export default async function page({ params }) {
  const project = await getProjectData(params?.id);
  return (
    <>
      <DashboardLayout>
        <DashboardProject project={project?.data} />
      </DashboardLayout>
    </>
  );
}
