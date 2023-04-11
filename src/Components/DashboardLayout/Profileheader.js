import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { reactLocalStorage } from 'reactjs-localstorage';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getViewProfile, PatchUserDetails, ResetPatchPassword } from '../../Redux/action/ApiCollection';

const Profileheader = ({ searchBox }) => {
    const [profiledropdownshow, setProfileDropDownShow] = useState(false)
    const [profiledetailsshow, setProfileDetailsShow] = useState(false)
    const [editusername, setEditUserName] = useState(true)
    const [changepassword, setChangePassword] = useState(false)
    const [confirmshowpassword, setConfirmShowPassword] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [currentpassword, setCurrentPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [username, setUserName] = useState("")
    const [contactnumber, setContactNumber] = useState("")
    const [emailaddress, setEmailAddress] = useState("")
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const UserData = useSelector(state => state.productReducer.userDetails)
    // const ResetPasswordPatchData = useSelector(state => state?.ResetPasswordPatchReducer?.ResetPasswordPatchData)


    // useEffect(() => {
    //     // dispatch(getViewProfile())

    //     if (ResetPasswordPatchData?.data?.message === "Password Updated") {
    //         setCurrentPassword("")
    //         setConfirmPassword("")
    //         setNewPassword("")
    //     }

    // }, [ResetPasswordPatchData])


    // useEffect(() => {
    //     UserData?.data &&
    //         console.log(UserData?.data)
    //     UserData?.data?.map((items, id) => {
    //         console.log(items)
    //         setUserName(items?.username)
    //         setContactNumber(items?.phone_number)
    //         setEmailAddress(items?.email)
    //     })
    // }, [UserData])


    // const UpdateProfile = (e) => {
    //     e.preventDefault()
    //     let payload = {
    //         username: username,
    //         email: emailaddress,
    //         phone_number: contactnumber
    //     }
    //     dispatch(PatchUserDetails(payload))

    // }

    // const ResetPasswordFun = (e) => {

    //     e.preventDefault()
    //     let payload = {
    //         current_pass: currentpassword,
    //         new_pass: newpassword,
    //         confirm_pass: confirmpassword
    //     }
    //     dispatch(ResetPatchPassword(payload))

    // }

    const Logoutfun = () => {
        reactLocalStorage.remove('token')
        
    reactLocalStorage.remove('Admin_Role')
    reactLocalStorage.clear();
        toast.success(" Logout successfully");
        navigate("/")
    }

    const profilefun = () => {
        reactLocalStorage.get('token')
        navigate("/profile")
    }

    return (
        <>
            <header className='profileheader'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-2 col-md-3  col-12'>
                            <a href="/"><img src="/images/logo.png" alt='logo' /></a>
                        </div>
                        <div className='col-lg-10 col-md-9 col-12' >
                            <div className='profileheader-part'>
                                {/* <form style={{ display: `${searchBox}` }}>
                                    <div >
                                        <input type="search" placeholder='Search' className='form-control' />
                                    </div>
                                </form> */}
                                {/* <NavLink to='/shipping' className='btn'>Ship with us</NavLink>   */}
                                <a href="/shipping" className='btn' style={{ display: `${searchBox}` }}>Ship with us</a>

                                {/* <div className='user-box' onClick={() => setProfileDropDownShow(o => !o)} >
                                    <img src="images/icon30.png" alt="img" />
                                    {profiledropdownshow && <ul className="dropdown-menubar">
                                        <li><a href='javascript:void' onClick={() => setProfileDetailsShow(o => !o)}>My Profile</a> </li>
                                        <li><a href='javascript:void' onClick={()=> profilefun()}>My Profile</a> </li>
                                        <li><a href='javascript:void' onClick={() => Logoutfun()}>Log out</a> </li>
                                    </ul>}
                                </div> */}
                                <a className='btn' style={{ display: `${searchBox}` }} onClick={() => Logoutfun()}>Log Out</a>

                            </div>
                        </div>
                    </div>
                </div>
                {/* {profiledetailsshow &&
                    <div className='Profileupdate_part' >
                        <button type='btn' className='close-btn'
                            onClick={() => setProfileDetailsShow(o => !o)}>
                            <img src="images/close.svg" alt="img" /></button>

                        <h4>My Profile</h4>
                        <form className='Profile-form1'>
                            <div className={`${!editusername ? "active-border d-flex form-box " : "d-flex form-box "}' '`}>
                                <label>User Name</label>
                                <input type="text" placeholder='User Name' className='form-control'
                                    onChange={(e) => { !editusername && setUserName(e.target.value) }}
                                    value={username} />
                                {editusername ? <span className="password_eye1" onClick={() => setEditUserName(false)}>
                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.56826 0.0055236C8.43615 0.0338228 8.34605 0.100443 8.09351 0.356544L7.87398 0.579183L7.90976 0.618442C8.16823 0.902078 8.33219 1.07008 8.82335 1.55454L9.39995 2.12329L9.52517 2.00776C9.7405 1.80907 9.8758 1.66981 9.91993 1.60144C10.0041 1.47092 10.0219 1.34133 9.97326 1.21309C9.95462 1.164 9.91267 1.11587 9.64292 0.83408C9.47296 0.656559 9.2673 0.448198 9.18589 0.371056C9.02003 0.213915 8.80153 0.0341086 8.75055 0.0128102C8.71923 -0.000262788 8.61477 -0.00444695 8.56826 0.0055236ZM1.46159 0.32601C0.845709 0.373424 0.262851 0.844602 0.0704981 1.45055C-0.00163685 1.67779 0.0044986 1.38779 0.000905129 4.74176C-0.00258626 7.99412 0.00290604 8.59828 0.0372789 8.7447C0.104177 9.02964 0.241525 9.28068 0.4467 9.49306C0.646669 9.70006 0.890546 9.85407 1.14311 9.93286C1.37565 10.0054 1.07162 9.99996 4.87659 9.99988C8.23337 9.99981 8.31493 9.99935 8.39471 9.98016C8.70424 9.90569 8.97549 9.75149 9.21201 9.51553C9.45529 9.27283 9.59922 9.0049 9.66174 8.67837C9.68616 8.5508 9.69898 6.74664 9.68914 4.82094L9.68101 3.2291L9.19884 3.71L8.71669 4.19089L8.71379 6.21012C8.71101 8.15218 8.71016 8.23186 8.69169 8.29567C8.58887 8.65057 8.32763 8.91042 7.98126 9.00232L7.89448 9.02535H4.84207C1.96198 9.02535 1.78571 9.02434 1.7197 9.00738C1.54597 8.9628 1.41254 8.88943 1.28402 8.76782C1.13448 8.62631 1.04102 8.46913 0.992327 8.27725L0.967622 8.17985V5.15755V2.13524L0.992051 2.03895C1.06524 1.75055 1.26004 1.50968 1.52423 1.38092C1.57477 1.35628 1.65286 1.32574 1.69778 1.31302L1.77945 1.28992L3.7916 1.28473L5.80376 1.27954L5.91502 1.1756C5.97621 1.11843 6.19624 0.901445 6.40396 0.6934L6.78163 0.315142L4.17335 0.316591C2.7388 0.317397 1.51851 0.321632 1.46159 0.32601ZM6.2379 2.20228C5.48143 2.95395 4.7178 3.714 4.54097 3.89127L4.21943 4.21358L4.77066 4.76531C5.07383 5.06876 5.42182 5.41374 5.54395 5.53194L5.76603 5.74683L6.99718 4.52351C7.67431 3.85068 8.44034 3.09022 8.69945 2.83361L9.17058 2.36702L8.39982 1.6018C7.9759 1.18093 7.62552 0.836366 7.62119 0.8361C7.61686 0.835825 6.99438 1.45061 6.2379 2.20228ZM3.69407 5.48156C3.52897 6.05548 3.39178 6.53589 3.38921 6.54914C3.38482 6.57168 3.38673 6.57274 3.4191 6.56581C3.43813 6.56174 3.72702 6.48056 4.0611 6.3854C4.39519 6.29026 4.77648 6.18263 4.90843 6.14622C5.14788 6.08017 5.48962 5.97513 5.52357 5.95716C5.5387 5.94915 5.50284 5.90988 5.29397 5.70569C5.15783 5.57259 4.81289 5.23294 4.52742 4.95089C4.24195 4.66885 4.00521 4.43807 4.00132 4.43807C3.99743 4.43807 3.85918 4.90764 3.69407 5.48156Z" fill="#D8D8D8" />
                                    </svg>

                                </span>
                                    :
                                    <span className="password_eye1" onClick={() => setConfirmShowPassword(o => !o)}>
                                    </span>}
                            </div>
                            <div className='form-box'>
                                <label>Contact No.</label>
                                <input type="tel" placeholder='Mon. no.' className='form-control'
                                    value={contactnumber} />
                            </div>
                            <div className='form-box'>
                                <label>Email</label>
                                <input type="email" placeholder='email' className='form-control'
                                    value={emailaddress} />
                            </div>
                            {!editusername && <input type="submit" value="Update Profile"
                                onClick={(e) => { UpdateProfile(e); setEditUserName(true) }} />}
                        </form>

                        <h5>Change Password</h5>
                        <form className='Profile-form2'>
                            <div className='form-box d-flex'>
                                <label>Current Password</label>
                                <input type={changepassword ? "text" : "password"} placeholder='Enter Current Password' className='form-control'
                                    onChange={(e) => setCurrentPassword(e.target.value)} value={currentpassword} />
                                {changepassword ? <span className="password_eye1" onClick={() => setChangePassword(o => !o)}>
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                    :
                                    <span className="password_eye1" onClick={() => setChangePassword(o => !o)}>
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                        </svg>
                                    </span>

                                }
                            </div>
                            <div className='form-box d-flex'>
                                <label>New Password</label>
                                <input type={showpassword ? "text" : "password"} placeholder='Enter New Password' className='form-control'
                                    onChange={(e) => setNewPassword(e.target.value)} value={newpassword} />
                                {showpassword ? <span className="password_eye1" onClick={() => setShowPassword(o => !o)}>
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                    :
                                    <span className="password_eye1" onClick={() => setShowPassword(o => !o)}>
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                        </svg>
                                    </span>}
                            </div>
                            <div className='form-box d-flex'>
                                <label>Confrim New Password</label>
                                <input type={confirmshowpassword ? "text" : "password"} placeholder='Enter Confrim   New Password' className='form-control'
                                    onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword} />
                                {confirmshowpassword ? <span className="password_eye1" onClick={() => setConfirmShowPassword(o => !o)}>
                                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>
                                    :
                                    <span className="password_eye1" onClick={() => setConfirmShowPassword(o => !o)}>
                                        <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                            <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                        </svg>
                                    </span>}
                            </div>
                            <input type="submit" value="Submit" onClick={(e) => ResetPasswordFun(e)} />
                        </form>
                    </div>} */}
            </header>

        </>
    )
}

export default Profileheader