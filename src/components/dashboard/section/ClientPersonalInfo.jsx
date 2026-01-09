"use client";
import { useEffect, useRef, useState } from "react";
import FailModal from "@/components/modals/FailModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { postData, updateData } from "@/data/client";
import { strapiLOV } from "@/data/loaders";
import {
  isEmailValid,
  isName,
  isNumberAndRequired,
  isRequired,
} from "@/utils/formValidators";
import { handleImgResponse } from "@/utils/utility";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CantonSelect from "../option/CantonSelect";
import UploadAttachment from "./consultant-profile/UploadAttachements";
import PhoneNumberInput from "@/components/forms/PhoneNumber";
import { Trash2, Upload } from "lucide-react";

export default function ClientPersonalInfo(props) {
  const { client } = props;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    client?.logo?.url ? handleImgResponse(client?.logo) : null
  );
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [clientInfo, setClientInfo] = useState({
    name: client?.name || "",
    email: client?.email || "",
    details: client?.details || "",
    accountOwnerFirstName: client?.accountOwnerFirstName || "",
    accountOwnerLastName: client?.accountOwnerLastName || "",
    logo: client?.logo || "",
    country: client?.country || "",
    street: client?.street || "",
    phoneNumber: client?.phoneNumber || "",
    areaPostalCodes: client?.areaPostalCodes || "",
    number: client?.number || "",
    commune: client?.commune || "",
    canton: client?.canton || "",
    attachment: client?.attachment || [],
  });

  const [cantonData, setCantonData] = useState(null);
  useEffect(() => {
    strapiLOV().then((data) => {
      if (data && data?.cantons) {
        const transformedCantons = data?.cantons?.map((canton) => ({
          value: canton?.value,
          option: canton?.title,
        }));
        setCantonData(transformedCantons);
      }
    });
  }, []);

  const handleAttachementChange = (attachment) => {
    setClientInfo({
      ...clientInfo,
      ...attachment,
    });
  };

  const [errorMessage, setErrorMessage] = useState("");
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setClientInfo({ ...clientInfo, logo: file });
    setSelectedImage(URL.createObjectURL(file));

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };
  const fileInputRef = useRef(null);
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  const handlePhoneNumberChange = (newValue) => {
    setClientInfo({
      ...clientInfo,
      phoneNumber: newValue,
    });
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setClientInfo({
      ...clientInfo,
      logo: null,
    });
  };
  const validateField = (fieldName, value) => {
    let error;
    switch (fieldName) {
      case "name":
        error = isRequired(value, fieldName);
        break;
      case "accountOwnerFirstName":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isName(value);
        break;
      case "accountOwnerLastName":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isName(value);
        break;
      case "email":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isEmailValid(value);
        break;
      case "logo":
        error = { valid: true, message: "" };
        break;
      case "canton":
        error = isNumberAndRequired(value, fieldName);
        break;
      default:
        error = isRequired(value, fieldName);
        break;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error.message }));
  };

  const validateAll = () => {
    Object.keys(clientInfo).forEach((key) =>
      validateField(key, clientInfo[key])
    );

    return Object.values(validationErrors).every((error) => !error);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    if (validateAll()) {
      if (client?.id) {
        handleUpdateData(clientInfo);
      } else {
        handlePostData(clientInfo);
      }
    } else {
      setErrorMessage("Please fill all the required fields.");
      setFailModalVisible(true);
    }
  };

  const handlePostData = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);

    const clientData = {
      ...data,
    };
    delete clientData.logo;
    delete clientData.attachment;
    formData.append("clientData", JSON.stringify(clientData));

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.attachment && data.attachment.length > 0) {
      data.attachment.forEach((file, index) => {
        formData.append(`attachment[${index}]`, file);
      });
    }

    const response = await postData(formData);

    if (response?.data?.client?.id) {
      setClientInfo({ ...clientInfo, id: response?.data?.client?.id });
      // alert(
      //   "Email: " +
      //     response?.data?.client?.email +
      //     " Password: " +
      //     response?.data?.password
      // );

      setSucModalVisible(true);
    } else {
      setErrorMessage(response?.error?.message);
      setFailModalVisible(true);
    }
  };

  const handleUpdateData = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    const clientData = {
      ...data,
    };
    delete clientData.logo;
    formData.append("clientData", JSON.stringify(clientData));

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.attachment && data.attachment.length > 0) {
      data.attachment.forEach((file, index) => {
        formData.append(`attachment[${index}]`, file);
      });
    }

    const response = await updateData(formData, client?.id);

    if (response?.data?.client?.id) {
      setSucModalVisible(true);
    } else {
      if (response?.error?.message) {
        setFailModalVisible(true);
      }
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
    router.push(`/secure/client-profile/${clientInfo.id || client.id}`);
  };

  const selectHandler = (name, value) => {
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  return (
    <div className="tailwind">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h4 className="text-lg font-bold text-[#02153d]">Profile Details</h4>
        </div>

        <div className="max-w-3xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-8">
            <div className="mb-4 sm:mb-0">
              <Image
                height={80}
                width={80}
                className="rounded-full object-cover"
                src={selectedImage ? selectedImage : "/images/user.png"}
                alt="profile"
              />
            </div>
            <div className="ml-0 sm:ml-5">
              <div className="flex items-center my-3">
                <button
                  onClick={handleDeleteImage}
                  className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <label className="ml-3 cursor-pointer">
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <Upload className="w-5 h-5 mr-2" />
                    <span>Upload Image</span>
                  </div>
                </label>
              </div>
              <p className="text-sm text-gray-500">
                Max file size is 1MB, and suitable files are .jpg &amp; .png
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Name"
                value={clientInfo.name}
                name="name"
                onChange={handleOnChange}
                onBlur={(e) => validateField("name", e.target.value)}
              />
              {validationErrors.name && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Owner First Name
              </label>
              <input
                type="text"
                name="accountOwnerFirstName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Account Owner First Name"
                value={clientInfo.accountOwnerFirstName}
                onChange={handleOnChange}
                onBlur={(e) =>
                  validateField("accountOwnerFirstName", e.target.value)
                }
              />
              {validationErrors.accountOwnerFirstName && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.accountOwnerFirstName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Account Owner Last Name
              </label>
              <input
                type="text"
                name="accountOwnerLastName"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Account Owner Last Name"
                value={clientInfo.accountOwnerLastName}
                onChange={handleOnChange}
                onBlur={(e) =>
                  validateField("accountOwnerLastName", e.target.value)
                }
              />
              {validationErrors.accountOwnerLastName && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.accountOwnerLastName}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Email"
                name="email"
                value={clientInfo.email}
                onChange={handleOnChange}
                onBlur={(e) => validateField("email", e.target.value)}
              />
              {validationErrors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <PhoneNumberInput
                value={clientInfo.phoneNumber || ""}
                onChange={handlePhoneNumberChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Position
              </label>
              <textarea
                name="details"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={2}
                placeholder="Position"
                style={{ resize: "none" }}
                value={clientInfo.details}
                onChange={handleOnChange}
                onBlur={(e) => validateField("details", e.target.value)}
              />
              {validationErrors.details && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.details}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street
              </label>
              <input
                type="text"
                name="street"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Street"
                value={clientInfo.street}
                onChange={handleOnChange}
                onBlur={(e) => validateField("street", e.target.value)}
              />
              {validationErrors.street && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.street}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number
              </label>
              <input
                type="text"
                name="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Door Number"
                value={clientInfo.number}
                onChange={handleOnChange}
                onBlur={(e) => validateField("number", e.target.value)}
              />
              {validationErrors.number && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.number}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                name="areaPostalCodes"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Postal Code"
                value={clientInfo.areaPostalCodes}
                onChange={handleOnChange}
                onBlur={(e) => validateField("areaPostalCodes", e.target.value)}
              />
              {validationErrors.areaPostalCodes && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.areaPostalCodes}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City / Commune
              </label>
              <input
                type="text"
                name="commune"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="City"
                value={clientInfo.commune}
                onChange={handleOnChange}
                onBlur={(e) => validateField("commune", e.target.value)}
              />
              {validationErrors.commune && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.commune}
                </div>
              )}
            </div>

            <div>
              {cantonData?.length > 0 && (
                <CantonSelect
                  label="Canton"
                  defaultSelect={
                    clientInfo?.canton?.id ? clientInfo?.canton?.id : ""
                  }
                  data={cantonData}
                  handler={selectHandler}
                  name="canton"
                  isSearchable={true}
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                name="country"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Country"
                value={clientInfo.country}
                onChange={handleOnChange}
                onBlur={(e) => validateField("country", e.target.value)}
              />
              {validationErrors.country && (
                <div className="text-red-500 text-sm mt-1">
                  {validationErrors.country}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <UploadAttachment
          title={"Upload Master Service Agreement"}
          onChange={handleAttachementChange}
          attachment={clientInfo?.attachment}
        />
      </div>

      <div className="mt-8 text-right">
        <button
          className="px-6 py-3 bg-[#02153d] text-white rounded-lg hover:bg-[#032a6f] transition-colors shadow-sm"
          onClick={handleOnSubmit}
        >
          Save
        </button>
      </div>

      <SuccessModal
        isVisible={sucModalVisible}
        title={client?.id ? "Successfully Updated!" : "Successfully Added!"}
        message={
          client?.id
            ? "This client is updated successfully."
            : "This client is added successfully."
        }
        onclose={handleCloseSuccessModal}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={errorMessage || "Something went wrong. Please try again."}
        onclose={() => setFailModalVisible(false)}
      />
    </div>
  );
}
