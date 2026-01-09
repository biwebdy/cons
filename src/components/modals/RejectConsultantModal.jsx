import Modal from "./Modal";

export default function RejectConsModal({ onReject, isVisible, onclose }) {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Are you sure you want to reject this account?
                </h4>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a className="btn-danger text-white mb25" onClick={onReject}>
                  Reject
                </a>
                <a className="ud-btn btn-dark mb25" onClick={onclose}>
                  Cancel
                </a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
