"use client";
import { postData } from "@/data/consultants";
import { FormProvider } from "@/utils/formContext";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import FailModal from "../../modals/FailModal";
import UploadAttachment from "./consultant-profile/UploadAttachements";
import PhoneNumberInput from "@/components/forms/PhoneNumber";

import {
  isDobValid,
  isEmailValid,
  isName,
  isRequired,
  isPhoneNumberValid,
} from "@/utils/formValidators";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function ConsultantRegister() {
  const router = useRouter();

  const [failModalVisible, setFailModalVisible] = useState(false);
  const [failMessage, setFailMessage] = useState({
    title: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [consultant, setConsultant] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    resume: [],
    phoneNumber: "",
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

  const handleOnChangeInfo = (e) => {
    const { name, value } = e?.target;

    // Capitalize first letter for firstName and lastName fields
    let processedValue = value;
    if (name === "firstName" || name === "lastName") {
      processedValue = value
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
    }

    setConsultant({
      ...consultant,
      [name]: processedValue,
    });
  };

  const handleChangeResume = (files) => {
    setConsultant({
      ...consultant,
      resume: files.attachment,
    });
  };

  const handlePhoneNumberChange = (phoneNumber) => {
    setConsultant({
      ...consultant,
      phoneNumber: phoneNumber,
    });
  };

  const validateField = (fieldName, value) => {
    let error;
    switch (fieldName) {
      case "firstName":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isName(value);
        break;
      case "lastName":
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
      case "dob":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isDobValid(value);
        break;
      case "phoneNumber":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isPhoneNumberValid(value);
        break;
      default:
        error = isRequired(value, fieldName);
        break;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error.message }));
  };

  const validateAll = () => {
    // Validate all required fields
    validateField("firstName", consultant.firstName);
    validateField("lastName", consultant.lastName);
    validateField("email", consultant.email);
    validateField("dob", consultant.dob);
    validateField("phoneNumber", consultant.phoneNumber);

    // Check if all validations pass
    return Object.values(validationErrors).every((error) => !error);
  };

  const handleSubmit = () => {
    if (validateAll() && consultant.resume.length > 0) {
      handlePostData();
    } else {
      setFailMessage({
        title: "Invalid Form",
        message:
          "Please add the resume and fill all the mandatory fields including phone number.",
      });
    }
  };
  const handleOnDateChange = (date) => {
    if (date === null || isNaN(new Date(date).getTime())) {
      setConsultant({
        ...consultant,
        dob: date,
      });
      //   updateFormData("dob", date);
    } else {
      if (date.getFullYear() < 999) {
        return;
      }
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      // updateFormData("dob", formattedDate);
      setConsultant({
        ...consultant,
        dob: formattedDate,
      });
    }
  };

  const handlePostData = async () => {
    const formData = new FormData();
    formData.append("email", consultant.email);
    const consultantData = {
      ...consultant,
    };
    delete consultantData.resume;
    formData.append("consultantData", JSON.stringify(consultantData));

    if (consultant.resume && consultant.resume.length > 0) {
      consultant.resume.forEach((file, index) => {
        formData.append(`resume`, file);
      });
    }

    const response = await postData(formData);
    if (response?.data?.consultant?.id) {
      setConsultant({ ...consultant, id: response?.consultant?.id });
      router.push("/thank-you");
    } else {
      setFailMessage({
        title: "Invalid Form",
        message: "Please add the resume and fill all the mandatory fields.",
      });
    }
  };

  useEffect(() => {
    if (failMessage.title) {
      setFailModalVisible(true);
    }
  }, [failMessage]);

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

  return (
    <>
      <FormProvider>
        <div className="row">
          <div className="col-xl-12">
            <div className="row">
              <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
                Personal Info
              </h4>
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
                    value={consultant.firstName}
                    onChange={handleOnChangeInfo}
                    onBlur={(e) => validateField("firstName", e.target.value)}
                  />
                  {validationErrors.firstName && (
                    <div className="text-danger">
                      {validationErrors.firstName}
                    </div>
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
                    value={consultant.lastName}
                    onChange={handleOnChangeInfo}
                    onBlur={(e) => validateField("lastName", e.target.value)}
                  />
                  {validationErrors.lastName && (
                    <div className="text-danger">
                      {validationErrors.lastName}
                    </div>
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
                    value={consultant.email}
                    onChange={handleOnChangeInfo}
                    onBlur={(e) => validateField("email", e.target.value)}
                  />
                  {validationErrors.email && (
                    <div className="text-danger">{validationErrors.email}</div>
                  )}
                </div>
              </div>
              <div className="col-sm-6">
                <div className="mb20">
                  <label className="heading-color ff-heading fw700 mb10">
                    Phone Number
                  </label>
                  <PhoneNumberInput
                    value={consultant.phoneNumber || ""}
                    onChange={handlePhoneNumberChange}
                  />
                  {validationErrors.phoneNumber && (
                    <div className="text-danger">
                      {validationErrors.phoneNumber}
                    </div>
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
                      value={consultant.dob || ""}
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
                          value={
                            consultant.dob ? new Date(consultant.dob) : null
                          }
                        />
                      </div>
                    )}
                  </div>
                  {validationErrors.dob && (
                    <div className="text-danger">{validationErrors.dob}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <UploadAttachment
            attachment={consultant?.resume}
            onChange={handleChangeResume}
          />
        </div>

        <div className="col-lg-12 text-lg-end">
          <button className="btn-prm" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </FormProvider>

      <FailModal
        isVisible={failModalVisible}
        title={failMessage?.title}
        message={failMessage?.message}
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
