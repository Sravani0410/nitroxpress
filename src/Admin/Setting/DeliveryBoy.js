import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../AddOrder/icon34.svg";
import Multiselect from "multiselect-react-dropdown";
import { PermissionData } from "../../Permission";

import {
  PostAdminSettingAddDeliveryboy,
  GetCategoryDetails,
  GetSettingViewPermission,
  GetSettingDeliveryboyInfo,
  PatchEditDeliveryboy,
  DeleteAdminSettingDeleteUser,
} from "../../Redux/action/ApiCollection";
import LodingSpiner from "../../Components/LodingSpiner";
const DeliveryBoy = () => {
  const [adduser, setAddUser] = useState(false);
  const [showpassword, setShowPassword] = useState(false);
  const [edituser, SetEditUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [fromdate, setFromDate] = useState("");
  const [todate, setToDate] = useState("");
  const [userpermission, setUserPermission] = useState("");
  const [editBoyPermission, setEditBoyPermission] = useState("");
  const [permissionRemove, setPermissionRemove] = useState("");

  const [useraccess, setUserAccess] = useState("");
  const [category, setCategory] = useState("");
  const [userid, setuserId] = useState("");
  const [minDate, setMinDate] = useState("");
  const [deliverycontact, setDeliveryContact] = useState("");
  const [countrycodedelivery, setCountryCodeDelivery] = useState("+91"); 
  const [popup, setPopup] = useState(false);

  const [permissiondata, setPermissionData] = useState(null);
  const [selectedvaluepermission, setSelectedValuePermission] = useState("");

  const [removedpermissiondata, setRemovedPermissionData] = useState([]);
  const [drivinglicence, setDrivingLicence] = useState(null);
  const [aadharcard, setAadharCard] = useState(null);
  const [chequebook, setChequeBook] = useState(null);
  const [Passbook, setPassbook] = useState(null);
  const [photoOne, setPhotoOne] = useState(null);
  const [photoTwo, setPhotoTwo] = useState(null);
  const [attendance, setAttendance] = useState("");
  const [showpermissionobjectdata, setShowPermissionObjectData] =
    useState(false);
  const [showpermissiondatatruefalse, setShowPermissionDataTrueFalse] =
    useState(false);

  const [editpermissiondata, setEditPermissionData] = useState("");
  const [editremovedpermissiondata, setEditRemovedPermissionData] = useState(
    []
  );
  const [oneditfixedpermissiondata, setOnEditFixedPermissionData] = useState(
    []
  );
  const [cancelpermissiondata, setCancelPermissionData] = useState([]);
  const [selectededitpermission, setSelectedEditPermission] = useState([]);
  const [selectededitpermissiondata, setSelectedEditPermissionData] = useState(
    []
  );

  const [permissionEdit, setPermissionEdit] = useState([]);
  const [editcategoryvalue, setEditCategoryValue] = useState("");

  const [editcategoryvaluefilterdata, setEditCategoryValueFilterData] =
    useState("");
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [conformpassword, setConformPassword] = useState(false);

  const PostAdminSettingAddDeliveryboyData = useSelector(
    (state) =>
      state.PostAdminSettingAddDeliveryboyReducer
        .PostAdminSettingAddDeliveryboyData
  );
  const GetCategoryDetailsData = useSelector(
    (state) => state.GetCategoryDetailsReducer.GetCategoryDetailsData?.data
  );
  const GetSettingViewPermissionData = useSelector(
    (state) =>
      state.GetSettingViewPermissionReducer.GetSettingViewPermissionData?.data
  );

  const GetSettingDeliveryboyInfoData = useSelector(
    (state) =>
      state.GetSettingDeliveryboyInfoReducer.GetSettingDeliveryboyInfoData
  );
  const OrderPagesLoaderTrueFalseData = useSelector(
    (state) =>
      state.OrderPagesLoaderTrueFalseReducer?.OrderPagesLoaderTrueFalseData
  );
  const PatchEditDeliveryboyData = useSelector(
    (state) => state.PatchEditDeliveryboyReducer.PatchEditDeliveryboyData
  );

  const DeleteAdminSettingDeleteUserData = useSelector(
    (state) =>
      state.DeleteAdminSettingDeleteUserReducer.DeleteAdminSettingDeleteUserData
  );

  let IsAdminRole = sessionStorage.getItem("Admin_Role", false);
  let IsDeliveryBoyRole = sessionStorage.getItem("Is_delivery_boy", false);

  useEffect(() => {
    dispatch(GetCategoryDetails());
    dispatch(GetSettingViewPermission());

    if (PatchEditDeliveryboyData?.status == 200) {
      //    setEditRemovedPermissionData([])
      //  setOnEditFixedPermissionData([])
      //  setCancelPermissionData([])
      //  setSelectedEditPermission([])
      //  setSelectedEditPermissionData([])
      //  setEditCategoryValue([])
      //  setEditCategoryValueFilterData([])
      //  window.location.reload();
      SetEditUser(false);
      // window.location.reload(false);
    }
  }, [PatchEditDeliveryboyData]);

  // window.location.reload(false)

  useEffect(() => {
    if (GetSettingDeliveryboyInfoData?.data) {
      setEditPermissionData(null);
      // setEditRemovedPermissionData([null])
      // setOnEditFixedPermissionData([null])
      // setCancelPermissionData([null])
      // setSelectedEditPermission([null])
      // setSelectedEditPermissionData([null])
      // setEditCategoryValue([null])
      // setEditCategoryValueFilterData([null])
    }
  }, [GetSettingDeliveryboyInfoData?.data]);

  useEffect(() => {
    dispatch(GetSettingDeliveryboyInfo());
    if (PostAdminSettingAddDeliveryboyData?.status == 201) {
      setAddUser(false);
      dispatch(GetSettingDeliveryboyInfo());
    }
  }, [PostAdminSettingAddDeliveryboyData]);
  let Formate1 = drivinglicence?.name?.split(".");
  let pdf1 = Formate1?.slice(-1);
  let DrivingLicence = pdf1 && pdf1[0];

  let Formate2 = aadharcard?.name?.split(".");
  let pdf2 = Formate2?.slice(-1);
  let Aadhar = pdf2 && pdf2[0];

  let Formate3 = drivinglicence?.name?.split(".");
  let pdf3 = Formate3?.slice(-1);
  let ChequeBook = pdf3 && pdf3[0];

  let Formate4 = aadharcard?.name?.split(".");
  let pdf4 = Formate4?.slice(-1);
  let PassBook = pdf4 && pdf4[0];
  useEffect(() => {
    if (DrivingLicence !== "pdf" && DrivingLicence !== undefined) {
      toast.warn("Please Upload Pdf File");
      setDrivingLicence("");
    } else if (Aadhar !== "pdf" && Aadhar !== undefined) {
      toast.warn("Please Upload Pdf File");
      setAadharCard("");
    } else if (ChequeBook !== "pdf" && ChequeBook !== undefined) {
      toast.warn("Please Upload Pdf File");
      setChequeBook(null);
    } else if (PassBook !== "pdf" && PassBook !== undefined) {
      toast.warn("Please Upload Pdf File");
      setPassbook("");
    } else {
    }
  }, [DrivingLicence, Aadhar, ChequeBook, PassBook]);
  const AddUser = (e) => {
    // let formdata = new FormData();
    // formdata.append("driving_licence", drivinglicence);
    // formdata.append("aadhar_card", aadharcard);

    let payload = {
      name: name,
      phone_number: `${countrycodedelivery}-${deliverycontact}`,
      email: email,
      password: password,
      confirm_pass: confirmpassword,
      from_date: fromdate,
      to_date: todate,
      user_permision: permissiondata,
      category_id: Number(category),
      aadhar_card: aadharcard,
      driving_licence: drivinglicence,
      cheque_book: chequebook,
      passbook: Passbook,
      photo_one: photoOne,
      photo_two: photoTwo,
    };
    if (
      !name &&
      !email &&
      !password &&
      !deliverycontact &&
      !confirmpassword &&
      !fromdate &&
      !todate &&
      !drivinglicence &&
      !aadharcard
    ) {
      toast.warn("Please Enter All Input Fields");
    } else if (name.length == 0) {
      toast.warn("Please Select Name");
    } else if (email.length == 0) {
      toast.warn("Please Enter Email");
    } else if (password.length == 0) {
      toast.warn("Please Enter Password");
    } else if (confirmpassword.length == 0) {
      toast.warn("Please Enter Confirm Password");
    } else if (fromdate.length == 0) {
      toast.warn("Please Select Duration");
    } else if (todate.length == 0) {
      toast.warn("Please Select Duration");
    } else if (category.length == 0 && permissiondata.length == 0) {
      toast.warn("Please Select Category Or Permission");
    } else if (drivinglicence.length == 0) {
      toast.warn("Please Upload PAN Card PDF");
    } else if (aadharcard.length == 0) {
      toast.warn("Please Upload Aadhaar PDF");
    } else {
      dispatch(PostAdminSettingAddDeliveryboy(payload));
      setPopup(false);
    }
    // name && deliverycontact.length !== 10
    //   ? toast.warn("Mobile number is invalid")
    //   : deliverycontact &&
    //     email &&
    //     password &&
    //     confirmpassword
    //     // &&
    //     // category.length === 0
    //     // ? toast.warn("Please Select Category")
    //     // : category
    //       ? toast.warn("Please Select field")
    //       // dispatch(PostAdminSettingAddEmployee(payload))
    //       :
    //       toast.warn("please fill all the fields");
  };

  const InputCountryCodeDeliveryFun = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library

    let data = [];
    let CountryCode = eventTargetValue.split(" ");
    setCountryCodeDelivery(CountryCode[0]);
     

    CountryCode.slice(1).map((items, id) => {
      data.push(items);
    }); 
    let myString = data.join("").replace(/\D/g, "");
    setDeliveryContact(myString);

  };
  

  const EditUserFun = (e, data) => {

    let SplitData = [];
    let CountryCode = data?.phone_number?.split("-"); 

    CountryCode.slice(1).map((items, id) => {
      SplitData.push(items);
    }); 
    let myString = SplitData.join("").replace(/\D/g, "");
     
    setName(data?.name);
    setEmail(data?.email);
    setDeliveryContact(myString);
    setCountryCodeDelivery(CountryCode[0])
    setUserPermission(data?.user_permission);
    setRemovedPermissionData(data?.delete_permission);
    setCategory(data?.catgory_details?.category_id);
    setuserId(data?.delivery_boy_id);
    setEditCategoryValue(data?.catgory_details?.category_id);
    setAadharCard(null);
    setDrivingLicence(null);
    setChequeBook(null);
    setPassbook(null);
    setPhotoOne(null);
    setPhotoTwo(null);
    setFromDate(data);
    SetEditUser(true);
    let array = [];

    data?.user_permission.map((item, id) => {
      array.push(item.permission);
    });

    setOnEditFixedPermissionData(array);
    setEditPermissionData(array);
  };

  const onSelect = (selectedList, selectedItem) => {
    let array = [];
    selectedList.map((item, id) => {
      array.push(item?.permission);
    });
    // let valuearray=array.join(",")
    setPermissionData(array);
  };

  const onRemove = (selectedList, removedItem) => {
    setRemovedPermissionData([...removedpermissiondata, removedItem]);

    let array = [];
    selectedList.map((item, id) => {
      array.push(item?.permission);
    });
    // let valuearray=array.join(",")

    setPermissionData(array);
  };

  // const onSelect = (selectedList, selectedItem) => {
  //   setSelectedEditPermission([...selectededitpermission, selectedItem])
  //   setSelectedEditPermissionData(selectedList)
  //   // setSelectedEditPermission(selectedList)
  // };
  // const onRemove = (selectedList, removedItem) => {
  //   setEditRemovedPermissionData([...editremovedpermissiondata, removedItem])
  //   let array = [];
  //   selectedList.map((item, id) => {
  //     array.push(item?.permission);
  //   });
  //   setEditPermissionData(array);
  // };

  //---------------- Start edit Employe Permisiion

  const EditSaveBtn = (e) => {
    let arrayPermission;

    if (!editBoyPermission) {
      arrayPermission = null;
    } else {
      arrayPermission = editBoyPermission.map((item) => item?.permission);
    }


    let arrayRemovePermission;

    if (!permissionRemove) {
      arrayRemovePermission = null;
    } else {
      arrayRemovePermission = permissionRemove.map((item) => item?.permission);
    }


    const selected = new Date(todate);
    const selected1 = new Date(fromdate);
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
    Removed_permission?.map((item, id) => {
      RemovedArray.push(item?.permission);
    });
    let payload = {
      user_name: name,
      phone_number: `${countrycodedelivery}-${deliverycontact}`,
      email: email,
      user_permission: { arrayPermission },
      delete_permission: { arrayRemovePermission },
      from_date: fromdate,
      to_date: todate,
      user_id: userid,
      category_id: category == "" ? editcategoryvalue : category,
      aadhar_card: aadharcard,
      driving_licence: drivinglicence,
      cheque_book: chequebook,
      passbook: Passbook,
      photo_one: photoOne,
      photo_two: photoTwo,
    };


    if (fromdate != null && fromdate != "" && todate != null && todate != "") {
      if (selected <= maxDate || selected1 <= maxDate) {
        toast.warn("Please select valid Date");
      } else {
        dispatch(PatchEditDeliveryboy(payload));
        setFromDate("");
        setToDate("");
      }
    } else {
      toast.warn("Please select valid Date");
    }
  };

  const ShowPermissionDataFun = (e, data) => {
    setShowPermissionObjectData(data);
    setShowPermissionDataTrueFalse((o) => !o);
  };

  // const onSelectEdit = (selectedList, selectedItem) => {
  //   setSelectedEditPermission([...selectededitpermission, selectedItem]);

  //   let array = [];
  //   selectedList.map((item, id) => {
  //     array.push(item?.permission);
  //   });

  //   setEditPermissionData(array);
  // };

  // const onRemoveEdit = (selectedList, removedItem) => {
  //   setEditRemovedPermissionData([...editremovedpermissiondata, removedItem]);

  //   let array = [];
  //   selectedList.map((item, id) => {
  //     array.push(item?.permission);
  //   });

  //   setEditPermissionData(array);
  // };

  useEffect(() => {
    let arrayData = [];
    oneditfixedpermissiondata?.map((item, id) => {
      editremovedpermissiondata?.map((items, ids) => {
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

  const DeleteEmployee = (e, item) => {
    let payload = {
      user_id: item?.delivery_boy_id,
    };
    dispatch(DeleteAdminSettingDeleteUser(payload));
  };

  const onSearchMultiSelectFun = () => {
    setShowPermissionDataTrueFalse(true);
  };

  const onSelectEdit = (selectedList, selectedItem) => {
    setEditBoyPermission((prevRemovedItems) => [
      ...prevRemovedItems,
      selectedItem,
    ]);
  };

  const onRemoveEdit = (selectedList, removedItem) => {
    setPermissionRemove((prevRemovedItems) => [
      ...prevRemovedItems,
      removedItem,
    ]);
  };
  //---------------- End edit Employe Permisiion

  const DeliveryboyidFun = (e, id, itemss) => {
    setPopup(true);
    setAttendance(itemss);
    // if(itemss?.attendence_info%2==0){
    //   setAttendance(itemss)
    // }
    // else{

    // }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
    setName("");
    setCountryCodeDelivery("");
    setDeliveryContact("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFromDate("");
    setToDate("");
    setAadharCard("");
    setDrivingLicence("");
    setChequeBook(null);
    setPassbook(null);
    setPhotoOne(null);
    setPhotoTwo(null);
    setCategory("");
    setEditCategoryValue("");
  }, [adduser]);
  useEffect(() => {
    setPopup(false);
  }, []);

  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className="dashboard-part  ">
        <Sidebar />
        <div className="content-sec settings-sec">
          <div className="ordertittle-part">
            <h2>Delivery Boy</h2>
            <div className="btngroup">
              <button
                className="btn me-md-3 me-2"
                type="button "
                onClick={(e) => {
                  navigate("/admin/setting");
                }}
              >
                {" "}
                Back{" "}
              </button>
              {PermissionData()?.CREATE_DELIVERY_BOY ==
                    "CREATE_DELIVERY_BOY" ? (
                <button
                  type="button"
                  className={`btn  ${
                    PermissionData()?.CREATE_DELIVERY_BOY ==
                    "CREATE_DELIVERY_BOY"
                      ? " "
                      : "permission_blur"
                  }`}
                  onClick={(e) =>
                    PermissionData()?.CREATE_DELIVERY_BOY ==
                    "CREATE_DELIVERY_BOY"
                      ? setAddUser((o) => !o)
                      : ""
                  }
                >
                  {" "}
                  + Add Delivery Boy{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          
            <div className="employe-table">
              <table>
                <tr>
                  <th>DeliveryBoy_id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Category Name</th>
                  <th>Permission</th>
                  <th>Action</th>
                </tr>
                {PermissionData()?.VIEW_DELIVERY_BOY_DETAILS ==
                "VIEW_DELIVERY_BOY_DETAILS"
                  ? GetSettingDeliveryboyInfoData?.data &&
                    GetSettingDeliveryboyInfoData?.data?.delivery_boy_info?.map(
                      (item, id) => {
                        return (
                          <tr>
                            {/* <td>{item.employee_id}</td> */}
                            <td>
                              <b
                                onClick={(e) =>
                                  DeliveryboyidFun(
                                    e,
                                    item.delivery_boy_id,
                                    item
                                  )
                                }
                                style={{ cursor: "pointer" }}
                              >
                                {" "}
                                {item.delivery_boy_id}
                              </b>
                            </td>

                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item?.catgory_details?.category_name}</td>
                            <td>
                              {item?.user_permission[0]?.permission}
                              <span
                                onClick={(e) => ShowPermissionDataFun(e, item)}
                                className="order-btn text-primary"
                                role="button"
                              >
                                ....
                                {item?.delivery_boy_id ==
                                  showpermissionobjectdata?.delivery_boy_id &&
                                  showpermissiondatatruefalse == true && (
                                    <div className="dropdown">
                                      <ul className=" permission_all ">
                                        {GetSettingDeliveryboyInfoData?.data &&
                                          item?.user_permission?.map(
                                            (item, id) => {
                                              return (
                                                <li className="text-dark text-nowrap">
                                                  {id + 1}. {item.permission}
                                                </li>
                                              );
                                            }
                                          )}
                                      </ul>
                                    </div>
                                  )}
                              </span>
                            </td>
                            <td>
                              <div className="action-btngroup">
                                <button
                                  type="button "
                                  className={`btn svg-btn  ${
                                    PermissionData()?.DELETE_DELIEVERY_BOY ==
                                    "DELETE_DELIEVERY_BOY"
                                      ? " "
                                      : "permission_blur"
                                  }`}
                                  onClick={(e) =>
                                    PermissionData()?.DELETE_DELIEVERY_BOY ==
                                    "DELETE_DELIEVERY_BOY"
                                      ? DeleteEmployee(e, item)
                                      : ""
                                  }
                                >
                                  <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.83818 0.0363069C5.55698 0.0957951 5.32379 0.212267 5.10436 0.402842C4.73822 0.720902 4.61087 1.06757 4.61087 1.74637V2.18409L2.50821 2.19373C0.46106 2.20313 0.402221 2.20523 0.279238 2.27391C0.0921099 2.37837 -0.0160374 2.57595 0.00193905 2.78056C0.0181106 2.96513 0.0999792 3.09117 0.278841 3.20685C0.390237 3.2789 0.436369 3.28404 0.971511 3.28404C1.39811 3.28404 1.54874 3.29502 1.55997 3.32693C1.56823 3.35053 1.72168 5.52343 1.90094 8.15563C2.10496 11.1516 2.24827 13.0441 2.28412 13.2159C2.45702 14.0447 3.10619 14.6966 3.99783 14.9368C4.2172 14.9959 4.4375 14.9999 7.5167 14.9999C11.2083 14.9999 10.9864 15.0142 11.5441 14.739C12.1985 14.416 12.6579 13.803 12.7688 13.1045C12.7891 12.9771 12.9446 10.7347 13.1144 8.12133C13.2843 5.50799 13.4298 3.35053 13.4378 3.32693C13.4487 3.29499 13.5989 3.28404 14.0258 3.28404C14.5609 3.28404 14.6071 3.2789 14.7185 3.20685C14.8912 3.09512 14.9762 2.96976 14.9968 2.79654C15.0203 2.59777 14.9132 2.39333 14.7282 2.28403L14.5918 2.20337L12.4929 2.19373L10.3941 2.18413L10.3785 1.66198C10.3653 1.22305 10.3497 1.10792 10.2805 0.939369C10.1256 0.561889 9.76805 0.232749 9.3504 0.0830672C9.14822 0.0106109 9.08812 0.00783214 7.58889 0.00121089C6.47316 -0.00372931 5.98091 0.00615105 5.83818 0.0363069ZM9.12602 1.25191C9.22995 1.36248 9.23132 1.36934 9.23132 1.77509V2.18622H7.49865H5.76598V1.77718C5.76598 1.38944 5.77075 1.36275 5.85745 1.2648C5.90777 1.20796 5.98491 1.15454 6.02892 1.14603C6.07292 1.13756 6.76407 1.13269 7.56482 1.13523L9.02073 1.13986L9.12602 1.25191ZM12.2639 3.39554C12.2641 3.43801 12.1253 5.59548 11.9554 8.18994C11.7459 11.3904 11.6298 12.9638 11.5943 13.0832C11.49 13.4341 11.1637 13.7558 10.8074 13.8586C10.6911 13.8922 9.93518 13.902 7.46255 13.902H4.26795L4.06775 13.8128C3.95766 13.7637 3.80998 13.6755 3.73956 13.6168C3.58531 13.488 3.39443 13.1597 3.36577 12.9737C3.344 12.8324 2.76991 3.64447 2.76991 3.43716V3.31835H7.5167H12.2635L12.2639 3.39554ZM4.89929 5.21381C4.83366 5.25628 4.74598 5.33457 4.70444 5.38785C4.6291 5.48446 4.62892 5.4928 4.62892 8.60162C4.62892 11.7105 4.6291 11.7188 4.70444 11.8154C4.96704 12.1522 5.40981 12.1522 5.67242 11.8154C5.74775 11.7188 5.74793 11.7105 5.74793 8.60162C5.74793 5.4928 5.74775 5.48446 5.67242 5.38785C5.54438 5.22366 5.37675 5.13662 5.18843 5.13662C5.07176 5.13662 4.98127 5.16077 4.89929 5.21381ZM7.20951 5.21381C7.14389 5.25628 7.05621 5.33457 7.01466 5.38785C6.93932 5.48446 6.93914 5.4928 6.93914 8.60162C6.93914 11.7105 6.93932 11.7188 7.01466 11.8154C7.27727 12.1522 7.72004 12.1522 7.98264 11.8154C8.05798 11.7188 8.05816 11.7105 8.05816 8.60162C8.05816 5.4928 8.05798 5.48446 7.98264 5.38785C7.85461 5.22366 7.68697 5.13662 7.49865 5.13662C7.38198 5.13662 7.29149 5.16077 7.20951 5.21381ZM9.51974 5.21381C9.45411 5.25628 9.36643 5.33457 9.32488 5.38785C9.24955 5.48446 9.24937 5.4928 9.24937 8.60162C9.24937 11.7105 9.24955 11.7188 9.32488 11.8154C9.58749 12.1522 10.0303 12.1522 10.2929 11.8154C10.3682 11.7188 10.3684 11.7105 10.3684 8.60162C10.3684 5.4928 10.3682 5.48446 10.2929 5.38785C10.1648 5.22366 9.99719 5.13662 9.80888 5.13662C9.69221 5.13662 9.60171 5.16077 9.51974 5.21381Z"
                                      fill="#DB2C2C"
                                    />
                                  </svg>
                                </button>

                                <button
                                  type="button "
                                  className={`btn svg-btn 
                            ${
                              PermissionData()?.EDIT_DELIVERY_BOY ==
                              "EDIT_DELIVERY_BOY"
                                ? " "
                                : "permission_blur"
                            }`}
                                  onClick={(e) =>
                                    PermissionData()?.EDIT_DELIVERY_BOY ==
                                    "EDIT_DELIVERY_BOY"
                                      ? EditUserFun(e, item)
                                      : ""
                                  }
                                >
                                  <svg
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                  >
                                    <rect
                                      width="10"
                                      height="10"
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
                                          xlinkHref="#image0_949_22401"
                                          transform="scale(0.00195312)"
                                        />
                                      </pattern>
                                      <image
                                        id="image0_949_22401"
                                        width="512"
                                        height="512"
                                        xlinkHref="data:image/png;base64,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"
                                      />
                                    </defs>
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      }
                    )
                  : ""}
              </table>
            </div>
           
        </div>
      </div>
      {/* ============== View user pop =================*/}
      {popup && (
        <div className="popupouter transition-popup">
          <div className="editb2b-box">
            <h2>Delivery Boy Details </h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => setPopup(false)}
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
            <div className="row">
              <div className="col-3">
                <a href={attendance?.documents.aadhar_card} target="_blank">
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>Aadhar Card</p>
              </div>
              <div className="col-3">
                <a
                  href={attendance?.documents?.driving_licence}
                  target="_blank"
                >
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>Driving Licence</p>
              </div>

              <div className="col-3">
                <a href={attendance?.documents?.cheque_book} target="_blank">
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>Cheque Book</p>
              </div>

              <div className="col-3">
                <a href={attendance?.documents?.passbook} target="_blank">
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>PassBook</p>
              </div>
              <div className="col-3">
                <a href={attendance?.documents?.photo_one} target="_blank">
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>Photo One</p>
              </div>
              <div className="col-3">
                <a href={attendance?.documents?.photo_two} target="_blank">
                  <img src="/images/pdf (1) 2.png" alt="img" />
                </a>
                <p>Photo Two</p>
              </div>
              <div className="employe-table">
                <table>
                  <tr>
                    <th>Date</th>
                    <th>Latitude and Longitude (Login)</th>
                    <th>login</th>
                    <th>Latitude and Longitude (Logout)</th>
                    <th>logout</th>
                  </tr>
                  {PermissionData()?.VIEW_ATTENDANCE_INFO ==
                  "VIEW_ATTENDANCE_INFO"
                    ? attendance?.attendence_info?.map((item, id) => {

                        return (
                          <tr>
                            <td>{item?.date_time?.split("T")[0]}</td>
                            <td>{item?.logout==null?"Lat: ":""}{item?.logout==null?item?.latitude:""}{item?.logout==null?" , ":""}{item?.logout==null?"Long: ":""}{item?.logout==null?item?.longitude:""}</td>
                            <td>{item.login}</td>
                            <td>{item?.login==null?"Lat: ":""}{item?.login==null?item?.latitude:""}{item?.login==null?" , ":""}{item?.login==null?"Long: ":""}{item?.login==null?item?.longitude:""}</td>
                            <td>{item.logout}</td>
                          </tr>
                        );
                      })
                    : ""}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* ===================== Add user poup========================== */}
      {adduser && (
        <div className="popupouter adduser-popup">
          <div className="popupinner">
            <h2>Add Delivery Boy User</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => setAddUser((o) => !o)}
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
              <div className="row">
                <div className="col-sm-6">
                  <label>User Name</label>
                  <input
                    maxLength={40}
                    type="text"
                    className={`form-control  ${name ? "" : ""} `}
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Mobile Number</label>

                  <PhoneInput
                    country={"in"}
                    onChange={InputCountryCodeDeliveryFun}
                    className="input_filed "
                  />
                </div>
                <div className="col-12">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control  `}
                    placeholder="Email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label>Password</label>
                  <div className="input_filed text-center">
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
                  </div>
                </div>

                <div className="col-12">
                  <label>Confirm Password</label>

                  <div className="input_filed text-center">
                    <input
                      maxLength={15}
                      type={conformpassword ? "text" : "password"}
                      value={confirmpassword}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {conformpassword ? (
                      <span
                        className="password_eye"
                        onClick={() => setConformPassword((o) => !o)}
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
                        onClick={() => setConformPassword((o) => !o)}
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
                  </div>
                  {confirmpassword !== password ? (
                    <span className="text-danger">
                      <small>Password Not Matched</small>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="input_filed input_file  mb-3 mt-3">
                  <label className="button" for="upllaoad">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>
                  {drivinglicence?.length == 0 ? (
                    <div className="uploadinfo">Driving Licence</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upllaoad"
                    type="file"
                    accept="application/pdf"
                    placeholder="Driving Licence"
                    onChange={(e) => setDrivingLicence(e?.target?.files[0])}
                  />
                </div>
                <div className="input_filed input_file  mb-3 ">
                  <label className="button" for="upload4">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>
                  {aadharcard?.length == 0 ? (
                    <div className="uploadinfo">Aadhar card</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upload4"
                    type="file"
                    accept="application/pdf"
                    placeholder="Aadhar card"
                    onChange={(e) => setAadharCard(e?.target?.files[0])}
                  />
                </div>
                <div className="input_filed input_file  mb-3 mt-3">
                  <label className="button" for="upload2">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      > 
                      </svg>
                    </span>
                  </label>
                  {chequebook?.length == 0 ? (
                    <div className="uploadinfo">Cheque Book</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upload2"
                    type="file"
                    accept="application/pdf,image/*"
                    placeholder="Cheque Book"
                    onChange={(e) => setChequeBook(e?.target?.files[0])}
                  />
                </div>
                <div className="input_filed input_file  mb-3 mt-3">
                  <label className="button" for="upload3">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                      </svg>
                    </span>
                  </label>
                  {Passbook?.length == 0 ? (
                    <div className="uploadinfo">Passbook</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upload3"
                    type="file"
                    accept="application/pdf,image/*"
                    placeholder="PassBook"
                    onChange={(e) => setPassbook(e?.target?.files[0])}
                  />
                </div>
                <div className="input_filed input_file  mb-3 mt-3">
                  <label className="button" for="upload5">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                       
                      </svg>
                    </span>
                  </label>
                  {photoOne?.length == 0 ? (
                    <div className="uploadinfo">photo one</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upload5"
                    accept="image/*"
                    type="file"
                    placeholder="Photo One"
                    onChange={(e) => setPhotoOne(e?.target?.files[0])}
                  />
                </div>
                <div className="input_filed input_file  mb-3 mt-3">
                  <label className="button" for="upload6">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                       
                      </svg>
                    </span>
                  </label>
                  {photoTwo?.length == 0 ? (
                    <div className="uploadinfo">photo two</div>
                  ) : (
                    ""
                  )}

                  <input
                    id="upload6"
                    accept="image/*"
                    type="file"
                    placeholder="Photo Two"
                    onChange={(e) => setPhotoTwo(e?.target?.files[0])}
                  />
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
                    min={minDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className={`form-control  ${todate ? "" : ""} `}
                    placeholder="To date"
                    value={todate}
                    min={minDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <div className="col-12 mt-3  ">
                  <label>Category</label>

                  <select
                    className={`form-select  `}
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
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
                  </select>
                </div>
                <div className="col-md-6">
                  <label>Permissions</label>
                </div>

                <div className="col-md-12  multiselectblockclass ">
                  <Multiselect
                    options={GetSettingViewPermissionData?.user_permissions}
                    // Options to display in the dropdown
                    // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="permission" // Property name to display in the dropdown options
                    showCheckbox
                  />
                </div>
              </div>
            </div>
            <div className="btngroups text-end my-3 col-12">
              <button
                type="button"
                className="btn save-btn"
                onClick={(e) => AddUser(e)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={(e) => setAddUser((o) => !o)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===============================Edit employee========================================== */}

      {edituser && (
        <div className="popupouter editb2b-popup ">
          <div className="popupinner">
            <h2>Edit Delivery Boy</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => SetEditUser(false)}
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
                <div className="col-sm-6">
                  <label>User Name</label>
                  <input
                    maxLength={40}
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-sm-6">
                  <label>Mobile Number</label>

                  <PhoneInput
                    country={"in"}
                    value={countrycodedelivery + deliverycontact}
                    onChange={InputCountryCodeDeliveryFun}
                    className="input_filed "
                  />
                </div>
                <div className="col-12">
                  <label>Email</label>
                  <input
                    type="email"
                    className={`form-control input_filed_block`}
                    disabled
                    placeholder="Email"
                    value={email}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="col-12 mt-3  ">
                  <label>Category</label>
                  <select
                    className={`form-select  `}
                    placeholder="Category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
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
                  </select>
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
                    min={minDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="date"
                    className={`form-control  ${todate ? "" : ""} `}
                    placeholder="To date"
                    value={todate}
                    min={minDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
                <label>Driving Licence</label>
                <div className="input_filed input_file mb-3">
                  <label className="button" for="upllaoad">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>
                  {drivinglicence?.length == 0 ? (
                    <div className="uploadinfo">Driving Licence</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">Driving Licence</div> */}
                  <input
                    id="upllaoad"
                    type="file"
                    accept="application/pdf"
                    placeholder="Driving Licence"
                    onChange={(e) => setDrivingLicence(e?.target?.files[0])}
                  />
                </div>
                <label className="">Aadhar card</label>
                <div className="input_filed input_file mb-3">
                  <label className="button" for="upload4">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>                
                  {aadharcard?.length == 0 ? (
                    <div className="uploadinfo">Aadhar card</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">Aadhar card</div> */}
                  <input
                    id="upload4"
                    type="file"
                    accept="application/pdf"
                    placeholder="Aadhar card"
                    onChange={(e) => setAadharCard(e?.target?.files[0])}
                  />
                </div>
                <label className="">Cheque Book</label>
                <div className="input_filed input_file mb-3">
                  <label className="button" for="upload2">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>
                  {chequebook?.length == 0 ? (
                    <div className="uploadinfo">Cheque Book</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">Cheque Book</div> */}
                  <input
                    id="upload2"
                    type="file"
                    accept="application/pdf,image/*"
                    placeholder="Cheque Book"
                    onChange={(e) => setChequeBook(e?.target?.files[0])}
                  />
                </div>
                <label>Passbook</label>
                <div className="input_filed input_file mb-3">
                  <label className="button" for="upload3">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1.35979 0.0809866C0.886416 0.25909 0.553644 0.521557 0.305238 0.910571C-0.0275337 1.43082 0.000587821 0.470001 0.000587821 11.9951C0.000587821 21.5424 0.00527474 22.4001 0.0802655 22.6157C0.281803 23.2203 0.769243 23.7078 1.37854 23.914C1.58945 23.989 2.23156 23.9937 8.99947 23.9937C15.7674 23.9937 16.4095 23.989 16.6204 23.914C17.0704 23.764 17.4359 23.4781 17.6937 23.0797C18.0218 22.5641 17.9984 23.3187 17.9984 13.8465V5.3069L17.8624 5.12411C17.6984 4.90851 12.9646 0.184099 12.7959 0.0716128C12.6928 0.00130901 12.1913 -0.00337791 7.12471 0.00130901C2.05346 0.00130901 1.55196 0.0106828 1.35979 0.0809866ZM11.9991 2.70566C11.9991 4.56168 12.0085 4.61793 12.3038 5.08193C12.5615 5.48032 12.9271 5.76622 13.3771 5.9162C13.5786 5.98651 13.8457 5.99588 15.2893 5.99588H16.9672V14.0902C16.9672 21.8752 16.9626 22.1986 16.8782 22.3767C16.7704 22.6063 16.5782 22.7938 16.3486 22.8875C16.1939 22.9532 15.3784 22.9625 8.99947 22.9625C2.62058 22.9625 1.80505 22.9532 1.65038 22.8875C1.42072 22.7938 1.22856 22.6063 1.12076 22.3767C1.0364 22.1939 1.03171 21.8189 1.03171 12.0045C1.03171 2.90251 1.04108 1.80109 1.1067 1.64642C1.20044 1.41676 1.38792 1.2246 1.61758 1.1168C1.79568 1.03243 2.0394 1.02774 6.90442 1.02774H11.9991V2.70566ZM15.0597 4.95538C13.7801 4.96944 13.6395 4.9507 13.3724 4.71635C13.049 4.43514 13.0302 4.3414 13.0302 2.97282V1.75422L14.6238 3.34777L16.2173 4.94132L15.0597 4.95538Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                        <path
                          d="M7.99172 8.05807C7.34492 8.26898 6.98403 8.96733 6.98403 9.99846C6.98403 10.6734 7.3168 11.5217 7.91204 12.3653L8.18857 12.7637L7.80424 13.912C7.59333 14.5448 7.34961 15.2431 7.26525 15.454L7.11526 15.8477L5.69513 16.5414C4.9171 16.921 4.13438 17.3241 3.95628 17.4413C3.54383 17.7038 3.22981 18.0225 3.09857 18.2943C2.9814 18.5474 2.96734 18.9927 3.06577 19.2317C3.31417 19.8222 4.29843 20.1784 4.97334 19.9207C5.87792 19.5785 6.89029 18.5146 7.65895 17.0945C7.87455 16.7008 7.88861 16.682 8.1417 16.5883C8.60102 16.4148 9.47279 16.1664 10.1711 16.0024C11.3663 15.7259 11.221 15.7259 11.61 16.0118C12.5521 16.7008 13.1614 17.0101 13.5785 17.0101C14.1597 17.0101 14.6237 16.7898 14.8487 16.4055C14.9518 16.2274 14.9752 16.1243 14.9893 15.7681C15.0034 15.3931 14.994 15.3228 14.8956 15.1353C14.5862 14.5635 13.7098 14.3714 12.2381 14.5495L11.5444 14.6338L11.1273 14.2917C10.682 13.9214 9.83368 13.0824 9.54309 12.7309L9.36967 12.5153L9.53372 12.0091C9.754 11.3155 9.9696 10.4812 10.0071 10.1625C10.0446 9.84379 9.96023 9.09388 9.85711 8.80798C9.66495 8.28304 9.28531 8.02526 8.6432 7.98777C8.35261 7.96902 8.212 7.98308 7.99172 8.05807ZM8.84005 9.14075C8.91973 9.2298 8.9291 9.31416 8.92442 9.83441C8.92442 10.3734 8.91035 10.4718 8.75569 10.9593L8.59164 11.4983L8.40885 11.1749C8.15107 10.7062 8.05265 10.3875 8.04327 9.97971C8.03859 9.54851 8.08077 9.32354 8.20732 9.16418C8.33386 9.00014 8.69944 8.98608 8.84005 9.14075ZM9.58996 14.3151C9.94616 14.6713 10.1524 14.9103 10.1149 14.9197C10.0821 14.9338 9.72588 15.0275 9.32749 15.1306C8.9291 15.2337 8.55884 15.3322 8.51197 15.3509C8.44166 15.379 8.4276 15.3697 8.44635 15.3181C8.46041 15.2806 8.58227 14.9103 8.72288 14.4885C8.8588 14.0714 8.98066 13.7292 8.98535 13.7292C8.99003 13.7292 9.26187 13.9917 9.58996 14.3151ZM13.841 15.5993C14.0753 15.6884 13.93 15.979 13.6488 15.979C13.527 15.979 13.0817 15.754 12.8895 15.5993L12.7724 15.5009L13.2411 15.529C13.5035 15.5431 13.7707 15.5759 13.841 15.5993ZM5.97166 17.76C5.8498 17.9194 5.58264 18.2053 5.37642 18.3974C4.82336 18.9317 4.40622 19.0817 4.11095 18.8614C4.03127 18.8005 4.02658 18.7911 4.10157 18.6786C4.21406 18.5052 4.61245 18.2568 5.43266 17.8444C5.83105 17.6428 6.16382 17.4788 6.17319 17.4788C6.18257 17.4788 6.09352 17.6053 5.97166 17.76Z"
                          fill="#828282"
                          fillOpacity="0.5"
                        />
                      </svg>
                    </span>
                  </label>
                  {Passbook?.length == 0 ? (
                    <div className="uploadinfo">Passbook</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">Passbook</div> */}
                  <input
                    id="upload3"
                    type="file"
                    accept="application/pdf,image/*"
                    placeholder="PassBook"
                    onChange={(e) => setPassbook(e?.target?.files[0])}
                  />
                </div>
                <label>photo one</label>
                <div className="input_filed input_file mb-3">
                  <label className="button" for="upload5">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        
                      </svg>
                    </span>
                  </label>
                  {photoOne?.length == 0 ? (
                    <div className="uploadinfo">photo one</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">photo one</div> */}
                  <input
                    id="upload5"
                    accept="image/*"
                    type="file"
                    placeholder="Photo One"
                    onChange={(e) => setPhotoOne(e?.target?.files[0])}
                  />
                </div>
                <label>photo two</label>
                <div className="input_filed input_file  mb-3 ">
                  <label className="button" for="upload6">
                    {" "}
                    Upload{" "}
                    <span>
                      <svg
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                      
                      </svg>
                    </span>
                  </label>
                  {photoTwo?.length == 0 ? (
                    <div className="uploadinfo">photo two</div>
                  ) : (
                    ""
                  )}
                  {/* <div className="uploadinfo">photo two</div> */}
                  <input
                    id="upload6"
                    accept="image/*"
                    type="file"
                    placeholder="Photo Two"
                    onChange={(e) => setPhotoTwo(e?.target?.files[0])}
                  />
                </div>
                <div className="col-md-6 ">
                  <label>Permissions</label>
                </div>
                <div className="col-md-12 multiselectblockclass">
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
                <div className="col-12">
                  <label>Category</label>

                  <select
                    className={`form-select  `}
                    placeholder="Category"
                    value={editcategoryvalue}
                    onChange={(e) => setEditCategoryValue(e.target.value)}
                  >
                    {/* <option value="" selected="selected">
                      Select Category...
                    </option> */}
                    {GetCategoryDetailsData?.category_details_list.map(
                      (item, id) => {
                        return (
                          <option value={item.id}>{item.category_name}</option>
                        );
                      }
                    )}
                  </select>
                </div>
              </div>
            </div>
            <div className="btngroups text-end my-3">
              <button
                type="button"
                className="btn save-btn"
                onClick={(e) => EditSaveBtn(e)}
              >
                Save
              </button>
              <button
                type="button"
                className="btn cancel-btn"
                onClick={(e) => SetEditUser(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <LodingSpiner loadspiner={OrderPagesLoaderTrueFalseData} />
    </div>
  );
};

export default DeliveryBoy;
