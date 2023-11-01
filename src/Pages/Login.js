import React, { useEffect, useState } from "react";
import axios from "axios";
import { json, useNavigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import Carosel from "./Carosel";
import LodingSpiner from "../Components/LodingSpiner";
import Popup from "reactjs-popup";
import { useDispatch, useSelector } from "react-redux";
import {
  getViewProfile,
  latAndLogAttendence,
} from "../Redux/action/ApiCollection";
import { toast } from "react-toastify";

const Login = () => {
  // const [email, setEmail] = useState("sandhyadevipyla4@gmail.com");
  const [email, setEmail] = useState("nehadubet@gmail.com");
  const [loadspiner, setLoadSpiner] = useState(false);
  const [forgetemail, setForgetEmail] = useState("");
  // const [password, setPassword] = useState("Demo@123");
  const [password, setPassword] = useState("Demo@123");
  const [showpassword, setShowPassword] = useState(false);
  const [popupture, setPopupTure] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let emailSpaceCancelation = email.replace(/  +/g, "");
  let passwordSpaceCancelation = password.replace(/  +/g, "");

  sessionStorage.setItem("User_Mail", emailSpaceCancelation);

  const SendOtp = async () => {
    let emailvalidRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordvalidRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (emailSpaceCancelation.length == 0) {
      toast.warn("Please enter your email");
    } else if (
      emailSpaceCancelation.length != 0 &&
      !emailvalidRegex.test(emailSpaceCancelation)
    ) {
      toast.warn("Please enter valid email");
    } else if (passwordSpaceCancelation.length == 0) {
      toast.warn("Please enter your password");
    } else if (
      passwordSpaceCancelation.length != 0 &&
      !passwordvalidRegex.test(passwordSpaceCancelation)
    ) {
      toast.warn(
        "Please Enter Password with Minimum 8 Characters, at least one uppercase, one lowercase, one number and one special character."
      );
    } else {
      setLoadSpiner((o) => !o);
      await axios
        .post(`${process.env.REACT_APP_BASE_URL}/signin`, {
          email: emailSpaceCancelation,
          password: passwordSpaceCancelation,
        })
        .then((Response) => {
          
          setLoadSpiner((o) => !o);

          if (Response?.data?.user_type == "as_individual") {
            sessionStorage.setItem("as_individual", true);
            sessionStorage.setItem("Admin_Role", false);
            sessionStorage.setItem("isEmploye", false);
            sessionStorage.setItem("Is_Business", false);
            sessionStorage.setItem("Is_delivery_boy", false);
          } else {
            sessionStorage.setItem(
              "as_individual",
              Response?.data?.Role?.as_individual
            );
            sessionStorage.setItem(
              "Admin_Role",
              Response?.data?.Role?.is_admin
            );
            sessionStorage.setItem(
              "isEmploye",
              JSON.stringify(Response?.data?.Role?.employee)
            );
            sessionStorage.setItem(
              "Is_Business",
              Response?.data?.Role?.as_business
            );
            sessionStorage.setItem(
              "Is_delivery_boy",
              Response?.data?.Role?.is_delivery_boy
            );
          }
          if (Response?.data?.Role?.is_delivery_boy != true) {
            sessionStorage.setItem("token", Response.data.Token);
          }
          // sessionStorage.setItem("token", Response.data.Token);

          // sessionStorage.setItem("token", Response.data.Token);
          // sessionStorage.setItem("Admin_Role", Response?.data?.Role?.is_admin);
          // sessionStorage.setItem("as_individual", Response?.data?.Role?.as_individual);
          let Permission = JSON.stringify(Response?.data?.permission);
          sessionStorage.setItem("Permission_Data", Permission);
          // sessionStorage.setItem("isEmploye", JSON.stringify(Response?.data?.Role?.employee));
          // sessionStorage.setItem("Is_Business", Response?.data?.Role?.as_business)

          sessionStorage.setItem("user_right", Response?.data?.user_type);

          if (Response?.data?.Role?.is_admin === true && Response?.data?.Role?.is_approve == true) {
            navigate("/admin/dashboard");
            toast.success("Login SuccessFully");
            window.location.reload(true);
          } else if (
            Response?.data?.Role?.as_business === true && Response?.data?.Role?.is_approve == true ||
            Response?.data?.Role?.employee === true && Response?.data?.Role?.is_approve == true
          ) {
            // if (Permission.length !== 2) {
            // if (Response?.data?.Role?.is_approve == true) {
            navigate("/admin/dashboard");
            window.location.reload(true);
            toast.success("Login SuccessFully");
            // } else {
            //   toast.warn(
            //     " Your account is under verification, Once it will verify we will inform you on E-mail ! "
            //   );
            //   // sessionStorage.clear();
            // }
          }

          else if (Response?.data?.Role?.is_delivery_boy === true && Response?.data?.Role?.is_approve == true) {



            // const location = window.navigator && window.navigator.geolocation
            // if (location) {
            //   location.getCurrentPosition((position) => {
            //   }, (error) => {
            //   })
            // }


            if ("geolocation" in navigator) {


              navigator.geolocation.getCurrentPosition(

                function (position) {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  // Do something with the latitude and longitude
                  var currentTime = new Date();
                  var currentOffset = currentTime.getTimezoneOffset();
                  var ISTOffset = 330; // IST offset UTC +5:30
                  var ISTTime = new Date(
                    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
                  );

                  // ISTTime now represents the time in IST coordinates

                  var hoursIST = ISTTime.getHours();
                  var minutesIST = ISTTime.getMinutes();
                  const payload = {
                    login_time: hoursIST + ":" + minutesIST,
                    latitude: latitude,
                    longitude: longitude,
                    login_logout: "login",
                  };
                  dispatch(latAndLogAttendence(payload, Response?.data?.Token));
                  toast.success("Login Successfully");
                  sessionStorage.setItem("token", Response?.data?.Token)
                  navigate("/admin/order");
                  window.location.reload(true);

                }
                ,
                function (error) {
                  // Handle any errors that occur during location retrieval
                  switch (error.code) {

                    case error.PERMISSION_DENIED:
                      toast.success("Please Allow location from your device");
                      // console.error("User denied the request for geolocation.");
                      break;
                    case error.POSITION_UNAVAILABLE:
                      console.error("Location information is unavailable.");
                      break;
                    case error.TIMEOUT:
                      console.error(
                        "The request to get user location timed out."
                      );
                      break;
                    default:
                      console.error("An unknown error occurred.");
                  }
                }
              );


            }

            // navigate("/admin/order");


          }
          else {

            // window.location.reload(true);
            toast.warn(
              " Your account is under verification, Once it will verify we will inform you on E-mail ! "
            );
          }

          if (Response?.data?.Role?.as_individual === true) {
            navigate("/profile");
            dispatch(getViewProfile());
            window.location.reload(true);
            toast.success("Login SuccessFully");
          } else if (Response?.data?.message == "Documents Not Uploaded") {
            sessionStorage.setItem("User_Mail", email);

            navigate("/page/kyc");

            toast.warn("Please Complete Your KYC Verification");
          } else if (Response?.data?.message === "Check your email") {
            navigate("/verifyemail");
          }


        })



        .catch((err) => {
          setLoadSpiner((o) => !o);
          if (err?.response?.data?.message === "Verify Phone Number ,Check sms ") {
            navigate("/veryfiyphone");
          }

          toast.warn(err?.response?.data?.message);
        });
    }
  };

  const ForgotEmailFun = () => {
    let forgetSpaceCancelation = forgetemail.replace(/  +/g, "");

    let emailvalidRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const passwordvalidRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (forgetSpaceCancelation.length == 0) {
      toast.warn("Please enter your email");
    } else if (
      forgetSpaceCancelation.length != 0 &&
      !emailvalidRegex.test(forgetSpaceCancelation)
    ) {
      toast.warn("Please enter valid email");
    } else {
      setLoadSpiner((o) => !o);
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/forgot `, {
          email: forgetSpaceCancelation,
        })
        .then((Response) => {
          setLoadSpiner((o) => !o);
          setForgetEmail("");
          toast.success("Please check your email");

          setPopupTure(false);
        })
        .catch((err) => {
          setLoadSpiner((o) => !o);
          toast.warn(err.response.data.message);
        });
    }
  };

  useEffect(() => {
    let keyDownHandler = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        SendOtp();
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [email, password]);

  const signupFun = () => {
    sessionStorage.clear();
    navigate("/signup");
  };

  return (
    <>
      <div className="container-fluid   overflow-hidden">
        <div className="row">
          <div className="col-md-7  carosel_bg d-md-block d-none">
            <div className="accountslider-part">
              <Carosel />
            </div>
          </div>
          <div className="col-md-5 col-sm-12 col-12 account-part">
            <div className="right_part login-part">
              <div className="sign_up ">Sign In</div>
              <div className="sign_up_ ">
                Don't have an Account ?
                <div onClick={(e) => signupFun(e)}>Sign Up</div>
                <br />
                <div className="input_filed text-center mb-3  ">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.636 5.04492H19.363C20.267 5.04492 21 5.77792 21 6.68192V17.3179C21 18.2219 20.267 18.9539 19.364 18.9539H4.636C3.733 18.9549 3 18.2219 3 17.3179V6.68192C3 5.77792 3.733 5.04492 4.636 5.04492Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3.11914 6.07504L10.8131 11.578C11.5081 12.075 12.4421 12.076 13.1381 11.58L20.8761 6.06104"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="input_filed text-center ">
                  <span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 10.3384V7.33838V7.33838C8 5.12938 9.791 3.33838 12 3.33838V3.33838C14.209 3.33838 16 5.12938 16 7.33838V7.33838V10.3384"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 14.3384V17.3384"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M17 21.3384H7C5.895 21.3384 5 20.4434 5 19.3384V12.3384C5 11.2334 5.895 10.3384 7 10.3384H17C18.105 10.3384 19 11.2334 19 12.3384V19.3384C19 20.4434 18.105 21.3384 17 21.3384Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                  <input
                    type={showpassword ? "text" : "password"}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {showpassword ? (
                    <span
                      className="password_eye"
                      onClick={() => setShowPassword((o) => !o)}
                    >
                      <svg
                        width="20"
                        height="16"
                        viewBox="0 0 20 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z"
                          stroke="#828282"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868"
                          stroke="#828282"
                          stroke-width="1.4286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="password_eye"
                      onClick={() => setShowPassword((o) => !o)}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z"
                          stroke="#828282"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706"
                          stroke="#828282"
                          stroke-width="1.4286"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <rect
                          x="16.9229"
                          y="0.598172"
                          width="2.14538"
                          height="22.1961"
                          rx="1.07269"
                          transform="rotate(43.9016 16.9229 0.598172)"
                          fill="#828282"
                          stroke="#F5F5F5"
                          stroke-width="0.5"
                        />
                      </svg>
                    </span>
                  )}
                  <div className="forget_password">
                    <a href="#" onClick={() => setPopupTure((o) => !o)}>
                      {" "}
                      Forget Password?{" "}
                    </a>
                  </div>
                  <div className="button_login_div ">
                    <button className="button_otp" onClick={(e) => SendOtp(e)}>
                      Log in
                    </button>
                  </div>
                  {/* <div className="sign_up_with">
                    <p>Or </p>
                  </div>
                  <div className="verify_logo">
                    <div>
                      <a href={`${process.env.REACT_APP_BASE_URL}/accounts/google/login/`}>
                        <button>
                          <span>
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.4114 6.73969L19.4838 3.66723C17.1283 1.13243 10.2152 -2.04245 4.07031 3.66723L7.11717 6.73969C10.2408 3.76965 14.2606 4.69139 16.4114 6.73969Z" fill="#EB4134" />
                              <path d="M7.14849 6.7151L4.07602 3.69385C-1.99219 10.0692 1.95082 17.2383 4.10162 19.1074L7.14849 16.0093C4.92095 13.9354 4.33206 9.42911 7.14849 6.7151Z" fill="#FBBE04" />
                              <path d="M4.07031 19.0568L7.11717 15.9844C9.9848 19.0568 14.7215 17.9815 16.437 15.9844L19.4838 19.0568C15.5152 23.1535 8.16693 23.4095 4.07031 19.0568Z" fill="#34AA51" />
                              <path d="M11.75 13.578V9.19971H22.4268C23.3741 13.9364 21.0186 17.8282 19.4312 19.1084C18.5948 18.2379 16.8247 16.3944 16.4355 15.9847C17.2139 15.2064 17.7669 14.0559 17.9461 13.578H11.75Z" fill="#4186F7" />
                            </svg>
                          </span>
                          Sign Up With Google
                        </button>
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <LodingSpiner loadspiner={loadspiner} />
        </div>
      </div>
      <Popup open={popupture} position="right center" model>
        <div className="container">
          <div className="popup_cross  " onClick={(e) => setPopupTure(false)}>
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.751 0.142253C10.2999 0.358252 7.21482 1.71105 4.80461 4.0653C3.10406 5.72631 1.95425 7.55466 1.24272 9.72912C0.76706 11.1827 0.566553 12.4717 0.566406 14.0768C0.566151 16.265 0.995626 18.1825 1.91526 20.0992C2.59373 21.5133 3.40241 22.6636 4.5231 23.8089C6.83829 26.1748 9.67308 27.5612 12.9838 27.9467C13.7389 28.0346 15.261 28.0346 16.0162 27.9467C18.8045 27.622 21.2835 26.5699 23.4147 24.8066C23.8376 24.4566 24.6703 23.637 25.0564 23.1906C26.6877 21.3041 27.7673 19.0609 28.2172 16.6225C28.3815 15.7319 28.4336 15.1188 28.4336 14.0768C28.4336 13.0366 28.3814 12.4209 28.2183 11.5376C27.7667 9.0923 26.6936 6.86042 25.0572 4.96309C24.6513 4.49251 23.7517 3.61646 23.3051 3.25677C21.1693 1.537 18.7409 0.520031 16.0345 0.212036C15.5506 0.156977 14.1834 0.11518 13.751 0.142253ZM15.1759 1.83813C17.7879 1.99022 20.1452 2.89367 22.1907 4.5266C22.7012 4.93411 23.6316 5.86489 24.0496 6.38611C24.6565 7.14291 25.2849 8.16079 25.6624 8.9984C26.3932 10.6199 26.7394 12.2523 26.7394 14.0768C26.7394 16.2467 26.2347 18.2133 25.2062 20.0506C24.64 21.0623 24.0146 21.8837 23.1607 22.7376C21.6824 24.2159 20.0113 25.2215 18.0439 25.8165C15.7623 26.5066 13.2377 26.5066 10.956 25.8165C9.44313 25.3589 8.07136 24.6346 6.80924 23.6271C6.2988 23.2196 5.36831 22.2888 4.95035 21.7676C3.47321 19.9256 2.56172 17.716 2.31701 15.384C2.24408 14.6891 2.24408 13.4646 2.31701 12.7697C2.56158 10.4391 3.47296 8.22962 4.95009 6.38611C5.364 5.86953 6.29431 4.93945 6.80924 4.52736C8.988 2.78389 11.4687 1.89366 14.3904 1.80685C14.4808 1.80415 14.8343 1.81821 15.1759 1.83813ZM8.55389 7.75999C8.38115 7.84552 8.23007 8.00643 8.1555 8.18432C8.08963 8.34157 8.09307 8.67656 8.16234 8.8443C8.20154 8.93929 8.98446 9.74662 10.7652 11.5284L13.3121 14.0766L10.7497 16.6434C8.6814 18.7152 8.1787 19.2372 8.14275 19.3507C8.07103 19.5771 8.10995 19.9241 8.22679 20.1007C8.37804 20.3293 8.58107 20.4465 8.85589 20.464C8.98216 20.472 9.14876 20.4586 9.22611 20.4341C9.33962 20.3981 9.86168 19.8954 11.9335 17.8271L14.5002 15.2647L17.0484 17.8116C18.8302 19.5924 19.6375 20.3753 19.7325 20.4145C20.276 20.6389 20.8921 20.2319 20.8921 19.6485C20.8921 19.2802 20.9243 19.3168 18.2161 16.6069L15.6876 14.0768L18.2346 11.5285C20.0155 9.74665 20.7984 8.93929 20.8376 8.8443C21.0115 8.42315 20.804 7.90482 20.3925 7.73237C20.2353 7.6665 19.9003 7.66993 19.7325 7.73921C19.6375 7.77841 18.8302 8.56137 17.0483 10.3423L14.5 12.8893L11.9516 10.3423C10.1698 8.56137 9.36242 7.77841 9.26743 7.73921C9.06944 7.65748 8.74172 7.66705 8.55389 7.75999Z"
                fill="#DCDCDC"
              />
            </svg>
          </div>
          <div>
            <h4>Trouble logging in? </h4>
            <p className="very_email">
              Enter your email and we'll send you a link to get back into your
              account.
            </p>

            <div className="very_email_input">
              <input
                type="email"
                value={forgetemail}
                onChange={(e) => setForgetEmail(e.target.value)}
                placeholder="E-mail Address"
              />
            </div>
          </div>
          <div className="email_next_div ">
            <button
              className="email_next_button font-weight-bold"
              onClick={(e) => ForgotEmailFun(e)}
            >
              {" "}
              Next{" "}
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Login;
