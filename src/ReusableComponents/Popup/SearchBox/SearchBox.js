import React from "react";

const SearchCompany = ({
  children,
  selectedOptionclass,
  OnChange,
  value,
  CompanyName,
  onKeyDown,
  isOpen,
  dropdownRef,
  CompanyFilterData,
  highlightedIndex,
  selectedIndex,
  setCompanyName,
  setHighlightedIndex,  
  onSearch,
  EnteredValueError
}) => {
  console.log("highlightedIndex",highlightedIndex)
  return (
    <div
      className={`form-group 
            ${selectedOptionclass}
            `}
    >
      <input
        className="form-control check-box mb-0"
        type="text"
        value={CompanyName ?? value}
        onChange={OnChange}
        placeholder={"Search"}
        onKeyDown={onKeyDown}
      />
      {isOpen ? (
        <div className={`dropdown companyDropDown`} ref={dropdownRef}>
          {CompanyFilterData.length > 0 ? (
            CompanyFilterData?.map((item, index) => {
              return (
                <div
                  className={`dropdown-row   ${
                    (highlightedIndex === index ? " selected" : "",
                    selectedIndex == -1
                      ? index == 0
                        ? "bg-red"
                        : ""
                      : selectedIndex == index
                      ? "bg-red"
                      : "")
                  }`}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => {
                    setCompanyName(item.company_name);
                    onSearch(item.company_name);
                  }}
                  key={index}
                >
                  {item.company_name}
                </div>
              );
            })
          ) : (
            <div className="text-danger">Company is not registered !</div>
          )}

          <div className="text-danger">
            {" "}
            {EnteredValueError == true
              ? "This Campany Name is not Available !"
              : ""}
          </div>
        </div>
      ) : (
        !isOpen &&
        EnteredValueError && (
          <div className="text-danger">No Campany Name is Available !</div>
        )
      )}
    </div>
  );
};

export default SearchCompany;
