import ContactInfo from "../../components/section/Contactinfo";
import Header from "@/components/header/Header";

export const metadata = {
  title: "Expertree | Contact Us",
  description: "Reach out to us.",
  openGraph: {
    images: [
      {
        url: "/images/logos/logo-yellow.png",
      },
    ],
  },
};
export const revalidate = 10;
export default function page() {
  return (
    <>
      <Header />
      <section className="  cons-profile-bnr pb-0 ">
        <div
          className="container"
          style={{ position: "relative", margin: "50px 0px" }}
        >
          <div
            className="row align-items-center justify-content-between"
            style={{ paddingTop: "180px" }}
          >
            <div className="col-lg-8">
              <h1 className="animate-up-1 mb25 text-white hero-title ">
                Contact Us
              </h1>
              <h3 className="text animate-up-2 text-white nsan">
                We would love to talk about how we can help you.
              </h3>
            </div>
          </div>
        </div>
      </section>
      <ContactInfo />
      {/* <FaqSection /> */}
    </>
  );
}
