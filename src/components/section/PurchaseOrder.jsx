"use client";
import { updateOfferWithFile } from "@/data/offers";
import { useEffect, useState } from "react";
import UploadAttachment from "../consultant/UploadAttachement";
import { useRouter } from "next/navigation";
import { formatDateWithDaysDisplay, handleImgResponse } from "@/utils/utility";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import { getUserMeLoader } from "@/data/services/get-user-me-loader";

export default function PuchaseOrder({ offerData }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserMeLoader();
      const role = user.data.role?.name;
      setRole(role);
    };
    getUser();
  }, []);
  const handleUpdateData = async () => {
    try {
      const formData = new FormData();
      formData?.append("title", title);
      formData?.append("status", "POSubmitted");
      if (file) {
        formData.append("purchaseOrder", file);
      }
      const resp = await updateOfferWithFile(formData, offerData.id);

      if (resp && resp.data) {
        setSuccessModalVisible(true);
      } else {
        setFailModalVisible(true);
      }
    } catch (error) {
      console.error("Error updating offer:", error);
      setFailModalVisible(true);
    }
  };

  const onUploadFileChange = (event) => {
    setFile(event.attachment[0]);
  };

  const handleSuccessModalClose = () => {
    setSuccessModalVisible(false);
    if (role === "L3") {
      router.push("/client-personalized");
    } else {
      router.push("/client-account-personalized");
    }
  };

  const isFormComplete = title.trim() !== "" && file !== null;

  return (
    <>
      <div className="container" style={{ padding: "60px 60px" }}>
        <div className="alert alert-warning mb-4" role="alert">
          <strong>Important:</strong> You must provide both a project title and
          upload a purchase order file. Failure to complete these requirements
          in the upcoming <b>7 days</b> will result in the project being
          deleted.
        </div>

        <h3 className="mb-4">Enter Project Title</h3>
        <input
          type="text"
          className="form-control mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project Title"
        />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <h5>Upload Purchase Order/Statement of Work</h5>
            <UploadAttachment onChange={onUploadFileChange} isCenter={true} />
          </div>
        </div>
        <div className="col-lg-12 text-lg-end">
          <button
            className="btn-prm"
            onClick={handleUpdateData}
            disabled={!isFormComplete}
            style={{
              opacity: isFormComplete ? 1 : 0.6,
              cursor: isFormComplete ? "pointer" : "not-allowed",
            }}
          >
            Submit
          </button>
        </div>
        {handleImgResponse(offerData?.offerContract) && (
          <>
            <h5 style={{ marginBottom: "60px" }}>
              <a
                target="_blank"
                href={handleImgResponse(offerData?.offerContract)}
                style={{ color: "#1f4b3f" }}
              >
                {" "}
                <i
                  className="flaticon-contract text-thm2 pe-2 vam"
                  style={{ fontSize: "35px" }}
                />{" "}
                Click to View Offer Contract{" "}
              </a>
            </h5>
          </>
        )}
      </div>

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalVisible}
        title="Purchase Order Submitted Successfully!"
        message="Your purchase order has been submitted successfully. The consultant will be notified."
        onclose={handleSuccessModalClose}
      />

      {/* Fail Modal */}
      <FailModal
        isVisible={failModalVisible}
        title="Submission Failed"
        message="There was an error submitting your purchase order. Please try again."
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
