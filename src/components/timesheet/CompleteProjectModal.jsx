import { useState } from "react";
import Modal from "../modals/Modal";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import { changeProjectStatus } from "@/data/projects";

export default function CompleteProjectModal({
  isVisible,
  onclose,
  projectId,
}) {
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setfailModalVisible] = useState(false);

  const handleCompleteProject = async () => {
    const resp = await changeProjectStatus(projectId, "Finished");
    console.log("Resp handleCompleteProject", resp);

    if (Object.keys(resp?.data).length > 0) {
      setSucModalVisible(true);
    } else {
      setFailModalVisible(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
    onclose();
    location.reload();
  };

  const handleCloseFailModal = () => {
    setfailModalVisible(false);
    onclose();
  };

  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Terminating Project.
                </h4>
                <p className="text-center">
                  Are you sure you want to terminate this project?
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a className="ud-btn btn-dark mb25" onClick={onclose}>
                  Cancel
                </a>
                <button
                  className="btn-danger  mb25"
                  onClick={handleCompleteProject}
                >
                  Terminate Project
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Successfully Completed!"}
        message={"The project has been completed successfully."}
        onclose={handleCloseSuccessModal}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={"Something went wrong. Please try again."}
        onclose={handleCloseFailModal}
      />
    </>
  );
}
