import React, { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import Layout from '../Components/DashboardLayout/Layout'
import Axios from "axios";
import { toast } from "react-toastify";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import {
    getOrderAddress, PostOrderDownloadInvoiceFile, GetShipmentDetails, GetCustomerOrderDetail,
    PatchPickupAddress, PostPincodesAvailability, PostPincodesDelivered, PostShipmentDetails, ShipmentLoaderTrueFalse, PostOrderDownloadLabelGenerationFile, PostAdminOrderEwayBill
} from '../Redux/action/ApiCollection';
import { useDispatch, useSelector } from 'react-redux';
import LodingSpiner from '../Components/LodingSpiner';
import Popup from "reactjs-popup";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


const Shipping = () => {

    const navigate = useNavigate();

    let BearerToken = reactLocalStorage.get("token", false);


    let Admin_Role = reactLocalStorage.get("Admin_Role", false);
    let as_individual = reactLocalStorage.get("as_individual", false);



    const [pickupaddress, setPickUpAddress] = useState('')//
    const [deliveryaddress, setDeliveryAddress] = useState('')
    const [pickuppincode, setPickupPinCode] = useState('')
    const [pickuppincodeactive, setPickupPinCodeActive] = useState(false)
    const [deliverypincodeactive, setDeliveryPinCodeActive] = useState(false)
    const [pickuppincodeactivecheck, setPickupPinCodeActiveCheck] = useState(false)
    const [deliverypincodeactivecheck, setDeliveryPinCodeActiveCheck] = useState(false)
    const [deliveredpincode, setDeliveredPincode] = useState('')
    const [selectedproduct, setSelectedProduct] = useState('')
    const [deliveryproduct, setDeliveryProduct] = useState(null)
    const [weight, setWeight] = useState('')
    const [yesnoactivebutton, setYesNoActiveButton] = useState(false)
    const [date, setDate] = useState('')
    const [pickupname, setPickupName] = useState('')
    const [pickupcontact, setPickupContact] = useState('')//
    const [pickupcity, setPickupCity] = useState('')
    const [pickupstate, setPickupState] = useState('')
    const [deliveryname, setDeliveryName] = useState('')//
    const [deliverycontact, setDeliveryContact] = useState('')//
    const [deliverycity, setDeliveryCity] = useState('')
    const [deliverystate, setDeliveryState] = useState('')
    const [loadspiner, setLoadSpiner] = useState(false);
    const [countrycodepickup, setCountryCodePickup] = useState("");//
    const [countrycodedelivery, setCountryCodeDelivery] = useState("");
    const [pickupaddressactive, setPickupAddressActive] = useState(false)
    const [deliveryaddressactive, setDeliveryAddressActive] = useState(false)
    const [pickuppopup, setPickUpPopup] = useState(false)
    const [pickuppatchfilterdata, setPatchFilterData] = useState("")
    const [deliveryPatchFilterData, setDeliveryPatchFilterData] = useState("")
    const [pickuppatchobjectid, setPatchObjectId] = useState(null)//
    const [deliverytypeerror, setDeliveryTypeError] = useState(false)
    const [pickupModalStatus, setPickUpModalStatus] = useState(false)//
    const [deliveryModalStatus, setDeliveryModalStatus] = useState(false)
    const [yesnoactivebuttonInsurance, setYesNoActiveButtonInsurance] = useState(false)
    const [priceValue, setPriceValue] = useState("")
    const [ewayPdf, setEwayPdf] = useState("")
    const [shippingprice, setShippingPrice] = useState("")
    const [otherProductType, setOtherProductType] = useState("")
    const dispatch = useDispatch()
    let paramHash = useLocation();
    const GetShipmentDetailsData = useSelector(state => state.GetShipmentDetailsReducer.GetShipmentDetailsData.data)
    const PostPincodesAvailabilityReducer = useSelector(state => state.PostPincodesAvailabilityReducer.PostPincodesAvailabilityData?.data)
    const PostPincodesDeliveredReducer = useSelector(state => state.PostPincodesDeliveredReducer.PostPincodesDeliveredData?.data?.message)
    const PostShipmentDetailsData = useSelector(state => state.PostShipmentDetailsReducer.PostShipmentDetailsData.data?.shipment_id)
    const PostDeliveryAddressData = useSelector(state => state.PostDeliveryAddressReducer.PostDeliveryAddressData.data?.delivered_id)
    const PostPickupAddressData = useSelector(state => state.PostPickupAddressReducer.PostPickupAddressData?.data?.pickup_id)
    const PatchPickupAddressData = useSelector(state => state.PatchPickupAddressReducer.PatchPickupAddressData?.data)
    const OrderDetails = useSelector(state => state.orderDetailsReducer.orderDetails)
    const ShipmentLoaderTrueFalseData = useSelector(state => state.ShipmentLoaderTrueFalseReducer.ShipmentLoaderTrueFalseData)
    const PostOrderDownloadInvoiceFileData = useSelector(
        (state) => state.PostOrderDownloadInvoiceFileReducer.PostOrderDownloadInvoiceFileData?.data
    );
    useEffect(() => {
         
        if (Admin_Role.toString() != "false" ) {
            if (paramHash?.pathname == "/shipping") {
                navigate("/");
            }
        }

        if(as_individual.toString() != "true"){
            navigate("/"); 
        }

        if (PostShipmentDetailsData && PostDeliveryAddressData && PostPickupAddressData || PatchPickupAddressData) {
            let payload = {
                "pickup_id": PostPickupAddressData ? PostPickupAddressData : pickuppatchobjectid,
                "delivered_id": PostDeliveryAddressData,
                "shipment_id": PostShipmentDetailsData
            }
            dispatch(GetShipmentDetails(payload))
        }
    }, [PostShipmentDetailsData, PostDeliveryAddressData, PostPickupAddressData, PatchPickupAddressData])

    const PickupPinCodeFun = (e) => {
        // if(e.target.value.length==1){
            let payload1 ={ 
              "page_type":"pickup" 
              }
              dispatch(getOrderAddress(payload1))
        //   }
        if (e.target.value.length == 7) return false;
        setPickupPinCode(e.target.value)
        let payload = {
            "pincode": e.target.value,
            "check_type": "PICKUP"
        }
        if (e.target.value.length === 6) {
            dispatch(PostPincodesAvailability(payload))
            setPickupPinCodeActiveCheck(o => !o)
        }
        else {
            setPickupPinCodeActive(false)
        }
    }

    const DeliveredPincodeFun = (e) => {
        // if(e.target.value.length == 1){
            let payload1={
              "page_type":"delivered" 
           }
           dispatch(getOrderAddress(payload1))
          
        //   }
      
        if (e.target.value.length == 7) return false;
        setDeliveredPincode(e.target.value)
        let payload = {
            "pincode": e.target.value,
            "check_type": "DELIVERED"
        }

        if (e.target.value.length === 6) {
            dispatch(PostPincodesAvailability(payload))
            setDeliveryPinCodeActiveCheck(o => !o)
        }
        else {
            setDeliveryPinCodeActive(false)
        }
    }

    const SelectDeliveryType = (e) => {
        setDeliveryProduct(e.target.value)
        let payload = {
            "pincode": pickuppincode,
            "delivery_type": e.target.value,
            "check_type": "PICKUP"
        }
        if (e.target.value) {
            dispatch(PostPincodesAvailability(payload))
        }
    }


    // UDB - Southern Heights, Sector 22, Pratap Nagar, Jaipur, Rajasthan, India
    const PickupAddressFun = async (address, id) => {
        // please don't remove the id (parameter) it's important for address (parameter)
        setPickUpAddress(address);
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


    const DeliveryAddressFun = async (address, id) => {
        // please don't remove the id (parameter) it's important for address (parameter) 

        setDeliveryAddress(address);
        const results = await geocodeByAddress(address);
        if (results[0]?.address_components.at(-1).long_name === deliveredpincode) {
            let splitData = address.split(",")
            // setDeliveryCity(splitData[splitData.length - 3])
            // setDeliveryState(splitData[splitData.length - 2])
            setDeliveryAddressActive(false)

        }
        else {
            setDeliveryAddressActive(true)
        }

    };





    const ConfirmDeleverFun = (e) => {
        e.preventDefault()

        let Eway_bill_id =reactLocalStorage.get("Eway_bill_id",false)

        let payloadPickupAddress = {
            "name": pickupname,
            "phone_number": `${countrycodepickup}-${pickupcontact}`,
            "address": pickupaddress,
            "pincode": pickuppincode,
            "city": pickupcity,
            "state": pickupstate,
            // "contry_code": countrycodepickup,
            "id": pickuppatchobjectid
        }

        let payloadDeliveredAddress = {
            "name": deliveryname,
            "phone_number": `${countrycodedelivery}-${deliverycontact}`,
            "address": deliveryaddress,
            "pincode": deliveredpincode,
            "city": deliverycity,
            "state": deliverystate,
            // "contry_code": countrycodedelivery
        }
        var capitalizeInsurance = (string) => {
            const res = string[0].toUpperCase() + string.slice(1)
        }

        let payloadShipping = {
            "product_type": otherProductType && selectedproduct == "OTHERS" ? otherProductType : selectedproduct,
            "delivery_type": deliveryproduct,
            "weight": weight,
            "pickup_date": date,
            "pack_shipment": yesnoactivebutton,
            "product_price": priceValue,
            "eway_bill": Eway_bill_id,
            "packaging": yesnoactivebutton ? shippingprice : "",
            "insurance": yesnoactivebuttonInsurance ? "True" : "False"

        }

        // "product_type": "Clothes", 
        // "product_price": 51000,
        //  "delivery_type": AIR_DELIVERY, 
        //  "weight": 3.5,
        //   "pickup_date": 2023 - 02 - 23, 
        //   "pack_shipment": true, 
        //   "Eway_bill": FILE,
        //    "length": 1,
        //     "breadth": 1, 
        //     "height": 1, 
        //     "quantity": 1,
        //      "packaging": Box, 
        //      "method": "COD", 
        //      "product_order_id": "559077188693"



        priceValue == "none" ? toast.warn("Please enter price") : priceValue &&
            priceValue >= 50000 && ewayPdf == "none" ? toast.warn("Please upload eway bill") : ewayPdf &&

                pickupname &&
                pickupcontact.length !== 10 ? toast.warn("pickup contact number is invalid") : pickupcontact
                    && pickupaddress
                    && pickuppincode && pickupcity && pickupstate
                    && deliveryname &&
                    deliverycontact.length !== 10 ? toast.warn("delivery contact number is invalid") : deliverycontact
                        &&
                        deliveryaddress &&
                        deliveredpincode &&
                        pickupaddressactive && deliveryaddressactive && //this is new modification and address's is not validated
                        // pickupaddressactive !== false ? toast.warn("pickup address is not available ") : " " &&
                        // deliveryaddressactive !== false ? toast.warn("delivery address is not available ") : " " &&
                        deliverycity &&
                        deliverystate &&
                        selectedproduct &&
                        deliveryproduct == "none" ? toast.warn("Please select delivery type") : deliveryproduct &&
                            weight &&
                            date

            ?
            dispatch(PostShipmentDetails(payloadShipping, payloadDeliveredAddress, payloadPickupAddress, pickuppatchobjectid))
            :


            toast.warn("please fill all the fields currectly")
    }


    useEffect(() => {
        if (PostPincodesAvailabilityReducer?.type == "pickup" && PostPincodesAvailabilityReducer?.message === "Available") {
            setPickupPinCodeActive(true)
            setDeliveryTypeError(false)
            setPickupCity(PostPincodesAvailabilityReducer.city)
            setPickupState(PostPincodesAvailabilityReducer.state)
        } else if (PostPincodesAvailabilityReducer?.type === "delivered" && PostPincodesAvailabilityReducer?.message === "Available") {
            setDeliveryPinCodeActive(true)
            setDeliveryTypeError(false)
            setDeliveryCity(PostPincodesAvailabilityReducer.city)
            setDeliveryState(PostPincodesAvailabilityReducer.state)
        } else {
            setDeliveryCity("")
            setDeliveryState("")
        }
    }, [PostPincodesAvailabilityReducer])


    useEffect(() => {


        // dispatch(getOrderAddress())
        if (PostPincodesAvailabilityReducer?.type === "pickup") {
            if (PostPincodesAvailabilityReducer?.message === "Available") {
                setPickupPinCodeActive(true)
                setDeliveryTypeError(false)
                if (pickuppatchfilterdata && pickuppatchfilterdata?.length !== 0
                    // && !pickuppincodeactive
                ) {
                    if (deliveryproduct == null || deliveryproduct == "none") {
                        setPickUpPopup(true)

                        setPickUpModalStatus(true)
                        setDeliveryModalStatus(false)
                    }
                    else {
                        setPickUpPopup(false)
                    }

                }
                else {
                    setPickUpPopup(false)
                }
                // !pickuppincodeactive && setPickUpPopup(true)

            }
            else {

                setDeliveryProduct("none")
                setDeliveryTypeError(true)
                setPickUpPopup(false)
                setPickupPinCodeActive(false)
            }
        }

        else if (PostPincodesAvailabilityReducer?.type === "delivered") {
            if (PostPincodesAvailabilityReducer?.message === "Available") {

                //     // setDeliveryPinCodeActive(true)
                //     setPickUpPopup(true)

                // }
                // else {
                //     // setDeliveryPinCodeActive(false)
                //     setPickUpPopup(false)

                // }


                setDeliveryPinCodeActive(true)
                setDeliveryTypeError(false)
                if (deliveryPatchFilterData && deliveryPatchFilterData?.length !== 0
                    // && !pickuppincodeactive
                ) {
                    if (deliveryproduct == null || deliveryproduct == "none") {
                        setPickUpPopup(true)
                        setPickUpModalStatus(false)

                        setDeliveryModalStatus(true)
                    }
                    else {
                        setPickUpPopup(false)
                    }

                }
                else {
                    setPickUpPopup(false)
                }
                // !pickuppincodeactive && setPickUpPopup(true)

            }
            else {

                setDeliveryProduct("none")
                setDeliveryTypeError(true)
                setPickUpPopup(false)
                setDeliveryPinCodeActive(false)
            }
        }
    }, [pickuppincodeactivecheck, PostPincodesAvailabilityReducer, pickuppatchfilterdata])

    useEffect(() => {
        let data = OrderDetails?.data?.filter((item, id) => {
            if (item.pincode.toString() === pickuppincode) {
                return item
            }

        })
        data && setPatchFilterData(data)
    }, [pickuppincodeactivecheck, PostPincodesAvailabilityReducer])

    useEffect(() => {

        let data = OrderDetails?.data?.filter((item, id) => {

            if (item.pincode.toString() === deliveredpincode) {
                return item
            }
        })
        data && setDeliveryPatchFilterData(data)

    }, [pickuppincodeactivecheck, PostPincodesAvailabilityReducer])



    //  
    useEffect(() => {

        if (PostPincodesAvailabilityReducer == undefined || PostPincodesAvailabilityReducer.message == "Pin code is not available") {
            // setDeliveryTypeError(true)
            // setDeliveryProduct("")
            // setPickUpPopup(false)

        }
        else {
            //  setPickUpPopup(false)

            // setDeliveryTypeError(false)
        }

    }, [PostPincodesAvailabilityReducer])

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

    }, [GetShipmentDetailsData])

    const handlePaymentSuccess = async (response, orderId) => {
        setLoadSpiner(o => !o)
        // let OrderDetailsId = JSON.parse(OrderDetails);
        // let product_order_id = OrderDetailsId?.toString();
        let InvoicePayLoad = {
            product_order_id: orderId.toString(),
            request_type: "create",
        };

        let LabelPayLoad = {
            product_order_id: orderId.toString(),
            request_type: "create",
        };
        try {
            let bodyData = new FormData();

            // we will send the response we've got from razorpay to the backend to validate the payment
            bodyData.append("response", JSON.stringify(response));
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

                    setLoadSpiner(o => !o)
                    toast.success(res.data.message)
                    dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
                    dispatch(PostOrderDownloadLabelGenerationFile(LabelPayLoad));
                    navigate("/profile")
                })
                .catch((err) => {

                });
        } catch (error) {

        }
    };

    // this will load a script tag which will open up Razorpay payment card to make //transactions
    const loadScript = () => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        document.body.appendChild(script);
    };
    const PaymentFun = async (e, amount) => {
        const res = await loadScript();
        let bodyContent = JSON.stringify({
            "amount": amount,
            "shipment_details_id": GetShipmentDetailsData?.user_shipment_details[0]?.id,
            "delivered_address_id": GetShipmentDetailsData?.user_delivered_location[0]?.id,
            "pickup_address_id": GetShipmentDetailsData?.user_pickup_location[0]?.id
        });

        const data = await Axios({
            url: `${process.env.REACT_APP_BASE_URL}/razorpay`,
            method: "POST",
            headers: {
                Authorization: `Bearer ${BearerToken}`,
                "Accept": "*/*",
                "Content-Type": "application/json",
            },
            data: bodyContent,
        }).then((res) => {
            return res;
        });
        // in data we will receive an object from the backend with the information about the payment
        //that has been made by the user
        let orderId = data?.data?.product_order_id
        let options = {
            key_id: "rzp_test_G0kWdsA9toFR0a", // in react your environment variable must start with REACT_APP_
            key_secret: "qW4iPbrU5Vc84pHzZc4uI5ZA",
            amount: amount,
            currency: "INR",
            description: "Test teansaction",
            image: "", // add image url
            order_id: data?.data?.order_id,
            // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
            handler: function (response) {
                // we will handle success by calling handlePaymentSuccess method and
                // will pass the response that we've got from razorpay
                handlePaymentSuccess(response, orderId);
            },
        };

        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };



    const InputCountryCodePickupFun = (currentValue, objectValue, eventData, eventTargetValue) => {
        // we are not using all the parameters in this function , but all parameters are important becouse of this library 
        let data = []
        let CountryCode = eventTargetValue.split(" ")
        setCountryCodePickup(CountryCode[0])
        CountryCode.slice(1).map((items, id) => {
            data.push(items)
        })
        let myString = data.join("").replace(/\D/g, '');
        setPickupContact(myString)
    }

    const InputCountryCodeDeliveryFun = (currentValue, objectValue, eventData, eventTargetValue) => {
        // we are not using all the parameters in this function , but all parameters are important becouse of this library 
        let data = []
        let CountryCode = eventTargetValue.split(" ")
        setCountryCodeDelivery(CountryCode[0])
        CountryCode.slice(1).map((items, id) => {
            data.push(items)
        })
        let myString = data.join("").replace(/\D/g, '');
        setDeliveryContact(myString)
    }

    const AddressSelect = (e, objectId) => {
        let splitCountruCode = objectId.phone_number.split("-")
        setPatchObjectId(objectId.id)
        setPickupName(objectId.name)
        setPickupContact(splitCountruCode[1])
        setPickUpAddress(objectId.address)
        // setPickupCity(objectId.city)
        // setPickupState(objectId.state)
        setCountryCodePickup(splitCountruCode[0])

        setPickUpPopup(false)
    }

    const AddressSelectDelivery = (e, objectId) => {


        let splitCountruCode = objectId.phone_number.split("-")

        setPatchObjectId(objectId.id)
        setDeliveryName(objectId.name)
        setDeliveryContact(splitCountruCode[1])
        setDeliveryAddress(objectId.address)
        // setDeliveryCity(objectId.city)
        // setDeliveryState(objectId.state)
        setCountryCodeDelivery(splitCountruCode[0])

        setPickUpPopup(false)
    }


    let array = [

        { value: "SAME_DAY_DELIVERY", key: "Same day delivery" },
        { value: "EXPRESS_DELIERY", key: "Express delivery" },
        { value: "AIR_DELIVERY", key: "Air delivery" },
        { value: "SURFACE", key: "Surface Delivery" },
        // { value: "SAME_DAY_PICKUP_AND_DROP", key: "Same day pickup and drop" },
        // { value: "INTERSTATE_PRIVATE_DELIVERY", key: "Next-Day Delivery" },
        { value: "NEXT_DAY_DELIVERY", key: "Next-Day Delivery" },
        { value: "REVERSE_PICKUP_SERVICE_WITH_SAME_PRICE", key: "Reverse pickup service with same price" },
        { value: "INTERNATIONAL_COURIER_SERVICE", key: "Internation Courier service" },
        { value: "SPECIAL_DELIVERY", key: "Special delivery" },

        { value: "OTHERS", key: "Others" },
    ]

    let packageShipping =
        [
            { name: "Envelope", key: "Envelope", price: 150 },
            { name: "Box", key: "Box", price: 200 },

        ]

    // PostAdminOrderEwayBill

    const handleeway = (e) => {
        setEwayPdf(e?.target?.files[0])
        reactLocalStorage.set("Eway_bill_URL", String(e?.target?.files[0].name)) 
        let payloadEwayBill = {
          "eway_bill": e?.target?.files[0],
          "type": "create"
        }
    
        dispatch(PostAdminOrderEwayBill(payloadEwayBill))
    
      }

    return (
        <Layout
            searchBox="none"
        >
            <div className='shipping-sec'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className='shippingleft-part'>
                                <h4>Check Pincode</h4>
                                <form className='row'>
                                    <div className='form-box col-12 mb-3'>
                                        <label className='form-label'>From</label>
                                        <input type="text" className={`form-control check-box  ${!pickuppincodeactive && pickuppincode ? "alert_border" : ""} `} placeholder="Pickup Pincode"
                                            value={pickuppincode} onChange={(e) => PickupPinCodeFun(e)} />
                                        {!pickuppincodeactive && pickuppincode && <span className='text-danger '>
                                            <small> Pincode is not available </small></span>}
                                        <span className='check-img '>
                                            <svg width="39" height="39" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_347_16599" fill="white">
                                                    <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" />
                                                </mask>
                                                <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" fill="#FFC900"
                                                    fillOpacity={pickuppincodeactive ? "1" : "0.1"} />
                                                <path d="M0.00012207 -1H35.0001C37.7615 -1 40.0001 1.23858 40.0001 4H38.0001C38.0001 2.34315 36.657 1 35.0001 1H0.00012207V-1ZM40.0001 37C40.0001 39.7614 37.7615 42 35.0001 42H0.00012207V40H35.0001C36.657 40 38.0001 38.6569 38.0001 37H40.0001ZM0.00012207 41V0V41ZM35.0001 -1C37.7615 -1 40.0001 1.23858 40.0001 4V37C40.0001 39.7614 37.7615 42 35.0001 42V40C36.657 40 38.0001 38.6569 38.0001 37V4C38.0001 2.34315 36.657 1 35.0001 1V-1Z" fill="#EDEDED" mask="url(#path-1-inside-1_347_16599)" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M27.4295 14.0128C27.2657 14.0367 27.146 14.0743 26.9674 14.158C26.8055 14.2339 26.59 14.429 25.9048 15.1196C25.4752 15.5526 24.9631 16.0647 24.3148 16.7093C24.0919 16.931 23.7333 17.2887 23.5179 17.5041C23.1675 17.8547 21.1614 19.8593 20.2325 20.7871C20.0358 20.9835 19.6782 21.3412 19.4378 21.5819C19.1974 21.8227 18.8954 22.1236 18.7668 22.2507C18.6382 22.3777 18.4414 22.5727 18.3294 22.6839C18.2174 22.7952 18.1164 22.883 18.1049 22.8791C18.0844 22.8721 17.9665 22.7733 16.4923 21.5268C16.0818 21.1797 15.5479 20.7283 15.3059 20.5236C14.2217 19.6069 14.174 19.569 14.0043 19.4884C13.8317 19.4065 13.5352 19.3353 13.3694 19.336C13.2036 19.3368 12.9384 19.4023 12.7511 19.4889C12.2536 19.7189 11.9335 20.2809 12.0117 20.7869C12.0853 21.2627 12.1646 21.3627 13.0826 22.1374C13.1894 22.2275 13.6123 22.5842 14.0224 22.93C14.4325 23.2759 15.1743 23.902 15.671 24.3213C17.4601 25.832 17.3978 25.7816 17.5795 25.866C17.7981 25.9674 17.9441 25.9988 18.2029 26C18.5088 26.0014 18.8108 25.9057 19.0418 25.7342C19.0931 25.6962 19.5105 25.2906 19.9693 24.833C20.4282 24.3754 20.9753 23.8299 21.1851 23.6208C21.395 23.4117 21.8577 22.9501 22.2134 22.595C22.5692 22.2399 23.213 21.5971 23.6442 21.1666C24.0755 20.7361 24.9934 19.8189 25.6841 19.1283C26.3747 18.4377 27.035 17.7794 27.1514 17.6654C27.648 17.1786 28.5891 16.2332 28.6838 16.1259C29.1387 15.6106 29.0986 14.8604 28.5905 14.379C28.2969 14.1009 27.8316 13.9542 27.4295 14.0128Z" fill="white" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div className='form-box col-12 '>
                                        <label className='form-label'>To</label>
                                        <input type="text" maxlength={6} className={`form-control check-box ${!deliverypincodeactive && deliveredpincode ? "alert_border" : ""}`} placeholder="Delivered Pincode"
                                            value={deliveredpincode} onChange={(e) => DeliveredPincodeFun(e)} />
                                        {!deliverypincodeactive && deliveredpincode && <span className='text-danger '>
                                            <small> Pincode is not available </small></span>}
                                        <span className='check-img' >
                                            <svg width="39" height="39" viewBox="0 0 39 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <mask id="path-1-inside-1_347_16599" fill="white">
                                                    <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" />
                                                </mask>
                                                <path d="M0.00012207 0H35.0001C37.2093 0 39.0001 1.79086 39.0001 4V37C39.0001 39.2091 37.2093 41 35.0001 41H0.00012207V0Z" fill="#FFC900"
                                                    fillOpacity={deliverypincodeactive ? "1" : "0.1"} />
                                                <path d="M0.00012207 -1H35.0001C37.7615 -1 40.0001 1.23858 40.0001 4H38.0001C38.0001 2.34315 36.657 1 35.0001 1H0.00012207V-1ZM40.0001 37C40.0001 39.7614 37.7615 42 35.0001 42H0.00012207V40H35.0001C36.657 40 38.0001 38.6569 38.0001 37H40.0001ZM0.00012207 41V0V41ZM35.0001 -1C37.7615 -1 40.0001 1.23858 40.0001 4V37C40.0001 39.7614 37.7615 42 35.0001 42V40C36.657 40 38.0001 38.6569 38.0001 37V4C38.0001 2.34315 36.657 1 35.0001 1V-1Z" fill="#EDEDED" mask="url(#path-1-inside-1_347_16599)" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M27.4295 14.0128C27.2657 14.0367 27.146 14.0743 26.9674 14.158C26.8055 14.2339 26.59 14.429 25.9048 15.1196C25.4752 15.5526 24.9631 16.0647 24.3148 16.7093C24.0919 16.931 23.7333 17.2887 23.5179 17.5041C23.1675 17.8547 21.1614 19.8593 20.2325 20.7871C20.0358 20.9835 19.6782 21.3412 19.4378 21.5819C19.1974 21.8227 18.8954 22.1236 18.7668 22.2507C18.6382 22.3777 18.4414 22.5727 18.3294 22.6839C18.2174 22.7952 18.1164 22.883 18.1049 22.8791C18.0844 22.8721 17.9665 22.7733 16.4923 21.5268C16.0818 21.1797 15.5479 20.7283 15.3059 20.5236C14.2217 19.6069 14.174 19.569 14.0043 19.4884C13.8317 19.4065 13.5352 19.3353 13.3694 19.336C13.2036 19.3368 12.9384 19.4023 12.7511 19.4889C12.2536 19.7189 11.9335 20.2809 12.0117 20.7869C12.0853 21.2627 12.1646 21.3627 13.0826 22.1374C13.1894 22.2275 13.6123 22.5842 14.0224 22.93C14.4325 23.2759 15.1743 23.902 15.671 24.3213C17.4601 25.832 17.3978 25.7816 17.5795 25.866C17.7981 25.9674 17.9441 25.9988 18.2029 26C18.5088 26.0014 18.8108 25.9057 19.0418 25.7342C19.0931 25.6962 19.5105 25.2906 19.9693 24.833C20.4282 24.3754 20.9753 23.8299 21.1851 23.6208C21.395 23.4117 21.8577 22.9501 22.2134 22.595C22.5692 22.2399 23.213 21.5971 23.6442 21.1666C24.0755 20.7361 24.9934 19.8189 25.6841 19.1283C26.3747 18.4377 27.035 17.7794 27.1514 17.6654C27.648 17.1786 28.5891 16.2332 28.6838 16.1259C29.1387 15.6106 29.0986 14.8604 28.5905 14.379C28.2969 14.1009 27.8316 13.9542 27.4295 14.0128Z" fill="white" />
                                            </svg>
                                        </span>
                                    </div>
                                </form>
                                <br />  <br />
                                <div className={`${deliverypincodeactive && pickuppincodeactive ? " " : "disable_opercity"} `}>
                                    <h4>Shipment Details</h4>
                                    <form className='row' >
                                        <div className='form-box select-arrow col-12 mb-3'>
                                            <label className='form-label'>Product Type</label>
                                            <select className='form-control' placeholder="Select"
                                                onChange={(e) => { setSelectedProduct(e.target.value) }}>
                                                <option value="none" selected disabled hidden>Select Product Type</option>
                                                <option value="CLOTHES" >Clothes</option>
                                                <option value="GLASS"   > Glass</option>
                                                <option value="OTHERS"  > Others</option>
                                            </select>
                                            {selectedproduct === "OTHERS" ? <input type="search" onChange={(e) => setOtherProductType(e.target.value)} className='form-control col-12 mt-3' id="text" placeholder='Write Product'>

                                            </input> : ""}
                                        </div>


                                        <div className='form-box col-12 mb-3'>
                                            <label className='form-label'>Product Price</label>

                                            {/* <input className={`form-control`} type="number" id="price-text" onChange={(e)=>Ewaybill(e.target.value)}></input> */}
                                            <input
                                                className="form-control" placeholder="Product Price" type="text" id="price-text"
                                                onChange={(e) => setPriceValue(e.target.value)}></input>

                                            {priceValue >= 50000 ? <div className="input_filed input_file  mt-3">
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
                                                {ewayPdf?.length == 0 ? (
                                                    <div className="uploadinfo">E-WAY BILL</div>
                                                ) : (
                                                    ""
                                                )}

                                                <input
                                                    id="uploaddd"
                                                    type="file"
                                                    className="form-control"
                                                    placeholder="GSTIN PDF"
                                                    accept='Application/pdf'
                                                    onChange={(e) =>handleeway(e)
                                                        //  setEwayPdf(e?.target?.files[0])
                                                    }
                                                />
                                            </div> : ""}

                                        </div>
                                        <div className='form-box select-arrow col-md-6 mb-3'>
                                            <label className='form-label'>Delivery Type</label>
                                            <select className={`' ' ${deliverytypeerror ? "alert_border form-control" : "form-control"}`} placeholder="Select"
                                                onChange={(e) => SelectDeliveryType(e)}>
                                                <option value="none" selected disabled hidden>Select Delivery Type</option>
                                                {
                                                    array?.map((item, id) => {
                                                        return <option value={item.value}>{item.key}</option>
                                                    })
                                                }

                                            </select>


                                            {deliverytypeerror && <span className='text-danger '>
                                                <small> Delivery type is not available </small></span>}
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <label className='form-label'>Weight</label>
                                            <input type="text" className='form-control check-box' placeholder="Weight"
                                                value={weight} onChange={(e) => setWeight(e.target.value > 0 ? e.target.value.replace(/\D/g, "") : "")} />
                                            <span className='kg-text'>( gm )</span>
                                        </div>

                                        <div className='shipment-box pt-3'>

                                            <p>Want us to pack your shipment?</p>

                                            <div className='shipment-btn'>

                                                <button type='button' className={yesnoactivebutton ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButton(true)}>Yes</button>

                                                <button type='button' className={!yesnoactivebutton ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButton(false)}>No</button>

                                            </div>

                                        </div>


                                        {/* insurance */}
                                        {yesnoactivebutton && <div className='form-box select-arrow col-12 mb-3'>
                                            <label className='form-label'>Package Shipping</label>
                                            <select className={`' ' ${deliverytypeerror ? "alert_border form-control" : "form-control"}`} placeholder="Select"
                                                onChange={(e) => { setShippingPrice(e.target.value) }}
                                            // onChange={(e) => { handleChange(e) }}
                                            >
                                                <option value="DEFAULT" disable selected hidden>Select Package Type</option>
                                                {
                                                    packageShipping?.map((item) => {

                                                        return (

                                                            <option value={item.name}>
                                                                {item.key} - {item.price}/-
                                                            </option>

                                                        )
                                                    })
                                                }
                                            </select>

                                        </div>}
                                    </form>

                                    <form className='row'>
                                        <div className='form-box col-12 mb-4'>
                                            <label className='form-label'>Pick-up Date</label>
                                            <input type="date" className='form-control date-form' placeholder="Choose From Calendar"
                                                value={date} onChange={(e) => CurrentDateFun(e)} />
                                            <span className='date-img'>
                                            </span>
                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <label className='form-label'>Pickup Address</label>
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="Name"
                                                value={pickupname} onChange={(e) => setPickupName(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>

                                            <PhoneInput
                                                country={'in'}
                                                value={countrycodepickup + pickupcontact}
                                                onChange={InputCountryCodePickupFun}
                                                className="input_filed"
                                            />

                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <PlacesAutocomplete
                                                value={pickupaddress}
                                                onChange={(e) => PickupAddressFun(e)}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className={pickupaddressactive ? "mb-4" : ""}>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Search Places',
                                                                className: 'location-search-input',
                                                            })}
                                                            className={`form-control`}
                                                        // please don't remove this class this is for validation 
                                                        // className={`form-control ${pickupaddressactive ? "alert_border" : ""}`}
                                                        />
                                                        <div className="autocomplete-dropdown-container">

                                                            {suggestions.map(suggestion => {
                                                                const className = suggestion.activesi
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';
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
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="City"
                                                value={pickupcity} onChange={(e) => setPickupCity(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="State"
                                                value={pickupstate} onChange={(e) => setPickupState(e.target.value)} />
                                        </div>

                                        <div className='form-box col-12 mb-3'>
                                            <label className='form-label'>Delivery Address</label>
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="Name"
                                                value={deliveryname} onChange={(e) => setDeliveryName(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>

                                            <PhoneInput
                                                country={'in'}
                                                value={countrycodedelivery + deliverycontact}

                                                onChange={InputCountryCodeDeliveryFun}
                                                className="input_filed"
                                            />

                                        </div>
                                        <div className='form-box col-12 mb-3'>
                                            <PlacesAutocomplete
                                                value={deliveryaddress}
                                                onChange={(e) => DeliveryAddressFun(e)}
                                            >
                                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                                    <div className={deliveryaddressactive ? "mb-4" : ""}>
                                                        <input
                                                            {...getInputProps({
                                                                placeholder: 'Search Places ...',
                                                                className: 'location-search-input',
                                                            })}
                                                            className={`form-control`}
                                                        // please don't remove this class this is for validation 
                                                        // className={`form-control ${deliveryaddressactive ? "alert_border" : ""}`}

                                                        />
                                                        <div className="autocomplete-dropdown-container">
                                                            {loading && <div>Loading...</div>}
                                                            {suggestions.map(suggestion => {
                                                                const className = suggestion.activesi
                                                                    ? 'suggestion-item--active'
                                                                    : 'suggestion-item';

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

                                                            {/* {!suggestions[0]?.description && deliveryaddressactive ? <span className='text-danger mb-4 '>
                                                                <small> This address is not available </small></span> : setDeliveryAddressActive(false)} */}

                                                        </div>
                                                    </div>
                                                )}
                                            </PlacesAutocomplete>

                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="City"
                                                value={deliverycity} onChange={(e) => setDeliveryCity(e.target.value)} />
                                        </div>
                                        <div className='form-box col-md-6 mb-3'>
                                            <input type="text" className='form-control' placeholder="State"
                                                value={deliverystate} onChange={(e) => setDeliveryState(e.target.value)} />
                                        </div>
                                        <div className='shipment-box pt-3'>

                                            <p>Do you want Insurance ?</p>

                                            <div className='shipment-btn'>

                                                <button type='button' className={yesnoactivebuttonInsurance ? 'active yes-btn' : "yes-btn"} onClick={(e) => setYesNoActiveButtonInsurance(true)}>Yes</button>

                                                <button type='button' className={!yesnoactivebuttonInsurance ? 'active no-btn' : "no-btn"} onClick={(e) => setYesNoActiveButtonInsurance(false)}>No</button>

                                            </div>

                                        </div>
                                    </form>    <input type="button" className='btn' value="Confirm" style={{ fontSize: "19px", color: "#000", fontWeight: 600, borderRadius: "10px", backgroundColor: "#FFC900", borderColor: "#FFC900", padding: "6px 42px" }}
                                        onClick={(e) => { pickuppincodeactive && deliverypincodeactive && ConfirmDeleverFun(e); e.preventDefault() }} />

                                </div>
                            </div>
                        </div>

                        <div className='col-md-6'>
                            <div className="shipmentright-part">
                                <h3 className=''>Shipment Details</h3>
                                <hr />
                                <h5 className='mb-2'>Pickup Location</h5>
                                <p>
                                    {!GetShipmentDetailsData ? "Add your Pickup Location " : GetShipmentDetailsData && `${GetShipmentDetailsData.user_pickup_location[0].address},
                                    ${GetShipmentDetailsData.user_pickup_location[0].city}, ${GetShipmentDetailsData.user_pickup_location[0].pincode},
                                    ${GetShipmentDetailsData.user_pickup_location[0].state}`
                                    }
                                </p>
                                <h5 className='mb-2'>Deliver Location</h5>
                                <p>
                                    {!GetShipmentDetailsData ? "Add your Deliver Location " : GetShipmentDetailsData && `${GetShipmentDetailsData.user_delivered_location[0].address},
                                    ${GetShipmentDetailsData.user_delivered_location[0].city}, ${GetShipmentDetailsData.user_delivered_location[0].pincode},
                                    ${GetShipmentDetailsData.user_delivered_location[0].state}`}

                                </p>
                                <div className='row'>
                                    <div className='col-md-8 col-6'>
                                        <h5>Date </h5>
                                        <p className='mb-0'>
                                            {!GetShipmentDetailsData ? "Select your date" : GetShipmentDetailsData && `${GetShipmentDetailsData.user_shipment_details[0].pickup_date}`}

                                        </p>
                                    </div>
                                    <div className='col-md-4 col-6'>
                                        <h5>Delivery Type </h5>
                                        <p className='mb-0'>
                                            {!GetShipmentDetailsData ? "Select your Delivery type" : GetShipmentDetailsData && `${GetShipmentDetailsData.user_shipment_details[0].delivery_type}`}

                                        </p>
                                    </div>
                                </div>
                                <hr />
                                <h3>Packages</h3>
                                <div className='row'>
                                    <div className='col-md-8 col-6'><p className='mb-2'>Shipping Cost</p></div>
                                    <div className='col-md-4 col-6'><h4>

                                        Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.shipping_cost}`}

                                        /-</h4></div>
                                    <div className='col-md-8 col-6'><p className='mb-2'>GST</p></div>
                                    <div className='col-md-4 col-6'><h4>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.gst}`}/-</h4></div>
                                    <div className='col-md-8 col-6'><p className='mb-2'>Packeging Cost</p></div>
                                    <div className='col-md-4 col-6'><h4>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.pacakaging_cost}`}/-</h4></div>
                                    <div className='col-md-8 col-6'><p className='mb-2'>Insurance Cost</p></div>
                                    <div className='col-md-4 col-6'><h4>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.insurance_price}`}/-</h4></div>
                                </div>
                                <hr />
                                <div className='row mt-5 mb-4'>
                                    <div className='col-md-8 col-6'><h2>Total Amount</h2></div>
                                    <div className='col-md-4 col-6'><h2>Rs. {!GetShipmentDetailsData ? "0" : GetShipmentDetailsData && `${GetShipmentDetailsData.calculation_details.total_price}`}/-</h2></div>
                                </div>
                                <button type='button'
                                    className={`${GetShipmentDetailsData ? "btn" : "disable_opercity btn"} `}
                                    onClick={(e) => GetShipmentDetailsData && PaymentFun(e, GetShipmentDetailsData && GetShipmentDetailsData.calculation_details.total_price)}>
                                    Proceed To Pay </button>
                            </div>
                        </div>
                    </div>
                </div>
                <LodingSpiner
                    loadspiner={loadspiner} />
            </div>


            <Popup open={pickuppopup} position="" model className="sign_up_loader">
                <div className="container">
                    <div className='loader-sec adresloader-sec'>
                        <div className="justify-content-center  bg-white">
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
                            <div className='px-3 pb-4 addressdetails-data' >
                                <b> Address Details </b>
                                {OrderDetails && OrderDetails?.data?.map((item, id) => {
                                    return <div className='d-flex justify-content-between'>

                                        <div className='d-flex pt-3'>
                                            <svg width="40" height="40" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="15.5" cy="15.5" r="15" fill="white" stroke="#D9D9D9" />
                                                <path fillRule="evenodd" clipRule="evenodd" d="M15.4728 8.02253C14.366 8.14097 13.2931 8.58371 12.423 9.2811C12.0878 9.5498 11.5333 10.1319 11.278 10.4833C9.99999 12.2421 9.65997 14.5407 10.3508 16.7516C10.8997 18.5084 11.979 20.2219 13.6375 21.9697C14.345 22.7153 15.3788 23.6498 15.8078 23.9317C16.0264 24.0754 16.1316 24.0252 16.7989 23.4593C18.0415 22.4056 19.3078 21.0214 20.1395 19.8076C21.0638 18.4588 21.6999 16.9716 21.9201 15.645C22.0393 14.9269 22.0238 13.8905 21.8827 13.1439C21.4734 10.9763 19.9531 9.11024 17.9874 8.36243C17.2475 8.08098 16.222 7.94235 15.4728 8.02253ZM16.4508 8.7863C17.7582 8.91987 18.8868 9.49524 19.7881 10.4877C21.168 12.0071 21.6394 14.156 21.0526 16.2524C20.7519 17.3269 20.2356 18.3838 19.4903 19.4503C18.6485 20.655 17.4089 21.9883 16.1821 23.0084L16.0049 23.1558L15.714 22.9115C15.2183 22.4952 14.5486 21.8583 14.0619 21.3401C11.3701 18.4746 10.2626 15.6151 10.863 13.0806C11.2075 11.6266 12.1028 10.3364 13.308 9.55776C13.937 9.15133 14.7513 8.86631 15.5076 8.78781C15.9179 8.74525 16.0467 8.74504 16.4508 8.7863ZM15.4065 11.3038C14.6939 11.459 13.9868 11.9536 13.5636 12.5928C12.9723 13.4859 12.8392 14.6819 13.2192 15.6881C13.4971 16.4241 13.9974 17.0049 14.6607 17.3615C15.1557 17.6276 15.4209 17.6931 16.0032 17.6931C16.5841 17.6931 16.8485 17.6281 17.3458 17.363C17.9921 17.0185 18.5132 16.4189 18.7762 15.7172C18.9381 15.285 18.9938 14.9772 18.9958 14.5016C18.998 13.9649 18.9211 13.5764 18.7219 13.1181C18.3123 12.176 17.5052 11.4927 16.5756 11.301C16.2745 11.2389 15.6981 11.2403 15.4065 11.3038ZM16.4605 12.0551C17.0263 12.176 17.5864 12.5844 17.9133 13.1145C18.3423 13.81 18.4127 14.7647 18.0894 15.5015C17.787 16.1907 17.2365 16.6895 16.5668 16.881C16.2769 16.9639 15.7275 16.9635 15.4397 16.8803C14.6063 16.6391 13.9475 15.9062 13.7637 15.0158C13.6774 14.5976 13.7096 14.0408 13.8427 13.6522C14.2423 12.4847 15.3392 11.8155 16.4605 12.0551Z" fill="#777777" />
                                            </svg>
                                            <div className='px-4 '>
                                                <h6 className='p-0 m-0'><small><b>  {item.name}</b></small></h6>
                                                <span><small>{item.address}</small></span>
                                            </div>

                                        </div>

                                        <div className='text-warning pe-3 pt-4  ' style={{ cursor: "pointer" }}
                                            onClick={(e) => pickupModalStatus ? AddressSelect(e, item) : AddressSelectDelivery(e, item)}>
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



        </Layout>
    )

}

export default Shipping