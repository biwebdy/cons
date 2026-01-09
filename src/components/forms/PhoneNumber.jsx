import React, { useState } from "react";
import { countryCodes } from "@/data/countryCode";
const PhoneNumberInput = ({ value, onChange }) => {
  const [countryCode, setCountryCode] = useState(value.split(" ")[0] || "+41");
  const [phoneNumber, setPhoneNumber] = useState(value.split(" ")[1] || "");

  const handleCountryCodeChange = (e) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    onChange(`${newCountryCode} ${phoneNumber}`);
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\s/g, "");
    setPhoneNumber(newPhoneNumber);
    onChange(`${countryCode} ${newPhoneNumber}`);
  };

  return (
    <div className="row phone-number-input">
      <div className="col-lg-3">
        <select
          className="form-control"
          value={countryCode}
          onChange={handleCountryCodeChange}
        >
          {countryCodes?.map((country) => (
            <option key={country.code} value={country.code}>
              {country.code}
            </option>
          ))}
        </select>
      </div>
      <div className="col-lg-9">
        <input
          type="text"
          className="form-control"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
      </div>
    </div>
  );
};

export default PhoneNumberInput;
