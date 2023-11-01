import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import warehouse from "../Images/emp-1.svg";
import Admin from "../Images/emp-2.svg";
import UserProfile from "../Images/emp-3.svg";
import Employees from "../Images/emp-4.svg";
import Setting_img from "../Images/emp-5.svg";
import Deliveryboy_img from "../Images/Deliveryboy.png";
import Deliverypartner_img from "../Images/Deliverypartner.png";
import feedback from "../Images/emp-6.svg";
import { reactLocalStorage } from "reactjs-localstorage";
import { PermissionData } from "../Permission";
const Setting = () => {
  const navigate = useNavigate();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const HeaderToggleClassAddData = useSelector(
    (state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );

  let Admin_Role = sessionStorage.getItem("Admin_Role", false);
  let isEmployeData = sessionStorage.getItem("isEmploye", false);
  let IsDeliveryBoyRole = sessionStorage.getItem("Is_delivery_boy", false);
  let B2BPartner = sessionStorage.getItem("Is_Business", false);
  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part ${HeaderToggleClassAddData} `}>
        <Sidebar />
        <div className="content-sec settings-sec">
          <ul className="settings-box">
            <li
              onClick={(e) => {
                navigate("/admin/setting/ware");
              }}
            >
              <img src={warehouse} alt="img" className="w-100" />
              <h3>Warehouse</h3>
            </li>
            {isEmployeData != "true" &&
            PermissionData()?.VIEW_SETTING_EMPLOYEE_PAGE ==
              "VIEW_SETTING_EMPLOYEE_PAGE" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/employee");
                }}
              >
                <img src={Employees} alt="img" className="w-100" />

                <h3>Employees</h3>
              </li>
            ) : (
              ""
            )}
            {PermissionData()?.VIEW_SETTING_USER_PROFILE_PAGE ==
            "VIEW_SETTING_USER_PROFILE_PAGE" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/userprofile");
                }}
              >
                <img src={UserProfile} alt="img" className="w-100" />
                <h3>User Profile</h3>
              </li>
            ) : (
              ""
            )}
            {Admin_Role == "true" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/adminsetting");
                }}
              >
                <img src={Admin} alt="img" className="w-100" />

                <h3>Setting</h3>
              </li>
            ) : (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/adminsetting");
                }}
              >
                <img src={Admin} alt="img" className="w-100" />

                <h3>Setting</h3>
              </li>
            )}

            {Admin_Role == "true" ||
            PermissionData()?.VIEW_SETTING_CATEGORY_PAGE ==
              "VIEW_SETTING_CATEGORY_PAGE" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/usersetting");
                }}
              >
                <img src={Setting_img} alt="img" className="w-100" />
                <h3>Categories</h3>
              </li>
            ) : (
              ""
            )}

            {PermissionData()?.VIEW_B2B_FEEDBACK_PAGE ==
            "VIEW_B2B_FEEDBACK_PAGE" ? (
              <li
                onClick={(e) => {
                  // navigate("/admin/setting/b2bfeedback");
                  navigate("/admin/setting/b2cfeedback");
                }}
              >
                <img src={feedback} alt="img" className="w-100" />
                <h3>Feedback</h3>
              </li>
            ) : (
              ""
            )}
            {IsDeliveryBoyRole != "true" &&
            B2BPartner != "true" &&
            PermissionData()?.VIEW_SETTING_DELIVERY_BOY_PAGE ==
              "VIEW_SETTING_DELIVERY_BOY_PAGE" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/deliveryboy");
                }}
              >
                <img src={Deliveryboy_img} alt="img" className="w-100" />
                <h3>Delivery Boy</h3>
              </li>
            ) : (
              ""
            )}
            {PermissionData()?.VIEW_SETTING_ADD_DELIVERY_PARTNER_PAGE ==
            "VIEW_SETTING_ADD_DELIVERY_PARTNER_PAGE" ? (
              <li
                onClick={(e) => {
                  navigate("/admin/setting/adddeliverypartner");
                }}
              >
                <img src={Deliverypartner_img} alt="img" className="w-100" />
                <h3>Add Delivery Partner</h3>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Setting;
