import React, { useState, useEffect } from "react";

export default function CantonSelect({
  label,
  defaultSelect,
  data = [],
  handler,
  name,
  isSearchable = false,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const [selectedOption, setSelectedOption] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  useEffect(() => {
    if (
      defaultSelect &&
      typeof defaultSelect === "object" &&
      defaultSelect.id
    ) {
      defaultSelect = defaultSelect.id;
    }
    const defSelected = data?.find((item) => item?.value === defaultSelect);
    if (defSelected) {
      handleSelection(defSelected);
    }
  }, [defaultSelect, data]);

  const handleSelection = (item) => {
    if (!item.option) {
      const it = data?.find((item) => item.value === defaultSelect);
      setSelectedOption(it?.option);
    }
    setSelectedOption(item?.option);
    handler(name, item?.value);
    setMenuVisible(false);
  };

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    setFilteredData(
      data?.filter((item) =>
        item.option.toLowerCase().includes(term.toLowerCase())
      )
    );
  };

  return (
    <div className="form-style1">
      <label className="heading-color ff-heading fw700 mb10">{label}</label>
      <div className="bootselect-multiselect">
        <div className="dropdown bootstrap-select dropup">
          <button
            type="button"
            className="btn dropdown-toggle btn-light"
            data-bs-toggle="dropdown"
            onClick={() => setMenuVisible(!menuVisible)}
          >
            <div className="filter-option">
              <div className="filter-option-inner">
                <div className="filter-option-inner-inner">
                  {selectedOption}
                </div>
              </div>
            </div>
          </button>
          <div className={`dropdown-menu ${menuVisible ? "show" : ""}`}>
            {isSearchable && (
              <div className="search-box p-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            )}
            <div
              className="inner show"
              style={{
                maxHeight: "250px",
                overflowX: "auto",
              }}
            >
              <ul className="dropdown-menu inner show">
                {filteredData.map((item, i) => (
                  <li key={i} className="selected active">
                    <a
                      onClick={() => handleSelection(item)}
                      className={`dropdown-item ${
                        item.option === selectedOption ? "active selected" : ""
                      }`}
                    >
                      <span className="text">{item.option}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
