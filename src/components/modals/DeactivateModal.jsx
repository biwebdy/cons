import Modal from "./Modal";

export default function DeactivateModal({ onDeactivate, isVisible, onclose }) {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <button
              type="button"
              className="btn-close position-absolute"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ top: "10px", right: "10px", zIndex: "9" }}
            />
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Are you sure you want to deactivate this account?
                </h4>
                <p className="text-center">
                  This account is active. Are you sure you want to deactivate
                  it?
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a
                  className="btn-danger text-white mb25"
                  onClick={onDeactivate}
                >
                  Deactivate
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
