"use client";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  BriefcaseBusiness,
  Calendar,
  CircleDollarSign,
  Factory,
  House,
  MapPin,
  MoveUpRight,
  Timer,
} from "lucide-react";

export default function ConsultantCard({ data, index, hideData = true }) {
  const rate = Math.round(data?.preferences?.rate / 0.955);
  const router = useRouter();
  const handleViewProfile = () => {
    localStorage?.setItem("consultantView", hideData ? false : true);
    router?.push(`/consultant-profile/${data?.id}`);
  };

  return (
    <>
      <div className="tailwind" style={{ marginBottom: "0px" }}>
        <div className="p-12 shadow-lg rounded-md my-6">
          <div className="flex justify-between">
            <div className="thumb  position-relative rounded-circle ">
              <div className="flex items-center justify-center">
                {hideData ? (
                  <Image
                    height={90}
                    width={90}
                    className="rounded-circle mx-auto"
                    src={`/images/user.png`}
                    alt="Consultant Profile Picture"
                  />
                ) : (
                  <Image
                    height={90}
                    width={90}
                    className="rounded-circle mx-auto"
                    src={
                      handleImgResponse(data?.profilePicture)
                        ? handleImgResponse(data?.profilePicture)
                        : "/images/user.png"
                    }
                    alt="Consultant Profile Picture"
                  />
                )}
                {hideData ? (
                  <h5 className="title mb-1 blur ml-3 text-black font-bold">
                    First Last Name
                  </h5>
                ) : (
                  <h5 className="title mb-1 ml-3 text-black font-bold">
                    {data?.firstName} {data?.lastName}
                  </h5>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="col-span-1">
              <div className="text-blue-brand my-1">
                <CircleDollarSign size={24} /> Rate:
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {rate} CHF/hr
                </span>
              </div>
              <div className="text-blue-brand my-1">
                <BriefcaseBusiness size={24} /> Seniority Level:
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {data?.seniorityLevel > 3 && data?.seniorityLevel < 7
                    ? "Mid"
                    : data?.seniorityLevel > 7
                    ? "Senior"
                    : "Junior"}
                </span>
              </div>
              <div className="text-blue-brand my-1">
                <Calendar size={24} /> Available on
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {formatDateWithDaysDisplay(data?.preferences?.availableDate)}
                </span>
              </div>
            </div>

            <div className="col-span-1">
              <div className="text-blue-brand my-1">
                <Timer size={24} /> Availiability
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {data?.preferences?.daysAvailable} days/week
                </span>
              </div>

              <div className="text-blue-brand my-1">
                <House size={24} /> Home Office
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {data?.preferences?.homeOfficePercentage} days/week
                </span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div className="col-span-2">
              <div className="text-blue-brand my-1">
                <MapPin size={24} /> Preferred Locations
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {data?.preferences?.preferredLocationOfWork?.map(
                    (location, i) => (
                      <span key={i} className="fz14 text-blue">
                        {location?.name}
                        {i ===
                        data?.preferences?.preferredLocationOfWork?.length - 1
                          ? ""
                          : ", "}
                      </span>
                    )
                  )}
                </span>
              </div>

              <div className="text-blue-brand my-1">
                <Factory size={24} /> Industries
                <span style={{ fontWeight: "bolder", marginLeft: "10px" }}>
                  {data?.preferences?.industries?.map((industry, i) => (
                    <span key={i} className="fz14 text-blue">
                      {industry?.name}
                      {i === data?.preferences?.industries?.length - 1
                        ? ""
                        : ", "}
                    </span>
                  ))}
                </span>
              </div>

              <div
                className="skill-tags d-flex  my-1"
                style={{ display: "flex", flexWrap: "wrap" }}
              >
                {data?.preferences?.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="tag nsan"
                    style={{ minHeight: "40px" }}
                  >
                    {skill?.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="d-grid mt15">
            <button className="btn-tri" onClick={handleViewProfile}>
              View Profile
              <MoveUpRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
