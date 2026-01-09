import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageProjectInfo from "@/components/dashboard/section/ManageProjectInfo";

export const metadata = {
  title: "Expertree - Consultant SaaS | Manage Projects",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  return (
    <>
      <DashboardLayout>
        <ManageProjectInfo pageR={searchParams.page} />
      </DashboardLayout>
    </>
  );
}
