import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageProposals from "@/components/dashboard/section/ManageProposals";

export const metadata = {
  title: "Expertree - Consultant SaaS | Manage Proposals",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  return (
    <>
      <DashboardLayout>
        <ManageProposals pageR={searchParams.page} />
      </DashboardLayout>
    </>
  );
}
