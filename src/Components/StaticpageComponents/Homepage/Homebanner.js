import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { PostTrackingOrderDetails, PostOrderTrack } from '../../../Redux/action/ApiCollection';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import TrackOrder from '../../../ProfilePage/TrackOrder';
import { reactLocalStorage } from "reactjs-localstorage";

function Homebanner() {
    const navigate = useNavigate();
    let param = useLocation();
    const [orderid, setOrderId] = useState("")
    const [orderiderror, setOrderIdError] = useState(false)
    const [OrderId1, setOrderId1] = useState(false)
    const dispatch = useDispatch()
    const PostTrackingOrderDetailsData = useSelector(state => state.PostTrackingOrderDetailsReducer.PostTrackingOrderDetailsData?.data)
    const PostOrderTrackData = useSelector(
        (state) => state.PostOrderTrackReducer.PostOrderTrackData
    );
    const OrderIDFun = (e) => {
        var newStr = e.target.value.replace(/  +/g, ' ');
        setOrderId(newStr)
    }
    const ConfirmDeleverFun = (e) => {         
        let data = sessionStorage.setItem("order_id", orderid);
        let Token = sessionStorage.getItem("token", false)
        let payload = {
            "oid": orderid
        }
        e.preventDefault()
        if (orderid?.length < 2) {
            setOrderIdError(true)
        }
        else {
            setOrderIdError(false)
            // if(param?.pathname=="/"){
            // }
            // else{
            //  dispatch(PostOrderTrack(payload))
            // }
            dispatch(PostOrderTrack(payload))
            setOrderId1(true)
        }
    }
    useEffect(() => {
        setOrderId1(false)
        if (PostOrderTrackData.status == 200 && param?.pathname == "/" && OrderId1 == true) {
            if (PostOrderTrackData?.data?.current_status !== "PENDING") {
                navigate(`/profile/trackorder/${orderid}`)
                // window.location.reload(false)
            }
        }
    }, [PostOrderTrackData])






    return (
        <>
            <section className='banner-part'>
                <div className='container '>
                    <div className='row align-items-center'>

                        <div className='col-xxl-6 col-lg-6 col-12 '>
                            <h3>Welcome to <span>Nitro Xpress</span> </h3>
                            <h1>Get The Right Logistic for Your Business </h1>
                            <p>Send from your location, to anywhere in the country. Faster and Safer Courier Service especially designed for eCommerce Business.</p>

                            <h2>Track Your Order</h2>
                            <form>
                                <input type="text" placeholder='Tracking ID' value={orderid}

                                    onChange={(e) => OrderIDFun(e)} />

                                <input type="submit" value="TRACK"
                                    onClick={(e) => ConfirmDeleverFun(e)}

                                />

                                {orderiderror && <span className='text-danger' >
                                    <small>  Enter your Enter your Tracking Id  </small></span>}
                            </form>


                            <div>


                            </div>

                        </div>
                        <div className=' col-xxl-6 col-lg-6 col-12 text-md-left text-center pt-lg-0 pt-5'>
                            <img src='images/img2.png' alt="img" />
                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}

export default Homebanner


{/* <div className='offset-xl-3 col-xl-4 col-lg-6 col-12 text-md-left text-center'>
                        <img src='images/img2.png' alt= "img"/>
                    </div> */}