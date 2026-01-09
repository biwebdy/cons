import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ManageRegisteredClientsInfo from "@/components/dashboard/section/ManageRegisteredClientsInfo";
import { getRegisteredClients } from "@/data/client";

export const metadata = {
  title: "Expertree - Manage Registered Clients",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  const page = searchParams?.page ? parseInt(searchParams?.page, 10) : 1;
  const pageSize = 10;

  const response = await getRegisteredClients(page, pageSize);
  const companies = response?.data;
  const totalPages = response?.meta?.pagination?.pageCount;
  return (
    <>
      <DashboardLayout>
        <ManageRegisteredClientsInfo
          companies={companies}
          totalPages={totalPages}
          page={page}
        />
      </DashboardLayout>
    </>
  );
}
