import React, { useState } from "react";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LodingSpiner from "../Components/LodingSpiner";

import { useToasts } from "react-toast-notifications";
import Carosel from "./Carosel";
import { getViewProfile } from "../Redux/action/ApiCollection";

import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";

const VeryfiyCode = () => {
  const [otpvalue, setOtpValue] = useState("");
  const [loadspiner, setLoadSpiner] = useState(false);

  const products = useSelector((state) => state.productReducer.products);
  let navigate = useNavigate();
  const { addToast } = useToasts();
  const dispatch = useDispatch();

  let emaildata = reactLocalStorage.get("userDetails", true);
  let localStorageDetails = JSON.parse(emaildata);

  let mail = reactLocalStorage.get("User_Mail");
  let user_right = reactLocalStorage.get("user_right");
  console.log("user_rightuser_right", user_right);

  // as_business

  const VerifyOtp = () => {
    setLoadSpiner((o) => !o);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/verifyemailphoneotp`, {
        email: mail,
        email_otp: otpvalue,
      })
      .then((response) => {
        console.log(response);
        setLoadSpiner((o) => !o);

        reactLocalStorage.set("token", response.data.Token);
        if (user_right == "as_business") {
          navigate("/login");
          reactLocalStorage.clear();
          toast.warn(
            " Your account is under verification, Once it will verify we will inform you on E-mail ! "
          );
        } else {
          navigate("/profile");
          setLoadSpiner((o) => !o);
          toast.success("Login Successfully");
          dispatch(getViewProfile());
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadSpiner((o) => !o);
        addToast(err.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handleChange = (otpvalue) => setOtpValue(otpvalue);

  const SendOtpFun = () => {
    setLoadSpiner((o) => !o);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/resendotp`, {
        email: mail,
      })
      .then((response) => {
        console.log(response);
        setLoadSpiner((o) => !o);
        setOtpValue("")
        toast.success("Please check your email");
         
      })
      .catch((err) => {
        console.log(err);
        setLoadSpiner((o) => !o);
        toast.warn(err.response.data.message);
         
      });
  };
  return (
    <div className="conatiner-fluid">
      <div className="row m-0 p-0">
        <div className="col-md-7  carosel_bg d-md-block d-none">
          <div className="accountslider-part">
            <Carosel />
          </div>
        </div>
        <div className="col-md-5 col-sm-12 col-12 account-part">
          <div className="right_part signup-part">
            <div className="sign_up ">Verification Code</div>
            <div className="sign_up_ ">
              Please type verification code send to
            </div>
            <div className="email_number">{localStorageDetails.email}</div>
            <div className="otp_container">
              <OtpInput
                value={otpvalue}
                onChange={handleChange}
                numInputs={4}
                focusStyle={false}
              />
            </div>
            <div className="send_otp">
              <a href="#" onClick={() => SendOtpFun()}>
                Resend OTP
              </a>
            </div>

            <div className="button_login_div">
              <button className="button_otp" onClick={(e) => VerifyOtp(e)}>
                Verify OTP
              </button>
            </div>
          </div>
        </div>
        <LodingSpiner loadspiner={loadspiner} />
      </div>
    </div>
  );
};

export default VeryfiyCode;
