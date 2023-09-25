import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetSettingViewB2bFeedback,
  PostTicketDetail,
  DeleteSupportTicket,
  PostPaymentApproval,
  PostPaymentChat,
  PatchPaymentApprovalAction,
  GetWalletBalance,
} from "../Redux/action/ApiCollection";
import { isTomorrow } from "date-fns";
import { PermissionData } from "../Permission";
import { reactLocalStorage } from "reactjs-localstorage";
import Popup from "reactjs-popup";
// import LodingSpiner from "../../Components/LodingSpiner";
import LodingSpiner from "../Components/LodingSpiner";
import { toast } from "react-toastify";
let B2BPartner = sessionStorage.getItem("Is_Business");
function PaymentApproval() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldnewdata, setOldNewData] = useState(true);
  const [getsettingviewalldata, setGetSettingViewAllData] = useState("");
  const [moredata, setMoreData] = useState(false);
  const [morepopupid, setMorePopupId] = useState(false);
  const [moredataid, setMoreDataId] = useState("");
  const [pickuppopup, setPickUpPopup] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(false);
  const [userPaymentDetails, setUserPaymentDetails] = useState();
  const [comments, setComments] = useState();
  const [selectImage, setSelectedImage] = useState();
  const [types, setTypes] = useState();
  const [userAction, setUserAction] = useState();
  const [userPaymentDetailsTrue, setUserPaymentDetailsTrue] = useState(false);

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const GetSettingViewB2bFeedbackData = useSelector(
    (state) =>
      state.GetSettingViewB2bFeedbackReducer.GetSettingViewB2bFeedbackData?.data
  );

  const DeleteSupportTicketData = useSelector(
    (state) => state.DeleteSupportTicketReducer.DeleteSupportTicketData?.data
  );

  const PostTicketDetailData = useSelector(
    (state) => state.PostTicketDetailReducer.PostTicketDetailData
  );
  const OrderPagesLoaderTrueFalseData = useSelector(
    (state) =>
      state.OrderPagesLoaderTrueFalseReducer?.OrderPagesLoaderTrueFalseData
  );
  const HeaderToggleClassAddData = useSelector(
    (state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );

  const PostPaymentApprovalData = useSelector(
    (state) => state.PostPaymentApprovalReducer.PostPaymentApprovalData?.data
  );

  const PatchPaymentApprovalActionData = useSelector(
    (state) =>
      state.PatchPaymentApprovalActionReducer.PatchPaymentApprovalActionData
        ?.data
  );

  const PostPaymentChatData = useSelector(
    (state) => state.PostPaymentChatReducer.PostPaymentChatData?.data
  );

  let isAdmin_Role = sessionStorage.getItem("Admin_Role", false);
  let isEmploye_Role = sessionStorage.getItem("isEmploye", false);
  useEffect(() => {
    let payLoad = {
      chat_type: "open_chat",
    };
    dispatch(PostPaymentApproval(payLoad));
  }, []);

  const TicketChangeFun = (e) => {
    setTypes(e.target.value);
    if (e.target.value == "new") {
      let payload = {
        chat_type: "open_chat",
      };
      dispatch(PostPaymentApproval(payload));
    } else if (e.target.value == "close") {
      let payload = {
        chat_type: "closed_chat",
      };
      dispatch(PostPaymentApproval(payload));
    }
  };

  const CustomerChangeFun = (e) => {
    if (e.target.value == "b2c") {
      navigate("/admin/support/b2b/b2c");
    }
  };
  const rate = (loop) => {
    const countArray = [];
    for (let i = 0; i < Number(loop); i++) {
      countArray.push("star");
    }
    return countArray;
  };
  const NewOldFun = (e) => {
    if (e.target.value?.toString() == "OLDEST") {
      let AllData = getsettingviewalldata
        ?.slice(Math?.max(getsettingviewalldata?.length - 5, 0))
        ?.map((item, id) => {
          return item;
        });
      setGetSettingViewAllData(AllData);
    } else {
      setOldNewData(true);
      setGetSettingViewAllData(PostTicketDetailData?.info);
    }
  };
  useEffect(() => {
    PostTicketDetailData?.data &&
      setGetSettingViewAllData(PostTicketDetailData?.data?.info);
  }, [PostTicketDetailData?.data]);
  const ShowFeedbackDataFun = (e, value) => {
    if (value == "more") {
      setMoreData(true);
    } else {
      setMoreData(false);
    }
  };
  const Readmore = (id) => {
    setPickUpPopup(true);
    setMoreDataId(id);
    setMoreData(false);
  };
  const ReadmoreFun = (id) => {
    setPickUpPopup(true);
    setMoreDataId(id);
    setMorePopupId(id);
    setMoreData(false);
  };

  const UserPaymentDetails = (e, Data) => {
    setPaymentDetails(true);
    setUserPaymentDetails(Data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const SendComment = () => {
    let formdata = new FormData();
    formdata.append("comments", comments);
    formdata.append("image", selectImage);
    formdata.append("qr_details_id", userPaymentDetails?.qr_details_id);

    if (!comments) {
      toast.warn("Please Type Any Comments");
    } else {
      dispatch(PostPaymentChat(formdata));
      let payload = {
        chat_type: "open_chat",
      };
      setUserPaymentDetailsTrue(true);
      dispatch(PostPaymentApproval(payload));
      setComments("")
      setSelectedImage("")
    }
  };

  const PaymentApprovalAction = () => {
    let payLoad = {
      amount: userPaymentDetails?.amount,

      qr_details_id: userPaymentDetails?.qr_details_id,

      close_type: "approve",
    };
    dispatch(PatchPaymentApprovalAction(payLoad));

    setPaymentDetails(false);
  };

  useEffect(() => {
    if (PatchPaymentApprovalActionData?.message == "Successfully updated") {
      let Approve = {
        chat_type: "open_chat",
      };
      dispatch(PostPaymentApproval(Approve));

      let balance = {};
      dispatch(GetWalletBalance(balance));
    }
  }, [PatchPaymentApprovalActionData]);

  const PaymentRejectionAction = () => {
    let payLoad = {
      amount: userPaymentDetails?.amount,

      qr_details_id: userPaymentDetails?.qr_details_id,

      close_type: "closed",
    };
    dispatch(PatchPaymentApprovalAction(payLoad));
    setPaymentDetails(false);
  };

  //   useEffect(()=>{
  //     if(PostPaymentChatData?.message == "Successfully Created" && userPaymentDetailsTrue==true){
  //         SendComment()
  //         setUserPaymentDetailsTrue(false)
  //     }

  //   },[PostPaymentChatData,userPaymentDetailsTrue])

  useEffect(() => {
    PostPaymentApprovalData?.map((items, id) => {
      if (items?.qr_details_id == userPaymentDetails?.qr_details_id && paymentDetails==true) {
        UserPaymentDetails("e", items);
      }
    });
    // userPaymentDetails?.qr_details_id
  }, [PostPaymentApprovalData]);
  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData} `}>
          <Sidebar />
          <div className="content-sec support-page">
            <div className="title">
              <h2>Payments</h2>
            </div>

            <div className="sptitle">
              <div className="select-box">
                <span>SORT BY : </span>
                <select
                  className=" form-select"
                  onChange={(e) => TicketChangeFun(e)}
                >
                  <option value="new" className="px-3">
                    New Payments
                  </option>
                  <option value="close" className="px-3">
                    Close Payments
                  </option>
                </select>
              </div>
            </div>

            <ul className="userprofile-list">
              {PostPaymentApprovalData &&
                PostPaymentApprovalData?.map((items, id) => {
                  return (
                    <li>
                      <div className="part">
                        <div className="left">
                          <img
                            role="button"
                            src="/images/user.png"
                            alt="img"
                            onClick={(e) => UserPaymentDetails(e, items)}
                          />
                        </div>
                        <div className="right">
                          <h6>{items.username == null ?"Admin":items.username
                          }</h6>
                        </div>
                        {/* {IsAdminRole == "true" || isEmploye_Role=="true" ? <div className="user-btn">
                        <button
                          type="button"
                          className={`me-2 
                          ${PermissionData()?.DELETE_B2B_USER_PROFILE ==
                              "DELETE_B2B_USER_PROFILE"
                              ? " "
                              : "permission_blur"
                            }`}
                          onClick={(e) =>
                            PermissionData()
                              ?.DELETE_B2B_USER_PROFILE ==
                              "DELETE_B2B_USER_PROFILE"
                              ? DeleteUser(e, item)
                              : ""
                          }
                        >
                          <img src="/images/icon35.svg" alt="img" />
                        </button>
                        <button
                          type="button"
                          className={`
                          ${PermissionData()?.EDIT_B2B_USER_PROFILE ==
                              "EDIT_B2B_USER_PROFILE"
                              ? " "
                              : "permission_blur"
                            }`}
                          onClick={(e) =>
                            PermissionData()?.EDIT_B2B_USER_PROFILE ==
                              "EDIT_B2B_USER_PROFILE"
                              ? UserEditFun(e, item)
                              : ""
                          }
                        >
                          <img src="/images/icon34.svg" alt="img" />
                        </button>
                      </div> : ""} */}
                      </div>
                      <p>
                        <a href="#">
                          {/* <svg
                      width="10"
                      height="7"
                      viewBox="0 0 10 7"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0.655753 0.0301636C0.596654 0.045955 0.539628 0.0674639 0.529061 0.0779655C0.507632 0.0992605 4.75646 4.33752 4.84736 4.38556C4.91536 4.4215 5.08464 4.4215 5.15264 4.38556C5.24284 4.33789 9.49239 0.0992604 9.47112 0.0781793C9.46063 0.0677749 9.39957 0.0456827 9.33542 0.029094C9.23168 0.00225652 8.75108 -0.000952315 4.991 0.000195086C1.32867 0.00130359 0.748845 0.00530978 0.655753 0.0301636ZM0.0358121 0.606645C0.00174168 0.703746 0 0.84511 0 3.49946C0 6.1538 0.00174168 6.29517 0.0358121 6.39227C0.0555186 6.44841 0.0775538 6.49437 0.0847945 6.49437C0.0920157 6.49437 0.775988 5.82051 1.6047 4.99691L3.11145 3.49946L1.6047 2.002C0.775988 1.1784 0.0920157 0.504546 0.0847945 0.504546C0.0775538 0.504546 0.0555186 0.550481 0.0358121 0.606645ZM8.3953 2.002L6.88855 3.49946L8.3953 4.99691C9.22401 5.82051 9.90798 6.49437 9.91521 6.49437C9.92245 6.49437 9.94448 6.44841 9.96419 6.39227C9.99826 6.29517 10 6.1538 10 3.49946C10 0.84511 9.99826 0.703746 9.96419 0.606645C9.94448 0.550481 9.92245 0.504546 9.91521 0.504546C9.90798 0.504546 9.22401 1.1784 8.3953 2.002ZM2.00634 5.41457C1.03636 6.37858 0.516536 6.9085 0.528885 6.92075C0.539374 6.93114 0.60043 6.95323 0.664579 6.96982C0.768239 6.99664 1.2508 7 5 7C8.7492 7 9.23176 6.99664 9.33542 6.96982C9.39957 6.95323 9.46065 6.93114 9.47114 6.92073C9.4835 6.90846 8.96301 6.37791 7.98935 5.41033L6.48851 3.91882L6.02311 4.37702C5.59728 4.79629 5.54452 4.84168 5.40219 4.91121L5.24665 4.98719H5H4.75335L4.59781 4.91093C4.45597 4.84141 4.40162 4.79472 3.98088 4.38099C3.7271 4.13146 3.51573 3.9273 3.51115 3.9273C3.50658 3.9273 2.82941 4.59657 2.00634 5.41457Z"
                        fill="#B1B1B1"
                      />
                    </svg> */}
                          Transaction Id:- <span>{items.payment_id}</span>
                          {/* {item.email} */}
                        </a>
                      </p>
                      <p>
                        <a href="#">
                          {/* <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.54597 0.0219022C3.91098 0.0830125 3.34872 0.243994 2.77508 0.528915C2.2678 0.780878 1.89526 1.04837 1.47672 1.46116C1.07467 1.85767 0.785688 2.25796 0.527689 2.77566C-0.0835357 4.00216 -0.16676 5.39395 0.293613 6.69061C0.464401 7.1717 0.806641 7.77813 1.12087 8.15653C1.59059 8.72217 2.13227 9.15342 2.77508 9.47347C3.53788 9.85328 4.34825 10.0295 5.17772 9.99598C5.92263 9.96587 6.56949 9.8012 7.22854 9.47384C8.02175 9.07985 8.68123 8.49762 9.17423 7.75603C9.344 7.50067 9.59827 6.99907 9.70268 6.71362C10.0444 5.77925 10.0938 4.70409 9.83936 3.7375C9.74378 3.37436 9.65909 3.15092 9.47789 2.78398C9.22423 2.27031 8.95677 1.8964 8.54363 1.47788C7.50505 0.425781 6.00936 -0.118956 4.54597 0.0219022ZM3.27566 2.40394C3.33824 2.42722 4.28592 3.36166 4.32878 3.44236C4.39614 3.56917 4.3824 3.59246 4.02724 3.95338C3.84597 4.13759 3.68312 4.31672 3.66533 4.35146C3.59085 4.49685 3.60633 4.67184 3.70687 4.82137C4.03324 5.30675 4.89279 6.13667 5.28895 6.34889C5.37945 6.39738 5.55731 6.40184 5.66209 6.35825C5.70672 6.33967 5.85921 6.20456 6.05726 6.00808C6.38461 5.68334 6.43509 5.64855 6.54101 5.67463C6.60807 5.69114 7.56748 6.6412 7.6122 6.73537C7.67212 6.86163 7.60569 6.96701 7.29496 7.23855C6.96313 7.52851 6.59373 7.65177 6.21275 7.59962C5.70286 7.52984 4.86538 7.11441 4.25908 6.63053C4.03222 6.44947 3.47631 5.89209 3.29671 5.66562C2.89186 5.15511 2.53876 4.50542 2.41052 4.0351C2.3278 3.73178 2.36296 3.41423 2.51333 3.10633C2.59485 2.93937 2.62939 2.89485 2.85727 2.66293C2.99661 2.52114 3.12932 2.40145 3.15223 2.39696C3.17511 2.39247 3.19988 2.3876 3.20725 2.38614C3.21462 2.38467 3.2454 2.39268 3.27566 2.40394Z"
                        fill="#B1B1B1"
                      />
                    </svg> */}
                          {/* {item.phone_number} */}
                          Amount:- <span>{items?.amount}</span> /-
                        </a>
                      </p>
                    </li>
                  );
                })}
            </ul>

            {/* {*****************************POPUP*************************} */}

            {paymentDetails && (
              <div className="popupouter profileview_popupChat">
                <div className="popupinner">
                  <h2>Profile View</h2>
                  <div
                    className="close-btn"
                    type="button"
                    onClick={() => setPaymentDetails((o) => !o)}
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
                    <div className="row px-3 mx-0">
                      <div className="col-md-2  col-sm-4">
                        <svg
                          className="w-100"
                          width="111"
                          height="95"
                          viewBox="0 0 111 96"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <rect
                            width="111"
                            height="107"
                            fill="url(#pattern0)"
                          />
                          <defs>
                            <pattern
                              id="pattern0"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                xlinkHref="#image0_2768_25637"
                                transform="translate(0 -0.0186916) scale(0.00444444 0.00461059)"
                              />
                            </pattern>
                            <image
                              id="image0_2768_25637"
                              width="225"
                              height="225"
                              xlinkHref="data:image/png;base64,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"
                            />
                          </defs>
                        </svg>
                      </div>

                      <div className="col-md-4  col-sm-8">
                        <h5>
                          <b>
                            {/* {PostKYCdetailData?.company_name} */}
                            {userPaymentDetails?.username == null ? "Admin":userPaymentDetails?.username}
                          </b>
                        </h5>
                        <div className="row">
                          <div className="col-2 col-md-1 pe-0">
                            {/* <svg
                              width="15"
                              height="12"
                              viewBox="0 0 10 7"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.655753 0.0301636C0.596654 0.045955 0.539628 0.0674639 0.529061 0.0779655C0.507632 0.0992605 4.75646 4.33752 4.84736 4.38556C4.91536 4.4215 5.08464 4.4215 5.15264 4.38556C5.24284 4.33789 9.49239 0.0992604 9.47112 0.0781793C9.46063 0.0677749 9.39957 0.0456827 9.33542 0.029094C9.23168 0.00225652 8.75108 -0.000952315 4.991 0.000195086C1.32867 0.00130359 0.748845 0.00530978 0.655753 0.0301636ZM0.0358121 0.606645C0.00174168 0.703746 0 0.84511 0 3.49946C0 6.1538 0.00174168 6.29517 0.0358121 6.39227C0.0555186 6.44841 0.0775538 6.49437 0.0847945 6.49437C0.0920157 6.49437 0.775988 5.82051 1.6047 4.99691L3.11145 3.49946L1.6047 2.002C0.775988 1.1784 0.0920157 0.504546 0.0847945 0.504546C0.0775538 0.504546 0.0555186 0.550481 0.0358121 0.606645ZM8.3953 2.002L6.88855 3.49946L8.3953 4.99691C9.22401 5.82051 9.90798 6.49437 9.91521 6.49437C9.92245 6.49437 9.94448 6.44841 9.96419 6.39227C9.99826 6.29517 10 6.1538 10 3.49946C10 0.84511 9.99826 0.703746 9.96419 0.606645C9.94448 0.550481 9.92245 0.504546 9.91521 0.504546C9.90798 0.504546 9.22401 1.1784 8.3953 2.002ZM2.00634 5.41457C1.03636 6.37858 0.516536 6.9085 0.528885 6.92075C0.539374 6.93114 0.60043 6.95323 0.664579 6.96982C0.768239 6.99664 1.2508 7 5 7C8.7492 7 9.23176 6.99664 9.33542 6.96982C9.39957 6.95323 9.46065 6.93114 9.47114 6.92073C9.4835 6.90846 8.96301 6.37791 7.98935 5.41033L6.48851 3.91882L6.02311 4.37702C5.59728 4.79629 5.54452 4.84168 5.40219 4.91121L5.24665 4.98719H5H4.75335L4.59781 4.91093C4.45597 4.84141 4.40162 4.79472 3.98088 4.38099C3.7271 4.13146 3.51573 3.9273 3.51115 3.9273C3.50658 3.9273 2.82941 4.59657 2.00634 5.41457Z"
                                fill="#B1B1B1"
                              />
                            </svg> */}
                            Id:-
                          </div>
                          <div className="col-md-11 col-10">
                            {/* {PostKYCdetailData?.email} */}
                            {userPaymentDetails?.payment_id}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-2 col-md-1 pe-0">
                            {/* <svg

                              width="15"
                              height="15"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.54597 0.0219022C3.91098 0.0830125 3.34872 0.243994 2.77508 0.528915C2.2678 0.780878 1.89526 1.04837 1.47672 1.46116C1.07467 1.85767 0.785688 2.25796 0.527689 2.77566C-0.0835357 4.00216 -0.16676 5.39395 0.293613 6.69061C0.464401 7.1717 0.806641 7.77813 1.12087 8.15653C1.59059 8.72217 2.13227 9.15343 2.77508 9.47347C3.53788 9.85328 4.34825 10.0295 5.17772 9.99598C5.92263 9.96587 6.56949 9.8012 7.22854 9.47384C8.02175 9.07985 8.68123 8.49762 9.17423 7.75603C9.344 7.50067 9.59827 6.99907 9.70268 6.71362C10.0444 5.77925 10.0938 4.70409 9.83936 3.7375C9.74378 3.37436 9.65909 3.15092 9.47789 2.78398C9.22423 2.27031 8.95677 1.8964 8.54363 1.47788C7.50505 0.425781 6.00936 -0.118956 4.54597 0.0219022ZM3.27566 2.40394C3.33824 2.42722 4.28592 3.36166 4.32878 3.44236C4.39614 3.56917 4.3824 3.59246 4.02724 3.95338C3.84597 4.13759 3.68312 4.31672 3.66533 4.35146C3.59085 4.49685 3.60633 4.67184 3.70687 4.82137C4.03324 5.30676 4.89279 6.13667 5.28895 6.34889C5.37945 6.39738 5.55731 6.40184 5.66209 6.35825C5.70672 6.33967 5.85921 6.20456 6.05726 6.00808C6.38461 5.68334 6.43509 5.64855 6.54101 5.67463C6.60807 5.69114 7.56748 6.6412 7.6122 6.73537C7.67212 6.86163 7.60569 6.96701 7.29496 7.23855C6.96313 7.52851 6.59373 7.65177 6.21275 7.59962C5.70286 7.52984 4.86538 7.11441 4.25908 6.63053C4.03222 6.44947 3.47631 5.89209 3.29671 5.66562C2.89186 5.15511 2.53876 4.50542 2.41052 4.0351C2.3278 3.73178 2.36296 3.41423 2.51333 3.10633C2.59485 2.93937 2.62939 2.89485 2.85727 2.66293C2.99661 2.52114 3.12932 2.40145 3.15223 2.39696C3.17512 2.39247 3.19988 2.3876 3.20725 2.38614C3.21462 2.38467 3.2454 2.39268 3.27566 2.40394Z"
                                fill="#B1B1B1"
                              />
                            </svg> */}
                            Rs.
                          </div>
                          <div className="col-md-11 col-10">
                            {/* {PostKYCdetailData?.phone_number} */}
                            {userPaymentDetails?.amount} /-
                          </div>
                        </div>
                      </div>

                      <div className="col-md-4 col-sm-8 text-center">
                        {userPaymentDetails?.image !==
                        "https://nitro-xpress.s3.ap-south-1.amazonaws.com/" ? (
                          <a href={userPaymentDetails?.image} target="_blank">
                            <img src="/images/ICON96.png" alt="img" />
                          </a>
                        ) : (
                          ""
                        )}
                      </div>

                  {B2BPartner !=="true" ?    <div className="col-md-2 col-sm-4">
                        {types == "close" ? (
                          ""
                        ) : (
                   <div className="btngroups  my-3">
                            <div>
                              {" "}
                              <button
                                type="button"
                                className="btn btn-success rounded bg-success px-3 mb-2"
                                onClick={(e) => PaymentApprovalAction()}
                              >
                                {" "}
                                Approval{" "}
                              </button>
                            </div>
                            <button
                              type="button"
                              className="btn btn-danger rounded bg-danger px-4"
                              onClick={(e) => PaymentRejectionAction()}
                            >
                              {" "}
                              Reject{" "}
                            </button>
                          </div>
                        )}
                      </div>:""}

                      <div className="col-12 mb-3">
                        <div className="trh-box p-3">
                          {userPaymentDetails?.chat
                            ? userPaymentDetails?.chat.map((item, id) => {
                                return (
                                  <div>
                                    <h7>{item?.auther==""?"Admin" :item?.auther}</h7>
                                    {item?.auther == "Admin" ? (
                                      <div className="usercomment-box rounded shadow-sm bg-warning-subtle mb-2 p-1">
                                        {item?.comment}
                                        <span className="text-end">
                                          {item.image !==
                                          "https://nitro-xpress.s3.ap-south-1.amazonaws.com/" ? (
                                            <a
                                              href={item.image}
                                              target="_blank"
                                              className="ps-5"
                                            >
                                              <img
                                                src={"/images/SSIcon.png"}
                                                alt="img"
                                              />
                                            </a>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </div>
                                    ) : (
                                      <div className="usercomment-box rounded shadow-sm bg-primary-subtle mb-2 p-1">
                                        {item?.comment}
                                        <span className="text-end">
                                          {item.image !==
                                          "https://nitro-xpress.s3.ap-south-1.amazonaws.com/" ? (
                                            <a
                                              href={item.image}
                                              target="_blank"
                                              className="ps-5"
                                            >
                                              <img
                                                src={"/images/SSIcon.png"}
                                                alt="img"
                                              />
                                            </a>
                                          ) : (
                                            ""
                                          )}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                            : ""}

                          {/* <h4>Chats</h4>
                            <div>
                              <p className="pb-3 mb-0">Admin</p>
                              <div className="row mx-0">
                                <div className="col-6   text-black ">Hey</div>
                                <div className="btngroups text-end col-6">
                                  <a href={`#`} target="_blank">
                                    <img src="/images/SSIcon.png" alt="img" />
                                  </a>
                                </div>
                              </div>
                            </div> */}
                        </div>
                      </div>

                      {types == "close" ? (
                        ""
                      ) : (
                        <div className="col-md-9 ">
                          <label>Comments</label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder="Your Comments"
                            onChange={(e) => setComments(e.target.value)}
                            value={comments}
                          />
                        </div>
                      )}

                      {types == "close" ? (
                        ""
                      ) : (
                        <div className="col-md-3">
                          <div className="row">
                            <div className="col-4 text-center mt-3 mt-md-0">
                              <label>ScreenShot</label>
                              <div className="upload-form-control text-end">
                                <input
                                  // value={""}
                                  className={`custom-file-input`}
                                  accept="image/*"
                                  type="file"
                                  onChange={handleImageChange}
                                />
                              </div>
                            </div>

                            <div className="col-8">
                              <label></label>
                              <div className="btngroups text-end my-3">
                                <button
                                  type="button"
                                  className="btn save-btn"
                                  onClick={(e) => SendComment()}
                                >
                                  Send
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <LodingSpiner loadspiner={OrderPagesLoaderTrueFalseData} />
      </div>
    </>
  );
}

export default PaymentApproval;
