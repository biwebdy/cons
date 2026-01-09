"use client";
import { useEffect, useState } from "react";
import { SearchList } from "../element/SearchList";

export default function MobileListingSidebar(props) {
  const { onChange, onFilter, data } = props;
  const [preferences, setPreferences] = useState({
    skills: [],
    industries: [],
    daysAvailable: [],
    availableDate: "",
    rateRange: {},
  });

  const handleCheckedItems = (checkedItems, name) => {
    const checkedItemsValues = checkedItems.map((item) => item.value);
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [name]: checkedItemsValues,
    }));
  };

  useEffect(() => {
    onChange({ preferences: preferences });
  }, [preferences]);

  const handleRateRangeChange = (rateRange) => {
    setPreferences({
      ...preferences,
      rateRange: rateRange,
    });
  };

  return (
    <>
      <div className="lefttside-hidden-bar">
        <div className="hsidebar-header bdrb1">
          <div className="row ">
            <button className="btn-prm" onClick={onFilter}>
              Launch Search
            </button>
          </div>
        </div>
        <div className="hsidebar-content">
          <div className="widget-wrapper">
            <div className="sidebar-accordion">
              <div className="accordion mt30" id="accordionExample">
                <div className="card mb20 pb10 mt-0">
                  <div
                    className="card-header cp"
                    id="heading0"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapse0"
                    aria-expanded="false"
                    aria-controls="collapse0"
                  >
                    <h4>
                      <button
                        className="btn btn-link ps-0 pt-0 collapsed"
                        type="button"
                      >
                        Skills
                      </button>
                    </h4>
                  </div>

                  <div
                    id="collapse0"
                    className="collapse show"
                    aria-labelledby="heading0"
                    data-parent="#accordionExample"
                  >
                    <SearchList
                      allItems={data?.skills}
                      onCheckedItems={handleCheckedItems}
                      name={"skills"}
                    />
                  </div>
                </div>
                <div className="card mb20 pb5">
                  <div className="card-header" id="heading2">
                    <h4>
                      <button
                        className="btn btn-link ps-0 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse2"
                        aria-expanded="false"
                        aria-controls="collapse2"
                      >
                        Location
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapse2"
                    className="collapse show"
                    aria-labelledby="heading2"
                    data-parent="#accordionExample"
                  >
                    <SearchList
                      allItems={data?.cantons}
                      onCheckedItems={handleCheckedItems}
                      name={"cantons"}
                    />
                  </div>
                </div>
                <div className="card mb20 pb5">
                  <div className="card-header" id="heading3">
                    <h4>
                      <button
                        className="btn btn-link ps-0 collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapse3"
                        aria-expanded="false"
                        aria-controls="collapse3"
                      >
                        Industries
                      </button>
                    </h4>
                  </div>
                  <div
                    id="collapse3"
                    className="collapse show"
                    aria-labelledby="heading3"
                    data-parent="#accordionExample"
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hiddenbar-body-ovelay" />
    </>
  );
}
