"use client";
import ActivateModal from "@/components/modals/ActivateModal";
import DeactivateModal from "@/components/modals/DeactivateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import FailModal from "@/components/modals/FailModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { deleteClient } from "@/data/client";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as LucideIcons from "lucide-react";

export default function ClientDashboardCard({ data }) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteSuccessModalVisible, setDeleteSuccessModalVisible] =
    useState(false);
  const [deleteFailModalVisible, setDeleteFailModalVisible] = useState(false);
  const [activateModalVisible, setActivateModalVisible] = useState(false);
  const [deactivateModalVisible, setDeactivateModalVisible] = useState(false);

  const handleDeleteConsultant = async () => {
    const response = await deleteClient(data?.id);
    if (response?.data?.id) {
      setDeleteModalVisible(false);
      setDeleteSuccessModalVisible(true);
    } else {
      setDeleteModalVisible(false);
      setDeleteFailModalVisible(true);
    }
  };

  const handleActivate = () => {};
  const handleDeactivate = () => {};

  const getIcon = (iconName) => {
    const Icon = LucideIcons[iconName];
    return Icon ? <Icon className="w-5 h-5" /> : null;
  };

  return (
    <tr
      className="hover:bg-gray-50 border-b border-gray-200 cursor-pointer"
      onClick={() => router?.push(`/secure/client-profile/${data?.id}`)}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12">
            <Image
              height={48}
              width={48}
              className="rounded-full"
              src={handleImgResponse(data?.logo) || "/images/user.png"}
              alt="I"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {data?.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">{data?.email}</span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          {data?.accountOwnerFirstName} {data?.accountOwnerLastName}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <button
          onClick={() =>
            data?.isActive
              ? setDeactivateModalVisible(true)
              : setActivateModalVisible(true)
          }
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
            data?.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {data?.isActive ? "Active" : "Deactivated"}
        </button>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-sm text-gray-900">
          {data?.parentClient?.id ? "Sub Account" : "Main Account"}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex space-x-2">
          <Link
            href={`/secure/client-profile/${data?.id}`}
            className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100"
            data-tooltip-id="edit"
            data-tooltip-content="Edit"
          >
            {getIcon("Edit")}
          </Link>
          {/* <button
            onClick={() => setDeleteModalVisible(true)}
            className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
            data-tooltip-id="delete"
            data-tooltip-content="Delete"
          >
            {getIcon("Trash2")}
          </button> */}
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
        message={"This client is deleted successfully."}
        onclose={() => setDeleteSuccessModalVisible(false)}
      />

      <FailModal
        isVisible={deleteFailModalVisible}
        title={"Something Went Wrong!"}
        message={
          "Something went wrong while deleting this client. Please try again."
        }
        onclose={() => setDeleteFailModalVisible(false)}
      />

      <ActivateModal
        isVisible={activateModalVisible}
        onclose={() => setActivateModalVisible(false)}
        onActivate={handleActivate}
      />

      <DeactivateModal
        isVisible={deactivateModalVisible}
        onclose={() => setDeactivateModalVisible(false)}
        onActivate={handleDeactivate}
      />
    </tr>
  );
}
