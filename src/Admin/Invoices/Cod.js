import React, { useEffect, useState } from "react";
import { reactLocalStorage } from 'reactjs-localstorage';
import Popup from "reactjs-popup";
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import Sidebar from "../Sidebar";
import { toast } from "react-toastify";

import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { GetBillingInvoiceDetail, GetBillingAmountCount, PostOrderDownloadInvoiceFile, PostOrderDownloadLabelGenerationFile, GetCodRemittance, GetCodRemittanceBillingAmount, PostUploadFile, PostUploadBillRemittanceFile, PostAdminDashboardTransaction, PostAdminDashboardShippingMatrix, PostDashboardRevenue, GetAdminDashboardViewOrder, PostBillingCodRemittanceDetails, PostBillingCodRemittanceCount } from "../../Redux/action/ApiCollection";
import { useNavigate, useLocation } from "react-router-dom";

import { PermissionData } from "../../Permission";

function Cod() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    let param = useLocation();
    const [pickuppopup, setPickUpPopup] = useState(false)
    const [downloadinvoiceshow, setDownloadInvoiceShow] = useState(false)
    // const [downloadLabelGenerationshow, setDownloadLabelGenerationShow] = useState(false)

    const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
    const [filterActive, setFilterActive] = useState(false)
    const [b2bpartnerselectedvalue, setB2BPartnerSelectedValue] = useState("");

    const [startdate, setStatrtDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [pagepathdata, setPagePathData] = useState("");


    const [last7dayscheckbox, setLast7daysCheckBox] = useState(false);
    const [last30dayscheckbox, setLast30daysCheckBox] = useState(false);
    const [currentmonthcheckbox, setCurrentMonthCheckBox] = useState(false);
    const [customcheckbox, setCustomCheckBox] = useState(false);
    const [datapicker, setDataPicker] = useState([{
        startDate: new Date(),
        endDate: addDays(new Date(), 0),
        key: 'selection'
    }
    ]);


    const GetBillingInvoiceDetailData = useSelector(
        (state) => state.GetBillingInvoiceDetailReducer.GetBillingInvoiceDetailData?.data
    );
    const GetBillingAmountCountData = useSelector(
        (state) => state.GetBillingAmountCountReducer.GetBillingAmountCountData?.data
    );
    const GetCodRemittanceData = useSelector(
        (state) => state.GetCodRemittanceReducer?.GetCodRemittanceData?.data
    );

    const GetCodRemittanceBillingAmountData = useSelector(
        (state) => state.GetCodRemittanceBillingAmountReducer?.GetCodRemittanceBillingAmountData?.data
    );

    const PostOrderDownloadInvoiceFileData = useSelector(
        (state) => state.PostOrderDownloadInvoiceFileReducer.PostOrderDownloadInvoiceFileData
    );

    const PostOrderDownloadLabelGenerationFileData = useSelector(
        (state) => state.PostOrderDownloadLabelGenerationFileReducer.PostOrderDownloadLabelGenerationFileData
    );

    const PostUploadBillRemittanceFileData = useSelector(
        (state) => state.PostUploadBillRemittanceFileReducer.PostUploadBillRemittanceFileData?.data
    );

    const PostBillingCodRemittanceDetailsData = useSelector(
        (state) => state.PostBillingCodRemittanceDetailsReducer.PostBillingCodRemittanceDetailsData?.data
    );
    const PostBillingCodRemittanceCountData = useSelector(
        (state) => state.PostBillingCodRemittanceCountReducer.PostBillingCodRemittanceCountData?.data
    );

    const ToggleFunData = useSelector(
        (state) => state.ToggleSideBarReducer.ToggleSideBarData
    );

    const HeaderToggleClassAddData = useSelector(
        (state) =>
            state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
    );

    // useEffect(() => {
    //     if (PostOrderDownloadInvoiceFileData?.data?.name) {
           
    //       window.open(`${PostOrderDownloadInvoiceFileData?.data?.name}`);
    //       // navigate(`${PostOrderDownloadInvoiceFileData?.data?.name}`, {replace: true})
    //     }
    //   }, [PostOrderDownloadInvoiceFileData?.data])

    //   useEffect(() => {
    //     if (PostOrderDownloadLabelGenerationFileData?.data?.name) {
           
    //       window.open(`${PostOrderDownloadLabelGenerationFileData?.data?.name}`);
    //       // navigate(`${PostOrderDownloadInvoiceFileData?.name}`, {replace: true})
    //     }
    //   }, [PostOrderDownloadLabelGenerationFileData?.data])

    useEffect(() => {
        dispatch(GetBillingInvoiceDetail());
        dispatch(GetBillingAmountCount())
        // dispatch(GetCodRemittance())
        // dispatch(GetCodRemittanceBillingAmount())
    }, []);

    const Invoice = (e, item) => {

        setDownloadInvoiceShow(true)

        let payload = {
            "product_order_id": item.product_order_id,
            "request_type": "get"
        }
        dispatch(PostOrderDownloadInvoiceFile(payload))

    }

    // const LabelGeneration = (e, item) => {

    //     setDownloadLabelGenerationShow(true)

    //     let payload = {
    //         "product_order_id": item.product_order_id,
    //         "request_type": "get"
    //     }
    //     dispatch(PostOrderDownloadLabelGenerationFile(payload))

    // }


    const CodRemittanceInvoice = (e, item) => {
        setDownloadInvoiceShow(true)
        let payload = {
            "product_order_id": item.remittance_id,
            "request_type": "get"
        }
        dispatch(PostOrderDownloadInvoiceFile(payload))
    };

    const SheetFile = (e) => {
        dispatch(PostUploadBillRemittanceFile(e?.target?.files[0]))
    }

    // filter functionality

    useEffect(() => {

        let Alldata = {
            "filter_type": "all"
        }

        dispatch(PostBillingCodRemittanceCount(Alldata))
        dispatch(PostBillingCodRemittanceDetails(Alldata))


        // dispatch(GetB2bCompanyInfo())

    }, [])


    const FilterShowHideBtnFun = () => {

        window.location.reload(false)

    }

    const SearchPage = (e) => {

        let value = e.target.value.toUpperCase();
        let result = []
        // result = GetB2bCompanyInfoData?.filter((data) => {  //get client data c-2 -3a

        //   if (isNaN(+value)) {
        //     return data?.company_name.toUpperCase().search(value) !== -1;
        //   }
        // });
        setPagePathData(result)

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
            dispatch(PostBillingCodRemittanceDetails(payloadData))
            dispatch(PostBillingCodRemittanceCount(payloadData))

        }
        else {

            payloadData = {
                "filter_type": "all",
                "b2b_patner_id": b2bpartnerselectedvalue
            }

            dispatch(PostBillingCodRemittanceDetails(payloadData))
            dispatch(PostBillingCodRemittanceCount(payloadData))


            // toast.warn("Please Select Sort By ")
        }

        setFilterShowHideBtn(false)

        if (SortedByData || payloadData.filter_type !== "all") {
            setFilterActive(true)
        }
        else {

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


    return (
        <>
            <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
                <Header />
                <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
                    <Sidebar />
                    <div className="content-sec invoice-sec">

                        <div className={`title `} >
                            <h2>Billing</h2>
                            <li className={`form-control ${param.hash !== "#pending" ? "d-none" : ""} ${PermissionData()?.UPLOAD_CSV_COD_REMITTANCE == "UPLOAD_CSV_COD_REMITTANCE" ? " " : "permission_blur"}`}>
                                <input
                                    value={""}
                                    accept=".csv"
                                    type={`${PermissionData()?.UPLOAD_CSV_COD_REMITTANCE == "UPLOAD_CSV_COD_REMITTANCE" ? "file" : "text"}`}
                                    onChange={(e) => PermissionData()?.UPLOAD_CSV_COD_REMITTANCE == "UPLOAD_CSV_COD_REMITTANCE" ? SheetFile(e) : ""}
                                    className={`custom-file-input  
                                    ${PermissionData()?.UPLOAD_CSV_COD_REMITTANCE == "UPLOAD_CSV_COD_REMITTANCE" ? " " : "permission_blur"}  }`}
                                />
                            </li>
                            {/* <div className={`form-control ${param.hash !== "#pending" ? "d-none" : ""}`}>
                                <input
                                value={""} accept=".csv" type="file" onChange={(e) => SheetFile(e)} className="custom-file-input" />
                            </div> */}
                        </div>

                        <div className={` ${param.hash !== "#pending" ? "d-none" : ""}`}> 

                            <div className="filter-part-codRemittance">
                                <button
                                    type="button"
                                    className={`${filterActive ? "bg-warning btn" : " btn"}
                                    ${PermissionData()?.APPLY_COD_REMITTANCE_FILTER == "APPLY_COD_REMITTANCE_FILTER" ? " " : "permission_blur"} `}
                                    onClick={(e) =>
                                        PermissionData()?.APPLY_COD_REMITTANCE_FILTER == "APPLY_COD_REMITTANCE_FILTER" ?
                                            setFilterShowHideBtn(true) : ""}
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
                                    className={`filter-body ${filtershowhidebtn ? "" : "d-none"
                                        } `}
                                >
                                    <button
                                        type="button"
                                        className="close-btn"
                                        onClick={(e) => FilterShowHideBtnFun()}
                                    >

                                    </button>

                                    <h4>Filter</h4>

                                    <div className="search-box">
                                        <input type='' className='form-control' placeholder='Search'
                                            onChange={(e) => SearchPage(e)}
                                        />
                                        <span className="d-none">
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
                                                Current Month
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




                                    {/* <h5 className="mp-3">B2B Partner</h5>
                                    <div className="express-box">
                                        <select
                                            className="form-select"
                                            onChange={(e) => setB2BPartnerSelectedValue(e.target.value)}
                                        >
                                            <option value="none" selected disabled hidden>
                                                Ecom Express...
                                            </option>

                                            {pagepathdata.length !== 0 ? pagepathdata?.map((item, id) => {

                                                return <option value={item.user_id}>{item.company_name}</option>
                                            }) : GetB2bCompanyInfoData?.map((item, id) => {

                                                return <option value={item.user_id}>{item.company_name}</option>
                                            })}

                                        </select>


                                    </div> */}
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
                        <div className="invoice-tab">


                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation" onClick={(e) => { navigate("#pending") }}>
                                    <button className="nav-link active" id="cod-tab" data-bs-toggle="tab" data-bs-target="#cod-tab-pane" type="button" role="tab" aria-controls="cod-tab-pane" aria-selected="true">COD Remittance</button>
                                </li>
                                <li className="nav-item" role="presentation" onClick={(e) => { navigate("#hd") }}>
                                    <button className="nav-link" id="invoice-tab" data-bs-toggle="tab" data-bs-target="#invoice-tab-pane" type="button" role="tab" aria-controls="invoice-tab-pane" aria-selected="false">Invoices</button>
                                </li>
                            </ul>

                            <div className="tab-content" id="myTabContent">
                                <div className="tab-pane fade show active" id="cod-tab-pane" role="tabpanel" aria-labelledby="cod-tab" tabindex="0">
                                    <ul>
                                        <li className=
                                            {`${PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ? " " : "permission_blur"}`}>
                                            <span>Remitted Till Date  </span>
                                            &#8377; {PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ?
                                                PostBillingCodRemittanceCountData?.message?.total_amount : "0"}
                                        </li>
                                        <li className=
                                            {`${PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ? " " : "permission_blur"}`}>
                                            <span>Last Remittance  </span>
                                            &#8377; {PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ?
                                                PostBillingCodRemittanceCountData?.message?.last_remmitance_amount : "0"}
                                        </li>

                                        <li className=
                                            {`${PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ? " " : "permission_blur"}`}>
                                            <span>Next Remittance  </span>
                                            &#8377; {PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ?
                                                PostBillingCodRemittanceCountData?.message?.next_remmitance_amount : "0"}
                                        </li>

                                        <li className=
                                            {`${PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ? " " : "permission_blur"}`}>
                                            <span>Total Remittance Due</span>
                                            &#8377; {PermissionData()?.VIEW_COD_REMITTANCE_COUNT == "VIEW_COD_REMITTANCE_COUNT" ?
                                                PostBillingCodRemittanceCountData?.message?.total_remittace : "0"}
                                        </li>
                                    </ul>

                                    <div className="cod-table">
                                        <table>
                                            <tr>
                                                <th>Remittance ID</th>
                                                <th>Name</th>
                                                <th>Status</th>
                                                <th>Payment Date</th>
                                                <th>Remittance Amount</th>
                                                <th> </th>
                                            </tr>

                                            {PermissionData()?.VIEW_COD_REMITTANCE == "VIEW_COD_REMITTANCE" ?

                                                PostBillingCodRemittanceDetailsData && PostBillingCodRemittanceDetailsData.map((item, id) => {

                                                    return <tr>
                                                        <td>{item?.remittance_id}</td>
                                                        <td> {item?.name}</td>
                                                        <td> {item?.status}</td>
                                                        <td> {item?.payment_date}</td>
                                                        <td> {item?.remittance_amount}</td>
                                                        {/* <td onClick={(e) => CodRemittanceInvoice(e, item)}>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M3.98982 0.0543259C3.24221 0.191266 2.67663 0.420267 2.06245 0.834565C1.12579 1.4664 0.446231 2.43607 0.124885 3.59907L0 4.05111V12.0166V19.982L0.124885 20.4341C0.604274 22.1691 1.89548 23.4588 3.58164 23.8868L4.02768 24H12H19.9723L20.4184 23.8868C22.134 23.4513 23.4439 22.1182 23.8946 20.3489L24 19.935V11.9931V4.05111L23.8751 3.59907C23.3975 1.8704 22.1427 0.60984 20.4305 0.138821L19.9609 0.00963471L12.1409 0.00164576C5.92777 -0.00469842 4.25288 0.00615716 3.98982 0.0543259ZM19.8434 1.93709C20.9454 2.18902 21.7695 2.99722 22.0522 4.10322C22.1425 4.45648 22.1448 4.65517 22.1448 12.0166C22.1448 19.378 22.1425 19.5767 22.0522 19.9299C21.7789 20.9988 20.9771 21.8012 19.9088 22.0746C19.5557 22.1649 19.3572 22.1672 12 22.1672C4.64285 22.1672 4.44427 22.1649 4.09123 22.0746C2.98004 21.7902 2.17245 20.9641 1.92982 19.8636C1.85918 19.5434 1.85354 18.8306 1.86636 11.8521C1.87904 4.93647 1.88778 4.17155 1.9564 3.98062C2.3767 2.8108 3.13334 2.14386 4.32094 1.89639C4.3726 1.88558 7.81761 1.87463 11.9765 1.87205C18.5083 1.86791 19.5797 1.87679 19.8434 1.93709ZM11.7513 4.65963C11.4875 4.72927 11.2715 4.91565 11.1497 5.17896C11.0673 5.35697 11.0627 5.56858 11.0617 9.17311L11.0607 12.9793L9.73386 11.6537C8.85266 10.7734 8.34838 10.3039 8.23242 10.256C7.62951 10.0068 6.97456 10.4586 6.97456 11.1237C6.97456 11.2678 7.01044 11.4315 7.06511 11.5368C7.1149 11.6326 8.03958 12.593 9.11991 13.6709C11.3557 15.9016 11.3308 15.8824 12 15.8824C12.6692 15.8824 12.6443 15.9016 14.8801 13.6709C15.9604 12.593 16.8851 11.6326 16.9349 11.5368C16.9896 11.4315 17.0254 11.2678 17.0254 11.1237C17.0254 10.4586 16.3705 10.0068 15.7676 10.256C15.6516 10.3039 15.1473 10.7734 14.2661 11.6537L12.9393 12.9793V9.18335C12.9393 5.86051 12.9303 5.36562 12.8665 5.2127C12.6778 4.76001 12.2237 4.53486 11.7513 4.65963ZM7.51468 17.5333C6.83887 17.8331 6.78444 18.7889 7.4207 19.1831L7.6482 19.3241H12H16.3518L16.5793 19.1831C16.9005 18.9841 17.0385 18.7146 17.0155 18.3311C16.9957 18.0014 16.876 17.7867 16.6104 17.6046L16.4453 17.4914L12.0504 17.4811C8.47782 17.4727 7.62923 17.4825 7.51468 17.5333Z" fill="#FFC900" />
                                                        </svg>
                                                    </td> */}
                                                    </tr>
                                                })
                                                : ""}


                                        </table>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="invoice-tab-pane" role="tabpanel" aria-labelledby="invoice-tab" tabindex="0">
                                    <ul>
                                        {
                                        PermissionData()?.VIEW_INVOICES == "VIEW_INVOICES" ?
                                        GetBillingAmountCountData && GetBillingAmountCountData.map((item, id) => {

                                            return <li>
                                                <span>{item?.status_detail}</span>
                                                &#8377; {item?.order_amount}
                                            </li>
                                        })
                                        :""}

                                        {/* <li>
                                            <span>All</span>
                                            &#8377; {GetBillingAmountCountData && GetBillingAmountCountData[1]?.order_amount}
                                        </li>
                                        <li>
                                            <span>Unpaid</span>
                                            &#8377;  {GetBillingAmountCountData && GetBillingAmountCountData[3]?.order_amount}
                                        </li>
                                        <li>
                                            <span>Paid</span>
                                            &#8377;  {GetBillingAmountCountData && GetBillingAmountCountData[0]?.order_amount}
                                        </li>
                                        <li>
                                            <span>Cancelled</span>
                                            &#8377;  {GetBillingAmountCountData && GetBillingAmountCountData[4]?.order_amount}
                                        </li>
                                        <li>
                                            <span>Prepaid</span>
                                            &#8377; {GetBillingAmountCountData && GetBillingAmountCountData[2]?.order_amount}
                                        </li> */}
                                    </ul>
                                    <div className="invoice-table">
                                        <table>

                                            <tr>
                                                <th>Invoice ID</th>
                                                <th>Item Type</th>
                                                <th>Quantity</th>
                                                <th>Delivery Type</th>
                                                <th>Payment</th>
                                                <th> Amount</th>
                                                <th >Download Invoice </th>
                                            </tr>
                                            {
                                            PermissionData()?.VIEW_INVOICES == "VIEW_INVOICES" ?
                                            GetBillingInvoiceDetailData &&
                                                GetBillingInvoiceDetailData.map((item, id) => {
                                                    return (
                                                        <tr>
                                                            <td>{item.invoice_number}</td>
                                                            <td>{item.product_type}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.delivery_type}</td>
                                                            <td>{item.status_detail}</td>
                                                            <td>&#8377;{item.order_amount}</td>
                                                            <td role="button">
                                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                 onClick={(e) => PermissionData()?.DOWNLOAD_INVOICE == "DOWNLOAD_INVOICE" ? Invoice(e, item):""} >
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.98982 0.0543259C3.24221 0.191266 2.67663 0.420267 2.06245 0.834565C1.12579 1.4664 0.446231 2.43607 0.124885 3.59907L0 4.05111V12.0166V19.982L0.124885 20.4341C0.604274 22.1691 1.89548 23.4588 3.58164 23.8868L4.02768 24H12H19.9723L20.4184 23.8868C22.134 23.4513 23.4439 22.1182 23.8946 20.3489L24 19.935V11.9931V4.05111L23.8751 3.59907C23.3975 1.8704 22.1427 0.60984 20.4305 0.138821L19.9609 0.00963471L12.1409 0.00164576C5.92777 -0.00469842 4.25288 0.00615716 3.98982 0.0543259ZM19.8434 1.93709C20.9454 2.18902 21.7695 2.99722 22.0522 4.10322C22.1425 4.45648 22.1448 4.65517 22.1448 12.0166C22.1448 19.378 22.1425 19.5767 22.0522 19.9299C21.7789 20.9988 20.9771 21.8012 19.9088 22.0746C19.5557 22.1649 19.3572 22.1672 12 22.1672C4.64285 22.1672 4.44427 22.1649 4.09123 22.0746C2.98004 21.7902 2.17245 20.9641 1.92982 19.8636C1.85918 19.5434 1.85354 18.8306 1.86636 11.8521C1.87904 4.93647 1.88778 4.17155 1.9564 3.98062C2.3767 2.8108 3.13334 2.14386 4.32094 1.89639C4.3726 1.88558 7.81761 1.87463 11.9765 1.87205C18.5083 1.86791 19.5797 1.87679 19.8434 1.93709ZM11.7513 4.65963C11.4875 4.72927 11.2715 4.91565 11.1497 5.17896C11.0673 5.35697 11.0627 5.56858 11.0617 9.17311L11.0607 12.9793L9.73386 11.6537C8.85266 10.7734 8.34838 10.3039 8.23242 10.256C7.62951 10.0068 6.97456 10.4586 6.97456 11.1237C6.97456 11.2678 7.01044 11.4315 7.06511 11.5368C7.1149 11.6326 8.03958 12.593 9.11991 13.6709C11.3557 15.9016 11.3308 15.8824 12 15.8824C12.6692 15.8824 12.6443 15.9016 14.8801 13.6709C15.9604 12.593 16.8851 11.6326 16.9349 11.5368C16.9896 11.4315 17.0254 11.2678 17.0254 11.1237C17.0254 10.4586 16.3705 10.0068 15.7676 10.256C15.6516 10.3039 15.1473 10.7734 14.2661 11.6537L12.9393 12.9793V9.18335C12.9393 5.86051 12.9303 5.36562 12.8665 5.2127C12.6778 4.76001 12.2237 4.53486 11.7513 4.65963ZM7.51468 17.5333C6.83887 17.8331 6.78444 18.7889 7.4207 19.1831L7.6482 19.3241H12H16.3518L16.5793 19.1831C16.9005 18.9841 17.0385 18.7146 17.0155 18.3311C16.9957 18.0014 16.876 17.7867 16.6104 17.6046L16.4453 17.4914L12.0504 17.4811C8.47782 17.4727 7.62923 17.4825 7.51468 17.5333Z" fill="#FFC900" />
                                                                </svg>
                                                                {/* <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                                 onClick={(e) => PermissionData()?.DOWNLOAD_INVOICE == "DOWNLOAD_INVOICE" ? LabelGeneration(e, item):""} >
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.98982 0.0543259C3.24221 0.191266 2.67663 0.420267 2.06245 0.834565C1.12579 1.4664 0.446231 2.43607 0.124885 3.59907L0 4.05111V12.0166V19.982L0.124885 20.4341C0.604274 22.1691 1.89548 23.4588 3.58164 23.8868L4.02768 24H12H19.9723L20.4184 23.8868C22.134 23.4513 23.4439 22.1182 23.8946 20.3489L24 19.935V11.9931V4.05111L23.8751 3.59907C23.3975 1.8704 22.1427 0.60984 20.4305 0.138821L19.9609 0.00963471L12.1409 0.00164576C5.92777 -0.00469842 4.25288 0.00615716 3.98982 0.0543259ZM19.8434 1.93709C20.9454 2.18902 21.7695 2.99722 22.0522 4.10322C22.1425 4.45648 22.1448 4.65517 22.1448 12.0166C22.1448 19.378 22.1425 19.5767 22.0522 19.9299C21.7789 20.9988 20.9771 21.8012 19.9088 22.0746C19.5557 22.1649 19.3572 22.1672 12 22.1672C4.64285 22.1672 4.44427 22.1649 4.09123 22.0746C2.98004 21.7902 2.17245 20.9641 1.92982 19.8636C1.85918 19.5434 1.85354 18.8306 1.86636 11.8521C1.87904 4.93647 1.88778 4.17155 1.9564 3.98062C2.3767 2.8108 3.13334 2.14386 4.32094 1.89639C4.3726 1.88558 7.81761 1.87463 11.9765 1.87205C18.5083 1.86791 19.5797 1.87679 19.8434 1.93709ZM11.7513 4.65963C11.4875 4.72927 11.2715 4.91565 11.1497 5.17896C11.0673 5.35697 11.0627 5.56858 11.0617 9.17311L11.0607 12.9793L9.73386 11.6537C8.85266 10.7734 8.34838 10.3039 8.23242 10.256C7.62951 10.0068 6.97456 10.4586 6.97456 11.1237C6.97456 11.2678 7.01044 11.4315 7.06511 11.5368C7.1149 11.6326 8.03958 12.593 9.11991 13.6709C11.3557 15.9016 11.3308 15.8824 12 15.8824C12.6692 15.8824 12.6443 15.9016 14.8801 13.6709C15.9604 12.593 16.8851 11.6326 16.9349 11.5368C16.9896 11.4315 17.0254 11.2678 17.0254 11.1237C17.0254 10.4586 16.3705 10.0068 15.7676 10.256C15.6516 10.3039 15.1473 10.7734 14.2661 11.6537L12.9393 12.9793V9.18335C12.9393 5.86051 12.9303 5.36562 12.8665 5.2127C12.6778 4.76001 12.2237 4.53486 11.7513 4.65963ZM7.51468 17.5333C6.83887 17.8331 6.78444 18.7889 7.4207 19.1831L7.6482 19.3241H12H16.3518L16.5793 19.1831C16.9005 18.9841 17.0385 18.7146 17.0155 18.3311C16.9957 18.0014 16.876 17.7867 16.6104 17.6046L16.4453 17.4914L12.0504 17.4811C8.47782 17.4727 7.62923 17.4825 7.51468 17.5333Z" fill="#FFC900" />
                                                                </svg> */}
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            :""}
                                        </table>
                                    </div>

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
        </>
    )
}

export default Cod