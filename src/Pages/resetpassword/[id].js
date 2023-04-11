import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useToasts } from "react-toast-notifications";
import Carosel from "../Carosel";

const ResetPassword = () => {


    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [showpassword, setShowPassword] = useState(false)
    const [conformpassword, setConformPassword] = useState(false)
    let useperma = useParams()
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const SendOtp = () => {
        axios
            .patch(`${process.env.REACT_APP_BASE_URL}/changepassword`, {
                password,
                confirm_password: confirmpassword,
            },
                {
                    headers: {
                        Authorization: `Bearer ${useperma.id}`,
                    }

                })
            .then((Response) => {
                console.log(Response);
                reactLocalStorage.set("token", Response.data.Token);
                addToast("Password change SuccessFully", {
                    appearance: "success",
                    autoDismiss: true,
                });
                navigate("/login")
            })
            .catch((err) => {
                console.log(err);
                addToast(err.response.data.message, {
                    appearance: "error",
                    autoDismiss: true,
                });
            });
    };





    return (
        <>
            <div className="container-fluid   ">
                <div className="row">
                    <div className='col-md-7  carosel_bg d-lg-block d-md-block d-none' >
                        <div className="accountslider-part">
                            <Carosel />
                        </div>
                    </div>

                    <div className="col-md-5 col-sm-12 col-12 account-part">
                    <div className="right_part signup-part">
                        <div className="sign_up ">Reset Password</div>
                        <div className="input_filed text-center ">
                            <span>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10.3384V7.33838V7.33838C8 5.12938 9.791 3.33838 12 3.33838V3.33838C14.209 3.33838 16 5.12938 16 7.33838V7.33838V10.3384" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 14.3384V17.3384" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21.3384H7C5.895 21.3384 5 20.4434 5 19.3384V12.3384C5 11.2334 5.895 10.3384 7 10.3384H17C18.105 10.3384 19 11.2334 19 12.3384V19.3384C19 20.4434 18.105 21.3384 17 21.3384Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>

                            </span>
                            <input
                                type={showpassword ? "text" : "password"}
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {showpassword ? <span className="password_eye" onClick={() => setShowPassword(o => !o)}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.11775 12.8054C2.96075 12.5144 2.96075 12.1614 3.11775 11.8704C5.00975 8.37138 8.50475 5.33838 11.9998 5.33838C15.4948 5.33838 18.9898 8.37138 20.8818 11.8714C21.0388 12.1624 21.0388 12.5154 20.8818 12.8064C18.9898 16.3054 15.4948 19.3384 11.9998 19.3384C8.50475 19.3384 5.00975 16.3054 3.11775 12.8054Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.1213 10.2171C15.2929 11.3886 15.2929 13.2881 14.1213 14.4597C12.9497 15.6313 11.0502 15.6313 9.87868 14.4597C8.70711 13.2881 8.70711 11.3886 9.87868 10.2171C11.0502 9.04549 12.9497 9.04549 14.1213 10.2171" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                                :
                                <span className="password_eye" onClick={() => setShowPassword(o => !o)}>
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                        <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                    </svg>
                                </span>}
                        </div>


                        <div className="input_filed text-center mt-4 mb-3">
                            <span >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10.3384V7.33838V7.33838C8 5.12938 9.791 3.33838 12 3.33838V3.33838C14.209 3.33838 16 5.12938 16 7.33838V7.33838V10.3384" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 14.3384V17.3384" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M17 21.3384H7C5.895 21.3384 5 20.4434 5 19.3384V12.3384C5 11.2334 5.895 10.3384 7 10.3384H17C18.105 10.3384 19 11.2334 19 12.3384V19.3384C19 20.4434 18.105 21.3384 17 21.3384Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                            <input
                                type={conformpassword ? "text" : "password"}
                                value={confirmpassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            {conformpassword ? <span className="password_eye" onClick={() => setConformPassword(o => !o)}>
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.11775 12.8054C2.96075 12.5144 2.96075 12.1614 3.11775 11.8704C5.00975 8.37138 8.50475 5.33838 11.9998 5.33838C15.4948 5.33838 18.9898 8.37138 20.8818 11.8714C21.0388 12.1624 21.0388 12.5154 20.8818 12.8064C18.9898 16.3054 15.4948 19.3384 11.9998 19.3384C8.50475 19.3384 5.00975 16.3054 3.11775 12.8054Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M14.1213 10.2171C15.2929 11.3886 15.2929 13.2881 14.1213 14.4597C12.9497 15.6313 11.0502 15.6313 9.87868 14.4597C8.70711 13.2881 8.70711 11.3886 9.87868 10.2171C11.0502 9.04549 12.9497 9.04549 14.1213 10.2171" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                                :
                                <span className="password_eye" onClick={() => setConformPassword(o => !o)}>
                                    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                        <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                    </svg>
                                </span>}
                        </div>
                        <div className="button_login_div ">
                            <button className="button_otp" onClick={(e) => SendOtp(e)}>
                                Reset password
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default ResetPassword;
