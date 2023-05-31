import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { reactLocalStorage } from 'reactjs-localstorage';
import { GetDeliveryPriceDetail, PostViewAdminOrder, GetAdminOrderPaymentOrder, PostAdminOrderPaymentOrder, PostAdminOrderAddShipment, PostAddOrderTag } from "../../Redux/action/ApiCollection";

const OrderSummary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [alldata, setAllData] = useState("")
  const [ItemDetailPayloadData, setItemDetailPayloadData] = useState('')

  const [UpdateFromLocalStoragevalues, setUpdateFromLocalStorageValues] = useState("")


  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const PostViewAdminOrderReducerData = useSelector(state => state.PostViewAdminOrderReducer?.PostViewAdminOrderData)
  const GetDeliveryPriceDetailReducerData = useSelector(state => state.GetDeliveryPriceDetailReducer.GetDeliveryPriceDetailData?.data)
  const GetAdminOrderPaymentOrderData = useSelector(state => state.GetAdminOrderPaymentOrderReducer.GetAdminOrderPaymentOrderData)
  const PostAdminOrderAddShipmentData = useSelector(state => state.PostAdminOrderAddShipmentReducer?.PostAdminOrderAddShipmentData)
  const PaymentPopupValueData = useSelector(state => state.PaymentPopupValueReducer?.PaymentPopupValueData)

  let PayloadUser = reactLocalStorage.get("UserDetailsPayload", false);
  let PayloadUserData = JSON.parse(PayloadUser)
  let PayloadEwayId = reactLocalStorage.get("Eway_bill_id", false);
  let PayloadOrder = reactLocalStorage.get("PayloadOrderData", false);
  let PayloadOrderData = JSON.parse(PayloadOrder)
  let OrderDetailsId = reactLocalStorage.get("OrderDetailsId", false);
  let OrderDetailsIdData = JSON.parse(OrderDetailsId)

  let totalPriceValue = reactLocalStorage.get('totalPriceValue',false)
console.log("UpdateFromLocalStoragevalues",UpdateFromLocalStoragevalues)

  useEffect(() => {

  

    let PayloadUser = reactLocalStorage.get("UserDetailsPayload", false);
    let PayloadUserData = JSON.parse(PayloadUser)
    setUpdateFromLocalStorageValues(PayloadUserData)


  }, [])

  useEffect(() => {
    if (PostAdminOrderAddShipmentData.status == 200) {
      navigate("/admin/order/orderpayment");

    } 
   
  }, [PostAdminOrderAddShipmentData,PaymentPopupValueData])

  useEffect(() => {

    let PayloadOrder = reactLocalStorage.get("PayloadOrderData", false);
    let PayloadOrderData = JSON.parse(PayloadOrder)
    let object = {
      "amount": PayloadUserData?.amount,
      "company_name": PayloadUserData?.company_name,
      "eway_bill": PayloadEwayId,
    }

    let items = {
      ...PayloadOrderData, ...object
    }

    setItemDetailPayloadData(items)

  }, [PayloadUser])

  useEffect(() => {

    if (PostViewAdminOrderReducerData) {
      setAllData(PostViewAdminOrderReducerData)
    }
    if (GetAdminOrderPaymentOrderData) {
      setAllData(GetAdminOrderPaymentOrderData)
    }

  }, [PostViewAdminOrderReducerData, GetAdminOrderPaymentOrderData])


  const ItemDetailsBackBtnFun = () => {
    navigate("/admin/order/orderdetails")
    // window.location.reload(true)
  };

  const ProceedToPayFun = () => {
    const TagOrderData=reactLocalStorage.get("add_order_tag",false)
    const PayloadTagOrderData=JSON.parse(TagOrderData)
    const OrderDetailsId=reactLocalStorage.get("OrderDetailsId",false)
    const OrderDetailsIdpayload=JSON.parse(OrderDetailsId)
    let payload = {
      product_order_id: OrderDetailsIdpayload?.product_order_id,
      order_tag: PayloadTagOrderData?.add_order,
    };
    // dispatch(PostAddOrderTag(payload));

    dispatch(PostAdminOrderPaymentOrder(UpdateFromLocalStoragevalues, ItemDetailPayloadData))
    // dispatch(PostAdminOrderAddShipment(items))
  }

  useEffect(() => {
    // dispatch(PostAdminOrderAddShipment(items))
  }, [])

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
                className="active"
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
              <h1>Summary Details</h1>
              <div className="userinfo-body">
                <h3>Address Details</h3>
                <ul className="addressdetail-list">
                  <li>
                    <span>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="9.5" stroke="#E4B400" />
                      </svg>
                    </span>
                    <div className="right-part">
                      <h3 className="mb-0">Pickup Address</h3>
                      <p className="mb-0">
                       Name - {UpdateFromLocalStoragevalues?.pickup_name}
                      </p>
                      <p className="mb-0">
                       Address - {UpdateFromLocalStoragevalues?.pickup_address}
                      </p>
                      <p className="mb-0">

                        <span>Mob. - {UpdateFromLocalStoragevalues?.pickup_phone_number} </span >
                      </p>
                    </div>
                  </li>
                  <li>
                    <span>
                      <svg
                        width="20"
                        height="26"
                        viewBox="0 0 20 26"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.1214 0.0366051C7.27664 0.229082 5.48857 0.948531 4.03836 2.08179C3.47961 2.51842 2.55554 3.46437 2.13 4.03541C-1.18074e-05 6.89341 -0.566716 10.6286 0.584649 14.2214C1.49949 17.0762 3.29828 19.8606 6.06251 22.7008C7.24173 23.9123 8.9646 25.431 9.67965 25.8891C10.0439 26.1225 10.2193 26.041 11.3314 25.1214C13.4025 23.4091 15.5129 21.1598 16.8991 19.1874C18.4396 16.9955 19.4998 14.5788 19.8668 12.4232C20.0654 11.2562 20.0397 9.57212 19.8046 8.35879C19.1223 4.83656 16.5884 1.80414 13.3124 0.588952C12.0792 0.131595 10.3701 -0.0936867 9.1214 0.0366051ZM10.7513 1.27774C12.9304 1.49478 14.8113 2.42976 16.3135 4.0425C18.6133 6.51148 19.3989 10.0036 18.4211 13.4102C17.9198 15.1563 17.0593 16.8736 15.8172 18.6068C14.4142 20.5644 12.3481 22.7309 10.3035 24.3886L10.0082 24.6281L9.52335 24.2312C8.69713 23.5546 7.58107 22.5197 6.76983 21.6776C2.28349 17.0212 0.437683 12.3746 1.43832 8.25602C2.01243 5.89317 3.50475 3.79666 5.51332 2.53137C6.5617 1.87091 7.91887 1.40775 9.17941 1.28018C9.86308 1.21103 10.0778 1.21068 10.7513 1.27774ZM9.0109 5.36864C7.82324 5.62086 6.64469 6.42462 5.93936 7.46335C4.95391 8.91462 4.73208 10.858 5.36531 12.4932C5.82847 13.6892 6.66231 14.633 7.76776 15.2124C8.59276 15.6448 9.03477 15.7512 10.0054 15.7512C10.9736 15.7512 11.4141 15.6456 12.2431 15.2148C13.3201 14.6551 14.1887 13.6807 14.627 12.5405C14.8969 11.8382 14.9896 11.3379 14.9929 10.5652C14.9967 9.69289 14.8686 9.06158 14.5365 8.31693C13.8538 6.78606 12.5086 5.67567 10.9593 5.36417C10.4575 5.26326 9.49683 5.26546 9.0109 5.36864ZM10.7674 6.58952C11.7104 6.786 12.644 7.44971 13.1889 8.31112C13.9038 9.44119 14.0212 10.9926 13.4824 12.1899C12.9783 13.3099 12.0609 14.1204 10.9447 14.4316C10.4616 14.5663 9.54578 14.5658 9.06615 14.4304C7.67721 14.0386 6.57916 12.8475 6.27285 11.4007C6.12903 10.7212 6.18274 9.81627 6.40446 9.18484C7.0705 7.2876 8.89863 6.20015 10.7674 6.58952Z"
                          fill="#FFC900"
                        />
                      </svg>
                    </span>
                    <div className="right-part">
                      <h3 className="mb-0">Delivered Address</h3>
                      <p className="mb-0">
                        Name - {UpdateFromLocalStoragevalues?.delivered_name}
                      </p>
                      <p className="mb-0">
                        Address - {UpdateFromLocalStoragevalues?.delivered_address}
                      </p>
                      <p className="mb-0">

                        <span>Mob. - {UpdateFromLocalStoragevalues?.delivered_phone_number} </span >
                      </p>
                    </div>
                  </li>
                </ul>
                <hr className="add-border" />
                <h3>Address Details</h3>
                <div className="row">
                  <div className="col-6  py-3">Product Name</div>
                  <div className="col-6 text-end py-3">
                    <b>{PayloadOrderData?.product_type}</b >
                  </div>
                  <div className="col-6 border-top py-3">Quantity</div>
                  <div className="col-6 border-top text-end py-3">
                    <b>{PayloadOrderData?.quantity}</b >
                  </div>
                  <div className="col-6 border-top py-3">Weight</div>
                  <div className="col-6 text-end border-top py-3">
                    <b>{PayloadOrderData?.weight}</b >
                  </div>
                  <div className="col-6 border-top py-3">Value</div>
                  <div className="col-6 text-end border-top py-3">
                    {totalPriceValue}/ -
                  </div>
                </div>
                {/* <hr className="add-border" /> */}
                {/* <h3>Select Delivery Type</h3>
                <div className="delivery-dropdown">
                  <p>
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="22"
                        cy="22"
                        r="21.5"
                        fill="white"
                        stroke="#D9D9D9"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M21.601 11.0379C21.133 11.126 20.8943 11.2852 19.9888 12.1134C19.4179 12.6355 19.0647 12.9263 18.9525 12.9665C18.7979 13.022 18.6879 13.015 17.7552 12.8905C17.1902 12.815 16.5943 12.7516 16.4309 12.7495C15.7606 12.7409 15.1466 13.0508 14.7739 13.5858C14.5469 13.9118 14.5002 14.0708 14.2832 15.2581C14.184 15.8003 14.0722 16.3009 14.0346 16.3706C13.9516 16.5244 13.8342 16.5962 12.9144 17.0561C11.662 17.6821 11.4454 17.8468 11.1886 18.368C11.0447 18.6603 11.0012 18.8651 11 19.2571C10.9989 19.6216 11.0667 19.8 11.6221 20.8936C11.9871 21.6122 12.0966 21.8681 12.0966 22.0025C12.0966 22.137 11.9871 22.3928 11.6221 23.1115C11.0667 24.2051 10.9989 24.3835 11 24.748C11.0012 25.1399 11.0447 25.3448 11.1886 25.6371C11.4454 26.1582 11.662 26.323 12.9144 26.949C13.8342 27.4088 13.9516 27.4807 14.0346 27.6344C14.0722 27.7042 14.1842 28.2058 14.2836 28.7492C14.3829 29.2926 14.492 29.8258 14.526 29.9341C14.769 30.7082 15.5212 31.2479 16.3691 31.2566C16.5419 31.2583 17.1555 31.1962 17.7327 31.1186C18.6871 30.9902 18.7976 30.983 18.9525 31.0385C19.0647 31.0788 19.4179 31.3696 19.9888 31.8917C20.6777 32.5218 20.9115 32.7091 21.1323 32.8082C21.7024 33.0639 22.2975 33.0639 22.8676 32.8082C23.0884 32.7091 23.3221 32.5218 24.0111 31.8917C24.582 31.3696 24.9352 31.0788 25.0474 31.0385C25.202 30.9831 25.312 30.99 26.2447 31.1146C26.8096 31.19 27.4056 31.2535 27.569 31.2556C28.2392 31.2642 28.8532 30.9543 29.226 30.4193C29.453 30.0933 29.4996 29.9343 29.7167 28.7469C29.8158 28.2048 29.9277 27.7042 29.9653 27.6344C30.049 27.4792 30.1497 27.4184 31.2037 26.8873C32.197 26.3867 32.4172 26.2362 32.6579 25.893C32.8954 25.5544 32.9962 25.2365 32.9998 24.8149C33.0035 24.3788 32.9578 24.2537 32.3777 23.1115C32.0128 22.3928 31.9033 22.137 31.9033 22.0025C31.9033 21.8681 32.0128 21.6122 32.3777 20.8936C32.9578 19.7514 33.0035 19.6263 32.9998 19.1902C32.9962 18.7686 32.8954 18.4507 32.6579 18.1121C32.4172 17.7689 32.197 17.6184 31.2037 17.1178C30.1497 16.5867 30.049 16.5259 29.9653 16.3706C29.9277 16.3009 29.8158 15.8003 29.7167 15.2581C29.4996 14.0708 29.453 13.9118 29.226 13.5858C28.8532 13.0508 28.2392 12.7409 27.569 12.7495C27.4056 12.7516 26.8096 12.815 26.2447 12.8905C25.312 13.015 25.202 13.022 25.0474 12.9665C24.9352 12.9263 24.582 12.6355 24.0111 12.1134C23.3326 11.4929 23.0866 11.2952 22.8752 11.2003C22.4439 11.0068 22.0397 10.9553 21.601 11.0379ZM22.3364 12.3641C22.4105 12.4091 22.8396 12.7853 23.29 13.2C24.1896 14.0282 24.4265 14.1787 24.9548 14.2575C25.261 14.3032 25.3666 14.2942 26.7445 14.1051C27.2195 14.0398 27.6286 14.0044 27.719 14.0207C27.9074 14.0546 28.1172 14.2155 28.1845 14.3778C28.2117 14.4433 28.3169 14.9509 28.4183 15.5058C28.6186 16.6016 28.6893 16.8288 28.9372 17.1738C29.158 17.4811 29.3636 17.6165 30.4599 18.1761C30.9768 18.4399 31.4377 18.6878 31.4843 18.7269C31.5965 18.8213 31.6912 19.0425 31.6912 19.2104C31.6912 19.2954 31.4995 19.725 31.1772 20.3624C30.6413 21.4221 30.5717 21.6106 30.5717 22.0025C30.5717 22.3945 30.6413 22.5829 31.1772 23.6426C31.4995 24.2801 31.6912 24.7096 31.6912 24.7946C31.6912 24.9626 31.5965 25.1838 31.4843 25.2782C31.4377 25.3173 30.9768 25.5652 30.4599 25.829C29.3636 26.3886 29.158 26.5239 28.9372 26.8313C28.6893 27.1763 28.6186 27.4035 28.4183 28.4993C28.3169 29.0542 28.2117 29.5618 28.1845 29.6273C28.1172 29.7896 27.9074 29.9505 27.719 29.9844C27.6286 30.0007 27.2195 29.9653 26.7445 29.9C25.3666 29.7109 25.261 29.7019 24.9548 29.7476C24.4265 29.8264 24.1896 29.9768 23.29 30.8051C22.8396 31.2198 22.4105 31.5959 22.3364 31.641C22.1825 31.7348 21.8514 31.7487 21.6995 31.6677C21.6453 31.6389 21.2355 31.2811 20.7888 30.8728C19.9193 30.0779 19.738 29.9449 19.3528 29.8196C18.994 29.7029 18.5702 29.7148 17.4348 29.8731C16.836 29.9567 16.3741 30.0012 16.2807 29.9844C16.0924 29.9505 15.8827 29.7896 15.8154 29.6273C15.7882 29.5618 15.683 29.0542 15.5815 28.4993C15.3812 27.4035 15.3106 27.1763 15.0627 26.8313C14.8419 26.5239 14.6363 26.3886 13.5399 25.829C13.0231 25.5652 12.5621 25.3173 12.5156 25.2782C12.4033 25.1838 12.3087 24.9626 12.3087 24.7946C12.3087 24.7096 12.5003 24.2801 12.8227 23.6426C13.3586 22.5829 13.4281 22.3945 13.4281 22.0025C13.4281 21.6106 13.3586 21.4221 12.8227 20.3624C12.5003 19.725 12.3087 19.2954 12.3087 19.2104C12.3087 19.0425 12.4033 18.8213 12.5156 18.7269C12.5621 18.6878 13.0231 18.4399 13.5399 18.1761C14.6363 17.6165 14.8419 17.4811 15.0627 17.1738C15.3106 16.8288 15.3812 16.6016 15.5815 15.5058C15.683 14.9509 15.7882 14.4433 15.8154 14.3778C15.8827 14.2155 16.0924 14.0546 16.2808 14.0207C16.3712 14.0044 16.7803 14.0398 17.2553 14.1051C18.6332 14.2942 18.7389 14.3032 19.0451 14.2575C19.5734 14.1787 19.8102 14.0282 20.7099 13.2C21.1603 12.7853 21.5894 12.4091 21.6634 12.3641C21.8401 12.2565 22.1598 12.2565 22.3364 12.3641ZM18.8368 16.3461C17.7234 16.5835 16.9279 17.5314 16.9306 18.6174C16.9332 19.6469 17.6596 20.5556 18.7216 20.8579C19.0275 20.945 19.6118 20.9475 19.9494 20.8632C20.8372 20.6415 21.5601 19.9041 21.7336 19.0432C22.0567 17.4397 20.5011 15.9913 18.8368 16.3461ZM26.1053 17.2345C25.9656 17.3071 17.1118 25.7944 17.0393 25.9253C16.8902 26.194 17.0094 26.5645 17.2997 26.7341C17.4608 26.8283 17.7342 26.8461 17.8863 26.7724C18.0255 26.7051 26.8826 18.2204 26.9606 18.0798C27.1097 17.811 26.9905 17.4406 26.7002 17.271C26.5404 17.1776 26.249 17.1597 26.1053 17.2345ZM19.9175 17.7249C20.5108 18.0765 20.6219 18.8537 20.1469 19.3288C19.7091 19.7666 19.0206 19.7763 18.5716 19.3509C18.2875 19.0817 18.1786 18.5665 18.3317 18.2163C18.5882 17.6292 19.3551 17.3916 19.9175 17.7249ZM24.0313 23.144C23.1572 23.3697 22.4378 24.1107 22.2663 24.9619C22.1585 25.4972 22.2962 26.1801 22.6022 26.6273C22.9856 27.1875 23.6309 27.5908 24.2994 27.688C25.7426 27.8979 27.0727 26.7932 27.0692 25.3876C27.0667 24.3582 26.3402 23.4494 25.2783 23.1472C24.9787 23.0619 24.3553 23.0604 24.0313 23.144ZM25.1365 24.4522C25.5125 24.6361 25.7397 24.996 25.7358 25.4016C25.7298 26.0207 25.227 26.4645 24.5765 26.4248C23.6581 26.3688 23.2197 25.3093 23.853 24.6764C24.1954 24.3342 24.711 24.2441 25.1365 24.4522Z"
                        fill="#3F3F3F"
                      />
                    </svg>{" "}
                    Apply Coupon
                  </p>
                  <ul>
                    <li>20% Discount </li>
                    <li>30% Discount </li>
                    <li>40% Discount </li>
                  </ul>
                </div>
                <h3 className="mt-3">Delivery Type</h3>
                <div className="delivertype-list">
                  <ul>
                    {
                      GetDeliveryPriceDetailReducerData?.map((item, ids) => { 

                        return <li>
                          <h3>{item?.name}</h3>
                          <h2>{item?.price} /-</h2>
                          <p>{item?.days}</p>
                        </li>
                      })}
                    
                  </ul>
                </div> */}
              </div>
              <div className="row">


                <div className="col-sm-4 col-6 pe-0">
                  <button

                    type="button"
                    className="btn next-btn"
                    onClick={(e) => {
                      ItemDetailsBackBtnFun(e)
                    }}
                  >
                    {" "}
                    Previous{" "}
                  </button>
                </div>

                <div className="col-sm-4 d-none d-sm-block"></div>


                <div className="col-sm-4 col-6 ps-0">
                  <button

                    type="button"
                    className="btn next-btn"
                    onClick={(e) => {
                      // navigate("/admin/order/orderpayment");
                      ProceedToPayFun(e)
                    }}
                  >
                    {" "}
                    Proceed To Pay{" "}
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

export default OrderSummary;
