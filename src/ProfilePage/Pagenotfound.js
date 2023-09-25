import React, { useEffect } from 'react'
import Layout from '../Components/DashboardLayout/Layout'
import img from "../Images/track-img.png"
import Sidebar from '../Admin/Sidebar'
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../Admin/Header";
import Notfoundpage from "../Images/pagenotfound.jpg"

const PageNotFound = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className="dashboard-part  ">
        <Sidebar />
        <div className="content-sec d-flex justify-content-center align-items-center">


          <div id="wrapper">
            <img src={Notfoundpage}/>

          </div>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound