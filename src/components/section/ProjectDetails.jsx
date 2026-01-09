import Timesheet from "../timesheet/TimeSheet";

import ProjectInfos from "./ProjectInfos";

export default function ProjectDetails({ project, isCons }) {
  const img = isCons
    ? project?.client?.logo
    : project?.consultant?.profilePicture;
  const name = isCons
    ? project?.client?.name
    : `${project?.consultant?.firstName} ${project?.consultant?.lastName}`;

  return (
    <>
      <section className="tailwind">
        <div className="container pt-[30px]">
          <ProjectInfos
            project={project}
            isCons={isCons}
            name={name}
            img={img}
          />

          <Timesheet
            ISCONS={isCons}
            projectId={project?.id}
            pStatus={project?.status}
          />
        </div>
      </section>
    </>
  );
}
