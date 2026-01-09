import { useState } from "react";
import LocalPagination from "../section/LocalPagination";
import { useRouter } from "next/navigation";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";

export default function ConsProjects({ projects }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const router = useRouter();

  const newProjectsTotalPages = Math.ceil(projects?.length / itemsPerPage);

  const handlePaginate = (page) => {
    setCurrentPage(page);
  };

  const getPaginatedData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data?.slice(startIndex, endIndex);
  };

  const navigateToProject = (id) => {
    router.push("/consultant-project/" + id);
  };
  return (
    <>
      {projects?.length === 0 ? (
        <p className="text-center mt30" style={{ fontWeight: "900" }}>
          No projects found
        </p>
      ) : (
        <>
          <table className="table-style3 table at-savesearch">
            <thead className="t-head">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Client</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="t-body">
              {getPaginatedData(projects)?.map((project, i) => (
                <tr key={i}>
                  <td>
                    <h5 className="mb-0">{project?.offer?.title}</h5>
                  </td>
                  <th className="ps-0" scope="row">
                    <div className=" p-0 mb-0 box-shadow-none">
                      <div className="d-lg-flex align-items-lg-center">
                        <div className="thumb w60 position-relative rounded-circle mb15-md">
                          <Image
                            height={60}
                            width={60}
                            className="rounded-circle mx-auto"
                            src={
                              handleImgResponse(project?.client?.logo)
                                ? handleImgResponse(project?.client?.logo)
                                : "/images/user.png"
                            }
                            alt="thumb"
                          />
                        </div>
                        <div className="details ml15 ml0-md mb15-md">
                          <h5 className="title mb-2">
                            {project?.client?.name}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td className="vam">
                    <h5 className="mb-0">{project?.status}</h5>
                  </td>

                  <td className="vam">
                    <button
                      className="btn-prm"
                      onClick={() => navigateToProject(project?.id)}
                    >
                      View Project
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt30">
            <LocalPagination
              currentPage={currentPage}
              totalPages={newProjectsTotalPages}
              onPaginate={handlePaginate}
            />
          </div>
        </>
      )}
    </>
  );
}
