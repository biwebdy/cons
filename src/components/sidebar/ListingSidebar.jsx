"use client";
import { useEffect, useState } from "react";
import { SearchList } from "../element/SearchList";
import NumberInput from "../forms/NumberInput";

export default function ListingSidebar(props) {
  const { onChange, onFilter, data, initialView, noContent } = props;
  const [preferences, setPreferences] = useState({
    skills: [],
    industries: [],
    daysAvailable: null,
    availableDate: "",
    rate: "",
    seniorityLevel: [],
  });

  const [openSections, setOpenSections] = useState({
    seniorityLevel: false,
    skills: false,
    locations: false,
    industries: false,
    rate: false,
    daysAvailable: false,
    availableDate: false,
  });

  const [immediatlyAvailable, setImmediatlyAvailable] = useState(false);

  const handleCheckedItems = (checkedItems, name) => {
    if (name === "seniorityLevel") {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [name]: checkedItems.map((item) => item.value),
      }));
    } else {
      const checkedItemsValues = checkedItems.map((item) => item.value);
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        [name]: checkedItemsValues,
      }));
    }
  };

  useEffect(() => {
    if (immediatlyAvailable) {
      setPreferences({
        ...preferences,
        availableDate: new Date().toISOString().split("T")[0],
      });
    } else {
      setPreferences((prevPreferences) => ({
        ...prevPreferences,
        availableDate: "",
      }));
    }
  }, [immediatlyAvailable]);

  useEffect(() => {
    onChange({ preferences: preferences });
  }, [preferences]);

  const handleOnChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.value,
    });
  };

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="w-full relative pb-12">
      {/* Desktop Sidebar */}

      <div className={`bg-white rounded-lg shadow-md   pb-16`}>
        <h3 className="text-2xl font-bold pt-6 pl-6">Filters</h3>
        <div className="p-6">
          <div className="space-y-4">
            {/* Accordion: Seniority Level */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("seniorityLevel")}
              >
                <h4 className="text-lg font-medium text-gray-800">
                  Seniority Level
                </h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.seniorityLevel ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.seniorityLevel ? "block" : "hidden"
                }`}
              >
                <SearchList
                  allItems={[
                    { title: "Junior", value: "junior" },
                    { title: "Mid", value: "mid" },
                    { title: "Senior", value: "senior" },
                  ]}
                  onCheckedItems={handleCheckedItems}
                  name="seniorityLevel"
                  showLoadMore={false}
                  searchable={false}
                  singleSelect={false}
                />
              </div>
            </div>

            {/* Accordion: Skills */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("skills")}
              >
                <h4 className="text-lg font-medium text-gray-800">Skills</h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.skills ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.skills ? "block" : "hidden"
                }`}
              >
                <SearchList
                  allItems={data?.skills}
                  onCheckedItems={handleCheckedItems}
                  name={"skills"}
                  showLoadMore={true}
                />
              </div>
            </div>

            {/* Accordion: Locations */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("locations")}
              >
                <h4 className="text-lg font-medium text-gray-800">Locations</h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.locations ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.locations ? "block" : "hidden"
                }`}
              >
                <SearchList
                  allItems={data?.cantons}
                  onCheckedItems={handleCheckedItems}
                  name={"cantons"}
                />
              </div>
            </div>

            {/* Accordion: Industries */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("industries")}
              >
                <h4 className="text-lg font-medium text-gray-800">
                  Industries
                </h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.industries ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.industries ? "block" : "hidden"
                }`}
              >
                <SearchList
                  allItems={data?.industries}
                  showLoadMore={false}
                  searchable={false}
                  onCheckedItems={handleCheckedItems}
                  name={"industries"}
                />
              </div>
            </div>

            {/* Accordion: Rate Per Hour */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("rate")}
              >
                <h4 className="text-lg font-medium text-gray-800">
                  Rate Per Hour
                </h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.rate ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.rate ? "block" : "hidden"
                }`}
              >
                <NumberInput
                  name="rate"
                  value={preferences?.rate}
                  onChange={handleOnChange}
                  max={10000}
                />
              </div>
            </div>

            {/* Accordion: Availability */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("daysAvailable")}
              >
                <h4 className="text-lg font-medium text-gray-800">
                  Availability (days per week)
                </h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.daysAvailable ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.daysAvailable ? "block" : "hidden"
                }`}
              >
                <NumberInput
                  name="daysAvailable"
                  value={preferences?.daysAvailable}
                  onChange={handleOnChange}
                  max={5}
                />
              </div>
            </div>

            {/* Accordion: Available Date */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div
                className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                onClick={() => toggleSection("availableDate")}
              >
                <h4 className="text-lg font-medium text-gray-800">
                  Available Date
                </h4>
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${
                    openSections.availableDate ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              <div
                className={`p-3 transition-all duration-200 ${
                  openSections.availableDate ? "block" : "hidden"
                }`}
              >
                <div
                  className="flex items-center mb-3 cursor-pointer"
                  onClick={() => setImmediatlyAvailable(!immediatlyAvailable)}
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={immediatlyAvailable}
                      readOnly
                    />
                    <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
                    <div
                      className={`absolute w-6 h-6 rounded-full shadow transition transform ${
                        immediatlyAvailable
                          ? "translate-x-4 bg-indigo-600"
                          : "translate-x-0 bg-white"
                      } -left-1 -top-0.5`}
                    ></div>
                  </div>
                  <div className="ml-3 text-gray-700 font-medium">
                    Available Immediately
                  </div>
                </div>

                <input
                  type="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  name="availableDate"
                  value={preferences?.availableDate}
                  onChange={handleOnChange}
                  disabled={immediatlyAvailable}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed button at the bottom of parent container */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-md z-10`}
      >
        <button
          className="w-full btn-prm font-medium py-2 px-4 rounded-lg transition duration-200 ease-in-out"
          onClick={onFilter}
        >
          {initialView || noContent
            ? "Launch Your Search"
            : "Re-Generate Search"}
        </button>
      </div>
    </div>
  );
}
