"use client";
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/modals/SuccessModal";
import FailModal from "@/components/modals/FailModal";
import {
  postSubClientData,
  toggleActivation,
  updateSubClientData,
} from "@/data/client";

export default function ClientAccountAddDashboard({
  clientId,
  isEdit,
  subclient = null,
  client,
}) {
  const router = useRouter();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState({
    title: "",
    message: "",
  });

  const [subclientInfo, setSubclientInfo] = useState({
    email: subclient?.email || "",
    name: client?.name || "",
    accountOwnerFirstName: subclient?.accountOwnerFirstName || "",
    accountOwnerLastName: subclient?.accountOwnerLastName || "",
    phoneNumber: subclient?.phoneNumber || "",
    status: subclient?.status || "Active",
  });

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        const body = {
          ...subclientInfo,
          parentClient: clientId,
          accountOwnerFirstName: subclientInfo.accountOwnerFirstName
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
          accountOwnerLastName: subclientInfo.accountOwnerLastName
            .split(" ")
            .map(
              (word) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" "),
        };

        const response = await updateSubClientData(subclient?.id, body);
        if (response?.status === 200) {
          setModalMessage({
            title: "Client Updated",
            message: "The client has been successfully updated.",
          });
          setSuccessModalVisible(true);
        }
      } else {
        const body = {
          ...subclientInfo,
          parentClient: clientId,
        };
        const response = await postSubClientData(body);
        setModalMessage({
          title: "Client Added",
          message: "The client has been successfully added.",
        });
        setSuccessModalVisible(true);
      }
    } catch (error) {
      setModalMessage({
        title: "Something Went Wrong!",
        message: isEdit
          ? "There was an error updating the client. Please try again."
          : "There was an error adding the client. Please try again.",
      });
      setFailModalVisible(true);
    }
  };

  const handleActivate = async () => {
    setSubclientInfo({
      ...subclientInfo,
      status: "Active",
    });
    const response = await toggleActivation(subclient?.user?.id, "activate");

    if (response?.status === 200) {
      setModalMessage({
        title: "Client Activated",
        message: "The client has been successfully activated.",
      });
      setSuccessModalVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleDeactivate = async () => {
    setSubclientInfo({
      ...subclientInfo,
      status: "Inactive",
    });
    const response = await toggleActivation(subclient?.user?.id, "deactivate");

    if (response?.status === 200) {
      setModalMessage({
        title: "Client Deactivated",
        message: "The client has been successfully deactivated.",
      });
      setSuccessModalVisible(true);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalVisible(false);
    setFailModalVisible(false);
  };

  return (
    <>
      <div className="tailwind">
        <div className="container pt-12" style={{ padding: "60px 60px" }}>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#02153d]">
              {isEdit ? "Edit Client" : "Add New Client"}
            </h3>

            {isEdit && (
              <div className="flex gap-2">
                {subclient?.user?.blocked && (
                  <button
                    onClick={handleActivate}
                    className="bg-[#02153d] hover:bg-[#032a6f] text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center"
                  >
                    <CheckCircle size={18} className="mr-2" />
                    Activate
                  </button>
                )}

                {!subclient?.user?.blocked && (
                  <button
                    onClick={handleDeactivate}
                    className="btn-danger 
                     text-white font-semibold py-2 px-4 rounded-md transition duration-200 flex items-center"
                  >
                    <XCircle size={18} className="mr-2" />
                    Deactivate
                  </button>
                )}
              </div>
            )}
          </div>

          {isEdit && (
            <div className="mb-4">
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <span className="font-medium mr-3">Status:</span>
                  {!subclient?.user?.blocked ? (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <CheckCircle size={16} className="mr-1" />
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <XCircle size={16} className="mr-1" />
                      Inactive
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold">Account Owner First Name</h4>
              <input
                type="text"
                id="accountOwnerFirstName"
                value={subclientInfo.accountOwnerFirstName}
                className="tw-forminput"
                onChange={(e) =>
                  setSubclientInfo({
                    ...subclientInfo,
                    accountOwnerFirstName: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold">Account Owner Last Name</h4>
              <input
                type="text"
                id="accountOwnerLastName"
                className="tw-forminput"
                value={subclientInfo.accountOwnerLastName}
                onChange={(e) =>
                  setSubclientInfo({
                    ...subclientInfo,
                    accountOwnerLastName: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold">Email</h4>
              <input
                type="email"
                id="email"
                className="tw-forminput"
                value={subclientInfo.email}
                onChange={(e) =>
                  setSubclientInfo({ ...subclientInfo, email: e.target.value })
                }
              />
            </div>
            <div className="col-span-2 md:col-span-1">
              <h4 className="text-lg font-bold">Phone Number</h4>
              <input
                type="text"
                id="phoneNumber"
                className="tw-forminput"
                value={subclientInfo.phoneNumber}
                onChange={(e) =>
                  setSubclientInfo({
                    ...subclientInfo,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="flex justify-end my-6">
            <button className="btn-prm" onClick={handleSubmit}>
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isVisible={successModalVisible}
        title={modalMessage.title}
        message={modalMessage.message}
        onclose={handleCloseSuccessModal}
      />

      {/* Fail Modal */}
      <FailModal
        isVisible={failModalVisible}
        title={modalMessage.title}
        message={modalMessage.message}
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
