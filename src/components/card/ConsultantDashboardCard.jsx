"use client";
import ActivateModal from "@/components/modals/ActivateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import FailModal from "@/components/modals/FailModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { approveCons, deleteConsultant } from "@/data/consultants";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { removeIdField } from "@/lib/utils";
import RejectConsModal from "../modals/RejectConsultantModal";
import Link from "next/link";
import * as LucideIcons from "lucide-react";

export default function ConsultantDashboardCard({ data, page }) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [deleteFailModalVisible, setDeleteFailModalVisible] = useState(false);
  const [activateModalVisible, setActivateModalVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);
  const [statusChangeModalVisible, setStatusChangeModalVisible] =
    useState(false);

  const handleDeleteConsultant = async () => {
    const response = await deleteConsultant(data?.id);
    if (response?.data?.id) {
      router?.push(`/secure/manage-consultants?page=${page}`);
      setDeleteModalVisible(false);
      setDeleteSuccessModalVisible(true);
    } else {
      setDeleteModalVisible(false);
      setDeleteFailModalVisible(true);
    }
  };

  const handleApprove = async (flag) => {
    if (flag === "APPROVED") {
      setActivateModalVisible(true);
    } else {
      setDeactivateModalVisible(true);
    }
  };

  const handleActivate = async () => {
    const formData = new FormData();
    const consultantData = {
      approval: "APPROVED",
      email: data?.email,
    };
    formData?.append("email", data?.email);
    formData?.append(
      "consultantData",
      JSON.stringify(removeIdField(consultantData))
    );

    const response = await approveCons(formData, data?.id);
    if (response?.status === 200) {
      setActivateModalVisible(false);
      setStatusChangeModalVisible(true);
    }
  };

  const handleReject = async () => {
    const formData = new FormData();
    const consultantData = {
      approval: "REJECTED",
      email: data?.email,
    };
    formData?.append("email", data.email);
    formData?.append(
      "consultantData",
      JSON.stringify(removeIdField(consultantData))
    );

    const response = await approveCons(formData, data?.id);
    if (response?.status === 200) {
      setDeactivateModalVisible(false);
      setStatusChangeModalVisible(true);
    }
  };

  const handleCloseStatusChangeModal = () => {
    setStatusChangeModalVisible(false);
    location?.reload();
  };

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <Image
              height={48}
              width={48}
              className="rounded-full"
              src={
                handleImgResponse(data?.profilePicture) || "/images/user.png"
              }
              alt={`${data?.firstName} ${data?.lastName}`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {data?.firstName} {data?.lastName}
            </div>
            <div className="text-sm text-blue-600">{data?.title}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          ${data?.preferences?.rate}/hour
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        {data?.approval === "TOAPPROVE" ? (
          <div className="flex space-x-2">
            <button
              onClick={() => handleApprove("APPROVED")}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Approve
            </button>
            <button
              onClick={() => handleApprove("REJECTED")}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        ) : data?.approval === "REJECTED" ? (
          <button
            onClick={() => handleApprove("APPROVED")}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Approve
          </button>
        ) : (
          <span className="text-sm text-green-600">Approved</span>
        )}
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <Link
            href={`/secure/consultant-profile/${data?.id}`}
            className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
            data-tooltip-id="edit"
            data-tooltip-content="Edit"
          >
            {getIcon("Edit")}
          </Link>
          <button
            onClick={() => setDeleteModalVisible(true)}
            className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
            data-tooltip-id="delete"
            data-tooltip-content="Delete"
          >
            {getIcon("Trash2")}
          </button>
        </div>
      </td>

      <DeleteModal
        isVisible={deleteModalVisible}
        onclose={() => setDeleteModalVisible(false)}
        onDelete={handleDeleteConsultant}
      />

      <SuccessModal
        isVisible={deleteSuccessModalVisible}
        title={"Successfully Deleted!"}
        message={"This consultant is deleted successfully."}
        onclose={() => setDeleteSuccessModalVisible(false)}
      />

      <SuccessModal
        isVisible={statusChangeModalVisible}
        title={"Successfully Change Status!"}
        message={"This consultant status is changed Successfully."}
        onclose={handleCloseStatusChangeModal}
      />

      <FailModal
        isVisible={deleteFailModalVisible}
        title={"Something Went Wrong!"}
        message={
          "Something went wrong while deleting this consultant. Please try again."
        }
        onclose={() => setDeleteFailModalVisible(false)}
      />

      <ActivateModal
        isVisible={activateModalVisible}
        onclose={() => setActivateModalVisible(false)}
        onActivate={handleActivate}
      />

      <RejectConsModal
        isVisible={deactivateModalVisible}
        onclose={() => setDeactivateModalVisible(false)}
        onReject={handleReject}
      />
    </tr>
  );
}
