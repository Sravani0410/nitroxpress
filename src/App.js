
import "./App.css";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'
import PlacesAutocomplete from 'react-places-autocomplete';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import "./Components/DashboardLayout/Dashboard.css"
import "../src/Admin/Admin.css"
import { ToastContainer } from "react-toastify";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import './index.css';
import 'react-phone-input-2/lib/style.css'
import Homepage from "./Pages/Staticpages/Homepage";
import Servicepage from "./Pages/Staticpages/Servicepage";
import Supportpage from "./Pages/Staticpages/Supportpage";
import Privacypage from './Pages/Staticpages/Privacypage';
import Termspage from './Pages/Staticpages/Termspage'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import VeryfiyEmail from './Pages/VeryfiyEmail'
import VeryfiyPhone from './Pages/VeryfiyPhone'
import ProfilePage from './ProfilePage/ProfilePage'
import ResetPassword from './Pages/resetpassword/[id]'
import Generalinfo from './ProfilePage/Generalinfo'
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

// import Blogs from "./BlogsPage/Blogs";
// import BlogsShweta from "./BlogsPage/BlogsShweta";
// import BlogsIshita from "./BlogsPage/BlogsIshita";


function App({auth}) {

  let location = useLocation();
  let navigate = useNavigate()

  const [isOnline, setNetwork] = useState(window.navigator.onLine);




  useEffect(() => {
    let BearerToken1 = reactLocalStorage.get("token", false);
    let Autherization = reactLocalStorage.get("Autherization", false);
    if (BearerToken1 == false && location.pathname !== "/login") {
      if(Autherization=="unAutherized"){
      toast.warn("Login Session is Expired Please Login-again");
      navigate("/login")
    }  
      
    }
   })
 

  



  useEffect(() => {

    window.addEventListener("offline", () => setNetwork(window.navigator.onLine)
    );
    window.addEventListener("online", () => setNetwork(window.navigator.onLine)
    );

  }, []);

  useEffect(() => {
    let SessionTokenData = sessionStorage.getItem("token");
    if (!SessionTokenData) {
      navigate("/login")
      reactLocalStorage.remove()

    } 

  }, [])


  useEffect(() => {
    if (isOnline == false) {
      toast.warn("Internet lost!");
    }

  }, [isOnline])

  
  useEffect(() => {

    let value = location.pathname.split("/")

    if (value[3] == "User" || value[3] == "orderdetails" || value[3] == "ordersummary" || value[3] == "orderpayment") {


    }
    else {

      reactLocalStorage.remove('UserDetailsPayload');
      reactLocalStorage.remove("Eway_bill_URL");
      reactLocalStorage.remove("PayloadOrderData");
      reactLocalStorage.remove("Eway_bill_id");
      reactLocalStorage.remove("OrderDetailsId");
      reactLocalStorage.remove("add_order_tag")
    }

  }, [location?.pathname])
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
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
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/Orderinner/:id" element={<Orderinner />} />
        <Route path="/admin/order/User" element={<User />} />
        <Route path="/admin/Ordertracking" element={<Ordertracking />} />
        <Route path="/admin/order/orderselection" element={<OrderSelection />} />
        <Route path="/admin/order/orderdetails" element={<OrderDatails />} />
        <Route path="/admin/order/ordersummary" element={<OrderSummary />} />
        <Route path="/admin/order/orderpayment" element={<OrderPayment />} />
        <Route path="/admin/customer" element={<Customer />} />
        <Route path="/admin/setting" element={<Setting />} />
        <Route path="/admin/setting/employee" element={<Employee />} />
        <Route path="/admin/setting/userprofile" element={<UserProfile />} />
        <Route path="/admin/setting/userb2c" element={<UserB2C />} />
        <Route path="/admin/setting/usersetting" element={<UserSetting />} />
        <Route path="/admin/setting/adminsetting" element={<AdminSetting />} />
        <Route path="/admin/setting/Ware" element={<Warehouse />} />
        <Route path="/admin/support/b2b" element={<B2B />} />
        <Route path="/admin/support/b2c" element={<B2C />} />
        <Route path="/admin/invoices/cod" element={<Cod />} />
        <Route path="/admin/support/b2b/b2c" element={<B2C />} />
        <Route path="/admin/support/b2b/b2bclose" element={<B2BCLose />} />
        <Route path="/admin/support/b2b/b2cclose" element={<B2cClose />} />
        <Route path="/admin/support/accounting" element={<Accounting />} />
        <Route path="/admin/wallethistory" element={<WalletHistory />}></Route>
        <Route path="/admin/setting/b2cfeedback" element={<B2cfeedback />}></Route>
        <Route path="/admin/setting/b2bfeedback" element={<B2bfeedback />}></Route>
        <Route path="/admin/ordertrack/:id" element={<Ordertrack />}></Route>
        <Route path="/profile/trackorder/:id" element={<TrackOrder />}></Route>
        <Route path="/admin/transaction/" element={<Transactions />}></Route>
        <Route path="/page/kyc" element={<KYC />}></Route>
        <Route path="/b-card" element={<Blogs />}></Route>

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

