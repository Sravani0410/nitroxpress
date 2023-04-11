import React, { useState, useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import Popup from "reactjs-popup";
import { useLocation } from "react-router-dom";
import { HeaderToggleClassAdd, ShipmentLoaderTrueFalse } from '../Redux/action/ApiCollection';
import { useDispatch, useSelector } from 'react-redux';


const LodingSpiner = ({ loadspiner }) => {

    const dispatch = useDispatch()

    const [SpinnerTrueFalse, setSpinnerTrueFalse] = useState()

    const ShipmentLoaderTrueFalseData = useSelector(state => state.ShipmentLoaderTrueFalseReducer.ShipmentLoaderTrueFalseData)

    let paramHash = useLocation();
    console.log("SpinnerTrueFalse", paramHash)
    // dispatch(HeaderToggleClassAdd("menu_sm_show"))

    const CloseSpinnerFun = () => {

        console.log("jhdkbkbm,bkf")
        dispatch(ShipmentLoaderTrueFalse(false))
        // setSpinnerTrueFalse(o=>!o) 
    }


    console.log(ShipmentLoaderTrueFalseData, "ShipmentLoaderTrueFalseData")

    return (
        <div className=" ">
            <Popup open={loadspiner} position="" model className="sign_up_loader">
                {/* <button type="button" className='loader-closebtn'
                    onClick={(e) =>
                        CloseSpinnerFun(e)
                    } > X </button> */}
                <div className="container">
                    <div className='loader-sec'>
                        <div className="justify-content-center d-flex">
                            <RotatingLines
                                // height="80"
                                // width="80"
                                // radius="9"
                                // color="yellow"
                                // ariaLabel="three-dots-loading"
                                // wrapperStyle
                                // wrapperClass
                                strokeColor="yellow"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="96"
                                visible={true}
                            />
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default LodingSpiner