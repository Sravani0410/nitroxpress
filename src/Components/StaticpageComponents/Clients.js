import React from 'react'

function Clients() {
  return (
    <section className='client-sec'>
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='text-center'> Our Clients </h2> 
          </div>
          <div class="owl-carousel owl-theme client-slider">
            <div className="item">
              <img src="images/logo1.png" alt="clint-logo" />
            </div>
            <div className="item">
              <img src="images/logo2.png" alt="clint-logo" />
            </div>
            <div className="item">
              <img src="images/logo3.png" alt="clint-logo" />
            </div>
            <div className="item">
              <img src="images/logo4.png" alt="clint-logo" />
            </div>
            <div className="item">
              <img src="images/logo5.png" alt="clint-logo" />
            </div>
            <div className="item">
              <img src="images/logo6.png" alt="clint-logo" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients