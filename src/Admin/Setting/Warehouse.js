import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar"
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';



const Warehouse = () => {
  // const navigate = useNavigate();
  
    const ToggleFunData = useSelector(
        (state) => state.ToggleSideBarReducer.ToggleSideBarData
      );
  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
    <Header />
    <div className='dashboard-part  '>
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
  )
}

export default Warehouse
