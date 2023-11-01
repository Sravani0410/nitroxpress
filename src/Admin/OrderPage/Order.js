import React, { Children, useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Sidebar from "../Sidebar";
import LodingSpiner from "../../Components/LodingSpiner";
import confirmationimg from "../../Images/confirmation.svg";
import dots from "../../Images/dots.svg";
import Header from "../Header";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import Popup from "reactjs-popup";
import Axios from "axios";
import PopupComponent from "../../ReusableComponents/Popup/PopupComponent";
import ReactPaginate from "react-paginate";

import {
  GetAdminOrderDelivered,
  GetAdminOrderIntransit,
  GetAdminOrderPending,
  GetAdminOrderPickedUp,
  GetAdminOrderReadyForPickup,
  GetAdminOrderReceivedAtHub,
  GetAdminOrderReturn,
  GetAdminOrderRTODelivered,
  GetAdminOrderBooked,
  GetAdminOrderSummary,
  PostAdminOrderFilteration,
  PostAdminOrderAction,
  DeleteAdminPendingOrderAction,
  PostAdminOrderCsvFile,
  DeleteAdminOrder,
  PostUploadFile,
  PatchTrackDetails,
  ToggleSideBarTrueFalse,
  GetAdminOutForDelivery,
  GetCancelOrderDetail,
  GetWalletBalance,
  PostDebitBalance,
  PostAdminOrderRebook,
  OrderPagesLoaderTrueFalse,
  PostViewOrderDetails,
  PostAdminOrderPaymentCal,
  GetSettingDeliveryboyInfo,
  PostAssignDeliveryBoyPartner,
  PostTrackLocationDetails,
  GetAdminSettingDeliveryPartner,
} from "../../Redux/action/ApiCollection";

import { PermissionData } from "../../Permission";
import PendingTab from "../OrderPage/PendingTab/PendingTab";
import ReadyToPickup from "../OrderPage/ReadyToPickup/ReadyToPickup";
import ReceivedAtHub from "../OrderPage/ReceivedAtHub/ReceivedAtHub";
import Booked from "../OrderPage/Booked/Booked";
import InTransit from "../OrderPage/InTransit/InTransit";
import OutForDelivery from "../OrderPage/OutForDelivery/OutForDelivery";
import Delivered from "../OrderPage/Delivered/Delivered";
import RTO from "../OrderPage/RTO/RTO";
import RTODelivered from "../OrderPage/RTODelivered/RTODelivered";
import Cancel from "../OrderPage/Cancel/Cancel";
import TabButton from "../OrderPage/TabButton/TabButton";
import Select from "react-select";
let B2BPartner = sessionStorage.getItem("Is_Business");
const Order = () => {
  const [otpvalue, setOtpValue] = useState("");
  const [partner, setPartner] = useState("");
  const [partnernameactive, setPartnerNameActive] = useState(false);
  const [pending, setPending] = useState(false);
  const [awbcode, setAwbCode] = useState("");
  const [expecteddeliverydate, setExpectedDelliveryDate] = useState("");
  const [locationdate, setLocationDate] = useState("");
  const [activeButton, setActiveButton] = useState(null);
  const [awbactive, setAwbActive] = useState(false);
  const [awbactivecheck, setAwbActiveCheck] = useState(false);
  const [pendingeditobjectdata, setPendingEditObjectData] = useState("");
  const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
  const [domesticcheckBox, setDomesticCheckBox] = useState(false);
  const [internationalcheckBox, setInternationalCheckBox] = useState(false);
  const [pandingtab, setPandingTab] = useState("");
  const [booktab, setBookTab] = useState("");
  const [pickuptab, setPickUpTab] = useState("");
  const [readyforpickuptab, setReadyForPickUpTab] = useState("");
  const [receivedathubtab, setReceivedAtHubTab] = useState("");
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
  const [deliveryboyvalue, setDeliveryBoyValue] = useState("");
  const [adminorderfilterationdata, setAdminOrderFilterationData] =
    useState(false);
  const [tabfiltersearchdata, setTabFilterSearchData] = useState("");
  const [adminorderpendingdata, setAdminOrderPendingData] = useState("");
  const [adminorderbookeddata, setAdminOrderBookedData] = useState("");
  const [adminorderpickupdata, setAdminOrderPickUpData] = useState("");
  const [adminorderreadyforpickupdata, setAdminOrderReadyForPickUpData] =
    useState("");
  const [payloadorderid, setPayloadOrderId] = useState("");
  const [payloaddeliveryboyid, setPayloadDeliveryBoyId] = useState("");
  const [adminorderreceivedathubdata, setAdminOrderReceivedAtHubData] =
    useState("");
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
  const [deliveryboypopup, setDeliveryBoyPopup] = useState(false);
  const [receivedathubpopup, setReceivedAtHubPopup] = useState(false);
  const [locationvalue, setLocationValue] = useState("");
  const [remarkvalue, setRemarkData] = useState("");
  const [trackingorderid, setTrackingOrderId] = useState("");
  const [tracklocationactionpopup, setTrackLocationActionPopup] =
    useState(false);
  const [reasonActionValue, setReasonActionValue] = useState(false);
  const [reasonActionRowData, setReasonActionRowData] = useState(false);
  const [reasonActionInputFieldData, setReasonActionInputFieldData] =
    useState("");
  const [ReasonActionInputFieldError, setReasonActionInputFieldError] =
    useState(false);
  const [SelectedReasonTrue, setSelectedReasonTrue] = useState(false);
  const [otpActionPopup, setOtpActionPopup] = useState(false);
  const [paymentmethodpopup, setPaymentMethodPopup] = useState(false);
  const [wallettab, setWalletTab] = useState("");
  const [activepaymentwallet, setActivePaymentWallet] = useState(false);
  const [activepaymentrazorpay, setActivePaymentRazorPay] = useState(false);
  const [ReebookObjectDetails, setReebookObjectDetails] = useState("");
  const [PaymentStatusTrueFalse, setPaymentStatusTrueFalse] = useState(false);
  const [PaymentStatusActive, setPaymentStatusActive] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [selectedPartnerIdOption, setselectedPartnerIdOption] = useState(null);
  const [TotalAmountValue, setTotalAmountValue] = useState("");
  const [BasePriceValue, setBasePriceValue] = useState("");
  const [Weight, setWeight] = useState("");
  const [Length, setLength] = useState("");
  const [Breadth, setBreadth] = useState("");
  const [Height, setHeight] = useState("");
  const [UserTypeData, setUserTypeData] = useState("");
  const [ZoneValue, setZoneValue] = useState(null);
  const [TotalOrderEnable, setTotalOrderEnable] = useState(false);
  const [walletpaypopup, setWalletPayPopup] = useState(false);
  const [calculatedamount, setCalculatedAmount] = useState(false);
  const [customcheckbox, setCustomCheckBox] = useState(false);
  const [pickuppopup, setPickUpPopup] = useState(false);
  const [amountlessthenwalletpaypopup, setAmountLessThenWalletPayPopup] =
    useState(false);

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
    (state) =>
      state?.GetAdminOrderPendingReducer?.GetAdminOrderPendingData?.data
  );
  const GetAdminOrderPickedUpData = useSelector(
    (state) =>
      state.GetAdminOrderPickedUpReducer.GetAdminOrderPickedUpData?.data
  );
  const GetAdminOrderReadyForPickupData = useSelector(
    (state) =>
      state.GetAdminOrderReadyForPickupReducer.GetAdminOrderReadyForPickupData
        ?.data
  );
  const GetAdminOrderReceivedAtHubData = useSelector(
    (state) =>
      state.GetAdminOrderReceivedAtHubReducer.GetAdminOrderReceivedAtHubData
        ?.data
  );
  const GetAdminSettingDeliveryPartnerData = useSelector(
    (state) =>
      state.GetAdminSettingDeliveryPartnerReducer
        .GetAdminSettingDeliveryPartnerData
  );
  const GetAdminOrderReturnData = useSelector(
    (state) => state.GetAdminOrderReturnReducer.GetAdminOrderReturnData
  );
  const GetAdminOrderRTODeliveredData = useSelector(
    (state) =>
      state.GetAdminOrderRTODeliveredReducer.GetAdminOrderRTODeliveredData?.data
  );
  const GetAdminOrderBookedData = useSelector(
    (state) => state.GetAdminOrderBookedReducer.GetAdminOrderBookedData?.data
  );
  const GetCancelOrderDetailData = useSelector(
    (state) => state.GetCancelOrderDetailReducer.GetCancelOrderDetailData?.data
  );
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
  const PostAdminOrderActionData = useSelector(
    (state) => state.PostAdminOrderActionReducer.PostAdminOrderActionData?.data
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
    (state) => state.PatchTrackDetailsReducer.PatchTrackDetailsData
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
  const OrderPagesLoaderTrueFalseData = useSelector(
    (state) =>
      state.OrderPagesLoaderTrueFalseReducer?.OrderPagesLoaderTrueFalseData
  );
  const PostViewOrderDetailsData = useSelector(
    (state) => state.PostViewOrderDetailsReducer?.PostViewOrderDetailsData
  );
  const PostAdminOrderPaymentCalReducerData = useSelector(
    (state) =>
      state.PostAdminOrderPaymentCalReducer?.PostAdminOrderPaymentCalReducerData
  );
  const GetSettingDeliveryboyInfoData = useSelector(
    (state) =>
      state.GetSettingDeliveryboyInfoReducer?.GetSettingDeliveryboyInfoData
  );

  const PostAssignDeliveryBoyPartnerData = useSelector(
    (state) =>
      state.PostAssignDeliveryBoyPartnerReducer
        ?.PostAssignDeliveryBoyPartnerData
  );

  let Is_delivery_boy = sessionStorage.getItem("Is_delivery_boy", false);

  useEffect(() => {
    if (param.hash == "#pending") {
      if (Is_delivery_boy != "true") {
        dispatch(GetAdminOrderPending());
      }
    } else if (param.hash == "#ready_for_pickup") {
      dispatch(GetAdminOrderReadyForPickup());
    } else if (param.hash == "#picked_up") {
      dispatch(GetAdminOrderPickedUp());
    } else if (param.hash == "#received_at_hub") {
      dispatch(GetAdminSettingDeliveryPartner());
      dispatch(GetAdminOrderReceivedAtHub());
    } else if (param.hash == "#booked") {
      dispatch(GetAdminOrderBooked());
    } else if (param.hash == "#transit") {
      dispatch(GetAdminOrderIntransit());
    } else if (param.hash == "#OUT_FOR_DELIVERY") {
      dispatch(GetAdminOutForDelivery());
    } else if (param.hash == "#delivered") {
      dispatch(GetAdminOrderDelivered());
    } else if (param.hash == "#return") {
      dispatch(GetAdminOrderReturn());
    } else if (param.hash == "#rto_delivered") {
      dispatch(GetAdminOrderRTODelivered());
    } else if (param.hash == "#cancel") {
      dispatch(GetCancelOrderDetail());
    }
  }, [param.hash]);

  const IntransitFun = (e, id) => {
    sessionStorage.setItem("order_id", id);
    let objectData = {
      product_order_id: id,
    };
    // this "tabfilteravailable" is important for back routhing of "/admin/Orderinner/id" page.
    dispatch(GetAdminOrderSummary(objectData));
    navigate(`/admin/Orderinner/${id}${tabfilteravailable}`);
    window.location.reload(false);
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
    setReasonActionInputFieldData("");
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
      setPaymentStatusActive(true);
      setPaymentStatusTrueFalse(true);
    } else if (data === "noCOD") {
      setCodCheckBox((o) => !o);
      setPrepaidCheckBox(false);
      setPaymentStatusActive(false);
      setPendingPartner(false);
      setRecievedPartner(false);
      setPaidCustomer(false);
      setPaymentStatusTrueFalse(false);
    } else if (data === "PREPAID") {
      setPrepaidCheckBox((o) => !o);
      setCodCheckBox(false);
      setPendingPartner(false);
      setRecievedPartner(false);
      setPaidCustomer(false);
      setPaymentStatusTrueFalse(false);
    }
  };

  useEffect(() => {
    if (param.hash) {
      if (param.hash == "#pending") {
        navigate("#pending");
        setPandingTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#ready_for_pickup") {
        navigate("#ready_for_pickup");
        setReadyForPickUpTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#picked_up") {
        navigate("#picked_up");
        setPickUpTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#received_at_hub") {
        navigate("#received_at_hub");
        setReceivedAtHubTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#booked") {
        navigate("#booked");
        setBookTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setTransitTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#transit") {
        navigate("#transit");
        setTransitTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#delivered") {
        navigate("#delivered");
        setDeliveredTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setTransitTab("");
        setOutForDeliveryTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#OUT_FOR_DELIVERY") {
        navigate("#OUT_FOR_DELIVERY");
        setOutForDeliveryTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setBookTab("");
        setTransitTab("");
        setDeliveredTab("");
        setReturnTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#return") {
        navigate("#return");
        setReturnTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setBookTab("");
        setTransitTab("");
        setReturnDeliveredTab("");
        setCancelTab("");
      } else if (param.hash == "#rto_delivered") {
        navigate("#rto_delivered");
        setReturnDeliveredTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
        setDeliveredTab("");
        setOutForDeliveryTab("");
        setBookTab("");
        setTransitTab("");
        setReturnTab("");
        setCancelTab("");
      } else if (param.hash == "#cancel") {
        navigate("#cancel");
        setCancelTab({
          activeValue: "active",
          booleanValue: true,
          tabindex: "-1",
        });
        setReadyForPickUpTab("");
        setPickUpTab("");
        setReceivedAtHubTab("");
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
      setReadyForPickUpTab("");
      setPickUpTab("");
      setReceivedAtHubTab("");
      setReturnTab("");
      setReturnDeliveredTab("");
      setDeliveredTab("");
      setOutForDeliveryTab("");
      setBookTab("");
      setTransitTab("");
      setCancelTab("");
    }
  }, [param.hash]);

  const StatusFun = (e, dataParameter) => {
    if (dataParameter === "PendingPartner") {
      if (
        tabfilteravailable == "#ready_for_pickup" ||
        tabfilteravailable == "#picked_up" ||
        tabfilteravailable == "#received_at_hub" ||
        tabfilteravailable === "#booked" ||
        tabfilteravailable === "#transit" ||
        tabfilteravailable == "#OUT_FOR_DELIVERY"
      ) {
        setPendingPartner((o) => !o);
        setRecievedPartner(false);
        setPaidCustomer(false);
      }
    } else if (dataParameter === "RecievedPartner") {
      if (
        tabfilteravailable == "#delivered"
        // tabfilteravailable !== "#booked" &&
        // tabfilteravailable !== "#transit" &&
        // tabfilteravailable !== "#OUT_FOR_DELIVERY"
      ) {
        setRecievedPartner((o) => !o);
        setPendingPartner(false);
        setPaidCustomer(false);
      }
    } else if (dataParameter === "PaidCustomer") {
      if (
        tabfilteravailable == "#delivered"
        // tabfilteravailable !== "#booked" &&
        // tabfilteravailable !== "#transit" &&
        // tabfilteravailable !== "#OUT_FOR_DELIVERY"
      ) {
        // setPaidCustomer((o) => !o);
        setPaidCustomer(false);
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
      page_name: splitdata[1]?.toLowerCase(),
      // page_name: splitdata[1],
      payment_status: paymentStatus,
      shipping_partner: shippingpartnervalue,
      cod_status: statusData,
      nationality: nationality,
      data_type: CustomerType,
      delivery_boy: deliveryboyvalue,
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
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderPendingData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderPendingData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderPendingData(GetAdminOrderPendingData);
        setFilterActive(false);
      }
      // setAdminOrderPendingData(GetAdminOrderPendingData);
      // setFilterDataHideAfterTabChange(false);
    } else if (param.hash === "#ready_for_pickup") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderReadyForPickUpData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderReadyForPickupData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderReadyForPickUpData(GetAdminOrderReadyForPickupData);
        setFilterActive(false);
      }
    } else if (param.hash === "#picked_up") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderPickUpData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderPickedUpData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderPickUpData(GetAdminOrderPickedUpData);
        setFilterActive(false);
      }
    } else if (param.hash === "#received_at_hub") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderReceivedAtHubData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderReceivedAtHubData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderReceivedAtHubData(GetAdminOrderReceivedAtHubData);
        setFilterActive(false);
      }
    } else if (param.hash === "#booked") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderBookedData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderBookedData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderBookedData(GetAdminOrderBookedData);
        setFilterActive(false);
      }
    } else if (param.hash === "#transit") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderIntransitDate(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderIntransitDate?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderIntransitDate(GetAdminOrderIntransitDate);
        setFilterActive(false);
      }
    } else if (param.hash === "#OUT_FOR_DELIVERY") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOutForDeliveryData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOutForDeliveryData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOutForDeliveryData(GetAdminOutForDeliveryData);
        setFilterActive(false);
      }
    } else if (param.hash === "#delivered") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderDeliveredData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderDeliveredData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }

        setAdminOrderDeliveredData(GetAdminOrderDeliveredData);
        setFilterActive(false);
      }
    } else if (param.hash === "#return") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderReturnData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderReturnData?.data?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderReturnData(GetAdminOrderReturnData?.data);
        setFilterActive(false);
      }
    } else if (param.hash === "#rto_delivered") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderRTODeliveredData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetAdminOrderRTODeliveredData?.length > 0) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderRTODeliveredData(GetAdminOrderRTODeliveredData);
        setFilterActive(false);
      }
    } else if (param.hash === "#cancel") {
      setFilterDataHideAfterTabChange(false); //this will false the if condition so when the tab is changed the if condition will false and then the tab is changed then the all data will show
      if (PostAdminOrderFilterationData && filterdatahideaftertabchange) {
        setAdminOrderCancelData(PostAdminOrderFilterationData?.data);
        setFilterActive(true);
      } else {
        if (GetCancelOrderDetailData?.length >= 1) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        setAdminOrderCancelData(GetCancelOrderDetailData);
        setFilterActive(false);
      }
    }
  }, [
    PostAdminOrderFilterationData,
    param.hash,
    GetAdminOrderReadyForPickupData,
    GetAdminOrderPickedUpData,
    GetAdminOrderReceivedAtHubData,
    GetAdminOrderPendingData,
    GetAdminOrderBookedData,
    GetAdminOrderIntransitDate,
    GetAdminOrderDeliveredData,
    GetAdminOutForDeliveryData,
    GetAdminOrderReturnData?.data,
    GetAdminOrderRTODeliveredData,
    GetCancelOrderDetailData,
    adminorderfilterationdata,
  ]);
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
        setPayloadDeliveryBoyId("");
      } else {
        setAdminOrderPendingData(result);
        setPayloadDeliveryBoyId("");
      }
    }
    if (param.hash === "#ready_for_pickup") {
      result = GetAdminOrderReadyForPickupData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderReadyForPickUpData(GetAdminOrderReadyForPickupData);
      } else {
        setAdminOrderReadyForPickUpData(result);
      }
    }
    if (param.hash === "#picked_up") {
      result = GetAdminOrderPickedUpData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderPickUpData(GetAdminOrderPickedUpData);
      } else {
        setAdminOrderPickUpData(result);
      }
    }
    if (param.hash === "#received_at_hub") {
      result = GetAdminOrderReceivedAtHubData?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderReceivedAtHubData(GetAdminOrderReceivedAtHubData);
      } else {
        setAdminOrderReceivedAtHubData(result);
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
      result = GetAdminOrderReturnData?.data?.filter((data) => {
        if (value) {
          return data?.product_order_id?.toUpperCase().search(value) !== -1;
        }
      });
      if (value === "") {
        setAdminOrderReturnData(GetAdminOrderReturnData?.data);
      } else {
        setAdminOrderReturnData(result);
      }
    }
    if (param.hash === "#rto_delivered") {
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
    const selected = new Date(expecteddeliverydate);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    let payload = {
      product_order_id: pendingeditobjectdata.product_order_id,
      delivery_partner: selectedPartnerIdOption?.value,
      awb_number: awbcode,
      expected_date: expecteddeliverydate,
      zone: ZoneValue,
      total_amount: Number(TotalAmountValue),
      length: PostViewOrderDetailsData?.data[0]?.length == null ? 0 : Length,
      breadth: PostViewOrderDetailsData?.data[0]?.breadth == null ? 0 : Breadth,
      height: PostViewOrderDetailsData?.data[0]?.height == null ? 0 : Height,
      weight: Weight,
      amount_format: {
        base_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.base_price,
        packaging_percent:
          PostViewOrderDetailsData?.data[0]?.amount_format?.packaging_percent,
        fuel_charge:
          PostViewOrderDetailsData?.data[0]?.amount_format?.fuel_charge,
        fuel_charge_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.fuel_charge_price,
        cod_percent:
          PostViewOrderDetailsData?.data[0]?.amount_format?.cod_percent,
        cod_percent_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.cod_percent_price,
        gst: PostViewOrderDetailsData?.data[0]?.amount_format?.gst,
        insurance: PostViewOrderDetailsData?.data[0]?.amount_format?.insurance,
        packaging_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.packaging_price,
        insurance_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.insurance_price,
        price_without_gst:
          PostViewOrderDetailsData?.data[0]?.amount_format?.price_without_gst,
        total_price:
          PostViewOrderDetailsData?.data[0]?.amount_format?.total_price,
      },
    };
    if (
      awbactive == false &&
      awbcode?.length != 0 &&
      selectedPartnerIdOption != "none" &&
      selectedPartnerIdOption != "" &&
      expecteddeliverydate != ""
    ) {
      if (selected <= maxDate) {
        toast.warn("Please select valid Date");
      } else {
        dispatch(PostAdminOrderAction(payload));
        setAwbActiveCheck((o) => !o);
        // setPending((o) => !o);
        setReceivedAtHubPopup((o) => !o);
        setselectedPartnerIdOption("");
        setAwbCode("");
        setExpectedDelliveryDate("");
      }
    } else {
      toast.warn("please fill all the fields");
      setPartnerNameActive(true);
    }
  };

  const DeletePending = (e, orderid) => {
    let payload = {
      product_order_id: orderid,
    };
    setLoadSpiner(true);
    dispatch(DeleteAdminPendingOrderAction(payload));
    if (Is_delivery_boy != "true") {
      dispatch(GetWalletBalance());
    }
    // dispatch(GetWalletBalance())
    setPayloadDeliveryBoyId("");
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
    // setReceivedAtHubTab(true);
    setReceivedAtHubPopup(true);
    setPendingEditObjectData(allData);
    let PayloadData = {
      product_order_id: Number(allData.product_order_id),
    };
    dispatch(PostViewOrderDetails(PayloadData));
  };

  const AwbFun = (e) => {
    setAwbCode(e.target.value);
  };

  const expect = (e) => {
    setExpectedDelliveryDate(e.target.value);
    setLocationDate(e.target.value);
  };

  // const CurrentDateFun = (e) => {
  //   const selected = new Date(e.target.value);
  //   const maxDate = new Date();
  //   maxDate.setHours(0, 0, 0, 0);

  //   if (selected >= maxDate) {
  //     let spliteData = selected.toISOString().split("T")
  //     setExpectedDelliveryDate(spliteData[0])

  //   }
  //   else {
  //     toast.warn("please select valid Date ");
  //     setExpectedDelliveryDate("")
  //   }

  // }

  const CurrentDateFun = (e) => {
    const selected = new Date(e.target.value);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    if (selected >= maxDate) {
      let spliteData = selected.toISOString().split("T");
      setExpectedDelliveryDate(spliteData[0]);
    } else {
      toast.warn("please select valid Date ");
      setExpectedDelliveryDate("");
    }
  };

  useEffect(() => {
    if (Is_delivery_boy != "true") {
      dispatch(GetSettingDeliveryboyInfo());
    }
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const PartnerNameFun = (e) => {
    setselectedPartnerIdOption(e.target.value);
    if (e.target.value?.length !== 0) {
      setPartnerNameActive(false);
    } else {
      setPartnerNameActive(true);
    }
  };

  const CsvDownload = (e, orderid) => {
    let BlankArrayData = [];
    let splitdata = param.hash.split("#");
    let PayloadData = {
      order_ids: BlankArrayData,
      page: splitdata[1],
    };
    if (param.hash === "#pending") {
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
      if (
        adminorderpendingdata != undefined &&
        adminorderpendingdata?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    }
    if (param.hash === "#ready_for_pickup") {
      adminorderreadyforpickupdata &&
        adminorderreadyforpickupdata?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_READY_TO_PICKUP_CSV ==
        "DOWNLOAD_READY_TO_PICKUP_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderreadyforpickupdata != undefined &&
        adminorderreadyforpickupdata?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#picked_up") {
      adminorderpickupdata &&
        adminorderpickupdata?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_PICKUP_CSV == "DOWNLOAD_PICKUP_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderpickupdata != undefined &&
        adminorderpickupdata?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#received_at_hub") {
      adminorderreceivedathubdata &&
        adminorderreceivedathubdata?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_RECIEVED_AT_HUB_CSV ==
        "DOWNLOAD_RECIEVED_AT_HUB_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderreceivedathubdata != undefined &&
        adminorderreceivedathubdata?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#booked") {
      adminorderbookeddata &&
        adminorderbookeddata?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_BOOKED_CSV == "DOWNLOAD_BOOKED_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderbookeddata != undefined &&
        adminorderbookeddata?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#transit") {
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
      if (
        adminorderintransitDate != undefined &&
        adminorderintransitDate?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#delivered") {
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
      if (
        adminorderdeliveredData != undefined &&
        adminorderdeliveredData?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#OUT_FOR_DELIVERY") {
      adminoutfordeliveryData &&
        adminoutfordeliveryData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_OUT_FOR_DELIVERED_CSV ==
        "DOWNLOAD_OUT_FOR_DELIVERED_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminoutfordeliveryData != undefined &&
        adminoutfordeliveryData?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#return") {
      adminorderreturnData &&
        adminorderreturnData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_RETURNS_CSV == "DOWNLOAD_RETURNS_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderreturnData != undefined &&
        adminorderreturnData?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#rto_delivered") {
      adminorderrtodeliveredData &&
        adminorderrtodeliveredData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (
        PermissionData()?.DOWNLOAD_RTO_DELIVERED_CSV ==
        "DOWNLOAD_RTO_DELIVERED_CSV"
      ) {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminorderrtodeliveredData != undefined &&
        adminorderrtodeliveredData?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    } else if (param.hash === "#cancel") {
      adminordercancelData &&
        adminordercancelData?.map((item, id) => {
          BlankArrayData.push(item.product_order_id);
        });
      if (PermissionData()?.DOWNLOAD_CANCEL_CSV == "DOWNLOAD_CANCEL_CSV") {
        setDownloadCsvPermission(true);
      } else {
        setDownloadCsvPermission(false);
      }
      if (
        adminordercancelData != undefined &&
        adminordercancelData?.length != 0
      ) {
        dispatch(PostAdminOrderCsvFile(PayloadData));
      } else {
      }
    }
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
    GetAdminOrderReadyForPickupData,
    GetAdminOrderPickedUpData,
    GetAdminOrderReceivedAtHubData,
    GetAdminOrderBookedData,
    GetAdminOrderIntransitDate,
    GetAdminOrderDeliveredData,
    GetAdminOutForDeliveryData,
    GetAdminOrderReturnData?.data,
    GetAdminOrderRTODeliveredData,
    GetCancelOrderDetailData,
    adminorderpendingdata,
    adminorderpickupdata,
    adminorderreadyforpickupdata,
    adminorderreceivedathubdata,
    adminorderbookeddata,
    adminorderintransitDate,
    adminorderdeliveredData,
    adminoutfordeliveryData,
    adminorderreturnData,
    adminorderrtodeliveredData,
    adminordercancelData,
  ]);

  const CloseOtp = () => {
    setOtpActionPopup(false);
    setReasonActionValue("null");
    setReasonActionPopup(false);
    setReasonActionInputFieldData("");
    setRemarkData("");
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
      shippingpartnervalue ||
      deliveryboyvalue
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
    setShippingPartnerValue("");
    setDeliveryBoyValue("");
  };

  const TransitTrack = (e, orderid) => {
    let payload = {
      track_update_type: "IN_TRANSIT",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };

  const PickupTrack = (e, orderid) => {
    let payload = {
      track_update_type: "PICKED_UP",
      product_order_id: orderid,
    };
    dispatch(PatchTrackDetails(payload));
  };
  const ReceivedAtHubTrack = (e, orderid) => {
    let payload = {
      track_update_type: "RECEIVED_AT_HUB",
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
      } else if (e.target.value == "delivered") {
        setReasonActionPopup(false);
      } else if (e.target.value == "intransit") {
        setReasonActionPopup(false);
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
      } else if (e.target.value == "OFD") {
        setReasonActionPopup(false);
      } else if (e.target.value == "rto") {
        setReasonActionPopup(false);
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
        // let InvoicePayLoad = {
        //   product_order_id: reasonActionRowData.product_order_id,
        //   request_type: "create",
        // };
        // let Labelpayload = {
        //   product_order_id: reasonActionRowData.product_order_id,
        //   request_type: "create"
        // }
        dispatch(PatchTrackDetails(payload));
        // dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        // dispatch(PostOrderDownloadLabelGenerationFile(Labelpayload))
        setReasonActionValue("null");
        setReasonActionPopup(false);
        setReasonActionInputFieldData("");
      } else {
        setReasonActionInputFieldData("");
      }
      // dispatch(PostOrderTrack(payload))
    }
  };
  const receivedathubFun = () => {
    setReceivedAtHubPopup((o) => !o);
    window.location.reload(false);
    // dispatch(PostViewOrderDetails())
    // setWeight("")
    // setLength("")
    // setHeight("")
    // setBreadth("")
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
    setRemarkData(newStr);
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
      if (PostDebitBalanceData.status == 200 && param.hash === "#cancel") {
        // setPaymentMethodPopup(false);

        dispatch(PostAdminOrderRebook(RebookPayload));
        //  dispatch(GetCancelOrderDetail())
        // setWalletPayPopup(false)
        setLoadSpiner(false);
      } else {
        setLoadSpiner(false);
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
  };

  const PaymentPopupFun = () => {
    setPickUpPopup(false);
    setCustomCheckBox(false);
    setWalletTab({
      activeValue: "active",
      booleanValue: true,
      tabindex: "-1",
    });
    setPaymentMethodPopup(false);
  };
  const AddPaymentFun = async () => {
    setLoadSpiner((o) => !o);

    try {
      let amountValue = calculatedamount;
      let BearerToken = sessionStorage.getItem("token", false);
      let bodyContent;
      bodyContent = JSON.stringify({
        amount: parseFloat(amountValue),
        redirect_url: `${process.env.REACT_APP_REDIRECT_URL}/admin/order/#cancel`,
      });

      const data = await Axios({
        url: `${process.env.REACT_APP_BASE_URL}/wallet/add_money`, //razorpay
        method: "POST",
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          Accept: "*/*",
          "Content-Type": "application/json",
        },
        data: bodyContent,
      }).then((res) => {
        setLoadSpiner((o) => !o);
        window.location.replace(`${res?.data?.pay_page_url}`);
        return res;
      });
    } catch (err) {
      setLoadSpiner((o) => !o);
    }
  };
  const ContinuePaymentFun = () => {
    // setLoadSpiner((o) => !o);
    try {
      let payLoad = {
        amount: Number(ReebookObjectDetails?.amount),
        order_id: Number(ReebookObjectDetails?.product_order_id),
        company_name: ReebookObjectDetails?.name,
        is_true: true,
      };
      if (amountlessthenwalletpaypopup) {
        if (activepaymentrazorpay == "activeWalletPayment") {
          // PaymentFun() // This function open the RazorPay Popup
        } else {
          if (B2BPartner == "true") {
            if (GetWalletBalanceData?.data?.b2b_negative_limit > 0) {
              dispatch(PostDebitBalance(payLoad));
            } else {
              setWalletPayPopup(true);
            }
          } else {
            dispatch(PostDebitBalance(payLoad));
            setPaymentMethodPopup(false);
          }
        }
      } else if (activepaymentwallet == "activeWalletPayment") {
        dispatch(PostDebitBalance(payLoad));
      }
      // dispatch(PostDebitBalance(payLoad));
      // setPaymentMethodPopup(false);
    } catch (err) {
      // setLoadSpiner((o) => !o);
    }
  };
  useEffect(() => {
    if (PostDebitBalanceData) {
      if (PostDebitBalanceData.status == 200) {
        setPaymentMethodPopup(false);
        // setWalletPayPopup(false);
        // setLoadSpiner((o) => !o);
      } else {
        // setLoadSpiner(false);
        // setWalletPayPopup(false);
      }
    }
  }, [PostDebitBalanceData]);
  useEffect(() => {
    if (GetWalletBalanceData && ReebookObjectDetails?.amount) {
      if (
        GetWalletBalanceData?.data?.b2b_balance >=
        Number(ReebookObjectDetails?.amount)
      ) {
        setAmountLessThenWalletPayPopup(false);
      } else {
        let calaculated =
          Number(ReebookObjectDetails?.amount) -
          GetWalletBalanceData?.data?.b2b_balance;
        // ?.toFixed(2)
        setCalculatedAmount(calaculated.toFixed(2));
        setAmountLessThenWalletPayPopup(true);
      }
    }
  }, [ReebookObjectDetails?.amount, GetWalletBalanceData]);

  const ProceedToPayFun = () => {
    if (B2BPartner == "true") {
      AddPaymentFun();
    }
  };
  const showAddressFun = (e, item) => {
    if (activeButton === item.product_order_id) {
      setActiveButton(null);
    } else {
      setActiveButton(item.product_order_id);
    }
  };

  useEffect(() => {
    if (PostViewOrderDetailsData.status == 200) {
      if (ZoneValue == "OTHER") {
        setZoneValue("OTHER");
        if (
          PostViewOrderDetailsData?.data[0]?.base_price ==
          PostViewOrderDetailsData?.data[0]?.base_price
        ) {
          setWeight(PostViewOrderDetailsData?.data[0]?.weight);
          setLength(PostViewOrderDetailsData?.data[0]?.length);
          setBreadth(PostViewOrderDetailsData?.data[0]?.breadth);
          setHeight(PostViewOrderDetailsData?.data[0]?.height);
          setUserTypeData(PostViewOrderDetailsData?.data[0]?.user_type);
          setTotalAmountValue(PostViewOrderDetailsData?.data[0]?.total_price);
          setBasePriceValue(PostViewOrderDetailsData?.data[0]?.base_price);
        }
      } else {
        setZoneValue(PostViewOrderDetailsData?.data[0]?.zone);
        setWeight(PostViewOrderDetailsData?.data[0]?.weight);
        setLength(PostViewOrderDetailsData?.data[0]?.length);
        setBreadth(PostViewOrderDetailsData?.data[0]?.breadth);
        setHeight(PostViewOrderDetailsData?.data[0]?.height);
        setTotalAmountValue(PostViewOrderDetailsData?.data[0]?.total_price);
        setBasePriceValue(PostViewOrderDetailsData?.data[0]?.base_price);
        setUserTypeData(PostViewOrderDetailsData?.data[0]?.user_type);
      }
    }
  }, [PostViewOrderDetailsData]);

  let ZoneArray = [
    { value: "METRO", key: "Metro" },
    { value: "NORTH", key: "North" },
    { value: "NCR", key: "NCR" },
    { value: "SPECIAL", key: "Special" },
    { value: "ROI", key: "ROI" },
    { value: "OTHER", key: "Other" },
  ];

  useEffect(() => {
    if (PostViewOrderDetailsData.status == 200) {
      if (ZoneValue == "OTHER") {
        setTotalOrderEnable(true);
        if (PostViewOrderDetailsData?.data[0]?.base_price != BasePriceValue) {
          setTotalAmountValue(
            PostAdminOrderPaymentCalReducerData?.data?.total_price
          );
        }
      } else {
        setTotalAmountValue(
          PostAdminOrderPaymentCalReducerData?.data?.total_price
        );
        setBasePriceValue(
          PostAdminOrderPaymentCalReducerData?.data?.base_price
        );
        setTotalOrderEnable(false);
      }
    }
  }, [
    ZoneValue,
    PostViewOrderDetailsData,
    PostAdminOrderPaymentCalReducerData,
    BasePriceValue,
  ]);

  const ZoneType = (e) => {
    setZoneValue(e.target.value);
  };

  const BasePriceFun = (e) => {
    setBasePriceValue(Number(e.target.value));
  };

  useEffect(() => {
    if (pending && PostViewOrderDetailsData.status == 200) {
      let ViewOrderDetailsPayload = {
        product_order_id: pendingeditobjectdata.product_order_id,
      };

      let b2cpayload = {
        length: Number(
          PostViewOrderDetailsData?.data[0]?.length == null
            ? 0
            : PostViewOrderDetailsData?.data[0]?.length
        ),
        breadth: Number(
          PostViewOrderDetailsData?.data[0]?.breadth == null
            ? 0
            : PostViewOrderDetailsData?.data[0]?.breadth
        ),
        height: Number(
          PostViewOrderDetailsData?.data[0]?.height == null
            ? 0
            : PostViewOrderDetailsData?.data[0]?.height
        ),
      };
      let PayloadData = {
        product_type: PostViewOrderDetailsData?.data[0]?.product_type,
        delivery_type: PostViewOrderDetailsData?.data[0]?.delivery_type,
        // weight: Number(PostViewOrderDetailsData?.data[0]?.weight),
        weight:
          Number(Weight) == Number(PostViewOrderDetailsData?.data[0]?.weight)
            ? Number(PostViewOrderDetailsData?.data[0]?.weight)
            : Number(Weight),
        pack_shipment: PostViewOrderDetailsData?.data[0]?.pack_shipment,

        length:
          Number(Length) == Number(PostViewOrderDetailsData?.data[0]?.length)
            ? Number(PostViewOrderDetailsData?.data[0]?.length)
            : Number(Length),
        breadth:
          Number(Breadth) == Number(PostViewOrderDetailsData?.data[0]?.breadth)
            ? Number(PostViewOrderDetailsData?.data[0]?.breadth)
            : Number(Breadth),
        height:
          Number(Height) == Number(PostViewOrderDetailsData?.data[0]?.height)
            ? Number(PostViewOrderDetailsData?.data[0]?.height)
            : Number(Height),
        quantity: Number(PostViewOrderDetailsData?.data[0]?.quantity),
        packaging: PostViewOrderDetailsData?.data[0]?.packaging,
        pack_shipment: PostViewOrderDetailsData?.data[0]?.pack_shipment,
        insurance: PostViewOrderDetailsData?.data[0]?.insurance,
        product_price: Number(PostViewOrderDetailsData?.data[0]?.product_price),
        company_name:
          PostViewOrderDetailsData?.data[0]?.user_type == "B2B"
            ? PostViewOrderDetailsData?.data[0]?.company_name
            : null,
        zone: ZoneValue,
        method: PostViewOrderDetailsData?.data[0]?.method,
        base_price: ZoneValue != "OTHER" ? 0 : BasePriceValue,
      };
      let payloaddata = { ...PayloadData };
      if (ZoneValue == "OTHER") {
        if (
          BasePriceValue != PostViewOrderDetailsData?.data[0]?.base_price ||
          Length != PostViewOrderDetailsData?.data[0]?.length ||
          Breadth != PostViewOrderDetailsData?.data[0]?.breadth ||
          Height != PostViewOrderDetailsData?.data[0]?.height
        ) {
          dispatch(PostAdminOrderPaymentCal(PayloadData));
        } else {
          dispatch(PostViewOrderDetails(ViewOrderDetailsPayload));
        }
      } else if (ZoneValue != "OTHER") {
        if (
          ZoneValue != PostViewOrderDetailsData?.data[0]?.zone ||
          Length !== PostViewOrderDetailsData?.data[0]?.length ||
          Breadth !== PostViewOrderDetailsData?.data[0]?.breadth ||
          Height !== PostViewOrderDetailsData?.data[0]?.height ||
          Weight !== PostViewOrderDetailsData?.data[0]?.weight
        ) {
          dispatch(PostAdminOrderPaymentCal(PayloadData));
        } else if (
          ZoneValue == PostViewOrderDetailsData?.data[0]?.zone ||
          Length == PostViewOrderDetailsData?.data[0]?.length ||
          Breadth == PostViewOrderDetailsData?.data[0]?.breadth ||
          Height == PostViewOrderDetailsData?.data[0]?.height ||
          Weight == PostViewOrderDetailsData?.data[0]?.weight
        ) {
          setBasePriceValue(PostViewOrderDetailsData?.data[0]?.base_price);
          setTotalAmountValue(PostViewOrderDetailsData?.data[0]?.total_price);
        } else {
          dispatch(PostAdminOrderPaymentCal(PayloadData));
        }
        // else{
        //   setBasePriceValue(PostViewOrderDetailsData?.data[0]?.base_price)
        //   setTotalAmountValue(PostViewOrderDetailsData?.data[0]?.total_price);

        //   // dispatch(PostViewOrderDetails(ViewOrderDetailsPayload))
        // }
        // dispatch(PostAdminOrderPaymentCal(PayloadData));
      }
    }
  }, [ZoneValue, pending, BasePriceValue, Length, Breadth, Height, Weight]);

  useEffect(() => {
    let ViewOrderDetailsPayload = {
      product_order_id: pendingeditobjectdata.product_order_id,
    };

    if (ZoneValue == "OTHER") {
      dispatch(PostViewOrderDetails(ViewOrderDetailsPayload));
    }
  }, [ZoneValue]);
  const DeliveryBoyFilterFun = (e) => {
    let splitvalue = e.target.value.split(",")[0];
    setDeliveryBoyValue(splitvalue);
  };
  const DeliveryBoy = (e, item) => {
    setPayloadOrderId(item);
    let splitvalue = e.target.value.split(",");
    setPayloadDeliveryBoyId(splitvalue);
    setDeliveryBoyPopup(true);
  };
  const TrackLocation = (e, item) => {
    setTrackingOrderId(item?.product_order_id);
    setTrackLocationActionPopup(true);
  };
  const ConformTrackingLocationFun = (e) => {
    const payload = {
      date_time: locationdate,
      remark: remarkvalue,
      location: locationvalue,
      product_order_id: trackingorderid,
    };
    if (remarkvalue?.length < 2) {
      setReasonActionInputFieldError(true);
    }
    if (locationdate == "" || remarkvalue == "" || locationvalue == "") {
      toast.warn("Please Fill All Fields");
    } else {
      dispatch(PostTrackLocationDetails(payload));
      setTrackLocationActionPopup(false);
      setRemarkData("");
      setLocationValue("");
      setLocationDate("");
      setReasonActionInputFieldData("");
    }
  };

  const SavedDeliveryBoyFun = (payloadorderid, payloaddeliveryboyid) => {
    let payload = {
      product_order_id: payloadorderid.product_order_id,
      delivery_boy_id: payloaddeliveryboyid[0],
    };
    dispatch(PostAssignDeliveryBoyPartner(payload));
    setDeliveryBoyPopup(false);
  };

  const DeliveryBoyPopupFun = () => {
    setDeliveryBoyPopup(false);
    setPayloadOrderId("");
  };

  const pandingTabRoutFun = () => {
    navigate("#pending");
    window.location.reload(false);
    setFilterShowHideBtn(false);
    setShippingPartnerValue("");
  };

  const ReadyToPickupTabRoutFun = () => {
    navigate("#ready_for_pickup");
    setDeliveryBoyValue("");
  };

  const pickupTabRoutFun = () => {
    navigate("#picked_up");
    setDeliveryBoyValue("");
  };
  const ReceivedAtHubTabRoutFun = () => {
    navigate("#received_at_hub");
    setDeliveryBoyValue("");
  };

  const BookedTabRoutFun = () => {
    navigate("#booked");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const TransitTabRoutFun = () => {
    navigate("#transit");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const DeliveredTabRoutFun = () => {
    navigate("#delivered");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const ReturnsTabRoutFun = () => {
    navigate("#return");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const RtoDeliveredTabRoutFun = () => {
    navigate("#rto_delivered");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const CancelTabRoutFun = () => {
    navigate("#cancel");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  const OutForDeliveryTabRoutFun = () => {
    navigate("#OUT_FOR_DELIVERY");
    setDeliveryBoyValue("");
    setShippingPartnerValue("");
  };

  let tabData = [
    {
      name: "Pending",
      pandingtab: pandingtab,
      id: "pending-tab",
      target: "#pending-tab-pane",
      controls: "pending-tab-pane",
      tabRoutFun: pandingTabRoutFun,
      PermissionData: "AlwaysAllow",
      permissionCheck: "AlwaysAllow",
    },
    {
      name: "Ready To Pickup",
      pandingtab: readyforpickuptab,
      id: "readyforpickup-tab",
      target: "#readyforpickup-tab-pane",
      controls: "readyforpickup-tab-pane",
      tabRoutFun: ReadyToPickupTabRoutFun,
      PermissionData: PermissionData()?.VIEW_ORDER_READY_TO_PICKUP_PAGE,
      permissionCheck: "VIEW_ORDER_READY_TO_PICKUP_PAGE",
    },
    {
      name: "Picked Up",
      PermissionData: PermissionData()?.VIEW_ORDER_PICKUP_PAGE,
      permissionCheck: "VIEW_ORDER_PICKUP_PAGE",
      pandingtab: pickuptab,
      id: "pickup-tab",
      target: "#pickup-tab-pane",
      controls: "pickup-tab-pane",
      tabRoutFun: pickupTabRoutFun,
    },
    {
      name: "Received At Hub",
      PermissionData: PermissionData()?.VIEW_ORDER_RECIEVED_AT_HUB_PAGE,
      permissionCheck: "VIEW_ORDER_RECIEVED_AT_HUB_PAGE",
      pandingtab: receivedathubtab,
      id: "receivedathub-tab",
      target: "#receivedathub-tab-pane",
      controls: "receivedathub-tab-pane",
      tabRoutFun: ReceivedAtHubTabRoutFun,
    },
    {
      name: "Booked",
      PermissionData: PermissionData()?.VIEW_ORDER_BOOKED_PAGE,
      permissionCheck: "VIEW_ORDER_BOOKED_PAGE",
      pandingtab: booktab,
      id: "booked-tab",
      target: "#booked-tab-pane",
      controls: "booked-tab-pane",
      tabRoutFun: BookedTabRoutFun,
    },
    {
      name: "In-Transit",
      PermissionData: PermissionData()?.VIEW_ORDER_INTRANSIT_PAGE,
      permissionCheck: "VIEW_ORDER_INTRANSIT_PAGE",
      pandingtab: transittab,
      id: "transit-tab",
      target: "#transit-tab-pane",
      controls: "transit-tab-pane",
      tabRoutFun: TransitTabRoutFun,
    },
    {
      name: " Out-For-Delivery",
      PermissionData: PermissionData()?.VIEW_ORDER_OUT_FOR_DELIVERED_PAGE,
      permissionCheck: "VIEW_ORDER_OUT_FOR_DELIVERED_PAGE",
      pandingtab: outfordeliverytab,
      id: "outfordelivery-tab",
      target: "#outfordelivery-tab-pane",
      controls: "outfordelivery-tab-pane",
      tabRoutFun: OutForDeliveryTabRoutFun,
    },
    {
      name: "Delivered",
      PermissionData: PermissionData()?.VIEW_ORDER_DELIVERED_PAGE,
      permissionCheck: "VIEW_ORDER_DELIVERED_PAGE",
      pandingtab: deliveredtab,
      id: "delivered-tab",
      target: "#delivered-tab-pane",
      controls: "delivered-tab-pane",
      tabRoutFun: DeliveredTabRoutFun,
    },
    {
      name: "  RTO",
      PermissionData: PermissionData()?.VIEW_ORDER_RTO_PAGE,
      permissionCheck: "VIEW_ORDER_RTO_PAGE",
      pandingtab: returntab,
      id: "returns-tab",
      target: "#returns-tab-pane",
      controls: "returns-tab-pane",
      tabRoutFun: ReturnsTabRoutFun,
    },
    {
      name: "RTO Delivered",
      PermissionData: PermissionData()?.VIEW_ORDER_RTO_DELIVERED_PAGE,
      permissionCheck: "VIEW_ORDER_RTO_DELIVERED_PAGE",
      pandingtab: returndeliveredtab,
      id: "rto-delivered-tab",
      target: "#rto-delivered-tab-pane",
      controls: "rto-delivered-tab-pane",
      tabRoutFun: RtoDeliveredTabRoutFun,
    },
    {
      name: "Cancelled Orders",
      PermissionData: PermissionData()?.VIEW_ORDER_CANCEL_PAGE,
      permissionCheck: "VIEW_ORDER_CANCEL_PAGE",
      pandingtab: canceltab,
      id: "cancel-tab",
      target: "#cancel-tab-pane",
      controls: "cancel-tab-pane",
      tabRoutFun: CancelTabRoutFun,
    },
  ];
  const partnerOptions = [
    ...(GetAdminSettingDeliveryPartnerData?.data || [])?.map((option) => ({
      value: option?.partner_name,
      label: option?.partner_name,
    })),
  ];
  const itemsPerPage = 4;
  const [items, setItems] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  // Simulated data source (replace with your actual data source).
  useEffect(() => {
    // Simulating data fetching (replace with your actual data source).
    let datacount = adminorderpendingdata?.length + 1;
    console.log("sacgggjsh", datacount);
    const data = [...Array(datacount).keys()];
    setItems(data);

    // Calculate the initial items to display.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, adminorderpendingdata]);

  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage;
    setItemOffset(newOffset);
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
                    <span className="search-icon pt-1">
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
                {PermissionData()?.VIEW_ORDER_CREATE_PAGE ==
                "VIEW_ORDER_CREATE_PAGE" ? (
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
                ) : (
                  ""
                )}

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
                  <button
                    className={`${filteractive ? "bg-warning btn" : " btn"} `}
                    onClick={(e) =>
                      PermissionData()?.APPLY_ORDER_FILTER ==
                      "APPLY_ORDER_FILTER"
                        ? `${setFilterShowHideBtn(
                            (o) => !o
                          )} ${e.preventDefault()}`
                        : e.preventDefault()
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

                  <div
                    className={`filter-body  ${
                      filtershowhidebtn ? "BlockFilterFromOrderPage " : "d-none"
                    } `}
                  >
                    <button
                      type="reset"
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
                            onChange={(e) =>
                              PaymentStatusFun(
                                !PaymentStatusTrueFalse ? "COD" : "noCOD"
                              )
                            }
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>

                    {param.hash !== "#pending" && param.hash !== "#cancel" ? (
                      <div className={`${!codcheckBox ? "order_status" : ""}`}>
                        <h5>
                          Status <span>(If payment mode is COD)</span>{" "}
                        </h5>
                        <div className="statusbtn-group">
                          <button
                            type="button"
                            className={`btn ${
                              pendingpartner ? "btn-active" : ""
                            } 
                                              ${
                                                tabfilteravailable ==
                                                  "#return" ||
                                                tabfilteravailable ==
                                                  "#rto_delivered" ||
                                                tabfilteravailable ==
                                                  "#delivered" ||
                                                tabfilteravailable == "#cancel"
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
                            className={`btn ${
                              recievedpartner ? "btn-active" : ""
                            }
                                              ${
                                                tabfilteravailable ==
                                                  "#ready_for_pickup" ||
                                                tabfilteravailable ==
                                                  "#picked_up" ||
                                                tabfilteravailable ==
                                                  "#received_at_hub" ||
                                                tabfilteravailable ==
                                                  "#booked" ||
                                                tabfilteravailable ==
                                                  "#transit" ||
                                                tabfilteravailable ==
                                                  "#OUT_FOR_DELIVERY" ||
                                                tabfilteravailable ==
                                                  "#return" ||
                                                tabfilteravailable ==
                                                  "#rto_delivered" ||
                                                tabfilteravailable == "#cancel"
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
                                                  "#ready_for_pickup" ||
                                                tabfilteravailable ==
                                                  "#picked_up" ||
                                                tabfilteravailable ==
                                                  "#received_at_hub" ||
                                                tabfilteravailable ==
                                                  "#booked" ||
                                                tabfilteravailable ==
                                                  "#transit" ||
                                                tabfilteravailable ==
                                                  "#OUT_FOR_DELIVERY" ||
                                                tabfilteravailable ==
                                                  "#return" ||
                                                tabfilteravailable ==
                                                  "#rto_delivered" ||
                                                tabfilteravailable ==
                                                  "#delivered" ||
                                                tabfilteravailable == "#cancel"
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
                    ) : (
                      ""
                    )}

                    {(param.hash !== "#ready_for_pickup" &&
                      param.hash !== "#picked_up" &&
                      param.hash !== "#received_at_hub") ||
                    Is_delivery_boy == "true" ? (
                      ""
                    ) : (
                      <h5 className="mp-3">Delivery Boy Partner</h5>
                    )}
                    {(param.hash !== "#ready_for_pickup" &&
                      param.hash !== "#picked_up" &&
                      param.hash !== "#received_at_hub") ||
                    Is_delivery_boy == "true" ? (
                      ""
                    ) : (
                      <div className="express-box">
                        <select
                          className="form-select"
                          onChange={(e) => DeliveryBoyFilterFun(e)}
                        >
                          <option
                            value=""
                            selected={deliveryboyvalue == "" ? "selected" : ""}
                          >
                            Select Delivery Boy Name...
                          </option>
                          {GetSettingDeliveryboyInfoData?.data?.delivery_boy_info?.map(
                            (item, id) => {
                              return (
                                <option
                                  selected={item?.name == item.delivery_boy_id}
                                  value={[
                                    item.delivery_boy_id,
                                    item?.email,
                                    item?.name,
                                  ]}
                                >
                                  {item?.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </div>
                    )}
                    {param.hash !== "#cancel" &&
                    param.hash !== "#pending" &&
                    param.hash !== "#ready_for_pickup" &&
                    param.hash !== "#picked_up" &&
                    param.hash !== "#received_at_hub" ? (
                      <h5 className="mp-3">Shipping Partner</h5>
                    ) : (
                      ""
                    )}
                    {param.hash !== "#cancel" &&
                    param.hash !== "#pending" &&
                    param.hash !== "#ready_for_pickup" &&
                    param.hash !== "#picked_up" &&
                    param.hash !== "#received_at_hub" ? (
                      <div className="express-box">
                        <select
                          className="form-select"
                          onChange={(e) =>
                            setShippingPartnerValue(e.target.value)
                          }
                        >
                          <option
                            value=""
                            selected={
                              shippingpartnervalue == "" ? "selected" : ""
                            }
                          >
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
                    ) : (
                      ""
                    )}

                    {param.hash === "#cancel" ||
                    Is_delivery_boy == "true" ||
                    B2BPartner == "true" ? (
                      ""
                    ) : (
                      <h5 className="pt-4 pb-3"> Customer Type</h5>
                    )}
                    {param.hash === "#cancel" ||
                    Is_delivery_boy == "true" ||
                    B2BPartner == "true" ? (
                      ""
                    ) : (
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
                    )}
                    <div className="filterbtn-group">
                      <div className="row">
                        <div className="col-6">
                          <input
                            type="reset"
                            value="Reset"
                            className="btn btn-cancel"
                            onClick={(e) => {
                              FilterShowHideBtnFun();
                            }}
                          />
                          {/* Cancel */}
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
              {/* tab buttons */}

              <ul className="nav nav-tabs orderTab " id="myTab" role="tablist">
                {tabData?.map((items, id) => {
                  return (
                    <TabButton
                      name={items.name}
                      pandingtab={items.pandingtab}
                      id={items.id}
                      target={items.target}
                      controls={items.controls}
                      tabRoutFun={items.tabRoutFun}
                      PermissionData={items.PermissionData}
                      permissionCheck={items.permissionCheck}
                    />
                  );
                })}
              </ul>

              <div className="tab-content" id="myTabContent">
                {/* {pending} */}

                <PendingTab
                  classNameProp={`tab-pane pending-tabpane fade   ${
                    pandingtab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${pandingtab ? "0" : "-1"}`}
                  permission={PermissionData()}
                  adminorderpendingdataProp={adminorderpendingdata}
                  DeletePending={DeletePending}
                  IntransitFun={IntransitFun}
                  DeliveryBoy={DeliveryBoy}
                  payloadorderidProp={payloadorderid}
                  payloaddeliveryboyidProp={payloaddeliveryboyid}
                  GetSettingDeliveryboyInfoDataProp={
                    GetSettingDeliveryboyInfoData
                  }
                  handlePageClick={handlePageClick}
                  ReactPaginate={ReactPaginate}
                  currentItems={currentItems}
                  pageCount={pageCount}
                  items={items}
                />

                {/* ready to pickup */}

                {param.hash === "#ready_for_pickup" && (
                  <ReadyToPickup
                    Accesspage={"#ready_for_pickup"}
                    classNameProp={`tab-pane fade ${
                      readyforpickuptab ? "show active" : "-1"
                    }`}
                    tabindexProp={`${readyforpickuptab ? "0" : "-1"}`}
                    Is_delivery_boy={Is_delivery_boy}
                    PermissionData={PermissionData()}
                    adminorderreadyforpickupdata={adminorderreadyforpickupdata}
                    IntransitFun={IntransitFun}
                    showAddressFun={showAddressFun}
                    activeButton={activeButton}
                    PickupTrack={PickupTrack}
                  />
                )}

                {/* pickup */}

                {param.hash == "#picked_up" && (
                  <ReadyToPickup
                    Accesspage={"#picked_up"}
                    classNamePro={`tab-pane fade ${
                      pickuptab ? "show active" : "-1"
                    }`}
                    tabindexProp={`${pickuptab ? "0" : "-1"}`}
                    Is_delivery_boy={Is_delivery_boy}
                    PermissionData={PermissionData()}
                    adminorderpickupdata={adminorderpickupdata}
                    IntransitFun={IntransitFun}
                    showAddressFun={showAddressFun}
                    activeButton={activeButton}
                    ReceivedAtHubTrack={ReceivedAtHubTrack}
                  />
                )}

                {/* received at hub */}

                <ReceivedAtHub
                  classNameProp={`tab-pane fade ${
                    receivedathubtab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${receivedathubtab ? "0" : "-1"}`}
                  PermissionData={PermissionData()}
                  adminorderreceivedathubdata={adminorderreceivedathubdata}
                  IntransitFun={IntransitFun}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                  ActionCorrectFun={ActionCorrectFun}
                />

                {/* {booked} */}

                <Booked
                  classNameProp={`tab-pane fade ${
                    booktab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${booktab ? "0" : "-1"}`}
                  PermissionData={PermissionData()}
                  adminorderbookeddata={adminorderbookeddata}
                  IntransitFun={IntransitFun}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                  TransitTrack={TransitTrack}
                />

                {/* in-transit start */}

                <InTransit
                  classNameProp={`tab-pane fade ${
                    transittab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${transittab ? "0" : "-1"}`}
                  B2BPartner={B2BPartner}
                  PermissionData={PermissionData()}
                  adminorderintransitDate={adminorderintransitDate}
                  IntransitFun={IntransitFun}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                  DeliveredTrack={DeliveredTrack}
                  dots={dots} //image
                  TrackLocation={TrackLocation}
                />

                {/* {OUt For Deliviry} */}

                <OutForDelivery
                  classNameProp={`tab-pane fade ${
                    outfordeliverytab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${outfordeliverytab ? "0" : "-1"}`}
                  B2BPartner={B2BPartner}
                  PermissionData={PermissionData()}
                  adminoutfordeliveryData={adminoutfordeliveryData}
                  IntransitFun={IntransitFun}
                  OutForDevliveryActionFun={OutForDevliveryActionFun}
                  reasonActionValue={reasonActionValue}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                  DeliveredTrack={DeliveredTrack}
                  dots={dots} //image
                  TrackLocation={TrackLocation}
                />

                {/* {Delivered} */}

                <Delivered
                  classNameProp={`tab-pane fade ${
                    deliveredtab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${deliveredtab ? "0" : "-1"}`}
                  B2BPartner={B2BPartner}
                  PermissionData={PermissionData()}
                  adminorderdeliveredData={adminorderdeliveredData}
                  IntransitFun={IntransitFun}
                />

                {/* {return} */}

                <RTO
                  classNameProp={`tab-pane fade ${
                    returntab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${returntab ? "0" : "-1"}`}
                  B2BPartner={B2BPartner}
                  PermissionData={PermissionData()}
                  adminorderreturnData={adminorderreturnData}
                  IntransitFun={IntransitFun}
                  OutForDevliveryActionFun={OutForDevliveryActionFun}
                  reasonActionValue={reasonActionValue}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                  ReturnDeliveredTrack={ReturnDeliveredTrack}
                  dots={dots} //image
                  TrackLocation={TrackLocation}
                />

                {/* return delivered */}

                <RTODelivered
                  classNameProp={`tab-pane fade ${
                    returndeliveredtab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${returndeliveredtab ? "0" : "-1"}`}
                  B2BPartner={B2BPartner}
                  PermissionData={PermissionData()}
                  adminorderrtodeliveredData={adminorderrtodeliveredData}
                  IntransitFun={IntransitFun}
                  showAddressFun={showAddressFun}
                  activeButton={activeButton}
                />

                {/* {cancel} */}

                <Cancel
                  classNameProp={`tab-pane fade ${
                    canceltab ? "show active" : "-1"
                  }`}
                  tabindexProp={`${canceltab ? "0" : "-1"}`}
                  PermissionData={PermissionData()}
                  adminordercancelData={adminordercancelData}
                  IntransitFun={IntransitFun}
                  RebookFun={RebookFun}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {tracklocationactionpopup && (
        <div className="popupouter tracking-popup">
          <div className="popupinner">
            <h2>Tracking Order</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => {
                setTrackLocationActionPopup((o) => !o);
                setRemarkData("");
                setLocationValue("");
                setLocationDate("");
                setReasonActionInputFieldData("");
              }}
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
              <div className="col-sm-12">
                <label>Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="01/09/2022"
                  value={locationdate}
                  onChange={(e) => expect(e)}
                  min={minDate}
                />
              </div>
              <div className="col-sm-12">
                <label>Location</label>
                <input
                  className="form-control check-box"
                  type="text"
                  value={locationvalue}
                  onChange={(e) => setLocationValue(e.target.value)}
                  placeholder={"Enter Location"}
                />
              </div>
              <div className="col-sm-12">
                <label>Remark</label>
                <textarea
                  className="w-100 p-2"
                  rows="5"
                  cols="70"
                  maxlength="200"
                  placeholder="Add the Remark"
                  value={remarkvalue}
                  onChange={(e) => ReasonTextFun(e)}
                />
                {ReasonActionInputFieldError && (
                  <span className="text-danger">
                    <small>Enter your Reason </small>
                  </span>
                )}
              </div>

              <div className="btngroups">
                <button
                  type="button"
                  className="save-btn"
                  onClick={(e) => ConformTrackingLocationFun(e)}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={(e) => {
                    setTrackLocationActionPopup(false);
                    setRemarkData("");
                    setLocationValue("");
                    setLocationDate("");
                    setReasonActionInputFieldData("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* {deliveryboypopup && <PopupComponent
      DeliveryBoyPopupFun={DeliveryBoyPopupFun}
      confirmationimg={confirmationimg}
      payloaddeliveryboyid={payloaddeliveryboyid}
      SavedDeliveryBoyFun={SavedDeliveryBoyFun}
      payloadorderid={payloadorderid}  
      >
         <>
              <div className="">
                <img src={confirmationimg} alt="img" />
              </div>
              <div className="popup-body">
                <h2>Are you sure you want to select this delivery boy</h2>
                <p>
                  {" "}
                  <b> Delivery Boy Name:</b> {payloaddeliveryboyid[2]}{" "}
                </p>
                <p>
                  {" "}
                  <b>Delivery Boy Email:</b> {payloaddeliveryboyid[1]}{" "}
                </p>

                

                <p className="my-3">
                  {" "}
                  <b> Do You Want To Confirm? </b>{" "}
                </p>

              </div>
            </>
         
        </PopupComponent>
      } */}
      {deliveryboypopup && (
        <div className="popupouter deliveryaction-popup">
          <div className="popupinner">
            <div
              className="close-btn"
              type="button"
              onClick={(e) => DeliveryBoyPopupFun(e)}
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

            <div className="">
              <img src={confirmationimg} alt="img" />
            </div>
            <div className="popup-body">
              <h2>Are you sure you want to select this delivery boy</h2>
              <p>
                {" "}
                <b> Delivery Boy Name:</b> {payloaddeliveryboyid[2]}{" "}
              </p>
              <p>
                {" "}
                <b>Delivery Boy Email:</b> {payloaddeliveryboyid[1]}{" "}
              </p>

              <p className="my-3">
                {" "}
                <b> Do You Want To Confirm? </b>{" "}
              </p>
              <div className="btngroups">
                <button
                  type="button"
                  className="save-btn"
                  onClick={(e) =>
                    SavedDeliveryBoyFun(payloadorderid, payloaddeliveryboyid)
                  }
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={(e) => DeliveryBoyPopupFun(e)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {receivedathubpopup && (
        <div className="popupouter">
          <div className="editb2b-box">
            <h2>Received At Hub Action</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => receivedathubFun()}
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
                <div className="express-box">
                  <Select
                    value={selectedPartnerIdOption}
                    onChange={setselectedPartnerIdOption}
                    options={partnerOptions}
                    // filterOption={customFilter}
                    // isClearable={true}
                    placeholder="Select Partner Name ..."
                    // onInputChange={SearchFilterPathFun}
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
                        primary: "#FFDC5A",
                      },
                    })}
                  />
                </div>
                {!partnernameactive && !selectedPartnerIdOption ? (
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
                  // type="date"
                  className="form-control input_filed_block"
                  disabled
                  placeholder="01/09/2022"
                  value={new Date(
                    pendingeditobjectdata?.order_date
                  )?.toLocaleDateString()}
                  min={minDate}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Expected Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  placeholder="01/09/2022"
                  value={expecteddeliverydate}
                  onChange={(e) => expect(e)}
                  min={minDate}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Order ID</label>
                <input
                  type="text"
                  className="form-control input_filed_block"
                  disabled
                  placeholder="128924833"
                  value={pendingeditobjectdata?.product_order_id}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control input_filed_block"
                  disabled
                  placeholder="Name"
                  value={pendingeditobjectdata?.name}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Zone</label>
                <select
                  className={`form-control`}
                  onChange={(e) => ZoneType(e)}
                >
                  <option value="none" selected disabled hidden>
                    Select Zone
                  </option>
                  {ZoneArray?.map((item, id) => {
                    return (
                      <option
                        selected={item.value == ZoneValue}
                        value={item.value}
                      >
                        {item.key}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-6 mt-3">
                <label>Weight</label>
                <div className="pacform-box mt-1">
                  <input
                    type="text"
                    value={Weight}
                    className="form-control"
                    onChange={(e) => setWeight(e.target.value)}
                    // className={`${TotalOrderEnable != true
                    //   ? "form-control"
                    //   : "form-control input_filed_block"
                    // } `}

                    // onChange={(e) =>TotalOrderEnable != true ? setWeight(e.target.value):""}
                  />
                  <span> g</span>
                </div>
              </div>
              {UserTypeData == "B2C" ? (
                ""
              ) : (
                <div className="col-6 mt-3">
                  <label>Length</label>
                  <div className="pacform-box">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        UserTypeData != "B2C" ? setLength(e.target.value) : ""
                      }
                      value={Length}
                    />
                    <span> CM</span>
                  </div>
                </div>
              )}
              {UserTypeData == "B2C" ? (
                ""
              ) : (
                <div className="col-6 mt-3">
                  <label>Breadth</label>
                  <div className="pacform-box">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        UserTypeData != "B2C" ? setBreadth(e.target.value) : ""
                      }
                      value={Breadth}
                    />
                    <span> CM</span>
                  </div>
                </div>
              )}
              {UserTypeData == "B2C" ? (
                ""
              ) : (
                <div className="col-6 mt-3">
                  <label>Height</label>
                  <div className="pacform-box">
                    <input
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        UserTypeData != "B2C" ? setHeight(e.target.value) : ""
                      }
                      value={Height}
                    />
                    <span> CM</span>
                  </div>
                </div>
              )}
              <div className="col-sm-6 mt-3">
                <label>Total Amount</label>
                <input
                  type="text"
                  className={` form-control input_filed_block"   `}
                  placeholder="Please enter your amount"
                  value={TotalAmountValue}
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Base Price</label>
                <input
                  type="text"
                  className={`${
                    TotalOrderEnable == true
                      ? "  form-control"
                      : "form-control input_filed_block"
                  } `}
                  placeholder="Please enter your amount"
                  value={BasePriceValue}
                  onChange={(e) =>
                    TotalOrderEnable == true ? BasePriceFun(e) : ""
                  }
                />
              </div>
              <div className="col-sm-6 mt-3">
                <label>Method</label>
                <input
                  type="text"
                  className="form-control input_filed_block "
                  disabled
                  placeholder="Electrical"
                  value={pendingeditobjectdata?.method}
                />
              </div>
              <div className="col-6 mt-3">
                <label>Product Type</label>
                <input
                  type="text"
                  className="form-control input_filed_block"
                  disabled
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
                  onClick={(e) => receivedathubFun()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {reasonActionPopup && (
        <div className="popupouter">
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
                  placeholder="reason"
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
        <div className="popupouter">
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
          <div
            className={`popupinner  walletpaymement_inner ${
              wallettab ? "active" : ""
            }`}
          >
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
            <h2>Select Your Payment Mode</h2>
            <p>Total Amount To Pay Rs. {ReebookObjectDetails?.amount}</p>
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
                        {GetWalletBalanceData?.data?.b2b_balance_status ==
                        "NEGATIVE"
                          ? `-${GetWalletBalanceData?.data?.b2b_balance}`
                          : GetWalletBalanceData?.data?.b2b_balance}
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

      <Popup open={walletpaypopup} position="" model className="sign_up_loader">
        <div className="wallet-popup">
          <div className="popupinner">
            <h4
              className="text-danger calender_popup_cancel"
              onClick={(e) => {
                setWalletPayPopup(false);
                setPaymentMethodPopup(true);
                // setPickUpPopup(false);
                // setCustomCheckBox(false);
                // navigate("#cancel");
                // navigate("/admin/ordersummary");
              }}
            >
              {" "}
              X{" "}
            </h4>
            {/* ReebookObjectDetails?.amount */}
            <h2>Recharge your wallet</h2>
            <p>
              Current Wallet Amount{" "}
              <b>{GetWalletBalanceData?.data?.b2b_balance}/-</b>
            </p>
            <div className="popup-body">
              <div className="amout">
                <p>Enter Amount in multiples of 100 below</p>
                <div className="">
                  <p>Rs.</p>
                  <input
                    type="number"
                    className="form-control"
                    value={calculatedamount}
                    placeholder="500"
                  />
                  <span>
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
                        d="M0.364324 0.0337138C0.166958 0.0965594 -0.00147244 0.347004 1.20969e-05 0.575441C0.0014185 0.791715 0.0178524 0.809816 2.15557 2.94899L4.2052 5L2.15557 7.05101C0.0178524 9.19018 0.0014185 9.20828 1.20969e-05 9.42456C-0.00204543 9.74137 0.258635 10.002 0.575441 9.99999C0.791715 9.99858 0.809816 9.98215 2.94899 7.84443L5 5.7948L7.05101 7.84443C9.19018 9.98215 9.20828 9.99858 9.42456 9.99999C9.74137 10.002 10.002 9.74137 9.99999 9.42456C9.99858 9.20828 9.98215 9.19018 7.84443 7.05101L5.7948 5L7.84443 2.94899C9.98215 0.809816 9.99858 0.791715 9.99999 0.575441C10.002 0.258635 9.74137 -0.00204543 9.42456 1.20969e-05C9.20828 0.0014185 9.19018 0.0178524 7.05101 2.15557L5 4.2052L2.94899 2.15557C1.36511 0.572785 0.871282 0.0939549 0.780777 0.0532732C0.652637 -0.0043374 0.505485 -0.0112652 0.364324 0.0337138Z"
                        fill="#858585"
                      />
                    </svg>
                  </span>
                </div>
                <span>Min. value Rs.100</span>
              </div>
              <div className="row recharge">
                <div className="col-6">
                  <p>Recharge Amount</p>
                </div>
                <div className="col-6  text-end">
                  <p>Rs. {calculatedamount}</p>
                </div>
                <hr />
                <div className="col-6 ">
                  <p className="mb-3 dark-text">Recharge Amount</p>
                </div>
                <div className="col-6 dark-text text-end">
                  <p className="mb-3">Rs. {calculatedamount}</p>
                </div>
              </div>
              <button
                type="button"
                className="btn pr-pay"
                onClick={(e) => ProceedToPayFun()}
              >
                Proceed To Pay{" "}
              </button>
            </div>
          </div>
        </div>
      </Popup>

      <LodingSpiner loadspiner={loadspiner} />
      <LodingSpiner loadspiner={OrderPagesLoaderTrueFalseData} />
    </>
  );
};
export default Order;
