"use client";
import React, { useState } from "react";
import Modal from "./Modal";

const ConfirmModal = ({
  title,
  message,
  onclose,
  isVisible,
  onConfirm,
  buttonTitle,
  btnType,
  withText,
  placeholder,
}) => {
  const [text, setText] = useState("");
  const [showError, setShowError] = useState(false);

  const handleConfirm = () => {
    if (withText && !text.trim()) {
      setShowError(true);
      return;
    }
    setShowError(false);
    onConfirm(text);
  };
  return (
    <>
      <Modal isVisible={isVisible} onClose={onclose}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content position-relative">
            <div className="modal-body px-4 pt-5">
              <div className="pb20">
                <h4 className="pb10 text-center text-black">{title}</h4>
                <p className="text-center">{message}</p>
              </div>

              {withText && (
                <div className="mb-3">
                  <label htmlFor="text">{placeholder}</label>
                  <textarea
                    type="text"
                    className="form-control"
                    rows={4}
                    style={{
                      resize: "none",
                      height: "150px",
                      border:
                        showError && !text.trim()
                          ? "1px solid #dc3545"
                          : undefined,
                    }}
                    value={text}
                    onChange={(e) => {
                      setText(e.target.value);
                      if (showError && e.target.value.trim())
                        setShowError(false);
                    }}
                  />
                  {showError && !text.trim() && (
                    <div
                      style={{
                        color: "#dc3545",
                        marginTop: 4,
                        fontSize: "0.9em",
                      }}
                    >
                      Rejection reason is required.
                    </div>
                  )}
                </div>
              )}

              <div className="d-flex justify-content-center gap-3 ">
                <button
                  className="btn-scn mb25"
                  aria-label="Close"
                  onClick={(e) => {
                    e.preventDefault();
                    onclose();
                  }}
                >
                  Cancel
                </button>
                <button
                  className={`btn-${btnType} mb25`}
                  onClick={handleConfirm}
                >
                  {buttonTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
