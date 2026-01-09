"use client";

import { FormProvider, useFormContext } from "@/utils/formContext";
import { useEffect, useState } from "react";
import { fillData, updateData } from "@/data/consultants";
import { removeIdField } from "@/lib/utils";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";

import CantonSelect from "../dashboard/option/CantonSelect";
import BankingInfo from "./BankingInfo";
import { isNumberAndRequired, isRequired } from "@/utils/formValidators";
import { useRouter } from "next/navigation";
import SelectInput from "../dashboard/option/SelectInput";
import { nationalityData } from "@/data/nationalityData";
export default function ProjectInitition(props) {
  const { cons, lov } = props;
  const router = useRouter();
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [consultant, setConsultant] = useState({
    country: cons?.country || "",
    number: cons?.number || "",
    street: cons?.street || "",
    commune: cons?.commune || "",
    canton: cons?.canton || {},
    areaPostalCodes: cons?.areaPostalCodes || "",
    civilStatus: cons?.civilStatus || "",
    residencyPermit: cons?.residencyPermit || "",
    nationality: cons?.nationality || "",
    gender: cons?.gender || "",
    bankingInfo: cons?.bankingInfo || {},
  });
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

  const handleOnBankingChangeInfo = (e) => {
    setConsultant((prevConsultant) => {
      const newConsultant = { ...prevConsultant };
      if (e.bankingInfo) {
        newConsultant.bankingInfo = {
          ...newConsultant.bankingInfo,
          ...e.bankingInfo,
        };
      }
      return newConsultant;
    });
  };

  const isNullOrEmpty = (value) => {
    if (Array.isArray(value)) {
      return false;
    }
    return (
      value === undefined ||
      value === "" ||
      (typeof value === "object" && Object.keys(value || {}).length === 0)
    );
  };

  const handleSubmit = async () => {
    const consultantData = JSON.parse(JSON.stringify(consultant));

    // Reset validation errors
    setValidationErrors({});
    let isValid = true;

    // Validate canton field explicitly
    if (
      !consultantData.canton ||
      (typeof consultantData.canton === "object" &&
        Object.keys(consultantData.canton || {}).length === 0)
    ) {
      setValidationErrors((prev) => ({
        ...prev,
        canton: "Canton is required.",
      }));
      isValid = false;
    }

    // Validate banking info fields
    const bankingInfo = consultantData.bankingInfo || {};

    if (!bankingInfo.holderFirstName) {
      setValidationErrors((prev) => ({
        ...prev,
        holderFirstName: "Holder First Name is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.holderLastName) {
      setValidationErrors((prev) => ({
        ...prev,
        holderLastName: "Holder Last Name is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.bankName) {
      setValidationErrors((prev) => ({
        ...prev,
        bankName: "Bank Name is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.iban) {
      setValidationErrors((prev) => ({ ...prev, iban: "IBAN is required." }));
      isValid = false;
    }
    if (!bankingInfo.street) {
      setValidationErrors((prev) => ({
        ...prev,
        bankStreet: "Street is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.number) {
      setValidationErrors((prev) => ({
        ...prev,
        bankNumber: "Number is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.commune) {
      setValidationErrors((prev) => ({
        ...prev,
        bankCommune: "City/Commune is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.country) {
      setValidationErrors((prev) => ({
        ...prev,
        bankCountry: "Country is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.areaPostalCodes) {
      setValidationErrors((prev) => ({
        ...prev,
        bankAreaPostalCodes: "Postal Code is required.",
      }));
      isValid = false;
    }
    if (!bankingInfo.canton) {
      setValidationErrors((prev) => ({
        ...prev,
        bankCanton: "Canton is required.",
      }));
      isValid = false;
    }

    // Recursive validation function
    const validateFieldsRecursively = (data, path = "") => {
      for (const key in data) {
        const value = data[key];
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === "object" && value !== null) {
          validateFieldsRecursively(value, currentPath);
        } else {
          let error;
          switch (currentPath) {
            case "street":
            case "number":
            case "areaPostalCodes":
            case "commune":
            case "country":
              error = isRequired(value, key);
              break;
            case "canton":
              error = isRequired(value, key);
              break;
            default:
              error = isRequired(value, key);
          }

          if (error?.message) {
            isValid = false;
            setValidationErrors((prev) => ({
              ...prev,
              [currentPath]: error.message,
            }));
          }
        }
      }
    };

    // Validate consultant data
    validateFieldsRecursively(consultantData);

    // Stop submission if invalid
    if (!isValid) {
      setFailModalVisible(true);
      return;
    }

    const formData = new FormData();
    formData.append("email", consultant.email);

    for (const key in consultantData) {
      if (isNullOrEmpty(consultantData[key])) {
        consultantData[key] = null;
      }
      if (typeof consultantData[key] === "object") {
        for (const k in consultantData[key]) {
          if (isNullOrEmpty(consultantData[key][k])) {
            consultantData[key][k] = null;
          }
        }
      }
    }
    if (
      consultantData.bankingInfo &&
      consultantData.bankingInfo.canton &&
      typeof consultantData.bankingInfo.canton === "object"
    ) {
      consultantData.bankingInfo.canton = lov.cantons.find(
        (canton) => canton?.title === consultantData?.bankingInfo?.canton?.name
      )?.value;
    }
    const mapperdValue = mapProfileData(consultantData, lov);
    const removedIdField = removeIdField(mapperdValue);
    const stringifyData = JSON.stringify(removedIdField);
    formData.append("consultantData", stringifyData);
    const response = await fillData(removedIdField);
    if (response?.data?.doccuSign?.url) {
      router?.push(response.data.doccuSign.url);
    }
  };
  const mapProfileData = (profileData) => {
    const mappedData = JSON.parse(JSON.stringify(profileData));
    return mappedData;
  };

  const validateField = (fieldName, value) => {
    let error;
    switch (fieldName) {
      case "street":
        error = isRequired(value, fieldName);
        break;
      case "number":
        error = isRequired(value, fieldName);
        break;
      case "civilStatus":
        error = isRequired(value, fieldName);
        break;
      case "residencyPermit":
        error = isRequired(value, fieldName);
        break;
      case "areaPostalCodes":
        error = isRequired(value, fieldName);
        break;
      case "commune":
        error = isRequired(value, fieldName);
        break;

      case "canton":
        error = isRequired(value, fieldName);
        break;

      case "country":
        error = isRequired(value, fieldName);
        break;
      default:
        error = isRequired(value, fieldName);
        break;
    }
    setValidationErrors((prev) => ({ ...prev, [fieldName]: error?.message }));
  };

  const handleBlur = (field, value) => {
    validateField(field, value);
  };
  const selectHandler = (name, value) => {
    setConsultant({
      ...consultant,
      [name]: value,
    });

    // Trigger validation for all dropdown fields
    if (
      name === "canton" ||
      name === "civilStatus" ||
      name === "gender" ||
      name === "nationality" ||
      name === "residencyPermit"
    ) {
      validateField(name, value);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setConsultant({
      ...consultant,
      [name]: value,
    });
  };

  return (
    <>
      <FormProvider>
        <div style={{ padding: "60px" }}>
          <div className="form-style1">
            <div className="row">
              <div className="col-xl-10">
                <div className="navtab-style1">
                  <>
                    <h4 style={{ paddingTop: "60px", paddingBottom: "40px" }}>
                      Personal Information
                    </h4>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb20">
                          <SelectInput
                            label="Gender"
                            defaultSelect={consultant?.gender}
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
                          {validationErrors.gender && (
                            <div className="text-danger">
                              {validationErrors.gender}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb20">
                          <SelectInput
                            label="Nationality"
                            defaultSelect={consultant?.nationality}
                            data={nationalityData}
                            handler={selectHandler}
                            name="nationality"
                            isSearchable={true}
                          />
                          {validationErrors.nationality && (
                            <div className="text-danger">
                              {validationErrors.nationality}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb20">
                          <SelectInput
                            label="Civil Status"
                            defaultSelect={consultant?.civilStatus}
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
                          {validationErrors.civilStatus && (
                            <div className="text-danger">
                              {validationErrors.civilStatus}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-sm-6">
                        <div className="mb20">
                          <SelectInput
                            label="Residency Permit"
                            defaultSelect={consultant?.residencyPermit}
                            data={[
                              { option: "C permit", value: "C permit" },
                              { option: "B permit", value: "B permit" },
                              {
                                option: "Swiss Citizenship",
                                value: "Swiss Citizenship",
                              },
                              { option: "No permit", value: "No permit" },
                              { option: "Others", value: "Others" },
                            ]}
                            name="residencyPermit"
                            handler={selectHandler}
                          />
                          {validationErrors.residencyPermit && (
                            <div className="text-danger">
                              {validationErrors.residencyPermit}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <h4 style={{ paddingTop: "60px", paddingBottom: "40px" }}>
                      Address
                    </h4>
                    <div className="row">
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
                            value={consultant.street}
                            onChange={handleOnChange}
                            onBlur={(e) => handleBlur("street", e.target.value)}
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
                          <label className="heading-color ff-heading fw700 mb10">
                            Number
                          </label>
                          <input
                            type="text"
                            name="number"
                            className="form-control"
                            placeholder="Door Number"
                            value={consultant.number}
                            onChange={handleOnChange}
                            onBlur={(e) => handleBlur("number", e.target.value)}
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
                          <label className="heading-color ff-heading fw700 mb10">
                            Postal Code
                          </label>
                          <input
                            type="text"
                            name="areaPostalCodes"
                            className="form-control"
                            placeholder="Postal Code"
                            value={consultant.areaPostalCodes}
                            onChange={handleOnChange}
                            onBlur={(e) =>
                              handleBlur("areaPostalCodes", e.target.value)
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
                          <label className="heading-color ff-heading fw700 mb10">
                            City / Commune
                          </label>
                          <input
                            type="text"
                            name="commune"
                            className="form-control"
                            placeholder="City"
                            value={consultant.commune}
                            onChange={handleOnChange}
                            onBlur={(e) =>
                              handleBlur("commune", e.target.value)
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
                            <>
                              <CantonSelect
                                label="Canton"
                                defaultSelect={consultant.canton}
                                data={cantonData}
                                handler={selectHandler}
                                name="canton"
                                isSearchable={true}
                              />
                              {validationErrors.canton && (
                                <div className="text-danger">
                                  {validationErrors.canton}
                                </div>
                              )}
                            </>
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
                            value={consultant.country}
                            onChange={handleOnChange}
                            onBlur={(e) =>
                              handleBlur("country", e.target.value)
                            }
                          />
                          {validationErrors.country && (
                            <div className="text-danger">
                              {validationErrors.country}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                  <h4 style={{ paddingTop: "60px", paddingBottom: "40px" }}>
                    Banking Info (for salary payment purposes)
                  </h4>
                </div>
                <BankingInfo
                  bankInfo={consultant.bankingInfo}
                  onChange={handleOnBankingChangeInfo}
                  lov={lov}
                  validationErrors={validationErrors}
                />
              </div>
            </div>
            <div className="col-lg-12 text-lg-end">
              <button className="btn-prm" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </FormProvider>

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Successfully Updated!"}
        message={"Your profile is updated successfully."}
        onclose={() => setSucModalVisible(false)}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={
          "Something went wrong. Quiting the form without saving mandatory fields will result in loss of data."
        }
        onclose={() => setFailModalVisible(false)}
      />
    </>
  );
}
