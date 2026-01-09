"use client";
import { useEffect, useState } from "react";
import Search from "./Search";

export const SearchList = (props) => {
  const {
    allItems = [],
    showLoadMore = true,
    searchable = true,
    onCheckedItems,
    name,
    initialSelectedItems = [],
    maxSelects,
    clearHandler = false,
    title,
  } = props;

  // Sort items alphabetically by title initially
  const sortedItems = [...allItems].sort((a, b) =>
    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
  );

  const [filteredItems, setFilteredItems] = useState(sortedItems);
  const [loadMore, setLoadMore] = useState(
    showLoadMore ? 5 : sortedItems?.length
  );
  const [displayedItems, setDisplayedItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (initialSelectedItems?.length === 0) return;
    let initial = initialSelectedItems;
    if (typeof initialSelectedItems[0] !== "object") {
      initial = initialSelectedItems?.map((item) => {
        return { id: item, title: item };
      });
    }
    const initialChecked = initial.reduce((acc, selectedItem) => {
      const item = sortedItems.find((d) => d.value === selectedItem.id);
      if (item) {
        acc[item.value] = true;
      }
      return acc;
    }, {});
    setCheckedItems(initialChecked);
  }, []);

  useEffect(() => {
    if (showAll) {
      setDisplayedItems(filteredItems);
    } else {
      setDisplayedItems(filteredItems.slice(0, loadMore));
    }
  }, [filteredItems, loadMore, showAll]);

  useEffect(() => {
    if (onCheckedItems) {
      const checked = sortedItems?.filter((item) => checkedItems[item.value]);
      onCheckedItems(checked, name);
    }
  }, [checkedItems]);

  const handleSearchChange = (searchTerm) => {
    const filtered = sortedItems?.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleCheckboxChange = (itemValue) => {
    setCheckedItems((prev) => {
      const isSelected = prev[itemValue];
      const selectedCount = Object.values(prev)?.filter(Boolean).length;

      if (!isSelected && maxSelects && selectedCount >= maxSelects) {
        return prev; // Do not allow more than maxSelects
      }

      return {
        ...prev,
        [itemValue]: !isSelected,
      };
    });
  };

  const handleLoadMore = () => {
    setShowAll(true);
  };

  const handleClear = () => {
    setCheckedItems({});
  };

  const handleSelectAll = () => {
    const newCheckedItems = {};
    filteredItems.forEach((item) => {
      newCheckedItems[item.value] = true;
    });
    setCheckedItems(newCheckedItems);
  };

  const areAllSelected =
    filteredItems.length > 0 &&
    filteredItems.every((item) => checkedItems[item.value]);

  const selectedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="tailwind">
      <div className="w-full">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-4">
            {selectedCount > 0 && (
              <p
                onClick={handleClear}
                className="text-sm text-gray-500 cursor-pointer hover:text-gray-700"
              >
                Clear ({selectedCount})
              </p>
            )}
            <p
              onClick={areAllSelected ? handleClear : handleSelectAll}
              className="text-sm text-black cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-md"
            >
              {areAllSelected ? "Clear All" : "Select All"}
            </p>
          </div>
        </div>
        {searchable && <Search onSearchChange={handleSearchChange} />}

        <div className={`mt-2  pr-1 ${showAll ? "scroll-smooth" : ""}`}>
          {displayedItems.map((item) => (
            <label
              key={item.value}
              className="flex items-center mb-2 cursor-pointer"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={!!checkedItems[item.value]}
                  onChange={() => handleCheckboxChange(item.value)}
                />
                <div
                  className={`w-5 h-5 border rounded mr-3 flex-shrink-0 ${
                    !!checkedItems[item.value]
                      ? "bg-yellow-brand border-brand-yellow"
                      : "border-gray-300"
                  }`}
                >
                  {!!checkedItems[item.value] && (
                    <svg
                      className="w-5 h-5 text-white -mt-[10px]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </div>
                <span className="text-gray-700">{item.title}</span>
              </div>
            </label>
          ))}
        </div>

        {filteredItems.length > displayedItems.length && (
          <button
            className="text-center w-full mx-auto border-0 p-2 font-bold"
            onClick={handleLoadMore}
          >
            Show {filteredItems.length - displayedItems.length} more
          </button>
        )}
      </div>
    </div>
  );
};
