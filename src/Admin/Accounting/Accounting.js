import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";

const Accounting = () => {
  const navigate = useNavigate();
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const HeaderToggleClassAddData = useSelector(
    (state) =>
      state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );

  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
        <Sidebar />
        <div className="content-sec d-flex justify-content-center align-items-center">
          <div id="wrapper">
            <img src="https://consumerdirectid.com/wp-content/uploads/2018/07/ComingSoon_1024x534-1024x534.jpg" />
            {/* <div id="info">
                <h3>This page could not be found</h3>
            </div> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Accounting;
