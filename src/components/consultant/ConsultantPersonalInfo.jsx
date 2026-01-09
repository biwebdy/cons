"use client";
import { useEffect, useRef, useState } from "react";

import PhoneNumberInput from "@/components/forms/PhoneNumber";
import TextAreaInput from "@/components/forms/TextAreaInput";
import { nationalityData } from "@/data/nationalityData";
import { useFormContext } from "@/utils/formContext";
import Image from "next/image";
import CantonSelect from "../dashboard/option/CantonSelect";
import SelectInput from "../dashboard/option/SelectInput";

import { handleImgResponse } from "@/utils/utility";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";

export default function ConsultantPersonalInfo(props) {
  const { consultant, lov, profilePicture, isAdmin } = props;
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
    profilePicture: consultant?.profilePicture || profilePicture || null,
    country: consultant?.country || null,
    street: consultant?.street || null,
    areaPostalCodes: consultant?.areaPostalCodes || null,
    number: consultant?.number || undefined,
    commune: consultant?.commune || null,
    canton: consultant?.canton || null,
  });

  const [selectedImage, setSelectedImage] = useState(
    handleImgResponse(consultant?.profilePicture) || null
  );
  const fileInputRef = useRef(null);
  const calendarRef = useRef(null);

  const [cantonData, setCantonData] = useState(null);
  useEffect(() => {
    const data = lov;
    if (data && data?.cantons) {
      const transformedCantons = data?.cantons?.map((canton) => ({
        value: canton?.value,
        option: canton?.title,
      }));
      setCantonData(transformedCantons);
    }
  }, []);

  useEffect(() => {
    if (profilePicture && profilePicture instanceof File) {
      setSelectedImage(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

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
    if (fileInputRef?.current) {
      fileInputRef.current.value = null;
    }
  };

  const handlePhoneNumberChange = (newValue) => {
    setConsInfo({
      ...consInfo,
      phoneNumber: newValue,
    });
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setConsInfo({
      ...consInfo,
      [name]: value,
    });
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
  };

  const [showCalendar, setShowCalendar] = useState(false);

  const handleOnDateChange = (date) => {
    if (date === null || isNaN(new Date(date).getTime())) {
      setConsInfo({
        ...consInfo,
        dob: date,
      });
    } else {
      if (date.getFullYear() < 999) {
        return;
      }
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      setConsInfo({
        ...consInfo,
        dob: formattedDate,
      });
    }
  };

  return (
    <>
      <div
        className={`ps-widget bdrs4 mb30 overflow-hidden position-relative ${
          !isAdmin ? "bgc-white" : ""
        }`}
      >
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

        <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
          Personal Info
        </h4>
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
                  readOnly={true}
                />
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
                  readOnly={true}
                />
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
                  readOnly={true}
                />
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
              </div>
            </div>

            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>Address</h4>
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
                />
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
                />
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
                />
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
                />
              </div>
            </div>

            <div className="col-sm-6">
              <div className="mb20">
                {cantonData?.length > 0 && (
                  <CantonSelect
                    label="Canton"
                    defaultSelect={consInfo.canton}
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
                />
              </div>
            </div>
            <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
              Executive Summary
            </h4>
            <div className="col-md-12">
              <div className="mb10">
                <TextAreaInput
                  name="about"
                  maxWords={250}
                  value={consInfo?.about}
                  placeholder={"Executive Summary"}
                  label={"Execute Summary of your professional profile"}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
