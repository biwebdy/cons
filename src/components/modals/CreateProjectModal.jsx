import { signOffer, updateOfferWithFile } from "@/data/offers";
import useUserStore from "@/store/userStore";
import PropTypes from "prop-types";
import { useState } from "react";
import UploadAttachment from "../consultant/UploadAttachement";
import Modal from "./Modal";
import { setCookie } from "@/data/services/token";
import { useRouter } from "next/navigation";

export default function CreateProjectModal({
  data: offerData,
  isVisible,
  onClose,
}) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const user = useUserStore((state) => state.user);
  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData?.append("status", "AcceptedByClient");
      formData?.append("title", title);
      if (file) {
        formData.append("purchaseOrder", file);
      }
      const resp = await updateOfferWithFile(formData, offerData.id);
      if (Object.keys(resp?.data)?.length > 0) {
        const signResp = await signOffer(offerData?.id);
        await setCookie("offerId", offerData?.id);
        await setCookie("envelopeId", signResp?.data?.doccuSign?.envelopeId);
        router.push(signResp?.data?.doccuSign?.url);
      }
    } catch (error) {
      console.error("Error updating offer:", error);
    }
  };

  const onUploadFileChange = (event) => {
    setFile(event.attachment[0]);
  };

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content position-relative">
          <div className="modal-body px-4 pt-5">
            <header className="pb-4">
              <h4 className="text-center text-black">
                Please enter the title of the project
              </h4>
            </header>
            <main>
              <input
                type="text"
                className="form-control mb-4"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Project Title"
              />
              {/* <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <h5>Upload Purchase Order/Statement of Work</h5>
                  <UploadAttachment
                    onChange={onUploadFileChange}
                    isCenter={true}
                  />
                </div>
              </div> */}
            </main>
            <footer className="d-flex justify-content-center gap-3 mt-4  mb-4">
              <button className="btn-scn" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-prm"
                disabled={!title}
                onClick={handleUpdateData}
              >
                Accept
              </button>
            </footer>
          </div>
        </div>
      </div>
    </Modal>
  );
}

CreateProjectModal.propTypes = {
  data: PropTypes.object.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
