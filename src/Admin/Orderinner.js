import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import PhoneInput from "react-phone-input-2";
import Popup from "reactjs-popup";

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
  GetGoogleCityState,
  DeleteAdminOrder,
  getOrderAddress,
  PostAddOrderTag,
  PostPincodesAvailability,
  PostOrderDownloadLabelGenerationFile,
  
} from "../Redux/action/ApiCollection";
import { PermissionData } from "../Permission";


import { Document, Page } from "react-pdf";

const Orderinner = () => {
  const [editslidebar, setEditSlideBar] = useState(false);
  const [addordertag, setAddOrderTag] = useState(false);
  const [filterpincodedata, setFilterPincodeData] = useState("");
  const [deliverpincodeactive, setDeliverPinCodeActive] = useState(false)

  const [callbuyer, setCallBuyer] = useState(false);
  const [pickupModalStatus, setPickUpModalStatus] = useState(false)
  const [pickuppopup, setPickUpPopup] = useState(false)
  const [pickuppatchobjectid, setPatchObjectId] = useState(null)
  const [pickupname, setPickupName] = useState('')
  const [pickupnumber, setPickupNumber] = useState('')
  const [pickupcountrycode, setPickupCountryCode] = useState("");
  const [delivername, setDeliverName] = useState('')
  const [delivercountrycode, setDeliverCountryCode] = useState("");
  const [delivernumber, setDeliverNumber] = useState('')
  const [delivercity, setDeliverCity] = useState('')
  const [deliverstate, setDeliverState] = useState('')
  const [pickupcity, setPickupCity] = useState('')
  const [pickupstate, setPickupState] = useState('')
  const [pincode, setPineCode] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [altnumber, setAltNumber] = useState("");
  const [phone, setPhone] = useState("")
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
  const [pickuppincode, setPickupCodee] = useState('')

  const [paymentmethod, setPaymentMethod] = useState("");
  const [pickuppincodeactive, setPickUpPinCodeActive] = useState(false)
  const [pickupaddress, setPickupAddress] = useState('')

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
  const OrderDetails = useSelector(state => state.orderDetailsReducer.orderDetails)

  // label generation 
  const PostOrderDownloadLabelGenerationFileData = useSelector(
    (state) =>
      state.PostOrderDownloadLabelGenerationFileReducer.PostOrderDownloadLabelGenerationFileData
        ?.data
  );
  const PostPincodesAvailabilityReducer = useSelector(state => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData?.data)

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
  const GetGoogleCityStateDataReducer = useSelector(state => state.GetGoogleCityStateReducer?.GetGoogleCityStateData)


  const PostPincodesAvailabilityData = useSelector(
    (state) => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData
  );
  const HeaderToggleClassAddData = useSelector(
    (state) =>
      state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );
  let deliverypartnerdata = reactLocalStorage.get("Is_Business");
  // const ToggleSideBarTrueFalse =useSelector((state)=>state.ToggleSideBarTrueFalseReducer.ToggleSideBarTrueFalseData)

  //  let Pending_Set = {
  //             "product_order_id":allData.product_order_id,
  //             "delivery_partner": allData.name,
  //             "awb_number" : awbnumber,
  //           };


  useEffect(() => {

    var parsedLocalities = [];
    if (GetGoogleCityStateDataReducer.length) {
      for (var i = 0; i < GetGoogleCityStateDataReducer.length; i++) {
        var result = GetGoogleCityStateDataReducer[i];

        var locality = {};
        for (var j = 0; j < result.address_components.length; j++) {
          var types = result.address_components[j].types;
          for (var k = 0; k < types.length; k++) {
            if (types[k] == 'locality') {
              locality.city = result.address_components[j].long_name;
            } else if (types[k] == 'administrative_area_level_1') {
              locality.state = result.address_components[j].short_name;
            }
          }
        }
        parsedLocalities.push(locality);
      }
    }
  }, [GetGoogleCityStateDataReducer])



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
    setPickupCodee(GetAdminOrderReturnData?.delivered_address?.pincode);
    setPickupState(GetAdminOrderReturnData?.customer_details?.address?.state);
    setCountry(GetAdminOrderReturnData?.delivered_address?.country);
    setPickupCity(GetAdminOrderReturnData?.customer_details?.address?.city);
    setName(GetAdminOrderReturnData?.customer_details?.name);
    setEmail(GetAdminOrderReturnData?.customer_details?.email);
    setNumber(GetAdminOrderReturnData?.customer_details?.phone_number);
    setDeliveryAddress(GetAdminOrderReturnData?.customer_details?.address);
    setCompanyName(GetAdminOrderReturnData?.Item_summary?.name);
    setWeight(GetAdminOrderReturnData?.Item_summary?.weight);
    setLandMark(GetAdminOrderReturnData?.delivered_address?.landmark);
    setCountryPinCode(GetAdminOrderReturnData?.delivered_address?.country_code);
    setPhone(GetAdminOrderReturnData?.delivered_address?.phone)
    setPickupAddress(
      GetAdminOrderReturnData?.delivered_address?.address +
      "," +
      GetAdminOrderReturnData?.delivered_address?.city +
      "," +
      GetAdminOrderReturnData?.delivered_address?.state

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
        delivered_pincode: pickuppincode,
        city: pickupcity,
        state: pickupstate,
        country: country,
        landmark: landmark,
        contry_code: countrypincode,
        phone: phone
      };


      // !deliverypincodeactive && pincode && !pickupaddressactive && !weighterror
      //   ? 
      dispatch(PatchAdminOrderEdit(payloadData))
      // : toast.warn("please fill all the fields correctly");
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
        delivered_pincode: pickuppincode,
        city: pickupcity,
        state: pickupstate,
        country: country,
        landmark: landmark,
        contry_code: countrypincode,
        phone: phone
      };

      // !deliverypincodeactive && pincode && !pickupaddressactive && !weighterror
      //   ? 
      dispatch(PatchAdminOrderEdit(payloadData))
      // : toast.warn("please fill all the fields correctly");
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

  // const PickupAddressFun = async (address, id) => {

  //   setPickUpAddress(address);
  //   if (address == undefined) {
  //     setPickUpAddress(" ");
  //     setPickupAddressActive(true);
  //   }
  //   const results = await geocodeByAddress(address);

  //   if (results[0]?.address_components.at(-1)?.long_name == pincode) {
  //     let splitData = address.split(",");
  //     setCity(splitData[splitData.length - 3]);
  //     setState(splitData[splitData.length - 2]);
  //     setPickupAddressActive(false);
  //   } else {
  //     setPickupAddressActive(true);
  //     setCity(" ");
  //     setState(" ");
  //   }
  // };


  // const DeliverAddressFun = async (address, id) => {
  //   setPickUpAddress(address);
  //   if (address == undefined) {
  //     setPickUpAddress(" ")
  //     setPickupAddressActive(true)
  //   }
  //   const results = await geocodeByAddress(address);
  //   if (results[0]?.address_components.at(-1).long_name === pincode) {
  //     let splitData = address.split(",")
  //     setPickupAddressActive(false)
  //   }
  //   else {
  //     setPickupAddressActive(true)
  //   }

  // }

  // const DeliveredPincodeFun = (e) => {
  //   setPineCode(e.target.value);

  //   let payload = {
  //     "pincode": e.target.value,
  //     "check_type": "DELIVERED"
  //   };

  //   if (e.target.value.length === 6) {
  //     PickupAddressFun();
  //     dispatch(PostPincodesAvailability(payload));
  //   } else {
  //     setDeliveryPinCodeActive(true);
  //   }
  // };

  useEffect(() => {


    // dispatch(getOrderAddress())

    if (PostPincodesAvailabilityReducer) {
      if (PostPincodesAvailabilityReducer.message !== "Available") {
        // setOrderType(null)
      }
      else {
        // setOrderType(PostPincodesAvailabilityReducer?.method)
      }


      // This if is used for open price , after selecting the cod in Order type the price filed is open 

      // if (PostPincodesAvailabilityReducer.method == "COD" && PostPincodesAvailabilityReducer.message === "Available") {
      //   setAddAmountFieldOpenClose(true)
      // }
      // else {
      //   setAddAmountFieldOpenClose(false)
      //   setAddAmount(null)
      // }


      if (PostPincodesAvailabilityReducer?.type == "pickup") {
        if (PostPincodesAvailabilityReducer?.message !== "Pin code is not available") {
          setPickUpPinCodeActive(false)
          setPickupCity(PostPincodesAvailabilityReducer?.city)
          setPickupState(PostPincodesAvailabilityReducer?.state)

        }

        else {
          setPickupCity("")
          setPickupState("")
          setPickUpPinCodeActive(true)

        }
      }
      else if (PostPincodesAvailabilityReducer?.type === "delivered") {
        if (PostPincodesAvailabilityReducer?.message !== "Pin code is not available") {
          setDeliverPinCodeActive(false)

          setDeliverCity(PostPincodesAvailabilityReducer?.city)
          setDeliverState(PostPincodesAvailabilityReducer?.state)
        } else {
          setDeliverPinCodeActive(true)

          setDeliverCity("")
          setDeliverState("")
        }

      }

      //PostPincodesDeliveredReducer && PostPincodesDeliveredReducer == "Pincode Available" ? setDeliveryPinCodeActive(false) : setDeliveryPinCodeActive(true)
    } else {

      // setOrderType(null)

    }



  }, [PostPincodesDeliveredReducer, PostPincodesAvailabilityReducer,])


  useEffect(() => {
    if (PostPincodesAvailabilityData) {
      if (PostPincodesAvailabilityData?.data?.message == "Available") {
        setDeliveryPinCodeActive(false);
      } else {
        // PickupAddressFun();
        setDeliveryPinCodeActive(true);
      }
      //PostPincodesDeliveredReducer && PostPincodesDeliveredReducer == "Pincode Available" ? setDeliveryPinCodeActive(false) : setDeliveryPinCodeActive(true)
    }
  }, [PostPincodesAvailabilityData]);
  useEffect(() => {
    if (GetAdminOrderReturnData?.delivery_partner === "SKYKING") {
      setDeliveryLogo("/images/SKYYKING.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "DTDC") {
      setDeliveryLogo("/images/DTDC.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "ANJANI") {
      setDeliveryLogo("/images/ANJANI.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "DHL") {
      setDeliveryLogo("/images/DHL.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "XPRESSBEES") {
      setDeliveryLogo("/images/XPRESS.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "DELHIVERY") {
      setDeliveryLogo("/images/DELHIVERY.png")
    } else if (GetAdminOrderReturnData?.delivery_partner === "NITRO") {
      setDeliveryLogo("/images/NITRO.png")
    }

  }, [GetAdminOrderReturnData])

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

  const date = new Date(GetAdminOrderReturnData?.order_summary?.order_created)
  const callDate = new Date(GetAdminOrderCallBuyerData?.order_date)
  const timepart = new Date(GetAdminOrderReturnData?.order_summary?.order_created).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
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



  const PickUpPincodeFun = (e) => {


    // if(e.target.value.length==1){
    let payload1 = {
      "page_type": "pickup"
    }
    dispatch(getOrderAddress(payload1))
    // dispatch(PostOrderAddress(payload))

    // }

    if (e.target.value.length == 7) return false;
    setPickupCodee(e.target.value)

    let payload = {
      "pincode": e.target.value,
      "check_type": "PICKUP"
    }

    setPickUpModalStatus(true)


    let arrayData = []
    arrayData = OrderDetails?.data?.filter((item) => {
      if (item?.pincode == e.target.value) {
        setPickUpPopup(true)//when pincode is availabe then only it will open
        return item
      }
    })
    setFilterPincodeData(arrayData)

    PickupAddressFunn()
    if (e.target.value.length === 6) {
      // dispatch(PostPincodesDelivered(payload))
      dispatch(GetGoogleCityState(e.target.value))
      dispatch(PostPincodesAvailability(payload))
    }
    else {
      setPickUpPinCodeActive(true)
    }
  }

  const PickupAddressFunn = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter) 
    setPickupAddress(address);
    if (address == undefined) {
      setPickupAddress(" ")
      setPickupAddressActive(true)
    }
    const results = await geocodeByAddress(address);
    if (results[0]?.address_components.at(-1).long_name === pickuppincode) {
      let splitData = address.split(",")
      // setPickupCity(splitData[splitData.length - 3])
      // setPickupState(splitData[splitData.length - 2])
      setPickupAddressActive(false)
    }
    else {
      setPickupAddressActive(true)
      // setPickupCity(" ")
      // setPickupState(" ")
    }
  };


  const AddressSelectPickup = (e, objectId) => {

    let splitCountruCode = objectId.phone_number.split("-")
    setPatchObjectId(objectId.id)
    setPickupName(objectId.name)
    setPickupNumber(splitCountruCode[1])
    setPickupAddress(objectId.address)
    // setPickupCity(objectId.city)
    // setPickupState(objectId.state)
    setPickupCountryCode(splitCountruCode[0])



    setPickUpPopup(false)
  }
  const AddressSelectDelivery = (e, objectId) => {
    let splitCountruCode = objectId.phone_number.split("-")
    setPatchObjectId(objectId.id)
    setDeliverName(objectId.name)
    setDeliverCountryCode(splitCountruCode[0])
    setDeliverNumber(splitCountruCode[1])
    setDeliveryAddress(objectId.address)
    setDeliverCity(objectId.city)
    setDeliverState(objectId.state)
    setPickUpPopup(false)
  }
const TrackOrder=()=>{
  navigate(`/admin/ordertrack/${param?.id}${paramHash.hash}`)
  dispatch(OrderPageBookNavigate(paramHash?.hash));
}
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
                    <li onClick={(e) =>
                      PermissionData()?.GET_ORDER_INVOICE == "GET_ORDER_INVOICE" ?
                        Invoice(e) : ""}
                      className={`${PermissionData()?.GET_ORDER_INVOICE == "GET_ORDER_INVOICE" ? " " : "permission_blur"}`}
                    >
                      Download Invoice
                      {/* <a href='#' target="_blank"> */}
                      {/* {downloadinvoiceshow&&
                        <Document file={PostOrderDownloadInvoiceFileData} onLoadSuccess={onDocumentLoadSuccess}>

                          <Page height="600" pageNumber={pageNumber} />
                        </Document>} */}
                      {/* </a> */}
                    </li>

                    <li onClick={(e) =>
                      PermissionData()?.GET_ORDER_INVOICE == "GET_ORDER_INVOICE" ?
                        GetLabel(e) : ""}
                      className={`${PermissionData()?.GET_ORDER_INVOICE == "GET_ORDER_INVOICE" ? " " : "permission_blur"} `}
                    >
                      Download Label
                      {/* <a href='#' target="_blank"> */}
                      {/* {downloadinvoiceshow&&
                        <Document file={PostOrderDownloadInvoiceFileData} onLoadSuccess={onDocumentLoadSuccess}>

                          <Page height="600" pageNumber={pageNumber} />
                        </Document>} */}
                      {/* </a> */}
                    </li>

                    <li onClick={(e) =>
                      PermissionData()?.EDIT_ORDER == "EDIT_ORDER" ? setEditSlideBar((o) => !o) : ""}
                      className={`${PermissionData()?.EDIT_ORDER == "EDIT_ORDER" ? " " : "permission_blur"}`}
                    >
                      Edit Order
                    </li>
                    <li onClick={(e) =>
                      PermissionData()?.VIEW_CALL_BUYER == "VIEW_CALL_BUYER" ? setCallBuyer((o) => !o) : ""}
                      className={`${PermissionData()?.VIEW_CALL_BUYER == "VIEW_CALL_BUYER" ? " " : "permission_blur"}`}
                    >Call Buyer</li>

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
                              type="text"
                              value={weight}
                              className={`form-control ${weighterror ? "alert_border" : ""
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




                      {/* 
                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Pincode</label>
                        <input
                          type="text"
                          className={`form-control check-box ${deliverypincodeactive || pincode == "Available"
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
                      </div> */}

                      {/* 

                      <div className="col-12 mt-3">
                        <label className="mb-1">Delivery Address</label>

                        

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
                                className={`form-control ${pickupaddressactive ? "alert_border" : ""
                                  }`}
                              />
                              <div className="autocomplete-dropdown-container">
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                 
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
                                    <small> This address is not available </small>
                                  </span>
                                ) : (
                                  setPickupAddressActive(false)
                                )}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      </div> */}



                      <div className="col-md-6 mt-3">
                        <label>Pincode</label>
                        <input type="text" className={`form-control check-box ${pickuppincodeactive && pickuppincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                          value={pickuppincode} onChange={(e) => PickUpPincodeFun(e)} />
                        {pickuppincodeactive && pickuppincode ? <span className='text-danger '>
                          <small> Pincode is not available </small></span> : ""}
                      </div>


                      <div className="col-md-12 ">
                        <div className="col-12 mt-3">
                          <label>Address</label>

                          <PlacesAutocomplete
                            value={pickupaddress}
                            onChange={(e) => PickupAddressFunn(e)}
                          >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div
                                className={pickupaddressactive ? "mb-4" : ""}
                              >
                                <input
                                  {...getInputProps({
                                    placeholder: 'Search Places',
                                    className: 'location-search-input',
                                  })}
                                  className={`form-control `}
                                // ${pickupaddressactive ? "alert_border" : ""} 
                                />
                                <div className="autocomplete-dropdown-container">

                                  {suggestions.map(suggestion => {

                                    const className = suggestion.activesi
                                      ? 'suggestion-item--active'
                                      : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
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

                                  {/* {!suggestions[0]?.description && pickupaddressactive ? <span className='text-danger mb-4 '>
                                <small> This address is not available </small></span> : setPickupAddressActive(false)} */}

                                </div>
                              </div>
                            )}
                          </PlacesAutocomplete>
                        </div>

                      </div>

                      <div className="col-12 mt-2">
                        <label className="mb-1">Landmark</label>
                        <input
                          type="text"
                          className="form-control"
                          value={landmark}
                          onChange={(e) => setLandMark(e.target.value)}
                        />
                      </div>
                      <div className="row mt-2 m-0 p-0">
                        <div className="col-md-6 mt-3 ">
                          <label>City</label>
                          <input
                            type="text"
                            name="pickupcity"
                            className="form-control mt-1"
                            placeholder="City"
                            value={pickupcity}
                            onChange={(e) => setPickupCity(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mt-3 ">
                          <label>State</label>
                          <input
                            type="text"
                            name="pickupstate"
                            className="form-control mt-1"
                            placeholder="State"
                            value={pickupstate}
                            onChange={(e) => setPickupState(e.target.value)}
                          />
                        </div>
                      </div>


                      {/* <div className="col-md-6 mt-3">
                        <label className="mb-1">City</label>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setCity(e.target.value)}
                          value={city}
                        />
                      </div>
                      <div className="col-md-6 mt-3 ">
                        <label className="mb-1">State</label>
                        <input
                          type="text"
                          className="form-control cursor-na"
                          onChange={(e) => setState(e.target.value)}
                          value={state}
                        />
                      </div> */}
                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Country</label>
                        <input
                          type="text"
                          className="form-control"
                          value={country}
                        // onChange={(e) => setCountry(e.target.value)}
                        />
                      </div>


                      <div className="col-md-6 mt-3">
                        <label className="mb-1">Phone Number</label>

                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => setPhone(e.target.value)}
                          value={phone}

                        />

                        {/* <PhoneInput
                          country={"in"}
                          value={phone}
                          onChange={setPhone()}
                          className="input_filed"
                        /> */}
                      </div>
                      <div className="col-12"></div>

                      <div className="col-sm-6 mt-4 mb-md-4">
                        <button
                          type="button"
                          className="btn btn-apply"
                          onClick={(e) => UpdateFun(e)}
                        >
                          Update
                        </button>
                      </div>
                      <div className="col-sm-6 mt-4">
                        <button type="button" className="btn btn-cancel" onClick={(e) => setEditSlideBar((o) => !o)}>
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
                          {/* {`${callDate.toUTCString().slice(0, -13)},${GetAdminOrderCallBuyerData.order_time}`} */}
                          {`${callDate.toUTCString().slice(0, -13)}`},{timepart}
                          {" "}
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
                          GetAdminOrderReturnData?.customer_details?.address?.phone
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
                <div className={`box delivery-box mb-3 ${paramHash.hash == "#pending" ? "d-none" : ""}`}>
                  <h2>Delivery Partner</h2>
                  <div className=" d-flex align-items-center justify-content-sm-between  justify-content-center ">

                    {paramHash?.hash !== "#cancel" && deliverypartnerdata == "false" ? <img src={deliverylogo} alt="img" height={100} width={100} /> : ""}

                    {/* <img src={deliverylogo} alt="img"  height={100} width={100}/> */}
                    {deliverypartnerdata == "false" ? <h5 className="px-1">
                      {GetAdminOrderReturnData?.delivery_partner}
                    </h5> : ""}
                    {/* <h5 className="px-1">
                      {GetAdminOrderReturnData?.delivery_partner}
                    </h5> */}
                    <button type="button" className={`btn btn-ship  ${PermissionData()?.VIEW_TRACK_SEARCH_DASHBOARD == "VIEW_TRACK_SEARCH_DASHBOARD" ? " " : "permission_blur"}`} onClick={((e) => PermissionData()?.VIEW_TRACK_SEARCH_DASHBOARD == "VIEW_TRACK_SEARCH_DASHBOARD" ?
                      PermissionData()?.VIEW_TRACK_SEARCH_DASHBOARD == "VIEW_TRACK_SEARCH_DASHBOARD" ?TrackOrder(): ""
                    :"")}>
                      Track
                    </button>
                  </div>
                </div>
                <div className="box order-box mb-3">
                  <ul>
                    <li>
                      <h2>Order Summary</h2>
                      {/* {GetAdminOrderReturnData?.order_summary?.status == "DELIVERED"  ? "" : <button type="button">On the way</button>} */}
                    </li>
                    <li className="mt-4 pt-1">
                      <h5>Order Created</h5>
                      <p>
                        {date.toUTCString().slice(0, -13)}
                      </p>
                    </li>
                    <li>
                      <h5>Order Time</h5>
                      <p>{timepart}</p>
                      {/* <p>{GetAdminOrderReturnData?.order_summary?.time}</p> */}
                    </li>
                    <li>
                      <h5>COD Amount</h5>
                      <p>
                        {GetAdminOrderReturnData?.order_summary?.cod_amount} /-
                      </p>
                    </li>
                  </ul>
                </div>
                <div className="box order-box mb-3">
                  <li className="mb-0">
                    <h5>Total</h5>
                    <h5>
                      {GetAdminOrderReturnData?.order_summary?.total_amount} /-{" "}
                    </h5>
                  </li>
                </div>

                <div className="box order-box">
                  <ul>
                    <li>
                      <h2>Delivery Address</h2>
                    </li>
                    <li>
                      <h5>Name: </h5>
                      <p>
                        {GetAdminOrderReturnData?.delivered_address?.name}
                      </p>
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
                      <p>
                        {GetAdminOrderReturnData?.delivered_address?.phone}
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Popup open={pickuppopup} position="" model className="sign_up_loader">
          <div className="container">
            <div className='loader-sec adresloader-sec'>
              <div className="justify-content-center   bg-white">
                <div className='d-flex justify-content-between px-3 pt-3'>
                  <h3>
                    Select Address
                  </h3>
                  <h4 className='pe-3' role="button" onClick={(e) => setPickUpPopup(false)}> X </h4>
                </div>
                <hr className='my-2' />
                <div className='px-3 py-1 text-warning'>
                  <span className='px-2'>
                    <svg width="15" height="15" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.5607 0.0168947C3.63832 0.10573 2.74429 0.437784 2.01918 0.960827C1.7398 1.16235 1.27777 1.59894 1.065 1.8625C-5.90139e-06 3.18158 -0.283358 4.90549 0.292324 6.56372C0.749743 7.88133 1.64914 9.16642 3.03126 10.4773C3.62086 11.0365 4.4823 11.7374 4.83983 11.9488C5.02196 12.0565 5.10964 12.0189 5.66571 11.5945C6.70124 10.8042 7.75647 9.76605 8.44956 8.85573C9.21981 7.84408 9.74991 6.72869 9.9334 5.73376C10.0327 5.19515 10.0198 4.4179 9.90229 3.8579C9.56115 2.23226 8.29422 0.832679 6.65619 0.271824C6.03962 0.0607362 5.18503 -0.04324 4.5607 0.0168947ZM5.37565 0.589728C6.46519 0.689899 7.40563 1.12143 8.15676 1.86577C9.30664 3.0053 9.69947 4.61704 9.21053 6.18933C8.95991 6.9952 8.52965 7.78783 7.90858 8.58775C7.20709 9.49127 6.17407 10.4912 5.15177 11.2563L5.00409 11.3668L4.76167 11.1836C4.34857 10.8714 3.79054 10.3937 3.38492 10.0051C1.14175 7.85592 0.218841 5.71133 0.719162 3.81047C1.00622 2.71993 1.75237 1.75231 2.75666 1.16832C3.28085 0.863497 3.95944 0.649729 4.58971 0.590854C4.93154 0.558937 5.03889 0.558777 5.37565 0.589728ZM4.50545 2.47783C3.91162 2.59424 3.32234 2.96521 2.96968 3.44462C2.47696 4.11444 2.36604 5.0114 2.68265 5.76608C2.91424 6.31809 3.33116 6.75369 3.88388 7.02111C4.29638 7.22067 4.51738 7.26979 5.0027 7.26979C5.48678 7.26979 5.70707 7.22105 6.12153 7.02223C6.66005 6.7639 7.09435 6.31418 7.3135 5.78792C7.44845 5.46377 7.49481 5.23288 7.49646 4.87623C7.49834 4.47364 7.43428 4.18227 7.26825 3.83858C6.92691 3.13203 6.25432 2.61954 5.47965 2.47577C5.22873 2.4292 4.74841 2.43021 4.50545 2.47783ZM5.38371 3.04132C5.85522 3.132 6.32198 3.43833 6.59444 3.8359C6.95189 4.35747 7.01059 5.07351 6.74119 5.62609C6.48916 6.14302 6.03045 6.51709 5.47233 6.66076C5.23078 6.72293 4.77289 6.72266 4.53308 6.6602C3.8386 6.47934 3.28958 5.92963 3.13643 5.26185C3.06452 4.94823 3.09137 4.53059 3.20223 4.23916C3.53525 3.36351 4.44932 2.86161 5.38371 3.04132ZM4.87839 3.74787C4.73502 3.80835 4.71325 3.86897 4.70297 4.23586L4.69327 4.58145H4.34862C4.00449 4.58145 4.0038 4.58158 3.92319 4.65978C3.85993 4.72115 3.84244 4.76215 3.84244 4.84913C3.84244 5.09107 3.93924 5.14421 4.37976 5.14421H4.69883V5.43984C4.69883 5.80373 4.73449 5.90484 4.8843 5.96589C4.97552 6.00303 5.00301 6.00378 5.09939 5.97162C5.26752 5.91553 5.3065 5.81657 5.30653 5.44568L5.30658 5.14421H5.62565C5.99627 5.14421 6.08948 5.11269 6.15269 4.96595C6.20313 4.84881 6.16611 4.716 6.06056 4.63547C5.99832 4.58799 5.94881 4.58145 5.65096 4.58145H5.31213L5.30244 4.23366C5.29318 3.90089 5.28968 3.88288 5.22103 3.81629C5.14357 3.74117 4.97436 3.70741 4.87839 3.74787Z" fill="#FFCD14" />
                    </svg>
                  </span>
                  <span className='mt-2'> <small> <b>
                    Add New Address</b>
                  </small>
                  </span>
                </div>
                <hr className='my-2' />
                <div className='px-3 pb-4 addressdetails-data'>
                  <b> Address Details </b>
                  {filterpincodedata && filterpincodedata?.map((item, id) => {
                    return <div className='d-flex justify-content-between'>

                      <div className='d-flex pt-3'>
                        <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="15.5" cy="15.5" r="15" fill="white" stroke="#D9D9D9" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M15.4728 8.02253C14.366 8.14097 13.2931 8.58371 12.423 9.2811C12.0878 9.5498 11.5333 10.1319 11.278 10.4833C9.99999 12.2421 9.65997 14.5407 10.3508 16.7516C10.8997 18.5084 11.979 20.2219 13.6375 21.9697C14.345 22.7153 15.3788 23.6498 15.8078 23.9317C16.0264 24.0754 16.1316 24.0252 16.7989 23.4593C18.0415 22.4056 19.3078 21.0214 20.1395 19.8076C21.0638 18.4588 21.6999 16.9716 21.9201 15.645C22.0393 14.9269 22.0238 13.8905 21.8827 13.1439C21.4734 10.9763 19.9531 9.11024 17.9874 8.36243C17.2475 8.08098 16.222 7.94235 15.4728 8.02253ZM16.4508 8.7863C17.7582 8.91987 18.8868 9.49524 19.7881 10.4877C21.168 12.0071 21.6394 14.156 21.0526 16.2524C20.7519 17.3269 20.2356 18.3838 19.4903 19.4503C18.6485 20.655 17.4089 21.9883 16.1821 23.0084L16.0049 23.1558L15.714 22.9115C15.2183 22.4952 14.5486 21.8583 14.0619 21.3401C11.3701 18.4746 10.2626 15.6151 10.863 13.0806C11.2075 11.6266 12.1028 10.3364 13.308 9.55776C13.937 9.15133 14.7513 8.86631 15.5076 8.78781C15.9179 8.74525 16.0467 8.74504 16.4508 8.7863ZM15.4065 11.3038C14.6939 11.459 13.9868 11.9536 13.5636 12.5928C12.9723 13.4859 12.8392 14.6819 13.2192 15.6881C13.4971 16.4241 13.9974 17.0049 14.6607 17.3615C15.1557 17.6276 15.4209 17.6931 16.0032 17.6931C16.5841 17.6931 16.8485 17.6281 17.3458 17.363C17.9921 17.0185 18.5132 16.4189 18.7762 15.7172C18.9381 15.285 18.9938 14.9772 18.9958 14.5016C18.998 13.9649 18.9211 13.5764 18.7219 13.1181C18.3123 12.176 17.5052 11.4927 16.5756 11.301C16.2745 11.2389 15.6981 11.2403 15.4065 11.3038ZM16.4605 12.0551C17.0263 12.176 17.5864 12.5844 17.9133 13.1145C18.3423 13.81 18.4127 14.7647 18.0894 15.5015C17.787 16.1907 17.2365 16.6895 16.5668 16.881C16.2769 16.9639 15.7275 16.9635 15.4397 16.8803C14.6063 16.6391 13.9475 15.9062 13.7637 15.0158C13.6774 14.5976 13.7096 14.0408 13.8427 13.6522C14.2423 12.4847 15.3392 11.8155 16.4605 12.0551Z" fill="#777777" />
                        </svg>
                        <div className='px-4 '>
                          <h6 className='p-0 m-0'><small><b>  {item?.name}</b></small></h6>
                          <span><small>{item?.address}</small></span>
                        </div>

                      </div>

                      <div className='text-warning pe-3 pt-4  ' style={{ cursor: "pointer" }}
                        onClick={(e) =>
                          pickupModalStatus ?
                            AddressSelectPickup(e, item)
                            : AddressSelectDelivery(e, item)
                        }>
                        <b>  select</b>
                      </div>

                    </div>
                  })}
                </div>
                <div>

                </div>
              </div>
            </div>
          </div>
        </Popup>
      </div>
    </>
  );
};

export default Orderinner;
