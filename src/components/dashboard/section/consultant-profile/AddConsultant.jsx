"use client";
import SalarySimulation from "@/components/element/SalarySimulation";
import { postData } from "@/data/consultants";
import { FormProvider, useFormContext } from "@/utils/formContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ConsultantPersonalInfo from "./ConsultantPersonalInfo";

import Preferences from "./Preferences";
import UploadAttachment from "./UploadAttachements";
import BankingInfo from "./BankingInfo";
import FailModal from "@/components/modals/FailModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { removeIdField } from "@/lib/utils";
import RateModal from "@/components/modals/RateModal";

export default function AddConsultant(props) {
  const router = useRouter();
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const { isRegister, lov } = props;
  const [profilePicture, setProfilePicture] = useState(null);
  const [consultant, setConsultant] = useState({
    id: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    about: "",
    resume: [],
    profilePicture: "",
    country: "",
    number: "",
    street: "",
    commune: "",
    canton: "",
    areaPostalCodes: "",
    civilStatus: "",
    residencyPermit: "",
    bankingInfo: {},
    languages: [],
    education: [],
    preferences: {},
  });

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

  const handleOnChangeInfo = (e) => {
    if (e.profilePicture && e.profilePicture instanceof File) {
      setProfilePicture(e.profilePicture);
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
    setConsultant({
      ...consultant,
      resume: files.attachment,
    });
  };

  const handlePostData = async (data) => {
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
    if (consultant.resume && consultant.resume.length > 0) {
      consultant.resume.forEach((file, index) => {
        formData.append(`resume`, file);
      });
    }

    const response = await postData(formData);

    if (response?.data?.consultant?.id) {
      setConsultant({ ...consultant, id: response?.data?.consultant?.id });
      setSucModalVisible(true);
    } else {
      setFailModalVisible(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
    if (isRegister) {
      router.push("/login");
    } else {
      router.push("/secure/consultant-profile/" + consultant.id);
    }
  };

  const calculateAge = () => {
    const dob = consultant.dob;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = (event) => {
    handlePostData(consultant);
  };
  const [viewSalarySimulation, setViewSalarySimulation] = useState(false);

  return (
    <>
      <FormProvider>
        <ConsultantPersonalInfo
          consultant={consultant}
          onChange={handleOnChangeInfo}
        />

        <UploadAttachment
          attachment={consultant?.resume}
          onChange={handleChangeResume}
        />
        <div style={{ marginTop: "30px" }}>
          <BankingInfo
            bankInfo={consultant?.bankingInfo}
            onChange={handleOnChangeInfo}
          />
        </div>

        <Preferences
          pref={consultant?.preferences}
          onChange={handleOnChangeInfo}
        >
          {calculateAge() > 0 && consultant?.preferences?.rate > 0 && (
            <button
              className="btn-scn"
              style={{ marginRight: "10px", marginTop: "20px" }}
              onClick={() => setViewSalarySimulation(true)}
            >
              View Salary Simulation
            </button>
          )}
        </Preferences>

        <FormSubmitButton
          onSubmit={handleSubmit}
          rate={consultant?.preferences?.rate}
        />
      </FormProvider>

      <SuccessModal
        isVisible={sucModalVisible}
        title={"Successfully Added!"}
        message={
          "We will send you the new credentials. Keep an eye on your email."
        }
        onclose={handleCloseSuccessModal}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={
          "Something went wrong. Quiting the form without saving mandatory fields will result in loss of data."
        }
        onclose={() => setFailModalVisible(false)}
      />

      <SalarySimulation
        isVisible={viewSalarySimulation}
        age={calculateAge()}
        rate={consultant?.preferences?.rate}
        onclose={() => setViewSalarySimulation(false)}
      />
    </>
  );
}

const FormSubmitButton = (props) => {
  const { validateAll } = useFormContext();
  const { onSubmit, rate } = props;
  const [ratePopupVisible, setRatePopupVisible] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (rate > 0 && rate < 80) {
      setRatePopupVisible(true);
    } else {
      if (validateAll()) {
        onSubmit();
      }
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
