"use client";

import { useEffect, useState } from "react";

import DoccuSignSuccess from "./DoccuSignSuccess";
import { signFrameworkCompleted } from "@/data/consultants";
import { useRouter } from "next/navigation";
import { signCompleteOffer } from "@/data/offers";
import {
  completeSignMissionContract,
  signMissionContract,
} from "@/data/proposals";
import { getCookie } from "@/data/services/token";

export default function DoccuSignVerify({ scenario }) {
  // scenario = "FRAMEWORK" | "OFFER" | "MISSION"
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setTimeout(async () => {
      const singContract = async () => {
        switch (scenario) {
          case "FRAMEWORK":
            const frameWorkResponse = await signFrameworkCompleted();
            console.log("*-*-***--*response", frameWorkResponse);
            setLoading(false);
            if (
              frameWorkResponse &&
              Object.keys(frameWorkResponse?.data || {})?.length > 0
            ) {
              setTimeout(async () => {
                let proposalId = await getCookie("proposalId");
                const resp = await signMissionContract(proposalId);
                if (Object.keys(resp?.data || {})?.length > 0) {
                  if (resp?.data?.doccuSign?.url) {
                    const redirectUrl = resp.data.doccuSign.url;
                    router.push(redirectUrl);
                  }
                  return;
                }
              }, 10);
            }
            break;
          case "OFFER":
            const offerResponse = await signCompleteOffer();
            console.log("*-*-***--*response", offerResponse);
            setLoading(false);
            if (
              offerResponse &&
              Object.keys(offerResponse?.data || {})?.length > 0
            ) {
              console.log("*-*-***--*offerResponse", offerResponse);
              setTimeout(() => {
                router.push(
                  "/purchase-order?offerId=" +
                    offerResponse?.data?.updatedOffer?.id
                );
              }, 100);
            }
            break;
          case "MISSION":
            const missionResponse = await completeSignMissionContract();
            console.log("*-*-***--*response", missionResponse);
            setLoading(false);
            if (
              missionResponse &&
              Object.keys(missionResponse?.data || {})?.length > 0
            ) {
              setTimeout(() => {
                router.push("/consultant-personalized");
              }, 10);
            }
            break;
          default:
            break;
        }
      };
      await singContract();
    }, 10);
  }, []);
  return <>{loading ? <Processing /> : <DoccuSignSuccess />}</>;
}

const Processing = () => {
  return (
    <div className="verification-container bg-light">
      <div className="verification-content">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2 className="mt-3 ">Please wait, verifying...</h2>
        </div>
      </div>
    </div>
  );
};
