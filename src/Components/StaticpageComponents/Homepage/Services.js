import React from 'react'
import { useNavigate } from "react-router-dom";


function Services() {
    const navigate = useNavigate();

  return (
    <section>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <div className='service-part'>
                        <div className='left-part'>
                            <h5>Services</h5>
                            <h2>What NitroXpress Can Do for You</h2>
                           <a href='/Servicepage' className='btn'>Read More</a>
                           
                        </div>
                        <div className='right-part'>
                            <p>Our intelligent logistic services help eCommerce businesses increase growth and revenue. Our focus is to make shipping convenient and faster for small and medium-sized eCommerce Businesses. We have managed to work with more than 12 supply chains to build a robust and fast network for Secure Shipping in India.</p>
                            <ul  className='ser-box'>
                                <li className=''>
                                    <div className='img-box'>
                                        <img src="images/icon1.png" alt="icon-img" className='img-active' />
                                        <img src="images/icon1-h.png" alt="icon-img" className='img-hover' />
                                    </div>
                                    <h4>Same Day Delivery</h4>
                                    <p>Same Day Delivery NCR is covered with our Same Day Delivery Services, with same-day pickup and delivery</p>
                                    <a href=' javascript:void' className='float-end clearfix d-none'> 
                                    <img src="images/icon20.png" alt="img" /> </a>
                                </li>
                                <li >
                                    <div className='img-box'>
                                        <img src="images/icon2.png" alt="icon-img" className='img-active' />
                                        <img src="images/icon2-h.png" alt="icon-img" className='img-hover' />
                                    </div>
                                    <h4>Air Delivery</h4>
                                    <p>Other states are reachable via our Smarter Next and Two Day Delivery Services</p>
                                    <a href=' javascript:void' className='float-end clearfix d-none'> <img src="images/icon20.png" alt="img" /> </a>
                                </li>
                                <li>
                                    <div className='img-box'>
                                        <img src="images/icon3.png" alt="icon-img" className='img-active' />
                                        <img src="images/icon3-h.png" alt="icon-img" className='img-hover' />
                                    </div>
                                    <h4>Express Delivery</h4>
                                    <p>Our Standard Shipping is done by Surface Express to reach every corner faster</p>
                                    <a href=' javascript:void' className='float-end clearfix d-none'> <img src="images/icon20.png" alt="img" /> </a>
                                </li>
                                <li>
                                    <div className='img-box'>
                                        <img src="images/icon4.png" alt="icon-img" className='img-active' />
                                        <img src="images/icon4-h.png" alt="icon-img" className='img-hover' />
                                    </div>
                                    <h4>Cash On Delivery</h4>
                                    <p>Pickup, packaging, shipping and delivery in many product categories with COD.</p>
                                    <a href=' javascript:void' className='float-end clearfix d-none'> <img src="images/icon20.png" alt="img" /> </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Services