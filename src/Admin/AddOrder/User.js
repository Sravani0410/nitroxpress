import React, { useEffect, useState, useRef } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import PhoneInput from 'react-phone-input-2'
import Sidebar from "../Sidebar";
import Header from "../Header";
import Select from 'react-select';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { GetAdminCloneOrder, GetAdminOrderGenerateOrderId, GetAdminOrderPaymentOrder, GetAdminOrderSummary, GetGoogleCityState, getOrderAddress, PostPincodesAvailability, PostPincodesDelivered, GetB2bCompanyInfo } from "../../Redux/action/ApiCollection";
import Popup from "reactjs-popup";

const User = () => {


  const [ordertype, setOrderType] = useState(null)
  const [pickupform, setPickupForm] = useState(null)
  const [pickupname, setPickupName] = useState('')
  const [pickupcountrycode, setPickupCountryCode] = useState("");
  const [pickupnumber, setPickupNumber] = useState('')
  const [pickuppincode, setPickupCode] = useState('')
  const [pickupcity, setPickupCity] = useState('')
  const [pickupstate, setPickupState] = useState('')
  const [pickupaddress, setPickupAddress] = useState('')
  const [delivername, setDeliverName] = useState('')
  const [delivercountrycode, setDeliverCountryCode] = useState("");
  const [delivernumber, setDeliverNumber] = useState('')
  const [deliverpincode, setDeliverPincode] = useState('')
  const [delivercity, setDeliverCity] = useState('')
  const [deliverstate, setDeliverState] = useState('')
  const [deliveraddress, setDeliveryAddress] = useState('')

  const [pickuppincodeactive, setPickUpPinCodeActive] = useState(false)
  const [pickupaddressactive, setPickupAddressActive] = useState(false)
  const [deliverpincodeactive, setDeliverPinCodeActive] = useState(false)
  const [deliveraddressactive, setDeliverAddressActive] = useState(false)

  // search functionality
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [CompanyName, setCompanyName] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [OpenPathSearch, setOpenPathSearch] = useState(false);
  const [selectedOptionclass, setSelectedOptionClass] = useState("");
  const [pageData, setPageData] = useState("")
  const [selectedOption, setSelectedOption] = useState("");

  // const [addamount, setAddAmount] = useState(null)

  // const [addamountfieldopenclose, setAddAmountFieldOpenClose] = useState("")


  const [pickuppopup, setPickUpPopup] = useState(false)
  const [pickuppatchobjectid, setPatchObjectId] = useState(null)//
  const [pickupModalStatus, setPickUpModalStatus] = useState(false)//  

  const [filterpincodedata, setFilterPincodeData] = useState("");



  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const GetAdminOrderGenerateOrderIdData = useSelector(state => state.GetAdminOrderGenerateOrderIdReducer.GetAdminOrderGenerateOrderIdData?.data)
  const PostPincodesDeliveredReducer = useSelector(state => state.PostPincodesDeliveredReducer.PostPincodesDeliveredData)
  const GetAdminOrderPaymentOrderData = useSelector(state => state.GetAdminOrderPaymentOrderReducer.GetAdminOrderPaymentOrderData)
  const GetAdminCloneOrderData = useSelector(state => state.GetAdminCloneOrderReducer.GetAdminCloneOrderData?.data)
  const PostPincodesAvailabilityReducer = useSelector(state => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData?.data)
  const GetB2bCompanyInfoData = useSelector(state => state.GetB2bCompanyInfoReducer?.GetB2bCompanyInfoData?.data)
  const GetGoogleCityStateDataReducer = useSelector(state => state.GetGoogleCityStateReducer?.GetGoogleCityStateData)

  const OrderDetails = useSelector(state => state.orderDetailsReducer.orderDetails)


  // .data?.results;
  // console.log("jhdgghdh", GetB2bCompanyInfoData)

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
    console.log("parsedLocalities1212", parsedLocalities)

  }, [GetGoogleCityStateDataReducer])


  const GenerateFun = (e) => {
    dispatch(GetAdminOrderGenerateOrderId())
  }

  const PickUpPincodeFun = (e) => {


    // if(e.target.value.length==1){
      let payload1 ={ 
        "page_type":"pickup" 
        }
        dispatch(getOrderAddress(payload1))
        // dispatch(PostOrderAddress(payload))

    // }

    if (e.target.value.length == 7) return false;
    setPickupCode(e.target.value)

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

    PickupAddressFun()
    if (e.target.value.length === 6) {
      // dispatch(PostPincodesDelivered(payload))
      dispatch(GetGoogleCityState(e.target.value))
      dispatch(PostPincodesAvailability(payload))
    }
    else {
      setPickUpPinCodeActive(true)
    }
  }

  const DeliverpincodeFun = (e) => {
    if (e.target.value.length == 7) return false;
    setDeliverPincode(e.target.value)
    let payload = {
      "pincode": e.target.value,
      "check_type": "DELIVERED"
    }

    setPickUpModalStatus(false)

    // if(e.target.value.length == 1){
      let payload1={
        "page_type":"delivered" 
     }
     dispatch(getOrderAddress(payload1))
    //  dispatch(PostOrderAddress(payload))
    // }


    let arrayData = []

    arrayData = OrderDetails?.data?.filter((item) => {
      if (item?.pincode == e.target.value) {
        setPickUpPopup(true)//when pincode is availabe then only it will open
        return item
      }
    })
    setFilterPincodeData(arrayData)


    DeliverAddressFun()
    if (e.target.value.length === 6) {
      // dispatch(PostPincodesDelivered(payload))
      dispatch(GetGoogleCityState(e.target.value))
      dispatch(PostPincodesAvailability(payload))
    }
    else {
      setDeliverPinCodeActive(true)
    }
  }

  useEffect(() => {
    

    // dispatch(getOrderAddress())

    if (PostPincodesAvailabilityReducer) {

      console.log("PostPincodesAvailabilityReducer11", PostPincodesAvailabilityReducer)

      if (PostPincodesAvailabilityReducer.message !== "Available") {

        console.log("PostPincodesAvailabilityReducer111")

        setOrderType(null)
      }
      else {
        setOrderType(PostPincodesAvailabilityReducer?.method)
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

      setOrderType(null)

    }


    GetAdminOrderGenerateOrderIdData && reactLocalStorage.set("product_order_id", GetAdminOrderGenerateOrderIdData?.product_order_id);
    if (GetAdminOrderPaymentOrderData.status == 200) {
      navigate("/admin/order/orderdetails")
    }

  }, [PostPincodesDeliveredReducer, PostPincodesAvailabilityReducer, GetAdminOrderGenerateOrderIdData, GetAdminOrderPaymentOrderData])



  const PickupAddressFun = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter) 
    setPickupAddress(address);
    if (address == undefined) {
      setPickupAddress(" ")
      setPickupAddressActive(true)
    }
    const results = await geocodeByAddress(address);
    console.log(results)
    if (results[0]?.address_components.at(-1).long_name === pickuppincode) {
      let splitData = address.split(",")
      // setPickupCity(splitData[splitData.length - 3])
      // setPickupState(splitData[splitData.length - 2])
      setPickupAddressActive(false)
    }
    else {
      setPickupAddressActive(true)
      console.log('no data availa')
      // setPickupCity(" ")
      // setPickupState(" ")
    }
  };

  const PickupCountryCodeFun = (currentValue, objectValue, eventData, eventTargetValue) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library 
    console.log(eventTargetValue);
    let data = []
    let CountryCode = eventTargetValue.split(" ")
    setPickupCountryCode(CountryCode[0])
    CountryCode.slice(1).map((items, id) => {
      console.log(items)
      data.push(items)
    })
    let myString = data.join("").replace(/\D/g, '');
    setPickupNumber(myString)

  }



  const DeliverAddressFun = async (address, id) => {
    // please don't remove the id (parameter) it's important for address (parameter) 
    setDeliveryAddress(address);
    console.log(address)
    if (address == undefined) {
      setDeliveryAddress(" ")
      setDeliverAddressActive(true)
    }
    const results = await geocodeByAddress(address);
    console.log(results)
    if (results[0]?.address_components.at(-1).long_name === deliverpincode) {
      let splitData = address.split(",")
      // setDeliverCity(splitData[splitData.length - 3])
      // setDeliverState(splitData[splitData.length - 2])
      setDeliverAddressActive(false)
    }
    else {
      setDeliverAddressActive(true)
      console.log('no data availa')
      // setDeliverCity(" ")
      // setDeliverState(" ")
    }

  }
  const DeliverCountryCodeFun = (currentValue, objectValue, eventData, eventTargetValue) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library 
    console.log(eventTargetValue);
    let data = []
    let CountryCode = eventTargetValue.split(" ")
    setDeliverCountryCode(CountryCode[0])
    CountryCode.slice(1).map((items, id) => {
      console.log(items)
      data.push(items)
    })
    let myString = data.join("").replace(/\D/g, '');
    setDeliverNumber(myString)

  }


  // postpaid=cod

  const BasicInformationNextBtn = async () => {

    reactLocalStorage.set("PaymentMethod", ordertype);
    reactLocalStorage.set("ConsignerPinCode", pickuppincode);

    let PayloadData = {
      // "orderid": GetAdminOrderGenerateOrderIdData?.product_order_id,
      "method": ordertype,
      "delivered_name": delivername,
      "delivered_phone_number": `${delivercountrycode}-${delivernumber}`,
      "delivered_address": deliveraddress,
      "delivered_pincode": deliverpincode,
      "delivered_city": delivercity,
      "delivered_state": deliverstate,
      // "delivered_contry_code": delivercountrycode,
      "pickup_name": pickupname,
      "pickup_phone_number": `${pickupcountrycode}-${pickupnumber}`,
      "pickup_address": pickupaddress,
      "pickup_pincode": pickuppincode,
      "pickup_city": pickupcity,
      "pickup_state": pickupstate,
      // "pickup_contry_code": pickupcountrycode
      // "amount": addamount,
      "company_name": CompanyName
    }



    console.log("nmbdvnb", PayloadData)

    // addamountfieldopenclose == true && addamount == null ? toast.warn("fill amount") : addamount &&
      CompanyName == null ? toast.warn("Please fill Company Name") : CompanyName && delivername && delivernumber?.length !== 10 ? toast.warn("deliver contact number is invalid") : delivernumber
        && deliveraddress && deliverpincode

        // && deliverpincode.length !== 6 ? toast.warn("Please select pincode") : deliverpincode 
        && delivercity && deliverstate && delivercountrycode && pickupname &&
        pickupnumber?.length !== 10 ? toast.warn("pickup contact number is invalid") : pickupnumber
          && pickupaddress && pickuppincode && pickupcity && pickupstate && pickupcountrycode &&
          // UserDetailOfLocalStorage?.method|| 
          ordertype == null ? toast.warn("Please Select Correct Order type") : ordertype
        ?
        // dispatch(GetAdminOrderPaymentOrder(PayloadData))
        reactLocalStorage.set("UserDetailsPayload", JSON.stringify(PayloadData)) &&
        navigate("/admin/order/orderdetails")

        :

        toast.warn("please fill all the fields currectly")

  }

  // Don't delete this comment 
  //  this is for edit order
  // useEffect(() => {
  //   let OrderId = reactLocalStorage.get("order_id", false);
  //   let objectData = {
  //     product_order_id: OrderId,
  //   };
  //   dispatch(GetAdminCloneOrder(objectData));

  // }, [])

  // Don't delete this comment 
  //  this is for edit order

  // useEffect(() => {

  //   if (GetAdminCloneOrderData) {
  //     setOrderType(GetAdminCloneOrderData?.method)
  //     // setPickupName(GetAdminCloneOrderData?.consignee_details?.consignee_name)
  //     setPickupCountryCode(GetAdminCloneOrderData?.consignee_details?.consignee_code)
  //     setPickupNumber(GetAdminCloneOrderData?.consignee_details?.consignee_number)
  //     setPickupCode(GetAdminCloneOrderData?.consignee_details?.consignee_pincode)
  //     setPickupCity(GetAdminCloneOrderData?.consignee_details?.consignee_city)
  //     setPickupState(GetAdminCloneOrderData?.consignee_details?.consignee_state)
  //     setPickupAddress(GetAdminCloneOrderData?.consignee_details?.consignee_address)
  //     setDeliverName(GetAdminCloneOrderData?.consigner_details?.consigner_name)
  //     setDeliverCountryCode(GetAdminCloneOrderData?.consigner_details?.delivered_phone_number)
  //     setDeliverNumber(GetAdminCloneOrderData?.consigner_details?.consigner_number)
  //     setDeliverPincode(GetAdminCloneOrderData?.consigner_details?.consigner_pincode)
  //     setDeliverCity(GetAdminCloneOrderData?.consigner_details?.consigner_city)
  //     setDeliverState(GetAdminCloneOrderData?.consigner_details?.consigner_state)
  //     setDeliveryAddress(GetAdminCloneOrderData?.consigner_details?.consigner_address)
  //   }



  // }, [GetAdminCloneOrderData])

  const OrderType = (e) => {

    setOrderType(null)

    let payload = {
      "pincode": deliverpincode, //it will be delived
      "method": e.target.value, //after selecteing the dropdown 
      "check_type": "DELIVERED"
    }

    dispatch(PostPincodesAvailability(payload))
  }




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


    console.log("objectIdobjectIdobjectId", objectId)
    let splitCountruCode = objectId.phone_number.split("-")
    console.log(splitCountruCode)

    setPatchObjectId(objectId.id)
    setDeliverName(objectId.name)
    setDeliverCountryCode(splitCountruCode[0])
    setDeliverNumber(splitCountruCode[1])
    setDeliveryAddress(objectId.address)
    setDeliverCity(objectId.city)
    setDeliverState(objectId.state)

    setPickUpPopup(false)
  }



  useEffect(() => {
    // reactLocalStorage.set("UserDetailsPayload", JSON.stringify(PayloadData));

    let UserDetailOfLocalStorage = JSON.parse(reactLocalStorage.get("UserDetailsPayload", false))

    console.log("UserDetailOfLocalStorage", UserDetailOfLocalStorage)

    let splitPickupCountryCode = UserDetailOfLocalStorage?.pickup_phone_number?.split("-")
    let splitDeliveredCountryCode = UserDetailOfLocalStorage?.delivered_phone_number?.split("-")

    console.log("splitCountryCode", splitDeliveredCountryCode)

    if (UserDetailOfLocalStorage !== false) {


      setOrderType(UserDetailOfLocalStorage?.method)
      setPickupName(UserDetailOfLocalStorage?.pickup_name)
      setPickupCountryCode(splitPickupCountryCode[0])
      setPickupNumber(splitPickupCountryCode[1])
      setPickupCode(UserDetailOfLocalStorage?.pickup_pincode)
      setPickupCity(UserDetailOfLocalStorage?.pickup_city)
      setPickupState(UserDetailOfLocalStorage?.pickup_state)
      setPickupAddress(UserDetailOfLocalStorage?.pickup_address)

      setDeliverName(UserDetailOfLocalStorage?.delivered_name)
      setDeliverCountryCode(splitDeliveredCountryCode[0])
      setDeliverNumber(splitDeliveredCountryCode[1])
      setDeliverPincode(UserDetailOfLocalStorage?.delivered_pincode)
      setDeliverCity(UserDetailOfLocalStorage?.delivered_city)
      setDeliverState(UserDetailOfLocalStorage?.delivered_state)
      setDeliveryAddress(UserDetailOfLocalStorage?.delivered_address)
      setCompanyName(UserDetailOfLocalStorage?.company_name)
      // setAddAmount(UserDetailOfLocalStorage?.amount)


      // if (UserDetailOfLocalStorage?.amount) {
      //   setAddAmountFieldOpenClose(true)
      //   setAddAmount(UserDetailOfLocalStorage?.amount)
      // }
    }



  }, [])

  // search functionality
  const SearchFilterPathFun = (e) => {
    console.log("jhagjsdkdghs", e.length)
    if (e.length == 0) {
      setOpenPathSearch(false)
    }
    else {
      setOpenPathSearch(true)

    }
    // setSelectedOption(e)
  }
  useEffect(() => {
    dispatch(GetB2bCompanyInfo())
    if (OpenPathSearch == true) {
      setSelectedOptionClass("opnePathDataBlock")
    }
    else {
      setSelectedOptionClass("opnePathData")
    }
  }, [OpenPathSearch])

  // let filteredData
  useEffect(() => {

    //    filteredData = GetB2bCompanyInfoData?.filter((item) => {
    //     const searchTerm = value.toLowerCase();
    //     const name = item.company_name.toLowerCase();
    //     return searchTerm && name.includes(searchTerm);
    //   });
    // console.log("filteredData11",filteredData)
    GetB2bCompanyInfoData && setPageData(GetB2bCompanyInfoData)

  }, [GetB2bCompanyInfoData])

  const filteredData = GetB2bCompanyInfoData?.filter((item) => {
    const searchTerm = value.toLowerCase();
    const name = item.company_name.toLowerCase();
    return searchTerm && name.includes(searchTerm);
  });
  // console.log("filteredData22",filteredData)

  const onChange = (e) => {
    setValue(e.target.value);
    setIsOpen(true);
    setCompanyName(null);
    setHighlightedIndex(-1);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    setIsOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(value);
    }
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => (prevIndex + 1) % filteredData.length);

      // setSelectedIndex((prevIndex) => {
      //   const newIndex = prevIndex + 1;
      //   // console.log("newIndex",newIndex)
      //   if (newIndex < filteredData.length) {
      //     return newIndex;
      //   } else {
      //     return prevIndex;
      //   }
      // });
      // setCompanyName(filteredData[selectedIndex + 1]?.company_name || null);
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault(); // prevent cursor from moving to start of input
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? filteredData.length - 1 : prevIndex - 1
      );

      // setSelectedIndex((prevIndex) => {
      //   const newIndex = prevIndex - 1;
      //   if (newIndex >= 0) {
      //     return newIndex;
      //   } else {
      //     return prevIndex;
      //   }
      // });
      // setCompanyName(filteredData[selectedIndex - 1]?.company_name || null);
    }
  };
  useEffect(() => {
    if (highlightedIndex !== -1 && dropdownRef.current) {
      const selectedItem = dropdownRef.current.children[highlightedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          block: "nearest",
          inline: "start"
        });
      }
    }
  }, [highlightedIndex]);
  useEffect(() => {
    if (selectedIndex !== -1) {
      setCompanyName(filteredData[selectedIndex]?.company_name || null);
      setHighlightedIndex(selectedIndex);
    }
  }, [selectedIndex]);


  let orderType = [
    { value: "PREPAID", data: "prepaid" },
    { data: "cod", value: "COD" }]

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
              <h1>Basic Information</h1>
              <div className="userinfo-body">
                {/* <h3>Order Details</h3> */}
                <div className="row">
                  {/* <div className="col-md-6 input_filed_block">
                    <label>Order Id</label>
                    <input
                      type="text"
                      name="generateorder"
                      className="form-control mt-1 input_filed input_filed_zIndex"
                      placeholder="Order Id"
                      // onChange={(e) => setGenerateOrder(e.target.value)}
                      value={GetAdminOrderGenerateOrderIdData?.product_order_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => GenerateFun(e)}>

                      Generate
                    </button>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Order type</label>
                    <select className='form-control mt-1'
                      onChange={(e) => setOrderType(e.target.value)}
                      value={ordertype}>
                      <option value="none" selected disabled hidden>Select Order type...</option>
                      <option value="online">postpaid</option>
                      <option value="cod">prepaid</option>
                    </select>
                  </div>
                  <div className="col-md-6 mt-3">
                    <label>Pickup from</label>
                    <input
                      type="text"
                      name="pickupform"
                      className="form-control mt-1"
                      placeholder="Franchise Location"
                      onChange={(e) => setPickupForm(e.target.value)}
                      value={pickupform}
                    />
                  </div> */}



                  <h3 className="col-12  ">Consigner Information</h3>
                  <div className="row  m-0 p-0">

                    <label>Company Name</label>
                    <div className={`form-group 
                        ${selectedOptionclass}
                        `}>
                      {/* <input
                      
                        type="search"
                        placeholder="Search"
                        option={pageData}
                        // onChange={(e) => SearchPage(e)}
                      /> */}

                      {/* <Select
                      value={selectedOption}
                      onChange={setSelectedOption}
                      options={pageData}
                      placeholder={"Search"}
                      onInputChange={SearchFilterPathFun}
                      getOptionLabel={option =>`${option.company_name}  `}
                      getOptionValue={option => `${option}`}
                      isSearchable={true}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          outline: "none !important",
                          border: "none !important",
                          borderRadius: "14px !important",
                          backgroundColor: "#f6f7f8 !important",
                          boxShadow: "none !important"
                        }),
                      }}
                    /> */}
                      <input
                        className="form-control check-box"
                        type="text"
                        value={CompanyName ?? value}
                        onChange={onChange}
                        placeholder={"Search"}
                        onKeyDown={onKeyDown}
                      // onInputCapture={SearchFilterPathFun}
                      // onInputChange={SearchFilterPathFun}
                      />
                      {isOpen && (
                        <div className={`dropdown companyDropDown`} ref={dropdownRef}>
                          {GetB2bCompanyInfoData
                            ?.filter((item) => {
                              const searchTerm = value.toLowerCase();
                              const name = item.company_name.toLowerCase();
                              return searchTerm && name.includes(searchTerm);
                            })
                            ?.map((item, index) => {
                              return <div
                                className={`dropdown-row   ${highlightedIndex === index ? " selected" : "",
                                // highlightedIndex === index ? "bg-red" : ""
                                  selectedIndex == -1 ? index == 0 ? "bg-red" : "" : selectedIndex == index ? "bg-red" : ""
                                  // selectedIndex == -1? "bg-red": 
                                  //  selectedIndex == index ? "bg-red" : ""
                                  // selectedIndex == index ? "bg-red" : ""
                                  }`}
                                  // style={{
                                  //   backgroundColor:
                                  //     highlightedIndex === index ? "yellow" : "white"
                                  // }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                onClick={() => {
                                  setCompanyName(item.company_name);
                                  onSearch(item.company_name);
                                }}
                                key={index}
                              >
                                {item.company_name}
                              </div>
                            })}
                        </div>
                      )}

                      {/* {pagepathdata && (
              <datalist id="brow">
                {pagepathdata &&
                  pagepathdata?.map((item, id) => {
                    return (
                      <option
                      >
                        {item.value}
                      </option>
                    );
                  })}
              </datalist>
            )} */}

                      {/* <span className="search-icon pt-1">
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
                          fill-opacity="0.2"
                        />
                      </svg>
                    </span> */}
                    </div>
                    <div className="col-md-4 mt-2">
                      <label>Contact name</label>
                      <input
                        type="text"
                        name="pickupname"
                        className="form-control mt-1"
                        placeholder="Name"
                        value={pickupname}
                        onChange={(e) => setPickupName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4 mt-2">
                      <label>Mobile Number</label>
                      {/* <input
                        type="number"
                        name="pickupnumber"
                        className="form-control mt-1"
                        placeholder="Mobile Number"
                        value={pickupnumber}
                        onChange={(e) => setPickupNumber(e.target.value)}
                      /> */}
                      <PhoneInput
                        country={'in'}
                        value={pickupcountrycode + pickupnumber}
                        onChange={PickupCountryCodeFun}
                        className="input_filed"
                      />
                    </div>

                    <div className="col-md-4 mt-2">
                      <label>Pincode</label>
                      <input type="text" className={`form-control check-box ${pickuppincodeactive && pickuppincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                        value={pickuppincode} onChange={(e) => PickUpPincodeFun(e)} />
                      {pickuppincodeactive && pickuppincode ? <span className='text-danger '>
                        <small> Pincode is not available </small></span> : ""}
                    </div>
                  </div>

                  <div className="col-md-12 ">
                    <div className="col-12 mt-3">
                      <label>Address</label>

                      <PlacesAutocomplete
                        value={pickupaddress}
                        onChange={(e) => PickupAddressFun(e)}
                      >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                          <div
                            className={pickupaddressactive ? "mb-4" : ""}
                          >
                            <input
                              {...getInputProps({
                                placeholder: 'Search Places ...',
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
                  <div className="row mt-3 m-0 p-0">
                    <div className="col-md-6 mt-1">
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
                    <div className="col-md-6 mt-1">
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
                  <h3 className="col-12 mt-5">Consignee Information</h3>

                  <div className="col-md-4 mt-2">
                    <label>Contact name</label>
                    <input
                      type="text"
                      name="delivername"
                      className="form-control mt-1"
                      placeholder="Name"
                      value={delivername}
                      onChange={(e) => setDeliverName(e.target.value)}
                    />


                  </div>
                  <div className="col-md-4 mt-2">
                    <label>Mobile Number</label>
                    {/* <input
                      type="number"
                      name="delivernumber"
                      className="form-control mt-1"
                      placeholder="Mobile Number"
                      value={delivernumber}
                      onChange={(e) => setDeliverNumber(e.target.value)}
                    /> */}
                    <PhoneInput
                      country={'in'}
                      value={delivercountrycode + delivernumber}
                      onChange={DeliverCountryCodeFun}
                      className="input_filed"
                    />
                  </div>
                  <div className="col-md-4 mt-2">
                    <label>Pincode</label>

                    <input type="text" className={`form-control check-box ${deliverpincodeactive && deliverpincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                      value={deliverpincode} onChange={(e) => DeliverpincodeFun(e)} />
                    {deliverpincodeactive && deliverpincode ? <span className='text-danger '>
                      <small> Pincode is not available </small></span> : ""}

                  </div>
                  <div className="col-12 mt-3">
                    <label>Address</label>


                    <PlacesAutocomplete
                      value={deliveraddress}
                      onChange={(e) => DeliverAddressFun(e)}
                    >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                        <div
                          className={deliveraddressactive ? "mb-4" : ""}
                        >
                          <input
                            {...getInputProps({
                              placeholder: 'Search Places ...',
                              className: 'location-search-input',
                            })}
                            className={`form-control `}
                          //  ${deliveraddressactive ? "alert_border" : ""}

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

                            {/* {!suggestions[0]?.description && deliveraddressactive ? <span className='text-danger mb-4 '>
                              <small> This address is not available </small></span> : setDeliverAddressActive(false)} */}

                          </div>
                        </div>
                      )}
                    </PlacesAutocomplete>
                  </div>
                  <div className="col-md-12 mt-3">
                    <div className="row">
                      <div className="col-md-6 mt-1">
                        <label>City</label>
                        <input
                          type="text"
                          name="delivercity"
                          className="form-control mt-1"
                          placeholder="City"
                          value={delivercity}
                          onChange={(e) => setDeliverCity(e.target.value)}
                        />
                      </div>
                      <div className="col-md-6 mt-1">
                        <label>State</label>
                        <input
                          type="text"
                          name="deliverstate"
                          className="form-control mt-1"
                          placeholder="State"
                          value={deliverstate}
                          onChange={(e) => setDeliverState(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 pb-2">
                    <h3>Order Details</h3>
                  </div>

                  {/* <div className="col-md-6 input_filed_block">
                    <label>Order Id</label>
                    <input
                      type="text"
                      name="generateorder"
                      className="form-control mt-1 input_filed input_filed_zIndex"
                      placeholder="Order Id"
                      // onChange={(e) => setGenerateOrder(e.target.value)}
                      value={GetAdminOrderGenerateOrderIdData?.product_order_id}
                    />
                  </div>
                  <div className="col-md-6">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => GenerateFun(e)}>

                      Generate
                    </button>
                  </div> */}
                  <div className="col-md-6 mt-3">
                    <label>Order type</label>
                    {/* <select className='form-control mt-1'
                      onChange={(e) => OrderType(e)}
                      value={ordertype}>
                      <option value="none" Selected  >Select Order type...</option>
                      <option value="PREPAID">prepaid</option>
                      <option value="COD">cod</option>

                    </select> */}
                    <select className='form-control mt-1' onChange={(e) => OrderType(e)} value={ordertype}>
                      <option value="none" selected={ordertype == undefined}  >Select Order type...</option>
                      {orderType?.map((item, id) => { return <option value={item?.value}>{item?.data}</option> })}
                    </select>
                    {PostPincodesAvailabilityReducer && PostPincodesAvailabilityReducer.message !== "Available" ? <span className='text-danger mb-4 '>
                      <small>

                        {PostPincodesAvailabilityReducer && PostPincodesAvailabilityReducer?.message}
                      </small></span> : ""}



                  </div>
                  {/* <div className="col-md-6 mt-3">
                    <label>Pickup from</label>
                    <input
                      type="text"
                      name="pickupform"
                      className="form-control mt-1"
                      placeholder="Franchise Location"
                      onChange={(e) => setPickupForm(e.target.value)}
                      value={pickupform}
                    />
                  </div> */}
                  {/* {addamountfieldopenclose && <div className="col-md-6   pt-3">
                    <label>Add Amount</label>
                    <input
                      type="number"
                      name="generateorder"
                      className="form-control mt-1 input_filed "
                      placeholder="Enter Amount"
                      onChange={(e) => setAddAmount(e.target.value)}
                      value={addamount}
                    />
                  </div>} */}
                  {/* <div className="col-md-6 pt-4">
                    <button type="button" className="btn gen-btn"
                      onClick={(e) => AddAmountFun(e)}>

                      Add Amount
                    </button>
                  </div>   */}

                </div>
              </div>
              <button
                onClick={(e) => BasicInformationNextBtn(e)}
                type="button"
                className="btn next-btn"
              >
                {" "}
                Next{" "}
              </button>
              <div className="row">


                {/* <div className="col-sm-4">
                  <button
                    onClick={(e) => BasicInformationNextBtn(e)}
                    type="button"
                    className="btn next-btn"
                  >
                    {" "}
                    Previous{" "}
                  </button>
                </div>

                <div className="col-sm-4"></div> */}


                {/* <div className="col-sm-12">
                  <button
                    onClick={(e) => BasicInformationNextBtn(e)}
                    type="button"
                    className="btn next-btn"
                  >
                    {" "}
                    Next{" "}
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Popup open={pickuppopup} position="" model className="sign_up_loader">
        <div className="container">
          <div className='loader-sec adresloader-sec'>
            <div className="justify-content-center w-50 rounded   bg-white">
              <div className='d-flex justify-content-between px-3 pt-3'>
                <h3>
                  select Address
                </h3>
                <h4 className='pe-3' role="button" onClick={(e) => setPickUpPopup(false)}> X </h4>
              </div>
              <hr className='my-2' />
              <div className='px-3 py-1 text-warning'>
                <span className='px-2'>
                  <svg width="15" height="15" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M4.5607 0.0168947C3.63832 0.10573 2.74429 0.437784 2.01918 0.960827C1.7398 1.16235 1.27777 1.59894 1.065 1.8625C-5.90139e-06 3.18158 -0.283358 4.90549 0.292324 6.56372C0.749743 7.88133 1.64914 9.16642 3.03126 10.4773C3.62086 11.0365 4.4823 11.7374 4.83983 11.9488C5.02196 12.0565 5.10964 12.0189 5.66571 11.5945C6.70124 10.8042 7.75647 9.76605 8.44956 8.85573C9.21981 7.84408 9.74991 6.72869 9.9334 5.73376C10.0327 5.19515 10.0198 4.4179 9.90229 3.8579C9.56115 2.23226 8.29422 0.832679 6.65619 0.271824C6.03962 0.0607362 5.18503 -0.04324 4.5607 0.0168947ZM5.37565 0.589728C6.46519 0.689899 7.40563 1.12143 8.15676 1.86577C9.30664 3.0053 9.69947 4.61704 9.21053 6.18933C8.95991 6.9952 8.52965 7.78783 7.90858 8.58775C7.20709 9.49127 6.17407 10.4912 5.15177 11.2563L5.00409 11.3668L4.76167 11.1836C4.34857 10.8714 3.79054 10.3937 3.38492 10.0051C1.14175 7.85592 0.218841 5.71133 0.719162 3.81047C1.00622 2.71993 1.75237 1.75231 2.75666 1.16832C3.28085 0.863497 3.95944 0.649729 4.58971 0.590854C4.93154 0.558937 5.03889 0.558777 5.37565 0.589728ZM4.50545 2.47783C3.91162 2.59424 3.32234 2.96521 2.96968 3.44462C2.47696 4.11444 2.36604 5.0114 2.68265 5.76608C2.91424 6.31809 3.33116 6.75369 3.88388 7.02111C4.29638 7.22067 4.51738 7.26979 5.0027 7.26979C5.48678 7.26979 5.70707 7.22105 6.12153 7.02223C6.66005 6.7639 7.09435 6.31418 7.3135 5.78792C7.44845 5.46377 7.49481 5.23288 7.49646 4.87623C7.49834 4.47364 7.43428 4.18227 7.26825 3.83858C6.92691 3.13203 6.25432 2.61954 5.47965 2.47577C5.22873 2.4292 4.74841 2.43021 4.50545 2.47783ZM5.38371 3.04132C5.85522 3.132 6.32198 3.43833 6.59444 3.8359C6.95189 4.35747 7.01059 5.07351 6.74119 5.62609C6.48916 6.14302 6.03045 6.51709 5.47233 6.66076C5.23078 6.72293 4.77289 6.72266 4.53308 6.6602C3.8386 6.47934 3.28958 5.92963 3.13643 5.26185C3.06452 4.94823 3.09137 4.53059 3.20223 4.23916C3.53525 3.36351 4.44932 2.86161 5.38371 3.04132ZM4.87839 3.74787C4.73502 3.80835 4.71325 3.86897 4.70297 4.23586L4.69327 4.58145H4.34862C4.00449 4.58145 4.0038 4.58158 3.92319 4.65978C3.85993 4.72115 3.84244 4.76215 3.84244 4.84913C3.84244 5.09107 3.93924 5.14421 4.37976 5.14421H4.69883V5.43984C4.69883 5.80373 4.73449 5.90484 4.8843 5.96589C4.97552 6.00303 5.00301 6.00378 5.09939 5.97162C5.26752 5.91553 5.3065 5.81657 5.30653 5.44568L5.30658 5.14421H5.62565C5.99627 5.14421 6.08948 5.11269 6.15269 4.96595C6.20313 4.84881 6.16611 4.716 6.06056 4.63547C5.99832 4.58799 5.94881 4.58145 5.65096 4.58145H5.31213L5.30244 4.23366C5.29318 3.90089 5.28968 3.88288 5.22103 3.81629C5.14357 3.74117 4.97436 3.70741 4.87839 3.74787Z" fill="#FFCD14" />
                  </svg>
                </span>
                <span className='mt-2'> <small> <b>
                  Add New Address</b>
                </small>
                </span>
              </div>
              <hr className='my-2' />
              <div className='px-3 pb-4' style={{ height: "500px", overflow: "overlay" }}>
                <b> Address Details </b>
                {filterpincodedata && filterpincodedata?.map((item, id) => {
                  return <div className='d-flex justify-content-between'>

                    <div className='d-flex pt-3'>
                      <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15.5" cy="15.5" r="15" fill="white" stroke="#D9D9D9" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.4728 8.02253C14.366 8.14097 13.2931 8.58371 12.423 9.2811C12.0878 9.5498 11.5333 10.1319 11.278 10.4833C9.99999 12.2421 9.65997 14.5407 10.3508 16.7516C10.8997 18.5084 11.979 20.2219 13.6375 21.9697C14.345 22.7153 15.3788 23.6498 15.8078 23.9317C16.0264 24.0754 16.1316 24.0252 16.7989 23.4593C18.0415 22.4056 19.3078 21.0214 20.1395 19.8076C21.0638 18.4588 21.6999 16.9716 21.9201 15.645C22.0393 14.9269 22.0238 13.8905 21.8827 13.1439C21.4734 10.9763 19.9531 9.11024 17.9874 8.36243C17.2475 8.08098 16.222 7.94235 15.4728 8.02253ZM16.4508 8.7863C17.7582 8.91987 18.8868 9.49524 19.7881 10.4877C21.168 12.0071 21.6394 14.156 21.0526 16.2524C20.7519 17.3269 20.2356 18.3838 19.4903 19.4503C18.6485 20.655 17.4089 21.9883 16.1821 23.0084L16.0049 23.1558L15.714 22.9115C15.2183 22.4952 14.5486 21.8583 14.0619 21.3401C11.3701 18.4746 10.2626 15.6151 10.863 13.0806C11.2075 11.6266 12.1028 10.3364 13.308 9.55776C13.937 9.15133 14.7513 8.86631 15.5076 8.78781C15.9179 8.74525 16.0467 8.74504 16.4508 8.7863ZM15.4065 11.3038C14.6939 11.459 13.9868 11.9536 13.5636 12.5928C12.9723 13.4859 12.8392 14.6819 13.2192 15.6881C13.4971 16.4241 13.9974 17.0049 14.6607 17.3615C15.1557 17.6276 15.4209 17.6931 16.0032 17.6931C16.5841 17.6931 16.8485 17.6281 17.3458 17.363C17.9921 17.0185 18.5132 16.4189 18.7762 15.7172C18.9381 15.285 18.9938 14.9772 18.9958 14.5016C18.998 13.9649 18.9211 13.5764 18.7219 13.1181C18.3123 12.176 17.5052 11.4927 16.5756 11.301C16.2745 11.2389 15.6981 11.2403 15.4065 11.3038ZM16.4605 12.0551C17.0263 12.176 17.5864 12.5844 17.9133 13.1145C18.3423 13.81 18.4127 14.7647 18.0894 15.5015C17.787 16.1907 17.2365 16.6895 16.5668 16.881C16.2769 16.9639 15.7275 16.9635 15.4397 16.8803C14.6063 16.6391 13.9475 15.9062 13.7637 15.0158C13.6774 14.5976 13.7096 14.0408 13.8427 13.6522C14.2423 12.4847 15.3392 11.8155 16.4605 12.0551Z" fill="#777777" />
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
  );
};

export default User;
