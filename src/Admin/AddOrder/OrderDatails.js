import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetAdminCloneOrder, PostAdminOrderAddShipment, PostAdminOrderPaymentCal, PostPincodesAvailability, PostAdminOrderEwayBill } from "../../Redux/action/ApiCollection";

const OrderDatails = () => {
  const [weight, setWeight] = useState("")
  const [length, setLength] = useState("")
  const [breadth, setBreadth] = useState("")
  const [height, setHeight] = useState("")
  const [deliveryproduct, setDeliveryProduct] = useState('')
  const [selectedproduct, setSelectedProduct] = useState(null)
  const [quentity, setQuentity] = useState("")
  const [date, setDate] = useState('')
  const [yesnoactivebutton, setYesNoActiveButton] = useState(true)
  const [tax, setTax] = useState("")
  const [price, setPrice] = useState("")
  const [discount, setDiscount] = useState("")
  const [total, setTotal] = useState("")
  const [producttypeerorr, setProductTypeErorr] = useState(false)
  const [deliverytypeerror, setDeliveryTypeError] = useState(false)
  const [shippingprice, setShippingPrice] = useState(null)
  const [otherProductType, setOtherProductType] = useState("")
  const [defaultValue, setDefaultValue] = useState('');
  const [yesnoactivebuttonInsurance, setYesNoActiveButtonInsurance] = useState(false)
  const [productpricevalue, setProductPriceValue] = useState("")
  const [ewayPdf, setEwayPdf] = useState("")
  const [ewayPdfLocalName, setEwayPdfLocalName] = useState("")
  const [addtagvalue, setAddTagValue] = useState("")
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const WeightRef = useRef(null);
  const LengthRef = useRef(null);



  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const PostAdminOrderPaymentCalReducerData = useSelector(state => state.PostAdminOrderPaymentCalReducer?.PostAdminOrderPaymentCalReducerData)
  const PostAdminOrderAddShipmentReducerData = useSelector(state => state.PostAdminOrderAddShipmentReducer?.PostAdminOrderAddShipmentReducerData)
  const GetAdminCloneOrderData = useSelector(state => state.GetAdminCloneOrderReducer.GetAdminCloneOrderData?.data)
  const PostAdminOrderEwayBillData = useSelector(state => state.PostAdminOrderEwayBillReducer.PostAdminOrderEwayBillData)
  //   const url =
  //   PostAdminOrderEwayBillData?.data
  const storedEwaybillUrl = reactLocalStorage.get('Eway_bill_URL', false)
  useEffect(() => {
    let ProductOrderId = reactLocalStorage.get("product_order_id", false);
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId)
    let PayloadData = {
      // "product_order_id": OrderDetailsIdData.product_order_id,
      "product_type": selectedproduct,
      "delivery_type": deliveryproduct,
      "weight": Number(weight),
      "pickup_date": date,
      "pack_shipment": yesnoactivebutton,
      "length": Number(length),
      "breadth": Number(breadth),
      "height": Number(height),
      "quantity": Number(quentity),
      "packaging": shippingprice,
      "insurance": yesnoactivebuttonInsurance,
    }
    if (deliveryproduct && selectedproduct && quentity && weight && date && breadth && length && height) {
      if (selectedproduct !== null && selectedproduct !== "none" &&
        deliveryproduct !== null && deliveryproduct !== "none") {
        setProductTypeErorr(false)
        dispatch(PostAdminOrderPaymentCal(PayloadData))
      }
      else {
        toast.warn("please select all fields ");
        // setProductTypeErorr(true)
      }
    }
    // deliveryproduct && selectedproduct == null || "none" ? setProductTypeErorr(true) : selectedproduct && quentity && weight && date && yesnoactivebutton && breadth && length && height &&
    //   dispatch(PostAdminOrderPaymentCal(PayloadData))
  }, [deliveryproduct, breadth, length, height, selectedproduct, quentity, weight, date, yesnoactivebutton, shippingprice, yesnoactivebuttonInsurance])
  const CurrentDateFun = (e) => {
    const selected = new Date(e.target.value);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);
    if (selected >= maxDate) {
      let spliteData = selected.toISOString().split("T")
      setDate(spliteData[0])
    }
    else {
      toast.warn("please select validDate ");
      setDate("")
    }
  }
  useEffect(() => {
    PostAdminOrderPaymentCalReducerData &&
      setTax(PostAdminOrderPaymentCalReducerData?.data?.gst)
    setPrice(PostAdminOrderPaymentCalReducerData?.data?.price)
    setDiscount("0")
    reactLocalStorage.set('totalPriceValue', PostAdminOrderPaymentCalReducerData?.data?.total_price)
    setTotal(PostAdminOrderPaymentCalReducerData?.data?.total_price)
    if (PostAdminOrderAddShipmentReducerData?.status == 200) {
      navigate("/admin/order/ordersummary");
    }
  }, [PostAdminOrderPaymentCalReducerData, PostAdminOrderAddShipmentReducerData])
  const ItemDetailsPrevousBtnFun = () => {
    navigate("/admin/order/User")
    // window.location.reload(true)
  }
  useEffect(() => {
    const storedDefaultValue = reactLocalStorage.get('PayloadOrderData')
    const PayloadOrderData = storedDefaultValue ? JSON.parse(storedDefaultValue) : null
    if (PayloadOrderData) {
      setDefaultValue(PayloadOrderData)
    }
    else {
      setDefaultValue('')
    }
  }, [])
  const ItemDetailsNextBtnFun = () => {
    // let ProductOrderId = reactLocalStorage.get("product_order_id", false); 
    let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
    let OrderDetailsIdData = JSON.parse(OrderDetailsId)
    // "company_name":"DemoTest",
    // "amount":"1234",
    // "eway_bill":1,
    let PayloadData = {
      "product_type": selectedproduct,
      "delivery_type": deliveryproduct,
      "weight": Number(weight),
      "pickup_date": date,
      "pack_shipment": yesnoactivebutton,
      "length": Number(length),
      "breadth": Number(breadth),
      "height": Number(height),
      "quantity": Number(quentity),
      // "product_price": price,
      "packaging": shippingprice,
      "insurance": yesnoactivebuttonInsurance,
      // "Eway_Bill":ewayPdf,
      // "Eway_price": productpricevalue,
      "product_price": productpricevalue,
    }
    let AddOrderTag = {
      "add_order": addtagvalue
    }
    let AddOrder = reactLocalStorage.set("add_order_tag", JSON.stringify(AddOrderTag))
    let EwayBill = reactLocalStorage.get("Eway_bill_URL", false)  
    if (deliveryproduct && breadth && length && height && selectedproduct && quentity && weight && date) {
      if (selectedproduct !== null && selectedproduct !== "none"
        && deliveryproduct !== null && deliveryproduct !== "none") {
        setProductTypeErorr(false)
        if (yesnoactivebutton == true) {
          if (shippingprice !== null) {
            if (productpricevalue >= 50000) {
              if (EwayBill !== false && EwayBill !== "Upload E-way Bill") {
                reactLocalStorage.set("PayloadOrderData", JSON.stringify(PayloadData))
                navigate("/admin/order/ordersummary")
              }
              else {
                toast.warn("please Upload E-way Bill");
              }
            }
            else {
              reactLocalStorage.set("Eway_bill_URL", "Upload E-way Bill")
              reactLocalStorage.set("Eway_bill_id", "")
              reactLocalStorage.set("PayloadOrderData", JSON.stringify(PayloadData))
              navigate("/admin/order/ordersummary")
            }
          }
          else {
            toast.warn("please select Package shipping");
          }
        }
        else {
          if (productpricevalue >= 50000) {     
            if (EwayBill !== false && EwayBill !== "Upload E-way Bill") {
              reactLocalStorage.set("PayloadOrderData", JSON.stringify(PayloadData))
              navigate("/admin/order/ordersummary")
            }
            else {
              toast.warn("please Upload E-way Bill");
            }
          }
          else {
            if (productpricevalue) {
              reactLocalStorage.set("Eway_bill_URL", "Upload E-way Bill")
              reactLocalStorage.set("Eway_bill_id", "")
              reactLocalStorage.set("PayloadOrderData", JSON.stringify(PayloadData))
              navigate("/admin/order/ordersummary")
            }
            else {
              toast.warn("please Add  Product Price");
            }
          }
        }
      }
      else {
        toast.warn("please select all fields ");
        // setProductTypeErorr(true)
      }
      // reactLocalStorage.set("PayloadOrderData", JSON.stringify(PayloadData))
      // dispatch(PostAdminOrderAddShipment(PayloadData))
      // navigate("/admin/order/ordersummary");
    }
    else {
      toast.warn("please select all fields ");
    }
  }
  // Don't delete this comment 
  //  this is for edit order
  // useEffect(() => {
  //   let BearerToken = reactLocalStorage.get("token", false);
  //   if (!BearerToken) {
  //     navigate("/login");
  //   } else {
  //     navigate("#pending");
  //   }
  //   let OrderId = reactLocalStorage.get("order_id", false);
  //   let objectData = {
  //     product_order_id: OrderId,
  //   };
  //   dispatch(GetAdminCloneOrder(objectData));
  // }, [])
  // useEffect(() => {
  //   setWeight(GetAdminCloneOrderData?.shipment_details?.weight)
  //   setLength(GetAdminCloneOrderData?.shipment_details?.height)
  //   setBreadth(GetAdminCloneOrderData?.shipment_details?.breadth)
  //   setHeight(GetAdminCloneOrderData?.shipment_details?.height)
  //   setDeliveryProduct(GetAdminCloneOrderData?.shipment_details?.delivery_type)
  //   setSelectedProduct(GetAdminCloneOrderData?.shipment_details?.product_type)
  //   setQuentity(GetAdminCloneOrderData?.shipment_details?.quantity)
  //   setDate(GetAdminCloneOrderData?.shipment_details?.pickup_date)
  // }, [GetAdminCloneOrderData])
  const SelectDeliveryType = (e) => {
    let ConsignerPinCode = reactLocalStorage.get("ConsignerPinCode", false);
    setDeliveryProduct(e.target.value)
    let payload = {
      "pincode": ConsignerPinCode,
      "delivery_type": e.target.value,
      "check_type": "PICKUP"
    }
    if (e.target.value) {
      dispatch(PostPincodesAvailability(payload))
    }
  }
  useEffect(() => {
    const storedEwaybillUrl = reactLocalStorage.get('Eway_bill_URL', false)
    if (storedEwaybillUrl) {
      const parts = storedEwaybillUrl?.split("/");
      const filename = parts[parts?.length - 1];
      setEwayPdfLocalName(filename)
    }
  }, [PostAdminOrderEwayBillData,])
  // display
  useEffect(() => {
    const storedData = reactLocalStorage.get('PayloadOrderData', false)
    console.log("storedData",storedData)
    const PayloadOrderData = JSON.parse(storedData)
    const TagOrderData = reactLocalStorage.get("add_order_tag", false)
    const PayloadTagOrderData = JSON.parse(TagOrderData)
    const storedEwaybill = reactLocalStorage.get('Eway_bill', false)
    if (storedEwaybill) {
      let getpayloadEwayBill = {
        "type": "get",
        "id": Number(storedEwaybill)
      }
      dispatch(PostAdminOrderEwayBill(getpayloadEwayBill))
    }
    // setEwayPdf(getvalue)
    if (PayloadOrderData) {
      setWeight(PayloadOrderData?.weight)
      setLength(PayloadOrderData?.height)
      setBreadth(PayloadOrderData?.breadth)
      setHeight(PayloadOrderData?.height)
      setDeliveryProduct(PayloadOrderData?.delivery_type)
      setSelectedProduct(PayloadOrderData?.product_type)
      setQuentity(PayloadOrderData?.quantity)
      setDate(PayloadOrderData?.pickup_date)
      setYesNoActiveButtonInsurance(Boolean(PayloadOrderData?.insurance))
      setShippingPrice(PayloadOrderData?.packaging)
      setYesNoActiveButton(PayloadOrderData?.pack_shipment)
      setProductPriceValue(PayloadOrderData?.product_price)
      if (PayloadOrderData?.product_type !== "Clothes"
        && PayloadOrderData?.product_type !== "Glass") {
        setSelectedProduct(PayloadOrderData?.product_type)
        setOtherProductType("OTHERS")
      }
    }
    if (PayloadTagOrderData) {
      setAddTagValue(PayloadTagOrderData?.add_order)
    }
  }, [])
  let packageShipping =
    [
      { name: "Envelope", key: "Envelope", price: 150 },
      { name: "Box", key: "Box", price: 200 },
    ]
  const handleeway = (e) => {
    setEwayPdf(e?.target?.files[0])
    reactLocalStorage.set("Eway_bill_URL", String(e?.target?.files[0].name))
    let payloadEwayBill = {
      "eway_bill": e?.target?.files[0],
      "type": "create"
    }
    dispatch(PostAdminOrderEwayBill(payloadEwayBill))
  }
  const OtherProductTypeFun = (e) => {
    // setOtherProductType(e.target.value)
    setSelectedProduct(e.target.value)
  }
  const weightFun = (e) => {
    setWeight(e.target.value > 0 ? e.target.value : "")
  }

   

  const   WeightonWheelFun  = (e) => { 
    WeightRef.current.blur();
    setTimeout(() => WeightRef.current.focus(), 100);
  };
  const   LengthonWheelFun  = (e) => { 
    LengthRef.current.blur();
    setTimeout(() => LengthRef.current.focus(), 100);
  };

   

  useEffect(() => {
    const ignoreScroll = (e) => { 
     };
    WeightRef.current && WeightRef.current.addEventListener("wheel", ignoreScroll);
  }, [WeightRef]);
 

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
              >
                <span></span>Summary Details
              </li>
              <li
              // onClick={(e) => {
              //   navigate("/admin/order/orderpayment");
              // }}
              >
                <span></span>Payment
              </li>
            </ul>
            <div className="userinfo-box">
              <h1>Item Details</h1>
              <div className="userinfo-body">
                <h3>Product Details</h3>
                <div className="row">
                  <div className="col-sm-6">
                    <label>Weight</label>
                    <div className="form-box mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="Quantity"
                        value={weight}
                        // onChange={(e) => weightFun(e)}
                        ref={WeightRef}
                        onWheel={(e)=>WeightonWheelFun(e)}
                        onChange={(e) => setWeight(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>g</span>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <label>Length</label>
                    <div className="form-box mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="L"
                        value={length}
                        ref={LengthRef}
                        onWheel={(e)=>LengthonWheelFun(e)}
                        onChange={(e) => setLength(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span >CM</span>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <label>Breadth</label>
                    <div className="form-box mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="B"
                        value={breadth}
                        onChange={(e) => setBreadth(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>CM</span>
                    </div>
                  </div>
                  <div className="col-sm-2">
                    <label>Height</label>
                    <div className="form-box mt-1">
                      <input
                        type="text"
                        className="form-control "
                        placeholder="H"
                        value={height}
                        onChange={(e) => setHeight(e.target.value > 0 ? e.target.value : "")}
                      />
                      <span>CM</span>
                    </div>
                  </div>
                  <div className="col-sm-6 pt-3">
                    <label >Delivery Type</label>
                    <select className='form-control mt-1' placeholder="Select"
                      onChange={(e) => SelectDeliveryType(e)}
                      value={deliveryproduct}>
                      <option value="none" selected >Select Delivery Type...</option>
                      <option value="SAME_DAY_DELIVERY">Same day delivery</option>
                      <option value="EXPRESS_DELIERY">Express delivery</option>
                      <option value="AIR_DELIVERY">Air delivery</option>
                      <option value="SURFACE">Surface delivery</option>
                      {/* <option value="SAME_DAY_PICKUP_AND_DROP">Same day pickup and drop</option> */}
                      {/* <option value="CASH_ON_DELIVERY">Cash on delivery</option> */}
                      {/* <option value="INTERSTATE_PRIVATE_DELIVERY">Interstate private delivery</option> */}
                      <option value="NEXT_DAY_DELIVERY">Next day delivery</option>
                      <option value="REVERSE_PICKUP_SERVICE_WITH_SAME_PRICE">Reverse pickup service with same price</option>
                      <option value="INTERNATIONAL_COURIER_SERVICE">Internation Courier service</option>
                      <option value="SPECIAL_DELIVERY">Special delivery</option>
                    </select>
                  </div>
                  <div className="col-sm-6 pt-3">
                    <label className='form-label'>Pick-up Date</label>
                    <input type="date" className='form-control date-form' placeholder="Choose From Calendar"
                      value={date} onChange={(e) => CurrentDateFun(e)} />
                    <span className='date-img'>
                    </span>
                  </div>
                  <div className='shipment-box pt-3'>
                    <p>Want us to pack your shipment?</p>
                    <div className='shipment-btn'>
                      <button type='button' className={yesnoactivebutton ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButton(true)}>Yes</button>
                      <button type='button' className={!yesnoactivebutton ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButton(false)}>No</button>
                    </div>
                  </div>
                  {yesnoactivebutton && <div className='form-box select-arrow col-12 mb-3'>
                    <label className='form-label'>Package shipping</label>
                    <select className={`' ' ${deliverytypeerror ? "alert_border form-control" : "form-control"}`} placeholder="Select"
                      onChange={(e) => { setShippingPrice(e.target.value) }}
                    // onChange={(e) => { handleChange(e) }}
                    >
                      <option value="null"   >Select Package Type...</option>
                      {
                        packageShipping?.map((item) => {
                          return (
                            <option value={item.name}
                              selected={item.name == shippingprice} >
                              {item.key} - {item.price}/-
                              {/* {item.name} */}
                            </option>
                          )
                        })
                      }
                    </select>
                  </div>}
                  <div className='form-box col-12 mb-3'>
                    <label className='form-label'>Product Price</label>
                    {/* <input className={`form-control`} type="number" id="price-text" onChange={(e)=>Ewaybill(e.target.value)}></input> */}
                    <input
                      className="form-control" placeholder="Product Price"
                      type="text" id="price-text"
                      value={productpricevalue}
                      // var newStr = e.target.value.replace(/  +/g, ' ');
                      onChange={(e) => setProductPriceValue(e.target.value)?.replace(/  +/g, ' ')} />
                    {productpricevalue >= 50000 ? <div className="input_filed input_file  mb-3">
                      <label className="button" for="uploaddd">
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
                      {
                        ewayPdf?.length == 0 && ewayPdfLocalName.length == 0 || ewayPdfLocalName == undefined ? (
                          <div className="uploadinfo">E-WAY BILL</div>
                        ) : (
                          storedEwaybillUrl != undefined ?
                            <div className="uploadinfo">{ewayPdfLocalName}</div> :
                            "hfb"
                        )
                      }
                      <input
                        id="uploaddd"
                        type="file"
                        placeholder="GSTIN PDF"
                        accept='Application/pdf'
                        // setEwayPdf(e?.target?.files[0])
                        onChange={(e) => handleeway(e)}
                      />
                    </div> : ""}
                  </div>
                </div>
                <h3 className="mt-4">Package Details</h3>
                <div className="row">
                  <div className="col-sm-6">
                    <label >Product Type</label>
                    <select className='form-control' placeholder="Select"
                      onChange={(e) => { setSelectedProduct(e.target.value); setOtherProductType(e.target.value) }}
                      value={selectedproduct}>
                      <option value="none" selected >Select Product Type...</option>
                      <option value="Clothes">Clothes</option>
                      <option value="Glass">Glass</option>
                      <option value="OTHERS">Others</option>
                    </select>
                    {otherProductType === "OTHERS" ? <div className="mt-2">
                      <label >Add coustom Product Type</label>
                      <input type="search" onChange={(e) => OtherProductTypeFun(e)}
                        className='form-control col-12  mb-3' id="text" placeholder='Write Product'
                        value={selectedproduct} />
                    </div>
                      : ""}
                    <span>
                      {producttypeerorr && <small className="text-danger">
                        Select the product type
                      </small>}
                    </span>
                  </div>
                  <div className="col-sm-6">
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Quantity</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Quantity "
                          value={quentity}
                          onChange={(e) => setQuentity(e.target.value > 0 ? e.target.value : "")}
                        />
                      </div>
                      <div className="col-sm-6">
                        <label>Tax (%)</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Tax"
                          value={tax}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Price</label>
                        <input
                          type="text"
                          className="form-control mt-1"
                          placeholder="Price "
                          value={price}
                        />
                      </div>
                      <div className="col-md-6">
                        <label>Discount</label>
                        <input
                          type="number"
                          className="form-control mt-1"
                          placeholder="Discount"
                          value={discount}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label>Total</label>
                    <input
                      type="text"
                      className="form-control mt-1"
                      placeholder="Total (auto-generated)"
                      value={total}
                    />
                  </div>
                  <div className='shipment-box pt-3'>
                    <p>Do you want Insurance ?</p>
                    <div className='shipment-btn'>
                      <button type='button' className={yesnoactivebuttonInsurance ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButtonInsurance(true)}>Yes</button>
                      <button type='button' className={!yesnoactivebuttonInsurance ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButtonInsurance(false)}>No</button>
                    </div>
                  </div>
                  <div className='form-box col-12 mb-3'>
                    <label className='form-label'>Add Order Tag</label>
                    {/* <input className={`form-control`} type="number" id="price-text" onChange={(e)=>Ewaybill(e.target.value)}></input> */}
                    <input
                      className="form-control" placeholder="Add Order Tag"
                      type="text" id=""
                      value={addtagvalue}
                      // var newStr = e.target.value.replace(/  +/g, ' ');
                      onChange={(e) => setAddTagValue(e.target.value)?.replace(/  +/g, ' ')} />
                    <p className="add_tag_ex">Ex:- Item is mirror</p>
                  </div>
                </div>
              </div>
              {/* <button
                onClick={(e) => {
                  ItemDetailsNextBtnFun(e)
                }}
                type="button"
                className="btn next-btn"
              >
                {" "}
                Next{" "}
              </button> */}
              <div className="row">
                <div className="col-sm-4">
                  <button
                    onClick={(e) => ItemDetailsPrevousBtnFun(e)}
                    type="button"
                    className="btn next-btn"
                  >
                    {" "}
                    Previous{" "}
                  </button>
                </div>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                  <button
                    onClick={(e) => ItemDetailsNextBtnFun(e)}
                    type="button"
                    className="btn next-btn"
                  >
                    {" "}
                    Next{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDatails;
