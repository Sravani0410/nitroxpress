import React from 'react'
import { useNavigate} from "react-router-dom";

function Dolo() {

  const navigate = useNavigate();
  
  return (
    <div className='chooseus-sec dolo-sec'>
      <div className='left-part'> 
        <img src="../images/img11.png"  alt="img"/>
      </div>
        <div className='container'>        
            <div className='row align-items-center'>
                <div className=' col-12'>
                    <div className='dolo-part'>
                        <h3 className='mb-3'>Lorem ipsum dolo</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit non dictum neque, ac nibh lectus. Nascetur libero non pellentesque varius ut sagittis, proin adipiscing. </p> <p> Auctor enim, massa placerat vitae. A vel praesent eget tellus nunc sagittis, nullam libero, a. Diam feugiat diam nullam urna varius pellentesque mi laoreet. </p>
                        <a onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}}  className='btn'>Get a Quote</a>
                    </div>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default Dolo