import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Servicebanner from "../../Components/StaticpageComponents/Servicespage/Servicebanner"
import Servicetabs from '../../Components/StaticpageComponents/Servicespage/Servicetabs'
import Serlist from '../../Components/StaticpageComponents/Servicespage/Serlist'
import Amet from '../../Components/StaticpageComponents/Servicespage/Amet'
import Testimonial from '../../Components/StaticpageComponents/Homepage/Testimonial'
import Contactus from "../../Components/StaticpageComponents/Supportpage/Contactus"

const Servicepage = () => {
    return (
        <Layout>
            <Servicebanner />
            <Servicetabs />
            <Serlist />
            <Amet />
            <Testimonial />
            <Contactus />
        </Layout>
    )
}

export default Servicepage