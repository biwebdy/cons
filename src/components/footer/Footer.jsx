"use client";
import { usePathname } from "next/navigation";
import FooterHeader from "./FooterHeader";
import Link from "next/link";
// import FooterSelect2 from "./FooterSelect2";

export default function Footer() {
  const path = usePathname();
  if (path.startsWith("/secure")) {
    return <> </>;
  }
  return (
    <>
      <div className={`footer-style1 pb-0 blue-bg `}>
        <FooterHeader />

        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="text-center text-lg-start">
                <p
                  className={`copyright-text mb-2 mb-md-0  ${
                    path === "/home-11" ? "text-white" : "text-white-light"
                  } ff-heading`}
                >
                  @Expertree. 2024. All rights reserved. Powered By{" "}
                  <Link
                    href="https://lsconsulting.ch/"
                    target="_blank"
                    className="text-white"
                  >
                    LifeSci Consulting
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
