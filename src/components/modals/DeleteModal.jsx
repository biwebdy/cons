import Modal from "./Modal";

export default function DeleteModal({ onDelete, isVisible, onclose }) {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Are you sure you want to delete this account?
                </h4>
                <p className="text-center">
                  Do you really want to delete this account ? This process
                  can&apos;t be undone.
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <a className="btn-danger text-white mb25" onClick={onDelete}>
                  Delete
                </a>
                <a className="ud-btn btn-dark mb25">Cancel</a>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
