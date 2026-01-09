"use client";

import { useEffect, useRef, useState } from "react";

import { updateData } from "@/data/client";

import { postData } from "@/data/client";
import { strapiLOV } from "@/data/loaders";
import Image from "next/image";
import { useRouter } from "next/navigation";
import UploadAttachment from "../consultant/UploadAttachement";
import CantonSelect from "../dashboard/option/CantonSelect";
import FailModal from "../modals/FailModal";
import SuccessModal from "../modals/SuccessModal";
import { handleImgResponse } from "@/utils/utility";
import {
  isEmailValid,
  isName,
  isNumberAndRequired,
  isRequired,
} from "@/utils/formValidators";
import Navlist from "../banner-elements/Navlist";
import BannerLogo from "../banner-elements/BannerLogo";
import { CLIENTS_LINKS } from "@/app/constants";

export default function EditClient(props) {
  const { client, isClient } = props;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    handleImgResponse(client?.logo) || null
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
    areaPostalCodes: client?.areaPostalCodes || "",
    number: client?.number || "",
    commune: client?.commune || "",
    canton: client?.canton || "",
    attachment: client?.attachment || [],
  });

  const [cantonData, setCantonData] = useState(null);
  useEffect(() => {
    strapiLOV()?.then((data) => {
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
    const file = event?.target?.files[0];
    setClientInfo({ ...clientInfo, logo: file });
    setSelectedImage(URL.createObjectURL(file));

    if (fileInputRef?.current) {
      fileInputRef.current.value = null;
    }
  };
  const fileInputRef = useRef(null);
  const handleOnChange = (event) => {
    const { name, value } = event?.target;

    if (name === "accountOwnerFirstName" || name === "accountOwnerLastName") {
      processedValue = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    setClientInfo({
      ...clientInfo,
      [name]: value,
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
        error = { valid: true, message: "" };
        break;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error?.message }));
  };

  const validateAll = () => {
    Object.keys(clientInfo)?.forEach((key) =>
      validateField(key, clientInfo[key])
    );
    return Object.values(validationErrors)?.every((error) => !error);
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
    formData?.append("email", data.email);

    const clientData = {
      ...data,
    };
    delete clientData?.logo;
    delete clientData?.attachment;
    formData.append("clientData", JSON.stringify(clientData));

    if (data?.logo) {
      formData?.append("logo", data?.logo);
    }

    if (data?.attachment && data?.attachment?.length > 0) {
      data?.attachment?.forEach((file, index) => {
        formData?.append(`attachment[${index}]`, file);
      });
    }

    const response = await postData(formData);
    if (response?.client?.id) {
      setClientInfo({ ...clientInfo, id: response?.client?.id });
      setSucModalVisible(true);
    } else {
      setErrorMessage(response?.error?.message);
      setFailModalVisible(true);
    }
  };

  const handleUpdateData = async (data) => {
    const formData = new FormData();
    formData?.append("email", data?.email);
    const clientData = {
      ...data,
    };
    delete clientData?.logo;
    formData.append("clientData", JSON.stringify(clientData));

    if (data?.logo) {
      formData?.append("logo", data?.logo);
    }

    if (data?.attachment && data?.attachment?.length > 0) {
      data?.attachment?.forEach((file, index) => {
        formData?.append(`attachment[${index}]`, file);
      });
    }

    const response = await updateData(formData, client?.id);

    if (response?.status === 200) {
      setSucModalVisible(true);
    } else {
      setFailModalVisible(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
  };

  const selectHandler = (name, value) => {
    setClientInfo({
      ...clientInfo,
      [name]: value,
    });
  };

  const navLinks = CLIENTS_LINKS;

  return (
    <>
      <section className="  profile-bnr pb-0 ">
        <div className="container" style={{ position: "relative" }}>
          <div style={{ position: "absolute", top: "10px", left: "-12px" }}>
            <BannerLogo color="yellow" />
          </div>
          <div
            className="row align-items-center justify-content-between"
            style={{ paddingTop: "180px" }}
          >
            <div className="col-lg-8">
              <div className="pr30 pr0-lg mb30-md position-relative">
                <h1 className="animate-up-1 mb25 text-white hero-title proxima">
                  EDIT YOUR PROFILE
                </h1>
                <h3 className="text animate-up-2 text-white nsan">
                  Let‘s make your profile shine.
                </h3>
              </div>
            </div>
            <div className="col-lg-6 ">
              <div className="navlist">
                <Navlist links={navLinks} withLogout={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard__content">
        <div className="form-style1">
          <div className="row">
            <div className="col-xl-1"></div>
            <div className="col-xl-10">
              <div className="col-xl-7">
                <div className="profile-box d-sm-flex align-items-center mb30">
                  <div className="profile-img mb20-sm">
                    <Image
                      height={80}
                      width={890}
                      className="rounded-circle wa-xs"
                      src={selectedImage ? selectedImage : "/images/user.png"}
                      style={{
                        height: "80px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                      alt="profile"
                    />
                  </div>
                  <div className="profile-content ml20 ml0-xs">
                    <div className="d-flex align-items-center my-3">
                      <a
                        className="tag-delt text-thm2"
                        style={{
                          backgroundColor: "#dd9276",
                          display: "flex",
                          alignItems: "center",
                          height: "60px",
                          margin: "0px 10px",
                        }}
                        onClick={handleDeleteImage}
                      >
                        <img
                          src="/images/icon/x.png"
                          style={{ margin: "auto" }}
                        />
                      </a>
                      <label>
                        <input
                          type="file"
                          accept=".png, .jpg, .jpeg"
                          className="d-none"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                        <a className="btn-prm">Upload Image</a>
                      </label>
                    </div>
                    <p className="text mb-0 text-yellow">
                      Max file size is 1MB, and suitable files are .jpg &amp;
                      .png
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="form-style1">
                  <div className="row">
                    <div className="col-sm-12">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          COMPANY NAME
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          value={clientInfo.name}
                          name="name"
                          onChange={handleOnChange}
                          onBlur={(e) => validateField("name", e.target.value)}
                        />
                        {validationErrors.name && (
                          <div className="text-danger">
                            {validationErrors.name}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          ACCOUNT OWNER FIRST NAME
                        </label>
                        <input
                          type="text"
                          name="accountOwnerFirstName"
                          className="form-control"
                          placeholder=" Account Owner First Name"
                          value={clientInfo.accountOwnerFirstName}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField(
                              "accountOwnerFirstName",
                              e.target.value
                            )
                          }
                        />
                        {validationErrors.accountOwnerFirstName && (
                          <div className="text-danger">
                            {validationErrors.accountOwnerFirstName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          ACCOUNT OWNER LAST NAME
                        </label>
                        <input
                          type="text"
                          name="accountOwnerLastName"
                          className="form-control"
                          placeholder="Account Owner Last Name"
                          value={clientInfo.accountOwnerLastName}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField(
                              "accountOwnerLastName",
                              e.target.value
                            )
                          }
                        />
                        {validationErrors.accountOwnerLastName && (
                          <div className="text-danger">
                            {validationErrors.accountOwnerLastName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          EMAIL ADDRESS
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={clientInfo.email}
                          readOnly={true}
                          disabled={true}
                        />
                        {validationErrors.email && (
                          <div className="text-danger">
                            {validationErrors.email}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="mb10">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          POSITION
                        </label>
                        <textarea
                          name="details"
                          cols={30}
                          rows={2}
                          placeholder="Position"
                          style={{ resize: "none" }}
                          value={clientInfo.details}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("details", e.target.value)
                          }
                        />
                        {validationErrors.details && (
                          <div className="text-danger">
                            {validationErrors.details}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          STREET
                        </label>
                        <input
                          type="text"
                          name="street"
                          className="form-control"
                          placeholder="Street"
                          value={clientInfo.street}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("street", e.target.value)
                          }
                        />
                        {validationErrors.street && (
                          <div className="text-danger">
                            {validationErrors.street}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          NUMBER
                        </label>
                        <input
                          type="text"
                          name="number"
                          className="form-control"
                          placeholder="Door Number"
                          value={clientInfo.number}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("number", e.target.value)
                          }
                        />
                        {validationErrors.number && (
                          <div className="text-danger">
                            {validationErrors.number}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          POSTAL CODE
                        </label>
                        <input
                          type="text"
                          name="areaPostalCodes"
                          className="form-control"
                          placeholder="Postal Code"
                          value={clientInfo.areaPostalCodes}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("areaPostalCodes", e.target.value)
                          }
                        />
                        {validationErrors.areaPostalCodes && (
                          <div className="text-danger">
                            {validationErrors.areaPostalCodes}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          CITY / COMMUNE
                        </label>
                        <input
                          type="text"
                          name="commune"
                          className="form-control"
                          placeholder="City"
                          value={clientInfo.commune}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("commune", e.target.value)
                          }
                        />
                        {validationErrors.commune && (
                          <div className="text-danger">
                            {validationErrors.commune}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        {cantonData?.length > 0 && (
                          <CantonSelect
                            label="CANTON"
                            defaultSelect={
                              clientInfo?.canton?.id
                                ? clientInfo?.canton?.id
                                : ""
                            }
                            data={cantonData}
                            handler={selectHandler}
                            name="canton"
                            isSearchable={true}
                          />
                        )}
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="mb20">
                        <label className="heading-color ff-heading fw700 mb10 proxima text-blue">
                          COUNTRY
                        </label>
                        <input
                          type="text"
                          name="country"
                          className="form-control"
                          placeholder="Country"
                          value={clientInfo.country}
                          onChange={handleOnChange}
                          onBlur={(e) =>
                            validateField("country", e.target.value)
                          }
                        />
                        {validationErrors.country && (
                          <div className="text-danger">
                            {validationErrors.country}
                          </div>
                        )}
                      </div>
                    </div>

                    <SuccessModal
                      isVisible={sucModalVisible}
                      title={
                        client?.id
                          ? "Successfully Updated!"
                          : "Successfully Added!"
                      }
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
                      message={
                        errorMessage ||
                        "Something went wrong. Please try again."
                      }
                      onclose={() => setFailModalVisible(false)}
                    />
                  </div>
                </div>
              </div>

              <label
                className="heading-color ff-heading fw700 mb10 proxima text-blue"
                style={{ marginTop: "20px" }}
              >
                {" "}
                Upload Attachements
              </label>
              <UploadAttachment
                onChange={handleAttachementChange}
                attachment={clientInfo?.attachment}
              />

              <div className="col-md-12">
                <div className="text-end">
                  <button className="btn-prm" onClick={handleOnSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
