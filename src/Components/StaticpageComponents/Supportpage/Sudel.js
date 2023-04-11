import React from 'react'
import { useNavigate} from "react-router-dom";

function Sudel() {
    const navigate = useNavigate();
  return (
    <div className='chooseus-sec sudel-sec'>
        <div className='container'>
        
            <div className='row align-items-center'>
                <div className='col-xxl-5 col-md-5'>
                    <img src="images/img8.png" alt="img" />
                </div>
                <div className='offset-xxl-1 col-xxl-6 col-md-7 mt-lg-0 mt-4'>                   
                    <h3 className='mb-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non dictum neque, ac nibh lectus. Nascetur libero non pellentesque varius ut sagittis, proin adipiscing. Enim aliquet nulla adipiscing diam mus id quis. Nam volutpat praesent dictumst odio ornare volutpat. Quam volutpat, volutpat erat amet, sit ut maecenas nisi quam. In amet sed bibendum pellentesque in arcu. Sapien ut auctor quis venenatis senectus velit dui. Tristique diam non commodo egestas faucibus semper consequat, nisl lobortis. Iaculis lorem eget semper fermentum tellus parturient. </p>
                    <p>Auctor enim, massa placerat vitae. A vel praesent eget tellus nunc sagittis, nullam libero, a. Diam feugiat diam nullam urna varius pellentesque mi laoreet. </p>
                    <a onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} className='btn'>Get a Quote</a>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default Sudel

