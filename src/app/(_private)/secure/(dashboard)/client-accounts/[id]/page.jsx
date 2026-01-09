import DashboardLayout from "@/components/dashboard/DashboardLayout";
import SubClientsDashboard from "@/components/dashboard/section/SubClientsDashboard";
import { getSubClientsData } from "@/data/client";

export const revalidate = 10;
export default async function ClientAccountsPage({ params }) {
  const { id } = params;
  const response = await getSubClientsData(id);

  return (
    <>
      <DashboardLayout>
        <SubClientsDashboard data={response?.data} id={id} />
      </DashboardLayout>
    </>
  );
}
