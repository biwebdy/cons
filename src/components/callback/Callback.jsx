"use client";

import { completeSignMissionContract } from "@/data/proposals";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MoveUpRight } from "lucide-react";
export default function Callback({ searchParams }) {
  const [showErrorPage, setShowErrorPage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const singContract = async (proposalId, envelopId) => {
      const response = await completeSignMissionContract(proposalId, envelopId);
      if (Object.keys(response?.data)?.length > 0) {
        router?.push("/consultant-personalized");
      } else {
        setShowErrorPage(true);
      }
    };
    if (searchParams?.event === "signing_complete") {
      const proposalId = localStorage?.getItem("proposalId");
      const envelopId = localStorage?.getItem("envelopeId");
      singContract(proposalId, envelopId);
    } else {
      setShowErrorPage(true);
    }
  }, []);

  return (
    <>
      {showErrorPage && (
        <section className="our-error" style={{ padding: "100px 0px " }}>
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-6 wow fadeInRight" data-wow-delay="300ms">
                <div className="animate_content text-center text-xl-start">
                  <div className="animate_thumb">
                    <Image
                      height={500}
                      width={500}
                      className="w-100"
                      src="/images/icon/error-page-img.svg"
                      alt="error-page-img"
                    />
                  </div>
                </div>
              </div>
              <div
                className="col-xl-5 offset-xl-1 wow fadeInLeft"
                data-wow-delay="300ms"
              >
                <div className="error_page_content text-center text-xl-start">
                  <div className="h2 error_title">
                    Oops. It looks like something went{" "}
                    <span className="text-thm">wrong</span>.
                  </div>
                  <p className="text fz15 mb20">
                    Please Contact us to fix the issue.
                    <br className="d-none d-lg-block" />
                  </p>
                  <Link href="/" className="btn-prm">
                    Go back to home
                    <MoveUpRight size={24} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
