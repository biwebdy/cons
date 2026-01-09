"use client";
import React, { useState } from "react";

const NumberInput = (props) => {
  const { name, onChange, value, max, min = 0, errorMin } = props;
  const [errorMessage, setErrorMessage] = useState("");
  const hanldeOnChange = (event) => {
    // Remove leading zeros
    if (event.target.value.startsWith("0")) {
      event.target.value = event.target.value.replace(/^0+/, "") || "0"; // Ensures empty input doesn't happen
    }

    if (event.target.value > max) {
      event.target.value = max;
    }
    if (event.target.value < min) {
      event.target.value = min;
    }
    if (errorMin && event.target.value < errorMin) {
      setErrorMessage("Pleasee enter a value greater than " + errorMin);
    }
    if (errorMin && event.target.value >= errorMin) {
      setErrorMessage("");
    }
    onChange(event);
  };
  return (
    <>
      <input
        type="number"
        className="form-control"
        name={name}
        value={value}
        onChange={hanldeOnChange}
        max={max}
        min={min}
      />
      {errorMessage && <div className="text-danger">{errorMessage}</div>}
    </>
  );
};

export default NumberInput;
