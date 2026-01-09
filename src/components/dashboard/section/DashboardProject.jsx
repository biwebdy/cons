import Timesheet from "@/components/timesheet/TimeSheet";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";

export default function DashboardProject({ project }) {
  return (
    <>
      <section style={{ paddingTop: "120px" }}>
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-12">
              <div className="row wow fadeInUp">
                <div className="col-xl-12">
                  <div className="position-relative">
                    <h2>{project?.offer?.title}</h2>

                    <div className="list-meta mt15">
                      <div className="list-inline-item mb5-sm">
                        <span className="position-relative mr10">
                          <Image
                            width={45}
                            height={45}
                            className="rounded-circle"
                            src={
                              handleImgResponse(project?.client?.logo)
                                ? handleImgResponse(project?.client?.logo)
                                : "/images/user.png"
                            }
                            alt="Client logo"
                          />
                        </span>
                        <span className="fz14 mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                          {project?.client?.name}
                        </span>
                      </div>
                      <div className="list-inline-item mb5-sm">
                        <span className="position-relative mr10">
                          <Image
                            width={45}
                            height={45}
                            className="rounded-circle"
                            src={
                              handleImgResponse(
                                project?.consultant?.profilePicture
                              )
                                ? handleImgResponse(
                                    project?.consultant?.profilePicture
                                  )
                                : "/images/user.png"
                            }
                            alt="Consultant logo"
                          />
                        </span>
                        <span className="fz14 mb-0 dark-color fz15 fw500 list-inline-item mb5-sm">
                          {project?.consultant?.firstName}{" "}
                          {project?.consultant?.lastName}
                        </span>
                      </div>

                      <p className="mb-0 dark-color fz15 fw500 list-inline-item ml15 mb5-sm ml0-xs">
                        <i className="flaticon-calendar text-thm2 vam fz20 me-2"></i>{" "}
                        {formatDateWithDaysDisplay(
                          project?.offer?.proposal?.startDate
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="scrollbalance-inner">
                  <div className="service-about">
                    <Timesheet
                      ISADMIN={true}
                      ISCONS={false}
                      projectId={project?.id}
                      pStatus={project?.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
