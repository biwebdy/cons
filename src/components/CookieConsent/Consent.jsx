"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";

const USER_CONSENT_COOKIE_KEY = "cookie_consent_is_true";
const USER_CONSENT_COOKIE_EXPIRE_DATE = 365;

const Consent = () => {
  const [cookieConsentIsTrue, setCookieConsentIsTrue] = useState(false);

  useEffect(() => {
    const consentIsTrue = Cookies.get(USER_CONSENT_COOKIE_KEY) === "true";
    setCookieConsentIsTrue(consentIsTrue);
  }, []);

  const handleConsent = (e) => {
    e.preventDefault();

    if (!cookieConsentIsTrue) {
      Cookies.set(USER_CONSENT_COOKIE_KEY, "true", {
        expires: USER_CONSENT_COOKIE_EXPIRE_DATE,
      });
      setCookieConsentIsTrue(true);
    }
  };

  if (cookieConsentIsTrue) {
    return null;
  }

  return (
    <div className="fixed-bottom blue-bg text-white p-4">
      <p className="text-white ">
        This site uses services that use cookies to deliver better experience
        and analyze traffic. You can learn more about the services we use at our{" "}
        <Link href="/privacy">Privacy policy</Link>.
      </p>
      <div className="d-flex justify-content-end">
        <button className="btn btn-scn" onClick={handleConsent}>
          Got it
        </button>
      </div>
    </div>
  );
};

export default Consent;
