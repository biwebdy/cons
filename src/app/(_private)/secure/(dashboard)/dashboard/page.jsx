import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardInfo from "@/components/dashboard/section/DashboardInfo";

export const metadata = {
  title: "Expertree - Consultant SaaS | Dashboard",
};
export const revalidate = 10;
export default function page() {
  return (
    <>
      <DashboardLayout>
        <DashboardInfo />
      </DashboardLayout>
    </>
  );
}
