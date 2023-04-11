import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Privacybanner from '../../Components/StaticpageComponents/privacypage/Privacybanner'
import Privacycontent from '../../Components/StaticpageComponents/privacypage/Privacycontent'


// Privacybanner
const Privacypage = () => {
    return (
        <Layout>
            <Privacybanner/>
            <Privacycontent/>
        </Layout>
    )
}

export default Privacypage