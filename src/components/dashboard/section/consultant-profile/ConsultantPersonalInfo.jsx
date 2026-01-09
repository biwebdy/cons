"use client";
import React, { useEffect, useRef, useState } from "react";
import SelectInput from "../../option/SelectInput";
import Image from "next/image";
import { useFormContext } from "@/utils/formContext";
import { nationalityData } from "@/data/nationalityData";
import TextAreaInput from "@/components/forms/TextAreaInput";
import PhoneNumberInput from "@/components/forms/PhoneNumber";
import { strapiLOV } from "@/data/loaders";
import CantonSelect from "../../option/CantonSelect";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function ConsultantPersonalInfo(props) {
  const { updateFormData, errors } = useFormContext();
  const { consultant } = props;
  const [consInfo, setConsInfo] = useState({
    firstName: consultant?.firstName || "",
    lastName: consultant?.lastName || "",
    gender: consultant?.gender || "",
    dob: consultant?.dob || "",
    email: consultant?.email || "",
    phoneNumber: consultant?.phoneNumber || "",
    nationality: consultant?.nationality || "",
    about: consultant?.about || "",
    civilStatus: consultant?.civilStatus || "",
    residencyPermit: consultant?.residencyPermit || "",
    profilePicture: consultant?.profilePicture || null,
    country: consultant?.country || "",
    street: consultant?.street || "",
    areaPostalCodes: consultant?.areaPostalCodes || "",
    number: consultant?.number || "",
    commune: consultant?.commune || "",
    canton: consultant?.canton || "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const [cantonData, setCantonData] = useState(null);

  useEffect(() => {
    strapiLOV().then((data) => {
      if (data && data.cantons) {
        const transformedCantons = data?.cantons?.map((canton) => ({
          value: canton.value,
          option: canton.title,
        }));
        setCantonData(transformedCantons);
      }
    });
  }, []);

  useEffect(() => {
    if (consultant?.id) {
      Object.keys(consInfo).forEach((key) => {
        updateFormData(key, consInfo[key]);
      });
    }
  }, [consultant]);

  useEffect(() => {
    props.onChange(consInfo);
  }, [consInfo]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setConsInfo({
      ...consInfo,
      profilePicture: file,
    });
    setSelectedImage(URL.createObjectURL(file));
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handlePhoneNumberChange = (newValue) => {
    setConsInfo({
      ...consInfo,
      phoneNumber: newValue,
    });
    updateFormData("phoneNumber", newValue);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setConsInfo({
      ...consInfo,
      [name]: value,
    });
  };

  const handleOnDateChange = (date) => {
    try {
      if (date === null || isNaN(new Date(date).getTime())) {
        setConsInfo({
          ...consInfo,
          dob: null,
        });
        updateFormData("dob", null);
      } else {
        if (date.getFullYear() < 999 || date.getFullYear() > 9999) {
          return;
        }
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        updateFormData("dob", formattedDate);
        setConsInfo({
          ...consInfo,
          dob: formattedDate,
        });
      }
    } catch (error) {
      console.error("Invalid date input:", error);
    }
  };
  const handleDeleteImage = () => {
    setSelectedImage(null);
    setConsInfo({
      ...consInfo,
      profilePicture: null,
    });
  };

  const selectHandler = (name, value) => {
    setConsInfo({
      ...consInfo,
      [name]: value,
    });
    updateFormData(name, value);
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h4 className="list-title fw900">Profile Details</h4>
        </div>
        <div className="col-xl-7">
          <div className="profile-box d-sm-flex align-items-center mb30">
            <div className="profile-img mb20-sm">
              <Image
                height={71}
                width={71}
                className="rounded-circle wa-xs"
                src={selectedImage ? selectedImage : "/images/user.png"}
                style={{
                  height: "71px",
                  width: "71px",
                  objectFit: "cover",
                }}
                alt="profile"
              />
            </div>
            <div className="profile-content ml20 ml0-xs">
              <div className="d-flex align-items-center my-3">
                <a className="tag-delt text-thm2" onClick={handleDeleteImage}>
                  <span className="flaticon-delete text-thm2" />
                </a>
                <label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="d-none"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    value=""
                  />
                  <a className="upload-btn ml10">Upload Image</a>
                </label>
              </div>
              <p className="text mb-0">
                Max file size is 1MB, Minimum dimension: 330x300 And Suitable
                files are .jpg &amp; .png
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  value={consInfo.firstName}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("firstName", e.target.value)}
                />
                {errors.firstName && (
                  <div className="text-danger">{errors.firstName}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  value={consInfo.lastName}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("lastName", e.target.value)}
                />
                {errors.lastName && (
                  <div className="text-danger">{errors.lastName}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <SelectInput
                  label="Gender"
                  defaultSelect={consInfo?.gender}
                  data={[
                    { option: "Male", value: "Male" },
                    {
                      option: "Female",
                      value: "Female",
                    },
                    {
                      option: "Others",
                      value: "Others",
                    },
                  ]}
                  name="gender"
                  handler={selectHandler}
                />
                {errors.gender && (
                  <div className="text-danger">{errors.gender}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={consInfo.email}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("email", e.target.value)}
                />
                {errors.email && (
                  <div className="text-danger">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Phone Number
                </label>
                <PhoneNumberInput
                  value={consInfo.phoneNumber || ""}
                  onChange={handlePhoneNumberChange}
                />
                {errors.phoneNumber && (
                  <div className="text-danger">{errors.phoneNumber}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Date Of Birth
                </label>
                <div className="position-relative" ref={calendarRef}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Select Date of Birth"
                    value={consInfo.dob || ""}
                    readOnly
                    onClick={() => setShowCalendar(!showCalendar)}
                    style={{ cursor: "pointer" }}
                  />
                  {showCalendar && (
                    <div
                      className="position-absolute"
                      style={{
                        top: "100%",
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: "white",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Calendar
                        onChange={(date) => {
                          handleOnDateChange(date);
                          setShowCalendar(false);
                        }}
                        value={consInfo.dob ? new Date(consInfo.dob) : null}
                      />
                    </div>
                  )}
                </div>
                {errors.dob && <div className="text-danger">{errors.dob}</div>}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <SelectInput
                  label="Nationality"
                  defaultSelect={consInfo?.nationality}
                  data={nationalityData}
                  handler={selectHandler}
                  name="nationality"
                  isSearchable={true}
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <SelectInput
                  label="Civil Status"
                  defaultSelect={consInfo?.civilStatus}
                  data={[
                    { option: "Single", value: "Single" },
                    {
                      option: "Married",
                      value: "Married",
                    },
                    {
                      option: "Divorced",
                      value: "Divorced",
                    },
                    {
                      option: "Widowed",
                      value: "Widowed",
                    },
                  ]}
                  name="civilStatus"
                  handler={selectHandler}
                />
                {errors.civilStatus && (
                  <div className="text-danger">{errors.civilStatus}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <SelectInput
                  label="Residency Permit"
                  defaultSelect={consInfo?.residencyPermit}
                  data={[
                    { option: "C permit", value: "C permit" },
                    { option: "B permit", value: "B permit" },
                    { option: "Swiss Citizenship", value: "Swiss Citizenship" },
                    { option: "No permit", value: "No permit" },
                    { option: "Others", value: "Others" },
                  ]}
                  name="residencyPermit"
                  handler={selectHandler}
                />
                {errors.residencyPermit && (
                  <div className="text-danger">{errors.residencyPermit}</div>
                )}
              </div>
            </div>

            {/* <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Social Security Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Social Security Number"
                  name="socialSecurityNumber"
                  onChange={handleSSNChange}
                  value={consInfo.socialSecurityNumber}
                  onBlur={(e) =>
                    updateFormData("socialSecurityNumber", e.target.value)
                  }
                />
                {errors.socialSecurityNumber && (
                  <div className="text-danger">
                    {errors.socialSecurityNumber}
                  </div>
                )}
              </div>
            </div> */}

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  placeholder="Street"
                  value={consInfo.street}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("street", e.target.value)}
                />
                {errors.street && (
                  <div className="text-danger">{errors.street}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Number
                </label>
                <input
                  type="text"
                  name="number"
                  className="form-control"
                  placeholder="Door Number"
                  value={consInfo.number}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("number", e.target.value)}
                />
                {errors.number && (
                  <div className="text-danger">{errors.number}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="areaPostalCodes"
                  className="form-control"
                  placeholder="Postal Code"
                  value={consInfo.areaPostalCodes}
                  onChange={handleOnChange}
                  onBlur={(e) =>
                    updateFormData("areaPostalCodes", e.target.value)
                  }
                />
                {errors.areaPostalCodes && (
                  <div className="text-danger">{errors.areaPostalCodes}</div>
                )}
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                <label className="heading-color ff-heading fw700 mb10">
                  City / Commune
                </label>
                <input
                  type="text"
                  name="commune"
                  className="form-control"
                  placeholder="City"
                  value={consInfo.commune}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("commune", e.target.value)}
                />
                {errors.commune && (
                  <div className="text-danger">{errors.commune}</div>
                )}
              </div>
            </div>
            <div className="col-sm-6">
              <div className="mb20">
                {cantonData?.length > 0 && (
                  <CantonSelect
                    label="Canton"
                    defaultSelect={
                      consInfo?.canton?.id ? consInfo?.canton?.id : ""
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
                <label className="heading-color ff-heading fw700 mb10">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  placeholder="Country"
                  value={consInfo.country}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("country", e.target.value)}
                />
                {errors.country && (
                  <div className="text-danger">{errors.country}</div>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="mb10">
                <TextAreaInput
                  name="about"
                  maxWords={250}
                  value={consInfo?.about}
                  placeholder={"Executive Summary"}
                  label={"Execute Summary of your professional profile"}
                  onChange={handleOnChange}
                  onBlur={(e) => updateFormData("about", e.target.value)}
                />
                {errors.about && (
                  <div className="text-danger">
                    {"Executive Summary is required"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
