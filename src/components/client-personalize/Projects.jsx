import { useEffect, useState } from "react";

import LocalPagination from "../section/LocalPagination";
import { useRouter } from "next/navigation";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { getClientProjectsByStatus } from "@/data/projects";

export default function Projects({ notOngoing = false, id }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState(1);
  const [projectsData, setProjectsData] = useState([]);
  const router = useRouter();

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const getProjects = async () => {
      const resp = await getClientProjectsByStatus(
        currentPage,
        itemsPerPage,
        id,
        "Ongoing",
        notOngoing
      );

      setProjectsData(resp?.data);
      setTotalPages(resp?.meta?.pagination?.pageCount || 1);
    };
    getProjects();
  }, [currentPage, id]);

  const navigateToProject = (id) => {
    router?.push("/client-project/" + id);
  };

  const handleViewProfile = (id) => {
    localStorage?.setItem("consultantView", true);
    router?.push(`/consultant-profile/${id}`);
  };

  return (
    <div className="tailwind">
      {projectsData?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-lg font-bold text-gray-700">No projects found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-[#ede5e1] text-[#02153d]">
              <tr>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Title
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Consultant
                </th>
                <th scope="col" className="py-3 px-6 text-left font-semibold">
                  Status
                </th>
                <th scope="col" className="py-3 px-4 text-left font-semibold">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {projectsData?.map((project, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-4 px-4">
                    <h5 className="mb-0 text-gray-800">
                      {project?.offer?.title}
                    </h5>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className="flex items-center space-x-3 cursor-pointer"
                      onClick={() => handleViewProfile(project?.consultant?.id)}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          height={48}
                          width={48}
                          className="object-cover"
                          src={
                            handleImgResponse(
                              project?.consultant?.profilePicture
                            )
                              ? handleImgResponse(
                                  project?.consultant?.profilePicture
                                )
                              : "/images/user.png"
                          }
                          alt="consultant"
                        />
                      </div>
                      <div>
                        <h5 className="text-gray-800 font-medium">
                          {project?.consultant?.firstName}{" "}
                          {project?.consultant?.lastName}
                        </h5>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {project?.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button
                      className="bg-[#02153d] text-white px-4 py-2 rounded-md hover:bg-[#02153d]/90 transition-colors"
                      onClick={() => navigateToProject(project.id)}
                    >
                      View Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-8">
            <LocalPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPaginate={handlePaginate}
            />
          </div>
        </div>
      )}
    </div>
  );
}
