"use client";

import { SearchList } from "@/components/element/SearchList";
import NumberInput from "@/components/forms/NumberInput";
import { strapiLOV } from "@/data/loaders";
import { useEffect, useState, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
export default function Preferences(props) {
  const [data, setData] = useState(null);
  const { pref, children } = props;
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

  useEffect(() => {
    strapiLOV().then((data) => {
      setData(data);
    });
  }, []);

  const [preferences, setPreferences] = useState({
    skills: pref?.skills || [],
    rate: pref?.rate || 0,
    industries: pref?.industries || [],
    daysAvailable: pref?.daysAvailable || 0,
    availableDate: pref?.availableDate || null,
    homeOfficePercentage: pref?.homeOfficePercentage,
    preferredLocationOfWork: pref?.preferredLocationOfWork || [],
  });

  const handleCheckedItems = (checkedItems, name) => {
    const checkedItemsValues = checkedItems.map((item) => item.value);
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checkedItemsValues,
    }));
  };

  useEffect(() => {
    props?.onChange({ preferences: preferences });
  }, [preferences]);

  const [dateError, setDateError] = useState("");

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setPreferences({
      ...preferences,
      [name]: value,
    });
  };

  const handleOnDateChange = (date) => {
    try {
      if (date === null || isNaN(new Date(date).getTime())) {
        setPreferences({
          ...preferences,
          availableDate: null,
        });
      } else {
        if (date.getFullYear() < 999 || date.getFullYear() > 9999) {
          return;
        }
        const selectedDate = new Date(date);
        if (selectedDate < new Date()) {
          setDateError("The available date must be later than today.");
          setPreferences({
            ...preferences,
            availableDate: date,
          });
        } else {
          const formattedDate = `${date.getFullYear()}-${String(
            date.getMonth() + 1
          ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          setPreferences({
            ...preferences,
            availableDate: formattedDate,
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
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb25">
          <h4 className="list-title fw900">My Mandate Preferences </h4>
        </div>
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

          <div className="col-sm-6">
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
              {dateError && <div className="text-danger">{dateError}</div>}
            </div>
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
              value={preferences?.daysAvailable}
              onChange={handleOnChange}
              max={5}
            />
          </div>

          <div className="col-lg-6">
            <h5 className="list-title fw700">Number of Home Office days </h5>

            <NumberInput
              name="homeOfficePercentage"
              value={preferences?.homeOfficePercentage}
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
              value={preferences?.rate}
              onChange={handleOnChange}
            />
          </div>
          <div className="col-lg-6">{children}</div>
        </div>
      </div>
    </>
  );
}
