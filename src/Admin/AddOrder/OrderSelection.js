import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';


const OrderSelection = () => {
  let BearerToken = sessionStorage.getItem("token", false);
   
  const navigate = useNavigate();
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  
  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part`}>
        <Sidebar />
        <div className="content-sec">
          <div className="orderdetail-part">
            <ul
              // onClick={(e) => {
              //   navigate("/admin/order/User");
              // }}
              className="user-list"
            >
              <li className="active">
                <span></span>Consignee Details
              </li>
              
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/orderdetails");
                // }}
              >
                <span></span>Item Details
              </li>
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/ordersummary");
                // }}
              >
                <span></span>Summary Details
              </li>
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/orderpayment");
                // }}
              >
                <span></span>Payment
              </li>
            </ul>
            <div className="userinfo-box">
              <h1>Mode of selection</h1>
              <div className="userinfo-body">
                <div className="row align-items-center">
                  <div className="col-md-6 ">
                    <label className="b2b-box ">
                      B2B
                      <input type="checkbox" checked="checked" />
                      <span className="checkmark"></span>
                      <div className="">For business shipment above 20kg</div>
                    </label>

                    <label className="b2b-box mt-4">
                      B2C
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <div className="">For Small shipment 10-20kg</div>
                    </label>
                    <label className="b2b-box mt-4">
                      C2C
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                      <div className="">Shipment less than 10Kg</div>
                    </label>
                  </div>
                  <div className="col-md-6">
                    <img src="/images/img17.png" alt="img" className="w-100" />
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  navigate("/admin/order/orderdetails");
                }}
                type="button"
                className="btn next-btn"
              >
                {" "}
                Next{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSelection;
