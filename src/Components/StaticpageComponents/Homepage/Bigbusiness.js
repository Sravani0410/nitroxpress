import React from 'react'
import { useNavigate, NavLink, useLocation } from "react-router-dom";


function Bigbusiness() {

  const navigate = useNavigate();


  return (
    <section className='bigbusiness'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='left-part'>
              <h3>Robust Network with Future Ready Technology to match Your Business</h3>
              <p>At NitroXpress, We leverage advanced technology and Supply chain network management to build Fast and reliable Logistics solutions for eCommerce Businesses. We can provide Total Logistics solutions, just hand over your product, packed or unpacked.</p>
              <a className='btn'
              onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}}>Get a Quote </a>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='right_slider'>
              <img src="images/img1.png" alt="img" className="c1" />
              <div className='text_on_image slide1 active'>
                <img src="images/icon9.png" alt="img" />
                <h5>Custom Solutions</h5>
                <p>Customized Delivery Solutions for every need of your Business to reduce the hassle and optimize results.</p>

                <button type='btn' className=' next_slid'>  <img src="images/arrow-btn.png" alt="img" />  </button>
                <button type='btn' className=' back_slid'>  <img src="images/arrow-btn.png" alt="img" />  </button>
              </div>
              <img src="images/img4.png" alt="" className="c2" />
              <div className='text_on_image slide2 '>
                <img src="images/icon8.png" alt="img" />
                <h5>High-Tech Backing</h5>
                <p>Advanced Logistic Infrastructure backed with high-end technology solutions to speed up shipping and reduce manpower and return rate.</p>
                <button type='btn' className=' next_slid'>  <img src="images/arrow-btn.png" alt="img" /></button>
                <button type='btn' className=' back_slid'>  <img src="images/arrow-btn.png" alt="img" /></button>

              </div>
              <img src="images/img6.png" alt="" className="c3" />
              <div className='text_on_image slide3'>
                <img src="images/icon8.png" alt="img" />
                <h5>All Round with COD</h5>
                <p>We support business and one-time users with pickup, packaging, shipping and delivery in many product categories with COD. </p>
                <button type='btn' className=' next_slid'>  <img src="images/arrow-btn.png" alt="img" />  </button>
                <button type='btn' className=' back_slid'>  <img src="images/arrow-btn.png" alt="img" />  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bigbusiness