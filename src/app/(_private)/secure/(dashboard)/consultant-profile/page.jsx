import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConsultantProfileDashboard from "@/components/dashboard/section/ConsultantProfileDashboard";
import { strapiLOV } from "@/data/loaders";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Consultant",
};
export const revalidate = 0;
export default async function page() {
  const lov = await strapiLOV();

  return (
    <>
      <DashboardLayout>
        <ConsultantProfileDashboard
          pageTitle={"Add Consultant"}
          lov={lov}
          isEdit={false}
        />
      </DashboardLayout>
    </>
  );
}
