import Image from "next/image";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";

import {
  Phone,
  Mail,
  Info,
  BriefcaseBusiness,
  MapPin,
  CalendarCheck,
  CalendarPlus,
  FileText,
  MoveUpRight,
} from "lucide-react";

export default function ProjectInfos({ project, isCons, name, img }) {
  return (
    <>
      {isCons ? (
        <div className="tailwind mb-8 rounded-xl shadow-lg overflow-hidden">
          <div className="rounded-lg p-8">
            <h1 className="text-3xl font-bold text-[#02153d] mb-6">
              {project?.offer?.title}
            </h1>

            {/* Client Info Table */}
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200 mt-8">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Client Info</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200 ">
                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Name
                  </span>
                  <div className="flex items-center gap-3 w-full md:w-2/3">
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      src={
                        handleImgResponse(img)
                          ? handleImgResponse(img)
                          : "/images/user.png"
                      }
                      alt="Client logo"
                    />
                    <span className="font-bold text-[#02153d]">{name}</span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Phone
                  </span>
                  <div className="w-full md:w-2/3">
                    <a
                      href={`tel:${project?.client?.phoneNumber}`}
                      className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                    >
                      <Phone size={16} />
                      <span className="font-bold">
                        {project?.client?.phoneNumber}
                      </span>
                    </a>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Email
                  </span>
                  <div className="w-full md:w-2/3">
                    <a
                      href={`mailto:${project?.client?.email}`}
                      className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                    >
                      <Mail size={16} />
                      <span className="font-bold">
                        {project?.client?.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info Table */}
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Project Info</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Job Title
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <BriefcaseBusiness size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.typeOfWork}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Status
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <Info size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.status}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Location
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <MapPin size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.missionLocation}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Start Date
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <CalendarPlus size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {formatDateWithDaysDisplay(
                        project?.offer?.proposal?.startDate
                      )}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    End Date
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <CalendarCheck size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {formatDateWithDaysDisplay(
                        project?.offer?.proposal?.endDate
                      )}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Details
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <FileText size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.details}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Contract Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Mission Contract</h4>
              </div>

              <div className="bg-[#faf7f6] p-6">
                <a
                  className="flex items-center gap-3 text-[#02153d] hover:text-blue-700 cursor-pointer"
                  href={handleImgResponse(
                    project?.offer?.proposal?.missionContract
                  )}
                >
                  <FileText size={24} />
                  <span className="font-bold">View Mission Contract</span>
                  <MoveUpRight size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="tailwind mb-8 rounded-xl shadow-lg overflow-hidden">
          <div className="rounded-lg p-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">
              {project?.offer?.title}
            </h1>

            {/* Consultant Info Table */}
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Consultant Info</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Name
                  </span>
                  <div className="flex items-center gap-3 w-full md:w-2/3">
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      src={
                        handleImgResponse(img)
                          ? handleImgResponse(img)
                          : "/images/user.png"
                      }
                      alt="Consultant logo"
                    />
                    <span className="font-bold text-[#02153d]">{name}</span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Email
                  </span>
                  <div className="w-full md:w-2/3">
                    <a
                      href={`mailto:${project?.consultant?.email}`}
                      className="flex items-center gap-2 text-[#02153d] hover:text-blue-700"
                    >
                      <Mail size={16} />
                      <span className="font-bold">
                        {project?.consultant?.email}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Info Table */}
            <div className="mb-4 overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Project Info</h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Job Title
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <BriefcaseBusiness size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.typeOfWork}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Status
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <Info size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.status}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Location
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <MapPin size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.missionLocation}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Start Date
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <CalendarPlus size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {formatDateWithDaysDisplay(
                        project?.offer?.proposal?.startDate
                      )}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    End Date
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <CalendarCheck size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {formatDateWithDaysDisplay(
                        project?.offer?.proposal?.endDate
                      )}
                    </span>
                  </div>
                </div>

                <div className="bg-[#faf7f6] p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-3">
                  <span className="font-medium text-[#02153d] w-full md:w-1/3">
                    Details
                  </span>
                  <div className="w-full md:w-2/3 flex items-center gap-2">
                    <FileText size={16} className="text-[#02153d]" />
                    <span className="font-bold text-[#02153d]">
                      {project?.offer?.proposal?.details}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Offer Contract Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="bg-[#ede5e1] text-[#02153d] p-4 text-center">
                <h4 className="text-xl font-semibold">Offer Contract</h4>
              </div>

              <div className="bg-[#faf7f6] p-6">
                <a
                  className="flex items-center gap-3 text-[#02153d] hover:text-blue-700 cursor-pointer"
                  href={handleImgResponse(project?.offer?.offerContract)}
                >
                  <FileText size={24} />
                  <span className="font-bold">View Offer Contract</span>
                  <MoveUpRight size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
