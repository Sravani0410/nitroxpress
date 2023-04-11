import React, { useEffect } from 'react'
import Layout from '../Components/DashboardLayout/Layout'
import img from "../Images/track-img.png"
import Sidebar from '../Admin/Sidebar'
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate, NavLink, useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Header from "../Admin/Header";


const Tracking = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  return (
    // <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
    // <Header />
    // <div className="dashboard-part  ">
    //   <Sidebar />
    // <Layout>
    //     <section className='tracking-sec'>
    //         <div className='container'>
    //             <div className='row'>
    //                 <div className='col-12 d-flex justify-content-between flex-lg-nowrap flex-wrap'>
    //                     <div className='left-part'>
    //                         <ul>
    //                             <li>
    //                                 <h4>Order ID #1234565</h4>
    //                                 <div className='row'>
    //                                     <div className='col-8'>
    //                                         <span> HP Laptop X 5 </span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span>100,000/-</span>
    //                                     </div>
    //                                     <div className='col-8'>
    //                                         <span>Status</span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span className='transit-text'>In Transit</span>
    //                                     </div>
    //                                 </div>
    //                             </li>
    //                             <li>
    //                                 <h4>Order ID #1234565</h4>
    //                                 <div className='row'>
    //                                     <div className='col-8'>
    //                                         <span> HP Laptop X 5 </span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span>100,000/-</span>
    //                                     </div>
    //                                     <div className='col-8'>
    //                                         <span>Status</span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span className='booked-text'>Booked</span>
    //                                     </div>
    //                                 </div>
    //                             </li>
    //                             <li>
    //                                 <h4>Order ID #1234565</h4>
    //                                 <div className='row'>
    //                                     <div className='col-8'>
    //                                         <span> HP Laptop X 5 </span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span>100,000/-</span>
    //                                     </div>
    //                                     <div className='col-8'>
    //                                         <span>Status</span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span className='booked-text'>Booked</span>
    //                                     </div>
    //                                 </div>
    //                             </li>
    //                             <li>
    //                                 <h4>Order ID #1234565</h4>
    //                                 <div className='row'>
    //                                     <div className='col-8'>
    //                                         <span> HP Laptop X 5 </span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span>100,000/-</span>
    //                                     </div>
    //                                     <div className='col-8'>
    //                                         <span>Status</span>
    //                                     </div>
    //                                     <div className='col-4 text-end'>
    //                                         <span className='delivery-text'>Delivered</span>
    //                                     </div>
    //                                 </div>
    //                             </li> 
    //                         </ul>
    //                     </div>
    //                     <div className='right-part'>
    //                         <figure>
    //                             <img src={img} alt='img'  />
    //                             <div className='form-box'>
    //                                 <input type="search" placeholder="Enter your Tracking Id" />
    //                                 <input type="submit" value="Search" />
    //                             </div>
    //                             <h2>Tracking History</h2>
    //                         </figure>
    //                         <div className='tracking-table'>
    //                             <table>
    //                                 <tr>
    //                                     <th>Date</th>
    //                                     <th>Time</th>
    //                                     <th>Status</th>
    //                                     <th className='text-end'>Location</th>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>11/10/2022</td>
    //                                     <td>11:00 AM</td>
    //                                     <td>Ready For Delivery</td>
    //                                     <td className='text-end'>Jaipur</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>12/10/2022</td>
    //                                     <td>01:00 PM</td>
    //                                     <td>Received</td>
    //                                     <td className='text-end'>Nasirabad</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>15/10/2022</td>
    //                                     <td>01:00 PM</td>
    //                                     <td>Despatched</td>
    //                                     <td className='text-end'>Ajmer</td>
    //                                 </tr>
    //                                 <tr>
    //                                     <td>18/10/2022</td>
    //                                     <td>01:00 PM</td>
    //                                     <td>Collected</td>
    //                                     <td className='text-end'>Bhilwara</td>
    //                                 </tr>
    //                             </table>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    // </Layout>
    // </div>
    // </div>
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className="dashboard-part  ">
        <Sidebar />
        <div className="content-sec d-flex justify-content-center align-items-center">


          <div id="wrapper">
            <img src="https://consumerdirectid.com/wp-content/uploads/2018/07/ComingSoon_1024x534-1024x534.jpg" />

          </div>
        </div>
      </div>
    </div>
  )
}

export default Tracking