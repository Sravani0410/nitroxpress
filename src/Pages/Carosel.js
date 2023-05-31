import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import homeSlider from '../Images/homeSlider.svg'


const Carosel = () => {

    // const sliderArray = [
    //     {
    //         image: `${homeSlider}`,
    //         infoHeading: "Welcome Aboard My Friend",
    //         infoPera: "just a couple of clicks and we start"

    //     },
    //     {
    //         image: `${homeSlider}`,
    //         infoHeading: "Welcome Aboard My Friend",
    //         infoPera: "just a couple of clicks and we start"
    //     },
    //     {
    //         image: `${homeSlider}`,
    //         infoHeading: "Welcome Aboard My Friend",
    //         infoPera: "just a couple of clicks and we start"
    //     }
    // ]

    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide account-slider" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item active"  data-bs-interval="2000">
                        <img src="/images/img10.png" alt="img" />
                        <h3>Welcome Aboard My Friend</h3>
                        <p>just a couple of clicks and we start</p>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="/images/img15.png" alt="img" />
                        <h3>Welcome Aboard My Friend</h3>
                        <p>just a couple of clicks and we start</p>
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="/images/img16.png" alt="img" />
                        <h3>Welcome Aboard My Friend</h3>
                        <p>just a couple of clicks and we start</p>
                    </div>
                </div>               
            </div>
        </>
    )
}

export default Carosel