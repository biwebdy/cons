import BannerLogo from "@/components/banner-elements/BannerLogo";
import ClientRegister from "@/components/dashboard/section/ClientRegister";
import Link from "next/link";

export const metadata = {
  title: "Expertree | Client Registration",
};
export const revalidate = 10;
export default function page() {
  return (
    <>
      <section className="  ">
        <div className="container relative" style={{ position: "relative" }}>
          <div className="absolute -top-[40px] md:-top-[30px] -left-[12px]">
            <Link href="/">
              <BannerLogo color="blue" />
            </Link>
          </div>

          <div
            className="main-title text-center"
            style={{ marginTop: "100px" }}
          >
            <h2 className="title text-blue">Client Registration</h2>
            <p className="paragraph">Welcome on board!</p>
          </div>

          <div
            className="form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12"
            style={{ marginBottom: "70px" }}
          >
            <div className="mb30">
              <p className="text">
                Already have an account?{" "}
                <Link href="/login" className="text-thm">
                  Sign In!
                </Link>
              </p>
            </div>
            <ClientRegister />
          </div>
        </div>
      </section>
    </>
  );
}
