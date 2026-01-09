import Image from "next/image";
import React from "react";
import Modal from "./Modal";

const SuccessModal = ({ title, message, onclose, isVisible }) => {
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <Image
              src="/images/accept.png"
              style={{
                width: "70px",
                margin: "auto",
                paddingTop: "30px",
              }}
              width={70}
              height={100}
              alt="Success Image"
            />

            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">{title}</h4>
                <p className="text-center">{message}</p>
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

export default SuccessModal;
