import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from "axios";
import { reactLocalStorage } from 'reactjs-localstorage'; 
import { useDispatch, useSelector } from 'react-redux';
import { getViewProfile } from '../Redux/action/ApiCollection';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";


function Generalinfo() {

    const [restpassword, setRestPassword] = useState(false)
    const [editsavebutton, setEditSaveButton] = useState(false)
    const [changepassword, setChangePassword] = useState(false)
    const [password, setPassword] = useState(false)
    const [confirmshowpassword, setConfirmShowPassword] = useState(false)
    const [showpassword, setShowPassword] = useState(false)
    const [currentpassword, setCurrentPassword] = useState("")
    const [newpassword, setNewPassword] = useState("")
    const [confirmpassword, setConfirmPassword] = useState("")
    const [username, setUserName] = useState("")
    const [contactnumber, setContactNumber] = useState("")
    const [emailaddress, setEmailAddress] = useState("")
    const [userdetails, setUserDetails] = useState("")
    const [patchDataRefresh, setpatchDataRefresh] = useState("")

     const dispatch = useDispatch()
    const navigate = useNavigate();

    const UserData = useSelector(state => state.productReducer.userDetails)
    useEffect(() => {
       
        // // dispatch(getViewProfile())

        UserData && setUserDetails(UserData)
        setUserName(UserData[0]?.username)
        setContactNumber(UserData[0]?.phone_number)
        setEmailAddress(UserData[0]?.email)

        // let BearerToken = sessionStorage.getItem("token", false);

        // axios.post(`${process.env.REACT_APP_BASE_URL}/viewprofile`, {
        //     headers: {
        //         Authorization: `Bearer ${BearerToken}`
        //     }
        // }).then((response) => {
        //     setUserDetails(response.data)
        //     setUserName(response.data[0].username)
        //     setContactNumber(response.data[0].phone_number)
        //     setEmailAddress(response.data[0].email)
        // }).catch((err) => {
        // })
        // var config = {
        //     method: `post`,
        //     url: `${process.env.REACT_APP_BASE_URL}/viewprofile`,
        //     headers: {
        //         authorization: `Bearer  ${BearerToken}`
        //     }
        // };
        // axios(config)
        //     .then((response) => {
        //         setUserDetails(response.data)
        //         setUserName(response.data[0].username)
        //         setContactNumber(response.data[0].phone_number)
        //         setEmailAddress(response.data[0].email)
        //     })
        //     .catch(function (error) {
        //     });

    }, [patchDataRefresh, UserData])

    const ProfileEdit = (e) => {
        e.preventDefault()
        setEditSaveButton(o => !o)

    }
    const ProfileSave = (e) => {
        setEditSaveButton(o => !o)
        e.preventDefault()

        let BearerToken = sessionStorage.getItem("token", false);

        axios.patch(`${process.env.REACT_APP_BASE_URL}/editprofile`, {
            username: username,
            email: emailaddress,
            phone_number: contactnumber

        },
            {
                headers: {
                    Authorization: `Bearer ${BearerToken}`,
                },

            })
            .then((Response) => {
                setpatchDataRefresh(true)
                toast.success("Changes done")

                 

            })
            .catch((err) => {
            })
    }

    const ResetPassword = (e) => {
        e.preventDefault()
        let BearerToken = sessionStorage.getItem("token", false);
        axios.patch(`${process.env.REACT_APP_BASE_URL}/address/resetpassword`, {
            current_pass: currentpassword,
            new_pass: newpassword,
            confirm_pass: confirmpassword
        }, {
            headers: {
                Authorization: `Bearer ${BearerToken}`,
            },
        })
            .then((Response) => {
                toast.success("Yor Updated successfully")

                 

            })
            .catch((err) => {
                toast.warn(err.response.data.message)
                
            })

    }

    return (
        <Layout>
            <section className='generainfo-sec'>
                <div className='container'>
                    <div className='row'>
                        <div className="col-12">
                            <div className='generainfo-part'>
                                <div className='left-part'>
                                    <h2>Gereral Info  <img src="images/icon28.png" alt="img" /></h2>
                                    <form className='row info-form'>
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <label for="#text" className="form-label">User Name</label>
                                            <input type="text" maxLength={40} className="form-control" id="text" placeholder="Name"
                                                onChange={(e) => { editsavebutton && setUserName(e.target.value) }}
                                                value={username} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <label for="#phone" className="form-label">Contact No.</label>
                                            <input type="number" className="form-control" id="phone" placeholder="Mob. NO."
                                                // onChange={(e) => setContactNumber(e.target.value)} 
                                                value={contactnumber} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 mb-3">
                                            <label for="exampleFormControlInput1" className="form-label">Email Address</label>
                                            <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Email"
                                                // onChange={(e) => setEmailAddress(e.target.value)}
                                                value={emailaddress} />
                                        </div>
                                        <div className="col-lg-6 col-md-6 ">

                                            {!editsavebutton ? <span>
                                                <button className='edit_button' onClick={(e) => ProfileEdit(e)}>
                                                    Edit
                                                </button>
                                            </span> :
                                                <span >
                                                    <button className='edit_button' onClick={(e) => ProfileSave(e)}>
                                                        Save
                                                    </button>
                                                </span>}
                                        </div>
                                    </form>
                                    <div className='pwd-part  '>
                                        <h2 >Change Password</h2>
                                        <h5 onClick={() => setRestPassword(o => !o)}>Reset Password</h5>
                                        {restpassword && <form className='row'>
                                            <div className=" col-xl-4 mb-xl-4 mb-3">
                                                <label for="#pwd" className="form-label">Current Password</label>
                                                <div className='d-flex'>
                                                    <input maxLength={15} type={`${changepassword ? "text" : "password"}`} className="form-control " id="pwd" placeholder="Current New Password"
                                                        onChange={(e) => setCurrentPassword(e.target.value)} value={currentpassword} />

                                                    {changepassword ? <span className="password_eye1" onClick={() => setChangePassword(o => !o)}>
                                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </span>
                                                        :
                                                        <span className="password_eye1" onClick={() => setChangePassword(o => !o)}>
                                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                                <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                                            </svg>
                                                        </span>}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 new-pwd mb-xl-4 mb-3">
                                                <label for="#phone" className="form-label">New Password</label>
                                                <div className='d-flex'>
                                                    <input maxLength={15} type={`${showpassword ? "text" : "password"}`} className="form-control" id="phone" placeholder="Enter New Password"
                                                        onChange={(e) => setNewPassword(e.target.value)} value={newpassword} />
                                                    {showpassword ? <span className="password_eye1" onClick={() => setShowPassword(o => !o)}>
                                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </span>
                                                        :
                                                        <span className="password_eye1" onClick={() => setShowPassword(o => !o)}>
                                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                                <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                                            </svg>
                                                        </span>}
                                                </div>
                                            </div>
                                            <div className="col-xl-4 new-pwd mb-xl-4 mb-3">
                                                <label for="exampleFormControlInput1" className="form-label">Confirm New Password</label>
                                                <div className='d-flex'>
                                                    <input maxLength={15} type={`${confirmshowpassword ? "text" : "password"}`} className="form-control" id="exampleFormControlInput1" placeholder="Enter New Password"
                                                        onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword} />
                                                    {confirmshowpassword ? <span className="password_eye1" onClick={() => setConfirmShowPassword(o => !o)}>
                                                        <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                            <path d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                        </svg>
                                                    </span>
                                                        :
                                                        <span className="password_eye1" onClick={() => setConfirmShowPassword(o => !o)}>
                                                            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z" stroke="#828282" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                <path d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706" stroke="#828282" stroke-width="1.4286" stroke-linecap="round" stroke-linejoin="round" />
                                                                <rect x="16.9229" y="0.598172" width="2.14538" height="22.1961" rx="1.07269" transform="rotate(43.9016 16.9229 0.598172)" fill="#828282" stroke="#F5F5F5" stroke-width="0.5" />
                                                            </svg>
                                                        </span>}
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button type="submit" className="btn float-end" onClick={(e) => ResetPassword(e)}>Submit</button>
                                            </div>
                                        </form>}
                                    </div>
                                </div>
                                <div className='right-part'>

                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#addres-tab-pane" type="button" role="tab" aria-controls="addres-tab-pane" aria-selected="true">Saved Address</button>
                                        </li>
                                        <li className="nav-item" role="presentation">
                                            <button className="nav-link" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Orders</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="addres-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <div className='left-part'>
                                                        <h3>Your Place</h3>
                                                        <p>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                                    </div>
                                                    <div className='right-part'>
                                                        <span>Remove</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='left-part'>
                                                        <h3>Your Place</h3>
                                                        <p>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                                    </div>
                                                    <div className='right-part'>
                                                        <span>Remove</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='left-part'>
                                                        <h3>Your Place</h3>
                                                        <p>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                                    </div>
                                                    <div className='right-part'>
                                                        <span>Remove</span>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='left-part'>
                                                        <h3>Your Place</h3>
                                                        <p>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                                    </div>
                                                    <div className='right-part'>
                                                        <span>Remove</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="tab-pane fade" id="orders-tab-pane" role="tabpanel" aria-labelledby="orders-tab" tabindex="0">
                                            <ul>
                                                <li>
                                                    <div className='left-part'>
                                                        <h3>Your Place</h3>
                                                        <p>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                                    </div>
                                                    <div className='right-part'>
                                                        <span>Remove</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >
        </Layout >
    )
}

export default Generalinfo