"use client";
import { resetPassword } from "@/data/passauth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BannerLogo from "../banner-elements/BannerLogo";
import FailModal from "../modals/FailModal";
import SuccessModal from "../modals/SuccessModal";
import Link from "next/link";
export default function ResetPassword({ token }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [failMessage, setFailMessage] = useState(
    "Something went wrong while processing your request. Please try again."
  );

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else {
      const response = await resetPassword(token, password);
      if (!response) {
        setFailModal(true);
        return;
      }
      if (response?.status === 200) {
        setSuccessModalVisible(true);
      } else {
        setFailMessage(response?.error);
        setFailModal(true);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
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
                style={{ marginTop: "100px" }}
              >
                <h2 className="title text-blue">Change your password</h2>
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
                      New Password
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                  <div className="mb20">
                    <label className="form-label fw600 dark-color">
                      Confirm Password
                    </label>
                    <input
                      id="identifier"
                      name="identifier"
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                      Change Password
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
        title={"Password Changed Successfully!"}
        message={"You can login now with your new password."}
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
