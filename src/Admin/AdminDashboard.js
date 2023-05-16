import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminDashboardViewOrder, GetB2bCompanyInfo, OrderPageBookNavigate, PostAdminDashboardShippingMatrix, PostAdminDashboardTransaction, PostDashboardRevenue, PostOrderTrack } from "../Redux/action/ApiCollection"
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import Popup from "reactjs-popup";
import { toast } from "react-toastify";
import { TokenDataValidCheck } from '.././Authanticate'
import { Select, Button } from "antd";
import "antd/dist/antd.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PermissionData } from "../Permission";
import { reactLocalStorage } from "reactjs-localstorage";


const AdminDashboard = () => {
  const [pickuppopup, setPickUpPopup] = useState(false)
  const [totalorder, setTotalOrder] = useState("")
  const [pendingorder, setPendingOrder] = useState("")
  const [deliveredorder, setDeliveredOrder] = useState("")
  const [indeliveryorder, setIndeliveryOrder] = useState("")
  const [issues, setIssues] = useState("")
  const [popupcheckdata, setPopupCheckData] = useState("")
  const [lateorder, setLateOrder] = useState("")
  const [datapicker, setDataPicker] = useState([{
    startDate: new Date(),
    endDate: addDays(new Date(), 0),
    key: 'selection'
  }
  ]);

  const [shipmentmatrixdata, setShipmentMatrixData] = useState("")
  const [revenuedata, setRevenueData] = useState("")
  const [shipmentmatrixdelivereddata, setShipmentMatrixDeliveredData] = useState("")
  const [shipmentmatrixdatadate, setShipmentMatrixDataDate] = useState("")
  const [revenuedate, setRevenueDate] = useState('')
  const [opendropdown, setOpenDropDown] = useState(false)
  const [opendropdownnn, setOpenDropDownnn] = useState(false)
  const [dropdownshowdata, setDropDownShowData] = useState("Last 7 days")
  const [dropdownshowdatannn, setDropDownShowDatannn] = useState("Last 7 days")
  const [opentransectiondropdown, setOpenTransectionDropDown] = useState(false)
  const [dropdownshowtransectiondata, setDropDownShowTransectionData] = useState("Last 7 days")

  const [openrevenuedropdown, setOpenRevenueDropDown] = useState(false)
  const [dropdownshowrevenuedata, setDropDownShowRevenueData] = useState("Last 7 days")



  const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
  const [domesticcheckBox, setDomesticCheckBox] = useState(false);
  const [b2bpartnerselectedvalue, setB2BPartnerSelectedValue] = useState("");

  const [last7dayscheckbox, setLast7daysCheckBox] = useState(false);
  const [last30dayscheckbox, setLast30daysCheckBox] = useState(false);
  const [currentmonthcheckbox, setCurrentMonthCheckBox] = useState(false);
  const [customcheckbox, setCustomCheckBox] = useState(false);

  const [startdate, setStatrtDate] = useState("");
  const [enddate, setEndDate] = useState("");

  const [pagepathdata, setPagePathData] = useState("");
  const [revenuealladata, setRevenueAllData] = useState("")

  const [filterActive, setFilterActive] = useState(false)

  const [OrderId, setOrderId] = useState("")
  const [OrderId1, setOrderId1] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  let param = useLocation();

  const GetAdminDashboardViewOrderData = useSelector(state => state.GetAdminDashboardViewOrderReducer.GetAdminDashboardViewOrderData?.data)
  const PostAdminDashboardTransactionData = useSelector(state => state.PostAdminDashboardTransactionReducer.PostAdminDashboardTransactionData?.data)
  const PostAdminDashboardShippingMatrixData = useSelector(state => state.PostAdminDashboardShippingMatrixReducer.PostAdminDashboardShippingMatrixData?.data)
  const PostDashboardRevenueData = useSelector(state => state.PostDashboardRevenueReducer.PostDashboardRevenueData?.data)
  const ToggleFunData = useSelector(state => state.ToggleSideBarReducer.ToggleSideBarData)
  const GetB2bCompanyInfoData = useSelector(state => state.GetB2bCompanyInfoReducer?.GetB2bCompanyInfoData?.data)
  const PostOrderTrackData = useSelector(
    (state) => state.PostOrderTrackReducer.PostOrderTrackData
  );

  const HeaderToggleClassAddData = useSelector(
    (state) =>
      state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );




  useEffect(() => {

    navigate(TokenDataValidCheck())


    setTotalOrder(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.total_order)
    setPendingOrder(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.pending_order)
    setDeliveredOrder(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.delivered_order)
    setIndeliveryOrder(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.indelivery_order)
    setIssues(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.issues)
    setLateOrder(GetAdminDashboardViewOrderData && GetAdminDashboardViewOrderData[0]?.late_order)

    // first time page render will show the 7 days data 

  }, [GetAdminDashboardViewOrderData])

  useEffect(() => {

    let Alldata = {
      "filter_type": "all"
    }

    dispatch(PostAdminDashboardTransaction(Alldata))
    dispatch(PostAdminDashboardShippingMatrix(Alldata))
    dispatch(PostDashboardRevenue(Alldata))

    dispatch(GetAdminDashboardViewOrder(Alldata))

    dispatch(GetB2bCompanyInfo())

  }, [])


 


  useEffect(() => {

    // navigate(tokenData()) //if token (persone is not login then he/she will be not access this page)

    let allDataShiping = PostAdminDashboardShippingMatrixData && PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {

      return item.in_transit
    })
    let allDataDelivere = PostAdminDashboardShippingMatrixData && PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {

      return item.delivered
    })
    let allDataDate = PostAdminDashboardShippingMatrixData && PostAdminDashboardShippingMatrixData.shipment_data.map((item, id) => {

      
      let splitData = item.date.split()
  
      return splitData[0]
    })


    setShipmentMatrixData(allDataShiping)
    setShipmentMatrixDeliveredData(allDataDelivere)
    setShipmentMatrixDataDate(allDataDate)

    let RevenueData = PostDashboardRevenueData && PostDashboardRevenueData.map((item, id) => {
      return item.amount
    })

    let allRevenueDate = PostDashboardRevenueData && PostDashboardRevenueData.map((item, id) => {

      let splitData = item.date.split("-")
     
      return splitData[2]
    })


    setRevenueAllData(RevenueData)
    setRevenueData(allRevenueDate)

  }, [PostAdminDashboardShippingMatrixData, PostDashboardRevenueData])


  useEffect(() => {

    // navigate(tokenData())

    let RevenueData = PostDashboardRevenueData && PostDashboardRevenueData.map((item, id) => {

      return item.amount
    })
    let RevenueDate = PostDashboardRevenueData && PostDashboardRevenueData.map((item, id) => {


      let splitData = item.date.split()

      return splitData[0]
    })
    setRevenueData(RevenueData)
    setRevenueDate(RevenueDate)

  }, [PostDashboardRevenueData])



  const TransectionFun = (e, checkFun, TargetValue) => {



    setOpenDropDown(false)
    setOpenTransectionDropDown(false)
    setOpenRevenueDropDown(false)


    const ThisMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }

    const LastMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth())).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    let today = new Date();


    let this_month = {
      "filter_type": TargetValue,
      "start_date": ThisMonthConvert(today)
    }
    let seven_days = {
      "filter_type": TargetValue
    }

    let last_month = {
      "filter_type": TargetValue,
      "start_date": LastMonthConvert(today)
    }


    if (TargetValue === "7days") {
      if (checkFun === "Transection") {

        dispatch(PostAdminDashboardTransaction(seven_days))
      }
      else if (checkFun === "Revenue") {

        dispatch(PostDashboardRevenue(seven_days))
      }
      else {
        dispatch(PostAdminDashboardShippingMatrix(seven_days))
      }
    }

    else if (TargetValue === "last_month") {
      if (checkFun === "Transection") {
        dispatch(PostAdminDashboardTransaction(last_month))
      }
      else if (checkFun === "Revenue") {
        dispatch(PostDashboardRevenue(last_month))
      }
      else {
        dispatch(PostAdminDashboardShippingMatrix(last_month))
      }


    }
    else if (TargetValue === "this_month") {

      if (checkFun === "Transection") {
        dispatch(PostAdminDashboardTransaction(this_month))
      }
      else if (checkFun === "Revenue") {
        dispatch(PostDashboardRevenue(this_month))
      }
      else {
        dispatch(PostAdminDashboardShippingMatrix(this_month))
      }


    }
    else if (TargetValue === "custom") {
      setPickUpPopup(true)
      setPopupCheckData(checkFun)
    }

  }

  const DataPickerFun = (e) => {
    setDataPicker([e.selection])
  }


  const DatePickerSaveFun = () => {

    const selectedEndDate = new Date(datapicker[0].endDate);
    const selectedStartDate = new Date(datapicker[0].startDate);
    const maxDate = new Date();
    maxDate.setHours(0, 0, 0, 0);

    if (selectedEndDate <= maxDate && selectedStartDate <= maxDate) {
      const startDateFun = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
      const endDateFun = (str) => {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
      }
      let startDateValue = startDateFun(datapicker[0].startDate)
      let endDateValue = endDateFun(datapicker[0].endDate)

      setStatrtDate(startDateValue)
      setEndDate(endDateValue)

    }
    else {
      setCustomCheckBox(false) //this will uncheck the sort by
      toast.warn("Please Select Correct Date")

    }
    setPickUpPopup(false)
    setDataPicker([{
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection'
    }])
  }


  const NationalityFun = (data) => {
    if (data == "Last 7 Days") {
      setLast7daysCheckBox((o) => !o);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox(false)
      setCustomCheckBox(false)
    } else if (data == "Last 30 Days") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox((o) => !o);
      setCurrentMonthCheckBox(false)
      setCustomCheckBox(false)
    }
    else if (data == "Current month") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox((o) => !o)
      setCustomCheckBox(false)

    }
    else if (data == "Custom") {
      setLast7daysCheckBox(false);
      setLast30daysCheckBox(false);
      setCurrentMonthCheckBox(false)
      setCustomCheckBox((o) => !o)
      setPickUpPopup(true) //this will open the calender popup
    }
  };




  const SearchPage = (e) => {

    let value = e.target.value.toUpperCase();
    let result = []
    result = GetB2bCompanyInfoData?.filter((data) => {  //get client data c-2 -3a

      if (isNaN(+value)) {
        return data?.company_name.toUpperCase().search(value) !== -1;
      }
    });
    setPagePathData(result)

  }

  const ApplyFilterFun = () => {


    let SortedByData = ""
    let payloadData = ''

    const ThisMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    const LastMonthConvert = (str) => {
      var date = new Date(str),
        mnth = ("0" + (date.getMonth())).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      return [date.getFullYear(), mnth, day].join("-");
    }
    let today = new Date();



    if (last7dayscheckbox) {
      SortedByData = "7days";
      payloadData = {
        "filter_type": "7days",
        "b2b_patner_id": b2bpartnerselectedvalue
      }

    }
    else if (last30dayscheckbox) {
      SortedByData = "last_month";

      payloadData = {
        "filter_type": "last_month",
        "start_date": LastMonthConvert(today),
        "b2b_patner_id": b2bpartnerselectedvalue
      }
    }
    else if (currentmonthcheckbox) {
      SortedByData = "this_month"
      payloadData = {
        "filter_type": "this_month",
        "start_date": ThisMonthConvert(today),
        "b2b_patner_id": b2bpartnerselectedvalue
      }
    }

    else if (customcheckbox) {
      SortedByData = "custom"
      payloadData = {
        "filter_type": "custom",
        "start_date": startdate,
        "end_date": enddate,
        "b2b_patner_id": b2bpartnerselectedvalue
      }
    }


    if (customcheckbox || currentmonthcheckbox || last30dayscheckbox || last7dayscheckbox) {
      dispatch(PostAdminDashboardTransaction(payloadData))
      dispatch(PostAdminDashboardShippingMatrix(payloadData))
      dispatch(PostDashboardRevenue(payloadData))
      dispatch(GetAdminDashboardViewOrder(payloadData))
    }
    else {

      payloadData = {
        "filter_type": "all",
        "b2b_patner_id": b2bpartnerselectedvalue
      }

      dispatch(PostAdminDashboardTransaction(payloadData))
      dispatch(PostAdminDashboardShippingMatrix(payloadData))
      dispatch(PostDashboardRevenue(payloadData))
      dispatch(GetAdminDashboardViewOrder(payloadData))

      // toast.warn("Please Select Sort By ")
    }



    setFilterShowHideBtn(false)

    if (SortedByData || payloadData.filter_type !== "all") {
      setFilterActive(true)

    }
    else {


    }

  }
  const FilterShowHideBtnFun = () => {
    // setFilterShowHideBtn(false)
    // setLast7daysCheckBox(false)
    // setLast30daysCheckBox(false)
    // setCurrentMonthCheckBox(false)
    // setCustomCheckBox(false)
    // setFilterActive(false)
    // ApplyFilterFun()
    window.location.reload(false)


  }


  useEffect(() => {


    if (PostAdminDashboardTransactionData) {
      let data = PostAdminDashboardTransactionData?.transaction_details.map((item, id) => {
        let payload
        if (item.method == "DIRECT") {


          return payload = {
            "amount": item.amount,
            "date": item.date,
            "id": item.id,
            "method": "PREPAID",
            "product_order_id": item.product_order_id,
            "payment_status": item.payment_status

          }

        }
        else {
          return payload = {
            "amount": item.amount,
            "date": item.date,
            "id": item.id,
            "method": item.method,
            "product_order_id": item.product_order_id,
            "payment_status": item.payment_status

          }

        }

      })

      PostAdminDashboardTransactionData.transaction_details = data

  

   
    }


  }, [PostAdminDashboardTransactionData])

  const FilterShowHideBtnFuna = () => {
    if (PermissionData()?.APPLY_DASHBOARD_FILTER == "APPLY_DASHBOARD_FILTER") {
      setFilterShowHideBtn(true)
    }

  }

  // const clearCacheData = () => {
  //   caches.keys().then((names) => {
  //     names.forEach((name) => {
  //       caches.delete(name);
  //     });
  //   });
  //   alert('Complete Cache Cleared')
  // };
  const TrackFun = async () => {


   
    let payload = {
      oid: OrderId,
    };
    dispatch(PostOrderTrack(payload));
    setOrderId1(true)
    // await navigate(`/admin/ordertrack/${OrderId}`); 
  }



  useEffect(() => {
    setOrderId1(false)
    if (PostOrderTrackData.status == 200 && param?.pathname == "/admin/dashboard" && OrderId1 == true) {
      if (PostOrderTrackData?.data?.current_status !== "PENDING") {
        navigate(`/admin/ordertrack/${OrderId}#dashboard`)
      }
      toast.warn(PostOrderTrackData?.data?.message);
       
    }
    // if(PostOrderTrackData?.data?.current_status==="PENDING"){
    //   navigate("/admin/dashboard")
    // }


  }, [PostOrderTrackData])

  return (
    <>
      {/* <button onClick={() => clearCacheData()} >
        Clear Cache Data</button> */}
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
          <Sidebar />
          <div className="content-sec">
            <div className="dashboardcontent-title">
              <h2>My Dashboard </h2>
              <div className="d-flex">
                <div className="ordertittle-part p-0 me-5">

                  <ul>
                    <div className="form-group">
                      <input
                        type="search"
                        placeholder="Order Id"
                        onChange={(e) => setOrderId(e.target.value)}
                      // value={tabfiltersearchdata}
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
                  </ul>
                  <button type="button" className="  track-btn"
                    onClick={(e) => TrackFun() // dispatch(OrderPageBookNavigate(paramHash?.hash));
                    }
                  >
                    Track
                  </button>

                </div>


                <div className={`filter-part  `}>

                  <button
                    type="button"
                    className={`${filterActive ? "bg-warning btn" : " btn"}  ${PermissionData()?.APPLY_DASHBOARD_FILTER == "APPLY_DASHBOARD_FILTER" ? " " : "permission_blur"}`}
                    onClick={(e) => FilterShowHideBtnFuna()} //this permission is in inside the function
                  >
                    Filter
                    {/* <img src="/images/adminimage/filter.svg" alt="img" /> */}
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
                    className={`filter-body ${filtershowhidebtn ? "" : "d-none"
                      } `}
                  >
                    <button
                      type="button"
                      className="close-btn"
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

                    <div className="search-box">
                      <input type='' className='form-control' placeholder='Search' onChange={(e) => SearchPage(e)} />
                      <span>
                        <svg width='15' viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4.03473 4.72309e-07C4.81168 -0.0003645 5.5722 0.210799 6.22482 0.608096C6.87745 1.00539 7.39439 1.57191 7.71348 2.2395C8.03257 2.9071 8.14022 3.64735 8.02349 4.37124C7.90675 5.09512 7.5706 5.77182 7.05546 6.31993L11 10.5394L10.4526 11L6.51779 6.799C6.01166 7.17208 5.41826 7.4258 4.78702 7.53902C4.15578 7.65223 3.50498 7.62166 2.88881 7.44986C2.27264 7.27806 1.70896 6.96999 1.2447 6.55133C0.780445 6.13266 0.429062 5.61551 0.219819 5.04296C0.0105753 4.47041 -0.0504694 3.85903 0.0417681 3.25974C0.134006 2.66046 0.376856 2.09062 0.750091 1.59769C1.12332 1.10476 1.61614 0.703004 2.18748 0.425897C2.75882 0.14879 3.39216 0.00434983 4.03473 0.00460684V4.72309e-07ZM4.03473 6.90955C4.90977 6.90955 5.74897 6.58196 6.36771 5.99886C6.98646 5.41575 7.33407 4.62489 7.33407 3.80025C7.33407 2.97561 6.98646 2.18475 6.36771 1.60165C5.74897 1.01854 4.90977 0.690955 4.03473 0.690955C3.15969 0.690955 2.32049 1.01854 1.70174 1.60165C1.083 2.18475 0.735388 2.97561 0.735388 3.80025C0.735388 4.62489 1.083 5.41575 1.70174 5.99886C2.32049 6.58196 3.15969 6.90955 4.03473 6.90955Z" fill="#B7B7B7" />
                        </svg>

                      </span>
                    </div>

                    <h5>Sort By</h5>
                    <div className="row">
                      <div className="col-6 mb-2">
                        <label className="checkbox domestic-box">
                          Last 7 Days
                          <input
                            type="checkbox"
                            checked={last7dayscheckbox}
                            onChange={(e) => NationalityFun("Last 7 Days")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-6 mb-2">
                        <label className="checkbox international-box">
                          Last 30 Days
                          <input
                            type="checkbox"
                            checked={last30dayscheckbox}
                            onChange={(e) => NationalityFun("Last 30 Days")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                      <div className="col-6">
                        <label className="checkbox domestic-box">
                          Current month
                          <input
                            type="checkbox"
                            checked={currentmonthcheckbox}
                            onChange={(e) => NationalityFun("Current month")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>
                      <div className="col-6">
                        <label className="checkbox international-box">
                          Custom
                          <input
                            type="checkbox"
                            checked={customcheckbox}
                            onChange={(e) => NationalityFun("Custom")}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </div>

                    </div>




                    <h5 className="mp-3">B2B Partner</h5>
                    <div className="express-box">
                      <select
                        className="form-select"
                        onChange={(e) => setB2BPartnerSelectedValue(e.target.value)}
                      >
                        <option value="none" selected disabled hidden>
                          Ecom Express...
                        </option>

                        {pagepathdata?.length !== 0 ? pagepathdata?.map((item, id) => {

                          return <option value={item.user_id}>{item.company_name}</option>
                        }) : GetB2bCompanyInfoData?.map((item, id) => {

                          return <option value={item.user_id}>{item.company_name}</option>
                        })}

                      </select>
                      {/* <input type="search" placeholder="Search..."   onChange={(e) => SearchPage(e)} />
                    {pagepathdata && <ul>
                      {pagepathdata && pagepathdata?.map((item, id) => {
                        
                        return <li onClick={(e)=>setPagePathData([item])}>
                         {item.value1} 
                          
                        </li>
                      })}
                    </ul>} */}

                      {/* <Select style={{ width: 120 }}>
                      {pageData && pageData?.map(({ value, id }) => {
       
                        return <Select.Option value={value} key={value}>
                          {value}
                        </Select.Option>
                      })}
                    </Select> */}

                    </div>
                    <div className="filterbtn-group">
                      <div className="row">
                        <div className="col-6">
                          <button
                            type="button"
                            className="btn btn-cancel"
                            onClick={(e) => FilterShowHideBtnFun(e)}
                          >
                            Cancel
                          </button>
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
              </div>
            </div>
            <div className="dashboardcontent-part">
              <ul className="adminorder-list">
                <li
                  className={`${PermissionData()?.VIEW_DASHBOARD_TOTAL_ORDER == "VIEW_DASHBOARD_TOTAL_ORDER" ? " " : "permission_blur"}`}
                >
                  <figure>
                    <img src="/images/adminImage/icon11.png" alt="img" />
                  </figure>
                  <div className="">
                    <h6>Total Orders</h6>
                    <h3>{PermissionData()?.VIEW_DASHBOARD_TOTAL_ORDER == "VIEW_DASHBOARD_TOTAL_ORDER" ? totalorder : "0"}</h3>
                    {/* <div className="order-text">
                        {" "}
                        <img src="/images/adminImage/icon14.png" alt="img" />
                      </div> */}
                  </div>
                </li>
                <li
                  className={`${PermissionData()?.VIEW_DASHBOARD_PENDING == "VIEW_DASHBOARD_PENDING" ? " " : "permission_blur"}`}
                >
                  <figure>
                    <img src="/images/adminImage/icon13.png" alt="img" />
                  </figure>
                  <div className="">
                    <h6>Pending</h6>
                    <h3>{PermissionData()?.VIEW_DASHBOARD_PENDING == "VIEW_DASHBOARD_PENDING" ? pendingorder : "0"}  </h3>
                    {/* <div className="order-text">
                        {" "}
                        <img src="/images/adminImage/icon15.png" alt="img" />
                      </div> */}
                  </div>
                </li>
                <li
                  className={`${PermissionData()?.VIEW_DASHBOARD_DELIVERED == "VIEW_DASHBOARD_DELIVERED" ? " " : "permission_blur"}`}
                >
                  <figure>
                    <img src="/images/adminImage/icon12.png" alt="img" />
                  </figure>
                  <div className="">
                    <h6>Delivered</h6>
                    <h3>{PermissionData()?.VIEW_DASHBOARD_DELIVERED == "VIEW_DASHBOARD_DELIVERED" ? deliveredorder : "0"}
                    </h3>
                    {/* <div className="order-text">
                        {" "}
                        <img src="/images/adminImage/icon15.png" alt="img" />
                      </div> */}
                  </div>

                </li>
              </ul>

              <div className="meter-box">
                <div className={`admin-box ${PermissionData()?.VIEW_DASHBOARD_SHIPMENT_MATRIX == "VIEW_DASHBOARD_SHIPMENT_MATRIX" ? " " : "permission_blur"}`}>
                  <div className="title-part">
                    <h3>Shipment Metrics</h3>
                    {/* <div className="admin-dropdown">
                      <div onClick={(e) => setOpenDropDown(o => !o)}>
                        {dropdownshowdata}
                      </div>
                      {opendropdown && <ul>
                        <li onClick={(e) => { setDropDownShowData("Last 7 days"); TransectionFun(e, "ShipmentMetrics", "7days") }}>
                          Last 7 days
                        </li>
                        <li onClick={(e) => { setDropDownShowData("Last Month"); TransectionFun(e, "ShipmentMetrics", "last_month") }}>
                          Last Month
                        </li>
                        <li onClick={(e) => { setDropDownShowData("This Month"); TransectionFun(e, "ShipmentMetrics", "this_month") }}>
                          This Month
                        </li>
                        <li onClick={(e) => { setDropDownShowData('custom'); TransectionFun(e, "ShipmentMetrics", "custom") }}>
                          Custom
                        </li>
                      </ul>}
                    </div> */}
                  </div>


                  <div className=" mt-lg-3 px-2">
                    <Chart
                      width="100%"
                      height={250}
                      series={[
                        {
                          name: "In-Transit",
                          data: PermissionData()?.VIEW_DASHBOARD_SHIPMENT_MATRIX == "VIEW_DASHBOARD_SHIPMENT_MATRIX" ? shipmentmatrixdata : [],
                          // data: [3,4,6,9,23,45,3,4,6,9,23,45,8,6,12,10,28,35],
                          type: "bar",
                          color: "#2A3647",
                        },
                        {
                          name: "Delivered",
                          data: PermissionData()?.VIEW_DASHBOARD_SHIPMENT_MATRIX == "VIEW_DASHBOARD_SHIPMENT_MATRIX" ? shipmentmatrixdelivereddata : [],

                          // data: shipmentmatrixdelivereddata,
                          // data:  [8,6,12,10,28,35,8,3,4,6,9,23,45,6,12,10,28,35], 
                          type: "bar",
                          color: "#FFC900",
                        },
                      ]}
                      options={{
                        labels: shipmentmatrixdatadate,
                        // stroke: {
                        //   curve: "smooth",
                        // },
                        chart: {
                          offsetX: 0,
                          offsetY: 0,
                          dropShadow: {
                            enabled: false,
                            color: "#FFC900",
                          },
                        },
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            columnWidth: '65%',
                            endingShape: 'rounded'
                          },
                        },
                        dataLabels: {
                          enabled: false
                        },
                        stroke: {
                          show: true,
                          width: 1,
                          colors: ['transparent']
                        },
                        fill: {
                          type: "solid",
                          opacity: 1,
                        },
                        xaxis: {
                          labels: {
                            show: true,
                          },
                          axisBorder: {
                            show: true,
                            color: "#979699",
                            height: 0,
                            offsetX: 0,
                            offsetY: 0,
                          },
                          axisTicks: {
                            show: true,
                          },
                          tooltip: {
                            enabled: false,
                          },
                          x: {
                            show: false,
                          },
                        },
                        legend: {
                          show: false,
                        },

                        // stroke: {
                        //   width: 4,
                        //   lineCap: "butt",
                        //   curve: "smooth",
                        // },
                        yaxis: {
                          labels: {
                            show: true,
                          },
                        },
                      }}
                    ></Chart>
                  </div>
                </div>
                <div
                  className={`admin-box ${PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? " " : "permission_blur"}`}>
                  <div className="title-part">
                    <h3>Active Shipments </h3>
                  </div>
                  <div className="p-3">
                    <Chart
                      type="donut"
                      width="100%"
                      height="100%"
                      // series={[lateorder, deliveredorder, pendingorder, issues]}
                      // series={[0, 0, 0, 0]}
                      series={PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? [lateorder, deliveredorder, pendingorder, issues] : [0, 0, 0, 0]}
                      options={{
                        labels: [
                          "Late", 
                          "Delivery", "Pending", "Issue"],
                        plotOptions: {
                          pie: {
                            donut: {
                              labels: {
                                show: true,
                                total: {
                                  show: true,
                                  fontSize: 20,
                                  color: "#f90000",
                                },
                              },
                            },
                          },
                        },
                        dataLabels: {
                          enabled: false,
                        },
                      }}
                    />

                    <div className="row">
                      <div className="col-6 mb-3">
                        <label className="circle-checkbox pending-box">
                          Pending ({PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? pendingorder : "0"}) <input type="checkbox" value={true} />
                          <span className="checkbox-mark"></span>
                        </label>
                      </div>
                      <div className="col-6 mb-3">
                        <label className="circle-checkbox issue-box">
                          Issued ({PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? issues : "0"}) <input type="checkbox" />
                          <span className="checkbox-mark"></span>
                        </label>
                      </div>
                      <div className="col-6 mb-3">
                        <label className="circle-checkbox delivery-box">
                          In Delivery ({PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? deliveredorder : "0"}) <input type="checkbox" />
                          <span className="checkbox-mark"></span>
                        </label>
                      </div>
                      {/* <div className="col-6">
                        <label className="circle-checkbox late-box">
                          Late ({PermissionData()?.VIEW_ACTIVE_SHIPMENT == "VIEW_ACTIVE_SHIPMENT" ? lateorder : "0"}) <input type="checkbox" />
                          <span className="checkbox-mark"></span>
                        </label>
                      </div> */}
                    </div>
                  </div>
                </div>



              </div>

              <div className="rev-box">
                <div
                  className={`admin-box transaction-box mt-3 ${PermissionData()?.VIEW_DASHBOARD_TRANSACTION == "VIEW_DASHBOARD_TRANSACTION" ? " " : "permission_blur"}`}
                >
                  <div className="title-part">
                    <h3>Transaction</h3>
                    {/* <div className="admin-dropdown">

                      <div onClick={(e) => setOpenTransectionDropDown(o => !o)}>
                        {dropdownshowtransectiondata}
                      </div>
                      {opentransectiondropdown && <ul>
                        <li onClick={(e) => { setDropDownShowTransectionData("Last 7 days"); TransectionFun(e, "Transection", "7days") }}>
                          Last 7 days
                        </li>
                        <li onClick={(e) => { setDropDownShowTransectionData("Last Month"); TransectionFun(e, "Transection", "last_month") }}>
                          Last Month
                        </li>
                        <li onClick={(e) => { setDropDownShowTransectionData("This Month"); TransectionFun(e, "Transection", "this_month") }}>
                          This Month
                        </li>
                        <li onClick={(e) => { setDropDownShowTransectionData('custom'); TransectionFun(e, "Transection", "custom") }}>
                          Custom
                        </li>
                      </ul>}

                    </div> */}
                  </div>
                  <div className="transaction-table">
                    <table>
                      <thead>
                        <th>ID</th>
                        <th>Payment Status</th>
                        <th>Date</th>
                        <th>Payment Type</th>
                        <th>Amount</th>
                      </thead>
                      <tbody>
                        {PermissionData()?.VIEW_DASHBOARD_TRANSACTION == "VIEW_DASHBOARD_TRANSACTION" ?

                          PostAdminDashboardTransactionData && PostAdminDashboardTransactionData?.transaction_details?.map((item, id) => {
                            return <tr>
                              <td>{item.product_order_id}</td>
                              <td>
                                {item.payment_status}
                              </td>
                              <td>{item.date}</td>

                              <td>{item.method}</td>
                              <td>{item.amount}</td>
                            </tr>
                          })

                          : ""}
                      </tbody>

                    </table>
                  </div>
                </div>
                <div
                  className={`admin-box mt-3 transaction-box mt-3 ${PermissionData()?.VIEW_DASHBOARD_TRANSACTION == "VIEW_DASHBOARD_TRANSACTION" ? " " : "permission_blur"}`}>
                  <div className="title-part">
                    <h3>Revenue Overview</h3>
                    {/* <div className="admin-dropdown">

                      <div onClick={(e) => setOpenRevenueDropDown(o => !o)}>
                        {dropdownshowrevenuedata}
                      </div>
                      {openrevenuedropdown && <ul>
                        <li onClick={(e) => { setDropDownShowRevenueData("Last 7 days"); TransectionFun(e, "Revenue", "7days") }}>
                          Last 7 days
                        </li>
                        <li onClick={(e) => { setDropDownShowRevenueData("Last Month"); TransectionFun(e, "Revenue", "last_month") }}>
                          Last Month
                        </li>
                        <li onClick={(e) => { setDropDownShowRevenueData("This Month"); TransectionFun(e, "Revenue", "this_month") }}>
                          This Month
                        </li>
                        <li onClick={(e) => { setDropDownShowRevenueData('custom'); TransectionFun(e, "Revenue", "custom") }}>
                          Custom
                        </li>
                      </ul>}
                    </div> */}
                  </div>
                  <div className="pt-3 ">
                    {/* <BarChart
                    width={180}
                    height={180}
                    data={data}
                    barCategoryGap="30%"
                    margin={{ left: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />

                    <Bar dataKey="absent" fill="#FFC900" startOffset="expand" />
                  </BarChart> */}
                    {/* <Chart
                      type="bar"
                      width='100%'
                      height={250}
                      series={[
                        {
                          data: revenuealladata

                        }
                      ]}
                      options={{
                        labels:revenuedate,
                        colors: '#FFC940',
                        xaxis: {
                          axisTicks: {
                            show: false
                          },
                          tooltip: {
                            show: false
                          },
                          axisBorder: {
                            show: false
                          }
                        },
                        yaxis: {
                          labels: {
                            show: false,
                          },
                        },
                        stroke: {
                          curve: 'smooth'
                        }


                      }}
                    ></Chart> */}
                    <Chart
                      width="100%"
                      height={250}
                      series={[
                        {
                          name: "Amount",
                          data: PermissionData()?.VIEW_DASHBOARD_REVENUE == "VIEW_DASHBOARD_REVENUE" ? revenuealladata : [],
                          // data: revenuealladata ,
                          type: "bar",
                          color: "#FFC900",
                        },
                      ]}
                      options={{
                        labels: revenuedate,
                        // stroke: {
                        //   curve: "smooth",
                        // },
                        chart: {
                          offsetX: 0,
                          offsetY: 0,
                          dropShadow: {
                            enabled: false,
                            color: "#FFC900",
                          },

                        },
                        plotOptions: {
                          bar: {
                            horizontal: false,
                            columnWidth: '55%',
                            endingShape: 'rounded'
                          },
                        },
                        dataLabels: {
                          enabled: false
                        },
                        stroke: {
                          show: true,
                          width: 2,
                          colors: ['transparent']
                        },
                        fill: {
                          type: "solid",
                          opacity: 1,
                        },
                        yaxis: {
                          labels: {
                            show: true
                          },
                        },
                        xaxis: {
                          labels: {
                            show: true,
                          },
                          axisBorder: {
                            show: true,
                            color: "#979699",
                            height: 0,
                            offsetX: 0,
                            offsetY: 0,
                          },
                          axisTicks: {
                            show: true,
                          },
                          tooltip: {
                            enabled: false,
                          },
                          x: {
                            show: true,
                          },
                        },
                        legend: {
                          show: true,
                        },

                        // stroke: {
                        //   width: 4,
                        //   lineCap: "butt",
                        //   curve: "smooth",
                        // },
                        yaxis: {
                          labels: {
                            show: true,
                          },
                          title: {
                            text: '₹ (Rupee)'
                          }
                        },
                      }}
                    ></Chart>

                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <Popup open={pickuppopup} position="" model className="sign_up_loader">
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
        </Popup>

        <div className="wallet-popup d-none"  >
          <div className="popupinner">
            <h4 className='text-danger calender_popup_cancel' onClick={(e) => { setPickUpPopup(false); setCustomCheckBox(false) }}> X </h4>
            <h2>Recharge your wallet</h2>
            <p>Current Wallet Amount <b>0.00</b></p>
            <div className="popup-body">
              <div className="amout">
                <p>Enter Amount in multiples of 100 below</p>
                <div className="">
                  <p>Rs</p>
                  <input type='number' className="form-control" placeholder='500' />
                  <span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.364324 0.0337138C0.166958 0.0965594 -0.00147244 0.347004 1.20969e-05 0.575441C0.0014185 0.791715 0.0178524 0.809816 2.15557 2.94899L4.2052 5L2.15557 7.05101C0.0178524 9.19018 0.0014185 9.20828 1.20969e-05 9.42456C-0.00204543 9.74137 0.258635 10.002 0.575441 9.99999C0.791715 9.99858 0.809816 9.98215 2.94899 7.84443L5 5.7948L7.05101 7.84443C9.19018 9.98215 9.20828 9.99858 9.42456 9.99999C9.74137 10.002 10.002 9.74137 9.99999 9.42456C9.99858 9.20828 9.98215 9.19018 7.84443 7.05101L5.7948 5L7.84443 2.94899C9.98215 0.809816 9.99858 0.791715 9.99999 0.575441C10.002 0.258635 9.74137 -0.00204543 9.42456 1.20969e-05C9.20828 0.0014185 9.19018 0.0178524 7.05101 2.15557L5 4.2052L2.94899 2.15557C1.36511 0.572785 0.871282 0.0939549 0.780777 0.0532732C0.652637 -0.0043374 0.505485 -0.0112652 0.364324 0.0337138Z" fill="#858585" />
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
                  <p>Rs. 500</p>
                </div>
                <hr />
                <div className="col-6 ">
                  <p className="mb-3 dark-text">Recharge Amount</p>
                </div>
                <div className="col-6 dark-text text-end">
                  <p className="mb-3">Rs. 500</p>
                </div>
              </div>
              <button type="button" className="btn pr-pay">Proceed To Pay </button>
              <button type="button" className="btn pr-onl">Proceed Online </button>
            </div>
          </div>
        </div>


        <div className="wallet-popup  d-none" >
          <div className="popupinner">
            <h4 className='text-danger calender_popup_cancel' onClick={(e) => { setPickUpPopup(false); setCustomCheckBox(false) }}> X </h4>
            <h2>Select your payment Mode</h2>
            <p>Total Amount to pay Rs. 500</p>
            <div className="popup-body">
              <ul className="pay-list">
                <li className="row mx-0">
                  <div className="col-2 ">
                    <img src="/images/wallet.svg" alt="img" />
                  </div>
                  <div className="col-9">
                    <p className="mb-1">Wallet</p>
                    <p className="mb-0">Current Balance :<b>1000/-</b></p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center"> <b> &gt; </b> </div>
                </li>
                <li className="row mx-0">
                  <div className="col-2">
                    <img src="/images/online.svg" alt="img" />
                  </div>
                  <div className="col-9">
                    <p className="mb-1">Online</p>
                    <p className="mb-0">example123@Gmail.com</p>
                  </div>
                  <div className="col-1 d-flex justify-content-end align-items-center"> <b> &gt; </b> </div>
                </li>
              </ul>

              <button type="button" className="btn pr-pay mb-0">Continue</button>
            </div>
          </div>
        </div>



        {/* ==================== cancel popup ============================= */}

        <div className="callbuyerpopup_outer cancelorder-popup" style={{ display: "none" }}>
          <div className="callbuyerpopup">
            <div className="popup-body">
              <div className="row">
                <div className="col-12 text-center">
                  <span>
                    <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M28.8468 0.557017C20.1183 2.48032 12.3738 7.48163 6.94451 14.7015C3.82271 18.8528 1.04352 25.7631 0.312867 31.1904C-0.944031 40.5273 1.62946 50.441 7.25209 57.9207C9.09525 60.3726 13.2537 64.3503 15.7318 66.0319C20.1234 69.0116 25.747 71.2226 30.8411 71.9721C35.0099 72.5856 41.5011 72.2378 45.4557 71.1892C59.1901 67.548 69.535 56.2758 71.9998 42.2666C72.263 40.7722 72.3473 38.1361 72.2441 34.6422C72.0592 28.3885 71.3915 25.598 68.7921 20.2171C64.1989 10.7095 55.7513 3.7807 45.2312 0.891844C41.4907 -0.135347 32.7946 -0.313143 28.8468 0.557017ZM30.9333 24.2512L36.1468 29.4212L41.4099 24.2512C45.0684 20.6576 46.8963 19.0815 47.405 19.0815C48.4614 19.0815 53.1801 23.8281 53.1801 24.891C53.1801 25.4838 51.8969 26.9791 48.1512 30.7514C45.3853 33.5368 43.1223 35.9578 43.1223 36.1314C43.1223 36.305 45.3853 38.7065 48.1512 41.4682C52.052 45.3628 53.1801 46.6778 53.1801 47.3289C53.1801 47.9512 52.5166 48.8146 50.6219 50.6587C49.2148 52.0279 47.8352 53.1482 47.5565 53.1482C46.8512 53.1482 43.9224 50.6139 39.7248 46.3708L36.1646 42.7728L30.9424 47.9606C28.0701 50.8138 25.4956 53.1482 25.2211 53.1482C24.0985 53.1482 19.1134 48.3817 19.1134 47.3082C19.1134 46.7725 21.7369 43.8077 25.5605 40.0218L29.4788 36.1418L24.836 31.424C22.2826 28.8291 19.9362 26.3082 19.6219 25.8222C19.0687 24.9676 19.0732 24.9011 19.7526 23.8018C20.7204 22.2357 24.2721 19.0815 25.0677 19.0815C25.4758 19.0815 27.6713 21.0165 30.9333 24.2512Z" fill="#F8485E" />
                    </svg>
                  </span>
                  <h3 className="mt-2">Are you sure you want to cancel your order?</h3>
                  <p>You can’t undo this action.</p>
                  <div className="btngroups text-end">
                    <button type="button" className="cancel-btn"> Cancel</button>
                    <button type="button" className="accept-btn"> Accept</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================ sharefeedback-popup =============================== */}

        <div className="popupouter sharefeedback-popup d-none">
          <div className="popupinner">
            <h4>Share your Feedback</h4>
            <p>How satisfied are you with our services...!</p>
            <div className="close-btn" type="button">
              <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z" fill="black"></path></svg></div>
            <div className="popup-body">
              <span>
                <svg width="325" height="48" viewBox="0 0 325 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M21.2222 8.55787C17.9728 16.8229 17.8489 17.1162 17.608 17.1148C17.0318 17.111 0.714412 18.2027 0.373383 18.2678L0 18.339L6.82018 24.2015C10.5712 27.4258 13.6403 30.1217 13.6403 30.1924C13.6403 30.2631 12.6411 34.29 11.4199 39.1411C10.1987 43.9922 9.21173 47.9737 9.2266 47.9889C9.24157 48.0039 12.7156 45.8002 16.9467 43.0914L24.6396 38.1665L32.3396 43.0954C36.5745 45.8063 40.0494 48.0133 40.0616 47.9999C40.0787 47.9812 37.3423 37.0471 35.8135 31.0258L35.5828 30.117L42.44 24.228L49.2973 18.339L48.9258 18.2678C48.5853 18.2024 32.2756 17.112 31.684 17.1151C31.4312 17.1163 31.352 16.9291 28.0622 8.55846C26.2123 3.8517 24.6736 0.000391261 24.6429 1.67678e-08C24.6121 -0.000293416 23.0728 3.85072 21.2222 8.55787Z" fill="#FFC900" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M89.979 8.55787C86.7296 16.8229 86.6057 17.1162 86.3649 17.1148C85.7887 17.111 69.4712 18.2027 69.1302 18.2678L68.7568 18.339L75.577 24.2015C79.328 27.4258 82.3971 30.1217 82.3971 30.1924C82.3971 30.2631 81.398 34.29 80.1767 39.1411C78.9555 43.9922 77.9686 47.9737 77.9834 47.9889C77.9984 48.0039 81.4724 45.8002 85.7036 43.0914L93.3965 38.1665L101.096 43.0954C105.331 45.8063 108.806 48.0133 108.818 47.9999C108.836 47.9812 106.099 37.0471 104.57 31.0258L104.34 30.117L111.197 24.228L118.054 18.339L117.683 18.2678C117.342 18.2024 101.032 17.112 100.441 17.1151C100.188 17.1163 100.109 16.9291 96.819 8.55846C94.9692 3.8517 93.4305 0.000391261 93.3997 1.67678e-08C93.3689 -0.000293416 91.8296 3.85072 89.979 8.55787Z" fill="#FFC900" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M158.736 8.55787C155.486 16.8229 155.363 17.1162 155.122 17.1148C154.545 17.111 138.228 18.2027 137.887 18.2678L137.514 18.339L144.334 24.2015C148.085 27.4258 151.154 30.1217 151.154 30.1924C151.154 30.2631 150.155 34.29 148.934 39.1411C147.712 43.9922 146.725 47.9737 146.74 47.9889C146.755 48.0039 150.229 45.8002 154.46 43.0914L162.153 38.1665L169.853 43.0954C174.088 45.8063 177.563 48.0133 177.575 47.9999C177.592 47.9812 174.856 37.0471 173.327 31.0258L173.096 30.117L179.954 24.228L186.811 18.339L186.44 18.2678C186.099 18.2024 169.789 17.112 169.198 17.1151C168.945 17.1163 168.866 16.9291 165.576 8.55846C163.726 3.8517 162.187 0.000391261 162.157 1.67678e-08C162.126 -0.000293416 160.586 3.85072 158.736 8.55787Z" fill="#FFC900" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M227.493 8.55787C224.243 16.8229 224.119 17.1162 223.879 17.1148C223.302 17.111 206.985 18.2027 206.644 18.2678L206.271 18.339L213.091 24.2015C216.842 27.4258 219.911 30.1217 219.911 30.1924C219.911 30.2631 218.912 34.29 217.69 39.1411C216.469 43.9922 215.482 47.9737 215.497 47.9889C215.512 48.0039 218.986 45.8002 223.217 43.0914L230.91 38.1665L238.61 43.0954C242.845 45.8063 246.32 48.0133 246.332 47.9999C246.349 47.9812 243.613 37.0471 242.084 31.0258L241.853 30.117L248.711 24.228L255.568 18.339L255.196 18.2678C254.856 18.2024 238.546 17.112 237.954 17.1151C237.702 17.1163 237.623 16.9291 234.333 8.55846C232.483 3.8517 230.944 0.000391261 230.913 1.67678e-08C230.883 -0.000293416 229.343 3.85072 227.493 8.55787Z" fill="#FFC900" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M296.249 8.55787C293 16.8229 292.876 17.1162 292.635 17.1148C292.059 17.111 275.741 18.2027 275.4 18.2678L275.027 18.339L281.847 24.2015C285.598 27.4258 288.667 30.1217 288.667 30.1924C288.667 30.2631 287.668 34.29 286.447 39.1411C285.226 43.9922 284.239 47.9737 284.253 47.9889C284.268 48.0039 287.742 45.8002 291.974 43.0914L299.666 38.1665L307.366 43.0954C311.601 45.8063 315.076 48.0133 315.088 47.9999C315.106 47.9812 312.369 37.0471 310.84 31.0258L310.61 30.117L317.467 24.228L324.324 18.339L323.953 18.2678C323.612 18.2024 307.302 17.112 306.711 17.1151C306.458 17.1163 306.379 16.9291 303.089 8.55846C301.239 3.8517 299.7 0.000391261 299.67 1.67678e-08C299.639 -0.000293416 298.1 3.85072 296.249 8.55787Z" fill="#DFDFDF" />
                </svg>
              </span>
              <textarea type="text" className="form-control" placeholder="Describe what you like the most..."></textarea>
              <div className="btngroups text-end my-3"><button type="button" className="btn save-btn">Submit</button></div>
            </div>
          </div>
        </div>

        {/* ================================ Open Ticket popup =============================== */}

        <div className="popupouter query-popup d-none">
          <div className="popupinner">
            <h2>User Query</h2>
            <div className="title">
              <div className="left-part">
                <img src="/images/user.png" alt="img" />
                <div className="">
                  <h4>John Doe</h4>
                  <p>#1234565</p>
                </div>
              </div>
              <div className="right-part">
                <p>Lorem Ipsum Inc.</p>
                <span> <a href="mailto:example123@gmail.com">example123@gmail.com</a></span>
                <span>+91 85695 51486</span>
              </div>
            </div>
            <p>20/9/2022</p>
            <div className="close-btn" type="button">
              <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z" fill="black"></path></svg>
            </div>
            <div className="popup-body">
              <p>Lörem ipsum pang kan ett aspludd. Dism miplangen. Afåst ming att ösaligt monotyskap. Ojåhyvis monosat om mobilmissbruk. Bin Ladinrabatt rel: hexaskap ditoledes. Gögen oliga. Ennomi kogon i pal inte antemolig. Sutreng niligt på terall osk kadungar. Spevis pomoskap av tedor i behyr onat. Parartad makrosade. Krofäre. Sens makromos, ontograf antehylig som prerade. Kvasikärade av. Tjejkött. Dev saktiga eurobusa i däs nepadade. Prohet. Panerade fisk. Plalåprerat. Krokrosat der. Giganyrat obur inframeliga tetrans. Pobelt dihiledes. Sänangen biminade jymilår påsam rening. Obunera vöber, vack pas. Epikrorade dirade, som tirad lockdown. Presm beling, derinas kust dos. Nånt fassa transtopi odett, även om plan. Mobilvirus cookie, syna. Or vijäska provör. </p>
            </div>
            <div className=" mt-3 d-flex  justify-content-between">
              <div className="">
                <button className="btn mail-btn me-2" type="button">
                  <svg
                    viewBox="0 0 10 7"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M1.26669 0.0178526C0.974869 0.0789949 0.7268 0.34912 0.670244 0.667347C0.646377 0.801566 0.646377 5.72447 0.670244 5.85869C0.728143 6.18445 0.974699 6.44752 1.28 6.50929C1.40655 6.5349 8.60281 6.5349 8.72935 6.50929C9.03466 6.44752 9.28121 6.18445 9.33911 5.85869C9.36298 5.72447 9.36298 0.801566 9.33911 0.667347C9.28121 0.341593 9.03466 0.0785234 8.72935 0.0167462C8.61556 -0.00628867 1.37675 -0.0052186 1.26669 0.0178526ZM6.98537 2.13161C5.96596 3.21354 5.45986 3.73828 5.39595 3.77964C5.15772 3.93372 4.85163 3.93372 4.61341 3.77964C4.54949 3.73828 4.04339 3.21354 3.02398 2.13161L1.52835 0.544246H5.00468H8.48101L6.98537 2.13161ZM2.68422 2.53635L3.36412 3.26304L2.51423 4.17109C2.04679 4.67051 1.5515 5.19382 1.4136 5.33399L1.16286 5.58882V3.26295V0.937073L1.58359 1.37336C1.815 1.61332 2.31027 2.13667 2.68422 2.53635ZM8.84236 4.42837L8.83799 5.59372L7.74155 4.42799L6.6451 3.26224L7.74155 2.09858L8.83799 0.934914L8.84236 2.09898C8.84477 2.7392 8.84477 3.78742 8.84236 4.42837ZM3.90855 3.84448C4.21619 4.17526 4.39442 4.30694 4.64769 4.39055C4.75442 4.42579 4.81259 4.43265 5.00468 4.43265C5.26602 4.43265 5.40234 4.3987 5.59965 4.28452C5.74577 4.19994 5.82297 4.13258 6.07068 3.87343L6.27822 3.6563L6.68265 4.07517C6.90508 4.30554 7.40068 4.82921 7.78396 5.23885L8.48086 5.98368L5.00459 5.9829L1.52835 5.98212L2.62155 4.82208C3.22281 4.18407 3.72019 3.66205 3.72682 3.66205C3.73344 3.66205 3.81523 3.74414 3.90855 3.84448Z"
                      fill="#FFC900"
                    />
                  </svg>
                  Mail
                </button>

                <button className="btn chat-btn" type="button">
                  <svg
                    viewBox="0 0 9 8"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.693363 0.027649C0.386961 0.101228 0.146631 0.31892 0.0658023 0.596075C0.0244906 0.737696 0.0251613 4.96722 0.0665093 5.10899C0.147954 5.38821 0.389553 5.60328 0.703895 5.67641C0.783401 5.69491 0.921294 5.70056 1.29277 5.70056H1.77784L1.78293 6.39552C1.78786 7.06848 1.7892 7.09189 1.8254 7.13516C1.91558 7.243 2.06144 7.28284 2.17971 7.23196C2.21354 7.2174 2.71432 6.86722 3.29257 6.45376L4.34395 5.70199L6.15739 5.70128C8.12887 5.7005 8.06583 5.70324 8.27233 5.60978C8.40013 5.55195 8.56061 5.41135 8.62829 5.29793C8.74567 5.10127 8.73977 5.23065 8.73977 2.85131C8.73977 0.961719 8.73628 0.676777 8.71202 0.593631C8.63058 0.314404 8.38898 0.0993336 8.07464 0.0262081C7.92048 -0.0096504 0.842912 -0.00827433 0.693363 0.027649ZM8.02584 0.561577C8.05337 0.579935 8.09271 0.615065 8.11326 0.639656C8.15059 0.684289 8.15064 0.68798 8.15064 2.84971V5.01506L8.0984 5.07622C8.00225 5.1888 8.12282 5.18252 6.05872 5.18252C4.9064 5.18252 4.17466 5.18848 4.14633 5.19811C4.12108 5.20667 3.7128 5.49079 3.23905 5.82948C2.76528 6.16815 2.37377 6.44526 2.36903 6.44526C2.36429 6.44526 2.35805 6.19808 2.35519 5.896C2.35018 5.37034 2.34835 5.34481 2.31259 5.30204C2.29203 5.27748 2.25271 5.24235 2.2252 5.22399C2.17729 5.19202 2.14629 5.19027 1.48893 5.18252C0.831564 5.17476 0.800567 5.17301 0.752657 5.14104C0.72514 5.12268 0.685822 5.08755 0.665266 5.06296C0.628015 5.01843 0.62787 5.01062 0.622686 2.89465C0.619822 1.72666 0.622178 0.747571 0.627942 0.718885C0.640958 0.653999 0.717146 0.57129 0.790126 0.542814C0.835661 0.525038 1.47424 0.521849 4.4106 0.524714L7.97577 0.528195L8.02584 0.561577ZM1.95026 2.09692C1.83033 2.14377 1.7612 2.26792 1.7869 2.39026C1.8028 2.46596 1.89332 2.55541 1.97551 2.57663C2.02107 2.5884 2.78873 2.59227 4.42873 2.58898C6.80706 2.58421 6.81583 2.58408 6.8657 2.55081C6.96083 2.48738 6.99051 2.43564 6.99051 2.33326C6.99051 2.23088 6.96083 2.17914 6.8657 2.11572C6.8158 2.08243 6.80837 2.08232 4.4106 2.07882C2.43881 2.07596 1.9956 2.07921 1.95026 2.09692ZM1.95026 3.13293C1.83026 3.17999 1.7612 3.30403 1.7869 3.42636C1.8028 3.50201 1.89327 3.59147 1.97551 3.61281C2.02029 3.62443 2.44011 3.62844 3.26859 3.62516C4.47506 3.62037 4.49622 3.61973 4.54543 3.5869C4.64056 3.52347 4.67024 3.47173 4.67024 3.36936C4.67024 3.26698 4.64056 3.21524 4.54543 3.15181C4.49616 3.11893 4.47638 3.11838 3.25047 3.11483C2.24318 3.11194 1.995 3.11538 1.95026 3.13293Z"
                      fill="#FFC900"
                    />
                  </svg>{" "}
                  Chat
                </button>
              </div>
              <button
                className="btn dismiss-btn"
                type="button"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>


        {/* ========================= download invoice popup ================================= */}

        <div className="popupouter downloadinvoice-popup d-none">
          <div className="popupinner">
            <h2>Lorem ipsum dolor sit amet,</h2>
            <p>How satisfied are you with our services...!Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum tristique tortor felis lacus,</p>
            <div className="btngroups">
              <div className="close-btn" type="button">
                <svg viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z" fill="black"></path></svg></div>
              <button type="button" className="btn save-btn"> <span>
                <svg width="19" height="17" viewBox="0 0 19 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.7751 16.4434C9.65576 16.2746 8.77539 15.821 7.94874 14.9873C7.60748 14.6432 7.25418 14.2548 7.16344 14.1241C7.0184 13.9153 6.97688 13.8981 6.81923 13.9825C6.25186 14.2862 5.16495 14.2473 4.4821 13.8989C3.67224 13.4857 3.02133 12.5652 2.9048 11.6683C2.85468 11.2824 2.81864 11.2272 2.44348 10.963C1.70609 10.4436 1.11702 9.60584 0.77347 8.58805C0.548913 7.92256 0.569387 6.59758 0.815318 5.8855C1.07206 5.14205 1.46958 4.5203 2.025 3.99322C2.9749 3.09196 4.04437 2.69158 5.50211 2.69158H6.30796V3.26484V3.83811H5.54715C5.12875 3.83811 4.5726 3.8938 4.31135 3.96186C2.48001 4.43881 1.32938 6.41569 1.85367 8.18414C2.13662 9.13855 2.60768 9.74924 3.49133 10.3073L4.01489 10.638V11.1596C4.01489 12.2434 4.74925 13.0525 5.72609 13.0452C6.08946 13.0424 6.30837 12.9788 6.77681 12.7394C7.10226 12.5732 7.40135 12.4371 7.44139 12.4371C7.48152 12.4371 7.68962 12.7388 7.90386 13.1077C8.4234 14.0018 9.01329 14.5799 9.77533 14.9418C11.3501 15.6897 13.0518 15.4243 14.2869 14.2383C15.1422 13.417 15.5584 12.4093 15.5609 11.1532L15.5621 10.5654L16.0404 10.2748C18.1215 9.01071 18.4562 6.36016 16.7396 4.73675C16.0059 4.04285 15.1797 3.75622 13.9131 3.75622H13.2691V3.17091V2.5856L14.2313 2.63327C15.7674 2.70943 16.6781 3.07755 17.617 4.0019C19.0407 5.40354 19.3863 7.5976 18.4686 9.40856C18.198 9.9426 17.61 10.6274 17.1339 10.963C16.7348 11.2443 16.7262 11.2596 16.6685 11.7806C16.5897 12.492 16.3444 13.2712 16.0078 13.8791C15.0113 15.6794 12.8221 16.7522 10.7751 16.4434ZM8.09058 8.48764L6.40476 6.25403L7.50183 6.23126L8.5989 6.20849L8.62044 3.32397L8.64198 0.439453H9.78852H10.9351L10.9566 3.32397L10.9781 6.20849L12.0788 6.23126L13.1794 6.25403L11.5389 8.42425C10.6366 9.61788 9.8709 10.6231 9.83733 10.6579C9.80375 10.6928 9.01772 9.71615 8.09058 8.48764Z" fill="black" />
                </svg>
              </span> Download Invoice </button>
            </div>
          </div>
        </div>



        {/* ============================================================================ */}
      </div >
    </>
  );
};

export default AdminDashboard;
