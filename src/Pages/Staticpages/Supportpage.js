import React from 'react'
import Layout from '../../Components/Layout/Layout'
import Supportbanner from "../../Components/StaticpageComponents/Supportpage/Supportbanner"
import FAQs from "../../Components/StaticpageComponents/Supportpage/FAQs"
// import Sudel from "../../Components/StaticpageComponents/Supportpage/Sudel"
import Contactus from "../../Components/StaticpageComponents/Supportpage/Contactus"

const Supportpage = () => {
    return (
        <Layout>
            <div>
                <Supportbanner />
                <FAQs />
                {/* <Sudel /> */}
                <div  > 
                    <Contactus />
                </div>
            </div>
        </Layout>
    )
}

export default Supportpage