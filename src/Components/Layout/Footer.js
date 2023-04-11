import React from 'react'
import { useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


function Footer() {
    const navigate = useNavigate();
    let Token = reactLocalStorage.get("token", false)




  return (
    <footer>
        <div className='container'>
            <div className='row'>
                <div className='col-xl-4 col-lg-5 col-md-3 logo-part'> 
                    <img src="/images/logo-white.png" alt="logo" />
                    <p className='pe-xl-5 me-lg-5'>Send from your location, to anywhere in the country. Faster and Safer Courier Service Around India.</p>
                    <ul>
                        <li>
                            <a href='https://twitter.com/nitro_xpress' target="_blank"><img src="/images/icon18.png"  alt="img" className='active-img' /> <img src="/images/icon18-h.png"  alt="img" className='hover-img' /> </a>
                        </li>
                        <li>
                            <a href=' https://www.facebook.com/profile.php?id=100083231327146' target="_blank"><img src="/images/icon15.png"  alt="img" className='active-img' /> <img src="/images/icon15-h.png"  alt="img" className='hover-img' /> </a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/feed/update/urn:li:activity:6968793666920288256' target="_blank"><img src="/images/icon16.png"  alt="img" className='active-img' /> <img src="/images/icon16-h.png"  alt="img" className='hover-img' /> </a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com/nitro_xpress' target="_blank"><img src="/images/icon17.png"  alt="img" className='active-img' />  <img src="/images/icon17-h.png"  alt="img"  className='hover-img' /></a>
                        </li>
                        <li>
                            <a href="tel:+91-8130-302-096" target="_blank"><img src="/images/icon14.png"  alt="img" className='active-img' /> <img src="/images/icon14-h.png"  alt="img"  className='hover-img' /> </a>
                        </li>
                    </ul>
                    {/* <h5>Reach Us At</h5>
                    <a href='mailto:Support@nitroxpress.com'>Support@nitroxpress.com</a>
                    <p className=''> Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p> */}


                </div>
                <div className='col-xl-2 col-lg-2 col-md-3 ft-list'>
                    <h5>More from Us</h5>
                    <ul>
                        <li>
                            <a href='/'> Home </a>
                        </li>
                        {/* {Token == false ?<li>
                            <a href='javascript:void' onClick={(()=>navigate("/login"))}> Start Shipping</a>
                        </li>: 
                        <li>
                        <a href='javascript:void' onClick={(()=>navigate("/shipping"))}> Start Shipping</a>
                        </li>} */}
                        {/* <li>
                            <a href='javascript:void'> Tracking</a>
                        </li> */}
                        <li>
                            <a href='/support'> Support</a>
                    </li>
                    </ul>
                </div>
                <div className='col-xl-2 col-lg-2 col-md-3 ft-list'>    
                    <h5>More from Us</h5>
                    <ul>
                        <li>
                            <a href=' /privacy-policy'> Privacy Policy</a>
                        </li>
                        <li>
                            <a href='/terms-and-conditions'> Terms and Condition </a>
                        </li>
                        {/* <li>
                            <a href=' javascript:void'> Contact Us</a>
                        </li> */}
                    </ul>
                </div>
                <div className='col-xl-4 col-lg-3 col-md-3 ft-list2'>
                    <h5>Reach Us At</h5>
                    <ul>
                        <li>
                            <img src="/images/icon21.png" alt="img" />
                            <p> <a href="mailto:support@nitroxpress.in"> support@nitroxpress.in </a> </p>                            
                        </li>
                        <li>
                            <img src="/images/icon22.png" alt="img" />
                            <p> Near Health care center Gurugram, Haryana INDIA </p>                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <p className='text-center copy-text'>Copyright &copy; 2022 Nitro Xpress. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer