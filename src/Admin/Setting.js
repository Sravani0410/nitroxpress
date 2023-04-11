import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar"
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import warehouse from "../Images/emp-1.svg";
import Admin from "../Images/emp-2.svg";
import UserProfile from "../Images/emp-3.svg";
import Employees from "../Images/emp-4.svg";
import Setting_img from "../Images/emp-5.svg";
import feedback from "../Images/emp-6.svg"
import { reactLocalStorage } from "reactjs-localstorage";
const Setting = () => {

    const navigate = useNavigate();

    const ToggleFunData = useSelector(
        (state) => state.ToggleSideBarReducer.ToggleSideBarData
      );
      const HeaderToggleClassAddData = useSelector(
        (state) =>
          state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
      );

      let Admin_Role = reactLocalStorage.get("Admin_Role",false)

  return (
    
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part ${HeaderToggleClassAddData} `}>
        <Sidebar />
        <div className="content-sec settings-sec">
          <ul className="settings-box">
            <li onClick={(e) => {
                  navigate("/admin/setting/ware");
                }}>
              <img src={warehouse} alt='img' className="w-100"  />
              <h3>Warehouse</h3>
            </li>
            <li onClick={(e) => {
                  navigate("/admin/setting/employee");
                }}> 
                <img src={Employees} alt='img' className="w-100"   />

              
              <h3>Employees</h3>
            </li>
            <li onClick={(e) => {
                  navigate("/admin/setting/userprofile");
                }}>
              <img src={UserProfile} alt='img' className="w-100"  />
              <h3>User Profile</h3>
            </li> 
           {Admin_Role == "true" ? <li  onClick={(e) => {
                  navigate("/admin/setting/adminsetting");
                }}>
                  <img src={Admin} alt='img' className="w-100"   />

              <h3>Setting</h3>
            </li>: <li  onClick={(e) => {
                  navigate("/admin/setting/adminsetting");
                }}>
                  <img src={Admin} alt='img' className="w-100"   />

              <h3>Setting</h3>
            </li>}

            <li onClick={(e) => { 
                  navigate("/admin/setting/usersetting");
                }}>
              <img src={Setting_img} alt='img' className="w-100"   />
              <h3>Categories</h3>
            </li>

            <li 
            onClick={(e) => {
                  navigate("/admin/setting/b2bfeedback");
                }}>
              <img src={feedback} alt='img' className="w-100"   />
              <h3>Feedback</h3>
            </li>
          </ul>
      </div>
    </div>
    </div >
  )
}

export default Setting
