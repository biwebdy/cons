import DashboardLayout from "@/components/dashboard/DashboardLayout";
import OfferDetails from "@/components/dashboard/section/OfferDetails";

export default function OfferPage({ params }) {
  const { id } = params;

  return (
    <DashboardLayout>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <OfferDetails id={id} />
        </div>
      </div>
    </DashboardLayout>
  );
}
