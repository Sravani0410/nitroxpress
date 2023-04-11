import React, { useEffect, useLayoutEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import Axios from "axios";
import {
  GetDeliveryPriceDetail,
  PostOrderDownloadInvoiceFile,
  PostOrderDownloadLabelGenerationFile,
  PostViewAdminOrder,
  GetWalletBalance,
  PostAdminOrderPaymentCal,
  PostDebitBalance,
  PostWalletAddMoney,
  PaymentPopupValue,
  PostAdminOrderAddShipment,
} from "../../Redux/action/ApiCollection";
import LodingSpiner from "../../Components/LodingSpiner";

import Popup from "reactjs-popup";

const OrderPayment = () => {
  const [paymentmethod, setPaymentMethod] = useState("");
  const [pickuppopup, setPickUpPopup] = useState(false);
  const [wallettab, setWalletTab] = useState("");
  const [onlinetab, setOnlineTab] = useState("")

  const [customcheckbox, setCustomCheckBox] = useState(false);
  const [paymentmethodpopup, setPaymentMethodPopup] = useState(true);
  const [walletpaypopup, setWalletPayPopup] = useState(false);

  const [activepaymentwallet, setActivePaymentWallet] = useState(false);
  const [activepaymentrazorpay, setActivePaymentRazorPay] = useState(false);
  const [calculatedamount, setCalculatedAmount] = useState(false);

  const [responcedetails, setResponceDetail] = useState(false);

  const [amountlessthenwalletpaypopup, setAmountLessThenWalletPayPopup] =
    useState(false);

  const [loadspiner, setLoadSpiner] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const PostViewAdminOrderData = useSelector(
    (state) => state.PostViewAdminOrderReducer?.PostViewAdminOrderData
  );
  const GetWalletBalanceData = useSelector(
    (state) => state.GetWalletBalanceReducer?.GetWalletBalanceData
  );
  const PostAdminOrderPaymentCalData = useSelector(
    (state) =>
      state.PostAdminOrderPaymentCalReducer?.PostAdminOrderPaymentCalData
  );

  const PostDebitBalanceData = useSelector(
    (state) =>
      state.PostDebitBalanceReducer?.PostDebitBalanceData
  );
  

  
  const PostAdminOrderAddShipmentData = useSelector(
    (state) =>
      state.PostAdminOrderAddShipmentReducer?.PostAdminOrderAddShipmentData
  );

  console.log(GetWalletBalanceData, "PostDebitBalanceData");
  // let BearerToken = reactLocalStorage.get("token", false);

  let totalPriceValue = reactLocalStorage.get('totalPriceValue', false)

  useEffect(() => {
   
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId);
    const PaymentMethod = reactLocalStorage.get("PaymentMethod", false);
    setPaymentMethod(PaymentMethod);

    // dispatch(
    //   PostViewAdminOrder({
    //     product_order_id: OrderDetailsIdData?.product_order_id,
    //   })
    // );
  }, []);



  useEffect(() => {

    if (
      paymentmethod == "online" &&
      totalPriceValue
    ) {
      PaymentFun();
    }
  }, [totalPriceValue]);

  const handlePaymentSuccess = async (response) => {
    console.log("response3", response);
    setLoadSpiner((o) => !o);
    let BearerToken = reactLocalStorage.get("token", false);

    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId);
    let product_order_idString = OrderDetailsIdData?.product_order_id.toString();
    let InvoicePayLoad = {
      product_order_id: product_order_idString,
      request_type: "create",
    };

    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      console.log("bodyDatabodyData", bodyData)

      await Axios({
        url: `${process.env.REACT_APP_BASE_URL}/payment/status`,
        method: "POST",
        data: bodyData,
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log(res);
          setLoadSpiner((o) => !o);
          reactLocalStorage.remove('UserDetailsPayload');
          reactLocalStorage.remove("Eway_bill_URL");
          reactLocalStorage.remove("PayloadOrderData");
          reactLocalStorage.remove("Eway_bill_id"); 
          toast.success(res.data.message); 
          navigate("/admin/order#pending"); 
          dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };


  // this will load a script tag which will open up Razorpay payment card to make //transactions

  // const handlePaymentSuccess = async (response) => {
  //   console.log("response3", response);
  //   setLoadSpiner((o) => !o);
  //   let BearerToken = reactLocalStorage.get("token", false);

  //   let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
  //   let OrderDetailsIdData = JSON.parse(OrderDetailsId);
  //   let product_order_idString = OrderDetailsIdData?.product_order_id.toString();
  //   let InvoicePayLoad = {
  //     product_order_id: product_order_idString,
  //     request_type: "create",
  //   };

  //   try {
  //     let bodyData = new FormData();

  //     // we will send the response we've got from razorpay to the backend to validate the payment
  //     bodyData.append("response", JSON.stringify(response));

  //     console.log("bodyDatabodyData", bodyData)

  //     await Axios({
  //       url: `${process.env.REACT_APP_BASE_URL}/payment/status`,
  //       method: "POST",
  //       data: bodyData,
  //       headers: {
  //         Authorization: `Bearer ${BearerToken}`,
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //         setLoadSpiner((o) => !o);
  //         toast.success(res.data.message);
  //         // reactLocalStorage.remove('PaymentMethod');
  //         navigate("/admin/order#pending");

  //         dispatch(PostOrderDownloadLabelGenerationFile(InvoicePayLoad));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } catch (error) {
  //     console.log(console.error());
  //   }
  // };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const PaymentFun = async () => {
    const res = await loadScript();

    let amount = totalPriceValue;
    let BearerToken = reactLocalStorage.get("token", false);

    let getShipmentId = reactLocalStorage.get("ShipmentId", false);
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    const ProductOrderId = reactLocalStorage.get("product_order_id", false);

    let dataa = JSON.parse(OrderDetailsId);
    console.log(dataa);
    let deliverdIdData = dataa?.deliverd_id;
    let pickupIdData = dataa?.pickup_id;


    let bodyContent = JSON.stringify({
      amount: Number(amount),
      shipment_details_id: getShipmentId,
      delivered_address_id: deliverdIdData,
      pickup_address_id: pickupIdData,
      product_order_id: dataa.product_order_id,
    });

    const data = await Axios({
      url: `${process.env.REACT_APP_BASE_URL}/razorpay`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${BearerToken}`,
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      data: bodyContent,
    }).then((res) => {
      console.log(res);
      return res;
    });

    // // in data we will receive an object from the backend with the information about the payment
    // //that has been made by the user

    // var axios = require('axios');

    // var data = JSON.stringify({

    //   "amount": amount,

    //   "shipment_details_id": getShipmentId,

    //   "delivered_address_id": deliverdIdData,

    //   "pickup_address_id": pickupIdData,

    //   "product_order_id": dataa.product_order_id

    // });

    // console.log("datadatadata12",data)

    // var config = {
    //   method: 'post',
    //   url: `${process.env.REACT_APP_BASE_URL}/razorpay`,
    //   headers: {
    //     'Authorization': `Bearer ${BearerToken}`,
    //     'Content-Type': 'application/json'
    //   },
    //   data: data
    // };

    // axios(config)
    //   .then(function (response) {
    //     console.log("mhgzjhdhgjhv",JSON.stringify(response.data));
    //     return response
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //   let productIDget=JSON.parse(config.data)

    //   console.log(dataa?.product_order_id)



    let options = {
      key_id: "rzp_test_G0kWdsA9toFR0a", // in react your environment variable must start with REACT_APP_
      key_secret: "qW4iPbrU5Vc84pHzZc4uI5ZA",
      amount: amount,
      currency: "INR",
      description: "Test transaction",
      image: "", // add image url
      order_id: data?.data?.order_id,
      // order_id: dataa?.product_order_id,


      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay

        handlePaymentSuccess(response);
      },
    };

    // console.log("mnhgsdjhsk",productIDget)


    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const BackBtn = () => {
    navigate("/admin/order/User#pending");

    window.location.reload(false);
  };

  useEffect(() => {
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId);

    // dispatch(
    //   PostViewAdminOrder({
    //     product_order_id: OrderDetailsIdData?.product_order_id,
    //   })
    // );

    setPaymentMethodPopup(true);
  }, []);

  console.log("jaghjhbads", totalPriceValue, GetWalletBalanceData)
  // 
  useEffect(() => {


    if (GetWalletBalanceData && totalPriceValue) {
      if (
        GetWalletBalanceData?.data?.balance >=
        Number(totalPriceValue)
      ) {

      } else {

        console.log("jaghjhbads", GetWalletBalanceData)
        let calaculated = Number(totalPriceValue) - GetWalletBalanceData?.data?.balance
        console.log("calaculated", calaculated.toFixed(2))
        // ?.toFixed(2)
        setCalculatedAmount(calaculated.toFixed(2))
        setAmountLessThenWalletPayPopup(true);
      }

    }
  }, [totalPriceValue, GetWalletBalanceData]);

  // orderpayment

  const ContinuePaymentFun = () => {

    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId);
    let CompanyDetails = reactLocalStorage.get("UserDetailsPayload", false);
    console.log("shhgfds",CompanyDetails)
    let OrderComapnyData = JSON.parse(CompanyDetails);
    console.log("kajsdhsa",OrderComapnyData)
    
    let payLoad = {
      amount: Number(totalPriceValue),
      order_id: OrderDetailsIdData?.product_order_id,
      company_name: OrderComapnyData?.company_name

    };

    // PostDebitBalance
    //when Total amount is less then wallet amount the If condition will run
    // if (amountlessthenwalletpaypopup) {

    //   if (activepaymentrazorpay == "activeWalletPayment") {
    //     PaymentFun() // This function open the RazorPay Popup
    //   }
    //   else {
    //     setWalletPayPopup(true)
    //   }

    // } else if (activepaymentwallet == "activeWalletPayment") {
      dispatch(PostDebitBalance(payLoad)) //Total amount will be debit by this api from the wallet 

    // } else if (activepaymentrazorpay == "activeWalletPayment") {
    //   PaymentFun() // This function open the RazorPay Popup
    // }
  };
  // PostWalletAddMoney

  useEffect(() => {
    if (PostDebitBalanceData) {
      if (PostDebitBalanceData.status == 200) {
        setPaymentMethodPopup(false);
        setWalletPayPopup(false)
      }
    }

  }, [PostDebitBalanceData])



  useEffect(() => {
    if (PostAdminOrderAddShipmentData) {
      if (PostAdminOrderAddShipmentData.status == 200) {
        let CompanyDetails = reactLocalStorage.get("UserDetailsPayload", false);
  console.log("shhgfds",CompanyDetails)
  let OrderComapnyData = JSON.parse(CompanyDetails);
  console.log("kajsdhsa",OrderComapnyData)
  let walletpayload ={
    company_name: OrderComapnyData?.company_name
  }

  console.log("dshfgds",walletpayload)

  dispatch(GetWalletBalance(walletpayload))
      }
    }
   dispatch( PostAdminOrderAddShipment)

  }, [PostAdminOrderAddShipmentData])

 







  const ProceedToPayFun = () => {

    AddPaymentFun()
  }



  const handlePaymentSuccess_addmoney = async (response, PaymentFunResData) => {
    setLoadSpiner(o => !o)
    console.log("response3", response);
    console.log("datadata111", PaymentFunResData)
    // setLoadSpiner((o) => !o);
    let BearerToken = reactLocalStorage.get("token", false);
    const ProductOrderId = reactLocalStorage.get("product_order_id", false);

    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId);
    console.log("sada",OrderDetailsId)

    let InvoicePayLoad = {
      product_order_id: ProductOrderId,
      request_type: "create",
    };
    let calaculated = totalPriceValue - GetWalletBalanceData?.data?.balance
    let calculatedTotal = GetWalletBalanceData?.data?.balance + calaculated
      let CompanyDetails = reactLocalStorage.get("UserDetailsPayload", false);


    let payLoad = {
      amount: calculatedTotal.toFixed(2),
      order_id: OrderDetailsIdData?.product_order_id,
      company_name:CompanyDetails?.company_name

    };


    
    try {
      let bodyData = new FormData();
      let objectResponse = { ...response, "txnId": parseInt(PaymentFunResData?.data?.txnId) }

      // let objectResponse={
      //   "razorpay_order_id":response.razorpay_order_id,
      //   "razorpay_payment_id":response.razorpay_payment_id,
      //   "razorpay_signature":response.razorpay_signature,
      //   "txnId":parseInt(PaymentFunResData?.data?.txnId)

      // }
      // response ====> it gives me razorpay_order_id,razorpay_payment_id,razorpay_signature
      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(objectResponse));

      //  console.log("bodyDatabodyDatabodyData",response) it gives me razorpay_order_id,razorpay_payment_id,razorpay_signature

      await Axios({
        url: `${process.env.REACT_APP_BASE_URL}/wallet/complete_add_money`,
        method: "POST",
        data: bodyData,
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("resresres", res);
          dispatch(PostDebitBalance(payLoad))
          setLoadSpiner((o) => !o);
          setResponceDetail(res)
          // toast.success(res.data.message);
          // reactLocalStorage.remove('PaymentMethod');

          // navigate("/admin/wallethistory");
          // window.location.reload(false)

          // dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        })
        .catch((err) => {
          console.log(err);
          setLoadSpiner(o => !o)
        });
    } catch (error) {
      setLoadSpiner(o => !o)
      console.log(console.error());
    }
  };




  const loadScript_addmoney = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);

  };


  const AddPaymentFun = async () => {
    console.log("ghvjhdkjh")
    const res = await loadScript_addmoney();

    let amountValue = calculatedamount;
    let BearerToken = reactLocalStorage.get("token", false);

    let getShipmentId = reactLocalStorage.get("ShipmentId", false);
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    const ProductOrderId = reactLocalStorage.get("product_order_id", false);

    let dataa = JSON.parse(OrderDetailsId);



    let bodyContent
    bodyContent = JSON.stringify({
      amount: parseFloat(amountValue),

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


      console.log("resresres", res);
      return res;
    })

    console.log("datadatadata", data)
    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user

    let options = {
      key_id: "rzp_test_G0kWdsA9toFR0a", // in react your environment variable must start with REACT_APP_
      key_secret: "qW4iPbrU5Vc84pHzZc4uI5ZA",
      amount: parseInt(calculatedamount),
      currency: "INR",
      description: "Test transaction",
      image: "", // add image url
      order_id: data?.data?.order_id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        console.log("somjbjw", response);
        handlePaymentSuccess_addmoney(response, data);
      },
    };

    let rzp1 = new window.Razorpay(options);
    rzp1.open();

  };

  const PaymentPopupFun = () => {
    setPickUpPopup(false);
    setCustomCheckBox(false);
    setWalletTab({
      activeValue: "active",
      booleanValue: true,
      tabindex: "-1",
    });
    setOnlineTab("");

    navigate("/admin/order/ordersummary");

    dispatch(PaymentPopupValue(false))
  }



  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className={`dashboard-part`}>
        <Sidebar />
        <div className="content-sec">
          <div className="orderdetail-part">
            <ul className="user-list">
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/User");
                // }}
                className="active"
              >
                <span></span>Consignee Details
              </li>

              <li
                // onClick={(e) => {
                //   navigate("/admin/order/orderdetails");
                // }}
                className="active"
              >
                <span></span>Item Details
              </li>
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/ordersummary");
                // }}
                className="active"
              >
                <span></span>Summary Details
              </li>
              <li
                // onClick={(e) => {
                //   navigate("/admin/order/orderpayment");
                // }}
                className="active"
              >
                <span></span>Payment
              </li>
            </ul>
            <div className="userinfo-box">
              <h1>Payment</h1>

              {paymentmethod !== "online" && (
                <div className="payment-text">
                  <p>  {responcedetails?.status == 200 || PostDebitBalanceData.status == 200 ? "order placed SuccesFully" : "Processing..."}</p>
                  {/* <p>order placed SuccesFully </p> */}

                  <button
                    type="button"
                    className="btn"
                    onClick={(e) => BackBtn(e)}
                  >
                    back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>


      {/* <button
                    className={`nav-link   ${pandingtab ? "active" : ""}`}
                    id="pending-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#pending-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="pending-tab-pane"
                    aria-selected={`${pandingtab ? "true" : "false"}`}
                    onClick={(e) => {
                      navigate("#pending");
                      setFilterShowHideBtn(false);
                    }}
                  >
                    Pending
                  </button> */}

      {/* <Popup open={pickuppopup} position="" model className="sign_up_loader">
          <div className="container">
            <div className='loader-sec'>
              <div className=" data_picker rounded  bg-white">
                <div className='py-1 text-warning'>
                  <DateRangePicker
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    direction="horizontal"
                    months={2}
                    ranges={datapicker}
                    onChange={(e) => DataPickerFun(e)}
                  />
                  <h4 className='text-danger calender_popup_cancel' onClick={(e) => { setPickUpPopup(false); setCustomCheckBox(false) }}> X </h4>
                </div>
                <div className="data_picker_btn">
                  <button onClick={(e) => DatePickerSaveFun(e)}> save </button>
                </div>
              </div>
            </div>
          </div>
        </Popup> */}

      <Popup open={walletpaypopup} position="" model className="sign_up_loader">
        <div className="wallet-popup">
          <div className="popupinner">
            <h4
              className="text-danger calender_popup_cancel"
              onClick={(e) => {
                setPickUpPopup(false);
                setCustomCheckBox(false);

                navigate("/admin/order/ordersummary");

              }
              }
            >
              {" "}
              X{" "}
            </h4>
            <h2>Recharge your wallet</h2>
            <p>
              Current Wallet Amount <b>{GetWalletBalanceData?.data?.balance}/-</b>
            </p>
            <div className="popup-body">
              <div className="amout">
                <p>Enter Amount in multiples of 100 below</p>
                <div className="">
                  <p>Rs.</p>
                  <input type="number" class="form-control" value={calculatedamount} placeholder="500" />
                  <span>
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
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
              <button type="button" class="btn pr-pay"
                onClick={(e) => ProceedToPayFun()}>
                Proceed To Pay{" "}
              </button>
            </div>
          </div>
        </div>
      </Popup>

      <Popup
        open={paymentmethodpopup}
        position=""
        model
        className="sign_up_loader"
      >
        <div className="wallet-popup" >
          <div className={`popupinner ${wallettab ? "active" : ""}`}>
            <h4
              className="text-danger calender_popup_cancel"
              aria-selected={`${wallettab ? "true" : "false"}`}
              onClick={(e) => {
                PaymentPopupFun(e)
                // setPaymentMethodPopup((o) => !o);

              }}
            >
              {" "}
              X{" "}
            </h4>
            <h2>Select your payment Mode</h2>
            <p>
              Total Amount to pay Rs.{" "}
              {totalPriceValue}
            </p>
            <div className="popup-body">
              <ul className="pay-list">
                <li className={`row mx-0 ${activepaymentwallet}`}
                  onClick={(e) => { setActivePaymentWallet("activeWalletPayment"); setActivePaymentRazorPay("activeRazorPayment") }}>
                  <div className="col-2 ">
                    <img
                      src="/images/wallet.svg"
                      alt="img"
                    // onClick={(e) => setWallet(o => !o)}
                    />
                  </div>
                  <div className="col-9"
                  // onClick={(e) => GoTOWalletFun(e)}
                  >
                    <p className="mb-1">Wallet</p>
                    <p className="mb-0">
                      Current Balance :
                      <b> {GetWalletBalanceData?.data?.balance_status=="NEGATIVE"?`-${GetWalletBalanceData?.data?.balance}`:GetWalletBalanceData?.data?.balance}/-</b>
                    </p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center">
                    {" "}
                    <b> &gt; </b>{" "}
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
                class="btn pr-pay mb-0"
                onClick={(e) => ContinuePaymentFun(e)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </Popup>
      <LodingSpiner loadspiner={loadspiner} />
    </div>
  );
};

export default OrderPayment;
