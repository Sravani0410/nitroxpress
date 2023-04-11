import React from 'react'
import { useNavigate} from "react-router-dom";

function Servicebanner() {
    
    const navigate = useNavigate();

    return (    
        <section className='banner-part service-banner'>
            <div className='container '>
                <div className='row align-items-center'>
                    <div className='col-xxl-6 col-lg-6 col-12 mb-lg-0  mb-2'>                      
                        <h1>Making Shipping Effortless</h1>     
                        <p>We have utilized Advanced Technology with our Classic Logistic System to serve you effortless Shipping Experience on your digital devices. </p>                   
                        <a onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} className='btn'>Get a Quote</a> 
                    </div>
                    <div className=' col-xxl-6 col-lg-6 col-12 text-md-left text-center'>
                        <img src='images/img9.png' alt= "img"/>
                    </div>
                </div>
            </div>
        </section>    
    )
}

export default Servicebanner

