import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PhoneInput from "react-phone-input-2";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId,
} from "react-places-autocomplete";
import {
  GetAdminOrderSummary,
  OrderPageBookNavigate,
  PatchAdminOrderEdit,
  PostPincodesDelivered,
  GetAdminOrderCallBuyer,
  GetOrderDownloadInvoice,
  PostOrderDownloadInvoiceFile,
  DeleteAdminOrder,
  PostAddOrderTag,
  PostPincodesAvailability,
  PostOrderDownloadLabelGenerationFile,
} from "../Redux/action/ApiCollection";
import { PermissionData } from "../Permission";

import { Document, Page } from "react-pdf";

const Orderinner = () => {
  const [editslidebar, setEditSlideBar] = useState(false);
  const [addordertag, setAddOrderTag] = useState(false);

  const [callbuyer, setCallBuyer] = useState(false);

  const [pincode, setPineCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [altnumber, setAltNumber] = useState("");
  const [altcountrypincode, setAltCountryPinCode] = useState("");
  const [countrypincode, setCountryPinCode] = useState("");
  const [deliveryaddress, setDeliveryAddress] = useState("");
  const [companyname, setCompanyName] = useState("");
  const [weight, setWeight] = useState("");
  const [city, setCity] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [landmark, setLandMark] = useState("");
  const [paymentmethod, setPaymentMethod] = useState("");
  const [pickupaddress, setPickUpAddress] = useState("");
  const [pickupaddressactive, setPickupAddressActive] = useState(false);
  const [deliverypincodeactive, setDeliveryPinCodeActive] = useState(false);
  const [weighterror, setWeightError] = useState(false);
  const [ordertag, setOrderTag] = useState("");

  const [downloadinvoiceshow, setDownloadInvoiceShow] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [deliverylogo, setDeliveryLogo] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let param = useParams();

  let paramHash = useLocation();
  console.log("param", paramHash?.hash);
  const GetAdminOrderReturnData = useSelector(
    (state) => state.GetAdminOrderSummaryReducer.GetAdminOrderSummaryData?.data
  );
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const PostPincodesDeliveredReducer = useSelector(
    (state) => state.PostPincodesDeliveredReducer.PostPincodesDeliveredData
  );
  const PostOrderDownloadInvoiceFileData = useSelector(
    (state) =>
      state.PostOrderDownloadInvoiceFileReducer.PostOrderDownloadInvoiceFileData
  );
  const GetOrderDownloadInvoiceData = useSelector(
    (state) =>
      state.GetOrderDownloadInvoiceReducer.GetOrderDownloadInvoiceData?.data
  );

  // label generation
  const PostOrderDownloadLabelGenerationFileData = useSelector(
    (state) =>
      state.PostOrderDownloadLabelGenerationFileReducer
        .PostOrderDownloadLabelGenerationFileData?.data
  );

  const DeleteAdminOrderData = useSelector(
    (state) => state.DeleteAdminOrderReducer.DeleteAdminOrderData?.data
  );
  const PatchAdminOrderEditData = useSelector(
    (state) => state.PatchAdminOrderEditReducer.PatchAdminOrderEditData
  );

  const GetAdminOrderCallBuyerData = useSelector(
    (state) =>
      state.GetAdminOrderCallBuyerReducer.GetAdminOrderCallBuyerData?.data
  );
  const PostAddOrderTagData = useSelector(
    (state) => state.PostAddOrderTagReducer.PostAddOrderTagData?.data
  );

  const PostPincodesAvailabilityData = useSelector(
    (state) =>
      state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData
  );
  const HeaderToggleClassAddData = useSelector(
    (state) => state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );
  let deliverypartnerdata = reactLocalStorage.get("Is_Business");
  // const ToggleSideBarTrueFalse =useSelector((state)=>state.ToggleSideBarTrueFalseReducer.ToggleSideBarTrueFalseData)

  //  let Pending_Set = {
  //             "product_order_id":allData.product_order_id,
  //             "delivery_partner": allData.name,
  //             "awb_number" : awbnumber,
  //           };

  useEffect(() => {
    let objectData = {
      product_order_id: param.id,
    };
    let call_buyer = {
      product_order_id: param.id,
    };
    dispatch(GetAdminOrderSummary(objectData));
    dispatch(GetAdminOrderCallBuyer(call_buyer));
  }, []);

  useEffect(() => {
    let objectData = {
      product_order_id: param.id,
    };
    if (PatchAdminOrderEditData?.status == 200) {
      dispatch(GetAdminOrderSummary(objectData));
    }
  }, [PatchAdminOrderEditData]);

  useEffect(() => {
    setPineCode(GetAdminOrderReturnData?.customer_details?.address?.pincode);
    setState(GetAdminOrderReturnData?.customer_details?.address?.state);
    setCountry(GetAdminOrderReturnData?.delivered_address?.country);
    setCity(GetAdminOrderReturnData?.customer_details?.address?.city);
    setName(GetAdminOrderReturnData?.customer_details?.name);
    setEmail(GetAdminOrderReturnData?.customer_details?.email);
    setNumber(GetAdminOrderReturnData?.customer_details?.phone_number);
    setDeliveryAddress(GetAdminOrderReturnData?.customer_details?.address);
    setCompanyName(GetAdminOrderReturnData?.Item_summary?.name);
    setWeight(GetAdminOrderReturnData?.Item_summary?.weight);
    setLandMark(GetAdminOrderReturnData?.delivered_address?.landmark);
    setCountryPinCode(GetAdminOrderReturnData?.delivered_address?.country_code);
    setPickUpAddress(
      GetAdminOrderReturnData?.delivered_address?.address +
        "," +
        GetAdminOrderReturnData?.delivered_address?.city +
        "," +
        GetAdminOrderReturnData?.delivered_address?.state +
        "," +
        GetAdminOrderReturnData?.delivered_address?.country
    );
    setPaymentMethod(GetAdminOrderReturnData?.method);
  }, [GetAdminOrderReturnData]);

  const UpdateFun = (e) => {
    let data = paymentmethod;

    if (data == "online") {
      let payloadData = {
        product_order_id: param.id,
        method: paymentmethod,
        name: name,
        alternative_number: altnumber,
        alt_country_code: altcountrypincode,
        delivered_address: pickupaddress,
        delivered_pincode: pincode,
        city: city,
        state: state,
        country: country,
        landmark: landmark,
        contry_code: countrypincode,
      };

      !deliverypincodeactive && pincode && !pickupaddressactive && !weighterror
        ? dispatch(PatchAdminOrderEdit(payloadData))
        : toast.warn("please fill all the fields correctly");
    } else {
      let payloadData = {
        product_order_id: param.id,
        weight: weight,
        length: length,
        breadth: width,
        height: height,
        method: paymentmethod,
        name: name,
        alternative_number: `${altcountrypincode}-${altnumber}`,
        delivered_address: pickupaddress,
        delivered_pincode: pincode,
        city: city,
        state: state,
        country: country,
        landmark: landmark,
        contry_code: countrypincode,
      };

      !deliverypincodeactive && pincode && !pickupaddressactive && !weighterror
        ? dispatch(PatchAdminOrderEdit(payloadData))
        : toast.warn("please fill all the fields correctly");
    }
    setEditSlideBar((o) => !o);
  };

  const InputCountryCodePickupFun = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library

    let data = [];
    let CountryCode = eventTargetValue.split(" ");
    setCountryPinCode(CountryCode[0]);
    CountryCode.slice(1).map((items, id) => {
      data.push(items);
    });
    let myString = data.join("").replace(/\D/g, "");
    setNumber(myString);
  };

  const InputCountryCodePickupFunAlt = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    let data = [];
    let CountryCode = eventTargetValue.split(" ");
    setAltCountryPinCode(CountryCode[0]);
    CountryCode.slice(1).map((items, id) => {
      data.push(items);
    });
    let myString = data.join("").replace(/\D/g, "");
    setAltNumber(myString);
  };

  const PaymentMethodFun = (e, data) => {
    // setPaymentMethod(data)
  };

  const PickupAddressFun = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter)

    setPickUpAddress(address);
    if (address == undefined) {
      setPickUpAddress(" ");
      setPickupAddressActive(true);
    }
    const results = await geocodeByAddress(address);

    if (results[0]?.address_components.at(-1)?.long_name == pincode) {
      let splitData = address.split(",");
      setCity(splitData[splitData.length - 3]);
      setState(splitData[splitData.length - 2]);
      setPickupAddressActive(false);
    } else {
      setPickupAddressActive(true);
      setCity(" ");
      setState(" ");
    }
  };

  const DeliveredPincodeFun = (e) => {
    setPineCode(e.target.value);

    let payload = {
      pincode: e.target.value,
      check_type: "DELIVERED",
    };

    if (e.target.value.length === 6) {
      PickupAddressFun();
      dispatch(PostPincodesAvailability(payload));
    } else {
      setDeliveryPinCodeActive(true);
    }
  };

  useEffect(() => {
    if (PostPincodesAvailabilityData) {
      if (PostPincodesAvailabilityData?.data?.message == "Available") {
        setDeliveryPinCodeActive(false);
      } else {
        PickupAddressFun();
        setDeliveryPinCodeActive(true);
      }
      //PostPincodesDeliveredReducer && PostPincodesDeliveredReducer == "Pincode Available" ? setDeliveryPinCodeActive(false) : setDeliveryPinCodeActive(true)
    }
  }, [PostPincodesAvailabilityData]);
  useEffect(() => {
    if (GetAdminOrderReturnData?.delivery_partner === "SKYKING") {
      setDeliveryLogo("/images/SKYYKING.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "DTDC") {
      setDeliveryLogo("/images/DTDC.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "ANJANI") {
      setDeliveryLogo("/images/ANJANI.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "DHL") {
      setDeliveryLogo("/images/DHL.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "XPRESSBEES") {
      setDeliveryLogo("/images/XPRESS.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "DELHIVERY") {
      setDeliveryLogo("/images/DELHIVERY.png");
    } else if (GetAdminOrderReturnData?.delivery_partner === "NITRO") {
      setDeliveryLogo("/images/NITRO.png");
    }
  }, [GetAdminOrderReturnData]);

  const WeightFun = (e) => {
    if (e.target.value > 0) {
      setWeight(e.target.value);
      setWeightError(false);
    } else {
      setWeight("");
      setWeightError(true);
    }
  };

  // const Invoice = (e) => {
  //   if(PostOrderDownloadInvoiceFileData?.status !==200){

  //   setDownloadInvoiceShow(true);

  //   let payload = {
  //     product_order_id: param.id,
  //     request_type: "get",
  //   };

  //   dispatch(PostOrderDownloadInvoiceFile(payload));
  //   }
  //   else{
  //     setDownloadInvoiceShow(false)
  //   }

  //   // setDownloadInvoiceShow(true);

  //   // let payload = {
  //   //   product_order_id: param.id,
  //   //   request_type: "get",
  //   // };

  //   // dispatch(PostOrderDownloadInvoiceFile(payload));
  // };

  const Invoice = async (e) => {
    setDownloadInvoiceShow(true);

    let payload = {
      product_order_id: param.id,
      request_type: "get",
    };

    dispatch(PostOrderDownloadInvoiceFile(payload));
  };

  const GetLabel = (e) => {
    setDownloadInvoiceShow(true);

    let payload = {
      product_order_id: param.id,
      request_type: "get",
    };

    dispatch(PostOrderDownloadLabelGenerationFile(payload));
  };
  const CancelOrder = (e) => {
    let payload = {
      product_order_id: param.id,
    };
    dispatch(DeleteAdminOrder(payload));
    navigate("/admin/order");
    dispatch(OrderPageBookNavigate(paramHash?.hash));
  };

  const AddTag = (e) => {
    let payload = {
      product_order_id: param.id,
      order_tag: ordertag,
    };
    dispatch(PostAddOrderTag(payload));
    setAddOrderTag((o) => !o);
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const date = new Date(GetAdminOrderReturnData?.order_summary?.order_created);
  const callDate = new Date(GetAdminOrderCallBuyerData?.order_date);

  // useEffect(() => {

  //   if (PostOrderDownloadInvoiceFileData?.data?.name) {
  //     setDownloadInvoiceShow(false)
  //     window.open(`${PostOrderDownloadInvoiceFileData?.data?.name}`);
  //     // setDownloadInvoiceShow(false)
  //   };
  //   let payload = {
  //     product_order_id:"param.id",
  //     request_type: "get",
  //   };
  //   dispatch(PostOrderDownloadInvoiceFile(payload));

  // }, [PostOrderDownloadInvoiceFileData?.data?.name])

  // useEffect(() => {
  //   if (PostOrderDownloadLabelGenerationFileData?.name) {
  //     window.open(`${PostOrderDownloadLabelGenerationFileData.name}`);
  //   }
  //   let payload = {
  //     product_order_id: "param.id",
  //     request_type: "get",
  //   };
  //   dispatch(PostOrderDownloadLabelGenerationFile(payload));
  // },[PostOrderDownloadLabelGenerationFileData])

  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
          <Sidebar />
          <div className="content-sec">
            <div className="orderinfo-header">
              <h2>
                Order Number <span>{param.id}</span>
              </h2>
              <div className="orderinfobtn-group">
                <button
                  type="button"
                  className="btn back-btn"
                  onClick={(e) => {
                    navigate("/admin/order");
                    dispatch(OrderPageBookNavigate(paramHash?.hash));
                  }}
                >
                  Back
                </button>
                <div className="orderaction">
                  <button type="button" className="btn action-btn">
                    {" "}
                    Action
                  </button>
                  <ul className="dropdown">
                    <li
                      onClick={(e) =>
                        PermissionData()?.GET_ORDER_INVOICE ==
                        "GET_ORDER_INVOICE"
                          ? Invoice(e)
                          : ""
                      }
                      className={`${
                        PermissionData()?.GET_ORDER_INVOICE ==
                        "GET_ORDER_INVOICE"
                          ? " "
                          : "permission_blur"
                      }`}
                    >
                      Download Invoice
                      {/* <a href='#' target="_blank"> */}
                      {/* {downloadinvoiceshow&&
                        <Document file={PostOrderDownloadInvoiceFileData} onLoadSuccess={onDocumentLoadSuccess}>

                          <Page height="600" pageNumber={pageNumber} />
                        </Document>} */}
                      {/* </a> */}
                    </li>

                    <li
                      onClick={(e) =>
                        PermissionData()?.GET_ORDER_INVOICE ==
                        "GET_ORDER_INVOICE"
                          ? GetLabel(e)
                          : ""
                      }
                      className={`${
                        PermissionData()?.GET_ORDER_INVOICE ==
                        "GET_ORDER_INVOICE"
                          ? " "
                          : "permission_blur"
                      } `}
                    >
                      Download Label
                      {/* <a href='#' target="_blank"> */}
                      {/* {downloadinvoiceshow&&
                        <Document file={PostOrderDownloadInvoiceFileData} onLoadSuccess={onDocumentLoadSuccess}>

                          <Page height="600" pageNumber={pageNumber} />
                        </Document>} */}
                      {/* </a> */}
                    </li>

                    <li
                      onClick={(e) =>
                        PermissionData()?.EDIT_ORDER == "EDIT_ORDER"
                          ? setEditSlideBar((o) => !o)
                          : ""
                      }
                      className={`${
                        PermissionData()?.EDIT_ORDER == "EDIT_ORDER"
                          ? " "
                          : "permission_blur"
                      }`}
                    >
                      Edit Order
                    </li>
                    <li
                      onClick={(e) =>
                        PermissionData()?.VIEW_CALL_BUYER == "VIEW_CALL_BUYER"
                          ? setCallBuyer((o) => !o)
                          : ""
                      }
                      className={`${
                        PermissionData()?.VIEW_CALL_BUYER == "VIEW_CALL_BUYER"
                          ? " "
                          : "permission_blur"
                      }`}
                    >
                      Call Buyer
                    </li>

                    {/* <li onClick={(e) => setAddOrderTag((o) => !o)}>
                      Add Order Tag
                    </li> */}
                    {/* <li
                      onClick={(e) => {
                        navigate("/admin/order/User");
                        dispatch(OrderPageBookNavigate(paramHash?.hash));
                      }}
                    >
                      Clone Order
                    </li> */}
                    {/* {paramHash?.hash !=="#pending" &&<li onClick={(e) =>
                      PermissionData()?.DELETE_ORDER == "DELETE_ORDER" ? CancelOrder(e) : ""}
                      className={`${PermissionData()?.DELETE_ORDER == "DELETE_ORDER" ? " " : "permission_blur"}`}
                    >Cancel Order</li>} */}
                  </ul>
                </div>
              </div>
            </div>

            {editslidebar && (
              <div className="editpopup-outer">
                <div className="editpopup popup-box">
                  <h2>
                    Edit Order Details <span> {param.id}</span>{" "}
                  </h2>
                  <button
                    type="button"
                    className="close-btn"
                    onClick={(e) => setEditSlideBar((o) => !o)}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 17L1 1M17 1L1 17"
                        stroke="black"
                        stroke-opacity="0.25"
                        stroke-width="2"
                        stroke-linecap="round"
                      />
                    </svg>
                  </button>
                  <div className="editpopup-body">
                    <h3>Payment Mode</h3>
                    <div className="row mt-3">
                      <div className="col-6">
                        <label className="prepad-box">
                          Prepaid
                          <input
                            type="radio"
                            name="radio"
                            value={"1"}
                            onChange={(e) => PaymentMethodFun(e, "PREPAID")}
                            checked={paymentmethod !== "COD" ? "checked" : ""}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="prepad-box">
                          COD
                          <input
                            type="radio"
                            name="radio"
                            value={"2"}
                            checked={paymentmethod == "COD" ? "PREPAID" : ""}
                            onChange={(e) => PaymentMethodFun(e, "COD")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                    </div>

                    {/* {paymentmethod === "cod" ? ( */}
                    <div>
                      <hr className="add-border" />
                      <h3>Package Details</h3>
                      <div className="row mt-2">
                        <div className="col-6">
                          <label>Weight</label>
                          <div className="pacform-box mt-1">
                            <input
                              w
                              type="text"
                              value={weight}
                              className={`form-control ${
                                weighterror ? "alert_border" : ""
                              }`}
                              onChange={(e) => WeightFun(e)}
                            />
                            <span> KG</span>
                            {weighterror ? (
                              <div className="text-danger ">
                                <small> please add the waight </small>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-12">
                          <label className="mt-4">Package Dimesnsions</label>
                        </div>
                        <div className="col-4">
                          <div className="pacform-box mt-1">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setLength(e.target.value)}
                              value={length}
                            />
                            <span> CM</span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="pacform-box">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setWidth(e.target.value)}
                              value={width}
                            />
                            <span> CM</span>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="pacform-box">
                            <input
                              type="text"
                              className="form-control"
                              onChange={(e) => setHeight(e.target.value)}
                              value={height}
                            />
                            <span> CM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ) : (
                    ""
                  )} */}

                    <hr className="add-border" />

                    <h3>Pickup Addresss</h3>
                    <div className="mt-3 selectform-box">
                      <select className="form-control">
                        <option>{deliveryaddress?.address}</option>
                        {/* <option>Primary</option>
                    <option>Primary</option>
                    <option>Primary</option> */}
                      </select>
                      <span className="active">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="6" cy="6" r="6" />
                          <path
                            d="M3 5.70652L5.30921 8.25L9.75 3.75"
                            stroke="white"
                            stroke-linecap="round"
                          />
                        </svg>{" "}
                        verify
                      </span>
                    </div>

                    <hr className="add-border" />
                    <h3>Customer Details</h3>
                    <div className="row mt-3">
                      <div className="col-sm-6">
                        <label className="mb-1">Full Name</label>
                        <input
                          type="text"
                          className="form-control"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="col-sm-6 mt-2 mt-sm-0 input_filed_block">
                        <label className="mb-1">Mobile Number</label>

                        {/* <input type='number' className='form-control'
                      placeholder='91+'
                      onChange={(e)=>setNumber(e.target.value)}
                      value={number} /> */}
                        <PhoneInput
                          country={"in"}
                          value={countrypincode + number}
                          onChange={InputCountryCodePickupFun}
                          className="input_filed input_filed_zIndex "
                        />
                      </div>
                      <div className="col-md-6 mt-3 input_filed_block">
                        <label className="mb-1">Email</label>
                        <input
                          type="email"
                          className="form-control input_filed input_filed_zIndex"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Alternate Contact Number</label>

                        <PhoneInput
                          country={"in"}
                          value={altcountrypincode + altnumber}
                          onChange={InputCountryCodePickupFunAlt}
                          className="input_filed"
                        />
                      </div>
                      <div className="col-md-6 mt-3 input_filed_block">
                        <label className="mb-1">Company Name</label>
                        <input
                          type="text"
                          className="form-control input_filed input_filed_zIndex"
                          value={companyname}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Pincode</label>
                        {/* <input type='number' className='form-control'
                      onChange={(e) => DeliveredPincodeFun(e)}
                      // onChange={(e) => setPineCode(e.target.value)}
                      value={pincode} /> */}

                        <input
                          type="text"
                          className={`form-control check-box ${
                            deliverypincodeactive || pincode == "Available"
                              ? "alert_border"
                              : ""
                          }`}
                          placeholder="Delivered Pincode"
                          value={pincode}
                          onChange={(e) => DeliveredPincodeFun(e)}
                        />
                        {deliverypincodeactive || pincode == "Available" ? (
                          <span className="text-danger ">
                            <small> Pincode is not available </small>
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="col-12 mt-3">
                        <label className="mb-1">Delivery Address</label>

                        {/* <input type='text' className='form-control'
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      value={deliveryaddress} /> */}

                        <PlacesAutocomplete
                          value={pickupaddress}
                          onChange={(e) => PickupAddressFun(e)}
                        >
                          {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                          }) => (
                            <div className={pickupaddressactive ? "mb-4" : ""}>
                              <input
                                {...getInputProps({
                                  placeholder: "Search Places ...",
                                  className: "location-search-input",
                                })}
                                className={`form-control ${
                                  pickupaddressactive ? "alert_border" : ""
                                }`}
                              />
                              <div className="autocomplete-dropdown-container">
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.activesi
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}

                                {!suggestions[0]?.description &&
                                pickupaddressactive ? (
                                  <span className="text-danger mb-4 ">
                                    <small>
                                      {" "}
                                      This address is not available{" "}
                                    </small>
                                  </span>
                                ) : (
                                  setPickupAddressActive(false)
                                )}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div>
                      <div className="col-12 mt-3">
                        <label className="mb-1">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          value={landmark}
                          onChange={(e) => setLandMark(e.target.value)}
                        />
                      </div>

                      <div className="col-md-6 mt-3">
                        <label className="mb-1">City</label>
                        <input
                          type="text"
                          className="form-control"
                          // onChange={(e) => setCity(e.target.value)}
                          value={city}
                        />
                      </div>
                      <div className="col-md-6 mt-3 ">
                        <label className="mb-1">State</label>
                        <input
                          type="text"
                          className="form-control cursor-na"
                          // onChange={(e) => setState(e.target.value)}
                          value={state}
                        />
                      </div>
                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                          // onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>
                      <div className="col-12"></div>

                      <div className="col-sm-6 mt-4">
                        <button
                          type="button"
                          className="btn btn-apply"
                          onClick={(e) => UpdateFun(e)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-sm-6 mt-4">
                        <button
                          type="button"
                          className="btn btn-cancel"
                          onClick={(e) => setEditSlideBar((o) => !o)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {callbuyer && (
              <div className="callbuyerpopup_outer ">
                <div className="callbuyerpopup">
                  <button
                    type="button"
                    className="close-btn"
                    onClick={(e) => setCallBuyer((o) => !o)}
                  >
                    <svg
                      width="73"
                      height="73"
                      viewBox="0 0 73 73"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M28.8468 0.557017C20.1183 2.48032 12.3738 7.48163 6.94451 14.7015C3.82271 18.8528 1.04352 25.7631 0.312867 31.1904C-0.944031 40.5273 1.62946 50.441 7.25209 57.9207C9.09525 60.3726 13.2537 64.3503 15.7318 66.0319C20.1234 69.0116 25.747 71.2226 30.8411 71.9721C35.0099 72.5856 41.5011 72.2378 45.4557 71.1892C59.1901 67.548 69.535 56.2758 71.9998 42.2666C72.263 40.7722 72.3473 38.1361 72.2441 34.6422C72.0592 28.3885 71.3915 25.598 68.7921 20.2171C64.1989 10.7095 55.7513 3.7807 45.2312 0.891844C41.4907 -0.135347 32.7946 -0.313143 28.8468 0.557017ZM30.9333 24.2512L36.1468 29.4212L41.4099 24.2512C45.0684 20.6576 46.8963 19.0815 47.405 19.0815C48.4614 19.0815 53.1801 23.8281 53.1801 24.891C53.1801 25.4838 51.8969 26.9791 48.1512 30.7514C45.3853 33.5368 43.1223 35.9578 43.1223 36.1314C43.1223 36.305 45.3853 38.7065 48.1512 41.4682C52.052 45.3628 53.1801 46.6778 53.1801 47.3289C53.1801 47.9512 52.5166 48.8146 50.6219 50.6587C49.2148 52.0279 47.8352 53.1482 47.5565 53.1482C46.8512 53.1482 43.9224 50.6139 39.7248 46.3708L36.1646 42.7728L30.9424 47.9606C28.0701 50.8138 25.4956 53.1482 25.2211 53.1482C24.0985 53.1482 19.1134 48.3817 19.1134 47.3082C19.1134 46.7725 21.7369 43.8077 25.5605 40.0218L29.4788 36.1418L24.836 31.424C22.2826 28.8291 19.9362 26.3082 19.6219 25.8222C19.0687 24.9676 19.0732 24.9011 19.7526 23.8018C20.7204 22.2357 24.2721 19.0815 25.0677 19.0815C25.4758 19.0815 27.6713 21.0165 30.9333 24.2512Z"
                      />
                    </svg>
                  </button>
                  <h2>Call buyer</h2>
                  <div className="callbuyer-box row">
                    <div className="col-5">
                      <p className="mb-0">Order Id</p>
                    </div>

                    <div className="col-7 ">
                      <p className="mb-0">Order Date and Time</p>
                    </div>
                    <div className="col-5 mt-1">
                      <p className="mb-0">
                        <b>{GetAdminOrderCallBuyerData.order_id} </b>{" "}
                      </p>
                    </div>
                    <div className="col-7 mt-1">
                      <p className="mb-0">
                        {" "}
                        <b>
                          {`${callDate.toUTCString().slice(0, -13)}, ${
                            GetAdminOrderCallBuyerData.order_time
                          }`}{" "}
                        </b>{" "}
                      </p>
                    </div>
                    <div className="col-5 mt-3">
                      <p className="mb-0">Products</p>
                    </div>
                    <div className="col-7 mt-3">
                      <p className="mb-0">Total Payment</p>
                    </div>
                    <div className="col-5 mt-1">
                      <p className="mb-0">
                        <b>{GetAdminOrderCallBuyerData.products}</b>{" "}
                      </p>
                    </div>
                    <div className="col-7 mt-1">
                      <p className="mb-0">
                        {" "}
                        <b>{GetAdminOrderCallBuyerData.price}</b>{" "}
                      </p>
                    </div>
                    <hr className="mt-2" />
                    <div className="col-5 ">
                      <p className="mb-0">Buyer Name</p>
                    </div>
                    <div className="col-7 ">
                      <p className="mb-0">Buyer Address</p>
                    </div>
                    <div className="col-5 mt-1">
                      <p className="mb-0">
                        <b>{GetAdminOrderCallBuyerData.buyer_name}</b>{" "}
                      </p>
                    </div>
                    <div className="col-7 mt-1">
                      <p className="mb-0">
                        {" "}
                        <b>
                          {" "}
                          {`${GetAdminOrderCallBuyerData?.delivered_address?.address}, ${GetAdminOrderCallBuyerData?.delivered_address?.city}, ${GetAdminOrderCallBuyerData?.delivered_address?.pincode}, ${GetAdminOrderCallBuyerData?.delivered_address?.state}`}{" "}
                        </b>{" "}
                      </p>
                    </div>
                    <div className="col-5 mt-3">
                      <p className="mb-0">Buyer Contact No.</p>
                    </div>
                    <div className="col-7 "></div>
                    <div className="col-5">
                      <p className="mb-0">
                        <b>{GetAdminOrderCallBuyerData.phone_number}</b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* {addordertag && (
              <div className="callbuyerpopup_outer addordertag-popup ">
                <div className="callbuyerpopup">
                  <h2>Add Order Tag</h2>
                  <button
                    className="close-btn"
                    type="button"
                    onClick={(e) => setAddOrderTag((o) => !o)}
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
                  </button>
                  <div className="popup-body">
                    <div className="row mx-auto">
                      <div className="col-12">
                        <label>Add Tag</label>
                        <input
                          className="form-control mt-1"
                          placeholder="Add new tag and press enter"
                          value={ordertag}
                          onChange={(e) => setOrderTag(e.target.value)}
                        />
                      </div>
                      <div className="col-12">
                        <div className="btngroups">
                          <button
                            type="button"
                            className="cancel-btn"
                            onClick={(e) => setAddOrderTag((o) => !o)}
                          >
                            {" "}
                            Cancel
                          </button>
                          <button
                            type="button"
                            className="save-btn"
                            onClick={(e) => AddTag(e)}
                          >
                            {" "}
                            save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )} */}

            <div className="ordernumber-part">
              <div className="left-part">
                <div className="box summery-table">
                  <table>
                    <tr>
                      <th>
                        <b>Items Summary</b>
                      </th>
                      <th>Product Type</th>
                      <th>Qty</th>
                      <th>Weight</th>
                      <th>Total Price</th>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <img src="/images/icon33.svg" alt="img" />{" "}
                        {GetAdminOrderReturnData?.Item_summary?.name}
                      </td>
                      <td>
                        {GetAdminOrderReturnData?.Item_summary?.product_type}
                      </td>
                      <td>{GetAdminOrderReturnData?.Item_summary?.quantity}</td>
                      <td>{GetAdminOrderReturnData?.Item_summary?.weight}</td>
                      <td>
                        {GetAdminOrderReturnData?.Item_summary?.total_amount}
                      </td>
                    </tr>
                  </table>
                </div>

                <div className=" box customer-part">
                  <h2>Customer Details</h2>
                  <ul>
                    <li>
                      <h4> Customer Name </h4>
                      <p> {GetAdminOrderReturnData?.customer_details?.name} </p>
                    </li>
                    <li>
                      <h4> Phone Number </h4>
                      <p>
                        {
                          GetAdminOrderReturnData?.customer_details?.address
                            ?.phone
                        }
                      </p>
                    </li>
                    <li>
                      <h4> Email Id </h4>
                      <p> {GetAdminOrderReturnData?.customer_details?.email}</p>
                    </li>
                    <li>
                      <h4>Pickup Address </h4>
                      <p>
                        {`${GetAdminOrderReturnData?.customer_details?.address?.address}
                     ${GetAdminOrderReturnData?.customer_details?.address?.city}
                     ${GetAdminOrderReturnData?.customer_details?.address?.pincode}
                     ${GetAdminOrderReturnData?.customer_details?.address?.state}`}{" "}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="right-part">
                <div
                  className={`box delivery-box ${
                    paramHash.hash == "#pending" ? "d-none" : ""
                  }`}
                >
                  <h2>Delivery Partner</h2>
                  <div className=" d-flex align-items-center justify-content-sm-between flex-sm-nowrap flex-wrap justify-content-center ">
                    {paramHash?.hash !== "#cancel" &&
                    deliverypartnerdata == "false" ? (
                      <img
                        src={deliverylogo}
                        alt="img"
                        height={100}
                        width={100}
                      />
                    ) : (
                      ""
                    )}

                    {/* <img src={deliverylogo} alt="img"  height={100} width={100}/> */}
                    {deliverypartnerdata == "false" ? (
                      <h5 className="px-1">
                        {GetAdminOrderReturnData?.delivery_partner}
                      </h5>
                    ) : (
                      ""
                    )}
                    {/* <h5 className="px-1">
                      {GetAdminOrderReturnData?.delivery_partner}
                    </h5> */}
                    <button
                      type="button"
                      className="btn"
                      onClick={(e) => {
                        navigate(
                          `/admin/ordertrack/${param?.id}${paramHash.hash}`
                        );
                        dispatch(OrderPageBookNavigate(paramHash?.hash));
                      }}
                    >
                      Track
                    </button>
                  </div>
                </div>
                <div className="box order-box mt-3">
                  <ul>
                    <li>
                      <h2>Order Summary</h2>
                      <button type="button">On the way</button>
                    </li>
                    <li className="mt-4 pt-1">
                      <h5>Order Created</h5>
                      <p>{date.toUTCString().slice(0, -13)}</p>
                    </li>
                    <li>
                      <h5>Order Time</h5>
                      <p>{GetAdminOrderReturnData?.order_summary?.time}</p>
                    </li>
                    <li>
                      <h5>COD Amount</h5>
                      <p>
                        {GetAdminOrderReturnData?.order_summary?.cod_amount} /-
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="box order-box mt-3">
                  <li className="mb-0">
                    <h5>Total</h5>
                    <h5>
                      {GetAdminOrderReturnData?.order_summary?.total_amount} /-{" "}
                    </h5>
                  </li>
                </div>

                <div className="box order-box mt-3">
                  <ul>
                    <li>
                      <h2>Delivery Address</h2>
                    </li>
                    <li>
                      <h5>Address Line: </h5>
                      <p>
                        {GetAdminOrderReturnData?.delivered_address?.address}
                      </p>
                    </li>

                    <li>
                      <h5>Street Name:</h5>
                      <p>{`${GetAdminOrderReturnData?.delivered_address?.city}, ${GetAdminOrderReturnData?.delivered_address?.state}`}</p>
                    </li>
                    <li>
                      <h5>Postcode:</h5>
                      <p>
                        {GetAdminOrderReturnData?.delivered_address?.pincode}
                      </p>
                    </li>
                    <li>
                      <h5>Phone Number</h5>
                      <p>{GetAdminOrderReturnData?.delivered_address?.phone}</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orderinner;
