import Modal from "./Modal";

export default function RejectOfferModal({ onReject, isVisible, onclose }) {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Are you sure you want to reject the offer?
                </h4>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a className="ud-btn btn-dark mb25" onClick={onclose}>
                  Cancel
                </a>
                <button className="btn-danger  mb25" onClick={onReject}>
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
