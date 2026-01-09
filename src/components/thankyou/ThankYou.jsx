"use client";

import Link from "next/link";

import BannerLogo from "../banner-elements/BannerLogo";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const router = useRouter();
  const handleLogin = () => {
    router.push("/login");
  };
  return (
    <>
      <section className="our-login">
        <div className="container" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "-12px" }}>
            <Link href="/">
              <BannerLogo color="blue" />
            </Link>
          </div>
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div
                className="main-title text-center"
                style={{ marginTop: "150px" }}
              >
                <h2 className="title text-blue">Thank You!</h2>
                <p className="paragraph">
                  Thank you for submitting your application! Please check your
                  email for the credentials to login.
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div
              className="col-xl-6 mx-auto"
              style={{ textAlign: "center", marginBottom: "24px" }}
            >
              <button className="btn-prm" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
