import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientAccountAddDashboard from "@/components/dashboard/section/ClientAccountAddDashboard";
import SubClientsDashboard from "@/components/dashboard/section/SubClientsDashboard";
import { getSingleCompanyData, getSubClientsData } from "@/data/client";

export const revalidate = 10;
export default async function ClientAccountAddPage({ params }) {
  const { id } = params;
  const response = await getSingleCompanyData(id);
  return (
    <>
      <DashboardLayout>
        <ClientAccountAddDashboard
          clientId={id}
          isEdit={false}
          client={response?.data}
        />
      </DashboardLayout>
    </>
  );
}
