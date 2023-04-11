import React from 'react'
import { useNavigate, NavLink, useLocation } from "react-router-dom";


function Delivery() {

    const navigate = useNavigate();
  return (
    <div className='chooseus-sec sudel-sec'>
        <div className='container'>        
            <div className='row align-items-center'>
                <div className='col-xxl-5 col-md-5'>
                    <img src="images/img3.png" alt="img" />
                </div>
                <div className='offset-xxl-1 col-xxl-6 col-md-7 mt-lg-0 mt-4'>                   
                    <h3 className='mb-md-4 mb-3 '>Automate Your Shipping &#38; Focus on your Customers</h3>
                    <p>We offer end-to-end transportation services. Our productive and systematic freight options are tailor-made for each client. Our advanced technology products and intelligent supply chain network helps us in making the whole logistics simple and convenient for you. You can skip all your logistic hassle; just log a new order and our team will take care of everything. All you have to do is sit and focus on new orders.</p>
                    <p>We help our clients in pick up from multiple locations, packaging, extended tracking, live delivery day tracking and after-delivery services; NitroXpress is one that can reduce all your shipping hassle.</p>
                    <a  className='btn'  onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}}>Get a Quote</a>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default Delivery

