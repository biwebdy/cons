"use client";

import { updateData } from "@/data/consultants";
import { removeIdField } from "@/lib/utils";
import { handleImgResponse } from "@/utils/utility";
import { CopyIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FailModal from "../modals/FailModal";
import RateModal from "../modals/RateModal";
import SuccessModal from "../modals/SuccessModal";
import ConsultantPersonalInfo from "./ConsultantPersonalInfo";
import Preferences from "./Preferences";
import UploadAttachment from "./UploadAttachement";

export default function EditConsultant(props) {
  const router = useRouter();
  const { cons, lov, isAdmin = false } = props;
  const isEmptyObject = (obj) =>
    obj && Object.keys(obj)?.length === 0 && obj.constructor === Object;
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [missingFields, setMissingFields] = useState(cons?.missingFields || []);
  const [profilePicture, setProfilePicture] = useState(null);
  const [resume, setResume] = useState(null);
  const [consultant, setConsultant] = useState({
    consultant_id: cons?.consultant_id || "",
    id: cons?.id || "",
    firstName: cons?.firstName || "",
    lastName: cons?.lastName || "",
    gender: cons?.gender || "",
    dob: cons?.dob || "",
    email: cons?.email || "",
    phoneNumber: cons?.phoneNumber || "",
    nationality: cons?.nationality || "",
    about: cons?.about || "",
    resume: isEmptyObject(cons?.resume) ? [] : cons?.resume,
    profilePicture: cons?.profilePicture || "",
    country: cons?.country || "",
    number: cons?.number || "",
    street: cons?.street || "",
    commune: cons?.commune || "",
    canton: cons?.canton || {},
    areaPostalCodes: cons?.areaPostalCodes || "",
    civilStatus: cons?.civilStatus || "",
    residencyPermit: cons?.residencyPermit || "",
    seniorityLevel: cons?.seniorityLevel || 1,
    preferences: cons?.preferences || {
      skills: [],
      industries: [],
      preferredLocationOfWork: [],
      availableDate: null,
      daysAvailable: 0,
      homeOfficePercentage: 0,
      rate: 0,
    },
  });
  const tab = ["Personal Information", "Mandate Preferences"];
  const [selectedTab, setSelectedTab] = useState(1);
  function camelCaseToReadable(text) {
    text === "number" ? (text = "doorNumber") : text;
    text === "about" ? (text = "executiveSummary") : text;
    text === "homeOfficePercentage"
      ? (text = "Number of home office days")
      : text;
    const result = text.replace(/([A-Z])/g, " $1").trim();
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

  const handleOnChangeInfo = (e) => {
    if (e?.profilePicture && e?.profilePicture instanceof File) {
      setProfilePicture(e?.profilePicture);
    }

    setConsultant((prevConsultant) => {
      const newConsultant = { ...prevConsultant };

      if (e.preferences) {
        newConsultant.preferences = {
          ...newConsultant.preferences,
          ...e.preferences,
        };
      } else if (e.bankingInfo) {
        newConsultant.bankingInfo = {
          ...newConsultant.bankingInfo,
          ...e.bankingInfo,
        };
      } else if (e.languages) {
        newConsultant.languages = e.languages;
      } else if (e.experience) {
        newConsultant.experience = e.experience;
      } else {
        Object.keys(e).forEach((key) => {
          if (Array.isArray(e[key])) {
            newConsultant[key] = e[key];
          } else if (typeof e[key] === "object" && e[key] !== null) {
            newConsultant[key] = {
              ...newConsultant[key],
              ...e[key],
            };
          } else {
            newConsultant[key] = e[key];
          }
        });
      }

      return newConsultant;
    });
  };

  const handleChangeResume = (files) => {
    if (files && files.attachment[0] instanceof File) {
      setResume(files.attachment[0]);
    }
  };

  const handleUpdateData = async (data) => {
    const consultantData = JSON.parse(JSON.stringify(data));

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
    const formData = new FormData();
    formData.append("email", data.email);

    if (data.dob === undefined || data.dob === "") {
      data.dob = null;
    }

    if (
      data.preferences.availableDate === undefined ||
      data.preferences.availableDate === ""
    ) {
      data.availableDate = null;
    }

    delete consultantData.profilePicture;
    delete consultantData.resume;
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
    if (profilePicture && profilePicture instanceof File) {
      formData.append("profilePicture", profilePicture);
    }

    if (resume && resume instanceof File) {
      formData.append("resume", resume);
    }
    const response = await updateData(formData, data.id);
    if (response && response?.data?.consultant?.id) {
      setSucModalVisible(true);
      setMissingFields(response?.data?.consultant?.missingFields);
    } else {
      setFailModalVisible(true);
    }
  };
  const mapProfileData = (profileData, lov) => {
    const findValueByName = (array, name) => {
      const item = array.find((item) => item.title === name);
      return item ? item.value : null;
    };

    const isAlreadyMapped = (arr) =>
      Array.isArray(arr) && arr.every((item) => typeof item === "number");

    const mappedData = JSON.parse(JSON.stringify(profileData));

    if (mappedData.preferences) {
      if (Array.isArray(mappedData.preferences.industries)) {
        if (!isAlreadyMapped(mappedData.preferences.industries)) {
          mappedData.preferences.industries = mappedData.preferences.industries
            .map((industry) => findValueByName(lov.industries, industry.name))
            .filter(Boolean);
        }
      }

      if (Array.isArray(mappedData.preferences.preferredLocationOfWork)) {
        if (!isAlreadyMapped(mappedData.preferences.preferredLocationOfWork)) {
          mappedData.preferences.preferredLocationOfWork =
            mappedData.preferences.preferredLocationOfWork
              .map((location) => findValueByName(lov.cantons, location.name))
              .filter(Boolean);
        }
      }

      if (Array.isArray(mappedData.preferences.skills)) {
        if (!isAlreadyMapped(mappedData.preferences.skills)) {
          mappedData.preferences.skills = mappedData.preferences.skills
            .map((skill) => findValueByName(lov.skills, skill.name))
            .filter(Boolean);
        }
      }
    }

    return mappedData;
  };

  return (
    <>
      <div style={{ padding: "60px" }}>
        <div className="form-style1">
          <div className="row">
            {!isAdmin && <div className="col-xl-1"></div>}

            <div className="col-xl-10">
              <div className="d-flex align-items-center my-3">
                <h4>Consultant ID: {consultant?.consultant_id}</h4>{" "}
                <a
                  className="copy-delt text-thm2"
                  onClick={() => {
                    navigator?.clipboard?.writeText(consultant?.consultant_id);
                  }}
                >
                  <CopyIcon size={24} style={{ color: "#fff" }} />
                </a>
              </div>

              {isAdmin && (
                <>
                  {cons?.frameworkContract?.length > 0 &&
                    cons?.frameworkContract[0]?.url && (
                      <div className="vam">
                        <h5 className="mb-0">
                          <a
                            target="_blank"
                            href={handleImgResponse(cons?.frameworkContract[0])}
                            style={{ color: "#1f4b3f" }}
                          >
                            {" "}
                            <i
                              className="flaticon-contract text-thm2 pe-2 vam"
                              style={{ fontSize: "35px" }}
                            />{" "}
                            Click to View Framework Contract{" "}
                          </a>
                        </h5>
                      </div>
                    )}
                  <div className="vam">
                    <h5 className="mb-0">
                      <div className="py-3">
                        <span>Seniority Level:</span>
                        <br />
                        <div className="d-flex gap-2 my-2">
                          {[...Array(10)].map((_, i) => (
                            <div key={i + 1} className="form-check">
                              <input
                                type="radio"
                                className="form-check-input cursor-pointer"
                                id={`seniority-${i + 1}`}
                                name="seniorityLevel"
                                value={i + 1}
                                checked={
                                  Number(consultant?.seniorityLevel || 1) ===
                                  i + 1
                                }
                                onChange={(e) =>
                                  handleOnChangeInfo({
                                    seniorityLevel: e.target.value,
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor={`seniority-${i + 1}`}
                              >
                                {i + 1}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </h5>
                  </div>
                </>
              )}

              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {tab.map((item, i) => (
                      <button
                        key={i}
                        className={`nav-link fw500  ${selectedTab == i ? "active" : ""
                          }`}
                        onClick={() => setSelectedTab(i)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </nav>
                {selectedTab === 0 && (
                  <>
                    <ConsultantPersonalInfo
                      consultant={consultant}
                      onChange={handleOnChangeInfo}
                      profilePicture={profilePicture}
                      lov={lov}
                      isAdmin={isAdmin}
                    />
                    <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>
                      Resume
                    </h4>
                    <UploadAttachment
                      attachment={consultant?.resume}
                      onChange={handleChangeResume}
                      isMultiple={false}
                    />
                  </>
                )}

                {selectedTab === 1 && (
                  <>
                    {missingFields?.components?.includes("preferences") &&
                      missingFields?.details?.preferences?.length > 0 && (
                        <div className="col-12 col-lg-6">
                          <div
                            className="grey-bg"
                            style={{
                              border: "1px dotted #ccc",
                              padding: "20px",
                              borderRadius: "10px",
                              marginTop: "20px",
                              marginBottom: "20px",
                            }}
                          >
                            <div>
                              Please fill all missing information in the
                              Preferences tab:{" "}
                              <p>
                                {missingFields?.details?.preferences?.map(
                                  (item, i) => (
                                    <span
                                      key={i}
                                      style={{ fontWeight: "bold" }}
                                    >
                                      {camelCaseToReadable(item)}
                                      {i <
                                        missingFields?.details?.preferences
                                          ?.length -
                                        1
                                        ? ", "
                                        : ""}
                                    </span>
                                  )
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}{" "}
                    <Preferences
                      preferences={consultant?.preferences}
                      dob={consultant?.dob}
                      onChange={handleOnChangeInfo}
                      lov={lov}
                      withSalarySimulation={true}
                      isAdmin={isAdmin}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          <FormSubmitButton
            onSubmit={() => handleUpdateData(consultant)}
            rate={consultant?.preferences?.rate}
          />
        </div>
      </div>

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Successfully Updated!"}
        message={"Your profile is updated successfully."}
        onclose={() => {
          setSucModalVisible(false);
          if (isAdmin) {
            router.replace("/secure/consultant-profile/" + consultant.id);
          }
        }
        }
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

const FormSubmitButton = (props) => {
  const { onSubmit, rate } = props;
  const [ratePopupVisible, setRatePopupVisible] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (rate > 0 && rate < 80) {
      setRatePopupVisible(true);
    } else {
      onSubmit();
    }
  };

  return (
    <>
      <div className="col-lg-12 text-lg-end">
        <button className="btn-prm" onClick={handleSubmit}>
          Save
        </button>
      </div>

      <RateModal
        isVisible={ratePopupVisible}
        onclose={() => setRatePopupVisible(false)}
      />
    </>
  );
};
