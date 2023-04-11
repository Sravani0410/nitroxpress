import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Termsbannner from '../../Components/StaticpageComponents/Termspage/Termsbannner'
import Termscontent from '../../Components/StaticpageComponents/Termspage/Termscontent'


// Privacybanner
const Termspage = () => {
    return (
        <Layout>
            <Termsbannner/> 
            <Termscontent/>
        </Layout>
    )
}

export default Termspage