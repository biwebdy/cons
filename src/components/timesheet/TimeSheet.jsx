"use client";
import React, { useState, useEffect, useRef, use } from "react";
import Table from "react-bootstrap/Table";
import SelectInput from "../dashboard/option/SelectInput";
import {
  getTimesheet,
  submitTimesheet,
  updateTimesheet,
} from "@/data/projects";
import {
  convertDateToSubmit,
  getAllDaysInMonth,
  getMonthName,
  monthsList,
  yearsList,
} from "./timesheetHelper";
import SuccessModal from "../modals/SuccessModal";
import FailModal from "../modals/FailModal";
import CompleteProjectModal from "./CompleteProjectModal";
import ConfirmModal from "../modals/ConfrimModal";
import UploadAttachment from "../consultant/UploadAttachement";
import { handleImgResponse } from "@/utils/utility";

const Timesheet = ({ ISCONS, ISADMIN, projectId, pStatus }) => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const currentMonthIndex = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const [rows, setRows] = useState(getAllDaysInMonth(month, year));
  const [prevMonthRows, setPrevMonthRows] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [sucModalVisible, setSucModalVisible] = useState(false);
  const [sucTitle, setSucTitle] = useState("Successfully Submitted!");
  const [sucMessage, setSucMessage] = useState(
    "Your timesheet has been submitted successfully."
  );
  const [deletedTimesheet, setDeletedTimesheet] = useState(false);
  const [failModalVisible, setFailModalVisible] = useState(false);
  const [completeProjectModalVisible, setCompleteProjectModalVisible] =
    useState(false);
  const [approvalStatus, setApprovalStatus] = useState("");
  const [isReadOnlyTimesheet, setIsReadOnlyTimesheet] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [timesheetFile, setTimesheetFile] = useState(null);
  const isReadOnly = (approval, submited) => {
    if (approval === "Rejected" && ISCONS) return false;
    return !ISCONS || submited;
  };

  const [monthlyOvertimeTotal, setMonthlyOvertimeTotal] = useState(0);
  const [calculateOvertimeTotalFlag, setCalculateOvertimeTotalFlag] =
    useState(false);

  const getData = async () => {
    const resp = await getTimesheet(
      getMonthName(month),
      year,
      projectId,
      ISCONS
    );

    setApprovalStatus(resp?.data[0]?.approvalStatus);
    const daysInMonth = getAllDaysInMonth(month, year);

    if (resp?.data[0]?.id) {
      setSelectedId(resp.data[0].id);
    } else {
      setSelectedId(null);
    }

    setTimesheetFile(resp?.data[0]?.timesheetFile || null);

    setIsReadOnlyTimesheet(
      isReadOnly(
        resp.data[0]?.approvalStatus || false,
        resp.data[0]?.isSubmitted || false
      )
    );

    if (resp?.data[0]?.workingDays) {
      const workingDays = resp.data[0].workingDays;

      const updatedRows = daysInMonth.map((day) => {
        const matchingDay = workingDays.find((wd) => {
          const wdDate = new Date(wd.day);
          const dayDate = new Date(day.day);
          return (
            wdDate.getDate() === dayDate.getDate() &&
            wdDate.getMonth() === dayDate.getMonth() &&
            wdDate.getFullYear() === dayDate.getFullYear()
          );
        });

        return matchingDay
          ? {
              ...day,
              numberOfHoursWorked: matchingDay.numberOfHoursWorked || "",
              expense: matchingDay.expense || "",
              overtime:
                matchingDay.overtime || matchingDay.numberOfHoursWorked > 12
                  ? matchingDay.numberOfHoursWorked - 12
                  : "",
              isWeeklytotal: false,
            }
          : day;
      });

      setRows(updatedRows);
    } else {
      setRows(daysInMonth);
    }
  };

  const getPrevMonthRows = async (month, year) => {
    const resp = await getTimesheet(
      getMonthName(month),
      year,
      projectId,
      ISCONS
    );
    const daysInMonth = getAllDaysInMonth(month, year);

    if (resp?.data[0]?.workingDays) {
      const workingDays = resp.data[0].workingDays;
      const updatedRows = daysInMonth.map((day) => {
        const matchingDay = workingDays.find((wd) => {
          const wdDate = new Date(wd.day);
          const dayDate = new Date(day.day);
          return (
            wdDate.getDate() === dayDate.getDate() &&
            wdDate.getMonth() === dayDate.getMonth() &&
            wdDate.getFullYear() === dayDate.getFullYear()
          );
        });

        return matchingDay
          ? {
              ...day,
              numberOfHoursWorked: matchingDay.numberOfHoursWorked || "",
              expense: matchingDay.expense || "",
              isReadOnly: true,
              overtime:
                matchingDay.overtime || matchingDay.numberOfHoursWorked > 12
                  ? matchingDay.numberOfHoursWorked - 12
                  : "",
            }
          : day;
      });
      setPrevMonthRows(updatedRows);
    } else {
      setPrevMonthRows(daysInMonth);
    }
  };

  useEffect(() => {
    getData();
    const prevmnth = month === 1 ? 12 : month - 1;
    const prevYear = month === 1 ? year - 1 : year;
    getPrevMonthRows(prevmnth, prevYear);
  }, [month, year]);

  useEffect(() => {
    if (prevMonthRows.length === 0) return;
    const newRows = [...rows];

    newRows.forEach((row, index) => {
      if (row.isWeeklytotal) {
        row.overtime = calculateWeeklyOvertimeTotal(
          rows[index - 1]?.day,
          index
        );
      }
    });
    setRows(newRows);
  }, [prevMonthRows]);

  const handleInputChange = (index, field, value) => {
    if (value < 0) return;
    const newRows = [...rows];
    if (field === "numberOfHoursWorked") {
      if (value > 12) {
        newRows[index]["overtime"] = value - 12;
      } else {
        newRows[index]["overtime"] = 0;
      }
      newRows[index][field] = value;
      newRows.forEach((row, index) => {
        if (row.isWeeklytotal) {
          row.overtime = calculateWeeklyOvertimeTotal(
            rows[index - 1]?.day,
            index
          );
        }
      });
    } else {
      newRows[index][field] = value;
    }

    setRows(newRows);
  };

  const calculateWeeklynumberOfHoursWorkedTotal = (endWeekdate) => {
    const startOfWeek = new Date(endWeekdate);
    const endOfWeek = new Date(endWeekdate);
    startOfWeek.setDate(startOfWeek.getDate() - 6);

    const weekRows = rows.filter((row) => {
      const rowDate = new Date(row.day);
      return rowDate >= startOfWeek && rowDate <= endOfWeek;
    });
    return weekRows.reduce(
      (total, row) => total + (Number(row.numberOfHoursWorked) || 0),
      0
    );
  };

  const calculateWeeklyExpenseTotal = (endWeekdate) => {
    const startOfWeek = new Date(endWeekdate);
    const endOfWeek = new Date(endWeekdate);
    startOfWeek.setDate(endOfWeek.getDate() - 6);

    const weekRows = rows.filter((row) => {
      const rowDate = new Date(row.day);
      return rowDate >= startOfWeek && rowDate <= endOfWeek;
    });

    return weekRows.reduce(
      (total, row) => total + (Number(row.expense) || 0),
      0
    );
  };

  const calculateWeeklyOvertimeTotal = (endWeekdate, index) => {
    const startOfWeek = new Date(endWeekdate);
    const endOfWeek = new Date(endWeekdate);
    startOfWeek.setDate(startOfWeek.getDate() - 6);

    const weekRows = rows.filter((row) => {
      const rowDate = new Date(row.day);
      return rowDate >= startOfWeek && rowDate <= endOfWeek;
    });

    let total = 0;
    let totalWorkedHours = 0;

    if (weekRows.length < 7) {
      const lastMonday = new Date(endWeekdate);
      lastMonday.setDate(lastMonday.getDate() - (7 - weekRows.length));
      const prevWeekRows = prevMonthRows?.filter((row) => {
        const rowDate = new Date(row.day);
        return rowDate >= lastMonday;
      });
      total = [...prevWeekRows, ...weekRows].reduce(
        (total, row) => total + (Number(row.overtime) || 0),
        0
      );
      totalWorkedHours = [...prevWeekRows, ...weekRows].reduce(
        (total, row) => total + (Number(row.numberOfHoursWorked) || 0),
        0
      );
    } else {
      total = weekRows.reduce(
        (total, row) => total + (Number(row.overtime) || 0),
        0
      );
      totalWorkedHours = weekRows.reduce(
        (total, row) => total + (Number(row.numberOfHoursWorked) || 0),
        0
      );
    }

    if (totalWorkedHours > 45) {
      const wkovertime = totalWorkedHours - 45;
      if (wkovertime > total) {
        return wkovertime;
      }
    }
    setCalculateOvertimeTotalFlag(!calculateOvertimeTotalFlag);
    return total;
  };

  useEffect(() => {
    const totalWeeklyOvertime = rows.reduce(
      (total, row) =>
        total + (row?.isWeeklytotal ? Number(row.overtime) : 0 || 0),
      0
    );
    setMonthlyOvertimeTotal(Number(totalWeeklyOvertime) || 0);
  }, [calculateOvertimeTotalFlag]);

  const handleSave = async (isSubmit = false) => {
    setConfirmModalVisible(false);
    const savedRows = rows
      .filter((row) => row.numberOfHoursWorked || row.expense)
      .map((row) => ({
        numberOfHoursWorked: parseFloat(row.numberOfHoursWorked),
        expense: parseFloat(row.expense) || 0,
        day: convertDateToSubmit(row.day),
        overtime: parseFloat(row.overtime) || 0,
      }));

    const successMessage = isSubmit
      ? "Your timesheet has been submitted successfully."
      : "Your timesheet has been saved successfully.";
    const successTitle = isSubmit
      ? "Successfully Submitted!"
      : "Successfully Saved!";
    setSucTitle(successTitle);
    setSucMessage(successMessage);

    const aprvl = isSubmit ? "AwaitingApproval" : approvalStatus;

    const formData = new FormData();
    const payload = {
      timesheetID: selectedId,
      year: year,
      month: getMonthName(month),
      project: { id: projectId },
      workingDays: savedRows,
      approvalStatus: aprvl,
      isSubmitted: isSubmit,
      deletedTimesheet: deletedTimesheet,
    };
    formData.append("data", JSON.stringify(payload));

    if (timesheetFile) {
      formData.append("timesheetFile", timesheetFile);
    }

    const resp = await submitTimesheet(formData);

    if (Object.keys(resp?.data).length > 0) {
      getData();
      const prevmnth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      getPrevMonthRows(prevmnth, prevYear);
      setSucModalVisible(true);
    } else {
      setFailModalVisible(true);
    }
  };

  const handleSubmitTimeSheet = async () => {
    setConfirmModalVisible(true);
  };

  const selectHandler = (name, value) => {
    name === "month" ? setMonth(value) : setYear(value);
  };

  const handleCloseSuccessModal = () => {
    setSucModalVisible(false);
  };

  const handleApprove = async () => {
    setSucTitle("Successfully Approved!");
    setSucMessage("The timesheet has been approved successfully.");
    const resp = await updateTimesheet(selectedId, {
      timesheetID: selectedId,
      project: { id: projectId },
      approvalStatus: "Approved",
    });

    if (Object.keys(resp?.data).length > 0) {
      setSucModalVisible(true);
      window?.location?.reload();
    } else {
      setFailModalVisible(true);
    }
  };

  const handleReject = async () => {
    setSucTitle("Successfully Rejected!");
    setSucMessage("The timesheet has been rejected successfully.");
    const resp = await updateTimesheet(selectedId, {
      timesheetID: selectedId,
      project: { id: projectId },
      approvalStatus: "Rejected",
      isSubmitted: false,
    });

    if (Object.keys(resp?.data).length > 0) {
      setSucModalVisible(true);
      setTimeout(() => {
        window?.location?.reload();
      }, 2000);
    } else {
      setFailModalVisible(true);
    }
  };

  const handleWheel = (e) => {
    e.target.blur();
  };

  // Optional: Prevent up/down arrow keys
  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
  };
  const handleChangeTimesheetFile = (files) => {
    if (files && files.attachment[0] instanceof File) {
      setTimesheetFile(files.attachment[0]);
    }
  };

  function camelCaseToReadable(text) {
    const result = text?.replace(/([A-Z])/g, " $1")?.trim();
    return result?.charAt(0)?.toUpperCase() + result?.slice(1);
  }

  const rounder = (num) => {
    return Math.round(num * 100) / 100 || 0;
  };

  return (
    <>
      <div className="tailwind px-8 py-6">
        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-[#02153d] mb-4">
            Timesheet
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <SelectInput
                label="Month"
                defaultSelect={monthsList[currentMonthIndex].option}
                data={monthsList}
                name="month"
                handler={selectHandler}
              />
            </div>
            <div>
              <SelectInput
                label="Year"
                defaultSelect={currentYear}
                data={yearsList}
                name="year"
                handler={selectHandler}
              />
            </div>
            <div className="flex items-center">
              <svg
                className="w-5 h-5 text-[#02153d] mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                {camelCaseToReadable(approvalStatus) || "Not Submitted"}
              </span>
            </div>
            {!ISCONS && pStatus === "Ongoing" && (
              <div className="flex justify-end">
                <button
                  className="btn-danger"
                  onClick={() => setCompleteProjectModalVisible(true)}
                >
                  Terminate Project
                </button>
              </div>
            )}
          </div>
        </div>

        {approvalStatus === "Rejected" && ISCONS && (
          <h5 className="text-red-600 mb-4">
            Please notice that the client rejected this timesheet.
          </h5>
        )}

        <div className="overflow-x-auto shadow-md rounded-lg mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#ede5e1] text-[#02153d]">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Date
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Number of Hours Worked
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Expense (CHF)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Ovetime
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  {row.isWeeklytotal ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2 font-bold bg-[#ede5e1]">
                        {row.day}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-[#ede5e1]">
                        {rounder(
                          calculateWeeklynumberOfHoursWorkedTotal(
                            rows[index - 1]?.day
                          )
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-[#ede5e1]">
                        {rounder(
                          calculateWeeklyExpenseTotal(rows[index - 1]?.day)
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 bg-[#ede5e1]">
                        {rounder(row.overtime)}
                      </td>
                    </>
                  ) : (
                    <>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          isReadOnlyTimesheet ? "bg-gray-100" : ""
                        }`}
                      >
                        {row.day}
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          isReadOnlyTimesheet ? "bg-gray-100" : ""
                        }`}
                      >
                        <input
                          type="number"
                          value={row.numberOfHoursWorked}
                          onWheel={handleWheel}
                          onKeyDown={handleKeyDown}
                          className={`w-full border-none ${
                            isReadOnlyTimesheet
                              ? "bg-gray-100 cursor-default"
                              : ""
                          }`}
                          readOnly={isReadOnlyTimesheet}
                          onChange={(e) =>
                            handleInputChange(
                              index,
                              "numberOfHoursWorked",
                              e.target.value
                            )
                          }
                        />
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          isReadOnlyTimesheet ? "bg-gray-100" : ""
                        }`}
                      >
                        <input
                          type="number"
                          value={row.expense}
                          className={`w-[90%] border-none ${
                            isReadOnlyTimesheet
                              ? "bg-gray-100 cursor-default"
                              : ""
                          }`}
                          readOnly={isReadOnlyTimesheet}
                          onChange={(e) =>
                            handleInputChange(index, "expense", e.target.value)
                          }
                        />
                      </td>
                      <td
                        className={`border border-gray-300 px-4 py-2 ${
                          isReadOnlyTimesheet ? "bg-gray-100" : ""
                        }`}
                      >
                        {rounder(row.overtime)}
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr>
                <td className="border border-gray-300 px-4 py-2 font-bold bg-[#ede5e1]">
                  <b>Total</b>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold bg-[#ede5e1]">
                  <b>
                    {rounder(
                      rows.reduce(
                        (total, row) => total + Number(row.numberOfHoursWorked),
                        0
                      )
                    )}
                  </b>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold bg-[#ede5e1]">
                  <b>
                    {rows.reduce(
                      (total, row) => total + Number(row.expense),
                      0
                    )}{" "}
                    CHF
                  </b>
                </td>
                <td className="border border-gray-300 px-4 py-2 font-bold bg-[#ede5e1]">
                  {rounder(monthlyOvertimeTotal)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {ISCONS && !isReadOnlyTimesheet ? (
          <UploadAttachment
            attachment={timesheetFile}
            onChange={handleChangeTimesheetFile}
            isMultiple={false}
            onDelete={() => setDeletedTimesheet(true)}
          />
        ) : (
          <>
            {timesheetFile?.url && (
              <div className="mb-12">
                <a
                  target="_blank"
                  href={handleImgResponse(timesheetFile)}
                  className="flex items-center text-[#1f4b3f] hover:underline"
                >
                  <span className="text-3xl mr-2">
                    <i className="flaticon-contract text-[#1f4b3f]" />
                  </span>
                  Click to View Timesheet File
                </a>
              </div>
            )}
          </>
        )}

        {!ISADMIN && pStatus != "Finished" && (
          <div className="py-5">
            <div className="flex justify-end">
              {ISCONS &&
                approvalStatus != "AwaitingApproval" &&
                approvalStatus != "Approved" && (
                  <>
                    <button
                      className="btn-scn mr-4"
                      onClick={() => handleSave(false)}
                      disabled={isReadOnlyTimesheet}
                    >
                      Save
                    </button>
                    <button
                      className="btn-prm "
                      onClick={handleSubmitTimeSheet}
                      disabled={isReadOnlyTimesheet}
                    >
                      Submit
                    </button>
                  </>
                )}
              {!ISCONS && approvalStatus === "AwaitingApproval" && (
                <>
                  <button
                    className="btn-danger mr-4"
                    onClick={handleReject}
                    disabled={
                      approvalStatus === "Rejected" ||
                      approvalStatus === "Approved"
                    }
                  >
                    Reject
                  </button>
                  <button
                    className="btn-prm"
                    onClick={handleApprove}
                    disabled={
                      approvalStatus === "Rejected" ||
                      approvalStatus === "Approved"
                    }
                  >
                    Approve
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <SuccessModal
        isVisible={sucModalVisible}
        title={sucTitle}
        message={sucMessage}
        onclose={handleCloseSuccessModal}
      />

      <ConfirmModal
        isVisible={confirmModalVisible}
        title={"Are you sure you want to submit the timesheet?"}
        message={
          "Once the timesheet is submited you can't change it unless the client rejects it."
        }
        buttonTitle={"Submit Timesheet"}
        btnType={"prm"}
        onclose={() => setConfirmModalVisible(false)}
        onConfirm={() => handleSave(true)}
      />

      <FailModal
        isVisible={failModalVisible}
        title={"Something Went Wrong!"}
        message={"Something went wrong. Please try again."}
        onclose={() => setFailModalVisible(false)}
      />

      <CompleteProjectModal
        isVisible={completeProjectModalVisible}
        onclose={() => setCompleteProjectModalVisible(false)}
        projectId={projectId}
      />
    </>
  );
};

export default Timesheet;
