import React, { useState } from "react";
import  "./blogs.css"
import logo from "./images/ishita.svg"
import twitter from "./images/twitter.svg"

import instagram from "./images/instagram.svg"

import linkedin from "./images/linkedin.svg"


const BlogsIshita = () => {
 

    return ( 
        <> 
        
        <div class="business-box">
            

            <figure>

                <span ><img src={logo} alt="img" /> </span>

            </figure>

            <h1>Ishita Sharma</h1>

            <p>Social Media Influencer <br/> NitroXpress India</p>

            <ul class="list1">

                <li><a href="https://www.linkedin.com/in/ishita-ui-ux-designer">
                    <img src={linkedin} alt="img" /> </a> </li>

                <li><a href="https://twitter.com/IshitaS9979?s=20"> <img src={twitter} alt="img" /> </a> </li>

                <li><a href="https://www.instagram.com/_ishita_sharma_581/"> <img src={instagram} alt="img" /> </a> </li>

            </ul>

            <ul class="list2">

                <li> <a href="tel:8003202581"> +91 8003202581</a> </li>

                <li> <a href="https://nitroxpress.in/"> www.nitroxpress.in</a> </li>

                <li> <a href="mailto:support@nitroxpress.in"> support@nitroxpress.in</a> </li>

            </ul>



        </div>
        </>

    );
};

export default BlogsIshita;
