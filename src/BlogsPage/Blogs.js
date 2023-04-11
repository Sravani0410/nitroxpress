import React, { useState } from "react";
import  "./blogs.css"
import logo from "./images/logo.svg"
import twitter from "./images/twitter.svg"

import instagram from "./images/instagram.svg"

import linkedin from "./images/linkedin.svg"


const Blogs = () => {

console.log("jsygfdhg")

    return ( 
        <> 
        
        <div class="business-box">
            

            <figure>

                <span style={{padding: "5px"}}><img src={logo} alt="img" /> </span>

            </figure>

            <h1>NitroXpress</h1>

            <p>Get The Right Logistic

                <br />for Your Business</p>

            <ul class="list1">

                <li><a href="https://www.linkedin.com/feed/update/urn:li:activity:6968793666920288256">
                    <img src={linkedin} alt="img" /> </a> </li>

                <li><a href="https://twitter.com/nitro_xpress"> <img src={twitter} alt="img" /> </a> </li>

                <li><a href="https://www.instagram.com/nitro_xpress/"> <img src={instagram} alt="img" /> </a> </li>

            </ul>

            <ul class="list2">

                <li> <a href="tel:8005697216"> 8005697216</a> </li>

                <li> <a href="https://nitroxpress.in/"> www.nitroxpress.in</a> </li>

                <li> <a href="mailto:support@nitroxpress.in"> support@nitroxpress.in</a> </li>

            </ul>



        </div>
        </>

    );
};

export default Blogs;
