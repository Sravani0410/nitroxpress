import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { actionType } from "../Redux/type/types";
import { reactLocalStorage } from "reactjs-localstorage";
import Sidebar from "./Sidebar";
import LodingSpiner from "../Components/LodingSpiner";
import Header from "./Header";
import { toast } from "react-toastify";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import Popup from "reactjs-popup";
import {
  GetAdminOrderDelivered,
  GetAdminOrderIntransit,
  GetAdminOrderPending,
  GetAdminOrderReturn,
  GetAdminOrderRTODelivered,
  GetAdminOrderBooked,
  GetAdminOrderSummary,
  PostAdminOrderFilteration,
  PostAdminPendingOrderAction,
  DeleteAdminPendingOrderAction,
  PostAdminOrderCsvFile,
  DeleteAdminOrder,
  PostUploadFile,
  PatchTrackDetails,
  ToggleSideBarTrueFalse,
  GetAdminOutForDelivery,
  GetCancelOrderDetail,
  PostTrackingOtp,
  PostOtpTrackingUpdateOrder,
  GetWalletBalance,
  PostDebitBalance,
  PostAdminOrderRebook,
} from "../Redux/action/ApiCollection";
import tokenData from "../Authanticate";
import { PostAdminOrderFilterationReducer } from "../Redux/reducer/Reducer";
import { PermissionData } from "../Permission";
let B2BPartner = reactLocalStorage.get("Is_Business");
const Order = () => {
  const [otpvalue, setOtpValue] = useState("");
  const [pendingconfirmbutton, setPendingConfirmButton] = useState(false);
  const [partner, setPartner] = useState("");
  const [partnernameactive, setPartnerNameActive] = useState(false);
  const [pending, setPending] = useState(false);
  const [awbcode, setAwbCode] = useState("");
  const [expecteddeliverydate, setExpectedDelliveryDate] = useState("");
  const [pendingconfirm, setPendingConfirm] = useState(false);
  const [awbactive, setAwbActive] = useState(false);
  const [awbactivecheck, setAwbActiveCheck] = useState(false);
  const [pendingeditobjectdata, setPendingEditObjectData] = useState("");
  const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
  const [domesticcheckBox, setDomesticCheckBox] = useState(false);
  const [internationalcheckBox, setInternationalCheckBox] = useState(false);
  const [pandingtab, setPandingTab] = useState("");
  const [booktab, setBookTab] = useState("");
  const [transittab, setTransitTab] = useState("");
  const [deliveredtab, setDeliveredTab] = useState("");
  const [outfordeliverytab, setOutForDeliveryTab] = useState("");
  const [returntab, setReturnTab] = useState("");
  const [returndeliveredtab, setReturnDeliveredTab] = useState("");
  const [canceltab, setCancelTab] = useState("");
  const [loadspiner, setLoadSpiner] = useState(false);
  const [pendingpartner, setPendingPartner] = useState(false);
  const [paidcustomer, setPaidCustomer] = useState(false);
  const [recievedpartner, setRecievedPartner] = useState(false);
  const [tabfilteravailable, setTabFilterAvailable] = useState("");
  const [codcheckBox, setCodCheckBox] = useState(false);
  const [prepaidcheckBox, setPrepaidCheckBox] = useState(false);
  const [shippingpartnervalue, setShippingPartnerValue] = useState("");
  const [adminorderfilterationdata, setAdminOrderFilterationData] =
    useState(false);
  const [tabfiltersearchdata, setTabFilterSearchData] = useState("");
  const [adminorderpendingdata, setAdminOrderPendingData] = useState("");
  const [adminorderbookeddata, setAdminOrderBookedData] = useState("");
  const [adminorderintransitDate, setAdminOrderIntransitDate] = useState("");
  const [adminorderdeliveredData, setAdminOrderDeliveredData] = useState("");
  const [adminoutfordeliveryData, setAdminOutForDeliveryData] = useState("");
  const [adminorderreturnData, setAdminOrderReturnData] = useState("");
  const [adminorderrtodeliveredData, setAdminOrderRTODeliveredData] =
    useState("");
  const [adminordercancelData, setAdminOrderCancelData] = useState("");
  const [filterdatahideaftertabchange, setFilterDataHideAfterTabChange] =
    useState(false);
  const [editcancelobjectdata, setEditCancelObjectData] = useState(false);
  const [editcancelobjectdatatruefalse, setEditCancelObjectDataTrueFalse] =
    useState(false);
  const [b2bcheckBox, setB2BcheckBox] = useState("");
  const [b2ccheckBox, setB2ccheckBox] = useState("");
  const [allcheckBox, setAllcheckBox] = useState("");
  const [filteractive, setFilterActive] = useState(false);
  const [downloadcsvpermission, setDownloadCsvPermission] = useState(false);
  const [reasonActionPopup, setReasonActionPopup] = useState(false);
  const [reasonActionValue, setReasonActionValue] = useState(false);
  const [reasonActionRowData, setReasonActionRowData] = useState(false);
  const [reasonActionInputFieldData, setReasonActionInputFieldData] =
    useState("");
  const [ReasonActionInputFieldError, setReasonActionInputFieldError] =
    useState(false);
  const [SelectedReasonTrue, setSelectedReasonTrue] = useState(false);
  const [otpActionPopup, setOtpActionPopup] = useState(false);
  const [otpActionValue, setOtpActionValue] = useState(false);
  const [otpActionRowData, setOtpActionRowData] = useState(false);
  const [otpActionInputFieldData, setOtpActionInputFieldData] = useState("");
  const [OtpActionInputFieldError, setOtpActionInputFieldError] =
    useState(false);
  const [SelectedOtpTrue, setSelectedOtpTrue] = useState(false);
  const [paymentmethodpopup, setPaymentMethodPopup] = useState(false);
  const [wallettab, setWalletTab] = useState("");
  const [activepaymentwallet, setActivePaymentWallet] = useState(false);
  const [activepaymentrazorpay, setActivePaymentRazorPay] = useState(false);
  const [ReebookObjectDetails, setReebookObjectDetails] = useState("");
  console.log("adminordercancelData", adminordercancelData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let param = useLocation();

  const GetAdminOrderIntransitDate = useSelector(
    (state) =>
      state.GetAdminOrderIntransitReducer.GetAdminOrderIntransitData?.data
  );
  const GetAdminOrderDeliveredData = useSelector(
    (state) =>
      state.GetAdminOrderDeliveredReducer.GetAdminOrderDeliveredData?.data
  );
  const GetAdminOutForDeliveryData = useSelector(
    (state) =>
      state.GetAdminOutForDeliveryReducer.GetAdminOutForDeliveryData?.data
  );
  const GetAdminOrderPendingData = useSelector(
    (state) => state.GetAdminOrderPendingReducer.GetAdminOrderPendingData?.data
  );
  const GetAdminOrderReturnData = useSelector(
    (state) => state.GetAdminOrderReturnReducer.GetAdminOrderReturnData?.data
  );
  const GetAdminOrderRTODeliveredData = useSelector(
    (state) =>
      state.GetAdminOrderRTODeliveredReducer.GetAdminOrderRTODeliveredData
  );
  console.log("GetAdminOrderRTODeliveredData", GetAdminOrderRTODeliveredData);
  const GetAdminOrderBookedData = useSelector(
    (state) => state.GetAdminOrderBookedReducer.GetAdminOrderBookedData?.data
  );
  const GetCancelOrderDetailData = useSelector(
    (state) => state.GetCancelOrderDetailReducer.GetCancelOrderDetailData?.data
  );
  console.log("GetCancelOrderDetailData", GetCancelOrderDetailData);
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const OrderPageBookNavigateFunData = useSelector(
    (state) => state.OrderPageBookNavigateReducer.OrderPageBookNavigateData
  );
  const PostAdminOrderFilterationData = useSelector(
    (state) =>
      state.PostAdminOrderFilterationReducer.PostAdminOrderFilterationData?.data
  );
  const PostTrackingOtpData = useSelector(
    (state) => state.PostTrackingOtpReducer.PostTrackingOtpData
  );
  const PostAdminPendingOrderActionData = useSelector(
    (state) =>
      state.PostAdminPendingOrderActionReducer.PostAdminPendingOrderActionData
        ?.data
  );
  const DeleteAdminPendingOrderActionData = useSelector(
    (state) =>
      state.DeleteAdminPendingOrderActionReducer
        .DeleteAdminPendingOrderActionData
  );
  const PostAdminOrderCsvFileData = useSelector(
    (state) =>
      state.PostAdminOrderCsvFileReducer.PostAdminOrderCsvFileData?.data
  );
  const DeleteAdminOrderData = useSelector(
    (state) => state.DeleteAdminOrderReducer.DeleteAdminOrderData?.data
  );
  const PatchTrackDetailsData = useSelector(
    (state) => state.PatchTrackDetailsReducer.PatchTrackDetailsData?.data
  );
  const HeaderToggleClassAddData = useSelector(
    (state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );
  const ToggleSideBarTrueFalseData = useSelector(
    (state) => state.ToggleSideBarTrueFalseReducer.ToggleSideBarTrueFalseData
  );
  const PostUploadFileData = useSelector(
    (state) => state.PostUploadFileReducer.PostUploadFileData
  );
  const GetWalletBalanceData = useSelector(
    (state) => state.GetWalletBalanceReducer?.GetWalletBalanceData
  );
  const PostDebitBalanceData = useSelector(
    (state) => state.PostDebitBalanceReducer?.PostDebitBalanceData
  );
  useEffect(() => {
    dispatch(GetAdminOrderIntransit());
    dispatch(GetAdminOrderDelivered());
    dispatch(GetAdminOrderPending());
    dispatch(GetAdminOrderReturn());
    dispatch(GetAdminOrderRTODelivered());
    dispatch(GetAdminOrderBooked());
    dispatch(GetAdminOutForDelivery());
    dispatch(GetCancelOrderDetail());
  }, []);
  const IntransitFun = (e, id) => {
    reactLocalStorage.set("order_id", id);
    let objectData = {
      product_order_id: id,
    };
    // this "tabfilteravailable" is important for back routhing of "/admin/Orderinner/id" page.
    dispatch(GetAdminOrderSummary(objectData));
    navigate(`/admin/Orderinner/${id}${tabfilteravailable}`);
  };
  useEffect(() => {
    setB2BcheckBox(false);
    setB2ccheckBox(false);
    setAllcheckBox(false);
    setDomesticCheckBox(false);
    setInternationalCheckBox(false);
    setCodCheckBox(false);
    setPrepaidCheckBox(false);
    setPendingPartner(false);
    setRecievedPartner(false);
    setPaidCustomer(false);
    setFilterActive(false);
  }, [param.hash]);
  useEffect(() => {
    setTabFilterAvailable(param.hash);
    setPendingPartner(false);
    setRecievedPartner(false);
    setPaidCustomer(false);
  }, [param]);

  const NationalityFun = (data) => {
    if (data === "domastic") {
      setDomesticCheckBox((o) => !o);
      setInternationalCheckBox(false);
    } else {
      setInternationalCheckBox((o) => !o);
      setDomesticCheckBox(false);
    }
  };

  const PaymentStatusFun = (data) => {
    if (data === "COD") {
      setCodCheckBox((o) => !o);
      setPrepaidCheckBox(false);
    } else {
      setPrepaidCheckBox((o) => !o);
      setCodCheckBox(false);
      setPendingPartner(false);
      setRecievedPartner(false);
      setPaidCustomer(false);
    }
  };
  useEffect(() => {
    if (OrderPageBookNavigateFunData) {
      if (OrderPageBookNavigateFunData === "#pending") {
        navigate("#pending");
        setPandingTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
      } else if (OrderPageBookNavigateFunData === "#transit") {
        navigate("#transit");
        setTransitTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setBookTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#booked") {
        navigate("#booked");
        setBookTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#delivered") {
        navigate("#delivered");
        setDeliveredTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setBookTab("");
        setTransitTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#OUT_FOR_DELIVERY") {
        navigate("#OUT_FOR_DELIVERY");
        setOutForDeliveryTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#return") {
        navigate("#return");
        setReturnTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setBookTab("");
        setTransitTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#RTO_DELIVERED") {
        navigate("#RTO_DELIVERED");
        setReturnDeliveredTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setBookTab("");
        setTransitTab("");
        setReturnTab("");
        setCancelTab("");
      } else if (OrderPageBookNavigateFunData === "#cancel") {
        navigate("#cancel");
        setCancelTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReturnTab("");
        setReturnDeliveredTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setBookTab("");
        setTransitTab("");
      }
    } else {
      navigate("#pending");
      setPandingTab({
        activeValue: "active",
        booleanValue: true,
        tabindex: "-1",
      });
      setReturnTab("");
      setReturnDeliveredTab("");
      setDeliveredTab("");
      setOutForDeliveryTab("");
      setBookTab("");
      setTransitTab("");
      setCancelTab("");
    }
  }, [OrderPageBookNavigateFunData]);

  const StatusFun = (e, dataParameter) => {
    if (dataParameter === "PendingPartner") {
      if (
        tabfilteravailable === "#booked" ||
        tabfilteravailable === "#transit" ||
        tabfilteravailable === "#delivered"
      ) {
        setPendingPartner((o) => !o);
        setRecievedPartner(false);
        setPaidCustomer(false);
      }
    } else if (dataParameter === "RecievedPartner") {
      if (
        tabfilteravailable !== "#booked" &&
        tabfilteravailable !== "#transit"
      ) {
        setRecievedPartner((o) => !o);
        setPendingPartner(false);
        setPaidCustomer(false);
      }
    } else if (dataParameter === "PaidCustomer") {
      if (
        tabfilteravailable !== "#booked" &&
        tabfilteravailable !== "#transit"
      ) {
        setPaidCustomer((o) => !o);
        setRecievedPartner(false);
        setPendingPartner(false);
      }
    }
  };

  const ApplyFilterFun = () => {
    setFilterDataHideAfterTabChange(true);
    let splitdata = tabfilteravailable.split("#");
    let statusData = "";
    let paymentStatus = "";
    let nationality = "";
    let CustomerType = "";
    if (paidcustomer) {
      statusData = "PAID";
    } else if (recievedpartner) {
      statusData = "RECEIVED_FROM_PARTNER";
    } else if (pendingpartner) {
      statusData = "PENDING_AT_PARTNER";
    }
    if (codcheckBox) {
      paymentStatus = "COD";
    } else if (prepaidcheckBox) {
      paymentStatus = "PREPAID";
    }
    if (domesticcheckBox) {
      nationality = "DOMESTIC";
    } else if (internationalcheckBox) {
      nationality = "INTERNATIONAL";
    }
    if (b2bcheckBox) {
      CustomerType = "b2b";
    } else if (b2ccheckBox) {
      CustomerType = "b2c";
    } else if (allcheckBox) {
      CustomerType = "all";
    }
    let dataObject = {
      page_name: splitdata[1],
      payment_status: paymentStatus,
      shipping_partner: shippingpartnervalue,
      cod_status: statusData,
      nationality: nationality,
      data_type: CustomerType,
    };
    dispatch(PostAdminOrderFilteration(dataObject));
    setFilterShowHideBtn(false);
    // if (b2bcheckBox || b2ccheckBox || allcheckBox
    //   || paidcustomer || recievedpartner || pendingpartner
    //   || prepaidcheckBox || codcheckBox || internationalcheckBox
    //   || domesticcheckBox) {
    //     setFilterActive(false)
    // }
    // else(
    //   setFilterActive(tr)
    // )
  };
  useEffect(() => {
    setTabFilterSearchData(""); // when the tab changes the search box will blank
    if (adminorderfilterationdata === true) {
      setFilterDataHideAfterTabChange(true);
      setFilterActive(false);
    }
    if (param.hash === "#pending") {
      setAdminOrderPendingData(GetAdminOrderPendingData);
      setFilterDataHideAfterTabChange(false);
    } else if (param.hash === "#booked") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderBookedData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderBookedData(GetAdminOrderBookedData);
        setFilterActive(false);
      }
    } else if (param.hash === "#transit") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderIntransitDate(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderIntransitDate(GetAdminOrderIntransitDate);
        setFilterActive(false);
      }
      // setAdminOrderIntransitDate(GetAdminOrderIntransitDate);
    } else if (param.hash === "#delivered") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderDeliveredData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderDeliveredData(GetAdminOrderDeliveredData);
        setFilterActive(false);
      }
    } else if (param.hash === "#OUT_FOR_DELIVERY") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOutForDeliveryData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOutForDeliveryData(GetAdminOutForDeliveryData);
        setFilterActive(false);
      }
      // setAdminOrderDeliveredData(GetAdminOrderDeliveredData);
    } else if (param.hash === "#return") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderReturnData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderReturnData(GetAdminOrderReturnData);
        setFilterActive(false);
      }
      // setAdminOrderReturnData(GetAdminOrderReturnData);
    } else if (param.hash === "#RTO_DELIVERED") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderRTODeliveredData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderRTODeliveredData(GetAdminOrderRTODeliveredData);
        setFilterActive(false);
      }
    } else if (param.hash === "#cancel") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderCancelData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        setAdminOrderCancelData(GetCancelOrderDetailData);
        setFilterActive(false);
      }
      // setAdminOrderReturnData(GetAdminOrderReturnData);
    }
  }, [
    PostAdminOrderFilterationData,
    param.hash,
    GetAdminOrderPendingData,
    GetAdminOrderBookedData,
    GetAdminOrderIntransitDate,
    GetAdminOrderDeliveredData,
    GetAdminOutForDeliveryData,
    GetAdminOrderReturnData,
    GetAdminOrderRTODeliveredData,
    GetCancelOrderDetailData,
    adminorderfilterationdata,
  ]);
  // adminoutfordeliveryData
  const TabFilterSearch = (e) => {
    setTabFilterSearchData(e?.target?.value);
    let value = e?.target?.value?.toUpperCase();
    let result = [];
    if (param.hash === "#pending") {
      result = GetAdminOrderPendingData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderPendingData(GetAdminOrderPendingData);
      } else {
        setAdminOrderPendingData(result);
      }
    }
    if (param.hash === "#booked") {
      result = GetAdminOrderBookedData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderBookedData(GetAdminOrderBookedData);
      } else {
        setAdminOrderBookedData(result);
      }
    }
    if (param.hash === "#transit") {
      result = GetAdminOrderIntransitDate?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderIntransitDate(GetAdminOrderIntransitDate);
      } else {
        setAdminOrderIntransitDate(result);
      }
    }
    if (param.hash === "#delivered") {
      result = GetAdminOrderDeliveredData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderDeliveredData(GetAdminOrderDeliveredData);
      } else {
        setAdminOrderDeliveredData(result);
      }
    }
    if (param.hash === "#OUT_FOR_DELIVERY") {
      result = GetAdminOutForDeliveryData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOutForDeliveryData(GetAdminOutForDeliveryData);
      } else {
        setAdminOutForDeliveryData(result);
      }
    }
    if (param.hash === "#return") {
      result = GetAdminOrderReturnData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderReturnData(GetAdminOrderReturnData);
      } else {
        setAdminOrderReturnData(result);
      }
    }
    if (param.hash === "#RTO_DELIVERED") {
      result = GetAdminOrderRTODeliveredData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderRTODeliveredData(GetAdminOrderRTODeliveredData);
      } else {
        setAdminOrderRTODeliveredData(result);
      }
    }
    if (param.hash === "#cancel") {
      result = GetCancelOrderDetailData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderCancelData(GetCancelOrderDetailData);
      } else {
        setAdminOrderCancelData(result);
      }
    }
  };
  const EditCancelFun = (e, data) => {
    setEditCancelObjectData(data?.product_order_id);
    setEditCancelObjectDataTrueFalse((o) => !o);
  };
  const SaveAwbFun = (e) => {
    let payload = {
      product_order_id: pendingeditobjectdata.product_order_id,
      delivery_partner: partner,
      awb_number: awbcode,
      expected_date: expecteddeliverydate,
    };
    if (
      awbactive == false &&
      awbcode?.length !== 0 &&
      partnernameactive == false
    ) {
      dispatch(PostAdminPendingOrderAction(payload));
      setAwbActiveCheck((o) => !o);
      setPending((o) => !o);
      setPartner("");
      setAwbCode("");
      setExpectedDelliveryDate("");
    } else {
      toast.warn("please fill all the fields correctly");
      setPartnerNameActive(true);
    }
  };
  // useEffect(()=>{
  //   if(PostAdminPendingOrderActionData?.message=="Updated"){
  //     navigate(`/admin/Orderinner/${pendingeditobjectdata.product_order_id}#booked`)
  //     dispatch(PostAdminPendingOrderAction(""))
  //   }
  // },[PostAdminPendingOrderActionData])

  const DeletePending = (e, orderid) => {
    let payload = {
      product_order_id: orderid,
    };
    setLoadSpiner(true);
    dispatch(DeleteAdminPendingOrderAction(payload));
  };
  useEffect(() => {
    if (DeleteAdminPendingOrderActionData?.status == 200) {
      setLoadSpiner(false);
    } else {
      setLoadSpiner(false);
    }
  }, [DeleteAdminPendingOrderActionData]);
  const ActionCorrectFun = (e, allData) => {
    setPending((o) => !o);
    setPendingConfirm(true);
    setPendingEditObjectData(allData);
  };

  const AwbFun = (e) => {
    setAwbCode(e.target.value);
    // if (e.target.value.length !== 12 && e.target.value.length !== 0) {
    //   setAwbActive(true);
    // } else {
    //   setAwbActive(false);
    // }
  };
  const expect = (e) => {
    setExpectedDelliveryDate(e.target.value);
  };

  const PartnerNameFun = (e) => {
    setPartner(e.target.value);
    if (e.target.value?.length !== 0) {
      setPartnerNameActive(false);
    } else {
      setPartnerNameActive(true);
    }
  };

  const CsvDownload = (e, orderid) => {
    let BlankArrayData = [];
    if (param.hash === "#pending") {
      //  GetAdminOrderPendingData?.map((item, id) => {
      adminorderpendingdata &&
        adminorderpendingdata?.map((item, id) => {
          BlankArrayData.push(item?.product_order_id); //adding add product id in blanck array of that perticular tab
        });
      if (
        PermissionData() &&
        PermissionData()?.DOWNLOAD_PENDING_CSV == "DOWNLOAD_PENDING_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#booked") {
      // GetAdminOrderBookedData?.map((item, id) => {
      adminorderbookeddata &&
        adminorderbookeddata?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_BOOKED_CSV == "DOWNLOAD_BOOKED_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#transit") {
      // GetAdminOrderIntransitDate?.map((item, id) => {
      adminorderintransitDate &&
        adminorderintransitDate?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_IN_TRANSIT_CSV == "DOWNLOAD_IN_TRANSIT_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#delivered") {
      // GetAdminOrderDeliveredData?.map((item, id) => {
      adminorderdeliveredData &&
        adminorderdeliveredData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_DELIVERED_CSV == "DOWNLOAD_DELIVERED_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#OUT_FOR_DELIVERY") {
      // GetAdminOrderDeliveredData?.map((item, id) => {
      adminoutfordeliveryData &&
        adminoutfordeliveryData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_DELIVERED_CSV == "DOWNLOAD_DELIVERED_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#return") {
      // GetAdminOrderReturnData?.map((item, id) => {
      adminorderreturnData &&
        adminorderreturnData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_RETURNS_CSV == "DOWNLOAD_RETURNS_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#RTO_DELIVERED") {
      // GetAdminOrderReturnData?.map((item, id) => {
      adminorderrtodeliveredData?.data &&
        adminorderrtodeliveredData?.data?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_RETURNS_CSV == "DOWNLOAD_RETURNS_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    if (param.hash === "#cancel") {
      // GetAdminOrderReturnData?.map((item, id) => {
      adminordercancelData &&
        adminordercancelData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_RETURNS_CSV == "DOWNLOAD_RETURNS_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
    }
    let splitdata = param.hash.split("#");
    let PayloadData = {
      order_ids: BlankArrayData,
      page: splitdata[1],
    };
    dispatch(PostAdminOrderCsvFile(PayloadData));
  };

  const CancelOrder = (e, orderid) => {
    let payload = {
      product_order_id: orderid,
    };
    dispatch(DeleteAdminOrder(payload));
    setEditCancelObjectData((o) => !o);
  };

  useEffect(() => {
    CsvDownload();
  }, [
    param,
    GetAdminOrderPendingData,
    GetAdminOrderBookedData,
    GetAdminOrderIntransitDate,
    GetAdminOrderDeliveredData,
    GetAdminOutForDeliveryData,
    GetAdminOrderReturnData,
    GetAdminOrderRTODeliveredData,
    GetCancelOrderDetailData,
    adminorderpendingdata,
    adminorderbookeddata,
    adminorderintransitDate,
    adminorderdeliveredData,
    adminoutfordeliveryData,
    adminorderreturnData,
    adminordercancelData,
  ]);

  const CloseOtp = () => {
    setOtpActionPopup(false);
    setReasonActionValue("null");
    setReasonActionPopup(false);
  };

  const SheetFile = (e) => {
    dispatch(PostUploadFile(e?.target?.files[0]));
  };

  const CustomerTypeFun = (data) => {
    if (data === "B2B") {
      setB2BcheckBox((o) => !o);
      setB2ccheckBox(false);
      setAllcheckBox(false);
    } else if (data === "B2C") {
      setB2ccheckBox((o) => !o);
      setB2BcheckBox(false);
      setAllcheckBox(false);
    } else {
      setAllcheckBox((o) => !o);
      setB2ccheckBox(false);
      setB2BcheckBox(false);
    }
  };

  const FilterShowHideBtnFun = () => {
    setFilterShowHideBtn((o) => !o);
    if (
      b2bcheckBox ||
      b2ccheckBox ||
      allcheckBox ||
      paidcustomer ||
      recievedpartner ||
      pendingpartner ||
      prepaidcheckBox ||
      codcheckBox ||
      internationalcheckBox ||
      domesticcheckBox ||
      shippingpartnervalue
    ) {
      setAdminOrderFilterationData((o) => !o);
    }
    setB2BcheckBox(false);
    setB2ccheckBox(false);
    setAllcheckBox(false);
    setDomesticCheckBox(false);
    setInternationalCheckBox(false);
    setCodCheckBox(false);
    setPrepaidCheckBox(false);
    setPendingPartner(false);
    setRecievedPartner(false);
    setPaidCustomer(false);
    setFilterActive(false);
  };

  const TransitTrack = (e, orderid) => {
    let payload = {
      track_update_type: "IN_TRANSIT",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };

  const DeliveredTrack = (e, orderid) => {
    let payload = {
      track_update_type: "OUT_FOR_DELIVERY",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };

  const ReturnTrack = (e, orderid) => {
    let payload = {
      track_update_type: "RTO",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };
  const ReturnDeliveredTrack = (e, orderid) => {
    let payload = {
      track_update_type: "RTO_DELIVERED",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };

  const OffToogleSideBar = () => {
    dispatch(ToggleSideBarTrueFalse(false));
  };

  const GoOrderPageFun = () => {
    if (PermissionData()?.CREATE_ORDER == "CREATE_ORDER") {
      navigate("/admin/order/User");
      window.location.reload(true);
    } else {
    }
    // PermissionData()?.CREATE_ORDER == "CREATE_ORDER" ? navigate("/admin/order/User") : ""
  };

  const OutForDevliveryActionFun = (e, item) => {
    // e.target.value = e
    setReasonActionValue(e.target.value);
    setReasonActionRowData(item);
    if (e.target.value !== "" && e.target.value !== "null") {
      if (e.target.value == "DELIVERED") {
        // setOtpActionPopup(true)
        // setLoadSpiner((o) => !o);
        // // toast.success("OTP send Successfully.. Please Check Your Mail.")
        let payload = {
          track_update_type: "DELIVERED",
          product_order_id: item.product_order_id,
        };
        dispatch(PatchTrackDetails(payload));
      } else {
        setReasonActionPopup(true);
      }
      // dispatch(PostTrackingOtp(otpPayload))
    } else {
      setReasonActionPopup(false);
      // if (e.target.value == "DELIVERED") {
      //   setOtpActionPopup(true)
      //   setLoadSpiner((o) => !o);
      //   // toast.success("OTP send Successfully.. Please Check Your Mail.")
      //   let otpPayload = {
      //     "product_order_id": item.product_order_id,
      //   }
      //   dispatch(PostTrackingOtp(otpPayload))
      // }
    }
  };
  const IntransitActionFun = (e, item) => {
    setReasonActionValue(e.target.value);
    setReasonActionRowData(item);
    if (e.target.value !== "" && e.target.value !== "null") {
      if (e.target.value == "OUT_FOR_DELIVERED") {
        // setOtpActionPopup(true)
        // setLoadSpiner((o) => !o);
        // // toast.success("OTP send Successfully.. Please Check Your Mail.")
        let payload = {
          track_update_type: "OUT_FOR_DELIVERY",
          product_order_id: item.product_order_id,
        };
        dispatch(PatchTrackDetails(payload));
      } else {
        // console.log("jzhdfjsh")
        setReasonActionPopup(true);
      }
      // dispatch(PostTrackingOtp(otpPayload))
    } else {
      setReasonActionPopup(false);
      // if (e.target.value == "DELIVERED") {
      //   setOtpActionPopup(true)
      //   setLoadSpiner((o) => !o);
      //   // toast.success("OTP send Successfully.. Please Check Your Mail.")
      //   let otpPayload = {
      //     "product_order_id": item.product_order_id,
      //   }
      //   dispatch(PostTrackingOtp(otpPayload))
      // }
    }
  };
  const ConformActionFun = (
    e,
    data //this data is comming from the OutForDevliveryActionFun Function
  ) => {
    if (reasonActionInputFieldData?.length < 2) {
      setReasonActionInputFieldError(true);
    } else {
      setReasonActionInputFieldError(false);
      if (reasonActionValue !== "DELIVERED") {
        let payload = {
          track_update_type: reasonActionValue,
          product_order_id: reasonActionRowData.product_order_id,
          reason: reasonActionInputFieldData,
        };
        dispatch(PatchTrackDetails(payload));
        setReasonActionValue("null");
        setReasonActionPopup(false);
      }
      // dispatch(PostOrderTrack(payload))
    }
  };

  const ConformOtpActionFun = (
    e,
    data //this data is comming from the OutForDevliveryActionFun Function
  ) => {
    let payload = {
      track_update_type: "DELIVERED",
      product_order_id: reasonActionRowData.product_order_id,
      otp_delivered: otpvalue,
    };
    if (otpvalue?.length == 4) {
      dispatch(PatchTrackDetails(payload));
      setOtpActionPopup(false);
      setReasonActionValue("null");
    }
  };

  const ReasonTextFun = (e) => {
    var newStr = e.target.value.replace(/  +/g, " ");
    setReasonActionInputFieldData(newStr);
  };

  const handleChange = (otpvalue) => setOtpValue(otpvalue);

  useEffect(() => {
    if (PatchTrackDetailsData?.message == "Order Updated Successfully") {
      setReasonActionPopup(false);
      setReasonActionInputFieldData(null);
      setSelectedReasonTrue(true);
    }
    setReasonActionValue("null");
    setSelectedReasonTrue(true);
  }, [PatchTrackDetailsData]);

  useEffect(() => {
    if (PostTrackingOtpData?.status == 200) {
      setLoadSpiner((o) => !o);
    }
    let RebookPayload = {
      product_order_id: ReebookObjectDetails?.product_order_id,
      is_successful: true,
    };
    if (PostDebitBalanceData) {
      if (PostDebitBalanceData.status == 200) {
        setPaymentMethodPopup(false);
        dispatch(PostAdminOrderRebook(RebookPayload));
        // setWalletPayPopup(false)
      }
    }
  }, [PostTrackingOtpData, PostDebitBalanceData, ReebookObjectDetails]);

  const RebookFun = (e, data) => {
    setReebookObjectDetails(data);
    setPaymentMethodPopup(true);

    let WalletBalancePayload = {
      company_name: data?.name,
    };
    dispatch(GetWalletBalance(WalletBalancePayload));
    // navigate("#pending");
    // setAdminOrderPendingData(GetAdminOrderPendingData);
    // dispatch(GetAdminOrderPending());
    // navigate("#pending");
  };

  // useEffect(()=>{
  //   dispatch(GetAdminOrderPending());
  //   navigate("#pending");
  // },[GetAdminOrderPending])

  const PaymentPopupFun = () => {
    setWalletTab({
      activeValue: "active",
      booleanValue: true,
      tabindex: "-1",
    });
    setPaymentMethodPopup(false);
  };

  const ContinuePaymentFun = () => {
    let payLoad = {
      amount: Number(ReebookObjectDetails?.amount),
      order_id: ReebookObjectDetails?.product_order_id,
      company_name: ReebookObjectDetails?.name,
    };

    dispatch(PostDebitBalance(payLoad));
  };

  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
          <Sidebar />

          <div className="content-sec">
            <div className="ordertittle-part">
              <h2>Orders</h2>
              <ul>
                <li>
                  <div className="form-group">
                    <input
                      type="search"
                      placeholder="Order Id"
                      onChange={(e) => TabFilterSearch(e)}
                      value={tabfiltersearchdata}
                    />
                    <span className="search-icon">
                      <svg
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/ svg"
                      >
                        <path
                          d="M5.86869 7.29932e-07C6.9988 -0.000563318 8.10501 0.325781 9.05429 0.939785C10.0036 1.55379 10.7555 2.42931 11.2196 3.46105C11.6837 4.49279 11.8403 5.63682 11.6705 6.75555C11.5007 7.87428 11.0118 8.92008 10.2625 9.76717L16 16.2881L15.2037 17L9.48042 10.5075C8.74423 11.0841 7.88111 11.4762 6.96294 11.6512C6.04478 11.8262 5.09815 11.7789 4.2019 11.5134C3.30566 11.2479 2.48575 10.7718 1.81047 10.1248C1.13519 9.47775 0.62409 8.67852 0.319736 7.79367C0.0153828 6.90882 -0.07341 5.96396 0.0607538 5.03779C0.194918 4.11162 0.548154 3.23095 1.09104 2.46915C1.63393 1.70735 2.35075 1.08646 3.18179 0.658205C4.01284 0.229949 4.93405 0.00672247 5.86869 0.00711966V7.29932e-07ZM5.86869 10.6784C7.14148 10.6784 8.36213 10.1721 9.26213 9.27096C10.1621 8.3698 10.6677 7.14755 10.6677 5.87312C10.6677 4.59868 10.1621 3.37644 9.26213 2.47527C8.36213 1.57411 7.14148 1.06784 5.86869 1.06784C4.59591 1.06784 3.37526 1.57411 2.47526 2.47527C1.57527 3.37644 1.06966 4.59868 1.06966 5.87312C1.06966 7.14755 1.57527 8.3698 2.47526 9.27096C3.37526 10.1721 4.59591 10.6784 5.86869 10.6784Z"
                          fill="black"
                          fillOpacity="0.2"
                        />
                      </svg>
                    </span>
                  </div>
                </li>
                {/* Add  order */}
                <li onClick={(e) => GoOrderPageFun()}>
                  <div
                    role="button"
                    className={`add-item d-flex align-items-center justify-content-center ${
                      PermissionData()?.CREATE_ORDER == "CREATE_ORDER"
                        ? " "
                        : "permission_blur"
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.68645 0.0545375C8.60104 0.0847178 8.46499 0.17554 8.38415 0.256408C8.10476 0.535769 8.12062 0.284442 8.12062 4.43247V8.1196H4.43349C0.286484 8.1196 0.536685 8.10384 0.258062 8.3825C-0.0860208 8.72655 -0.0860208 9.27141 0.258062 9.61546C0.536685 9.89412 0.286484 9.87836 4.43349 9.87836H8.12062V13.5655C8.12062 17.7125 8.10486 17.4623 8.38352 17.7409C8.72757 18.085 9.27243 18.085 9.61648 17.7409C9.89514 17.4623 9.87938 17.7125 9.87938 13.5655V9.87836H13.5665C17.7135 9.87836 17.4633 9.89412 17.7419 9.61546C18.086 9.27141 18.086 8.72655 17.7419 8.3825C17.4633 8.10384 17.7135 8.1196 13.5665 8.1196H9.87938V4.43247C9.87938 0.285462 9.89514 0.535663 9.61648 0.257041C9.37243 0.0129605 9.02086 -0.0635806 8.68645 0.0545375Z"
                        fill="black"
                      />
                    </svg>
                  </div>
                </li>

                {/*  download csv */}

                <li>
                  {PostAdminOrderCsvFileData && downloadcsvpermission ? (
                    <>
                      <CSVLink data={PostAdminOrderCsvFileData}>
                        <div
                          onClick={(e) =>
                            downloadcsvpermission == true ? CsvDownload(e) : ""
                          }
                          className={`download-item d-flex align-items-center justify-content-center  `}
                        >
                          <svg
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.72237 0.0351605C8.58526 0.0910857 8.40828 0.243903 8.33114 0.373031C8.29123 0.439823 8.2706 1.83814 8.25339 5.64346L8.22994 10.823L6.92956 9.81735C5.57272 8.76809 5.48559 8.71776 5.13628 8.78128C4.83118 8.83679 4.54874 9.16507 4.54874 9.4642C4.54874 9.52699 4.58255 9.66035 4.62391 9.76051C4.68849 9.91706 4.97098 10.1535 6.63474 11.4438C7.69933 12.2694 8.65049 12.9774 8.7484 13.017C9.14006 13.1757 9.12937 13.1821 11.3419 11.467C12.4519 10.6065 13.3946 9.85122 13.437 9.78857C13.7068 9.38932 13.4839 8.85453 12.9876 8.71035C12.6591 8.61496 12.5354 8.68616 11.1197 9.7852C10.3951 10.3477 9.79175 10.8079 9.77876 10.8079C9.76577 10.8079 9.74964 8.47687 9.74289 5.62787C9.7306 0.476333 9.73004 0.447189 9.63386 0.322334C9.58068 0.253269 9.48201 0.156832 9.41463 0.108045C9.27216 0.0049698 8.8941 -0.0348597 8.72237 0.0351605ZM0.445495 10.233C0.271799 10.3109 0.116063 10.4714 0.0500362 10.6403C0.0179606 10.7224 0 11.3591 0 12.4154C0 13.7477 0.0137399 14.1135 0.071795 14.3297C0.282491 15.1139 0.907497 15.718 1.72069 15.9233C2.12543 16.0256 15.882 16.0256 16.2867 15.9233C17.1215 15.7125 17.7883 15.0448 17.9587 14.2489C17.9929 14.0892 18.0062 13.4283 17.9974 12.3193C17.9845 10.6972 17.9802 10.6277 17.8872 10.507C17.7035 10.2685 17.5536 10.194 17.2571 10.194C16.9606 10.194 16.8107 10.2684 16.6269 10.507C16.5343 10.6272 16.5292 10.7049 16.5068 12.3538C16.4843 14.0026 16.4792 14.0804 16.3866 14.2005C16.3334 14.2695 16.2317 14.3682 16.1605 14.4197C16.031 14.5134 16.028 14.5135 9.00369 14.5135C1.97936 14.5135 1.9764 14.5134 1.84693 14.4197C1.7757 14.3682 1.67394 14.2695 1.62076 14.2005C1.52814 14.0804 1.52308 14.0026 1.50062 12.3538C1.47815 10.7049 1.47309 10.6272 1.38047 10.507C1.32729 10.438 1.22863 10.3416 1.16124 10.2928C1.00583 10.1803 0.632369 10.1491 0.445495 10.233Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </CSVLink>
                    </>
                  ) : (
                    <div
                      onClick={(e) =>
                        downloadcsvpermission == true ? CsvDownload(e) : ""
                      }
                      className={`download-item d-flex align-items-center justify-content-center ${
                        downloadcsvpermission ? " " : "permission_blur"
                      }`}
                    >
                      <svg
                        width="18"
                        height="16"
                        viewBox="0 0 18 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8.72237 0.0351605C8.58526 0.0910857 8.40828 0.243903 8.33114 0.373031C8.29123 0.439823 8.2706 1.83814 8.25339 5.64346L8.22994 10.823L6.92956 9.81735C5.57272 8.76809 5.48559 8.71776 5.13628 8.78128C4.83118 8.83679 4.54874 9.16507 4.54874 9.4642C4.54874 9.52699 4.58255 9.66035 4.62391 9.76051C4.68849 9.91706 4.97098 10.1535 6.63474 11.4438C7.69933 12.2694 8.65049 12.9774 8.7484 13.017C9.14006 13.1757 9.12937 13.1821 11.3419 11.467C12.4519 10.6065 13.3946 9.85122 13.437 9.78857C13.7068 9.38932 13.4839 8.85453 12.9876 8.71035C12.6591 8.61496 12.5354 8.68616 11.1197 9.7852C10.3951 10.3477 9.79175 10.8079 9.77876 10.8079C9.76577 10.8079 9.74964 8.47687 9.74289 5.62787C9.7306 0.476333 9.73004 0.447189 9.63386 0.322334C9.58068 0.253269 9.48201 0.156832 9.41463 0.108045C9.27216 0.0049698 8.8941 -0.0348597 8.72237 0.0351605ZM0.445495 10.233C0.271799 10.3109 0.116063 10.4714 0.0500362 10.6403C0.0179606 10.7224 0 11.3591 0 12.4154C0 13.7477 0.0137399 14.1135 0.071795 14.3297C0.282491 15.1139 0.907497 15.718 1.72069 15.9233C2.12543 16.0256 15.882 16.0256 16.2867 15.9233C17.1215 15.7125 17.7883 15.0448 17.9587 14.2489C17.9929 14.0892 18.0062 13.4283 17.9974 12.3193C17.9845 10.6972 17.9802 10.6277 17.8872 10.507C17.7035 10.2685 17.5536 10.194 17.2571 10.194C16.9606 10.194 16.8107 10.2684 16.6269 10.507C16.5343 10.6272 16.5292 10.7049 16.5068 12.3538C16.4843 14.0026 16.4792 14.0804 16.3866 14.2005C16.3334 14.2695 16.2317 14.3682 16.1605 14.4197C16.031 14.5134 16.028 14.5135 9.00369 14.5135C1.97936 14.5135 1.9764 14.5134 1.84693 14.4197C1.7757 14.3682 1.67394 14.2695 1.62076 14.2005C1.52814 14.0804 1.52308 14.0026 1.50062 12.3538C1.47815 10.7049 1.47309 10.6272 1.38047 10.507C1.32729 10.438 1.22863 10.3416 1.16124 10.2928C1.00583 10.1803 0.632369 10.1491 0.445495 10.233Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  )}
                </li>

                {/* upload csv */}

                <li
                  className={`form-control  ${
                    PermissionData()?.UPLOAD_ORDER_CSV == "UPLOAD_ORDER_CSV"
                      ? " "
                      : "permission_blur"
                  }`}
                >
                  <input
                    value={""}
                    accept=".csv"
                    type={`${
                      PermissionData()?.UPLOAD_ORDER_CSV == "UPLOAD_ORDER_CSV"
                        ? "file"
                        : "text"
                    }`}
                    onChange={(e) =>
                      PermissionData()?.UPLOAD_ORDER_CSV == "UPLOAD_ORDER_CSV"
                        ? SheetFile(e)
                        : ""
                    }
                    className={`custom-file-input  
                    ${
                      PermissionData()?.UPLOAD_ORDER_CSV == "UPLOAD_ORDER_CSV"
                        ? " "
                        : "permission_blur"
                    }  }`}
                  />
                </li>
              </ul>
            </div>

            <div className="ordertab-sec">
              {/* {filter} */}
              <form>
                <div
                  className={`filter-part ${
                    PermissionData()?.APPLY_ORDER_FILTER == "APPLY_ORDER_FILTER"
                      ? " "
                      : "permission_blur"
                  }`}
                >
                  {tabfilteravailable !== "#pending" ? (
                    <button
                      type="button"
                      className={`${filteractive ? "bg-warning btn" : " btn"} `}
                      onClick={(e) =>
                        PermissionData()?.APPLY_ORDER_FILTER ==
                        "APPLY_ORDER_FILTER"
                          ? setFilterShowHideBtn((o) => !o)
                          : ""
                      }
                    >
                      Filter
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                      >
                        <rect width="16" height="16" fill="url(#pattern0)" />
                        <defs>
                          <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                          >
                            <use
                              xlinkHref="#image0_751_22363"
                              transform="scale(0.00195312)"
                            />
                          </pattern>
                          <image
                            id="image0_751_22363"
                            width="512"
                            height="512"
                            xlinkHref="data:image/png;base64,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"
                          />
                        </defs>
                      </svg>
                    </button>
                  ) : (
                    ""
                  )}

                  <div
                    className={`filter-body  ${
                      filtershowhidebtn ? "BlockFilterFromOrderPage " : "d-none"
                    } `}
                  >
                    <button
                      type="button"
                      className={`  close-btn ${
                        filtershowhidebtn
                          ? "BlockFilterFromOrderPage"
                          : "d-none"
                      } `}
                      onClick={(e) => FilterShowHideBtnFun()}
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
                    </button>

                    <h4>Filter</h4>

                    <h5>Nationality</h5>
                    <div className="row">
                      <div className="col-6">
                        <label className="checkbox domestic-box">
                          Domestic
                          <input
                            type="checkbox"
                            checked={domesticcheckBox}
                            onChange={(e) => NationalityFun("domastic")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="checkbox international-box">
                          International
                          <input
                            type="checkbox"
                            checked={internationalcheckBox}
                            onChange={(e) => NationalityFun("International")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <h5>Payment Status</h5>
                    <div className="row">
                      <div className="col-6">
                        <label className="checkbox prepaid-box">
                          Prepaid
                          <input
                            type="checkbox"
                            checked={prepaidcheckBox}
                            onChange={(e) => PaymentStatusFun("PREPAID")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="checkbox cod-box">
                          COD
                          <input
                            type="checkbox"
                            checked={codcheckBox}
                            onChange={(e) => PaymentStatusFun("COD")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>

                    <div className={`${!codcheckBox ? "order_status" : ""}`}>
                      <h5>
                        Status <span>(If payment mode is COD)</span>{" "}
                      </h5>
                      <div className="statusbtn-group">
                        <button
                          type="button"
                          className={`btn ${pendingpartner ? "btn-active" : ""} 
                                              ${
                                                tabfilteravailable == "#return"
                                                  ? "display_opacity"
                                                  : ""
                                              }`}
                          onClick={(e) =>
                            codcheckBox && StatusFun(e, "PendingPartner")
                          }
                        >
                          {" "}
                          Pending at partner{" "}
                        </button>
                        <button
                          type="button"
                          className={`btn ${recievedpartner ? "btn-active" : ""}
                                              ${
                                                tabfilteravailable ==
                                                  "#booked" ||
                                                tabfilteravailable == "#transit"
                                                  ? "display_opacity"
                                                  : ""
                                              }`}
                          onClick={(e) =>
                            codcheckBox && StatusFun(e, "RecievedPartner")
                          }
                        >
                          {" "}
                          Recieved from partner{" "}
                        </button>
                        <button
                          type="button"
                          className={`btn ${paidcustomer ? "btn-active" : ""} 
                                              ${
                                                tabfilteravailable ==
                                                  "#booked" ||
                                                tabfilteravailable == "#transit"
                                                  ? "display_opacity"
                                                  : ""
                                              }`}
                          onClick={(e) =>
                            codcheckBox && StatusFun(e, "PaidCustomer")
                          }
                        >
                          {" "}
                          Paid to customer{" "}
                        </button>
                      </div>
                    </div>

                    <h5 className="mp-3">Shipping Partner</h5>
                    <div className="express-box">
                      <select
                        className="form-select"
                        onChange={(e) =>
                          setShippingPartnerValue(e.target.value)
                        }
                      >
                        <option value="" selected>
                          Select Shipping Partner...
                        </option>
                        <option value="DTDC">DTDC</option>
                        <option value="ANJANI">Anjani</option>
                        <option value="DHL">DHL</option>
                        <option value="SKYKING">Skyking</option>
                        <option value="XPRESSBEES">Xpressbees</option>
                        <option value="DELHIVERY">Delhivery</option>
                        <option value="NITRO">Nitro</option>
                      </select>
                    </div>
                    <h5 className="pt-4 pb-3"> Customer Type</h5>
                    <div className="row">
                      <div className="col-sm-4">
                        <label className="checkbox domestic-box">
                          B2B
                          <input
                            type="checkbox"
                            checked={b2bcheckBox}
                            onChange={(e) => CustomerTypeFun("B2B")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <label className="checkbox domestic-box">
                          B2C
                          <input
                            type="checkbox"
                            checked={b2ccheckBox}
                            onChange={(e) => CustomerTypeFun("B2C")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-sm-4">
                        <label className="checkbox domestic-box">
                          All
                          <input
                            type="checkbox"
                            checked={allcheckBox}
                            onChange={(e) => CustomerTypeFun("All")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>
                    <div className="filterbtn-group">
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="reset"
                            value="Reset"
                            className="btn btn-cancel"
                            onClick={(e) => FilterShowHideBtnFun()}
                          />
                          {/* Cancel */}
                          {/* </button> */}
                        </div>
                        <div className="col-6">
                          <button
                            type="button"
                            className="btn btn-apply"
                            onClick={(e) => ApplyFilterFun()}
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* {path} */}

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link   ${
                      pandingtab ? pandingtab?.activeValue : ""
                    }`}
                    id="pending-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pending-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="pending-tab-pane"
                    aria-selected={`${
                      pandingtab ? pandingtab?.booleanValue : "false"
                    }`}
                    onClick={(e) => {
                      navigate("#pending");
                      window.location.reload(false);
                      setFilterShowHideBtn(false);
                    }}
                  >
                    Pending
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      booktab ? booktab?.activeValue : ""
                    }`}
                    id="booked-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#booked-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="booked-tab-pane"
                    aria-selected={`${
                      booktab ? booktab?.booleanValue : "false"
                    }`}
                    onClick={(e) => navigate("#booked")}
                  >
                    Booked
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      transittab ? transittab?.activeValue : ""
                    }`}
                    id="transit-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#transit-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="transit-tab-pane"
                    aria-selected={`${
                      transittab ? transittab.booleanValue : "false"
                    }`}
                    onClick={(e) => navigate("#transit")}
                  >
                    In-Transit
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      outfordeliverytab ? outfordeliverytab?.activeValue : ""
                    }`}
                    id="outfordelivery-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#outfordelivery-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="outfordelivery-tab-pane"
                    aria-selected={`${
                      outfordeliverytab
                        ? outfordeliverytab?.booleanValue
                        : "false"
                    }`}
                    onClick={(e) => navigate("#OUT_FOR_DELIVERY")}
                  >
                    Out-For-Delivery
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      deliveredtab ? deliveredtab?.activeValue : ""
                    }`}
                    id="delivered-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#delivered-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="delivered-tab-pane"
                    aria-selected={`${
                      deliveredtab ? deliveredtab?.booleanValue : "false"
                    }`}
                    onClick={(e) => navigate("#delivered")}
                  >
                    Delivered
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      returntab ? returntab?.activeValue : ""
                    }`}
                    id="returns-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#returns-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="returns-tab-pane"
                    aria-selected={`${
                      returntab ? returntab?.booleanValue : "false"
                    }`}
                    onClick={(e) => navigate("#return")}
                  >
                    RTO
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      returndeliveredtab ? returndeliveredtab?.activeValue : ""
                    }`}
                    id="rto-delivered-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#rto-delivered-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="rto-delivered-tab"
                    aria-selected={`${
                      returndeliveredtab
                        ? returndeliveredtab?.booleanValue
                        : "false"
                    }`}
                    onClick={(e) => navigate("#RTO_DELIVERED")}
                  >
                    RTO Delivered
                  </button>
                </li>

                <li className="nav-item" role="presentation">
                  <button
                    className={`nav-link ${
                      canceltab ? canceltab?.activeValue : ""
                    }`}
                    id="cancel-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#cancel-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="cancel-tab-pane"
                    aria-selected={`${
                      canceltab ? canceltab?.booleanValue : "false"
                    }`}
                    onClick={(e) => navigate("#cancel")}
                  >
                    Cancelled Orders
                  </button>
                </li>
              </ul>

              {/* {pending} */}

              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane pending-tabpane fade   ${
                    pandingtab ? "show active" : "-1"
                  }`}
                  id="pending-tab-pane"
                  role="tabpanel"
                  aria-labelledby="pending-tab"
                  tabindex={`${pandingtab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Date </th>
                      <th>Order Id</th>
                      <th>Name</th>
                      <th>Method</th>
                      <th>Product Type</th>
                      <th>Action</th>
                    </tr>

                    {PermissionData()?.VIEW_ORDER_PENDING ==
                    "VIEW_ORDER_PENDING"
                      ? adminorderpendingdata &&
                        adminorderpendingdata?.map((item, id) => {
                          return (
                            <tr>
                              <td>{item.date}</td>

                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>

                              {/* <td>{item.product_order_id}</td> */}
                              <td>{item.name ? item.name : "B2C"}</td>
                              <td>{item.method}</td>
                              <td>{item.product_type}</td>
                              <td>
                                {item.payment_status == "SUCCESSFULL" ? (
                                  <div className="action-btngroup">
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        DeletePending(e, item.product_order_id)
                                      }
                                    >
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                                          fill="#F14336"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      className={`${
                                        PermissionData()
                                          ?.ALLOW_PENDING_ACTION_APPROVE ==
                                        "ALLOW_PENDING_ACTION_APPROVE"
                                          ? " "
                                          : "permission_blur"
                                      }`}
                                      onClick={(e) =>
                                        PermissionData()
                                          ?.ALLOW_PENDING_ACTION_APPROVE ==
                                        "ALLOW_PENDING_ACTION_APPROVE"
                                          ? ActionCorrectFun(e, item)
                                          : ""
                                      }
                                    >
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM18.7793 10.1941C19.4388 9.48749 19.4006 8.38011 18.6941 7.72065C17.9875 7.06119 16.8801 7.09938 16.2207 7.80594L10.4566 13.9817L8.23744 11.7626C7.55402 11.0791 6.44598 11.0791 5.76256 11.7626C5.07915 12.446 5.07915 13.554 5.76256 14.2374L9.26256 17.7374C9.59815 18.073 10.0556 18.2579 10.5302 18.2497C11.0047 18.2416 11.4555 18.041 11.7793 17.6941L18.7793 10.1941Z"
                                          fill="#4BAE4F"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                ) : (
                                  <div className="action-btngroup">
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        DeletePending(e, item.product_order_id)
                                      }
                                    >
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                                          fill="#F14336"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      type="button"
                                      className={`btnnn ${
                                        pendingconfirmbutton ? "btn-active" : ""
                                      }
                                    ${
                                      item.payment_status == "SUCCESSFUL"
                                        ? ""
                                        : "display_opacity"
                                    }
                                      ${
                                        PermissionData()
                                          ?.ALLOW_PENDING_ACTION_APPROVE ==
                                        "ALLOW_PENDING_ACTION_APPROVE"
                                          ? " "
                                          : "permission_blur"
                                      }`}
                                    >
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM18.7793 10.1941C19.4388 9.48749 19.4006 8.38011 18.6941 7.72065C17.9875 7.06119 16.8801 7.09938 16.2207 7.80594L10.4566 13.9817L8.23744 11.7626C7.55402 11.0791 6.44598 11.0791 5.76256 11.7626C5.07915 12.446 5.07915 13.554 5.76256 14.2374L9.26256 17.7374C9.59815 18.073 10.0556 18.2579 10.5302 18.2497C11.0047 18.2416 11.4555 18.041 11.7793 17.6941L18.7793 10.1941Z"
                                          fill="#4BAE4F"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* {booked} */}

                <div
                  className={`tab-pane fade ${booktab ? "show active" : "-1"}`}
                  id="booked-tab-pane"
                  role="tabpanel"
                  aria-labelledby="booked-tab"
                  tabindex={`${booktab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Name</th>
                      <th style={{ textAlign: "center" }}>Package Detail</th>
                      <th>Method</th>
                      <th>Pickup Address</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                    {PermissionData()?.VIEW_ORDER_BOOKED == "VIEW_ORDER_BOOKED"
                      ? adminorderbookeddata &&
                        adminorderbookeddata?.map((item, id) => {
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>
                              <td>{item.name ? item.name : "B2C"}</td>
                              <td style={{ textAlign: "center" }}>
                                {item.package_details}
                              </td>
                              <td>{item.method}</td>
                              <td>{`${item?.address?.address}, ${item?.address?.city}, ${item?.address?.pincode}, ${item?.address?.state}`}</td>
                              <td>{item.cod_status}</td>
                              <td>
                                <div className="action-btngroup">
                                  <button
                                    type="button"
                                    className={`btn btn-ship ${
                                      PermissionData()?.ALLOW_BOOKED_ACTION ==
                                      "ALLOW_BOOKED_ACTION"
                                        ? " "
                                        : "permission_blur"
                                    }`}
                                    onClick={(e) =>
                                      PermissionData()?.ALLOW_BOOKED_ACTION ==
                                      "ALLOW_BOOKED_ACTION"
                                        ? TransitTrack(e, item.product_order_id)
                                        : ""
                                    }
                                  >
                                    In-Transit
                                  </button>
                                  {/* <button type="button" className="btn order-btn">
                                    <img
                                      src="/images/icon32.png"
                                      alt="img"
                                      onClick={(e) => EditCancelFun(e, item)}
                                    />

                                    {editcancelobjectdata ==
                                      item.product_order_id && (
                                        <ul className="dropdown">
                                          <li
                                            onClick={(e) =>
                                              CancelOrder(e, item.product_order_id)
                                            }
                                          >
                                            <a href="#">Cancel Order</a>
                                          </li>
                                        </ul>
                                      )}
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* in-transit start */}

                <div
                  className={`tab-pane fade   ${
                    transittab ? "show active" : ""
                  }`}
                  id="transit-tab-pane"
                  role="tabpanel"
                  aria-labelledby="transit-tab"
                  tabindex={`${transittab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Name</th>
                      <th>Product Type</th>
                      <th>Method</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      <th>Action</th>
                    </tr>

                    {PermissionData()?.VIEW_ORDER_IN_TRANSIT ==
                    "VIEW_ORDER_IN_TRANSIT"
                      ? adminorderintransitDate &&
                        adminorderintransitDate.map((item, id) => {
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>
                              <td> {item.name ? item.name : "B2C"}</td>
                              <td> {item.product_type}</td>
                              <td> {item.method}</td>
                              {B2BPartner == "false" ? (
                                <td> {item.delivery_partner}</td>
                              ) : (
                                ""
                              )}
                              <td>
                                <div className="action-btngroup">
                                  <select
                                    type="button"
                                    className="btn order-btn"
                                    onChange={(e) =>
                                      IntransitActionFun(e, item)
                                    }
                                  >
                                    <option
                                      selected={reasonActionValue == "null"}
                                      value="null"
                                    >
                                      Select...
                                    </option>
                                    <option value="OUT_FOR_DELIVERED">
                                      Out For Delivery
                                    </option>
                                    <option value="RTO">Return</option>
                                  </select>
                                  {/* <button type="button" className={`btn btn-ship  ${PermissionData()?.ALLOW_IN_TRANSIT_ACTION == "ALLOW_IN_TRANSIT_ACTION" ? " " : "permission_blur"}`}
                                    onClick={((e) =>
                                      PermissionData()?.ALLOW_IN_TRANSIT_ACTION == "ALLOW_IN_TRANSIT_ACTION" ?
                                        DeliveredTrack(e, item.product_order_id) : "")}
                                  // style={{whiteSpace: "nowrap"}}
                                  >
                                    {" "}
                                    Out For Delivery

                                  </button> */}
                                  {/* <button type="button" className="btn order-btn">
                                    <img
                                      src="/images/icon32.png"
                                      alt="img"
                                      onClick={(e) => EditCancelFun(e, item)}
                                    />

                                    {editcancelobjectdata ==
                                      item.product_order_id && (
                                        <ul className="dropdown">
                                          <li
                                            onClick={(e) =>
                                              CancelOrder(e, item.product_order_id)
                                            }
                                          >
                                            <a href="#">Cancel Order</a>
                                          </li>
                                        </ul>
                                      )}
                                  </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* {Delivered} */}

                <div
                  className={`tab-pane fade ${
                    deliveredtab ? "show active" : ""
                  }`}
                  id="delivered-tab-pane"
                  role="tabpanel"
                  aria-labelledby="delivered-tab"
                  tabindex={`${deliveredtab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Name</th>
                      <th>Product Type</th>
                      <th>Method</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      {/* <th>Action</th> */}
                    </tr>

                    {PermissionData()?.VIEW_ORDER_DELIVERED ==
                    "VIEW_ORDER_DELIVERED"
                      ? adminorderdeliveredData &&
                        adminorderdeliveredData.map((item, id) => {
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>
                              <td> {item.name ? item.name : "B2C"}</td>
                              <td> {item.product_type}</td>
                              <td> {item.method}</td>
                              {B2BPartner == "false" ? (
                                <td> {item.delivery_partner}</td>
                              ) : (
                                ""
                              )}
                              <td>
                                <div className="action-btngroup">
                                  {/* <select
                                  type="button"
                                  className={`  btn order-btn ${PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION" ? " " : "permission_blur"}`}
                                  onChange={((e) => PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION"
                                    ? ReturnTrack(e, item.product_order_id) : "")}
                                >
                                  <option value="" selected={SelectedReasonTrue}  >
                                    Select
                                  </option>
                                  <option value="RTO" selected={!SelectedReasonTrue}  >
                                    Return
                                  </option>
                                </select> */}
                                  {/* <button type="button"  

                                    className={`btn btn-ship ${PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION" ? " " : "permission_blur"}`}
                                   onClick={((e) => PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION"
                                   ? OutForDevliveryActionFun(e, item) : "")}>
                                  {" "}
                                 Return{" "}
                                </button> */}

                                  {/* <button type="button" className="btn order-btn">
                                  <img
                                    src="/images/icon32.png"
                                    alt="img"
                                    onClick={(e) => EditCancelFun(e, item)}
                                  />

                                  {editcancelobjectdata ==
                                    item.product_order_id && (
                                      <ul className="dropdown">
                                        <li
                                          onClick={(e) =>
                                            CancelOrder(e, item.product_order_id)
                                          }
                                        >
                                          <a href="#">Cancel Order</a>
                                        </li>
                                      </ul>
                                    )}
                                </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* {OUt For Deliviry} */}

                <div
                  className={`tab-pane fade ${
                    outfordeliverytab ? "show active" : ""
                  }`}
                  id="outfordelivery-tab-pane"
                  role="tabpanel"
                  aria-labelledby="outfordelivery-tab"
                  tabindex={`${outfordeliverytab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Name</th>
                      <th>Product Type</th>
                      <th>Method</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      <th>Action</th>
                    </tr>

                    {PermissionData()?.VIEW_ORDER_DELIVERED ==
                    "VIEW_ORDER_DELIVERED"
                      ? adminoutfordeliveryData &&
                        adminoutfordeliveryData.map((item, id) => {
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>
                              <td> {item.name ? item.name : "B2C"}</td>
                              <td> {item.product_type}</td>
                              <td> {item.method}</td>
                              {B2BPartner == "false" ? (
                                <td> {item.delivery_partner}</td>
                              ) : (
                                ""
                              )}
                              <td>
                                <div className="action-btngroup">
                                  <select
                                    type="button"
                                    className="btn order-btn"
                                    onChange={(e) =>
                                      OutForDevliveryActionFun(e, item)
                                    }
                                  >
                                    <option
                                      selected={reasonActionValue == "null"}
                                      value="null"
                                    >
                                      Select...
                                    </option>
                                    {/* <option value="RTO">
                                    Return
                                  </option> */}
                                    <option value="DELIVERED">delivered</option>
                                    <option value="IN_TRANSIT">
                                      In-transit
                                    </option>
                                  </select>

                                  {/* <button type="button"
                                  className={`btn btn-ship ${PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION" ? " " : "permission_blur"}`}
                                  onClick={((e) => PermissionData()?.ALLOW_DELIVERED_ACTION == "ALLOW_DELIVERED_ACTION" ? ReturnTrack(e, item.product_order_id) : "")}>
                                  {" "}
                                   
                                </button> */}
                                  {/* <button type="button" className="btn order-btn">
                                  <img
                                    src="/images/icon32.png"
                                    alt="img"
                                    onClick={(e) => EditCancelFun(e, item)}
                                  />

                                  {editcancelobjectdata ==
                                    item.product_order_id && (
                                      <ul className="dropdown">
                                        <li
                                          onClick={(e) =>
                                            CancelOrder(e, item.product_order_id)
                                          }
                                        >
                                          <a href="#">Cancel Order</a>
                                        </li>
                                      </ul>
                                    )}
                                </button> */}
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* {return} */}

                <div
                  className={`tab-pane fade ${returntab ? "show active" : ""}`}
                  id="returns-tab-pane"
                  role="tabpanel"
                  aria-labelledby="returns-tab"
                  tabindex={`${returntab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th>Order Id </th>
                      <th>Name</th>
                      <th>Shipped Date</th>
                      <th>Product Type</th>
                      <th>RTO Address</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      <th>Action</th>
                    </tr>
                    {PermissionData()?.VIEW_ORDER_RETURNS ==
                    "VIEW_ORDER_RETURNS"
                      ? adminorderreturnData &&
                        adminorderreturnData?.map((item, id) => {
                          console.log("item", item);
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b>{item.product_order_id}</b>
                              </td>
                              <td>{item.name ? item.name : "B2C"}</td>
                              <td>
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    year: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </td>
                              <td>{item.product_type}</td>
                              <td>{item?.address?.address}</td>
                              {B2BPartner == "false" ? (
                                <td>{item.delivery_patner} </td>
                              ) : (
                                ""
                              )}
                              <td>
                                <div className="action-btngroup">
                                  <button
                                    type="button"
                                    className={`btn btn-ship ${
                                      PermissionData()?.ALLOW_BOOKED_ACTION ==
                                      "ALLOW_BOOKED_ACTION"
                                        ? " "
                                        : "permission_blur"
                                    }`}
                                    onClick={(e) =>
                                      // PermissionData()?.ALLOW_BOOKED_ACTION == "ALLOW_BOOKED_ACTION" ?
                                      // TransitTrack(e, item.product_order_id) : ""
                                      ReturnDeliveredTrack(
                                        e,
                                        item.product_order_id
                                      )
                                    }
                                  >
                                    RTO Delivered
                                  </button>
                                  {/* <button type="button" className="btn order-btn">
                                    <img
                                      src="/images/icon32.png"
                                      alt="img"
                                      onClick={(e) => EditCancelFun(e, item)}
                                    />

                                    {editcancelobjectdata ==
                                      item.product_order_id && (
                                        <ul className="dropdown">
                                          <li
                                            onClick={(e) =>
                                              CancelOrder(e, item.product_order_id)
                                            }
                                          >
                                            <a href="#">Cancel Order</a>
                                          </li>
                                        </ul>
                                      )}
                                  </button> */}
                                </div>
                              </td>
                              {/*  <td>
                                {" "}
                                <div className="action-btngroup">
                                  <button type="button" className="btn btn-ship">
                                    {" "}
                                    Ship Now{" "}
                                  </button>

                                   <button type="button" className="btn order-btn">
                                    <img
                                      src="/images/icon32.png"
                                      alt="img"
                                      onClick={(e) => EditCancelFun(e, item)}
                                    />

                                    {editcancelobjectdata ==
                                      item.product_order_id && (
                                        <ul className="dropdown">
                                          <li
                                            onClick={(e) =>
                                              CancelOrder(e, item.product_order_id)
                                            }
                                          >
                                            <a href="#">Cancel Order</a>
                                          </li>
                                        </ul>
                                      )}
                                  </button>  
                                </div>
                              </td>*/}
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* return delivered */}

                <div
                  className={`tab-pane fade ${
                    returndeliveredtab ? "show active" : ""
                  }`}
                  id="rto-delivered-tab-pane"
                  role="tabpanel"
                  aria-labelledby="rto-delivered-tab"
                  tabindex={`${returndeliveredtab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th>Order Id </th>
                      <th>Name</th>
                      <th>Shipped Date</th>
                      <th>Product Type</th>
                      <th>RTO Address</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      {/* <th>Action</th> */}
                    </tr>

                    {PermissionData()?.VIEW_ORDER_RETURNS ==
                    "VIEW_ORDER_RETURNS"
                      ? adminorderrtodeliveredData?.data &&
                        adminorderrtodeliveredData?.data?.map((item, id) => {
                          console.log("sdghsad", item);
                          return (
                            <tr>
                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b>{item.product_order_id}</b>
                              </td>
                              <td>{item.name ? item.name : "B2C"}</td>
                              <td>
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    year: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </td>
                              <td>{item.product_type}</td>
                              <td>{item?.address?.address}</td>
                              {B2BPartner == "false" ? (
                                <td>{item.delivery_patner} </td>
                              ) : (
                                ""
                              )}
                              {/*  <td>
                                {" "}
                                <div className="action-btngroup">
                                  <button type="button" className="btn btn-ship">
                                    {" "}
                                    Ship Now{" "}
                                  </button>

                                   <button type="button" className="btn order-btn">
                                    <img
                                      src="/images/icon32.png"
                                      alt="img"
                                      onClick={(e) => EditCancelFun(e, item)}
                                    />

                                    {editcancelobjectdata ==
                                      item.product_order_id && (
                                        <ul className="dropdown">
                                          <li
                                            onClick={(e) =>
                                              CancelOrder(e, item.product_order_id)
                                            }
                                          >
                                            <a href="#">Cancel Order</a>
                                          </li>
                                        </ul>
                                      )}
                                  </button>  
                                </div>
                              </td>*/}
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>

                {/* {cancel} */}

                <div
                  className={`tab-pane fade   ${
                    canceltab ? "show active" : "-1"
                  }`}
                  id="cancel-tab-pane"
                  role="tabpanel"
                  aria-labelledby="cancel-tab"
                  tabindex={`${canceltab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th> Order Date </th>
                      <th>Order Id</th>
                      <th>Name</th>
                      <th>Method</th>
                      <th>Product Type</th>
                      <th>Action</th>
                    </tr>

                    {PermissionData()?.VIEW_ORDER_PENDING ==
                    "VIEW_ORDER_PENDING"
                      ? adminordercancelData &&
                        adminordercancelData?.map((item, id) => {
                          console.log("item===>", item);
                          return (
                            <tr>
                              <td>
                                {new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    year: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </td>

                              <td
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                                style={{ cursor: "pointer" }}
                              >
                                <b> {item.product_order_id}</b>
                              </td>

                              {/* <td>{item.product_order_id}</td> */}
                              <td>{item.name ? item.name : "B2C"}</td>
                              <td>{item.method}</td>
                              <td>{item.product_type}</td>
                              <td>
                                <button
                                  type="button"
                                  className={`btn btn-ship  ${
                                    PermissionData()?.ALLOW_IN_TRANSIT_ACTION ==
                                    "ALLOW_IN_TRANSIT_ACTION"
                                      ? " "
                                      : "permission_blur"
                                  }`}
                                  onClick={(e) =>
                                    PermissionData()?.ALLOW_IN_TRANSIT_ACTION ==
                                    "ALLOW_IN_TRANSIT_ACTION"
                                      ? RebookFun(e, item)
                                      : ""
                                  }
                                  // style={{whiteSpace: "nowrap"}}
                                >
                                  {" "}
                                  Rebook
                                  {/* Delivered{" "} */}
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {pending && (
        <div className="popupouter 11">
          <div className="editb2b-box">
            <h2>Edit B2B</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => setPending((o) => !o)}
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
            <div className="popup-body row ">
              <div className="col-sm-6">
                <label>Delivery Partner</label>
                {/* <input
                                        type="text"
                                        className={`form-control ${partnernameactive ? "alert_border" : ""}`}
                                        placeholder="Ecom Express"
                                        value={partner}
                                        onChange={(e) => PartnerNameFun(e)}
                                    /> */}

                <div className="express-box">
                  <select
                    className="form-select"
                    onChange={(e) => PartnerNameFun(e)}
                  >
                    <option value="none" selected disabled hidden>
                      Select Partner...
                    </option>
                    <option value="DTDC">DTDC</option>
                    <option value="ANJANI">Anjani</option>
                    <option value="DHL">DHL</option>
                    <option value="SKYKING">Skyking</option>
                    <option value="XPRESSBEES">Xpressbees</option>
                    <option value="DELHIVERY">Delhivery</option>
                    <option value="NITRO">Nitro</option>
                  </select>
                </div>
                {!partnernameactive && !partner ? (
                  <div className="text-danger ">
                    <small> Select partner </small>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-6">
                <label>AWB No.</label>
                <input
                  type="text"
                  className={`form-control  ${
                    awbactive ? "alert_border" : ""
                  } `}
                  placeholder="AWB No."
                  value={awbcode}
                  onChange={(e) => AwbFun(e)}
                />
                {awbactive ? (
                  <div className="text-danger ">
                    <small>Max 12 Number </small>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="col-sm-6 mt-3">
                <label>Order Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="01/09/2022"
                  value={pendingeditobjectdata?.date}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Order ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="128924833"
                  value={pendingeditobjectdata?.product_order_id}
                />
              </div>
              <div className="col-sm-12 mt-3">
                <label>Expected Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="01/09/2022"
                  value={expecteddeliverydate}
                  onChange={(e) => expect(e)}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  value={pendingeditobjectdata?.name}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Method</label>
                <input
                  type="text"
                  className="form-control  "
                  placeholder="Electrical"
                  value={pendingeditobjectdata?.method}
                />
              </div>
              <div className="col-12 mt-3">
                <label>Product Type</label>
                <input
                  type="text"
                  className="form-control  "
                  placeholder="Electrical"
                  value={pendingeditobjectdata?.product_type}
                />
              </div>

              <div className="btngroups">
                <button
                  type="button"
                  className="save-btn"
                  onClick={(e) => SaveAwbFun(e)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={(e) => setPending((o) => !o)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reasonActionPopup && (
        <div className="popupouter 11">
          <div className="editb2b-box">
            <h2>Reason</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => CloseOtp()}
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
            <div className="popup-body row   ">
              <div className="col-sm-6 mt-4">
                <label className="fw-bold">Name</label>
                <div className="">{reasonActionRowData.name}</div>
              </div>
              <div className="col-sm-6 mt-4">
                <label className="fw-bold">Delivery Partner</label>
                <div className="">{reasonActionRowData.delivery_partner}</div>
              </div>
              <div className="col-sm-6 mt-2">
                <label className="fw-bold">Method</label>
                <div className="">{reasonActionRowData.method}</div>
              </div>

              <div className="col-sm-6 mt-2">
                <label className="fw-bold">Product Type</label>
                <div className="">{reasonActionRowData.product_type}</div>
              </div>
              <div className="col-sm-12 mt-2  ">
                <label className="fw-bold">Product Order Id</label>
                <div className="">{reasonActionRowData.product_order_id}</div>
              </div>

              <div className="col-sm-12 pt-3">
                <textarea
                  className="w-100 p-2"
                  rows="5"
                  cols="70"
                  placeholder="reason...."
                  value={reasonActionInputFieldData}
                  onChange={(e) => ReasonTextFun(e)}
                />
                {ReasonActionInputFieldError && (
                  <span className="text-danger">
                    <small> Enter your Reason </small>
                  </span>
                )}
              </div>

              <div className="btngroups">
                <button
                  type="button"
                  className="save-btn"
                  onClick={(e) => ConformActionFun(e)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={(e) => CloseOtp()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {otpActionPopup && (
        <div className="popupouter 11">
          <div className="editb2b-box">
            <h2>Reason</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => CloseOtp()}
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
            <div className="popup-body row   ">
              <div className="col-sm-6 mt-4">
                <label className="fw-bold">Name</label>
                <div className="">{reasonActionRowData.name}</div>
              </div>
              <div className="col-sm-6 mt-4">
                <label className="fw-bold">Delivery Partner</label>
                <div className="">{reasonActionRowData.delivery_partner}</div>
              </div>
              <div className="col-sm-6 mt-2">
                <label className="fw-bold">Method</label>
                <div className="">{reasonActionRowData.method}</div>
              </div>

              <div className="col-sm-6 mt-2">
                <label className="fw-bold">Product Type</label>
                <div className="">{reasonActionRowData.product_type}</div>
              </div>
              <div className="col-sm-12 mt-2  ">
                <label className="fw-bold">Product Order Id</label>
                <div className="">{reasonActionRowData.product_order_id}</div>
              </div>
              <div className="col-sm-12 mt-2  ">
                <label className="fw-bold">OTP :-</label>

                <div className="col-sm-12 pt-3">
                  <div className="otp_container">
                    <OtpInput
                      value={otpvalue}
                      onChange={handleChange}
                      numInputs={4}
                      focusStyle={false}
                    />
                  </div>
                  {otpvalue && otpvalue.length == 4 ? (
                    ""
                  ) : (
                    <span className="text-danger">
                      <small> Please Enter Otp </small>
                    </span>
                  )}
                </div>
              </div>

              <div className="btngroups">
                <button
                  type="button"
                  className="save-btn"
                  onClick={(e) => ConformOtpActionFun(e)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={(e) => CloseOtp()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Popup
        open={paymentmethodpopup}
        position=""
        model
        className="sign_up_loader"
      >
        <div className="wallet-popup">
          <div className={`popupinner ${wallettab ? "active" : ""}`}>
            <h4
              className="text-danger calender_popup_cancel "
              aria-selected={`${wallettab ? "true" : "false"}`}
              onClick={(e) => {
                PaymentPopupFun(e);
                // setPaymentMethodPopup((o) => !o);
              }}
            >
              {" "}
              X{" "}
            </h4>
            <h2>Select your payment Mode</h2>
            <p>Total Amount to pay Rs. {ReebookObjectDetails?.amount}</p>
            <div className="popup-body mt-5">
              <ul className="pay-list">
                <li
                  className={`row mx-0 ${activepaymentwallet}`}
                  onClick={(e) => {
                    setActivePaymentWallet("activeWalletPayment");
                    setActivePaymentRazorPay("activeRazorPayment");
                  }}
                >
                  <div className="col-2 ">
                    <img
                      src="/images/wallet.svg"
                      alt="img"
                      // onClick={(e) => setWallet(o => !o)}
                    />
                  </div>
                  <div
                    className="col-9"
                    // onClick={(e) => GoTOWalletFun(e)}
                  >
                    <p className="mb-1">Wallet</p>
                    <p className="mb-0">
                      Current Balance :
                      <b>
                        {" "}
                        {GetWalletBalanceData?.data?.balance_status ==
                        "NEGATIVE"
                          ? `-${GetWalletBalanceData?.data?.balance}`
                          : GetWalletBalanceData?.data?.balance}
                        /-
                      </b>
                    </p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center">
                    {" "}
                    {/* <b> &gt; </b>{" "} */}
                  </div>
                </li>
                {/* <li className={`row mx-0 ${activepaymentrazorpay}`}
                  onClick={(e) => { setActivePaymentWallet("activeRazorPayment"); setActivePaymentRazorPay("activeWalletPayment") }}>
                  <div className="col-2">
                    <img src="/images/online.svg" alt="img" />
                  </div>
                  <div className="col-9">
                    <p className="mb-1">Online</p>
                    <p className="mb-0">example123@Gmail.com</p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center">
                    {" "}
                    <b> &gt; </b>{" "}
                  </div>
                </li> */}
              </ul>

              <button
                type="button"
                className="btn pr-pay mb-0"
                onClick={(e) => ContinuePaymentFun(e)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Popup>

      <LodingSpiner loadspiner={loadspiner} />
    </>
  );
};
export default Order;
