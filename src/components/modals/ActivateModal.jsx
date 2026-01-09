import Modal from "./Modal";

export default function ActivateModal({ onActivate, isVisible, onclose }) {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Are you sure you want to activate this account?
                </h4>
                <p className="text-center">
                  This account is deactivated. Are you sure you want to activate
                  it?
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <button className="btn-prm  mb25" onClick={onActivate}>
                  Approve
                </button>
                <a className="btn-scn mb25" onClick={onclose}>
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
