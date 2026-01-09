import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientProfileDashboard from "@/components/dashboard/section/ClientProfileDashboard";
import { getSingleCompanyData } from "@/data/client";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Client",
};
export const revalidate = 10;
export default async function page({ params }) {
  const { id } = params;
  const response = await getSingleCompanyData(id);

  return (
    <>
      <DashboardLayout>
        <ClientProfileDashboard client={response?.data} />
      </DashboardLayout>
    </>
  );
}
