import React from 'react'
import { useNavigate} from "react-router-dom";

function Amet() {
    const navigate = useNavigate();
  return (
    <div className='chooseus-sec amet-sec'>
        <div className='container'>        
            <div className='row align-items-center'>
                <div className='col-xxl-5 col-md-5'>
                    <img src="images/img3.png" alt="img" />
                </div>
                <div className='offset-xxl-1 col-xxl-6 col-md-7 mt-lg-0 mt-4'>                   
                    <h3 className='mb-md-4 mb-3 '> A Logistic Company- Always There For You! </h3>
                    <p>Having a global network and strong relations with shipping lines and Indian customs is a USP of NitroXpress. By appointing NitroXpress as your business logistics partner you can be assured of cost-effective economical freights, smooth and safe on-time delivery, reliable service, best quality customer care, and uniform movement of shipment from point of origin to its specified destination. We approach logistics from the customers' point of view and our hallmark is our customer-centric attitude and is passionate for our work.  </p>
                    <p>We work in a transparent manner, the customers are updated at every stage regarding their freight. We guarantee you will find us affordable, easy-going, and responsible.</p>
                    <a onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} className='btn'>Get a Quote</a>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default Amet

