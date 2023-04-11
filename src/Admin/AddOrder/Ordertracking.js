    import React, { useEffect } from 'react';
import Header from "../Header";
import Sidebar from "../Sidebar";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate, NavLink, useLocation } from "react-router-dom";




function Ordertracking() {
    const navigate = useNavigate();


     
    return (
        <>
            <div>
                <Header />
                <div className='dashboard-part  '>
                    <Sidebar />
                    <div className="content-sec">
                        <div className='row'>
                            <div className='col-xl-8'>
                                <div className='trackingtable-tab'>
                                    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All (146)</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-booked-tab" data-bs-toggle="pill" data-bs-target="#pills-booked" type="button" role="tab" aria-controls="pills-booked" aria-selected="false">Booked (14)</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-ready-tab" data-bs-toggle="pill" data-bs-target="#pills-ready" type="button" role="tab" aria-controls="pills-ready" aria-selected="false">Ready for shipping (12)</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-delivered-tab" data-bs-toggle="pill" data-bs-target="#pills-delivered" type="button" role="tab" aria-controls="pills-delivered" aria-selected="false">Delivered (248)</button>
                                        </li>
                                        <li class="nav-item" role="presentation">
                                            <button class="nav-link" id="pills-transit-tab" data-bs-toggle="pill" data-bs-target="#pills-transit" type="button" role="tab" aria-controls="pills-transit" aria-selected="false">In Transit (88)</button>
                                        </li>

                                    </ul>
                                    <div class="tab-content" id="pills-tabContent">
                                        <div class="tab-pane fade show active trackingall-tab" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                                            <ul>
                                                <li className='box adddpack-box'>
                                                    <img src="/images/img18.png" alt='img' />
                                                    <h4>Add New Package</h4>
                                                    <p>Fill out the form and create new package</p>
                                                    <button type='button' className='btn'>+</button>
                                                </li>
                                                <li className='box statusbar-box'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <p>Order ID</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Status</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>#1234565</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='status-text status-blue'>Booked</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-6'>
                                                            <p>Departure</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Arrival</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>24/09/2022, 11:00 AM</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>26/09/2022, 01:00 PM</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p>Customer</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Weight</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Price</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>John Doe</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>0.45 kg</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>1500/-</b></p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p> <img src='/images/logo.png' alt='img' /> </p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Lorem Ipsum</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Contact</b></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='box statusbar-box'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <p>Order ID</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Status</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>#1234565</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='status-text status-green'>Deliverd</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-6'>
                                                            <p>Departure</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Arrival</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>24/09/2022, 11:00 AM</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>26/09/2022, 01:00 PM</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p>Customer</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Weight</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Price</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>John Doe</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>0.45 kg</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>1500/-</b></p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p> <img src='/images/logo.png' alt='img' /> </p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Lorem Ipsum</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Contact</b></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='box statusbar-box'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <p>Order ID</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Status</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>#1234565</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='status-text status-org'>In Transit</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-6'>
                                                            <p>Departure</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Arrival</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>24/09/2022, 11:00 AM</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>26/09/2022, 01:00 PM</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p>Customer</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Weight</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Price</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>John Doe</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>0.45 kg</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>1500/-</b></p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p> <img src='/images/logo.png' alt='img' /> </p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Lorem Ipsum</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Contact</b></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='box statusbar-box'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <p>Order ID</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Status</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>#1234565</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='status-text status-blue'>Booked</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-6'>
                                                            <p>Departure</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Arrival</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>24/09/2022, 11:00 AM</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>26/09/2022, 01:00 PM</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p>Customer</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Weight</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Price</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>John Doe</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>0.45 kg</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>1500/-</b></p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p> <img src='/images/logo.png' alt='img' /> </p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Lorem Ipsum</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Contact</b></p>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className='box statusbar-box'>
                                                    <div className='row'>
                                                        <div className='col-6'>
                                                            <p>Order ID</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Status</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>#1234565</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p className='status-text status-blue'>Booked</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-6'>
                                                            <p>Departure</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>Arrival</p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p><b>24/09/2022, 11:00 AM</b></p>
                                                        </div>
                                                        <div className='col-6'>
                                                            <p>26/09/2022, 01:00 PM</p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p>Customer</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Weight</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p>Price</p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>John Doe</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>0.45 kg</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>1500/-</b></p>
                                                        </div>
                                                        <hr />
                                                        <div className='col-4'>
                                                            <p> <img src='/images/logo.png' alt='img' /> </p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Lorem Ipsum</b></p>
                                                        </div>
                                                        <div className='col-4'>
                                                            <p><b>Contact</b></p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane fade " id="pills-booked" role="tabpanel" aria-labelledby="pills-booked-tab" tabindex="0">....</div>

                                        <div class="tab-pane fade " id="pills-ready" role="tabpanel" aria-labelledby="pills-ready-tab" tabindex="0">....</div>

                                        <div class="tab-pane fade " id="pills-delivered" role="tabpanel" aria-labelledby="pills-delivered-tab" tabindex="0">....</div>

                                        <div class="tab-pane fade " id="pills-transit" role="tabpanel" aria-labelledby="pills-transit-tab" tabindex="0">....</div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-xl-4'>
                                <div className='trakingright_part'>
                                    <input type='search' placeholder='Search' className='form-control' />
                                    <div className='track_order'>
                                        <img src='/images/map2.png' alt='img' className='w-100 mt-3' />
                                        <div className='status_bar'>
                                            <p> #1234565<br />
                                                <span className='status-org'>In Transit</span>
                                            </p>
                                        </div>
                                        <div className='status_address'>
                                            <button type='button' className='close-btn'>
                                                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 6H4.7082L2.96688 3.54172L1.21609 6H0L2.29968 2.88919L0.156151 0H1.41009L3.01893 2.2736L4.6183 0H5.83438L3.68139 2.91792L6 6Z" fill="white" />
                                                </svg>
                                            </button>
                                            <div className='row'>
                                                <div className='col-md-4'><p><b>Address</b> </p></div>
                                                <div className='col-md-8'><p>Lörem ipsum fonobel ening, 
                                                    povis makrorire. </p></div>
                                                <div className='col-md-4'><p><b>Customer</b></p></div>
                                                <div className='col-md-8'><p>John Doe</p></div>
                                                <div className='col-md-4'><p><b>Phone</b></p></div>
                                                <div className='col-md-8'><p>+91 98576 62531</p></div>
                                                <div className='col-md-4'><p><b>Status</b></p></div>
                                                <div className='col-md-8'><p>In Transit</p></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
export default Ordertracking
