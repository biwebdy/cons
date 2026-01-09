"use client";

import { SearchList } from "@/components/element/SearchList";
import NumberInput from "@/components/forms/NumberInput";
import { useEffect, useState, useRef } from "react";
import SalarySimulation from "../element/SalarySimulation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function Preferences({
  preferences,
  onChange,
  lov,
  dob,
  withSalarySimulation = false,
  isAdmin = false,
}) {
  const [data] = useState(lov);
  const [viewSalarySimulation, setViewSalarySimulation] = useState(false);
  const [dateError, setDateError] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);

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

  const handleCheckedItems = (checkedItems, name) => {
    const checkedItemsValues = checkedItems.map((item) => item.value);
    onChange({ preferences: { ...preferences, [name]: checkedItemsValues } });
  };

  const calculateAge = () => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    onChange({ preferences: { ...preferences, [name]: value } });
  };

  const handleOnDateChange = (date) => {
    try {
      if (date === null || isNaN(new Date(date).getTime())) {
        onChange({ preferences: { ...preferences, [availableDate]: null } });
      } else {
        if (date.getFullYear() < 999 || date.getFullYear() > 9999) {
          return;
        }
        const selectedDate = new Date(date);
        if (selectedDate < new Date()) {
          setDateError("The available date must be later than today.");
          onChange({
            preferences: { ...preferences, availableDate: formattedDate },
          });
        } else {
          const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

          onChange({
            preferences: { ...preferences, availableDate: formattedDate },
          });
          setDateError("");
        }
      }
    } catch (error) {
      console.error("Invalid date input:", error);
    }
  };

  return (
    <>
      <div
        className={`ps-widget bdrs4  mb30 overflow-hidden position-relative ${
          !isAdmin ? "bgc-white" : ""
        }`}
      >
        <div className=" pb15 mb25"></div>
        <div className="row">
          <div className="col-lg-6">
            <h5 className="list-title fw700">
              My Skills <small>(Only 5 can be selected)</small>
            </h5>
            {data?.skills?.length > 0 && (
              <SearchList
                allItems={data?.skills}
                onCheckedItems={handleCheckedItems}
                name={"skills"}
                maxSelects={5}
                initialSelectedItems={preferences?.skills || []}
              />
            )}
          </div>
          <div className="col-lg-6">
            <h5 className="list-title fw700">Industries </h5>
            {data?.industries.length > 0 && (
              <SearchList
                allItems={data?.industries}
                showLoadMore={false}
                searchable={false}
                onCheckedItems={handleCheckedItems}
                name={"industries"}
                initialSelectedItems={preferences?.industries || []}
              />
            )}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <h5 className="list-title fw700">Preferred location of work </h5>
            {data?.cantons.length > 0 && (
              <SearchList
                allItems={data?.cantons}
                onCheckedItems={handleCheckedItems}
                name={"preferredLocationOfWork"}
                initialSelectedItems={
                  preferences?.preferredLocationOfWork || []
                }
              />
            )}
          </div>
          <div className="col-lg-6">
            <div className="mb20">
              <h5 className="list-title fw700">
                Availability Date - date you are availble to start
              </h5>
              <div className="position-relative" ref={calendarRef}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Select availability date"
                  value={preferences?.availableDate || ""}
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
                        preferences?.availableDate
                          ? new Date(preferences?.availableDate)
                          : null
                      }
                    />
                  </div>
                )}
              </div>
            </div>
            {dateError && <div className="text-danger">{dateError}</div>}
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-lg-6">
            <h5 className="list-title fw700">
              Employment quota - Number of days you&apos;re available to work
            </h5>

            <NumberInput
              name="daysAvailable"
              value={preferences?.daysAvailable || 0}
              onChange={handleOnChange}
              max={5}
            />
          </div>

          <div className="col-lg-6">
            <h5 className="list-title fw700">Number of Home Office days </h5>

            <NumberInput
              name="homeOfficePercentage"
              value={preferences?.homeOfficePercentage || 0}
              onChange={handleOnChange}
              max={5}
            />
          </div>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-6">
            <h5 className="list-title fw700">Desired hourly rate (CHF)</h5>
            <NumberInput
              name="rate"
              errorMin={80}
              value={preferences?.rate || 0}
              onChange={handleOnChange}
            />
          </div>
          {withSalarySimulation && (
            <div className="col-lg-6">
              {calculateAge() > 0 && preferences?.rate > 0 && (
                <button
                  className="btn-scn"
                  style={{ marginRight: "10px", marginTop: "20px" }}
                  onClick={() => setViewSalarySimulation(true)}
                >
                  View Salary Simulation
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <SalarySimulation
        isVisible={viewSalarySimulation}
        age={calculateAge()}
        rate={preferences?.rate}
        onclose={() => setViewSalarySimulation(false)}
      />
    </>
  );
}
