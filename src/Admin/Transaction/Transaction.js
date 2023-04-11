
import React, { useEffect, useState, useRef } from "react";
import { actionType } from "../../Redux/type/types";
import { reactLocalStorage } from "reactjs-localstorage";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAdminOrderDelivered,
  GetAdminOrderIntransit,
  GetAdminOrderPending,
  GetAdminOrderReturn,
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
  PostTransactionHistory,
  GetSettingUserInfo

} from "../../Redux/action/ApiCollection";
import tokenData from "../../Authanticate";
import { PostAdminOrderFilterationReducer } from "../../Redux/reducer/Reducer";

import { PermissionData } from "../../Permission";

const Transactions = () => {
  const [pendingconfirmbutton, setPendingConfirmButton] = useState(false);
  const [partner, setPartner] = useState("");
  const [partnernameactive, setPartnerNameActive] = useState(false);
  const [popup, setPopup] = useState(false);
  const [pending, setPending] = useState(false);
  const [awbcode, setAwbCode] = useState("");
  const [expecteddeliverydate, setExpectedDelliveryDate] = useState("");
  const [pendingconfirm, setPendingConfirm] = useState(false);
  const [awbactive, setAwbActive] = useState(false);
  const [awbactivecheck, setAwbActiveCheck] = useState(false);
  const [pendingeditobjectdata, setPendingEditObjectData] = useState("");
  const [pandingtab, setPandingTab] = useState("");
  const [booktab, setBookTab] = useState("");
  const [transittab, setTransitTab] = useState("");
  const [deliveredtab, setDeliveredTab] = useState("");
  const [returntab, setReturnTab] = useState("");
  const [tabfilteravailable, setTabFilterAvailable] = useState("");
  const [adminorderfilterationdata, setAdminOrderFilterationData] = useState(false);
  const [tabfiltersearchdata, setTabFilterSearchData] = useState("");
  const [adminorderpendingdata, setAdminOrderPendingData] = useState("");
  const [filterdatahideaftertabchange, setFilterDataHideAfterTabChange] = useState(false);
  const [filteractive, setFilterActive] = useState(false);
  const [userType, setUsertype] = useState("b2c");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userType, "userType")

  let param = useLocation();
  const GetAdminOrderIntransitDate = useSelector(
    (state) =>
      state.GetAdminOrderIntransitReducer.GetAdminOrderIntransitData?.data
  );
  const GetAdminOrderDeliveredData = useSelector(
    (state) =>
      state.GetAdminOrderDeliveredReducer.GetAdminOrderDeliveredData?.data
  );
  const GetAdminOrderPendingData = useSelector(
    (state) => state.GetAdminOrderPendingReducer.GetAdminOrderPendingData?.data
  );
  const GetAdminOrderReturnData = useSelector(
    (state) => state.GetAdminOrderReturnReducer.GetAdminOrderReturnData?.data
  );
  const GetAdminOrderBookedData = useSelector(
    (state) => state.GetAdminOrderBookedReducer.GetAdminOrderBookedData?.data
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
  const PostAdminPendingOrderActionData = useSelector(
    (state) =>
      state.PostAdminPendingOrderActionReducer.PostAdminPendingOrderActionData
        ?.data
  );
  const DeleteAdminPendingOrderActionData = useSelector(
    (state) =>
      state.DeleteAdminPendingOrderActionReducer
        .DeleteAdminPendingOrderActionData?.data
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
  )

  const HeaderToggleClassAddData = useSelector(
    (state) =>
      state.HeaderToggleClassAddReducer.HeaderToggleClassAddData
  );

  const TransactionHistorytData = useSelector(
    (state) =>
      state.PostTransactionHistoryReducer.PostTransactionHistoryData
  );

  const ToggleSideBarTrueFalseData = useSelector((state) => state.ToggleSideBarTrueFalseReducer.ToggleSideBarTrueFalseData)

  const GetSettingUserInfoData = useSelector(
    (state) => state.GetSettingUserInfoReducer.GetSettingUserInfoData?.data
  );



  useEffect(() => {

    if (TransactionHistorytData?.data) {
      console.log(TransactionHistorytData?.data, "TransactionHistorytData")
      setPopup(true)
    }

  }, [TransactionHistorytData])


  useEffect(() => {
   
    dispatch(GetAdminOrderIntransit());
    dispatch(GetAdminOrderDelivered());
    dispatch(GetAdminOrderPending());
    dispatch(GetAdminOrderReturn());
    dispatch(GetAdminOrderBooked());



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

    setPandingTab({
      activeValue: "active",
      booleanValue: true,
      tabindex: "-1",
    });
    setReturnTab("");
    setDeliveredTab("");
    setBookTab("");
    setTransitTab("");

  }, [OrderPageBookNavigateFunData]);

  useEffect(() => {

    dispatch(GetSettingUserInfo({
      user_type: `${userType}`
    }))


  }, [userType])




  // console.log(PermissionData());

  useEffect(() => {
    setTabFilterSearchData(""); // when the tab changes the search box will blank
    if (adminorderfilterationdata === true) {
      setFilterDataHideAfterTabChange(true);
      setFilterActive(false);
    }

    if (param.hash === "#pending") {
      setAdminOrderPendingData(GetAdminOrderPendingData);
      setFilterDataHideAfterTabChange(false);
    }

  }, [
    PostAdminOrderFilterationData,
    param.hash,
    GetAdminOrderPendingData,
    GetAdminOrderBookedData,
    GetAdminOrderIntransitDate,
    GetAdminOrderDeliveredData,
    GetAdminOrderReturnData,
    adminorderfilterationdata,
  ]);

  // console.log("PostAdminOrderFilterationData", PostAdminOrderFilterationData);




  const SaveAwbFun = (e) => {
    let payload = {
      product_order_id: pendingeditobjectdata.product_order_id,
      delivery_partner: partner,
      awb_number: awbcode,
      expected_date: expecteddeliverydate,
    };
    if (
      awbactive == false &&
      awbcode.length !== 0 &&
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

  const DeletePending = (e, orderid) => {
    let payload = {
      product_order_id: orderid,
    };
    dispatch(DeleteAdminPendingOrderAction(payload));
  };

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
    console.log(e.target.value);
    setExpectedDelliveryDate(e.target.value);
  };

  const PartnerNameFun = (e) => {
    setPartner(e.target.value);
    if (e.target.value.length !== 0) {
      setPartnerNameActive(false);
    } else {
      setPartnerNameActive(true);
    }
  };

  const CustomerChangeFun = (e) => {
    setUsertype(e.target.value)
  };

  const showTransactionHistory = (userId) => {
    console.log("qwerty", userId)
    dispatch(PostTransactionHistory(
      {
        "user_id": `${userId}`
      }))

  }


  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part ${HeaderToggleClassAddData}`}>
          <Sidebar />

          <div className="content-sec ">
            <div className="ordertittle-part ">
              <h2>Transactions</h2>
              <select
                className="form-select"
                onChange={(e) => CustomerChangeFun(e)}
              >
                <option value="b2c">B2C</option>
                <option value="b2b">B2B</option>
              </select>
            </div>

            <div className="ordertab-sec">
              <div className="tab-content" id="myTabContent">
                <div
                  className={`tab-pane pending-tabpane fade   ${pandingtab ? "show active" : "-1"
                    }`}
                  id="pending-tab-pane"
                  role="tabpanel"
                  aria-labelledby="pending-tab"
                  tabindex={`${pandingtab ? "0" : "-1"}`}
                >
                  <table>
                    <tr>
                      <th>Name</th>
                      <th>User Id</th>
                      <th>Email</th>
                      <th>Phone Number</th>
                       
                    </tr>

                    {PermissionData()?.VIEW_ORDER_PENDING == "VIEW_ORDER_PENDING" ?
                      GetSettingUserInfoData &&
                      GetSettingUserInfoData?.User_info?.map((item, id) => {

                        return (
                          <tr>

                            <td
                              style={{ cursor: "pointer" }}
                              onClick={() => showTransactionHistory(item.user_id)}

                            >{item.name || item.company_name}</td>

                            <td>
                              <b> {item.user_id}</b>
                            </td>

                            {/* <td>{item.product_order_id}</td> */}
                            <td>{item.email}</td>

                            <td>{item.phone_number}</td>
                            
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

      {popup && (
        <div className="popupouter transition-popup">
          <div className="editb2b-box">
            <h2>Transaction Details </h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => setPopup(false)}
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
            {/* {console.log("TransactionHistorytData?.data !==[]",TransactionHistorytData?.data ==[])} */}
            <div  className="tab-content mt-5">


              <table>
                <tr>
                <th>Order Id</th>
                  <th >Amount</th>
                  <th>Source</th>
                  <th>Status</th>
                   

                </tr>
                {!TransactionHistorytData?.data?.length==0?TransactionHistorytData?.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.order_id}</td>
                      <td>{item.amount}</td>
                      <td>{item.source}</td>
                      <td>{item.status}</td>
                       

                    </tr>
                  )
                }):<tr> <td colSpan='4' > <p className="text-center text-muted mt-5">No Transaction are there !</p> </td></tr> }
                {/* {TransactionHistorytData?.data.map((item) => {
                  return (
                    <tr>
                      <td>{item.order_id}</td>
                      <td>{item.amount}</td>
                      <td>{item.source}</td>
                      <td>{item.status}</td>
                    </tr>
                  )
                })} */}

              </table>
            </div>
            <div className="popup-body row ">
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
    </>
  );
};
export default Transactions;
