"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import { isRequired } from "@/utils/formValidators";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  calculateEmployerContributionPercent,
  calculateGrossHourlyRate,
  calculateTotalGrossHourlyRate,
} from "@/utils/salarySimulation";
export const isDateValidAndRequired = (startDate, endDate) => {
  const today = new Date().toISOString().split("T")[0];
  if (!startDate) {
    return {
      valid: false,
      message: "Start date is required and must be a valid date.",
      field: "startDate",
    };
  }
  if (!endDate) {
    return {
      valid: false,
      message: "End date is required and must be a valid date.",
      field: "endDate",
    };
  }
  if (startDate > endDate) {
    return {
      valid: false,
      message: "The end date should be later than the start date.",
      field: "endDate",
    };
  }
  return { valid: true, message: "" };
};

export default function ProposalModal({
  isVisible,
  onclose,
  client,
  onProposalSent,
  consultant,
}) {
  const [validationErrors, setValidationErrors] = useState({});
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);
  const startCalendarRef = useRef(null);
  const endCalendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        startCalendarRef.current &&
        !startCalendarRef.current.contains(event.target)
      ) {
        setShowStartCalendar(false);
      }
      if (
        endCalendarRef.current &&
        !endCalendarRef.current.contains(event.target)
      ) {
        setShowEndCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const calculateAge = () => {
    const dob = consultant?.dob;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const employerContributionPercent = calculateEmployerContributionPercent(
    calculateAge()
  );
  const totalGrossHourlyRate = calculateTotalGrossHourlyRate(
    consultant?.preferences?.rate -
      (consultant?.preferences?.rate * 0.03).toFixed(2),
    employerContributionPercent?.totalPercent
  );

  const grossHourlyRate = calculateGrossHourlyRate(totalGrossHourlyRate);

  const [proposalForm, setProposalForm] = useState({
    client: { id: client?.id },
    consultant: { id: consultant?.id },
    missionLocation: "",
    typeOfWork: "",
    startDate: "",
    endDate: "",
    details: "",
    baseSalary: grossHourlyRate,
    vacationAndPulicHolidayAllowance: (
      totalGrossHourlyRate - grossHourlyRate
    ).toFixed(2),
    totalHourlyWage: totalGrossHourlyRate,
    fees: Math.round(consultant?.preferences?.rate / 0.955),
  });

  const validateForm = () => {
    const startDateValidation = isDateValidAndRequired(
      proposalForm.startDate,
      proposalForm.endDate
    );
    const detailsValid = isRequired(proposalForm.details, "details");

    setValidationErrors((prev) => ({
      ...prev,
      [startDateValidation.field]: startDateValidation.message,
      details: detailsValid.valid ? "" : "Job Description is required",
    }));

    return startDateValidation.valid && detailsValid.valid;
  };

  const handleOnDateChange = (date, field) => {
    try {
      if (date === null || isNaN(new Date(date).getTime())) {
        setProposalForm({
          ...proposalForm,
          [field]: null,
        });
      } else {
        if (date.getFullYear() < 999 || date.getFullYear() > 9999) {
          return;
        }
        const formattedDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        setProposalForm({
          ...proposalForm,
          [field]: formattedDate,
        });
      }
    } catch (error) {
      console.error("Invalid date input:", error);
    }
  };

  const sendProposal = () => {
    if (validateForm()) {
      onProposalSent(proposalForm);
    }
  };

  return (
    <Modal isVisible={isVisible} onClose={onclose}>
      <div className="modal-dialog modal-dialog-centered">
        <div
          className="modal-content position-relative "
          style={{ paddingTop: "50px" }}
        >
          <div className="modal-body p-4">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Job Role</label>
                  <input
                    type="text"
                    className="form-control"
                    value={proposalForm?.typeOfWork}
                    onChange={(e) =>
                      setProposalForm({
                        ...proposalForm,
                        typeOfWork: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Mission Location</label>
                  <input
                    type="text"
                    className="form-control"
                    value={proposalForm?.missionLocation}
                    onChange={(e) =>
                      setProposalForm({
                        ...proposalForm,
                        missionLocation: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Start Date</label>
                  <div className="position-relative" ref={startCalendarRef}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select start date"
                      value={proposalForm?.startDate || ""}
                      readOnly
                      onClick={() => setShowStartCalendar(!showStartCalendar)}
                      style={{ cursor: "pointer" }}
                    />
                    {showStartCalendar && (
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
                            handleOnDateChange(date, "startDate");
                            setShowStartCalendar(false);
                          }}
                          value={
                            proposalForm?.startDate
                              ? new Date(proposalForm?.startDate)
                              : null
                          }
                        />
                      </div>
                    )}
                  </div>
                  {validationErrors.startDate && (
                    <div className="text-danger">
                      {validationErrors.startDate}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">End Date</label>
                  <div className="position-relative" ref={endCalendarRef}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Select end date"
                      value={proposalForm?.endDate || ""}
                      readOnly
                      onClick={() => setShowEndCalendar(!showEndCalendar)}
                      style={{ cursor: "pointer" }}
                    />
                    {showEndCalendar && (
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
                            handleOnDateChange(date, "endDate");
                            setShowEndCalendar(false);
                          }}
                          value={
                            proposalForm?.endDate
                              ? new Date(proposalForm?.endDate)
                              : null
                          }
                        />
                      </div>
                    )}
                  </div>
                  {validationErrors.endDate && (
                    <div className="text-danger">
                      {validationErrors.endDate}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="form-label">Job Description</label>
              <textarea
                name="text"
                cols={30}
                rows={5}
                placeholder="Additional Details for the proposal"
                value={proposalForm?.details}
                className={`form-control ${
                  validationErrors.details ? "border-danger" : ""
                }`}
                style={{
                  minHeight: "110px",
                  marginBottom: "20px",
                }}
                onChange={(e) => {
                  const MAX_WORDS = 250;
                  const { name, value } = e.target;
                  const wordCount = value.trim().split(/\s+/).length;
                  if (wordCount > MAX_WORDS) {
                    return;
                  } else {
                    setProposalForm({
                      ...proposalForm,
                      details: e.target.value,
                    });
                    // Clear error when user starts typing
                    if (validationErrors.details) {
                      setValidationErrors((prev) => ({
                        ...prev,
                        details: "",
                      }));
                    }
                  }
                }}
              />
            </div>
            {validationErrors.details && (
              <div className="text-danger mt-1">{validationErrors.details}</div>
            )}
            <button type="button" className="btn-prm" onClick={sendProposal}>
              Send Proposal
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
