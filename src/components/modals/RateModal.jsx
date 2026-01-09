import React from "react";
import Modal from "./Modal";

const RateModal = ({ onclose, isVisible }) => {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">
                  Rate should be greater than 80 CHF.
                </h4>
                <p className="text-center">
                  Please note that you cant proceed with your application
                  without a valid desired hourly rate.
                </p>
              </div>
              <div className="d-flex justify-content-center gap-3 ">
                <button
                  className="btn-prm mb25"
                  aria-label="Close"
                  onClick={(e) => {
                    e.preventDefault();
                    onclose();
                  }}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RateModal;
