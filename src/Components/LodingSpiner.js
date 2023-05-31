import React, { useState, useEffect } from 'react'
import { RotatingLines, ColorRing, Watch, ThreeDots } from 'react-loader-spinner'
import Popup from "reactjs-popup";
import { useLocation } from "react-router-dom";
import { HeaderToggleClassAdd, ShipmentLoaderTrueFalse } from '../Redux/action/ApiCollection';
import { useDispatch, useSelector } from 'react-redux';


const LodingSpiner = ({ loadspiner }) => {
    const dispatch = useDispatch()
    const [SpinnerTrueFalse, setSpinnerTrueFalse] = useState()
    const ShipmentLoaderTrueFalseData = useSelector(state => state.ShipmentLoaderTrueFalseReducer.ShipmentLoaderTrueFalseData)
    let paramHash = useLocation();
    // dispatch(HeaderToggleClassAdd("menu_sm_show"))
    const CloseSpinnerFun = () => {
        dispatch(ShipmentLoaderTrueFalse(false))
        // setSpinnerTrueFalse(o=>!o) 
    }
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
                            {/* <RotatingLines
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
                            /> */}
                            <ColorRing
                                visible={true}
                                height="80"
                                width="70"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#ffff00', '#ffff00', '#ffff00', '#ffff00', '#ffff00']}
                            />
                            {/* <Watch
                                height="60"
                                width="60"
                                radius="38"
                                color="#ffff00"
                                ariaLabel="watch-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            /> */}

                            {/* <ThreeDots
                                height="80"
                                width="80"
                                radius="9"
                                color="#ffff00"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClassName=""
                                visible={true}
                            /> */}
                        </div>


                    </div>
                </div>
            </Popup>
        </div>
    )
}

export default LodingSpiner