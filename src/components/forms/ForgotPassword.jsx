"use client";
import { forgotPassword } from "@/data/passauth";
import BannerLogo from "../banner-elements/BannerLogo";
import { useState } from "react";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [failMessage, setFailMessage] = useState(
    "Something went wrong while processing your request. Please try again."
  );

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter your email address");
      return;
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const response = await forgotPassword(email);
      if (!response) {
        setFailModal(true);
        return;
      }
      if (response?.status === 200) {
        setSuccessModalVisible(true);
      } else {
        setFailMessage(response?.message);
        setFailModal(true);
      }
    } else {
      setError("Invalid email format");
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    router.push("/verify-otp?email=" + email);
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
                <h2 className="title text-blue">Forgot you password?</h2>
                <p className="paragraph">
                  Please enter your email address, and we will send you <br />{" "}
                  insturctions on how to reset your password.
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
                    <label className="form-label fw600 dark-color">
                      Email Address
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type="email"
                      className="form-control"
                      placeholder="expertree@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      Send OTP
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
        title={"OTP Sent!"}
        message={"Please check your email for the OTP."}
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
