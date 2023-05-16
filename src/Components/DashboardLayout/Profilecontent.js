import React, { useEffect, useState } from "react";
import { actionType } from "../.././Redux/type/types";

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";
import {
  DeleteUserAddress,
  getOrderAddress,
  getViewProfile,
  PatchUserDetails,
  ResetPatchPassword,
  PostCreateTicket,
  GetCustomerOrderDetail,
  PostOrderDownloadInvoiceFile,
  PostOrderDownloadLabelGenerationFile,
  PostCreateFeedback,
} from "../../Redux/action/ApiCollection";
import { set } from "date-fns";

const OrderDetails = () => {

  let BearerToken = reactLocalStorage.get("token", false);


  const [getinvoice, setGetInvoice]= useState("")
  const [downloadinvoice, setDownloadInvoice] = useState(false);
  const [raiseissue, setRaiseIssue] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [rating, setRating] = useState("");
  const [fedescription, setFeDescription] = useState("");
  const [orderid, setOrderId] = useState();
  const [orderidd, setOrderIdd] = useState();
  const [title, setTilte] = useState();
  const [description, setDescription] = useState();
  const [profiledropdownshow, setProfileDropDownShow] = useState(false);
  const [profiledetailsshow, setProfileDetailsShow] = useState(false);
  const [editusername, setEditUserName] = useState(true);
  const [changepassword, setChangePassword] = useState(false);
  const [confirmshowpassword, setConfirmShowPassword] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [currentpassword, setCurrentPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [emailaddress, setEmailAddress] = useState("");

  // label-generation
  const [getlabelgeneration, setLabelGeneration]= useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserData = useSelector((state) => state.productReducer.userDetails);
  const OrderDetails = useSelector(
    (state) => state.orderDetailsReducer.orderDetails
  );
  const ResetPasswordPatchData = useSelector(
    (state) => state?.ResetPasswordPatchReducer?.ResetPasswordPatchData
  );
  const DeleteUserAddressData = useSelector(
    (state) => state?.DeleteUserAddressReducer?.DeleteUserAddressData
  );
  const PostCreateTicketData = useSelector(
    (state) => state.PostCreateTicketReducer?.PostCreateTicketData
  );
  const PostCreateFeedbackData = useSelector(
    (state) => state.PostCreateFeedbackReducer?.PostCreateFeedbackData
  );

 let GetCustomerOrderDetailData = useSelector(
    (state) =>
      state.GetCustomerOrderDetailReducer?.GetCustomerOrderDetailData?.data
  );

  const PostOrderDownloadInvoiceFileData = useSelector(
    (state) =>
      state.PostOrderDownloadInvoiceFileReducer.PostOrderDownloadInvoiceFileData
  );

  const PostOrderDownloadLabelGenerationFileData = useSelector(
    (state) =>
      state.PostOrderDownloadLabelGenerationFileReducer.PostOrderDownloadLabelGenerationFileData
  );

  GetCustomerOrderDetailData?.sort((a,b)=>{return new Date(b.pickupdate) - new Date(a.pickupdate)})


  useEffect(() => {
    if (PostCreateTicketData?.data?.message === "Raised an issue") {
      setOrderId("");
      setTilte("");
      setDescription("");
      setRaiseIssue((o) => !o);
    }
  }, [PostCreateTicketData]);

  useEffect(() => {
    dispatch(getViewProfile());

    if (ResetPasswordPatchData?.data?.message === "Password Updated") {
      setCurrentPassword("");
      setConfirmPassword("");
      setNewPassword("");
    }

    if (ResetPasswordPatchData.status === 200) {
      // reactLocalStorage.remove('token')
      // navigate("/login")
      // dispatch(ResetPasswordPatchData([]))
    } else {
      navigate("/profile");
    }
  }, [ResetPasswordPatchData]);
  useEffect(() => {
    UserData?.data && 
    UserData?.data?.map((items, id) => {
      setUserName(items?.username);
      setContactNumber(items?.phone_number);
      setEmailAddress(items?.email);
    });
    if (DeleteUserAddressData.status == 200) {
      dispatch(getOrderAddress());
    }
  }, [UserData, DeleteUserAddressData]);
  const UpdateProfile = (e) => {
    e.preventDefault();
    let payload = {
      username: username,
      email: emailaddress,
      phone_number: contactnumber,
    };
    dispatch(PatchUserDetails(payload));
  };
  const ResetPasswordFun = (e) => {
    e.preventDefault();
    let payload = {
      current_pass: currentpassword,
      new_pass: newpassword,
      confirm_pass: confirmpassword,
    };
    dispatch(ResetPatchPassword(payload));
  };
  const Logoutfun = () => {
    // if(ResetPasswordPatchData.status === 200){
    //     reactLocalStorage.remove('token')
    //     navigate("/login")
    // }else{
    //     navigate("/profile")
    // }
  };
  useEffect(() => {
    let payload ={
        "page_type":"pickup"
    }
    dispatch(getOrderAddress(payload));
    dispatch(GetCustomerOrderDetail());
  }, [PostOrderDownloadInvoiceFileData]);
  const DalateAddress = (itemID) => {
    let payload = {
      id: itemID,
    };
    dispatch(DeleteUserAddress(payload));
  };
  const orderStatusBackground = status => {
    switch (status) {
      case 'PENDING':
        return '#FFA500'
      case 'BOOKED':
        return '#20A253';
      case 'DELIVERED':
        return '#20A253';
      default:
        return '#6F7FBC';
    }
  };
  const RaiseTicket = () => {
    let payload = {
      order_id: orderid,
      title: title,
      description: description,
    };
    orderid && orderid.length === 0
      ? toast.warn("Fill Order Id")
      : title && description
      ? dispatch(PostCreateTicket(payload))
      : toast.warn("Please Fill all the fields Correctly");
  };
  const Invoice = (e, item) => {
    let payload = {
      product_order_id: item.product_order_id,
      request_type: "get",
    };
    setGetInvoice(item.product_order_id,)
    dispatch(PostOrderDownloadInvoiceFile(payload));
  };
  // useEffect(()=>{
  //   if (PostOrderDownloadInvoiceFileData?.status === 201) {
  //     let payloadd = {
  //       product_order_id: getinvoice,
  //       request_type: "get",
  //     };
  //     dispatch(PostOrderDownloadInvoiceFile(payloadd));
  //   }
  // },[PostOrderDownloadInvoiceFileData])
// label generation
const LabelGeneration=(e,item)=>{
  let payload = {
    product_order_id: item.product_order_id,
    request_type: "get",
  };
  setLabelGeneration(item.product_order_id)
  dispatch(PostOrderDownloadLabelGenerationFile(payload))
  // if(!item.status==200){
  //   toast.warn("label is downloaded after booking the order");
  // }
  // else if(item.status=='IN_TRANSIT'){
  //   toast.warn("label is downloaded after booking the status");
  // }
}



  const RaiseIssue = (e, item) => {
    setOrderId(item.product_order_id);
    setRaiseIssue((o) => !o);
  };

  const Rating = (e, item) => {
    setOrderIdd(item?.product_order_id);
    setFeedback((o) => !o);
  };

  const RatingChanged = (newRating) => {
    setRating(newRating);
  };

  const Feedback = () => {
    let payload = {
      order_id: orderidd,
      rating: rating,
      description: fedescription,
    };
    orderidd && rating && fedescription
      ? dispatch(PostCreateFeedback(payload))
      : toast.warn("Please Fill all the fields Correctly");
  };

  useEffect(() => {
    if (PostCreateFeedbackData?.status === 200) {
      setOrderIdd("");
      setRating("");
      setFeDescription("");
      setFeedback((o) => !o);
    }
  }, [PostCreateFeedbackData]);


  // useEffect(() => {
  //   if (PostOrderDownloadInvoiceFileData?.data?.name) { 
  //     window.open(`${PostOrderDownloadInvoiceFileData?.data?.name}`); 
  //   }

  // }, [PostOrderDownloadInvoiceFileData])

  
  // useEffect(() => {
  //   if (PostOrderDownloadLabelGenerationFileData?.data?.name) { 
  //     window.open(`${PostOrderDownloadLabelGenerationFileData?.data?.name}`); 
  //   }

  // }, [PostOrderDownloadLabelGenerationFileData])

  return (
    <>
      <div className="container profile-content">
        <div className="row">
          <div className="col-sm-3 text-center">
            <div className="profile-img">
              <img src="images/user.png" alt="img" />
            </div>
          </div>
          <div className="col-sm-9">
            <div className="Profileupdate_part">
              <form className="profile-form1 row">
                <div className="col-6">
                  <h2>My Profile</h2>
                </div>
                <div
                  type="button"
                  className="col-6 text-end"
                  // onClick={() => setRaiseIssue((o) => !o)}
                ></div>

                <div className="col-lg-4 ">
                  <div
                    className={`${
                      !editusername ? "active-border  form-box " : " form-box "
                    }' '`}
                  >
                    <label>User Name</label>
                    <input
                      type="text"
                      placeholder="User Name"
                      className="form-control"
                      onChange={(e) => {
                        !editusername && setUserName(e.target.value);
                      }}
                      value={username}
                    />
                    {editusername ? (
                      <span
                        className="password_eye1"
                        onClick={() => setEditUserName(false)}
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.56826 0.0055236C8.43615 0.0338228 8.34605 0.100443 8.09351 0.356544L7.87398 0.579183L7.90976 0.618442C8.16823 0.902078 8.33219 1.07008 8.82335 1.55454L9.39995 2.12329L9.52517 2.00776C9.7405 1.80907 9.8758 1.66981 9.91993 1.60144C10.0041 1.47092 10.0219 1.34133 9.97326 1.21309C9.95462 1.164 9.91267 1.11587 9.64292 0.83408C9.47296 0.656559 9.2673 0.448198 9.18589 0.371056C9.02003 0.213915 8.80153 0.0341086 8.75055 0.0128102C8.71923 -0.000262788 8.61477 -0.00444695 8.56826 0.0055236ZM1.46159 0.32601C0.845709 0.373424 0.262851 0.844602 0.0704981 1.45055C-0.00163685 1.67779 0.0044986 1.38779 0.000905129 4.74176C-0.00258626 7.99412 0.00290604 8.59828 0.0372789 8.7447C0.104177 9.02964 0.241525 9.28068 0.4467 9.49306C0.646669 9.70006 0.890546 9.85407 1.14311 9.93286C1.37565 10.0054 1.07162 9.99996 4.87659 9.99988C8.23337 9.99981 8.31493 9.99935 8.39471 9.98016C8.70424 9.90569 8.97549 9.75149 9.21201 9.51553C9.45529 9.27283 9.59922 9.0049 9.66174 8.67837C9.68616 8.5508 9.69898 6.74664 9.68914 4.82094L9.68101 3.2291L9.19884 3.71L8.71669 4.19089L8.71379 6.21012C8.71101 8.15218 8.71016 8.23186 8.69169 8.29567C8.58887 8.65057 8.32763 8.91042 7.98126 9.00232L7.89448 9.02535H4.84207C1.96198 9.02535 1.78571 9.02434 1.7197 9.00738C1.54597 8.9628 1.41254 8.88943 1.28402 8.76782C1.13448 8.62631 1.04102 8.46913 0.992327 8.27725L0.967622 8.17985V5.15755V2.13524L0.992051 2.03895C1.06524 1.75055 1.26004 1.50968 1.52423 1.38092C1.57477 1.35628 1.65286 1.32574 1.69778 1.31302L1.77945 1.28992L3.7916 1.28473L5.80376 1.27954L5.91502 1.1756C5.97621 1.11843 6.19624 0.901445 6.40396 0.6934L6.78163 0.315142L4.17335 0.316591C2.7388 0.317397 1.51851 0.321632 1.46159 0.32601ZM6.2379 2.20228C5.48143 2.95395 4.7178 3.714 4.54097 3.89127L4.21943 4.21358L4.77066 4.76531C5.07383 5.06876 5.42182 5.41374 5.54395 5.53194L5.76603 5.74683L6.99718 4.52351C7.67431 3.85068 8.44034 3.09022 8.69945 2.83361L9.17058 2.36702L8.39982 1.6018C7.9759 1.18093 7.62552 0.836366 7.62119 0.8361C7.61686 0.835825 6.99438 1.45061 6.2379 2.20228ZM3.69407 5.48156C3.52897 6.05548 3.39178 6.53589 3.38921 6.54914C3.38482 6.57168 3.38673 6.57274 3.4191 6.56581C3.43813 6.56174 3.72702 6.48056 4.0611 6.3854C4.39519 6.29026 4.77648 6.18263 4.90843 6.14622C5.14788 6.08017 5.48962 5.97513 5.52357 5.95716C5.5387 5.94915 5.50284 5.90988 5.29397 5.70569C5.15783 5.57259 4.81289 5.23294 4.52742 4.95089C4.24195 4.66885 4.00521 4.43807 4.00132 4.43807C3.99743 4.43807 3.85918 4.90764 3.69407 5.48156Z"
                            fill="#D8D8D8"
                          />
                        </svg>
                      </span>
                    ) : (
                      <span
                        className="password_eye1"
                        onClick={() => setConfirmShowPassword((o) => !o)}
                      ></span>
                    )}
                  </div>
                </div>
                <div className="col-lg-4 mt-lg-0 mt-3 ">
                  <div className="form-box">
                    <label>Contact No.</label>
                    <input
                      type="tel"
                      placeholder="Mon. no."
                      className="form-control"
                      value={contactnumber}
                    />
                  </div>
                </div>

                <div className="col-lg-4 mt-lg-0 mt-3">
                  <div className="form-box">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="email"
                      className="form-control"
                      value={emailaddress}
                    />
                  </div>
                </div>
                <div className="col-lg-4 text-end">
                  {!editusername && (
                    <input
                      type="submit"
                      value="Update Profile"
                      onClick={(e) => {
                        UpdateProfile(e);
                        setEditUserName(true);
                      }}
                    />
                  )}
                </div>
              </form>
              <div className="changepass-part">
                <div className="row">
                  <div className="col-12">
                    <h5>Change Password</h5>
                  </div>
                  <form className="Profile-form2">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="form-box d-flex">
                          <label>Current Password</label>
                          <input
                            type={changepassword ? "text" : "password"}
                            placeholder="Enter Current Password"
                            className="form-control"
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            value={currentpassword}
                          />
                          {changepassword ? (
                            <span
                              className="password_eye1"
                              onClick={() => setChangePassword((o) => !o)}
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
                              className="password_eye1"
                              onClick={() => setChangePassword((o) => !o)}
                            >
                              <svg
                                width="20"
                                height="18"
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
                        </div>
                      </div>
                      <div className="col-lg-4 mt-lg-0 mt-3">
                        <div className="form-box d-flex">
                          <label>New Password</label>
                          <input
                            type={showpassword ? "text" : "password"}
                            placeholder="Enter New Password"
                            className="form-control"
                            onChange={(e) => setNewPassword(e.target.value)}
                            value={newpassword}
                          ></input>

                          {showpassword ? (
                            <span
                              className="password_eye1"
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
                              className="password_eye1"
                              onClick={() => setShowPassword((o) => !o)}
                            >
                              <svg
                                width="20"
                                height="18"
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
                        </div>
                      </div>
                      <div className="col-lg-4 mt-lg-0 mt-3">
                        <div className="form-box d-flex">
                          <label>Confrim New Password</label>
                          <input
                            type={confirmshowpassword ? "text" : "password"}
                            placeholder="Enter Confrim   New Password"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmpassword}
                          />
                          {confirmshowpassword ? (
                            <span
                              className="password_eye1"
                              onClick={() => setConfirmShowPassword((o) => !o)}
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
                              className="password_eye1"
                              onClick={() => setConfirmShowPassword((o) => !o)}
                            >
                              <svg
                                width="20"
                                height="18"
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
                        </div>
                      </div>
                      <div className="col-12 text-end">
                        <input
                          type="submit"
                          value="Submit"
                          onClick={(e) =>
                            `${ResetPasswordFun(e)} ${Logoutfun(e)}}`
                          }
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {*********************************Raise A ticket*********************************************} */}

        {raiseissue && (
          <div className="popupouter raised-popup">
            <div className="popupinner">
              <h2>Raised A Query</h2>
              <div
                className="close-btn"
                type="button"
                onClick={(e) => setRaiseIssue((o) => !o)}
              >
                <svg
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                    fill="black"
                  />
                </svg>
              </div>
              <div className="popup-body">
                <div className="row mx-auto">
                  <div className="col-6">
                    <label>Order Id</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Order Id"
                      value={orderid}
                      // onChange={(e) => setOrderId(e.target.value)}
                    />
                  </div>
                  <div className="col-6">
                    <label>Title</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTilte(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                    <label>Description</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder="Your Query"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="btngroups text-end my-3">
                    <button
                      type="button"
                      className="btn save-btn"
                      onClick={(e) => RaiseTicket(e)}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* {*********************************************share feedback********************************************************} */}

        {feedback && (
          <div className="popupouter sharefeedback-popup">
            <div className="popupinner">
              <h4>Share your Feedback</h4>
              <p>How satisfied are you with our services...!</p>
              <div
                className="close-btn"
                type="button"
                onClick={() => setFeedback((o) => !o)}
              >
                <svg
                  viewBox="0 0 10 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                    fill="black"
                  ></path>
                </svg>
              </div>
              <div className="popup-body">
                <ReactStars
                  count={5}
                  onChange={RatingChanged}
                  size={30}
                  activeColor="#ffd700"
                />
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Describe what you like the most..."
                  value={fedescription}
                  onChange={(e) => setFeDescription(e.target.value)}
                ></textarea>
                <div className="btngroups text-end my-3">
                  <button
                    type="button"
                    className="btn save-btn"
                    onClick={(e) => Feedback(e)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="profiletab-part">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <ul className=" nav-pills" id="pills-tab" role="tablist">
                <li className="nav-item mb-md-3 mb-0" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    All Orders
                  </button>
                </li> 
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Saved Address
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content col-md-9" id="pills-tabContent">
              <div
                className="tab-pane fade show active tabtable-part"
                id="pills-home"
                role="tabpanel"
                aria-labelledby="pills-home-tab"
                tabindex="0"
              >
                <ul className="order-list">
                  {/* <li>
                                        <p className='left-part'> Order I’d : </p>
                                        <p className='right-part'> IE2228556-660834</p>
                                        <p className='left-part'> Product : </p>
                                        <p className='right-part'> Sorbet DEIBBETYU083 </p>
                                        <p className='left-part'> Address : </p>
                                        <p className='right-part'>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Status  : </p>
                                        <p className='right-part'> <a href="javascript:void" className='btn btn-success'>Delivered</a>
                                        </p>
                                    </li>

                                    <li>
                                        <p className='left-part'> Order I’d : </p>
                                        <p className='right-part'> IE2228556-660834</p>
                                        <p className='left-part'> Product : </p>
                                        <p className='right-part'> Sorbet DEIBBETYU083 </p>
                                        <p className='left-part'> Address : </p>
                                        <p className='right-part'>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Status  : </p>
                                        <p className='right-part'> <a href="javascript:void" className='btn btn-success'>Delivered</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p className='left-part'> Order I’d : </p>
                                        <p className='right-part'> IE2228556-660834</p>
                                        <p className='left-part'> Product : </p>
                                        <p className='right-part'> Sorbet DEIBBETYU083 </p>
                                        <p className='left-part'> Address : </p>
                                        <p className='right-part'>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Status  : </p>
                                        <p className='right-part'> <a href="javascript:void" className='btn btn-success'>Delivered</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p className='left-part'> Order I’d : </p>
                                        <p className='right-part'> IE2228556-660834</p>
                                        <p className='left-part'> Product : </p>
                                        <p className='right-part'> Sorbet DEIBBETYU083 </p>
                                        <p className='left-part'> Address : </p>
                                        <p className='right-part'>GT Rd, D-Block, Crystal Court, Malviya Nagar, Jaipur, Rajasthan 302017, India. 7896541569</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Delivered : </p>
                                        <p className='right-part'>05/09/2022</p>
                                        <p className='left-part'> Status  : </p>
                                        <p className='right-part'> <a href="javascript:void" className='btn btn-success'>Delivered</a>
                                        </p>
                                    </li> */}
                </ul>

                <div className="order-container">
                  {GetCustomerOrderDetailData &&
                    GetCustomerOrderDetailData?.map((item, id) => {
                      return (
                        <div className="col-sm-2  order-details">
                          <div className="d-flex">
                            <p> Order I’d : </p>
                            <p>{item.product_order_id}</p>
                          </div>
                          <div className="d-flex">
                            <p> Product : </p>
                            <p>{item.product_type} </p>
                          </div>
                          <div className="d-flex">
                            <p className="d-flex"> Address : </p>
                            <p>
                              {`${item?.address?.address}, ${item?.address?.pincode} `}
                            </p>
                          </div>

                          <div className="d-flex">
                            <p> Pick Up : </p>
                            <p>{item.pickupdate}</p>
                          </div>
                          <div className="d-flex space-between">
                            <div className="d-flex">

                              <p> Status : </p>
                              <p style={{backgroundColor:`${orderStatusBackground(item.status)}`,padding:"2px 6px",borderRadius:"4px"}}> {item.status}</p>
                              </div>
                              <div className="d-flex px-2 download_icon_profile" >
                              {/* <div  className="level-generation">
                                  {" "}
                                  <svg
                                    width="30"
                                    height="25"
                                    viewBox="0 0 19 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => Invoice(e, item)}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.7751 16.4426C9.65576 16.2739 8.77539 15.8202 7.94874 14.9865C7.60748 14.6425 7.25418 14.2541 7.16344 14.1234C7.0184 13.9145 6.97688 13.8974 6.81923 13.9818C6.25186 14.2854 5.16495 14.2465 4.4821 13.8981C3.67224 13.485 3.02133 12.5645 2.9048 11.6676C2.85468 11.2817 2.81864 11.2265 2.44348 10.9623C1.70609 10.4429 1.11702 9.60511 0.77347 8.58731C0.548913 7.92183 0.569387 6.59684 0.815318 5.88476C1.07206 5.14132 1.46958 4.51957 2.025 3.99249C2.9749 3.09123 4.04437 2.69084 5.50211 2.69084H6.30796V3.26411V3.83738H5.54715C5.12875 3.83738 4.5726 3.89307 4.31135 3.96112C2.48001 4.43808 1.32938 6.41496 1.85367 8.1834C2.13662 9.13781 2.60768 9.74851 3.49133 10.3065L4.01489 10.6372V11.1589C4.01489 12.2426 4.74925 13.0518 5.72609 13.0445C6.08946 13.0417 6.30837 12.9781 6.77681 12.7387C7.10226 12.5724 7.40135 12.4364 7.44139 12.4364C7.48152 12.4364 7.68962 12.7381 7.90386 13.107C8.4234 14.0011 9.01329 14.5792 9.77533 14.9411C11.3501 15.689 13.0518 15.4236 14.2869 14.2376C15.1422 13.4163 15.5584 12.4086 15.5609 11.1524L15.5621 10.5647L16.0404 10.2741C18.1215 9.00997 18.4562 6.35943 16.7396 4.73602C16.0059 4.04212 15.1797 3.75548 13.9131 3.75548H13.2691V3.17018V2.58487L14.2313 2.63253C15.7674 2.7087 16.6781 3.07682 17.617 4.00117C19.0407 5.40281 19.3863 7.59687 18.4686 9.40782C18.198 9.94186 17.61 10.6267 17.1339 10.9623C16.7348 11.2436 16.7262 11.2588 16.6685 11.7798C16.5897 12.4913 16.3444 13.2704 16.0078 13.8784C15.0113 15.6786 12.8221 16.7515 10.7751 16.4426ZM8.09058 8.48691L6.40476 6.25329L7.50183 6.23053L8.5989 6.20776L8.62044 3.32324L8.64198 0.43872H9.78852H10.9351L10.9566 3.32324L10.9781 6.20776L12.0788 6.23053L13.1794 6.25329L11.5389 8.42352C10.6366 9.61715 9.8709 10.6223 9.83733 10.6571C9.80375 10.692 9.01772 9.71542 8.09058 8.48691Z"
                                      fill="black"
                                    />
                                  </svg>
                                </div> */}
                            
                                <div  className="label-generation">
                                  {" "}
                                  <svg
                                    width="33"
                                    height="25"
                                    viewBox="0 0 19 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => LabelGeneration(e, item)}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.7751 16.4426C9.65576 16.2739 8.77539 15.8202 7.94874 14.9865C7.60748 14.6425 7.25418 14.2541 7.16344 14.1234C7.0184 13.9145 6.97688 13.8974 6.81923 13.9818C6.25186 14.2854 5.16495 14.2465 4.4821 13.8981C3.67224 13.485 3.02133 12.5645 2.9048 11.6676C2.85468 11.2817 2.81864 11.2265 2.44348 10.9623C1.70609 10.4429 1.11702 9.60511 0.77347 8.58731C0.548913 7.92183 0.569387 6.59684 0.815318 5.88476C1.07206 5.14132 1.46958 4.51957 2.025 3.99249C2.9749 3.09123 4.04437 2.69084 5.50211 2.69084H6.30796V3.26411V3.83738H5.54715C5.12875 3.83738 4.5726 3.89307 4.31135 3.96112C2.48001 4.43808 1.32938 6.41496 1.85367 8.1834C2.13662 9.13781 2.60768 9.74851 3.49133 10.3065L4.01489 10.6372V11.1589C4.01489 12.2426 4.74925 13.0518 5.72609 13.0445C6.08946 13.0417 6.30837 12.9781 6.77681 12.7387C7.10226 12.5724 7.40135 12.4364 7.44139 12.4364C7.48152 12.4364 7.68962 12.7381 7.90386 13.107C8.4234 14.0011 9.01329 14.5792 9.77533 14.9411C11.3501 15.689 13.0518 15.4236 14.2869 14.2376C15.1422 13.4163 15.5584 12.4086 15.5609 11.1524L15.5621 10.5647L16.0404 10.2741C18.1215 9.00997 18.4562 6.35943 16.7396 4.73602C16.0059 4.04212 15.1797 3.75548 13.9131 3.75548H13.2691V3.17018V2.58487L14.2313 2.63253C15.7674 2.7087 16.6781 3.07682 17.617 4.00117C19.0407 5.40281 19.3863 7.59687 18.4686 9.40782C18.198 9.94186 17.61 10.6267 17.1339 10.9623C16.7348 11.2436 16.7262 11.2588 16.6685 11.7798C16.5897 12.4913 16.3444 13.2704 16.0078 13.8784C15.0113 15.6786 12.8221 16.7515 10.7751 16.4426ZM8.09058 8.48691L6.40476 6.25329L7.50183 6.23053L8.5989 6.20776L8.62044 3.32324L8.64198 0.43872H9.78852H10.9351L10.9566 3.32324L10.9781 6.20776L12.0788 6.23053L13.1794 6.25329L11.5389 8.42352C10.6366 9.61715 9.8709 10.6223 9.83733 10.6571C9.80375 10.692 9.01772 9.71542 8.09058 8.48691Z"
                                      fill="black"
                                    />
                                  </svg>
                                </div>
                            
                                <span role="button" className="invoice">
                                  {" "}
                                  <svg
                                    width="33"
                                    height="25"
                                    viewBox="0 0 19 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => Invoice(e, item)}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M10.7751 16.4426C9.65576 16.2739 8.77539 15.8202 7.94874 14.9865C7.60748 14.6425 7.25418 14.2541 7.16344 14.1234C7.0184 13.9145 6.97688 13.8974 6.81923 13.9818C6.25186 14.2854 5.16495 14.2465 4.4821 13.8981C3.67224 13.485 3.02133 12.5645 2.9048 11.6676C2.85468 11.2817 2.81864 11.2265 2.44348 10.9623C1.70609 10.4429 1.11702 9.60511 0.77347 8.58731C0.548913 7.92183 0.569387 6.59684 0.815318 5.88476C1.07206 5.14132 1.46958 4.51957 2.025 3.99249C2.9749 3.09123 4.04437 2.69084 5.50211 2.69084H6.30796V3.26411V3.83738H5.54715C5.12875 3.83738 4.5726 3.89307 4.31135 3.96112C2.48001 4.43808 1.32938 6.41496 1.85367 8.1834C2.13662 9.13781 2.60768 9.74851 3.49133 10.3065L4.01489 10.6372V11.1589C4.01489 12.2426 4.74925 13.0518 5.72609 13.0445C6.08946 13.0417 6.30837 12.9781 6.77681 12.7387C7.10226 12.5724 7.40135 12.4364 7.44139 12.4364C7.48152 12.4364 7.68962 12.7381 7.90386 13.107C8.4234 14.0011 9.01329 14.5792 9.77533 14.9411C11.3501 15.689 13.0518 15.4236 14.2869 14.2376C15.1422 13.4163 15.5584 12.4086 15.5609 11.1524L15.5621 10.5647L16.0404 10.2741C18.1215 9.00997 18.4562 6.35943 16.7396 4.73602C16.0059 4.04212 15.1797 3.75548 13.9131 3.75548H13.2691V3.17018V2.58487L14.2313 2.63253C15.7674 2.7087 16.6781 3.07682 17.617 4.00117C19.0407 5.40281 19.3863 7.59687 18.4686 9.40782C18.198 9.94186 17.61 10.6267 17.1339 10.9623C16.7348 11.2436 16.7262 11.2588 16.6685 11.7798C16.5897 12.4913 16.3444 13.2704 16.0078 13.8784C15.0113 15.6786 12.8221 16.7515 10.7751 16.4426ZM8.09058 8.48691L6.40476 6.25329L7.50183 6.23053L8.5989 6.20776L8.62044 3.32324L8.64198 0.43872H9.78852H10.9351L10.9566 3.32324L10.9781 6.20776L12.0788 6.23053L13.1794 6.25329L11.5389 8.42352C10.6366 9.61715 9.8709 10.6223 9.83733 10.6571C9.80375 10.692 9.01772 9.71542 8.09058 8.48691Z"
                                      fill="black"
                                    />
                                  </svg>
                                </span>
                                <span role="button" className="query">

                                  <svg
                                    width="35"
                                    height="25"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => RaiseIssue(e, item)}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M7.26122 0.0195602C4.13227 0.343208 1.45513 2.57904 0.43759 5.71826C-0.432557 8.40281 0.00997402 11.3437 1.63167 13.6538C1.92171 14.067 2.77263 14.9712 3.164 15.2823C4.27872 16.168 5.49913 16.708 6.90699 16.9382C7.41071 17.0206 8.592 17.0206 9.09572 16.9382C10.0061 16.7893 10.7209 16.553 11.519 16.1368C13.0768 15.3245 14.3028 14.051 15.0992 12.418C15.7409 11.1022 16.0464 9.66328 15.9943 8.2016C15.9162 6.01074 15.104 4.02445 13.6567 2.48477C12.4236 1.17302 10.8878 0.354185 9.12699 0.0697872C8.7363 0.00668743 7.66467 -0.0221515 7.26122 0.0195602ZM8.65798 3.54543C9.68468 3.71407 10.4849 4.27362 10.8572 5.08321C11.0484 5.49896 11.1102 5.81605 11.0881 6.26913C11.0693 6.65391 11.007 6.89005 10.8423 7.20052C10.6595 7.54506 10.494 7.73775 9.77933 8.43794C9.38632 8.82295 9.01577 9.20162 8.95586 9.27939C8.81344 9.4643 8.71513 9.70878 8.62693 10.0976C8.58747 10.2714 8.5299 10.4674 8.49901 10.5332C8.28783 10.9824 7.64434 11.0588 7.30922 10.6744C7.13768 10.4777 7.11007 10.3783 7.11217 9.96454C7.11439 9.52207 7.16773 9.26695 7.33217 8.9126C7.49129 8.56962 7.706 8.31177 8.36744 7.66916C9.24499 6.81664 9.38063 6.61513 9.38232 6.16132C9.38367 5.79104 9.29211 5.55215 9.0502 5.29479C8.79859 5.02712 8.49248 4.90937 8.04826 4.90937C7.28123 4.90937 6.8896 5.26389 6.55207 6.26377C6.39751 6.7217 6.2625 6.91356 6.01867 7.02174C5.85208 7.09568 5.56545 7.08989 5.39382 7.00913C5.21541 6.92517 5.01761 6.70707 4.9506 6.52043C4.87709 6.31563 4.90255 5.9361 5.01298 5.59096C5.28636 4.73651 5.96733 4.04487 6.86856 3.70629C7.32157 3.53608 8.14853 3.46174 8.65798 3.54543ZM8.2636 11.5959C8.59297 11.727 8.81256 12.045 8.83845 12.4285C8.86722 12.8551 8.70882 13.1767 8.37216 13.3751C8.22101 13.4641 8.17699 13.4737 7.92319 13.4735C7.6792 13.4732 7.62098 13.4614 7.48544 13.385C7.16873 13.2063 6.99957 12.9176 6.99704 12.5515C6.99513 12.2805 7.01983 12.1769 7.1314 11.9878C7.36559 11.5909 7.83917 11.4269 8.2636 11.5959Z"
                                      fill="black"
                                    />
                                  </svg>
                                </span>

                                <div role="button" className="feedback">
                                  <p className="feedback-text">Feedback</p>
                                
                                  <svg
                                  style={{height:"28px",marginTop:"-1.5px"}}
                                    className="w-9 h-9"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => Rating(e, item)}
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      stroke-width="2"
                                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    ></path>
                                  </svg>
                                </div>
                              </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="pills-profile"
                role="tabpanel"
                aria-labelledby="pills-profile-tab"
                tabindex="0"
              >
                <ul className="profileaddres_part">
                  {OrderDetails?.data?.map((item, id) => {
                    return (
                      <li>
                        <h3>Address {id + 1}</h3>
                        <p className="mb-2">{item.name}</p>
                        <p className="mb-2">
                          {item.address}&nbsp;&nbsp;
                          {item.city}&nbsp;&nbsp;
                          {item.state}&nbsp;&nbsp;
                          {item.pincode} .
                        </p>
                        <p className="mb-2">{item.phone_number}</p>
                        <span onClick={() => DalateAddress(item.id)}>
                          {" "}
                          <img src="images/icon31.png" alt="img" /> Remove
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* /***************************************popup invoice**************************************************/}

      {downloadinvoice && (
        <div className="popupouter downloadinvoice-popup">
          {GetCustomerOrderDetailData &&
            GetCustomerOrderDetailData?.map((item, id) => {
              return (
                <div className="popupinner">
                  <h2>Lorem ipsum dolor sit amet,</h2>
                  <p>
                    How satisfied are you with our services...!Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit. Fermentum tristique
                    tortor felis lacus,
                  </p>
                  <div className="btngroups">
                    <div
                      className="close-btn"
                      type="button"
                      onClick={() => setDownloadInvoice((o) => !o)}
                    >
                      <svg
                        viewBox="0 0 10 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                    <button type="button" className="btn save-btn">
                      {" "}
                      <span>
                        <svg
                          width="19"
                          height="17"
                          viewBox="0 0 19 17"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.7751 16.4434C9.65576 16.2746 8.77539 15.821 7.94874 14.9873C7.60748 14.6432 7.25418 14.2548 7.16344 14.1241C7.0184 13.9153 6.97688 13.8981 6.81923 13.9825C6.25186 14.2862 5.16495 14.2473 4.4821 13.8989C3.67224 13.4857 3.02133 12.5652 2.9048 11.6683C2.85468 11.2824 2.81864 11.2272 2.44348 10.963C1.70609 10.4436 1.11702 9.60584 0.77347 8.58805C0.548913 7.92256 0.569387 6.59758 0.815318 5.8855C1.07206 5.14205 1.46958 4.5203 2.025 3.99322C2.9749 3.09196 4.04437 2.69158 5.50211 2.69158H6.30796V3.26484V3.83811H5.54715C5.12875 3.83811 4.5726 3.8938 4.31135 3.96186C2.48001 4.43881 1.32938 6.41569 1.85367 8.18414C2.13662 9.13855 2.60768 9.74924 3.49133 10.3073L4.01489 10.638V11.1596C4.01489 12.2434 4.74925 13.0525 5.72609 13.0452C6.08946 13.0424 6.30837 12.9788 6.77681 12.7394C7.10226 12.5732 7.40135 12.4371 7.44139 12.4371C7.48152 12.4371 7.68962 12.7388 7.90386 13.1077C8.4234 14.0018 9.01329 14.5799 9.77533 14.9418C11.3501 15.6897 13.0518 15.4243 14.2869 14.2383C15.1422 13.417 15.5584 12.4093 15.5609 11.1532L15.5621 10.5654L16.0404 10.2748C18.1215 9.01071 18.4562 6.36016 16.7396 4.73675C16.0059 4.04285 15.1797 3.75622 13.9131 3.75622H13.2691V3.17091V2.5856L14.2313 2.63327C15.7674 2.70943 16.6781 3.07755 17.617 4.0019C19.0407 5.40354 19.3863 7.5976 18.4686 9.40856C18.198 9.9426 17.61 10.6274 17.1339 10.963C16.7348 11.2443 16.7262 11.2596 16.6685 11.7806C16.5897 12.492 16.3444 13.2712 16.0078 13.8791C15.0113 15.6794 12.8221 16.7522 10.7751 16.4434ZM8.09058 8.48764L6.40476 6.25403L7.50183 6.23126L8.5989 6.20849L8.62044 3.32397L8.64198 0.439453H9.78852H10.9351L10.9566 3.32397L10.9781 6.20849L12.0788 6.23126L13.1794 6.25403L11.5389 8.42425C10.6366 9.61788 9.8709 10.6231 9.83733 10.6579C9.80375 10.6928 9.01772 9.71615 8.09058 8.48764Z"
                            fill="black"
                          />
                        </svg>
                      </span>{" "}
                      Download Invoice{" "}
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};

export default OrderDetails;
