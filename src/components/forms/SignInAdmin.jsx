"use client";
import { loginUserAction } from "@/data/actions/auth-actions";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import BannerLogo from "../banner-elements/BannerLogo";
import { StrapiErrors } from "../utils/StrapiErrors";
import { ZodErrors } from "../utils/ZodErrors";
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
      {pending ? "Logging In..." : "Log In"}
      {!pending && <MoveUpRight className="ml-2 -mt-2" />}
    </button>
  );
}

export default function SignInAdmin() {
  const [formState, formAction] = useFormState(loginUserAction, INITIAL_STATE);
  const { pending } = useFormStatus();
  return (
    <>
      <div className="tailwind">
        <section className="our-login">
          <div className="container relative">
            <div className="absolute -top-[40px] md:-top-[30px] -left-[12px]">
              <Link href="/">
                <BannerLogo color="blue" />
              </Link>
            </div>
            <div>
              <div className="w-1/2 m-auto wow fadeInUp" data-wow-delay="300ms">
                <div className="main-title text-center mt-[50px]">
                  <h2 className="title text-blue">Log In</h2>
                  <p className="paragraph">We&apos;re glad to see you again!</p>
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
                  className="form-style1 bgc-white p50 p30-sm default-box-shadow1 bdrs12"
                  style={{ marginBottom: "70px" }}
                >
                  <form action={formAction}>
                    <div className="mb30">
                      <p className="text">
                        Don&apos;t have an account?{" "}
                        <Link href="/register" className="text-thm">
                          Sign Up!
                        </Link>
                      </p>
                    </div>
                    <div className="mb20">
                      <label className="form-label fw600 dark-color">
                        Email Address
                      </label>
                      <input
                        id="identifier"
                        name="identifier"
                        type="email"
                        className="form-control"
                        placeholder="Expertree@gmail.com"
                      />
                      <ZodErrors error={formState?.zodErrors?.identifier} />
                    </div>
                    <div className="mb-4">
                      <label className="form-label fw600 dark-color">
                        Password
                      </label>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="*******"
                      />
                      <Link href="/forgot-password">Forgot your password?</Link>
                      <ZodErrors error={formState?.zodErrors?.password} />
                    </div>

                    <StrapiErrors error={formState?.strapiErrors} />
                    <div className="grid mb-4">
                      <SubmitButton />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
