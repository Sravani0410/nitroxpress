import React from 'react'

function Supportbanner() {
  return (
    <>
        <section className='banner-part support-banner'>
            <div className='container '>
                <div className='row align-items-center'>
                    <div className='col-xxl-5 col-lg-6 col-12 mb-lg-0  mb-5'>
                        {/* <ul className='breadcrumb'> 
                            <li><a href="javascript:void(0)"> Home / </a> </li> 
                             <li className='active'> Support </li> 
                        </ul> */}
                        <h1>NitroXpress is here to Help You 24x7</h1>                        
                        <a href="tel:+91-8130-302-096" className='btn'>Call Us</a>   
                       
                    </div>
                    <div className='offset-xxl-1 col-xxl-6 col-lg-6 col-12 text-md-left text-center'>
                        <img src='/images/img7.png' alt= "img"/>
                    </div>
                </div>
            </div>
        </section>

    </>
  )
}

export default Supportbanner

