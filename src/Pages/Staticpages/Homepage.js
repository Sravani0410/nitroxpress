import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Bigbusiness from '../../Components/StaticpageComponents/Homepage/Bigbusiness'
import Chooseus from '../../Components/StaticpageComponents/Homepage/Chooseus'
import Delivery from '../../Components/StaticpageComponents/Homepage/Delivery' 
import Homebanner from '../../Components/StaticpageComponents/Homepage/Homebanner'
import Services from '../../Components/StaticpageComponents/Homepage/Services'
import Signup from '../../Components/StaticpageComponents/Homepage/Signup'
import Testimonial from '../../Components/StaticpageComponents/Homepage/Testimonial'

const Homepage = () => {

    return (
        <Layout>
            <Homebanner />
            <Services />
            <Chooseus />
            <Bigbusiness />
            <Delivery />
            <Signup />
            <Testimonial />
        </Layout>
    )
}

export default Homepage

