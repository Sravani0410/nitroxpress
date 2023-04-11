import React, { useState } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Carosel from "./Carosel";
import OtpInput from 'react-otp-input';
import { useSelector } from "react-redux";


const VeryfiyPhone = () => {

    const [otpvalue, setOtpValue] = useState('')
    const products = useSelector(state => state.productReducer.products)
    let navigate = useNavigate();
    const { addToast } = useToasts();

    let phoneNumber = reactLocalStorage.get('userDetails', true);
    let localStorageDetails = JSON.parse(phoneNumber)

    const VerifyOtp = async() => { 

        await axios
            .post(`${process.env.REACT_APP_BASE_URL}/verifyemailphoneotp`,
                {
                    phone_number: localStorageDetails.phoneNumber,
                    mobile_otp: otpvalue
                }
            )
            .then((response) => {
                console.log(response);

                addToast("Verified Phone successfully", {
                    appearance: "success",
                    autoDismiss: true,
                });
                navigate('/login')
            })
            .catch((err) => {
                console.log(err);
                addToast(err.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });

            });
    };


    const handleChange = (otpvalue) => setOtpValue(otpvalue);

    const SendOtpFun = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/resendotp`,
                {
                    number: localStorageDetails.phoneNumber,
                }

            )
            .then((response) => {
                console.log(response);
                addToast("Please check your sms", {
                    appearance: "success",
                    autoDismiss: true,
                });
            })
            .catch((err) => {
                console.log(err);
                addToast(err.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });

            });
    }

    return (
        <div className="conatiner-fluid">
            <div className="row m-0 p-0">
                <div className='col-md-7  carosel_bg d-md-block d-none' >
                    <div className="accountslider-part">
                        <Carosel />
                    </div>
                </div>
                <div className="col-md-5 col-sm-12 col-12 account-part">                   
                    <div className="right_part verifyphone-part ">
                        <div className="sign_up ">Verification Code</div>
                        <div className="sign_up_ ">Please type verification code send to</div>
                        <div className="email_number">
                            {localStorageDetails.phoneNumber}  </div>

                        <div className="otp_container">
                            <OtpInput
                                value={otpvalue}
                                onChange={handleChange}
                                numInputs={4}
                                focusStyle={false}
                            />
                        </div>
                        <div className="send_otp"> <a href="#" onClick={() => SendOtpFun()}> Resend OTP </a> </div>                       
                        <div className="button_login_div"> <button className="button_otp" onClick={(e) => VerifyOtp(e)}> Verify OTP </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VeryfiyPhone;
