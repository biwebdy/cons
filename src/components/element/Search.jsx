"use client";

import { useEffect, useState } from "react";

export default function Search({ onSearchChange }) {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    onSearchChange(searchValue);
  }, [searchValue]);

  return (
    <>
      <div className="default-box-shadow1 mb30">
        <div className="search_area">
          <input
            type="text"
            className="form-control"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder={"Search"}
          />
          <label>
            <span className="flaticon-loupe" />
          </label>
        </div>
      </div>
    </>
  );
}
