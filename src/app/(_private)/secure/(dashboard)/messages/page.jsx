import DashboardLayout from "@/components/dashboard/DashboardLayout";
import MessagesInfo from "@/components/dashboard/section/MessagesInfo";
export const metadata = {
  title: "Expertree - Consultant SaaS | Messages",
};
export const revalidate = 10;
export default async function page({ searchParams }) {
  return (
    <>
      <DashboardLayout>
        <MessagesInfo pageR={searchParams?.page} />
      </DashboardLayout>
    </>
  );
}
