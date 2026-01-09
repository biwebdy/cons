import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConsultantProfileDashboard from "@/components/dashboard/section/ConsultantProfileDashboard";

import { getSingleConsultantData } from "@/data/consultants";
import { strapiLOV } from "@/data/loaders";

export const metadata = {
  title: "Expertree - Consultant SaaS | Create Consultant",
};
export const revalidate = 10;
export default async function page({ params }) {
  const { id } = params;
  const [lov, response] = await Promise.all([
    strapiLOV(),
    getSingleConsultantData(id),
  ]);

  return (
    <>
      <DashboardLayout>
        <ConsultantProfileDashboard
          cons={response?.data}
          lov={lov}
          isEdit={true}
        />
      </DashboardLayout>
    </>
  );
}
