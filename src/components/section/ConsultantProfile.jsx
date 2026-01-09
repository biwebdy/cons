"use client";
import { CLIENTS_LINKS } from "@/app/constants";
import { formatDateForDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useEffect, useState } from "react";
import BannerLogo from "../banner-elements/BannerLogo";
import Navlist from "../banner-elements/Navlist";
import ConsultantAbout from "../element/ConsultantAbout";
import ConsultantSkill from "../element/ConsultantSkill";
import Banner from "../banner-elements/Banner";

export default function ConsultantProfile(props) {
  const { consultant, user } = props;
  const IS_PROFILE_CONS = true;
  const [SHOW_DETAILS, setShowDetails] = useState(false);
  const navLinks = CLIENTS_LINKS;

  useEffect(() => {
    const flag = JSON.parse(localStorage.getItem("consultantView"));
    if (flag) {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, []);

  const isParent = user?.data?.role?.name === "L3";
  return (
    <>
      <Banner
        title={`Consultant Profile`}
        isClient={isParent}
        isSubClient={!isParent}
      />

      <section className="pt10 pb90 pb30-md">
        <div className="container">
          <div className="row wow fadeInUp">
            <div className="col-lg-8">
              <div className="service-about">
                <div
                  className="list-meta d-sm-flex align-items-center"
                  style={{ margin: "35px 0px" }}
                >
                  <div className="position-relative freelancer-single-style">
                    <Image
                      width={90}
                      height={90}
                      className={`rounded-circle wa-sm mb15-sm object-fit-cover ${
                        SHOW_DETAILS ? "" : "blurImg"
                      } `}
                      src={
                        handleImgResponse(consultant?.profilePicture) &&
                        SHOW_DETAILS
                          ? handleImgResponse(consultant?.profilePicture)
                          : SHOW_DETAILS &&
                            !handleImgResponse(consultant?.profilePicture)
                          ? "/images/user.png"
                          : "/images/blur-profile/blur1.webp"
                      }
                      alt="Consultant Photo"
                    />
                  </div>
                  <div className="ml20 ml0-xs">
                    {SHOW_DETAILS ? (
                      <>
                        <h5 className="title mb-1">
                          {consultant?.firstName} {consultant?.lastName}
                        </h5>
                        <p className="mb-0">{consultant?.email}</p>
                      </>
                    ) : (
                      <>
                        <h5 className="title mb-1 blur">First Last Name</h5>
                        <p className="mb-0 blur">Email</p>
                      </>
                    )}
                  </div>
                </div>

                <>
                  {handleImgResponse(consultant?.resume) && (
                    <>
                      <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                        <div className="icon flex-shrink-0">
                          <span className="flaticon-cv" />
                        </div>
                        <div className="details">
                          <h4 className="mb30 mt10">Work &amp; Experience</h4>
                        </div>
                      </div>

                      <h5 style={{ marginBottom: "60px" }}>
                        <a
                          target="_blank"
                          href={handleImgResponse(consultant?.resume)}
                          style={{ color: "#1f4b3f" }}
                        >
                          {" "}
                          <i
                            className="flaticon-contract text-thm2 pe-2 vam"
                            style={{ fontSize: "35px" }}
                          />{" "}
                          Click to View Consultant&apos;s Resume{" "}
                        </a>
                      </h5>
                    </>
                  )}

                  {/* <div className="educational-quality">
                      {consultant?.experience?.map((exp, index) => (
                        <div key={index}>
                          <div
                            style={{ marginTop: index === 0 ? "10px" : "" }}
                            className={`m-circle text-thm ${
                              index === consultant?.experience?.length - 1
                                ? "before-none"
                                : ""
                            }`}
                          ></div>
                          <div className="wrapper mb40 position-relative">
                            <span className="tag">
                              {formatDateForDisplay(exp.startDate)} -{" "}
                              {formatDateForDisplay(exp.endDate)}
                            </span>
                            <h5 className="mt15">{exp?.title}</h5>
                            <h6 className="text-thm">{exp?.employer}</h6>
                            <p>{exp.details}</p>
                          </div>
                        </div>
                      ))}
                    </div> */}
                </>

                {/* {consultant?.education?.length > 0 && (
                  <>
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-file" />
                      </div>
                      <div className="details">
                        <h4 className="mb30 mt10">Education</h4>
                      </div>
                    </div>

                    <div className="educational-quality">
                      {consultant?.education
                        ?.slice() // create a copy to avoid mutating the original array
                        ?.sort(
                          (a, b) =>
                            new Date(b.startDate) - new Date(a.startDate)
                        ) // Sort by startDate in descending order
                        ?.map((edu, index) => (
                          <div key={index}>
                            <div
                              style={{ marginTop: index === 0 ? "10px" : "" }}
                              className={`m-circle text-thm ${
                                index === consultant?.education?.length - 1
                                  ? "before-none"
                                  : ""
                              }`}
                            ></div>
                            <div className="wrapper mb40 position-relative">
                              <span className="tag">
                                {formatDateForDisplay(edu.startDate)} -{" "}
                                {formatDateForDisplay(edu.endDate)}
                              </span>
                              <h5 className="mt15">{edu?.title}</h5>
                              <h6 className="text-thm">{edu?.institution}</h6>
                              <p>{edu.details}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {consultant?.languages?.length > 0 && (
                  <>
                    <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                      <div className="icon flex-shrink-0">
                        <span className="flaticon-translator" />
                      </div>
                      <div className="details">
                        <h4 className="mb30 mt10">Languages</h4>
                      </div>
                    </div>

                    <div className="row">
                      {consultant?.languages?.map((lang, index) => (
                        <div key={index} className="col-md-4">
                          <div className="iconbox-style1 contact-style d-flex align-items-start mb30">
                            <div className="details">
                              <h5 className="title">{lang?.language}</h5>
                              <p className="mb-0 text">{lang?.level}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )} */}
              </div>
            </div>
            <div className="col-lg-4">
              <ConsSidebar
                IS_PROFILE_CONS={IS_PROFILE_CONS}
                consultant={consultant}
                showDetails={SHOW_DETAILS}
                user={user}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ConsSidebar({ IS_PROFILE_CONS, consultant, showDetails, user }) {
  return (
    <>
      <div className="blog-sidebar ms-lg-auto">
        <ConsultantAbout
          IS_PROFILE_CONS={IS_PROFILE_CONS}
          consultant={consultant}
          showDetails={showDetails}
          user={user}
        />
        <ConsultantSkill
          title={"My skills"}
          skills={consultant?.preferences?.skills}
        />
        <ConsultantSkill
          title={"Industries"}
          skills={consultant?.preferences?.industries}
        />
      </div>
    </>
  );
}
