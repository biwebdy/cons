import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ClientProfileDashboard from "@/components/dashboard/section/ClientProfileDashboard";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Client",
};
export const revalidate = 0;
export default function page() {
  return (
    <>
      <DashboardLayout>
        <ClientProfileDashboard />
      </DashboardLayout>
    </>
  );
}
