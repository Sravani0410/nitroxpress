import React from 'react'
import { useNavigate, NavLink, useLocation } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  return (
    <section className='signup-sec text-center'>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2> Get a Free Call from one of our Experts to help</h2>
                    {/* <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugit porro, illum distinctio sequi quisquam et hic tempore</p> */}
                    <a  className='btn mt-4'  onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}}>Get a Quote </a>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Signup 