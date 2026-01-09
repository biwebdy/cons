"use client";
import React, { createContext, useContext, useState } from "react";
import {
  isDobValid,
  isEmailValid,
  isName,
  isNumberAndRequired,
  isPhoneNumberValid,
  isRequired,
  isSSN,
} from "./formValidators";
import Modal from "@/components/modals/Modal";
import FailModal from "@/components/modals/FailModal";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
  });
  const [errors, setErrors] = useState({});

  const updateFormData = (fieldName, value) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    validateField(fieldName, value);
  };

  const validateField = (fieldName, value) => {
    let error;
    switch (fieldName) {
      case "email":
        error =
          !value || value?.trim() === ""
            ? isRequired(value, fieldName)
            : isEmailValid(value);
        break;
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
      case "dob":
        error = isDobValid(value);
        break;
      default:
        error = { valid: true, message: "" };
        break;
    }
    setErrors((prev) => ({ ...prev, [fieldName]: error.message }));
  };

  const validateAll = () => {
    const tempErrors = {};

    Object.keys(formData).forEach((key) => {
      let error;
      const value = formData[key];
      switch (key) {
        case "email":
          error =
            !value || value.trim() === ""
              ? isRequired(value, key)
              : isEmailValid(value);
          break;
        case "firstName":
          error =
            !value || value.trim() === ""
              ? isRequired(value, key)
              : isName(value);
          break;
        case "lastName":
          error =
            !value || value.trim() === ""
              ? isRequired(value, key)
              : isName(value);
          break;


        default:
          error = { valid: true, message: "" };
          break;
      }
      tempErrors[key] = error.message;
    });

    setErrors(tempErrors);

    const isValid = Object.values(tempErrors).every((error) => !error);
    if (!isValid) {
      setFailModalVisible(true)
    }
    return isValid;
  };

  const [failModalVisible, setFailModalVisible] = useState(false);

  return (
    <>
      <FormContext.Provider
        value={{ formData, updateFormData, errors, validateAll }}
      >
        {children}
      </FormContext.Provider>

      <FailModal
        title={"Please fill the required fields!"}
        message={
          "Something went wrong. Quiting the form without saving mandatory fields will result in loss of data."
        }
        onclose={() => setFailModalVisible(false)}
        isVisible={failModalVisible}
      />
    </>
  );
};
