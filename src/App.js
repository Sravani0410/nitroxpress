import "./App.css";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./Components/DashboardLayout/Dashboard.css";
import "../src/Admin/Admin.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./index.css";
import "react-phone-input-2/lib/style.css";
import Homepage from "./Pages/Staticpages/Homepage";
import Servicepage from "./Pages/Staticpages/Servicepage";
import Supportpage from "./Pages/Staticpages/Supportpage";
import Privacypage from "./Pages/Staticpages/Privacypage";
import Termspage from "./Pages/Staticpages/Termspage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import VeryfiyEmail from "./Pages/VeryfiyEmail";
import VeryfiyPhone from "./Pages/VeryfiyPhone";
import ProfilePage from "./ProfilePage/ProfilePage";
import ResetPassword from "./Pages/resetpassword/[id]";
import Generalinfo from "./ProfilePage/Generalinfo";
import Shipping from "./ProfilePage/Shipping";
import Shippingpayment from "./ProfilePage/Shippingpayment";
import Tracking from "./ProfilePage/Tracking";
import AdminDashboard from "./Admin/AdminDashboard";
import Order from "./Admin/Order";
import Orderinner from "./Admin/Orderinner";
import User from "./Admin/AddOrder/User";
import Ordertracking from "./Admin/AddOrder/Ordertracking";
import OrderDatails from "./Admin/AddOrder/OrderDatails";
import OrderPayment from "./Admin/AddOrder/OrderPayment";
import OrderSelection from "./Admin/AddOrder/OrderSelection";
import OrderSummary from "./Admin/AddOrder/OrderSummary";
import Customer from "./Admin/Customer";
import Setting from "./Admin/Setting";
import Employee from "./Admin/Setting/Employee";
import UserProfile from "./Admin/Setting/UserProfile";
import UserSetting from "./Admin/Setting/UserSetting";
import AdminSetting from "./Admin/Setting/AdminSetting";
import Warehouse from "./Admin/Setting/Warehouse";
import DeliveryBoy from "./Admin/Setting/DeliveryBoy";
import B2B from "./Admin/Support/B2B";
import B2C from "./Admin/Support/B2C";
import Cod from "./Admin/Invoices/Cod";
import B2BCLose from "./Admin/Support/B2BClose";
import B2cClose from "./Admin/Support/B2cClose";
import Accounting from "./Admin/Accounting/Accounting";
import WalletHistory from "./Admin/WalletHistory";
import UserB2C from "./Admin/Setting/UserB2C";
import B2bfeedback from "./Admin/Feedback/B2bfeedback";
import B2cfeedback from "./Admin/Feedback/B2cfeedback";
import Ordertrack from "./Admin/Ordertrack";
import TrackOrder from "./ProfilePage/TrackOrder";
import Transactions from "./Admin/Transaction/Transaction";
import KYC from "./Pages/KYC";
import Blogs from "./BlogsPage/Blogs";
import BlogsShweta from "./BlogsPage/BlogsShweta";
import BlogsIshita from "./BlogsPage/BlogsIshita";
import * as Sentry from "@sentry/react";
import { reactLocalStorage } from "reactjs-localstorage";
import { TokenDataValidCheck1 } from "./Authanticate";
import PaymentApproval from "./Admin/PaymentApproval";
import { PermissionData } from "./Permission";
import PageNotFound from "./ProfilePage/Pagenotfound";

// import Blogs from "./BlogsPage/Blogs";
// import BlogsShweta from "./BlogsPage/BlogsShweta";
// import BlogsIshita from "./BlogsPage/BlogsIshita";

function App({ auth }) {
  let location = useLocation();
  let navigate = useNavigate();

  const [isOnline, setNetwork] = useState(window.navigator.onLine);

  let SessionTokenData = sessionStorage.getItem("token");
  let deliveryTokenData = sessionStorage.getItem("token");
  let Autherization = sessionStorage.getItem("Authorized");

  useEffect(() => {
    if (SessionTokenData == null && location.pathname != "/login") {
      let splitOrderId = location?.pathname.split("/");
      if (
        location.pathname == "/" ||
        location.pathname == "/login" ||
        location.pathname == "/Servicepage" ||
        location.pathname ==
          `${location.pathname?.includes("support") ? "/support" : "/login"}` ||
        location.pathname == "/privacy-policy" ||
        location.pathname == "/signup" ||
        location.pathname == "/verifyemail" ||
        location.pathname == "/veryfiyphone" ||
        location.pathname == `${"/resetpassword/"}${splitOrderId[2]}` ||
        location.pathname == "/page/kyc" ||
        location.pathname == `${"/profile/trackorder/"}${splitOrderId[3]}` ||
        location.pathname == "/signup"
        // ||
        // location.pathname=="/admin/order/orderpayment"
      ) {
        navigate(`${location.pathname}`);
      } else if (
        location.pathname == `/support/` &&
        location.hash == "#contactdata"
      ) {
        navigate(`${location.pathname}${location.hash}`);
      } else {
        toast.warn("Login Session is Expired Please Login-again");
        const myTimeout = setTimeout(sessionStorageLogOutFun, 1000);
      }

      // navigate("/login"); i can't use this navigation here becouse it always go to login when tere is no token
      // soo he can't go in nitro website he will re-render on login page
    }
  }, [location.pathname]);

  function sessionStorageLogOutFun(error) {
    navigate("/login");
    sessionStorage.clear();
  }

  useEffect(() => {
    window.addEventListener("offline", () =>
      setNetwork(window.navigator.onLine)
    );
    window.addEventListener("online", () =>
      setNetwork(window.navigator.onLine)
    );
  }, []);

  useEffect(() => {
    if (isOnline == false) {
      toast.warn("Internet lost!");
    }
  }, [isOnline]);

  useEffect(() => {
    let value = location.pathname.split("/");

    if (
      value[3] == "User" ||
      value[3] == "orderdetails" ||
      value[3] == "ordersummary" ||
      value[3] == "orderpayment"
    ) {
    } else {
      sessionStorage.removeItem("UserDetailsPayload");
      sessionStorage.removeItem("Eway_bill_URL");
      sessionStorage.removeItem("PayloadOrderData");
      sessionStorage.removeItem("Eway_bill_id");
      sessionStorage.removeItem("OrderDetailsId");
      sessionStorage.removeItem("add_order_tag");
    }
  }, [location?.pathname]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/payment-approval" element={<PaymentApproval />}></Route>
        <Route path="/Servicepage" element={<Servicepage />}></Route>
        <Route path="/support" element={<Supportpage />}></Route>
        <Route path="/privacy-policy" element={<Privacypage />} />
        <Route path="/terms-and-conditions" element={<Termspage />} />
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/verifyemail" element={<VeryfiyEmail />}></Route>
        <Route path="/veryfiyphone" element={<VeryfiyPhone />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route path="/resetpassword/:id" element={<ResetPassword />} />
        <Route path="/generalinfo" element={<Generalinfo />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/shippingpayment" element={<Shippingpayment />} />
        <Route path="/admin/tracking" element={<Tracking />} />
        {/* {PermissionData()?.VIEW_ADMIN_DASHBOARD == "VIEW_ADMIN_DASHBOARD" ? (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        ) : (
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        )} */}

        <Route
          path="/admin/dashboard"
          element={
            PermissionData()?.VIEW_ADMIN_DASHBOARD_PAGE ==
            "VIEW_ADMIN_DASHBOARD_PAGE" ? (
              <AdminDashboard />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/order"
          element={
            PermissionData()?.VIEW_ORDER_PAGE == "VIEW_ORDER_PAGE" ? (
              <Order />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/Orderinner/:id"
          element={
            PermissionData()?.VIEW_ORDER_SUMMARY_PAGE ==
            "VIEW_ORDER_SUMMARY_PAGE" ? (
              <Orderinner />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/order/User"
          element={
            PermissionData()?.VIEW_ORDER_CREATE_PAGE ==
            "VIEW_ORDER_CREATE_PAGE" ? (
              <User />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="/admin/Ordertracking" element={<Ordertracking />} />
        <Route
          path="/admin/order/orderselection"
          element={<OrderSelection />}
        />
        <Route path="/admin/order/orderdetails" element={<OrderDatails />} />
        <Route path="/admin/order/ordersummary" element={<OrderSummary />} />
        <Route path="/admin/order/orderpayment" element={<OrderPayment />} />
        <Route path="/admin/customer" element={<Customer />} />
        <Route
          path="/admin/setting"
          element={
            PermissionData()?.VIEW_SETTING_PAGE == "VIEW_SETTING_PAGE" ? (
              <Setting />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/employee"
          element={
            PermissionData()?.VIEW_SETTING_EMPLOYEE_PAGE ==
            "VIEW_SETTING_EMPLOYEE_PAGE" ? (
              <Employee />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/userprofile"
          element={
            PermissionData()?.VIEW_SETTING_USER_PROFILE_PAGE ==
            "VIEW_SETTING_USER_PROFILE_PAGE" ? (
              <UserProfile />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/userb2c"
          element={
            PermissionData()?.VIEW_SETTING_USER_B2C_PAGE ==
            "VIEW_SETTING_USER_B2C_PAGE" ? (
              <UserB2C />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/usersetting"
          element={
            PermissionData()?.VIEW_SETTING_CATEGORY_PAGE ==
            "VIEW_SETTING_CATEGORY_PAGE" ? (
              <UserSetting />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/adminsetting"
          element={
            PermissionData()?.VIEW_PROFILE_PAGE == "VIEW_PROFILE_PAGE" ? (
              <AdminSetting />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/setting/deliveryboy"
          element={
            PermissionData()?.VIEW_SETTING_DELIVERY_BOY_PAGE ==
            "VIEW_SETTING_DELIVERY_BOY_PAGE" ? (
              <DeliveryBoy />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="/admin/setting/Ware" element={<Warehouse />} />
        <Route
          path="/admin/support/b2b"
          element={
            PermissionData()?.VIEW_SUPPORT_B2B_PAGE ==
            "VIEW_SUPPORT_B2B_PAGE" ? (
              <B2B />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="/admin/support/b2c" element={<B2C />} />
        <Route
          path="/admin/invoices/cod"
          element={
            PermissionData()?.VIEW_COD_REMITTANCE_PAGE ==
            "VIEW_COD_REMITTANCE_PAGE" ||  PermissionData()?.VIEW_INVOICE_PAGE ==
            "VIEW_INVOICE_PAGE"? (
              <Cod />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/support/b2b/b2c"
          element={
            PermissionData()?.VIEW_SUPPORT_B2C_PAGE ==
            "VIEW_SUPPORT_B2C_PAGE" ? (
              <B2C />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/support/b2b/b2bclose"
          element={
            PermissionData()?.VIEW_SUPPORT_B2B_RESOLVED_PAGE ==
            "VIEW_SUPPORT_B2B_RESOLVED_PAGE" ? (
              <B2BCLose />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route
          path="/admin/support/b2b/b2cclose"
          element={
            PermissionData()?.VIEW_SUPPORT_B2C_RESOLVED_PAGE ==
            "VIEW_SUPPORT_B2C_RESOLVED_PAGE" ? (
              <B2cClose />
            ) : (
              <PageNotFound />
            )
          }
        />
        <Route path="/admin/support/accounting" element={<Accounting />} />
        <Route
          path="/admin/wallethistory"
          element={
            PermissionData()?.VIEW_WALLET_HISTORY_PAGE ==
            "VIEW_WALLET_HISTORY_PAGE" ? (
              <WalletHistory />
            ) : (
              <PageNotFound />
            )
          }
        ></Route>
        <Route
          path="/admin/setting/b2cfeedback"
          element={
            PermissionData()?.VIEW_B2C_FEEDBACK_PAGE ==
            "VIEW_B2C_FEEDBACK_PAGE" ? (
              <B2cfeedback />
            ) : (
              <PageNotFound />
            )
          }
        ></Route>
        <Route
          path="/admin/setting/b2bfeedback"
          element={
            PermissionData()?.VIEW_B2B_FEEDBACK_PAGE ==
            "VIEW_B2B_FEEDBACK_PAGE" ? (
              <B2bfeedback />
            ) : (
              <PageNotFound />
            )
          }
        ></Route>
        <Route
          path="/admin/ordertrack/:id"
          element={
            PermissionData()?.VIEW_ORDER_TRACK_PAGE ==
            "VIEW_ORDER_TRACK_PAGE" ? (
              <Ordertrack />
            ) : (
              <PageNotFound />
            )
          }
        ></Route>
        <Route path="/profile/trackorder/:id" element={<TrackOrder />}></Route>
        <Route
          path="/admin/transaction/"
          element={
            PermissionData()?.VIEW_B2B_TRANSACTIONS_PAGE ==
              "VIEW_B2B_TRANSACTIONS_PAGE" ||
            PermissionData()?.VIEW_B2C_TRANSACTIONS_PAGE ==
              "VIEW_B2C_TRANSACTIONS_PAGE" ? (
              <Transactions />
            ) : (
              <PageNotFound />
            )
          }
        ></Route>
        <Route path="/page/kyc" element={<KYC />}></Route>
        <Route path="/b-card" element={<Blogs />}></Route>
        <Route path="/notfound" element={<PageNotFound />}></Route>
        {/* <Route path="/b-card/ishita" element={<BlogsIshita />}></Route>

        <Route path="/b-card/shweta" element={<BlogsShweta />}></Route> */}

        {/*<Route path="/admin/setting" element={<Setting />} />       
        <Route path="/admin/support" element={<Support />} />
        <Route path="/admin/accounting" element={<Accounting/>} />
        <Route path="/admin/invoice" element={<Invoice />} /> */}
      </Routes>
      <ToastContainer autoClose={2000} />
    </>
  );
}

export default Sentry.withProfiler(App);
