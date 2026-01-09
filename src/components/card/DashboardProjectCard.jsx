"use client";

import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";

export default function DashboardProjectCard({ data }) {
  return (
    <>
      <tr>
        <th className="ps-0" scope="row">
          <h5 className="mb-0">{data?.offer?.title}</h5>
        </th>
        <th className="ps-0" scope="row">
          <div className=" p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="thumb w60 position-relative rounded-circle mb15-md">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={
                    handleImgResponse(data?.client?.logo)
                      ? handleImgResponse(data?.client?.logo)
                      : "/images/user.png"
                  }
                  alt={data?.client?.name}
                />
              </div>
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-2">{data?.client?.name}</h5>
              </div>
            </div>
          </div>
        </th>
        <th className="ps-0" scope="row">
          <div className=" p-0 mb-0 box-shadow-none">
            <div className="d-lg-flex align-items-lg-center">
              <div className="thumb w60 position-relative rounded-circle mb15-md">
                <Image
                  height={60}
                  width={60}
                  className="rounded-circle mx-auto"
                  src={
                    handleImgResponse(data?.consultant?.profilePicture)
                      ? handleImgResponse(data?.consultant?.profilePicture)
                      : "/images/user.png"
                  }
                  alt={data?.consultant?.firstName}
                />
              </div>
              <div className="details ml15 ml0-md mb15-md">
                <h5 className="title mb-2">
                  {data?.consultant?.firstName} {data?.consultant?.lastName}
                </h5>
              </div>
            </div>
          </div>
        </th>

        <td className="vam">
          <h5
            className={`mb-0 ${
              data?.status === "Finished"
                ? "pending-style style2"
                : data?.status === "Canceled"
                ? "pending-style style3"
                : "pending-style style1"
            }`}
          >
            {data?.status}
          </h5>
        </td>

        <td className="vam">
          <Link className="btn-scn" href={"/secure/project/" + data?.id}>
            View Timesheet
          </Link>
        </td>
      </tr>
    </>
  );
}
