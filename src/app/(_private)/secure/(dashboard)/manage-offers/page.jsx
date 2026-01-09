import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageOffers from "@/components/dashboard/section/ManageOffers";

export const metadata = {
  title: "Expertree - Consultant SaaS | Manage Proposals",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  return (
    <>
      <DashboardLayout>
        <ManageOffers pageR={searchParams.page} />
      </DashboardLayout>
    </>
  );
}
