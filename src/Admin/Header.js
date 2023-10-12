import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import {
  GetWalletBalance,
  PostWalletAddMoney,
  PostCreateTicket,
  PostClearNotification,
  GetAdminProfile,
  GetDashboardNotification,
  GetDeliveryBoyNotification,
  PostDeliveryBoyNotification,
  GetAdminRemarkNotification,
  PostRemarkNotification,
  PostPincodeUploadFile,
  GetUserNotification,
  GetAuthDetails,
  PostPincodeUploadFileDispatch,
  latAndLogAttendence,
} from "../Redux/action/ApiCollection";

import { useLocation, useNavigate } from "react-router-dom";
import { Checkbox } from "antd";
import { PermissionData } from "../Permission";
import { TokenDataValidCheck } from "../Authanticate";

const Sidebar = () => {
  const [notification, setNotification] = useState(false);
  const [pagepathdata, setPagePathData] = useState("");
  const [notificationIcon, setNotificationIcon] = useState(false);
  const [raiseissue, setRaiseIssue] = useState(false);
  const [orderid, setOrderId] = useState("");
  const [title, setTilte] = useState("");
  const [description, setDescription] = useState("");
  const [allsearchbar, setAllSearchBar] = useState(false);
  const [OpenPathSearch, setOpenPathSearch] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedOptionclass, setSelectedOptionClass] = useState("");
  const [SearchFiterData, setSearchFiterData] = useState("");
  const [HeaderMenu, setHeaderMenu] = useState(false);
  const [deliveryboydata, setDeliveryBoyData] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let paramHash = useLocation();

  const GetAdminProfileData = useSelector(
    (state) => state.GetAdminProfileReducer.GetAdminProfileData?.data
  );
  const GetDashboardNotificationData = useSelector(
    (state) =>
      state.GetDashboardNotificationReducer.GetDashboardNotificationData?.data
  );
  const GetDeliveryBoyNotificationData = useSelector(
    (state) =>
      state.GetDeliveryBoyNotificationReducer.GetDeliveryBoyNotificationData
        ?.data
  );

  const GetAdminRemarkNotificationData = useSelector(
    (state) =>
      state.GetAdminRemarkNotificationReducer.GetAdminRemarkNotificationData
        ?.data
  );
  const GetUserNotificationData = useSelector(
    (state) => state.GetUserNotificationReducer.GetUserNotificationData
  );
  const GetWalletBalanceData = useSelector(
    (state) => state.GetWalletBalanceReducer?.GetWalletBalanceData
  );
  const PostCreateTicketData = useSelector(
    (state) => state.PostCreateTicketReducer?.PostCreateTicketData
  );
  const PostClearNotificationData = useSelector(
    (state) => state.PostClearNotificationReducer?.PostClearNotificationData
  );

  const PostPincodeUploadFileData = useSelector(
    (state) => state.PostPincodeUploadFileReducer?.PostPincodeUploadFileData
  );
  const GetAuthDetailsData = useSelector(
    (state) => state.GetAuthDetailsReducer?.GetAuthDetailsData?.data
  );
  let isEmployeData = sessionStorage.getItem("isEmploye", false);
  let isAdmin_Role = sessionStorage.getItem("Admin_Role", false);
  let isDeliveryboy_Role = sessionStorage.getItem("Is_delivery_boy", false);
  useEffect(() => {
    // navigate(TokenDataValidCheck())
    setDeliveryBoyData(GetDeliveryBoyNotificationData);
    dispatch(GetAdminProfile());
    dispatch(GetUserNotification());
    // dispatch(GetDashboardNotification());
    if (isDeliveryboy_Role == "true") {
      dispatch(GetDeliveryBoyNotification());
      setInterval(() => {
        dispatch(GetDeliveryBoyNotification());
      }, 50000);
    } else {
      dispatch(GetDashboardNotification());
      dispatch(GetAdminRemarkNotification());
    }
    // VIEW_WALLET_BALANCE
    // if (isEmployeData != "true" || isDeliveryboy_Role != "true") {
    //   dispatch(GetWalletBalance());
    // }
    // else{

    // }

    if (isEmployeData == "true" || isDeliveryboy_Role == "true") {
      // dispatch(GetWalletBalance());
    } else {
      dispatch(GetWalletBalance());
    }

    // dispatch(GetAuthDetails());
  }, []);

  const timeConvert = (time) => {
    time = time
      ?.toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? "AM" : "PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }

    let hour = time[0];
    let coln = time[1];
    let mint = time[2];
    let AmPm = time[5];

    let timeData = [hour, coln, mint, AmPm];
    // let data = time.splice(3, 1);
    return timeData.join(""); // return adjusted time or original string
  };

  let pageData = [
    {
      label: ` Dashboard `,
      path: `${
        PermissionData().VIEW_ADMIN_DASHBOARD_PAGE ==
        "VIEW_ADMIN_DASHBOARD_PAGE"
          ? "/admin/dashboard"
          : "null"
      }`,
    },
    {
      label: ` Order `,
      path: `${
        PermissionData().VIEW_ORDER_PAGE == "VIEW_ORDER_PAGE"
          ? "/admin/order#pending"
          : ""
      }`,
    },
    // { label: "Tracking", path: "/admin/tracking" },
    // { label: "Customer", path: "/admin/customer"},
    {
      label: `${
        PermissionData().VIEW_SETTING_PAGE == "VIEW_SETTING_PAGE"
          ? "Setting"
          : ""
      }`,
      path: `${
        PermissionData().VIEW_SETTING_PAGE == "VIEW_SETTING_PAGE"
          ? "/admin/setting"
          : ""
      }`,
    },
    {
      label: `Support B2B`,
      path: `${
        PermissionData().VIEW_B2B_TICKETS == "VIEW_B2B_TICKETS" ||
        PermissionData().VIEW_SUPPORT_B2B_PAGE !== "VIEW_SUPPORT_B2B_PAGE"
          ? "/admin/support/b2b"
          : "null"
      }`,
    },
    {
      label: `Support B2C`,
      path: `${
        PermissionData().VIEW_B2C_TICKETS == "VIEW_B2C_TICKETS" ||
        PermissionData().VIEW_SUPPORT_B2C_PAGE == "VIEW_SUPPORT_B2C_PAGE"
          ? "/admin/support/b2b/b2c"
          : "null"
      }`,
    },
    // { label: "Accounting", path:`${PermissionData().CREATE_ORDER =="CREATE_ORDER"? "/admin/support/accounting" :"null"}` },
    {
      label: `Add Order `,
      path: `${
        PermissionData().CREATE_ORDER == "CREATE_ORDER" ||
        PermissionData().VIEW_ORDER_CREATE_PAGE == "VIEW_ORDER_CREATE_PAGE"
          ? "/admin/order/User#pending"
          : "null"
      }`,
    },
    {
      label: `COD Remittance `,
      path: `${
        PermissionData().VIEW_COD_REMITTANCE == "VIEW_COD_REMITTANCE" ||
        PermissionData().VIEW_COD_REMITTANCE_PAGE == "VIEW_COD_REMITTANCE_PAGE"
          ? "/admin/invoices/cod#pending"
          : "null"
      }`,
    },
    {
      label: `Invoices `,
      path: `${
        PermissionData().VIEW_INVOICES == "VIEW_INVOICES" ||
        PermissionData().VIEW_INVOICE_PAGE == "VIEW_INVOICE_PAGE"
          ? "/admin/invoices/cod#hd"
          : "null"
      }`,
    },
    {
      label: "Tickets B2B",
      path: `${
        PermissionData().VIEW_B2B_TICKETS == "VIEW_B2B_TICKETS" ||
        PermissionData().VIEW_SUPPORT_B2B_PAGE == "VIEW_SUPPORT_B2B_PAGE"
          ? "/admin/support/b2b"
          : "null"
      }`,
    },
    {
      label: "Tickets B2C",
      path: `${
        PermissionData().VIEW_B2C_TICKETS == "VIEW_B2C_TICKETS" ||
        PermissionData().VIEW_SUPPORT_B2C_PAGE == "VIEW_SUPPORT_B2C_PAGE"
          ? "/admin/support/b2b/b2c"
          : "null"
      }`,
    },
    {
      label: "Feedback B2B",
      path: `${
        PermissionData().VIEW_B2B_FEEDBACK == "VIEW_B2B_FEEDBACK" ||
        PermissionData().VIEW_B2B_FEEDBACK_PAGE == "VIEW_B2B_FEEDBACK_PAGE"
          ? "/admin/setting/b2bfeedback"
          : "null"
      }`,
    },
    {
      label: "Feedback B2C",
      path: `${
        PermissionData().VIEW_B2C_FEEDBACK == "VIEW_B2C_FEEDBACK" ||
        PermissionData().VIEW_B2C_FEEDBACK_PAGE == "VIEW_B2C_FEEDBACK_PAGE"
          ? "/admin/setting/b2cfeedback"
          : "null"
      }`,
    },
    { label: "Profile", path: "/admin/setting/adminsetting#pending" },
    {
      label: "Employee",
      path: `${
        PermissionData().VIEW_EMPLOYEE == "VIEW_EMPLOYEE" ||
        PermissionData().VIEW_SETTING_EMPLOYEE_PAGE ==
          "VIEW_SETTING_EMPLOYEE_PAGE"
          ? "/admin/setting/employee#pending"
          : "null"
      }`,
    },
    {
      label: "User Profile B2B",
      path: `${
        PermissionData().VIEW_B2B_USER_PROFILE == "VIEW_B2B_USER_PROFILE" ||
        PermissionData().VIEW_SETTING_USER_PROFILE_PAGE ==
          "VIEW_SETTING_USER_PROFILE_PAGE"
          ? "/admin/setting/userprofile#pending"
          : "null"
      }`,
    },
    {
      label: "User Profile B2C",
      path: `${
        PermissionData().VIEW_B2C_USER_PROFILE == "VIEW_B2C_USER_PROFILE" ||
        PermissionData().VIEW_SETTING_USER_B2C_PAGE ==
          "VIEW_SETTING_USER_B2C_PAGE"
          ? "/admin/setting/userb2c#pending"
          : "null"
      }`,
    },
    {
      label: "Categories",
      path: `${
        PermissionData().VIEW_CATEGORY == "VIEW_CATEGORY" ||
        PermissionData().VIEW_SETTING_CATEGORY_PAGE ==
          "VIEW_SETTING_CATEGORY_PAGE"
          ? "/admin/setting/usersetting#pending"
          : "null"
      }`,
    },
  ];

  useEffect(() => {
    const result = pageData?.filter((item) => item.path != "null");
    setSearchFiterData(result);
    // if( PermissionData()?.VIEW_B2C_TICKETS == "VIEW_B2C_TICKETS"){
    //   return( item.label = "Support B2C",item.path="/admin/support/b2b/b2c" )
    // }else{
    //   return("")
    // }
  }, []);

  let as_individual = sessionStorage.getItem("as_individual", false);

  const SearchPage = (e) => {
    let value = e.target.value.toUpperCase();
    let result = [];
    result = pageData?.filter((data) => {
      //get client data c-2 -3a

      if (isNaN(+value)) {
        return data?.value.toUpperCase().search(value) !== -1;
      }
    });
    setPagePathData(result);
  };

  // [0].value

  useEffect(() => {
    if (selectedOption?.length !== 0) {
      navigate(selectedOption?.path);
      setSelectedOption("");
    }

    if (as_individual?.toString() == "true") {
      navigate("/");
      window.location.reload(false);
    }
  }, [selectedOption, as_individual]);

  const Logoutfun = () => {
    let is_delivery_boy = sessionStorage.getItem("Is_delivery_boy", false);
    if (is_delivery_boy == "true") {
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
              logout_time: hoursIST + ":" + minutesIST,
              latitude: latitude,
              longitude: longitude,
              login_logout: "logout",
            };

            let logouttoken = sessionStorage.getItem("token", false);
            dispatch(latAndLogAttendence(payload, logouttoken));
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("Admin_Role");
            toast.success(" Logout successfully");
            sessionStorage.clear();
            navigate("/");
            // sessionStorage.setItem("deliveryboytoken", Response.data.Token);
          },
          function (error) {
            // Handle any errors that occur during location retrieval
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              default:
                console.error("An unknown error occurred.");
            }
          }
        );
      }
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("Admin_Role");
      toast.success(" Logout successfully");
      sessionStorage.clear();
      navigate("/");
    }
  };

  const PincodeFile = (e) => {
    dispatch(PostPincodeUploadFile(e?.target?.files[0]));
  };

  const RaiseTicket = () => {
    let payload = {
      order_id: orderid,
      title: title,
      description: description,
    };
    if (!orderid && !title && !description) {
      toast.warn("Please Enter All Input Fields");
    } else if (orderid.length == 0) {
      toast.warn("Please Select OrderId");
    } else if (title.length == 0) {
      toast.warn("Please Enter Issue");
    } else if (description.length == 0) {
      toast.warn("Please Enter Remark");
    } else {
      dispatch(PostCreateTicket(payload));
      setRaiseIssue((o) => !o);
      setOrderId("");
      setTilte("");
      setDescription("");
    }
  };
  const openSearchFun = () => {
    setAllSearchBar((o) => !o);
    setNotification(false);
  };

  const ClearNotification = (e, item) => {
    let payload = {
      order_id: [item.order_id],
    };
    let remarkpayload = {
      id: [item.remark_id],
    };
    if (isDeliveryboy_Role == "true") {
      dispatch(PostDeliveryBoyNotification(payload));
    } else {
      dispatch(PostRemarkNotification(remarkpayload));
    }
    setNotification((o) => !o);
  };
  const openpopupftn = (e) => {
    //  let state = {
    //     openpopup:true
    //   }
  };
  const ClearNotificationn = (e, item) => {
    let arrayData = [];
    GetDashboardNotificationData?.map((item, id) => {
      arrayData.push(item?.order_id);
    });

    let array = [];
    GetUserNotificationData?.data?.map((item, id) => {
      array.push(item?.email);
    });

    let deliveryboyarray = [];
    GetDeliveryBoyNotificationData?.map((item, id) => {
      deliveryboyarray.push(item?.order_id);
    });

    let remarkarray = [];
    GetAdminRemarkNotificationData?.map((item, id) => {
      remarkarray.push(item?.remark_id);
    });
    let payload = {
      order_id: arrayData,
    };

    // let payloaaad = {
    //   email: array,
    // };

    let deliveryboypayload = {
      order_id: deliveryboyarray,
    };
    let remarkpayload = {
      id: remarkarray,
    };
    setNotification((o) => !o);
    // dispatch(PostClearNotification(payloaaad));
    if (GetDeliveryBoyNotificationData != undefined) {
      dispatch(PostDeliveryBoyNotification(deliveryboypayload));
    } else if (GetDashboardNotificationData?.length != 0) {
      dispatch(PostClearNotification(payload));
    } else if (GetAdminRemarkNotificationData?.length != 0) {
      dispatch(PostRemarkNotification(remarkpayload));
    }
  };

  const ClearUserNotification = (e, item) => {
    let payload = {
      email: [item.email],
    };
    dispatch(PostClearNotification(payload));
    setNotification((o) => !o);
  };

  const requestRegion = (event, item) => {
    let Data = event.target.value;
  };

  const SearchFilterPathFun = (e) => {
    if (e.length == 0) {
      setOpenPathSearch(false);
    } else {
      setOpenPathSearch(true);
    }
    // setSelectedOption(e)
  };

  useEffect(() => {
    if (OpenPathSearch == true) {
      setSelectedOptionClass("opnePathDataBlock");
    } else {
      setSelectedOptionClass("opnePathData");
    }
  }, [OpenPathSearch]);

  return (
    <>
      <div
        className={`adminheader-bar ${
          allsearchbar !== true ? "" : "formsmshow"
        }`}
      >
        <div className={`left-part ${allsearchbar !== true ? "" : ""}`}>
          <div
            className={`form-group 
            ${selectedOptionclass}
            `}
          >
            <Select
              value={selectedOption}
              onChange={setSelectedOption}
              options={SearchFiterData}
              placeholder={"Search"}
              onInputChange={SearchFilterPathFun}
              styles={{
                control: (baseStyles, state) => ({
                  ...baseStyles,
                  outline: "none !important",
                  border: "none !important",
                  borderRadius: "14px !important",
                  backgroundColor: "#f6f7f8 !important",
                  boxShadow: "none !important",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: "#FFDC5A",
                  // primary: 'white',
                },
              })}
            />

            <span className="search-icon pt-1">
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.86869 7.29932e-07C6.9988 -0.000563318 8.10501 0.325781 9.05429 0.939785C10.0036 1.55379 10.7555 2.42931 11.2196 3.46105C11.6837 4.49279 11.8403 5.63682 11.6705 6.75555C11.5007 7.87428 11.0118 8.92008 10.2625 9.76717L16 16.2881L15.2037 17L9.48042 10.5075C8.74423 11.0841 7.88111 11.4762 6.96294 11.6512C6.04478 11.8262 5.09815 11.7789 4.2019 11.5134C3.30566 11.2479 2.48575 10.7718 1.81047 10.1248C1.13519 9.47775 0.62409 8.67852 0.319736 7.79367C0.0153828 6.90882 -0.07341 5.96396 0.0607538 5.03779C0.194918 4.11162 0.548154 3.23095 1.09104 2.46915C1.63393 1.70735 2.35075 1.08646 3.18179 0.658205C4.01284 0.229949 4.93405 0.00672247 5.86869 0.00711966V7.29932e-07ZM5.86869 10.6784C7.14148 10.6784 8.36213 10.1721 9.26213 9.27096C10.1621 8.3698 10.6677 7.14755 10.6677 5.87312C10.6677 4.59868 10.1621 3.37644 9.26213 2.47527C8.36213 1.57411 7.14148 1.06784 5.86869 1.06784C4.59591 1.06784 3.37526 1.57411 2.47526 2.47527C1.57527 3.37644 1.06966 4.59868 1.06966 5.87312C1.06966 7.14755 1.57527 8.3698 2.47526 9.27096C3.37526 10.1721 4.59591 10.6784 5.86869 10.6784Z"
                  fill="black"
                  fillOpacity="0.2"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="right-part">
          <ul>
            {isEmployeData == "false" ? (
              <div className="d-flex pt-1 ">
                <li
                  onClick={(e) => {
                    navigate("/admin/wallethistory");
                  }}
                  className="d-flex pt-1 "
                  role="button"
                >
                  {PermissionData()?.VIEW_WALLET_HISTORY_PAGE ==
                  "VIEW_WALLET_HISTORY_PAGE" ? (
                    <svg
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.9576 0.101521C13.7853 0.161831 11.7692 1.31204 8.7063 3.09552L3.73496 5.99044H2.84753C2.36074 5.99044 1.83517 6.01198 1.68009 6.03783C0.943433 6.15414 0.331709 6.67109 0.0861583 7.39051C0 7.63606 0 7.74807 0 14.0247C0 19.5776 0.00861583 20.4349 0.0646187 20.6244C0.258475 21.2706 0.788348 21.8005 1.43454 21.9943C1.62408 22.0503 2.75707 22.059 10.5285 22.059C20.1352 22.059 19.5364 22.0719 20.0189 21.8306C20.286 21.6928 20.6651 21.318 20.8158 21.038C21.0528 20.6115 21.0657 20.465 21.0657 18.6471V16.9756L21.2725 16.8722C21.5094 16.7516 21.7894 16.463 21.9359 16.1916L22.035 16.0063V14.0462V12.0861L21.9316 11.8751C21.798 11.6123 21.4836 11.2935 21.2466 11.1858L21.0657 11.1039V9.41523C21.0657 7.98931 21.0571 7.69207 20.9968 7.4939C20.7771 6.74863 20.1869 6.19722 19.4718 6.06367L19.2305 6.01629L17.7658 3.45739C16.215 0.743399 16.0599 0.515079 15.6248 0.265221C15.1251 -0.0147934 14.4832 -0.0794125 13.9576 0.101521ZM15.026 1.14834C15.1509 1.20865 15.2888 1.31204 15.3362 1.38097L15.418 1.49728L11.5624 3.74602L7.70255 5.99044L6.78497 5.98182L5.86738 5.9689L9.93405 3.59955C12.1742 2.29425 14.0955 1.18711 14.2075 1.13542C14.4832 1.00187 14.746 1.00618 15.026 1.14834ZM16.1848 2.81551C16.3055 3.0309 16.3959 3.22476 16.3787 3.24199C16.3615 3.25922 15.2974 3.88387 14.0093 4.63345L11.6744 5.99044L10.7569 5.98182L9.83928 5.9689L12.8807 4.19404C14.5521 3.22045 15.9264 2.41918 15.9393 2.41918C15.9522 2.41918 16.0599 2.5958 16.1848 2.81551ZM17.4686 5.06855C17.7443 5.55534 17.964 5.96029 17.9554 5.97321C17.9425 5.98182 17.0076 5.98613 15.8747 5.98182L13.8155 5.9689L15.3405 5.07716C16.1805 4.58606 16.887 4.18542 16.9129 4.18111C16.9387 4.18111 17.1886 4.58175 17.4686 5.06855ZM19.4545 7.14065C19.6829 7.26127 19.9155 7.53267 19.9801 7.75238C20.0146 7.86438 20.0318 8.4158 20.0318 9.47554V11.0307H18.3173C16.7492 11.0307 16.5682 11.0393 16.2667 11.1169C15.2328 11.3796 14.4186 12.1895 14.1257 13.2493C14.005 13.6801 13.9964 14.3607 14.1041 14.7786C14.3669 15.7866 15.138 16.6008 16.1719 16.9455C16.4175 17.0273 16.5596 17.0359 18.2354 17.0489L20.0318 17.0661V18.6471C20.0318 20.2195 20.0318 20.2281 19.9284 20.4478C19.8121 20.6934 19.5665 20.9217 19.3425 20.982C19.2478 21.0078 16.0039 21.0251 10.4898 21.0251C2.10226 21.0251 1.78348 21.0208 1.61547 20.9432C1.52069 20.9001 1.38284 20.7967 1.3053 20.7192C1.01236 20.409 1.0339 20.9001 1.0339 14.0333V7.817L1.14591 7.59298C1.27514 7.3302 1.54223 7.12342 1.82225 7.06742C1.92133 7.05019 5.88892 7.03726 10.6405 7.04157L19.2779 7.04588L19.4545 7.14065ZM20.7641 12.1292C21.0183 12.2628 21.0226 12.2929 21.0226 14.0462C21.0226 15.8168 21.0226 15.8297 20.7469 15.959C20.6177 16.0193 20.3764 16.0279 18.7954 16.0279C17.8046 16.0279 16.8784 16.0063 16.7362 15.9848C16.5941 15.9633 16.3442 15.8771 16.1762 15.7953C14.9571 15.1921 14.6986 13.6111 15.6593 12.6462C15.9177 12.3877 16.2021 12.224 16.5553 12.1292C16.8999 12.0388 20.5875 12.0388 20.7641 12.1292Z"
                        fill="#656E7A"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </li>
                <div className="text-nowrap pt-1">
                  &nbsp;&nbsp;
                  <b>
                    {" "}
                    {PermissionData().VIEW_WALLET_BALANCE ==
                    "VIEW_WALLET_BALANCE"
                      ? GetWalletBalanceData?.data?.current_balance_status ==
                        "NEGATIVE"
                        ? `Rs. -${GetWalletBalanceData?.data?.current_balance} /-`
                        : `Rs. ${GetWalletBalanceData?.data?.current_balance} /-`
                      : ""}
                  </b>
                </div>
              </div>
            ) : (
              ""
            )}
            {isAdmin_Role == "true" ||
            isEmployeData == "false" ||
            isDeliveryboy_Role == "true" ? (
              <li
                onClick={(e) => {
                  setNotification((o) => !o);
                  setAllSearchBar(false);
                  setHeaderMenu(false);
                }}
                role="button"
              >
                {(GetUserNotificationData &&
                  GetUserNotificationData?.length > 0) ||
                (GetUserNotificationData?.data?.length &&
                  GetUserNotificationData?.data?.length > 0) ||
                (GetDashboardNotificationData &&
                  GetDashboardNotificationData?.length > 0) ||
                (GetDashboardNotificationData?.data?.length &&
                  GetDashboardNotificationData?.data?.length > 0) ||
                ( GetDeliveryBoyNotificationData && GetDeliveryBoyNotificationData?.length > 0)||
                (
                  deliveryboydata && deliveryboydata?.length > 0 ||
                  deliveryboydata && deliveryboydata != undefined 
                ) || (
                  GetAdminRemarkNotificationData?.length &&
                    GetAdminRemarkNotificationData?.length >= 0
                ) ? (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0001 20.949C11.385 20.9401 11.7545 20.7954 12.043 20.5404C12.3315 20.2854 12.5206 19.9366 12.5767 19.5557H9.3623C9.42004 19.947 9.61795 20.304 9.91921 20.5603C10.2205 20.8166 10.6046 20.9547 11.0001 20.949V20.949Z"
                      fill="#656E7A"
                    />
                    <path
                      d="M19.8676 17.0072C19.2783 16.4819 18.7624 15.8796 18.3337 15.2167C17.8657 14.3016 17.5852 13.3022 17.5087 12.2772V9.25833C17.5062 8.89163 17.4735 8.52576 17.4109 8.16444C16.9299 8.06829 16.4677 7.89494 16.042 7.65111C16.2043 8.17351 16.2867 8.71742 16.2865 9.26444V12.2833C16.3614 13.5337 16.7053 14.7531 17.2948 15.8583C17.7167 16.5269 18.2173 17.1424 18.7859 17.6917H3.13537C3.70395 17.1424 4.20457 16.5269 4.62648 15.8583C5.21597 14.7531 5.55991 13.5337 5.63481 12.2833V9.25833C5.6316 8.55108 5.76792 7.85015 6.03597 7.19566C6.30403 6.54117 6.69855 5.94598 7.19694 5.44418C7.69534 4.94237 8.28783 4.54381 8.94048 4.2713C9.59313 3.9988 10.2931 3.85771 11.0004 3.85611C12.0354 3.85693 13.0473 4.16304 13.9093 4.73611C13.8142 4.38715 13.7609 4.02817 13.7504 3.66666V3.28166C13.1123 2.96777 12.4268 2.76129 11.7215 2.67055V1.90055C11.7215 1.68418 11.6355 1.47667 11.4825 1.32367C11.3295 1.17067 11.122 1.08472 10.9056 1.08472C10.6893 1.08472 10.4818 1.17067 10.3288 1.32367C10.1758 1.47667 10.0898 1.68418 10.0898 1.90055V2.70111C8.51053 2.92389 7.06516 3.7105 6.02056 4.91573C4.97595 6.12096 4.40265 7.66341 4.40648 9.25833V12.2772C4.32994 13.3022 4.04946 14.3016 3.58148 15.2167C3.16035 15.8781 2.65271 16.4803 2.07204 17.0072C2.00685 17.0645 1.95461 17.135 1.91878 17.214C1.88295 17.293 1.86437 17.3788 1.86426 17.4656V18.2967C1.86426 18.4587 1.92864 18.6142 2.04325 18.7288C2.15785 18.8434 2.31329 18.9078 2.47537 18.9078H19.4643C19.6263 18.9078 19.7818 18.8434 19.8964 18.7288C20.011 18.6142 20.0754 18.4587 20.0754 18.2967V17.4656C20.0753 17.3788 20.0567 17.293 20.0208 17.214C19.985 17.135 19.9328 17.0645 19.8676 17.0072V17.0072Z"
                      fill="#656E7A"
                    />
                    <path
                      d="M18.3329 6.72219C20.0204 6.72219 21.3885 5.35418 21.3885 3.66664C21.3885 1.9791 20.0204 0.611084 18.3329 0.611084C16.6454 0.611084 15.2773 1.9791 15.2773 3.66664C15.2773 5.35418 16.6454 6.72219 18.3329 6.72219Z"
                      fill="#FFC900"
                    />
                  </svg>
                ) : ( GetDeliveryBoyNotificationData && GetDeliveryBoyNotificationData?.length == 0)||
                ( deliveryboydata&&deliveryboydata?.length == 0 ||
                deliveryboydata&&deliveryboydata == undefined ||  deliveryboydata&&deliveryboydata == [])? (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0001 20.949C11.385 20.9401 11.7545 20.7954 12.043 20.5404C12.3315 20.2854 12.5206 19.9366 12.5767 19.5557H9.3623C9.42004 19.947 9.61795 20.304 9.91921 20.5603C10.2205 20.8166 10.6046 20.9547 11.0001 20.949V20.949Z"
                      fill="#656E7A"
                    />
                    <path
                      d="M19.8676 17.0072C19.2783 16.4819 18.7624 15.8796 18.3337 15.2167C17.8657 14.3016 17.5852 13.3022 17.5087 12.2772V9.25833C17.5062 8.89163 17.4735 8.52576 17.4109 8.16444C16.9299 8.06829 16.4677 7.89494 16.042 7.65111C16.2043 8.17351 16.2867 8.71742 16.2865 9.26444V12.2833C16.3614 13.5337 16.7053 14.7531 17.2948 15.8583C17.7167 16.5269 18.2173 17.1424 18.7859 17.6917H3.13537C3.70395 17.1424 4.20457 16.5269 4.62648 15.8583C5.21597 14.7531 5.55991 13.5337 5.63481 12.2833V9.25833C5.6316 8.55108 5.76792 7.85015 6.03597 7.19566C6.30403 6.54117 6.69855 5.94598 7.19694 5.44418C7.69534 4.94237 8.28783 4.54381 8.94048 4.2713C9.59313 3.9988 10.2931 3.85771 11.0004 3.85611C12.0354 3.85693 13.0473 4.16304 13.9093 4.73611C13.8142 4.38715 13.7609 4.02817 13.7504 3.66666V3.28166C13.1123 2.96777 12.4268 2.76129 11.7215 2.67055V1.90055C11.7215 1.68418 11.6355 1.47667 11.4825 1.32367C11.3295 1.17067 11.122 1.08472 10.9056 1.08472C10.6893 1.08472 10.4818 1.17067 10.3288 1.32367C10.1758 1.47667 10.0898 1.68418 10.0898 1.90055V2.70111C8.51053 2.92389 7.06516 3.7105 6.02056 4.91573C4.97595 6.12096 4.40265 7.66341 4.40648 9.25833V12.2772C4.32994 13.3022 4.04946 14.3016 3.58148 15.2167C3.16035 15.8781 2.65271 16.4803 2.07204 17.0072C2.00685 17.0645 1.95461 17.135 1.91878 17.214C1.88295 17.293 1.86437 17.3788 1.86426 17.4656V18.2967C1.86426 18.4587 1.92864 18.6142 2.04325 18.7288C2.15785 18.8434 2.31329 18.9078 2.47537 18.9078H19.4643C19.6263 18.9078 19.7818 18.8434 19.8964 18.7288C20.011 18.6142 20.0754 18.4587 20.0754 18.2967V17.4656C20.0753 17.3788 20.0567 17.293 20.0208 17.214C19.985 17.135 19.9328 17.0645 19.8676 17.0072V17.0072Z"
                      fill="#656E7A"
                    />
                  </svg>
                ) : (
                  <svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0001 20.949C11.385 20.9401 11.7545 20.7954 12.043 20.5404C12.3315 20.2854 12.5206 19.9366 12.5767 19.5557H9.3623C9.42004 19.947 9.61795 20.304 9.91921 20.5603C10.2205 20.8166 10.6046 20.9547 11.0001 20.949V20.949Z"
                      fill="#656E7A"
                    />
                    <path
                      d="M19.8676 17.0072C19.2783 16.4819 18.7624 15.8796 18.3337 15.2167C17.8657 14.3016 17.5852 13.3022 17.5087 12.2772V9.25833C17.5062 8.89163 17.4735 8.52576 17.4109 8.16444C16.9299 8.06829 16.4677 7.89494 16.042 7.65111C16.2043 8.17351 16.2867 8.71742 16.2865 9.26444V12.2833C16.3614 13.5337 16.7053 14.7531 17.2948 15.8583C17.7167 16.5269 18.2173 17.1424 18.7859 17.6917H3.13537C3.70395 17.1424 4.20457 16.5269 4.62648 15.8583C5.21597 14.7531 5.55991 13.5337 5.63481 12.2833V9.25833C5.6316 8.55108 5.76792 7.85015 6.03597 7.19566C6.30403 6.54117 6.69855 5.94598 7.19694 5.44418C7.69534 4.94237 8.28783 4.54381 8.94048 4.2713C9.59313 3.9988 10.2931 3.85771 11.0004 3.85611C12.0354 3.85693 13.0473 4.16304 13.9093 4.73611C13.8142 4.38715 13.7609 4.02817 13.7504 3.66666V3.28166C13.1123 2.96777 12.4268 2.76129 11.7215 2.67055V1.90055C11.7215 1.68418 11.6355 1.47667 11.4825 1.32367C11.3295 1.17067 11.122 1.08472 10.9056 1.08472C10.6893 1.08472 10.4818 1.17067 10.3288 1.32367C10.1758 1.47667 10.0898 1.68418 10.0898 1.90055V2.70111C8.51053 2.92389 7.06516 3.7105 6.02056 4.91573C4.97595 6.12096 4.40265 7.66341 4.40648 9.25833V12.2772C4.32994 13.3022 4.04946 14.3016 3.58148 15.2167C3.16035 15.8781 2.65271 16.4803 2.07204 17.0072C2.00685 17.0645 1.95461 17.135 1.91878 17.214C1.88295 17.293 1.86437 17.3788 1.86426 17.4656V18.2967C1.86426 18.4587 1.92864 18.6142 2.04325 18.7288C2.15785 18.8434 2.31329 18.9078 2.47537 18.9078H19.4643C19.6263 18.9078 19.7818 18.8434 19.8964 18.7288C20.011 18.6142 20.0754 18.4587 20.0754 18.2967V17.4656C20.0753 17.3788 20.0567 17.293 20.0208 17.214C19.985 17.135 19.9328 17.0645 19.8676 17.0072V17.0072Z"
                      fill="#656E7A"
                    />
                  </svg>
                )}
              </li>
            ) : (
              ""
            )}
            <li className="searchicon" onClick={(e) => openSearchFun(e)}>
              <span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.4517 7.29932e-07C7.58181 -0.000563318 8.68802 0.325781 9.6373 0.939785C10.5866 1.55379 11.3385 2.42931 11.8026 3.46105C12.2668 4.49279 12.4233 5.63682 12.2535 6.75555C12.0837 7.87428 11.5948 8.92008 10.8455 9.76717L16.583 16.2881L15.7867 17L10.0634 10.5075C9.32724 11.0841 8.46412 11.4762 7.54595 11.6512C6.62778 11.8262 5.68115 11.7789 4.78491 11.5134C3.88867 11.2479 3.06876 10.7718 2.39348 10.1248C1.7182 9.47775 1.2071 8.67852 0.902744 7.79367C0.598391 6.90882 0.509598 5.96396 0.643762 5.03779C0.777926 4.11162 1.13116 3.23095 1.67405 2.46915C2.21693 1.70735 2.93375 1.08646 3.7648 0.658205C4.59584 0.229949 5.51706 0.00672247 6.4517 0.00711966V7.29932e-07ZM6.4517 10.6784C7.72449 10.6784 8.94514 10.1721 9.84514 9.27096C10.7451 8.3698 11.2507 7.14755 11.2507 5.87312C11.2507 4.59868 10.7451 3.37644 9.84514 2.47527C8.94514 1.57411 7.72449 1.06784 6.4517 1.06784C5.17892 1.06784 3.95826 1.57411 3.05827 2.47527C2.15828 3.37644 1.65266 4.59868 1.65266 5.87312C1.65266 7.14755 2.15828 8.3698 3.05827 9.27096C3.95826 10.1721 5.17892 10.6784 6.4517 10.6784V10.6784Z"
                    fill="#000"
                  />
                </svg>
              </span>
            </li>
            <li
              className="user-part"
              onClick={(e) => {
                setAllSearchBar(false);
                setNotification(false);
                setHeaderMenu((o) => !o);
              }}
            >
              <div className="dropdown-box">
                <img src="/images/user.png" alt="img" type="button" />
                <ul
                  className={` ${
                    HeaderMenu
                      ? "d-block dropdown-menu"
                      : "d-none dropdown-menu"
                  }  `}
                >
                  {PermissionData()?.VIEW_PROFILE_PAGE ==
                  "VIEW_PROFILE_PAGE" ? (
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          navigate("/admin/setting/adminsetting");
                        }}
                      >
                        {" "}
                        My Profile
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  {isEmployeData == "false" ||
                  PermissionData()?.VIEW_WALLET_HISTORY_PAGE ==
                    "VIEW_WALLET_HISTORY_PAGE" ? (
                    <li>
                      <a
                        className="dropdown-item"
                        onClick={(e) => {
                          navigate("/admin/wallethistory");
                        }}
                      >
                        {" "}
                        My Wallet
                      </a>
                    </li>
                  ) : (
                    ""
                  )}
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={(e) => setRaiseIssue((o) => !o)}
                    >
                      {" "}
                      Raise Issue
                    </a>
                  </li>

                  <li
                    className={`uploadLabel ${
                      PermissionData()?.UPLOAD_PINCODE == "UPLOAD_PINCODE"
                        ? " "
                        : "permission_blur"
                    }`}
                  >
                    <div className="permis">
                      <input
                        // value={""}
                        accept=".xlsx"
                        type={
                          PermissionData()?.UPLOAD_PINCODE == "UPLOAD_PINCODE"
                            ? "file"
                            : "text"
                        }
                        onChange={(e) =>
                          PermissionData()?.UPLOAD_PINCODE == "UPLOAD_PINCODE"
                            ? PincodeFile(e)
                            : ""
                        }
                      />
                    </div>
                  </li>

                  {/* <li>
                  <a
                      className="dropdown-item"
                      onClick={(e) => {
                        navigate("/payment-approval");
                      }}
                    >
                      {" "}
                      Payment Approval
                    </a>
                  </li> */}

                  <li>
                    <a className="dropdown-item" onClick={(e) => Logoutfun(e)}>
                      Log out
                    </a>
                  </li>
                </ul>
              </div>

              <div className="user-info">
                <h6>
                  {GetAdminProfileData && GetAdminProfileData[0]?.username}
                </h6>
                <p>
                  {GetAdminProfileData && GetAdminProfileData[0]?.company_name}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* {**************************************************Raise Issue******************************************************************************} */}

      {raiseissue && (
        <div className="popupouter raised-popup">
          <div className="popupinner">
            <h2>Raised A Issue</h2>
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
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <div className="col-6">
                  <label>Issue</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Issue"
                    value={title}
                    onChange={(e) => setTilte(e.target.value)}
                  />
                </div>
                <div className="col-12">
                  <label>Remark</label>
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

      {/* {**************************************************NOTOFICATION*******************************************************************} */}

      {notification && (
        <div
          className="notification-box"
          onClick={(e) => {
            setNotification((o) => !o);
            setAllSearchBar(false);
          }}
        >
          <div className=" title">
            <h2>Notifications</h2>
            {(GetUserNotificationData &&
              GetUserNotificationData?.length >= 0) ||
            GetUserNotificationData?.data?.length >= 0 ||
            GetDashboardNotificationData.length >= 0 ||
            GetDashboardNotificationData?.data?.length >= 0 ||
            (GetDeliveryBoyNotificationData &&
              GetDeliveryBoyNotificationData?.length >= 0) ||
            (GetAdminRemarkNotificationData &&
              GetAdminRemarkNotificationData?.length >= 0) ? (
              // GetUserNotificationData && GetUserNotificationData?.data?.length || GetDashboardNotificationData && GetDashboardNotificationData?.data?.length !== 0
              <button
                type="button"
                className="btn"
                onClick={(e) => {
                  ClearNotificationn(e);
                  setNotification((o) => !o);
                  setAllSearchBar(false);
                }}
              >
                <svg
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 5L3.5 7.5M7 3.5L9.5 1M5 5L7.5 7.5L13.5 1"
                    stroke="#FFC900"
                    stroke-width="0.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>{" "}
                Clear{" "}
              </button>
            ) : (
              ""
            )}
          </div>
          <ul>
            {isDeliveryboy_Role != "true"
              ? GetDashboardNotificationData &&
                GetDashboardNotificationData?.map((item, id) => {
                  return (
                    <li onClick={(e) => ClearNotification(e, item)}>
                      <p
                        onClick={(e) => {
                          navigate("/admin/order");
                        }}
                      >
                        {item.notification}
                      </p>

                      <div>
                        <span>{item.date}</span> at{" "}
                        <span>{timeConvert(item.time)}</span>{" "}
                      </div>
                    </li>
                  );
                })
              : GetDeliveryBoyNotificationData &&
                GetDeliveryBoyNotificationData?.map((item, id) => {
                  return (
                    <li onClick={(e) => ClearNotification(e, item)}>
                      <p
                        onClick={(e) => {
                          navigate("/admin/order");
                        }}
                      >
                        {item.notification}
                      </p>

                      <div>
                        <span>{item.date}</span> at{" "}
                        <span>{timeConvert(item.time)}</span>{" "}
                      </div>
                    </li>
                  );
                })}

            {isDeliveryboy_Role != "true"
              ? GetUserNotificationData &&
                GetUserNotificationData?.data?.map((item, id) => {
                  return (
                    <li onClick={(e) => ClearUserNotification(e, item)}>
                      <p
                        onClick={(e) => {
                          navigate("/admin/setting/userprofile");
                        }}
                      >
                        {item.notification}
                      </p>
                      <div>
                        <span>{item.date}</span> at{" "}
                        <span>{timeConvert(item.time)}</span>{" "}
                      </div>
                    </li>
                  );
                })
              : ""}
            {isDeliveryboy_Role != "true"
              ? GetAdminRemarkNotificationData &&
                GetAdminRemarkNotificationData?.map((item, id) => {
                  return (
                    <li onClick={(e) => ClearNotification(e, item)}>
                      <p
                        onClick={(e) => {
                          navigate(
                            `/admin/orderinner/${item.product_order_id}`,
                            // ,openpopupftn(e)
                            {
                              state: {
                                openpopup: true,
                                closepopup: false,
                              },
                            }
                          );
                        }}
                      >
                        {item.message}
                      </p>

                      <div>
                        <span>{item.date}</span> at{" "}
                        <span>{timeConvert(item.time)}</span>{" "}
                      </div>
                    </li>
                  );
                })
              : ""}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;
