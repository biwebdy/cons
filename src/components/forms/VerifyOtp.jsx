"use client";

import BannerLogo from "../banner-elements/BannerLogo";
import { useState } from "react";
import FailModal from "../modals/FailModal";
import { useRouter } from "next/navigation";
import { verifyOtp } from "@/data/passauth";
import SuccessModal from "../modals/SuccessModal";
import Link from "next/link";
export default function VerifyOtp({ email }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [failMessage, setFailMessage] = useState(
    "Something went wrong while processing your request. Please try again."
  );
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModal, setFailModal] = useState(false);

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    router.push("/reset-password?token=" + token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter OTP.");
      return;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const response = await verifyOtp(otp, email);

      if (!response) {
        setFailModal(true);
      }
      if (response?.status === 200) {
        setSuccessModalVisible(true);
        setToken(response?.data?.resetToken);
      } else {
        setFailMessage(response?.error);
        setFailModal(true);
      }
    } else {
      setError("Invalid email format");
    }
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
                style={{ marginTop: "100px" }}
              >
                <h2 className="title text-blue">Verify OTP</h2>
                <p className="paragraph">
                  We sent an OTP to your email.
                  <br /> Please enter it to reset your password.
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              <div
                className=" form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12"
                style={{ marginBottom: "70px" }}
              >
                <form>
                  <div className="mb20">
                    <label className="form-label fw600 dark-color">OTP</label>
                    <input
                      id="otp"
                      name="otp"
                      type="otp"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                    {error && (
                      <div
                        className="text-danger"
                        style={{ marginTop: "10px" }}
                      >
                        {error}
                      </div>
                    )}
                  </div>

                  <div className="d-grid mb20">
                    <button
                      type="submit"
                      className="btn-prm"
                      style={{ marginTop: "20px" }}
                      onClick={handleSubmit}
                    >
                      Reset Password
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SuccessModal
        isVisible={successModalVisible}
        title={"Success!"}
        message={"OTP verified successfully."}
        onclose={handleCloseSuccessModal}
      />
      <FailModal
        isVisible={failModal}
        title={"Something Went Wrong!"}
        message={failMessage}
        onclose={() => setFailModal(false)}
      />
    </>
  );
}
