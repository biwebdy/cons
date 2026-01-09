"use client";
import { changePasswordAction } from "@/data/actions/auth-actions";
import { useFormState, useFormStatus } from "react-dom";
import BannerLogo from "../banner-elements/BannerLogo";
import { StrapiErrors } from "../utils/StrapiErrors";
import { ZodErrors } from "../utils/ZodErrors";
import Link from "next/link";
import { MoveUpRight } from "lucide-react";
const INITIAL_STATE = {
  zodErrors: null,
  strapiErrors: null,
  data: null,
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button className="btn-prm" type="submit" disabled={pending}>
      {pending ? "Changing Password..." : "Change Password"}
      {!pending && <MoveUpRight size={24} />}
    </button>
  );
}

export default function ChangePasswordForm() {
  const [formState, formAction] = useFormState(
    changePasswordAction,
    INITIAL_STATE
  );
  const { pending } = useFormStatus();

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
                style={{ marginTop: "50px" }}
              >
                <h2 className="title text-blue">Change Password</h2>
                <p className="paragraph">
                  Update your password for better security
                </p>
              </div>
            </div>
          </div>
          <div className="row wow fadeInRight" data-wow-delay="300ms">
            <div className="col-xl-6 mx-auto">
              {pending && (
                <div className="text-center mb-3">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}
              <div
                className=" form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12"
                style={{ marginBottom: "70px" }}
              >
                <form action={formAction}>
                  <div className="mb20">
                    <label className="form-label fw600 dark-color">
                      Current Password
                    </label>
                    <input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      className="form-control"
                      placeholder="Enter your current password"
                    />
                    <ZodErrors error={formState?.zodErrors?.currentPassword} />
                  </div>
                  <div className="mb20">
                    <label className="form-label fw600 dark-color">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      className="form-control"
                      placeholder="Enter your new password"
                    />
                    <ZodErrors error={formState?.zodErrors?.newPassword} />
                  </div>
                  <div className="mb15">
                    <label className="form-label fw600 dark-color">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      placeholder="Confirm your new password"
                    />
                    <ZodErrors error={formState?.zodErrors?.confirmPassword} />
                  </div>
                  <StrapiErrors error={formState?.strapiErrors} />
                  {formState?.message && (
                    <div className="alert alert-success" role="alert">
                      {formState.message}
                    </div>
                  )}
                  <div className="d-grid mb20">
                    <SubmitButton />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
