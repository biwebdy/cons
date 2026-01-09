import { useState } from "react";
import Modal from "./Modal";

export default function SendOfferModal({ onSend, isVisible, onclose, client }) {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    const isFileDuplicate = (file, fileList) => {
      return fileList.some((existingFile) => existingFile.name === file.name);
    };
    const uniqueNewFiles = newFiles.filter(
      (file) => !isFileDuplicate(file, uploadedFiles)
    );
    setUploadedFiles((prevFiles) => [...prevFiles, ...uniqueNewFiles]);
  };

  const handleFileDelete = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles?.filter((file) => file.name !== fileName)
    );
  };

  let content = uploadedFiles?.map((item, i) => (
    <div key={i} className=" position-relative">
      <div className="project-attach">
        <h6 className="title">{item.name?.split(".")[0].substring(0, 15)}</h6>
        <p className="text-uppercase">{item.name?.split(".").pop()}</p>
        <span className="icon flaticon-page" />
      </div>
      <button
        className="position-absolute ui-delete-btn"
        onClick={() => handleFileDelete(item.name)}
      >
        x
      </button>
    </div>
  ));
  return (
    <Modal isVisible={isVisible} onClose={onclose}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <div className="modal-body px-4 pt-5">
            <div className="pb20">
              <h4 className="pb10 text-center text-black">
                Are you sure you want to send the offer to Client{" "}
                <b style={{ color: "#5bbb7b" }}>{client}</b>?
              </h4>
              <p className="text-center">
                Please add your signed copy of the offer below.
              </p>
              <label style={{ width: "100%" }}>
                {uploadedFiles?.length > 0 ? (
                  content
                ) : (
                  <a className="upload-img d-flex justify-content-center">
                    Upload Signed Copy
                    <input
                      type="file"
                      accept="application/pdf"
                      className="d-none"
                      onChange={handleFileUpload}
                    />
                  </a>
                )}
              </label>
            </div>
            <div className="d-flex justify-content-center gap-3 ">
              <a className="ud-btn btn-dark mb25" onClick={onclose}>
                Cancel
              </a>
              <button
                className="btn-prm mb25"
                onClick={() => onSend(uploadedFiles)}
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
