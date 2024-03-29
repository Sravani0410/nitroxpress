import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { reactLocalStorage } from "reactjs-localstorage";
import Multiselect from "multiselect-react-dropdown";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import {
  GetSettingUserInfo,
  DeleteAdminSettingDeleteUser,
  PatchEditUserPermission,
  GetSettingViewPermission,
  PostKYCdetail,
  PostUploadTariffFile,
  PostUploadPackagingFile,
  PostUploadInsuranceFile,
  PostPaymentAddAmount,
  GetWalletBalance,
} from "../../Redux/action/ApiCollection";
import { PermissionData } from "../../Permission";
import LodingSpiner from "../../Components/LodingSpiner";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params=useLocation();
  const  amountRef = useRef();
  let IsAdminRole = sessionStorage.getItem("Admin_Role", false);
  const [permissiondata, setPermissionData] = useState("");
  const [email, setEmail] = useState("");
  const [downloadpdf, setDownloadPdf] = useState(false);
  const [useredit, setUserEdit] = useState(false);
  const [usereditprofile, setUserEditProfile] = useState("");
  const [useraccess, setUserAccess] = useState("");
  const [fromdate, setFromDate] = useState(null);
  const [todate, setToDate] = useState(null);
  const [mindate, setMindate] = useState("");
  const [priceuserid, setPriceUserId] = useState("");
  const [category,setCategory]=useState("")
  const [editcategoryvalue, setEditCategoryValue] = useState("");
  const [userpermission, setUserPermission] = useState("");

  const [showpermissiondatatruefalse, setShowPermissionDataTrueFalse] =
    useState(false);
  const [editpermissiondata, setEditPermissionData] = useState("");
  const [editremovedpermissiondata, setEditRemovedPermissionData] = useState(
    []
  );
  const [transactionAmount, setTransactionAmount] = useState();
  const [oneditfixedpermissiondata, setOnEditFixedPermissionData] = useState(
    []
  );
  const [cancelpermissiondata, setCancelPermissionData] = useState([]);
  const [selectededitpermission, setSelectedEditPermission] = useState([]);
  const [selectededitpermissiondata, setSelectedEditPermissionData] = useState(
    []
  );

  const [editcategoryvaluefilterdata, setEditCategoryValueFilterData] =
    useState("");

  const [NegativeLimit, setNegativeLimit] = useState("");

  const [loadspiner, setLoadSpiner] = useState(false);

  let isEmploye_Role = sessionStorage.getItem("isEmploye", false);

  let as_Business = sessionStorage.getItem("Is_Business", false);

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const GetSettingUserInfoData = useSelector(
    (state) => state.GetSettingUserInfoReducer.GetSettingUserInfoData
  );

  const DeleteAdminSettingDeleteUserData = useSelector(
    (state) =>
      state.DeleteAdminSettingDeleteUserReducer.DeleteAdminSettingDeleteUserData
        ?.data
  );

  const PatchEditUserPermissionData = useSelector(
    (state) => state.PatchEditUserPermissionReducer.PatchEditUserPermissionData
  );
  const GetCategoryDetailsData = useSelector(
    (state) => state.GetCategoryDetailsReducer.GetCategoryDetailsData?.data
  );
  const GetSettingViewPermissionData = useSelector(
    (state) =>
      state.GetSettingViewPermissionReducer.GetSettingViewPermissionData?.data
  );
  const PostKYCdetailData = useSelector(
    (state) => state.PostKYCdetailReducer.PostKYCdetailData?.data
  );
  const OrderPagesLoaderTrueFalseData = useSelector(
    (state) =>
      state.OrderPagesLoaderTrueFalseReducer?.OrderPagesLoaderTrueFalseData
  );

  const PostPaymentAddAmountData = useSelector(
    (state) => state.PostPaymentAddAmountReducer.PostPaymentAddAmountData?.data
  );

  const GetWalletBalanceData = useSelector(
    (state) => state.GetWalletBalanceReducer?.GetWalletBalanceData
  );
  useEffect(() => {
    dispatch(GetSettingViewPermission());
    if (PatchEditUserPermissionData.status == 200) {
      setUserEdit("");
      setUserEditProfile("");
      setPermissionData("");
      setUserAccess("");
      setFromDate("");
      setToDate("");
      setNegativeLimit("");
      setLoadSpiner(false);
      // window.location.reload(false)
      setSelectedEditPermission([""]);
      setEditRemovedPermissionData([""]);
    }
  }, [DeleteAdminSettingDeleteUserData, PatchEditUserPermissionData]);

  useEffect(() => {
    let payload = {
      user_type: "b2b",
    };
    // if (
    //   GetSettingUserInfoData?.status == 200 ||
    //   GetSettingUserInfoData?.status == 401
    // ) {
    //   // setLoadSpiner(false);
    // } else {
    //   // setLoadSpiner(true);
    // }
    dispatch(GetSettingUserInfo(payload));
  }, [PatchEditUserPermissionData, GetSettingUserInfoData?.status,GetSettingUserInfo]);

  useEffect(() => {
    if (DeleteAdminSettingDeleteUserData?.message === "User Deleted") {
      let payload = {
        user_type: "b2b",
      };
      dispatch(GetSettingUserInfo(payload));
    }
  }, [DeleteAdminSettingDeleteUserData]);
  const handleOnWheel = (e) => {
    e.preventDefault();
    amountRef.current.blur();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }
  };
  const DeleteUser = (e, item) => {
    let payload = {
      user_id: item.user_id,
    };
    dispatch(DeleteAdminSettingDeleteUser(payload));
  };

  const CustomerChangeFun = (e) => {
    if (e.target.value == "b2c") {
      navigate("/admin/setting/userb2c");
    }
  };

  const Detail = (e, item) => {
    setPriceUserId(item);
    setDownloadPdf((o) => !o);
    let payload = {
      email: item?.email,
    };
    dispatch(PostKYCdetail(payload));
  };

  const SheetTariffFile = (e) => {
    let pricefill = {
      price_file: e?.target?.files[0],
      user_id: priceuserid?.user_id,
      type: "b2b",
    };
    dispatch(PostUploadTariffFile(pricefill));
  };

  const SheetInsuranceFile = (e) => {
    let pricefill = {
      price_file: e?.target?.files[0],
      user_id: priceuserid?.user_id,
      type: "b2b",
    };
    dispatch(PostUploadInsuranceFile(pricefill));
  };

  const SheetPackagingFile = (e) => {
    let pricefill = {
      price_file: e?.target?.files[0],
      user_id: priceuserid?.user_id,
      type: "b2b",
    };
    dispatch(PostUploadPackagingFile(pricefill));
  };

  // Start  Open popup of User Details  on the Click of Edit btn

  const UserEditFun = (e, data) => {
    setUserEditProfile(data);
    setCategory(data?.catgory_details?.category_id);
    setNegativeLimit(data?.negative_limit);
    setUserEdit((o) => !o);
    setEditCategoryValue(data?.catgory_details?.category_id)
    let array = [];
    let arrayobject = [];

    data?.permission.map((item, id) => {
      let objectData = {
        permission: item.permissions,
      };

      arrayobject.push(objectData);

      array.push(item.permissions);
    });

    setUserPermission(arrayobject);
    setOnEditFixedPermissionData(array);
    setEditPermissionData(array);
  };

  // End  Open popup of User Details  on the Click of Edit btn

  // Strat Edit  permission Functionality start

  const EditUserSavebtnFun = (e) => {
    const selected = new Date(fromdate);
    const selected1 = new Date(todate);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    //------------------------------- Seletected ------------------------------//////////////////

    function SelectedDataFun(array1, array2) {
      return array1?.filter((object1) => {
        return array2?.some((object2) => {
          return object1?.permission === object2?.permission;
        });
      });
    }

    SelectedDataFun(selectededitpermission, selectededitpermissiondata);

    let user_permission = SelectedDataFun(
      selectededitpermission,
      selectededitpermissiondata
    );

    let SelectedUniqeData = [...new Set(user_permission)];

    let SeletedArray = [];
    SelectedUniqeData.map((item, id) => {
      SeletedArray.push(item?.permission);
    });

    //--------------------------- Removed ------------------------------- //////////////////

    let RemovedUniqeData = [...new Set(editremovedpermissiondata)];

    function RemovedDataFun(array1, array2) {
      return array1?.filter((object1) => {
        return array2?.some((object2) => {
          return object1?.permission === object2?.permission;
        });
      });
    }

    RemovedDataFun(userpermission, RemovedUniqeData);

    let Removed_permission = SelectedDataFun(userpermission, RemovedUniqeData);
    let RemovedArray = [];
    Removed_permission.map((item, id) => {
      RemovedArray.push(item?.permission);
    });

    // This logic remove both doublicated data ----------------  Please don't delete ----------

    // let data2 = data12.map(d => JSON.stringify(d))

    // const uniqueArray = data2.filter(function (item) {
    //   return data2.lastIndexOf(item) == data2.indexOf(item);
    // });
    // ----------------  Please don't delete ----------

    let edit = {
      user_id: usereditprofile.user_id,
      user_permission: SeletedArray,
      category_id:category==""?editcategoryvalue:category,
      delete_permission: RemovedArray,
      from_date: fromdate,
      to_date: todate,
      negative_limit: NegativeLimit,
    };

    // todate == null ? toast.warn("Please add Duration's ") : selected1 <= maxDate ? toast.warn("Please select valid date") : todate
    //  && fromdate == null ? toast.warn("Please add Duration's ") : selected <= maxDate ? toast.warn("Please select valid date") : fromdate &&
    //     dispatch(PatchEditUserPermission(edit)) && setLoadSpiner(true) && setUserEdit((o) => !o)

    fromdate != null && fromdate != "" && todate != null && todate != ""
      ? selected1 <= maxDate
        ? toast.warn("Please select valid date")
        : dispatch(PatchEditUserPermission(edit)) &&
          setUserEdit((o) => !o) &&
          setFromDate("") &&
          setToDate("")
      : toast.warn("Please add Duration's");
    // if(fromdate != null && fromdate != "" && todate != null && todate != ""){
    //   if(selected1 <= maxDate){
    //     toast.warn("Please select valid date")
    //   }
    //   else{
    //     dispatch(PatchEditUserPermission(edit));
    //     setLoadSpiner(true)
    //     setUserEdit((o) => !o)
    //     setFromDate("")
    //     setToDate("")
    //   }
    // }else {
    //   toast.warn("Please add Duration's")
    // }
  };

  const onSelectEdit = (selectedList, selectedItem) => {
    setSelectedEditPermission([...selectededitpermission, selectedItem]);
    setSelectedEditPermissionData(selectedList);
  };

  const onRemoveEdit = (selectedList, removedItem) => {
    setEditRemovedPermissionData([...editremovedpermissiondata, removedItem]);
    let array = [];
    selectedList.map((item, id) => {
      array.push(item?.permission);
    });
    setEditPermissionData(array);
  };

  useEffect(() => {
    let arrayData = [];
    oneditfixedpermissiondata?.map((item, id) => {
      //this map has perission on select id
      editremovedpermissiondata?.map((items, ids) => {
        //this map have deleted permission on select box
        if (item == items.permission) {
          setCancelPermissionData([...cancelpermissiondata, item]);
        }
      });
    });
  }, [oneditfixedpermissiondata, editremovedpermissiondata]);

  useEffect(() => {
    if (cancelpermissiondata) {
      let filterData = cancelpermissiondata?.filter(
        (item, index) => cancelpermissiondata.indexOf(item) === index
      );
      setEditCategoryValueFilterData(filterData);
    }
  }, [cancelpermissiondata]);

  // End Edit permission Functionality start

  const onSearchMultiSelectFun = () => {
    setShowPermissionDataTrueFalse(true);
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMindate(today);
  }, []);

  const ConformOtpActionFun = () => {
    let Payload = {
      user_id: priceuserid?.user_id,
      amount: transactionAmount,
    };
    if (!transactionAmount) {
      toast.warn("Please Enter Amount");
    } else {
      dispatch(PostPaymentAddAmount(Payload));
    }
  };

  useEffect(()=>{
    if(downloadpdf == false){
      setTransactionAmount("");
    }

  },[downloadpdf])

  useEffect(() => {
    if (PostPaymentAddAmountData?.message == " Wallet Successfully updated") {
      setTransactionAmount("");
      let payload = {
        company_name: priceuserid?.company_name,
      };
      // if (!isEmploye_Role) {
      //   dispatch(GetWalletBalance(payload))
      // }
      dispatch(GetWalletBalance(payload))
    }
  }, [PostPaymentAddAmountData]);

  useEffect(()=>{
    let payload = {
      company_name: priceuserid?.company_name,
    };
    // if (!isEmploye_Role) {
    //   dispatch(GetWalletBalance(payload))
    // }
    dispatch(GetWalletBalance(payload))
  },[priceuserid])
  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className="dashboard-part  ">
        <Sidebar />
        <div className="content-sec userprofile-sec">
          <div className="title-bar">
            <div className="left-part">
              <h2>User Profiles </h2>
              <select
                className="form-select"
                onChange={(e) => CustomerChangeFun(e)}
              >
                <option value="b2b">B2B</option>
                {IsAdminRole == "true" || isEmploye_Role == "true" ? (
                  <option value="b2c">B2C</option>
                ) : (
                  ""
                )}
              </select>
            </div>
            <div className="right-part mt-2 mt-sm-0">
              <button
                className="backbtn"
                type="button"
                onClick={(e) => {
                  navigate("/admin/setting");
                }}
              >
                {" "}
                Back{" "}
              </button>
            </div>
          </div>
          <ul className="userprofile-list">
            {PermissionData()?.VIEW_B2B_USER_PROFILE == "VIEW_B2B_USER_PROFILE"
              ? GetSettingUserInfoData?.data &&
                GetSettingUserInfoData?.data?.User_info.map((item, id) => {
                  return (
                    <li>
                      <div className="part">
                        <div className="left">
                          <img
                            role="button"
                            src="/images/user.png"
                            alt="img"
                            onClick={(e) => Detail(e, item)}
                          />
                        </div>
                        <div className="right">
                          <h3>{item.name}</h3>
                          <h6>{item.company_name}</h6>
                        </div>
                        {IsAdminRole == "true" || isEmploye_Role == "true" ? (
                          <div className="user-btn">
                            <button
                              type="button"
                              className={`me-2 
                          ${
                            PermissionData()?.DELETE_B2B_USER_PROFILE ==
                            "DELETE_B2B_USER_PROFILE"
                              ? " "
                              : "permission_blur"
                          }`}
                              onClick={(e) =>
                                PermissionData()?.DELETE_B2B_USER_PROFILE ==
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
                          ${
                            PermissionData()?.EDIT_B2B_USER_PROFILE ==
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
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                      <p>
                        <a href="#">
                          <svg
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
                          </svg>

                          {item.email}
                        </a>
                      </p>
                      <p>
                        <a href="#">
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
                              d="M4.54597 0.0219022C3.91098 0.0830125 3.34872 0.243994 2.77508 0.528915C2.2678 0.780878 1.89526 1.04837 1.47672 1.46116C1.07467 1.85767 0.785688 2.25796 0.527689 2.77566C-0.0835357 4.00216 -0.16676 5.39395 0.293613 6.69061C0.464401 7.1717 0.806641 7.77813 1.12087 8.15653C1.59059 8.72217 2.13227 9.15342 2.77508 9.47347C3.53788 9.85328 4.34825 10.0295 5.17772 9.99598C5.92263 9.96587 6.56949 9.8012 7.22854 9.47384C8.02175 9.07985 8.68123 8.49762 9.17423 7.75603C9.344 7.50067 9.59827 6.99907 9.70268 6.71362C10.0444 5.77925 10.0938 4.70409 9.83936 3.7375C9.74378 3.37436 9.65909 3.15092 9.47789 2.78398C9.22423 2.27031 8.95677 1.8964 8.54363 1.47788C7.50505 0.425781 6.00936 -0.118956 4.54597 0.0219022ZM3.27566 2.40394C3.33824 2.42722 4.28592 3.36166 4.32878 3.44236C4.39614 3.56917 4.3824 3.59246 4.02724 3.95338C3.84597 4.13759 3.68312 4.31672 3.66533 4.35146C3.59085 4.49685 3.60633 4.67184 3.70687 4.82137C4.03324 5.30675 4.89279 6.13667 5.28895 6.34889C5.37945 6.39738 5.55731 6.40184 5.66209 6.35825C5.70672 6.33967 5.85921 6.20456 6.05726 6.00808C6.38461 5.68334 6.43509 5.64855 6.54101 5.67463C6.60807 5.69114 7.56748 6.6412 7.6122 6.73537C7.67212 6.86163 7.60569 6.96701 7.29496 7.23855C6.96313 7.52851 6.59373 7.65177 6.21275 7.59962C5.70286 7.52984 4.86538 7.11441 4.25908 6.63053C4.03222 6.44947 3.47631 5.89209 3.29671 5.66562C2.89186 5.15511 2.53876 4.50542 2.41052 4.0351C2.3278 3.73178 2.36296 3.41423 2.51333 3.10633C2.59485 2.93937 2.62939 2.89485 2.85727 2.66293C2.99661 2.52114 3.12932 2.40145 3.15223 2.39696C3.17511 2.39247 3.19988 2.3876 3.20725 2.38614C3.21462 2.38467 3.2454 2.39268 3.27566 2.40394Z"
                              fill="#B1B1B1"
                            />
                          </svg>
                          {item.phone_number}
                        </a>
                      </p>
                    </li>
                  );
                })
              : ""}
          </ul>

          {/* ================================= Edit B2B popup ======================================== */}
          {useredit && (
            <div className="popupouter editb2b-popup">
              <div className="popupinner">
                <h2>Edit B2B</h2>
                <div
                  className="close-btn"
                  type="button"
                  onClick={(e) => setUserEdit((o) => !o)}
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

                <div className="popup-body row mx-0">
                  <div className="col-md-6">
                    <label>Company Name</label>
                    <input
                      type="text"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="Company Name"
                      value={usereditprofile?.company_name}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="Email"
                      value={usereditprofile?.email}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="Phone"
                      value={usereditprofile?.phone_number}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Company ID</label>
                    <input
                      type="text"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="56186510985621895"
                      value={usereditprofile?.["company ID"]}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>GSTIN</label>
                    <input
                      type="text"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="516498163"
                      value={usereditprofile.GSTIN}
                    />
                  </div>

                  <div className="col-md-6">
                    <label>Negative Price Limit</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="negative limit"
                      value={NegativeLimit}
                      onChange={(e) => setNegativeLimit(e.target.value)}
                    />
                  </div>
                  <div className="col-12">
                  <label>Category</label>
                  <input
                      type="text"
                      className="form-control input_filed_block"
                      disabled
                      placeholder="516498163"
                      value={usereditprofile?.category_details[0]?.category_name}
                    />
                  {/* <select
                    className={`form-select  `}
                    placeholder="Category"
                    onChange={(e) => {
                      setCategory(e.target.value)}}
                    value={category}
                  >
                    <option value="" selected="selected">
                      Select Category
                    </option>
                    {GetCategoryDetailsData?.category_details_list.map(
                      (item, id) => {
                        return (
                          <option value={item.id}>{item.category_name}</option>
                        );
                      }
                    )}
                  </select> */}
                </div>
                  <div className="col-12">
                    <label>Duration</label>
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className={`form-control  ${fromdate ? "" : ""} `}
                      placeholder="From date"
                      value={fromdate}
                      min={mindate}
                      onChange={(e) => setFromDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="date"
                      className={`form-control  ${todate ? "" : ""} `}
                      placeholder="To date"
                      value={todate}
                      min={mindate}
                      onChange={(e) => setToDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Permission</label>
                  </div>

                  <div
                    className={`col-md-12 
                   ${"multiselectblockclass"}`}
                  >
                    <Multiselect
                      options={GetSettingViewPermissionData?.user_permissions}
                      // Options to display in the dropdown
                      // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                      onSelect={onSelectEdit} // Function will trigger on select event
                      onRemove={onRemoveEdit} // Function will trigger on remove event
                      displayValue="permission" // Property name to display in the dropdown options
                      selectedValues={userpermission}
                      onSearch={onSearchMultiSelectFun}
                      showCheckbox
                    />
                  </div>
                </div>
                <div className="btngroups text-end my-3">
                  <button
                    type="button"
                    className="btn action-btn"
                    onClick={(e) => EditUserSavebtnFun(e)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn cancel-btn"
                    onClick={(e) => setUserEdit((o) => !o)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* {**********************************download pdf*******************************************} */}

          {downloadpdf && (
            <div className="popupouter profileview_popup">
              <div className="popupinner">
                <h2>Profile View</h2>
                <div
                  className="close-btn"
                  type="button"
                  onClick={() => setDownloadPdf((o) => !o)}
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

                <div className="popup-body row mx-0">
                  <div className="row">
                    <div className="col-sm-3  mb-3 mb-sm-0">
                      <svg
                        width="111"
                        height="107"
                        viewBox="0 0 111 107"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width="111" height="107" fill="url(#pattern0)" />
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
                    <div className="col-sm-6">
                      <h5>
                        <b>{PostKYCdetailData?.company_name}</b>
                      </h5>
                      <div className="row">
                        <div className="col-1 pe-0">
                          <svg
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
                          </svg>
                        </div>
                        <div className="col-11">{PostKYCdetailData?.email}</div>
                      </div>

                      <div className="row">
                        <div className="col-1 pe-0">
                          <svg
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
                          </svg>
                        </div>
                        <div className="col-11 ">
                          {PostKYCdetailData?.phone_number}{" "}
                        </div>
                      </div>
                    </div>
                      {/* {IsAdminRole=="true"?<div className="col-sm-3">
                        <label className="fw-bold">Balance</label>
                        <div className="row">
                          <div className="col-12">Rs. {GetWalletBalanceData?.data?.balance_status == "NEGATIVE" ? `-${GetWalletBalanceData?.data?.balance}` : GetWalletBalanceData?.data?.balance}/-</div>
                        </div>
                      </div>:""} */}

                    {/* <div> */}

                    {/* <div className="row"> */}

                    <div className=" col-md-4 my-3">
                      <div className=" mb-2">
                        <b>Company I’d :</b>{" "}
                        <span>{PostKYCdetailData?.company_id} </span>
                      </div>
                      <div className="">
                        <b> GSTIN : </b>{" "}
                        <span>{PostKYCdetailData?.gstin_number}</span>
                      </div>
                    </div>
                    {/* <div className="col-sm-4">
                   
                      </div> */}

                    {as_Business == "true" ? (
                      ""
                    ) : (
                      <div className="col-md-8 pe-0">
                        <div className="row">
                          <div className="col-md-6 mb-3 pe-0">
                            <b>Upload Tariff Price</b>{" "}
                            <span className="upload-form-control">
                              <input
                                // value={""}
                                accept=".xlsx"
                                type={`${
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_TARIFF_ACTION ==
                                  "ALLOW_B2B_UPLOAD_TARIFF_ACTION"
                                    ? "file"
                                    : "text"
                                }`}
                                onChange={(e) =>
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_TARIFF_ACTION ==
                                  "ALLOW_B2B_UPLOAD_TARIFF_ACTION"
                                    ? SheetTariffFile(e)
                                    : ""
                                }
                                className={`custom-file-input  
                                    ${
                                      PermissionData()
                                        ?.ALLOW_B2B_UPLOAD_TARIFF_ACTION ==
                                      "ALLOW_B2B_UPLOAD_TARIFF_ACTION"
                                        ? " "
                                        : "permission_blur"
                                    }  }`}
                              />
                            </span>
                          </div>
                          <div className="col-md-6 mb-3 pe-0">
                            <b>Upload Insurance Price</b>{" "}
                            <span className="upload-form-control">
                              <input
                                // value={""}
                                accept=".xlsx"
                                type={`${
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_INSURANCE_ACTION ==
                                  "ALLOW_B2B_UPLOAD_INSURANCE_ACTION"
                                    ? "file"
                                    : "text"
                                }`}
                                onChange={(e) =>
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_INSURANCE_ACTION ==
                                  "ALLOW_B2B_UPLOAD_INSURANCE_ACTION"
                                    ? SheetInsuranceFile(e)
                                    : ""
                                }
                                className={`custom-file-input  
                                    ${
                                      PermissionData()
                                        ?.ALLOW_B2B_UPLOAD_INSURANCE_ACTION ==
                                      "ALLOW_B2B_UPLOAD_INSURANCE_ACTION"
                                        ? " "
                                        : "permission_blur"
                                    }  }`}
                              />
                            </span>
                          </div>
                          <div className="col-md-6 mb-3 pe-0">
                            <b>Upload Packaging Price</b>{" "}
                            <span className="upload-form-control">
                              <input
                                // value={""}
                                accept=".xlsx"
                                type={`${
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_PACKAGING_ACTION ==
                                  "ALLOW_B2B_UPLOAD_PACKAGING_ACTION"
                                    ? "file"
                                    : "text"
                                }`}
                                onChange={(e) =>
                                  PermissionData()
                                    ?.ALLOW_B2B_UPLOAD_PACKAGING_ACTION ==
                                  "ALLOW_B2B_UPLOAD_PACKAGING_ACTION"
                                    ? SheetPackagingFile(e)
                                    : ""
                                }
                                className={`custom-file-input p-3
                                    ${
                                      PermissionData()
                                        ?.ALLOW_B2B_UPLOAD_PACKAGING_ACTION ==
                                      "ALLOW_B2B_UPLOAD_PACKAGING_ACTION"
                                        ? " "
                                        : "permission_blur"
                                    }  }`}
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* </div> */}

                    {/* </div> */}

                    {/* <div>
                      <div className="row my-3">
                        <div className="col-sm-6 mb-2">
                          <b>Company I’d :</b>{" "}
                          <span>{PostKYCdetailData?.company_id} </span>
                        </div>
                        <div className="col-sm-6 mb-2">
                          <b>Upload Price</b>{" "}
                          <span className="upload-form-control">
                            <input
                              value={""}
                              accept=".xlsx"
                              type={`${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? "file" : "text"}`}
                              onChange={(e) => PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? SheetFile(e) : ""}
                              className={`custom-file-input  
                              ${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? " " : "permission_blur"}  }`}
                            />
                          </span>
                        </div>
                        <div className="col-sm-6 mb-2">
                          <b>Upload Insurance</b>{" "}
                          <span className="upload-form-control">
                            <input
                              value={""}
                              accept=".xlsx"
                              type={`${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? "file" : "text"}`}
                              onChange={(e) => PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? SheetFile(e) : ""}
                              className={`custom-file-input  
                              ${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? " " : "permission_blur"}  }`}
                            />
                          </span>
                        </div>
                        <div className="col-sm-6 mb-2">
                          <b>Upload Packaging</b>{" "}
                          <span className="upload-form-control">
                            <input
                              value={""}
                              accept=".xlsx"
                              type={`${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? "file" : "text"}`}
                              onChange={(e) => PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? SheetFile(e) : ""}
                              className={`custom-file-input  
                             ${PermissionData()?.ALLOW_B2B_UPLOAD_PRICE_ACTION == "ALLOW_B2B_UPLOAD_PRICE_ACTION" ? " " : "permission_blur"}  }`}
                            />
                          </span>
                        </div>
                        <div className="col-sm-6">
                          <b> GSTIN : </b>{" "}
                          <span>{PostKYCdetailData?.gstin_number}</span>
                        </div>
                      </div>
                    </div> */}

                    <div className="row">
                      <div className="col-3">
                        <a
                          href={`${PostKYCdetailData?.company_registration_pdf}`}
                          target="_blank"
                        >
                          <img src="/images/pdf (1) 2.png" alt="img" />
                        </a>
                        <p>Company Registration</p>
                      </div>
                      <div className="col-3">
                        <a
                          href={`${PostKYCdetailData?.pan_card}`}
                          target="_blank"
                        >
                          <img src="/images/pdf (1) 2.png" alt="img" />
                        </a>
                        <p>Pan card</p>
                      </div>

                      <div className="col-3">
                        <a
                          href={`${PostKYCdetailData?.gstin_pdf}`}
                          target="_blank"
                        >
                          <img src="/images/pdf (1) 2.png" alt="img" />
                        </a>
                        <p>GSTIN</p>
                      </div>

                      <div className="col-3">
                        <a
                          href={`${PostKYCdetailData?.aadhar_card}`}
                          target="_blank"
                        >
                          <img src="/images/pdf (1) 2.png" alt="img" />
                        </a>
                        <p>Aadhar Card</p>
                      </div>
                    </div>

                   {/* {IsAdminRole=="true"?<div className="row">
                      <div className="col-8">
                        <label className="fw-bold">Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          onWheel={handleOnWheel}
                          ref={amountRef}
                          onKeyDown={handleKeyDown}
                          placeholder="Rs. /-"
                          onChange={(e) => setTransactionAmount(e.target.value)}
                          value={transactionAmount}
                          required
                        />
                      </div>
                      <div className="col-sm-4 my-4">
                        <div className="btngroups text-end mt-2">
                          <button
                            type="button"
                            className="save-btn"
                            onClick={(e) => ConformOtpActionFun(e)}
                          >
                            Add Amount
                          </button>
                        </div>
                      </div>
                    </div>:""} */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <LodingSpiner loadspiner={loadspiner} />
      <LodingSpiner loadspiner={OrderPagesLoaderTrueFalseData} />
    </div>
  );
};

export default UserProfile;
