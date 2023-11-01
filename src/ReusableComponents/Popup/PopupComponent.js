import React from "react";
import usePopupHook from "../../CoustomeHooks/usePopupHook/usePopupHook";
import "./popup.css";
const PopupComponent = ({
  children,
  namesuccess,
  namecancel,
  sucessButton,
  handleClick,
  // PopupHookDataFun,
}) => {
  // const handleClick = () => {
  //   PopupHookDataFun(false);
  // };

  return (
    <div className="popupouter deliveryaction-popup">
      <div className="popupinner">
        <div className="close-btn" type="button" onClick={handleClick}>
          <svg
            viewBox="0 0 10 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
              fill="black"
            />
          </svg>
        </div>
        <div>
          {children}

          <div className="btngroups popupbtn">
            <button
              type="button"
              className="save-btn"
              onClick={(e) => sucessButton(e)}
            >
              {namesuccess}
            </button>
            <button type="button" className="cancel-btn" onClick={handleClick}>
              {namecancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
