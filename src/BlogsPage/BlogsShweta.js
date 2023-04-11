import React, { useState } from "react";
import  "./blogs.css"
import logo from "./images/shweta.jpeg"
import twitter from "./images/twitter.svg"

import instagram from "./images/instagram.svg"

import linkedin from "./images/linkedin.svg"


const BlogsShweta = () => {

console.log("jsygfdhg")

    return ( 
        <> 
        
        <div class="business-box">
            

            <figure>

                <span ><img src={logo} alt="img" /> </span>

            </figure>

            <h1>NitroXpress</h1>

            <p>Get The Right Logistic

                <br />for Your Business</p>

            <ul class="list1">

                <li><a href="https://www.linkedin.com/in/shweta-acharya-b9314b148/">
                    <img src={linkedin} alt="img" /> </a> </li>

                <li><a href="https://twitter.com/nitro_xpress"> <img src={twitter} alt="img" /> </a> </li>

                <li><a href="https://instagram.com/shwet_sa?igshid=YmMyMTA2M2Y="> <img src={instagram} alt="img" /> </a> </li>

            </ul>

            <ul class="list2">

                <li> <a href="tel:9588097414"> +91 9588097414</a> </li>

                <li> <a href="https://nitroxpress.in/"> www.nitroxpress.in</a> </li>

                <li> <a href="mailto:support@nitroxpress.in"> support@nitroxpress.in</a> </li>

            </ul>



        </div>
        </>

    );
};

export default BlogsShweta;
