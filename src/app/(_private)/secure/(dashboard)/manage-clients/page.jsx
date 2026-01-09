import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageClientsInfo from "@/components/dashboard/section/ManageClientsInfo";
import { getCompaniesData } from "@/data/client";

export const metadata = {
  title: "Expertree - Consultant SaaS | Manage Job",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams?.page, 10) : 1;
  const pageSize = 10;

  const response = await getCompaniesData(page, pageSize);
  const companies = response?.data;
  const totalPages = response?.meta?.pagination?.pageCount;
  return (
    <>
      <DashboardLayout>
        <ManageClientsInfo
          companies={companies}
          totalPages={totalPages}
          page={page}
        />
      </DashboardLayout>
    </>
  );
}
