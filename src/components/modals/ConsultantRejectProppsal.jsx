import { useState } from "react";
import Modal from "./Modal";
import { acceptRejectProposal } from "@/data/proposals";
import FailModal from "./FailModal";
import SuccessModal from "./SuccessModal";

export default function ConsultantRejectProposal({
  isVisible,
  onclose,
  proposal,
}) {
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setfailModalVisible] = useState(false);
  const [message, setMessage] = useState("");
  const handleOnReject = async () => {
    const b = {
      status: "RejectedByConsultant",
      rejectionDetails: message,
    };

    const response = await acceptRejectProposal(proposal?.id, b);

    if (Object.keys(response?.data)?.length > 0) {
      setSucModalVisible(true);
    } else {
      setfailModalVisible(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
    onclose();
    location?.reload();
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
                  Are you sure you want to reject the proposal?
                </h4>
                <p className="text-center">
                  Please provide us with the reason for rejecting the proposal.
                </p>
                <textarea
                  className="form-control"
                  style={{ resize: "none", height: "200px" }}
                  placeholder="Reason for rejection"
                  cols={30}
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a className="btn-scn mb25" onClick={onclose}>
                  Cancel
                </a>
                <button className="btn-danger  mb25" onClick={handleOnReject}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Proposal Rejected!"}
        message={"The proposal has been rejecetd successfully."}
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
