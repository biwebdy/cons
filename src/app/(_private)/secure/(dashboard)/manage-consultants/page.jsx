import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageConsultantsInfo from "@/components/dashboard/section/ManageConsultantsInfo";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Consultant",
};
export const revalidate = 10;
export default async function page() {
  return (
    <>
      <DashboardLayout>
        <ManageConsultantsInfo />
      </DashboardLayout>
    </>
  );
}
