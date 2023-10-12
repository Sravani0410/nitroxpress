import { actionType } from "../type/types";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import { toast } from "react-toastify";
// import { useHistory } from 'react-router-dom';
import fileDownload from "js-file-download";
import { TokenDataValidCheck1 } from "../../Authanticate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
var fs = require("fs");

let BearerToken = sessionStorage.getItem("token", false);
let Is_delivery_boy=sessionStorage.getItem("Is_delivery_boy",false)
 let isEmployeData = sessionStorage.getItem("isEmploye", false);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status == 401) {
      const myTimeout = setTimeout(sessionStorageClearFun, 2000);
    }
    return Promise.reject(error);
  }
);

function sessionStorageClearFun(error) {
  sessionStorage.clear();
}

export const getViewProfile = () => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/viewprofile`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   Authorization: `Bearer ${BearerToken}`,
    // }

    // let reqOptions = {
    //   url: `${process.env.REACT_APP_BASE_URL}/viewprofile`,
    //   method: "POST",
    //   headers: headersList,
    // }
    // let response = await axios.request(reqOptions);

    dispatch({
      type: actionType.ViewProfile_Type,
      payload: response,
    });
  };
};
// lat and log delivery boy
// export const latandlog=()=>{
//   return async (dispatch)=>{
//     const response = await axios
//     .post(`${process.env.REACT_APP_BASE_URL}/signin`, {
//       email: emailSpaceCancelation,
//       password: passwordSpaceCancelation,
//     })
//     .then((Response) => {
//       setLoadSpiner((o) => !o);

//       if (Response?.data?.user_type == "as_individual") {
//         sessionStorage.setItem("as_individual", true);
//         sessionStorage.setItem("Admin_Role", false);
//         sessionStorage.setItem("isEmploye", false);
//         sessionStorage.setItem("Is_Business", false);
//         sessionStorage.setItem("Is_delivery_boy", false);
//       } else {
//         sessionStorage.setItem(
//           "as_individual",
//           Response?.data?.Role?.as_individual
//         );
//         sessionStorage.setItem(
//           "Admin_Role",
//           Response?.data?.Role?.is_admin
//         );
//         sessionStorage.setItem(
//           "isEmploye",
//           JSON.stringify(Response?.data?.Role?.employee)
//         );
//         sessionStorage.setItem(
//           "Is_Business",
//           Response?.data?.Role?.as_business
//         );
//         sessionStorage.setItem(
//           "Is_delivery_boy",
//           Response?.data?.Role?.is_delivery_boy
//         );
//       }
//       if(Response?.data?.Role?.is_delivery_boy != true) {
//         sessionStorage.setItem("token", Response.data.Token);
//       }
//       // sessionStorage.setItem("token", Response.data.Token);

//       // sessionStorage.setItem("token", Response.data.Token);
//       // sessionStorage.setItem("Admin_Role", Response?.data?.Role?.is_admin);
//       // sessionStorage.setItem("as_individual", Response?.data?.Role?.as_individual);
//       let Permission = JSON.stringify(Response?.data?.permission);
//       sessionStorage.setItem("Permission_Data", Permission);
//       // sessionStorage.setItem("isEmploye", JSON.stringify(Response?.data?.Role?.employee));
//       // sessionStorage.setItem("Is_Business", Response?.data?.Role?.as_business)

//       sessionStorage.setItem("user_right", Response?.data?.user_type);
//       if (Response?.data?.Role?.is_admin === true) {
//         navigate("/admin/dashboard");
//         toast.success("Login SuccessFully");
//         window.location.reload(true);
//       } else if (
//         Response?.data?.Role?.as_business === true ||
//         Response?.data?.Role?.employee === true
//       ) {
//         if (Permission.length !== 2) {
//           navigate("/admin/dashboard");
//           window.location.reload(true);
//           toast.success("Login SuccessFully");
//         } else {
//           toast.warn(
//             " Your account is under verification, Once it will verify we will inform you on E-mail ! "
//           );
//           sessionStorage.clear();
//         }
//       } else if (Response?.data?.Role?.is_delivery_boy === true) {
//         if ("geolocation" in navigator) {
//           navigator.geolocation.getCurrentPosition(
//             function (position) {
//               const latitude = position.coords.latitude;
//               const longitude = position.coords.longitude;
//               // Do something with the latitude and longitude
//             },
//             function (error) {
//               // Handle any errors that occur during location retrieval
//               switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                   console.error("User denied the request for geolocation.");
//                   break;
//                 case error.POSITION_UNAVAILABLE:
//                   console.error("Location information is unavailable.");
//                   break;
//                 case error.TIMEOUT:
//                   console.error(
//                     "The request to get user location timed out."
//                   );
//                   break;
//                 default:
//                   console.error("An unknown error occurred.");
//               }
//             }
//           );
//         }
//         sessionStorage.setItem("token", Response.data.Token);
//          // navigate("/admin/order");

//         toast.success("Login Successfully");
//       } else if (Response?.data?.Role?.as_individual === true) {
//         navigate("/profile");
//         dispatch(getViewProfile());
//         window.location.reload(true);
//         toast.success("Login SuccessFully");
//       } else if (Response?.data?.message == "Documents Not Uploaded") {
//         sessionStorage.setItem("User_Mail", email);

//         navigate("/page/kyc");

//         toast.warn("Please Complete Your KYC Verification");
//       } else if (Response?.data?.message === "Check your email") {
//         navigate("/verifyemail");
//       }
//     })
//     .catch((err) => {
//       setLoadSpiner((o) => !o);
//       if (err.response.data.message === "Verify Phone Number ,Check sms ") {
//         navigate("/veryfiyphone");
//       }

//       toast.warn(err.response.data.message);
//     });
//   }
// }

export const latAndLogAttendence = (payload, Token) => {
  // const navigate = useNavigate();
  return async (dispatch, getState) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_attendence_info`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      )
      .then((res) => {
        window.location.reload(true);
        return res;
        // navigate("/admin/dashboard");
      })
      .catch((err) => {
        return err;
      });

    dispatch({
      type: actionType.ViewOrderDetails_Type,
      payload: response,
    });
  };
};
export const getOrderAddress = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/address/saved_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/address/saved_address`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);

    dispatch({
      type: actionType.ViewOrderDetails_Type,
      payload: response,
    });
  };
};

const userPatchadata = () => ({
  type: actionType.PatchUserDetails_Type,
});

export const PatchUserDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/editprofile`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(userPatchadata());
  };
};

const DeleteAddressData = (data) => ({
  type: actionType.DeleteUserAddress_Type,
  payload: data,
});

export const DeleteUserAddress = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .delete(`${process.env.REACT_APP_BASE_URL}/address/delete_address`, {
        data: payload,
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // window.location.reload(false)
        dispatch(getOrderAddress());
        toast.success("Address Deleted successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteAddressData(response));
  };
};

const ResetPasswordPatch = (data) => ({
  type: actionType.ResetPasswordPatchReducer_Type,
  payload: data,
});

export const ResetPatchPassword = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/resetpassword`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("password changed successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(ResetPasswordPatch(responce));
  };
};

const PostPincodesAvailabilityDispatch = (data) => ({
  type: actionType.PostPincodesAvailabilityDispatch_Type,
  payload: data,
});
export const PostPincodesAvailability = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/check_pincodes_availability`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // if(res.data.message !=='Pin code not available'){
        //     toast.success(res.data.message);
        // }
        // else{
        //     toast.error(res.data.message);
        // }

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err.response;
      });
    dispatch(PostPincodesAvailabilityDispatch(responce));
  };
};

const PostPincodesDeliveredDispatch = (data) => ({
  type: actionType.PostPincodesDeliveredDispatch_Type,
  payload: data,
});
export const PostPincodesDelivered = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/check_delivered_pincode`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(PostPincodesDeliveredDispatch(responce));
  };
};

const PostPickupAddressDispatch = (data) => ({
  type: actionType.PostPickupAddressDispatch_Type,
  payload: data,
});
export const PostPickupAddress = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/address/add_pickup_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostPickupAddressDispatch(responce));
  };
};

const PatchPickupAddressDispatch = (data) => ({
  type: actionType.PatchPickupAddressDispatch_Type,
  payload: data,
});

export const PatchPickupAddress = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/address/edit_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchPickupAddressDispatch(responce));
  };
};
const PostDeliveryAddressDispatch = (data) => ({
  type: actionType.PostDeliveryAddressDispatch_Type,
  payload: data,
});
export const PostDeliveryAddress = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/address/add_delivered_address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success("address added successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostDeliveryAddressDispatch(responce));
  };
};

const PostShipmentDetailsDispatch = (data) => ({
  type: actionType.PostShipmentDetailsDispatch_Type,
  payload: data,
});
export const PostShipmentDetails = (
  payload,
  payloadDeliveredAddress,
  payloadPickupAddress,
  pickupPatchObjectId
) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/add_shipmentdetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(PostDeliveryAddress(payloadDeliveredAddress));
        // pickupPatchObjectId === null
        //  dispatch(PostPickupAddress(payloadPickupAddress))
        // ?
        dispatch(PostPickupAddress(payloadPickupAddress));
        // :  dispatch(PatchPickupAddress(payloadPickupAddress));

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostShipmentDetailsDispatch(responce));
  };
};

// const GetShipmentDetailsDispatch=(data)=>({
//   type: actionType.GetShipmentDetailsDispatch_Type,
//   payload: data,
// })
export const GetShipmentDetails = (payload) => {
  return async (dispatch, getState) => {
    let bodyContent = JSON.stringify(payload);
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/view_shipment_details `,
        bodyContent,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        if (
          err?.response?.data?.message ==
          "Zone is not provided for particular pincode"
        ) {
          toast.warn(
            "Price quotation has not been uploaded by admin,so please contact nitroxpress customer service"
          );
        } else {
          toast.warn(err?.response?.data?.message);
        }
        // toast.warn("Quotation has not been uploaded by admin,so please contact nitroxpress customer service");
        return err;
      });
    // dispatch(GetShipmentDetailsDispatch(responce));
    dispatch({
      type: actionType.GetShipmentDetailsDispatch_Type,
      payload: responce,
    });
  };
};

// Dashboard API

const GetAdminDashboardViewOrderDispatch = (data) => ({
  type: actionType.GetAdminDashboardViewOrderDispatch_Type,
  payload: data,
});
export const GetAdminDashboardViewOrder = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/view_order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminDashboardViewOrderDispatch(responce));
  };
};

const PostAdminDashboardTransactionDispatch = (data) => ({
  type: actionType.PostAdminDashboardTransactionDispatch_Type,
  payload: data,
});
export const PostAdminDashboardTransaction = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    // dispatch(OrderPagesLoaderTrueFalse(true))
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/transaction_data`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // dispatch(OrderPagesLoaderTrueFalse(false))
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        // dispatch(OrderPagesLoaderTrueFalse(false))
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminDashboardTransactionDispatch(responce));
  };
};

const PostAdminDashboardShippingMatrixDispatch = (data) => ({
  type: actionType.PostAdminDashboardShippingMatrixDispatch_Type,
  payload: data,
});
export const PostAdminDashboardShippingMatrix = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/shipment_metrix`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(PostAdminDashboardShippingMatrixDispatch(responce));
  };
};

const GetAdminOrderIntransitDispatch = (data) => ({
  type: actionType.GetAdminOrderIntransitDispatch_Type,
  payload: data,
});
export const GetAdminOrderIntransit = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin_panel/orders/in_transit`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        // dispatch(GetAdminOrderDelivered());

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/in_transit`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);

    dispatch(GetAdminOrderIntransitDispatch(response));
  };
};

const GetAdminOrderDeliveredDispatch = (data) => ({
  type: actionType.GetAdminOrderDeliveredDispatch_Type,
  payload: data,
});
export const GetAdminOrderDelivered = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin_panel/orders/delivered`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        // dispatch(GetAdminOrderReturn()); my commented
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    dispatch(GetAdminOrderDeliveredDispatch(response));
  };
};

const GetAdminOutForDeliveryDispatch = (data) => ({
  type: actionType.GetAdminOutForDeliveryDispatch_Type,
  payload: data,
});
export const GetAdminOutForDelivery = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/out_for_delivery_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        // dispatch(GetAdminOrderReturn());  my commented
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    dispatch(GetAdminOutForDeliveryDispatch(response));
  };
};

const GetAdminOrderPendingDispatch = (data) => ({
  type: actionType.GetAdminOrderPendingDispatch_Type,
  payload: data,
});

export const GetAdminOrderPending = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_order_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          dispatch(OrderPagesLoaderTrueFalse(false));
        }
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_order_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetAdminOrderPendingDispatch(response));
  };
};

const PostViewOrderDetailsDispatch = (data) => ({
  type: actionType.PostViewOrderDetailsDispatch_Type,
  payload: data,
});
export const PostViewOrderDetails = (payload) => {
  return async (dispatch, getState) => {
    // dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/view_order_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostViewOrderDetailsDispatch(responce));
  };
};

const GetAdminOrderReturnDispatch = (data) => ({
  type: actionType.GetAdminOrderReturnDispatch_Type,
  payload: data,
});
export const GetAdminOrderReturn = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/return_order`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // dispatch(GetAdminOrderRTODelivered());  my commented
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    dispatch(GetAdminOrderReturnDispatch(response));
  };
};

const GetAdminOrderRTODeliveredDispatch = (data) => ({
  type: actionType.GetAdminOrderRTODeliveredDispatch_Type,
  payload: data,
});
export const GetAdminOrderRTODelivered = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/admin_panel/orders/rto_details`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    dispatch(GetAdminOrderRTODeliveredDispatch(response));
  };
};

const PostAdminOrderRebookDispatch = (data) => ({
  type: actionType.GetAdminOrderRebookDispatch_Type,
  payload: data,
});
export const PostAdminOrderRebook = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/rebook_orders`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetCancelOrderDetail());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderPending());
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });

    dispatch(PostAdminOrderRebookDispatch(response));
  };
};

const PostTrackLocationDetailsDispatch = (data) => ({
  type: actionType.PostTrackLocationDetailsDispatch_Type,
  payload: data,
});
export const PostTrackLocationDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/track_location_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Upload successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostTrackLocationDetailsDispatch(responce));
  };
};
const GetAdminOrderSummaryDispatch = (data) => ({
  type: actionType.GetAdminOrderSummaryDispatch_Type,
  payload: data,
});
export const GetAdminOrderSummary = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/order_summary`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(OrderPagesLoaderTrueFalse(false));
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderSummaryDispatch(responce));
  };
};

const PostAddRemarkDispatch = (data) => ({
  type: actionType.PostAddRemarkDispatch_Type,
  payload: data,
});
export const PostAddRemark = (payload) => {
  let summarypayload={
"product_order_id":payload.order_id
  }
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/order/add_remark`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
      dispatch(GetAdminOrderSummary(summarypayload))
      dispatch(GetAdminRemarkNotification())
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAddRemarkDispatch(responce));
  };
};
const GetAdminOrderBookedDispatch = (data) => ({
  type: actionType.GetAdminOrderBookedDispatch_Type,
  payload: data,
});
export const GetAdminOrderBooked = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/booked_order`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(OrderPagesLoaderTrueFalse(false));
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/booked_order`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    //  dispatch(GetAdminOrderBooked());
    dispatch(GetAdminOrderBookedDispatch(response));
  };
};

const GetAdminOrderPickedUpDispatch = (data) => ({
  type: actionType.GetAdminOrderPickedUpDispatch_Type,
  payload: data,
});
export const GetAdminOrderPickedUp = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pickedup_order_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderPickedUpDispatch(response));
  };
};

const GetAdminOrderReadyForPickupDispatch = (data) => ({
  type: actionType.GetAdminOrderReadyForPickupDispatch_Type,
  payload: data,
});
export const GetAdminOrderReadyForPickup = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/ready_for_pickup_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // dispatch(GetAdminOrderPickedUp())
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderReadyForPickupDispatch(response));
  };
};

const GetAdminOrderReceivedAtHubDispatch = (data) => ({
  type: actionType.GetAdminOrderReceivedAtHubDispatch_Type,
  payload: data,
});
export const GetAdminOrderReceivedAtHub = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/received_at_hub_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderReceivedAtHubDispatch(response));
  };
};

// saprate data adding globaly
export const ToggleSideBar = (data) => ({
  type: actionType.ToggleSideBar_Type,
  payload: data,
});

export const PaymentPopupValue = (data) => ({
  type: actionType.PostAdminOrderAddShipmentDispatch_Type,
  payload: data,
});

export const OrderPageBookNavigate = (data) => ({
  type: actionType.OrderPageBookNavigate_Type,
  payload: data,
});

export const HeaderToggleClassAdd = (data) => ({
  type: actionType.HeaderToggleClassAdd_Type,
  payload: data,
});

export const ShipmentLoaderTrueFalse = (data) => ({
  type: actionType.ShipmentLoaderTrueFalse_Type,
  payload: data,
});

export const OrderPageBoookNavigate = (data) => ({
  type: actionType.OrderPageBoookNavigate_Type,
  payload: data,
});

export const ToggleSideBarTrueFalse = (data) => ({
  type: actionType.ToggleSideBarTrueFalse_Type,
  payload: data,
});

const PostAdminOrderFilterationDispatch = (data) => ({
  type: actionType.PostAdminOrderFilterationDispatch_Type,
  payload: data,
});

export const OrderPagesLoaderTrueFalse = (data) => ({
  type: actionType.OrderPagesLoaderTrueFalse_Type,
  payload: data,
});

export const PostAdminOrderFilteration = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/filteration`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminOrderFilterationDispatch(responce));
  };
};

const GetAdminOrderCustomerDispatch = (data) => ({
  type: actionType.GetAdminOrderCustomerDispatch_Type,
  payload: data,
});

export const GetAdminOrderCustomer = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/customer/customer_order_detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderCustomerDispatch(responce));
  };
};

const PatchAdminOrderEditDispatch = (data) => ({
  type: actionType.PatchAdminOrderEditDispatch_Type,
  payload: data,
});

export const PatchAdminOrderEdit = (payload) => {
  return async (dispatch, getState) => {
    let InvoicePayLoad = {
      product_order_id: payload?.product_order_id,
      request_type: "create",
    };

    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/edit_order_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);

        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Order Edited successfully");

        // dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchAdminOrderEditDispatch(responce));
  };
};

const GetAdminOrderCallBuyerDispatch = (data) => ({
  type: actionType.GetAdminOrderCallBuyerDispatch_Type,
  payload: data,
});
export const GetAdminOrderCallBuyer = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/call_buyer_info`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderCallBuyerDispatch(responce));
  };
};

const GetAdminOrderGenerateOrderIdDispatch = (data) => ({
  type: actionType.GetAdminOrderGenerateOrderIdDispatch_Type,
  payload: data,
});

export const GetAdminOrderGenerateOrderId = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/generate_order_id`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderGenerateOrderIdDispatch(responce));
  };
};

const GetAdminOrderPaymentOrderDispatch = (data) => ({
  type: actionType.GetAdminOrderPaymentOrderDispatch_Type,
  payload: data,
});
export const GetAdminOrderPaymentOrder = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/add_payment_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        let data = JSON.stringify({
          deliverd_id: res?.data?.deliverd_id,
          pickup_id: res?.data?.pickup_id,
          product_order_id: res?.data?.order_id,
        });
        sessionStorage.setItem("OrderDetailsId", data);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminOrderPaymentOrderDispatch(responce));
  };
};

const PostAdminOrderPaymentOrderDispatch = (data) => ({
  type: actionType.PostAdminOrderPaymentOrderDispatch_Type,
  payload: data,
});
export const PostAdminOrderPaymentOrder = (payload, ItemDetailPayloadData) => {
  return async (dispatch, getState) => {
    let OrderDetailsIdData = sessionStorage.getItem("OrderDetailsId", false);
    let OrderDetailsIdDataObject = JSON.parse(OrderDetailsIdData);

    let newPayload = [];

    if (OrderDetailsIdDataObject?.product_order_id) {
      newPayload.push({
        ...payload,
        order_id: OrderDetailsIdDataObject?.product_order_id,
      });
    } else {
      newPayload.push(payload);
    }
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/add_payment_order`,
        newPayload[0],
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message);

        let data = JSON.stringify({
          deliverd_id: res?.data?.deliverd_id,
          pickup_id: res?.data?.pickup_id,
          product_order_id: res?.data?.order_id,
        });
        sessionStorage.setItem("OrderDetailsId", data);
        let totalPriceValue = sessionStorage.getItem("totalPriceValue", false);
        if (res?.data?.order_id) {
          let ItemDetailPayload = {
            ...ItemDetailPayloadData,
            product_order_id: res?.data?.order_id,
            total_price: totalPriceValue,
          };
          dispatch(PostAdminOrderAddShipment(ItemDetailPayload));
        }

        const TagOrderData = sessionStorage.getItem("add_order_tag", false);
        const PayloadTagOrderData = JSON.parse(TagOrderData);
        if (PayloadTagOrderData?.add_order.length != 0) {
          dispatch(
            PostAddOrderTag({
              product_order_id: res?.data?.order_id,
              order_tag: PayloadTagOrderData?.add_order,
            })
          );
        }

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminOrderPaymentOrderDispatch(responce));
  };
};

const PostAdminOrderEwayBillDispatch = (data) => ({
  type: actionType.PostAdminOrderEwayBillDispatch_Type,
  payload: data,
});
export const PostAdminOrderEwayBill = (payload) => {
  return async (dispatch, getState) => {
    var fs = require("fs");
    let formdata = new FormData();
    if (payload.eway_bill) {
      formdata.append("eway_bill", payload.eway_bill);
      formdata.append("type", payload.type);
    } else {
      formdata.append("type", payload.type);
      formdata.append("id", payload.id);
    }

    let bodyContent = formdata;
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/bill/eway_bill`, bodyContent, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        sessionStorage.setItem("Eway_bill_id", res?.data?.id);

        sessionStorage.setItem("Eway_bill_URL", String(res?.data?.name));

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminOrderEwayBillDispatch(responce));
  };
};

const PostAdminOrderPaymentCalDispatch = (data) => ({
  type: actionType.PostAdminOrderPaymentCalDispatch_Type,
  payload: data,
});
export const PostAdminOrderPaymentCal = (payload) => {
  let as_bussiness = sessionStorage.getItem("Is_Business", false);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/payment_cal_shipment`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        if (
          as_bussiness == "true" &&
          err?.response?.data?.message ==
            "Zone is not provided for particular pincode"
        ) {
          toast.warn(
            "Price quotation has not been uploaded by admin,so please contact nitroxpress customer service"
          );
        } else {
          toast.warn(err?.response?.data?.message);
        }
        return err;
      });
    dispatch(PostAdminOrderPaymentCalDispatch(responce));
  };
};

const PostAdminOrderAddShipmentDispatch = (data) => ({
  type: actionType.PostAdminOrderAddShipmentDispatch_Type,
  payload: data,
});
export const PostAdminOrderAddShipment = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/add_shipmentdetails`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        sessionStorage.setItem("ShipmentId", res?.data?.shipment_id);

        // toast.success(res.dat.message);

        dispatch(PaymentPopupValue(false));
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminOrderAddShipmentDispatch(responce));
  };
};

const PostViewAdminOrderDispatch = (data) => ({
  type: actionType.PostViewAdminOrderDispatch_Type,
  payload: data,
});
export const PostViewAdminOrder = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/view_admin_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostViewAdminOrderDispatch(responce));
  };
};

const GetDeliveryPriceDetailDispatch = (data) => ({
  type: actionType.GetDeliveryPriceDetailDispatch_Type,
  payload: data,
});
export const GetDeliveryPriceDetail = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/delivery_price_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetDeliveryPriceDetailDispatch(responce));
  };
};

const GetAdminOrderCloneOrderDispatch = (data) => ({
  type: actionType.GetAdminOrderCloneOrderDispatch_Type,
  payload: data,
});
export const GetAdminOrderCloneOrder = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/clone_order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetAdminOrderCloneOrderDispatch(responce));
  };
};

const PostAdminOrderActionDispatch = (data) => ({
  type: actionType.PostAdminOrderActionDispatch_Type,
  payload: data,
});
export const PostAdminOrderAction = (payload) => {
  let data = JSON.stringify(payload);
let newdata={...payload}
  let InvoicePayLoad = {
    product_order_id: payload?.product_order_id,
    request_type: "create",
  };

  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/order_action`,
        newdata,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res.data.message);
        if(Is_delivery_boy != "true"){
          dispatch(GetWalletBalance());
        }
        // dispatch(GetWalletBalance());
        // dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        dispatch(GetAdminOrderReceivedAtHub());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderPending());
        // dispatch(GetCancelOrderDetail());
        toast.success(response?.data?.message);

        toast.success("Order Added successfully");
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));

        toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   Accept: "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   Authorization: `Bearer ${BearerToken}`,
    // };

    // let bodyContent = JSON.stringify(payload);
    // let reqOptions = {
    //   url: `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/pending_action`,
    //   method: "PATCH",
    //   headers: headersList,
    //   data: bodyContent,
    // };

    // let response = await axios.request(reqOptions);

    dispatch(PostAdminOrderActionDispatch(response));
  };
};

const DeleteAdminPendingOrderActionDispatch = (data) => ({
  type: actionType.DeleteAdminPendingOrderActionDispatch_Type,
  payload: data,
});
export const DeleteAdminPendingOrderAction = (payload) => {
  // let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/cancel_order`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderReturn());
        dispatch(GetCancelOrderDetail());
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteAdminPendingOrderActionDispatch(responce));
  };
};

const PostAdminSettingAddEmployeeDispatch = (data) => ({
  type: actionType.PostAdminSettingAddEmployeeDispatch_Type,
  payload: data,
});
export const PostAdminSettingAddEmployee = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_employee`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminSettingAddEmployeeDispatch(responce));
  };
};

const PostAdminSettingAddDeliveryboyDispatch = (data) => ({
  type: actionType.PostAdminSettingAddDeliveryboyDispatch_Type,
  payload: data,
});
export const PostAdminSettingAddDeliveryboy = (payload) => {
  var fs = require("fs");
  let formdata = new FormData();
  formdata.append("name", payload.name);
  formdata.append("phone_number", payload.phone_number);
  formdata.append("email", payload.email);
  formdata.append("password", payload.password);
  formdata.append("confirm_pass", payload.confirm_pass);
  formdata.append("from_date", payload.from_date);
  formdata.append("to_date", payload.to_date);
  payload.user_permision != null &&
    formdata.append("user_permision", payload.user_permision);
  formdata.append("category_id", payload.category_id);
  formdata.append("aadhar_card", payload.aadhar_card);
  formdata.append("driving_licence", payload.driving_licence);
  payload.cheque_book != null &&
    formdata.append("cheque_book", payload.cheque_book);
  payload.passbook != null && formdata.append("passbook", payload.passbook);
  payload.photo_one != null && formdata.append("photo_one", payload.photo_one);
  payload.photo_two != null && formdata.append("photo_two", payload.photo_two);
  let data = formdata;
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_delivery_boy`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminSettingAddDeliveryboyDispatch(responce));
  };
};
// admin_panel/setting/delivery_boy_info

const GetSettingDeliveryboyInfoDispatch = (data) => ({
  type: actionType.GetSettingDeliveryboyInfoDispatch_Type,
  payload: data,
});
export const GetSettingDeliveryboyInfo = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delivery_boy_info`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetSettingDeliveryboyInfoDispatch(response));
  };
};

// admin_panel/orders/assign_delivery_partner
const PostAssignDeliveryBoyPartnerDispatch = (data) => ({
  type: actionType.PostAssignDeliveryBoyPartnerDispatch_Type,
  payload: data,
});
export const PostAssignDeliveryBoyPartner = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/assign_delivery_partner`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);
        dispatch(GetAdminOrderPending());
        // dispatch(GetAdminOrderReadyForPickup());
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAssignDeliveryBoyPartnerDispatch(responce));
  };
};

const GetCategoryDetailsDispatch = (data) => ({
  type: actionType.GetCategoryDetailsDispatch_Type,
  payload: data,
});
export const GetCategoryDetails = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/category_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/category_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetCategoryDetailsDispatch(response));
  };
};

const GetSettingViewPermissionDispatch = (data) => ({
  type: actionType.GetSettingViewPermissionDispatch_Type,
  payload: data,
});
export const GetSettingViewPermission = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    // dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_permissions_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_permissions_details`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingViewPermissionDispatch(response));
  };
};

const GetSettingEmployeeInfoDispatch = (data) => ({
  type: actionType.GetSettingEmployeeInfoDispatch_Type,
  payload: data,
});
export const GetSettingEmployeeInfo = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/employee_info`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/employee_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingEmployeeInfoDispatch(response));
  };
};

const PostAdminSettingAddCategoryDispatch = (data) => ({
  type: actionType.PostAdminSettingAddCategoryDispatch_Type,
  payload: data,
});
export const PostAdminSettingAddCategory = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/add_categories`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetCategoryDetails());
        toast.success("Category Added successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAdminSettingAddCategoryDispatch(responce));
  };
};

const GetSettingUserInfoDispatch = (data) => ({
  type: actionType.GetSettingUserInfoDispatch_Type,
  payload: data,
});
export const GetSettingUserInfo = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const response = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/user_info`,
        payload,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/user_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetSettingUserInfoDispatch(response));
  };
};

const DeleteAdminSettingDeleteUserDispatch = (data) => ({
  type: actionType.DeleteAdminSettingDeleteUserDispatch_Type,
  payload: data,
});
export const DeleteAdminSettingDeleteUser = (payload) => {
  // let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delete_user`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(OrderPagesLoaderTrueFalse(false));
        dispatch(getOrderAddress());
        dispatch(GetSettingEmployeeInfo());
        dispatch(GetSettingDeliveryboyInfo());
        toast.success("User Deleted successfully");
        dispatch(GetSettingEmployeeInfo());
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteAdminSettingDeleteUserDispatch(responce));
  };
};

const PatchEditUserPermissionDispatch = (data) => ({
  type: actionType.PatchEditUserPermissionDispatch_Type,
  payload: data,
});

export const PatchEditUserPermission = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_user_permission`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Profile updated successfully");
        // window.location.reload(false)
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchEditUserPermissionDispatch(responce));
  };
};

// delivery boy
// admin_panel/setting/edit_delivery_boy
const PatchEditDeliveryboyDispatch = (data) => ({
  type: actionType.PatchEditDeliveryboyDispatch_Type,
  payload: data,
});

export const PatchEditDeliveryboy = (payload) => {
  var fs = require("fs");
  let formdata = new FormData();
  formdata.append("user_name", payload.user_name);
  formdata.append("phone_number", payload.phone_number);
  formdata.append("email", payload.email);
  formdata.append("user_id", payload.user_id);
  formdata.append("from_date", payload.from_date);
  formdata.append("to_date", payload.to_date);
  payload?.user_permission?.arrayPermission != null &&
    formdata.append("user_permision", payload.user_permission?.arrayPermission);
  payload?.delete_permission?.arrayRemovePermission != null &&
    formdata.append(
      "delete_permission",
      payload?.delete_permission?.arrayRemovePermission
    );
  formdata.append("category_id", payload.category_id);
  payload.aadhar_card != null &&
    formdata.append("aadhar_card", payload.aadhar_card);
  payload.driving_licence != null &&
    formdata.append("driving_licence", payload.driving_licence);
  payload.cheque_book != null &&
    formdata.append("cheque_book", payload.cheque_book);
  payload.passbook != null && formdata.append("passbook", payload.passbook);
  payload.photo_one != null && formdata.append("photo_one", payload.photo_one);
  payload.photo_two != null && formdata.append("photo_two", payload.photo_two);

  let data = formdata;

  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_delivery_boy`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Profile updated successfully");
        dispatch(GetSettingDeliveryboyInfo());
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchEditDeliveryboyDispatch(responce));
  };
};

const GetSettingViewB2bFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2bFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2bFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2b_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetSettingViewB2bFeedbackDispatch(responce));
  };
};

const GetSettingViewB2bCloseFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2bCloseFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2bCloseFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2b_closed_ticket`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetSettingViewB2bCloseFeedbackDispatch(responce));
  };
};

const GetSettingViewB2cFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2cFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2cFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2c_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetSettingViewB2cFeedbackDispatch(responce));
  };
};

const GetSettingViewB2cCloseFeedbackDispatch = (data) => ({
  type: actionType.GetSettingViewB2cCloseFeedbackDispatch_Type,
  payload: data,
});
export const GetSettingViewB2cCloseFeedback = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/view_b2c_closed_feedback`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetSettingViewB2cCloseFeedbackDispatch(responce));
  };
};

const DeleteSettingDismissTicketDispatch = (data) => ({
  type: actionType.DeleteSettingDismissTicketDispatch_Type,
  payload: data,
});
export const DeleteSettingDismissTicket = (payload) => {
  // let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/dismiss_ticket`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetSettingViewB2bFeedback());
        dispatch(GetSettingViewB2cFeedback());
        toast.success("Ticket Dismissed successfully");
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(DeleteSettingDismissTicketDispatch(responce));
  };
};

const PatchEditCategoryDetailsDispatch = (data) => ({
  type: actionType.PatchEditCategoryDetailsDispatch_Type,
  payload: data,
});

export const PatchEditCategoryDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_categories`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(GetCategoryDetails());
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchEditCategoryDetailsDispatch(responce));
  };
};

const DeleteCategoryDetailsDispatch = (data) => ({
  type: actionType.DeleteCategoryDetailsDispatch_Type,
  payload: data,
});
export const DeleteCategoryDetails = (payload) => {
  // let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delete_category`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(GetCategoryDetails());
        // toast.success("Category deleted successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteCategoryDetailsDispatch(responce));
  };
};

const GetAdminProfileDispatch = (data) => ({
  type: actionType.GetAdminProfileDispatch_Type,
  payload: data,
});
export const GetAdminProfile = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/viewprofile`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/viewprofile`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetAdminProfileDispatch(response));
  };
};

const PatchEditProfileDispatch = (data) => ({
  type: actionType.PatchEditProfileDispatch_Type,
  payload: data,
});

export const PatchEditProfile = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/resetpassword`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success("Profile updated successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchEditProfileDispatch(responce));
  };
};

// const PatchAdminEditProfileDispatch = (data) => ({
//   type: actionType.PatchAdminEditProfileDispatch_Type,
//   payload: data,
// });

// export const PatchAdminEditProfile = (payload) => {
//   return async (dispatch, getState) => {
//     const responce = await axios
//       .patch(
//         `${process.env.REACT_APP_BASE_URL}/editprofile`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${BearerToken}`,
//           },
//         }
//       )
//       .then((res) => {
//         toast.success("Profile updated successfully");

//         return res;
//       })
//       .catch((err) => {
//         toast.warn(err.response.data.message);
//         return err;
//       });
//     dispatch(PatchAdminEditProfileDispatch(responce));
//   };
// };
const PostAdminOrderCsvFileDispatch = (data) => ({
  type: actionType.PostAdminOrderCsvFileDispatch_Type,
  payload: data,
});
export const PostAdminOrderCsvFile = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/bill/csv`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(PostAdminOrderCsvFileDispatch(responce));
  };
};

const GetAdminCloneOrderDispatch = (data) => ({
  type: actionType.GetAdminCloneOrderDispatch_Type,
  payload: data,
});
export const GetAdminCloneOrder = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/clone_order`,
        data,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetAdminCloneOrderDispatch(responce));
  };
};

const PostOrderDownloadInvoiceFileDispatch = (data) => ({
  type: actionType.PostOrderDownloadInvoiceFileDispatch_Type,
  payload: data,
});
export const PostOrderDownloadInvoiceFile = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    // dispatch(OrderPagesLoaderTrueFalse(true))
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/invoice`,
        payload,

        {
          // responseType: "arraybuffer",
          // responseEncoding: "binary",

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // dispatch(OrderPagesLoaderTrueFalse(false))

        window.open(`${res?.data?.name}`);
        // toast.success("Invoice Generated successfully");
        return res;
      })
      .catch((err) => {
        // dispatch(OrderPagesLoaderTrueFalse(false))
        toast.error(err.response.data.message);
        return err;
      });
    dispatch(PostOrderDownloadInvoiceFileDispatch(responce));
  };
};

const GetOrderDownloadInvoiceDispatch = (data) => ({
  type: actionType.GetOrderDownloadInvoiceDispatch_Type,
  payload: data,
});
export const GetOrderDownloadInvoice = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/bill/invoice`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetOrderDownloadInvoiceDispatch(responce));
  };
};

// label-generation
const PostOrderDownloadLabelGenerationFileDispatch = (data) => ({
  type: actionType.PostOrderDownloadLabelGenerationFileDispatch_Type,
  payload: data,
});
export const PostOrderDownloadLabelGenerationFile = (payload) => {
  let data = JSON.stringify(payload);

  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/label`,
        payload,

        {
          // responseType: "arraybuffer",
          // responseEncoding: "binary",

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        // window.open(`${res?.data?.name}`)

        if (res.status == 200) {
          dispatch(OrderPagesLoaderTrueFalse(false));
          if (payload.request_type !== "create") {
            window.open(`${res?.data?.name}`);
            // window.location.reload(false)
            // fileDownload(res?.data?.name, `https`);
          }
        }

        // toast.success("Invoice Generated successfully");
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.warn(err.response.data.message);
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostOrderDownloadLabelGenerationFileDispatch(responce));
  };
};

const GetOrderDownloadLabelGenerationDispatch = (data) => ({
  type: actionType.GetOrderDownloadLabelGenerationDispatch_Type,
  payload: data,
});
export const GetOrderDownloadLabelGeneration = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/bill/invoice`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetOrderDownloadLabelGenerationDispatch(responce));
  };
};

const DeleteAdminOrderDispatch = (data) => ({
  type: actionType.DeleteAdminOrderDispatch_Type,
  payload: data,
});
export const DeleteAdminOrder = (payload) => {
  // let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/cancel_order`,
        {
          data: payload,

          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderReturn());
        dispatch(GetAdminOrderBooked());
        dispatch(GetCancelOrderDetail());
        toast.success(
          "Order deleted successfully and refund will be initiated"
        );
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteAdminOrderDispatch(responce));
  };
};

const PatchEditEmployeeDispatch = (data) => ({
  type: actionType.PatchEditEmployeeDispatch_Type,
  payload: data,
});

export const PatchEditEmployee = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/edit_employee_permission`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Profile updated successfully");
        dispatch(GetSettingEmployeeInfo());
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchEditEmployeeDispatch(responce));
  };
};

const GetBillingInvoiceDetailDispatch = (data) => ({
  type: actionType.GetBillingInvoiceDetailDispatch_Type,
  payload: data,
});
export const GetBillingInvoiceDetail = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/invoice_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetBillingInvoiceDetailDispatch(responce));
  };
};

const GetBillingAmountCountDispatch = (data) => ({
  type: actionType.GetBillingAmountCountDispatch_Type,
  payload: data,
});
export const GetBillingAmountCount = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/invoice_amount_count`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetBillingAmountCountDispatch(responce));
  };
};

const GetDashboardNotificationDispatch = (data) => ({
  type: actionType.GetDashboardNotificationDispatch_Type,
  payload: data,
});
export const GetDashboardNotification = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    let CompanyDetails = sessionStorage.getItem("UserDetailsPayload", false);
    let OrderComapnyData = JSON.parse(CompanyDetails);
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notification`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        if (OrderComapnyData?.company_name == "false") {
          // dispatch(GetWalletBalance());
        }

        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notification`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetDashboardNotificationDispatch(response));
  };
};
const PostClearNotificationDispatch = (data) => ({
  type: actionType.PostClearNotificationDispatch_Type,
  payload: data,
});
export const PostClearNotification = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/notify_true`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.warn(res.data.message);
        dispatch(GetUserNotification());
        dispatch(GetDashboardNotification());
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostClearNotificationDispatch(responce));
  };
};

const GetDeliveryBoyNotificationDispatch = (data) => ({
  type: actionType.GetDeliveryBoyNotificationDispatch_Type,
  payload: data,
});
export const GetDeliveryBoyNotification = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/delivery_boy_notification`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetDeliveryBoyNotificationDispatch(response));
  };
};

//  notification
const PostDeliveryBoyNotificationDispatch = (data) => ({
  type: actionType.PostDeliveryBoyNotificationDispatch_Type,
  payload: data,
});
export const PostDeliveryBoyNotification = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/delivery_boy_refresh_notify`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(GetDeliveryBoyNotification());
        return res;
      })
      .catch((err) => {
        // toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostDeliveryBoyNotificationDispatch(responce));
  };
};

// remark api
const GetAdminRemarkNotificationDispatch = (data) => ({
  type: actionType.GetAdminRemarkNotificationDispatch_Type,
  payload: data,
});
export const GetAdminRemarkNotification = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/get_remark_with_notification`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAdminRemarkNotificationDispatch(response));
  };
};

const PostRemarkNotificationDispatch = (data) => ({
  type: actionType.PostRemarkNotificationDispatch_Type,
  payload: data,
});
export const PostRemarkNotification = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/refresh_notifications`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(GetAdminRemarkNotification());
        return res;
      })
      .catch((err) => {
        // toast.warn(err?.response?.data?.message);+
        return err;
      });
    dispatch(PostRemarkNotificationDispatch(responce));
  };
};

const PostAddOrderTagDispatch = (data) => ({
  type: actionType.PostAddOrderTagDispatch_Type,
  payload: data,
});
export const PostAddOrderTag = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/add_order_tag`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // dispatch(PostTicketDetail(payload))
        // toast.success(res.data.message);
        // if (res.status == 200) {
        //   dispatch(GetOrderDownloadInvoice(payload));
        // }
        // toast.success("Add Tag successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostAddOrderTagDispatch(responce));
  };
};

const PostUploadFileDispatch = (data) => ({
  type: actionType.PostUploadFileDispatch_Type,
  payload: data,
});
export const PostUploadFile = (payload) => {
  // let data = JSON.stringify(payload);
  const formData = new FormData();
  formData.append("file", payload);
  // bill/UploadPincodeFile

  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadOrderFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(GetAdminOrderPending());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderReturn());
        return res;
      })
      .catch((err) => {
        let errorData = `${err.response.data.errors[0].order_id} ${err.response.data.errors[0].error_msg}`;
        toast.warn(errorData);
        toast.warn(err?.response?.data?.message);

        // toast.success(err.data.message);
        return err;
      });
    dispatch(PostUploadFileDispatch(responce));
  };
};

const PostCompanyFileDispatch = (data) => ({
  type: actionType.PostCompanyFileDispatch_Type,
  payload: data,
});
export const PostCompanyFile = (payload) => {
  // let data = JSON.stringify(payload);

  // bill/UploadPincodeFile

  return async (dispatch, getState) => {
    var fs = require("fs");
    let formdata = new FormData();
    formdata.append("email", payload?.email);
    formdata.append("company_id", payload?.company_id);
    formdata.append("gstin_number", payload?.gstin_number);
    formdata.append("registration_pdf", payload?.registration_pdf);
    formdata.append("gstin_pdf", payload?.gstin_pdf);
    formdata.append("pan_card", payload?.pan_card);
    formdata.append("aadhar_card", payload?.aadhar_card);

    let bodyContent = formdata;

    let reqOptions = {
      url: `${process.env.REACT_APP_BASE_URL}/company_info`,
      method: "POST",

      data: bodyContent,
    };

    let response = await axios?.request(reqOptions);
    toast.success("Documents Uploaded Successfuly");
    dispatch(PostCompanyFileDispatch(response));
  };
};

export const PostPincodeUploadFileDispatch = (data) => ({
  type: actionType.PostPincodeUploadFileDispatch_Type,
  payload: data,
});

export const PostPincodeUploadFile = (payload) => {
  // let data = JSON.stringify(payload);
  var fs = require("fs");
  const formData = new FormData();
  formData.append("file", payload);
  // bill/PincodeUploadPincodeFile

  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadPincodeFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        if (res?.data?.message == "Missing details") {
          toast.warn(res.data.message);
        } else {
          toast.success(res?.data?.message);
        }
        // toast.success(res.data.message);

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        // toast.warn(err?.response?.data?.error[0]?.error_msg);

        return err;
      });
    dispatch(PostPincodeUploadFileDispatch(responce));
  };
};

const PostDashboardRevenueDispatch = (data) => ({
  type: actionType.PostDashboardRevenueDispatch_Type,
  payload: data,
});
export const PostDashboardRevenue = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/revenue`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success("Upload successfully");
        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostDashboardRevenueDispatch(responce));
  };
};

const PostDashboardViewOrderDispatch = (data) => ({
  type: actionType.PostDashboardViewOrderDispatch_Type,
  payload: data,
});
export const PostDashboardViewOrder = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/dashboard/view_order`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        // toast.success("Upload successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostDashboardViewOrderDispatch(responce));
  };
};

const GetCodRemittanceDispatch = (data) => ({
  type: actionType.GetCodRemittanceDispatch_Type,
  payload: data,
});
export const GetCodRemittance = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_details`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetCodRemittanceDispatch(responce));
  };
};

const GetCodRemittanceBillingAmountDispatch = (data) => ({
  type: actionType.GetCodRemittanceBillingAmountDispatch_Type,
  payload: data,
});
export const GetCodRemittanceBillingAmount = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_count`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetCodRemittanceBillingAmountDispatch(responce));
  };
};

const GetB2bCompanyInfoDispatch = (data) => ({
  type: actionType.GetB2bCompanyInfoDispatch_Type,
  payload: data,
});
export const GetB2bCompanyInfo = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/companyInfo`,

        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });

    // let headersList = {
    //   "Accept": "*/*",
    //   "User-Agent": "Thunder Client (https://www.thunderclient.com)",
    //   "Authorization": `Bearer ${BearerToken}`
    //  }

    //  let reqOptions = {
    //    url: `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/b2b_company_info`,
    //    method: "POST",
    //    headers: headersList,
    //  }

    //  let response = await axios.request(reqOptions);
    dispatch(GetB2bCompanyInfoDispatch(response));
  };
};

const PostUploadBillRemittanceFileDispatch = (data) => ({
  type: actionType.PostUploadBillRemittanceFileDispatch_Type,
  payload: data,
});
export const PostUploadBillRemittanceFile = (payload) => {
  return async (dispatch, getState) => {
    const formData = new FormData();
    formData.append("file", payload);
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadRemittanceFile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Upload successfully");

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostUploadBillRemittanceFileDispatch(responce));
  };
};
const PostUploadTariffFileDispatch = (data) => ({
  type: actionType.PostUploadTariffFileDispatch_Type,
  payload: data,
});
export const PostUploadTariffFile = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const formData = new FormData();
    if (payload.type == "b2b") {
      formData.append("price_file", payload.price_file);
      formData.append("user_id", payload.user_id);
    } else {
      formData.append("price_file", payload.price_file);
    }

    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadTariffData`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Upload successfully");
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostUploadTariffFileDispatch(responce));
  };
};

const PostUploadInsuranceFileDispatch = (data) => ({
  type: actionType.PostUploadInsuranceFileDispatch_Type,
  payload: data,
});
export const PostUploadInsuranceFile = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const formData = new FormData();
    if (payload.type == "b2b") {
      formData.append("price_file", payload.price_file);
      formData.append("user_id", payload.user_id);
    } else {
      formData.append("price_file", payload.price_file);
    }

    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadInsuranceData`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Upload successfully");
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostUploadInsuranceFileDispatch(responce));
  };
};

const PostUploadPackagingFileDispatch = (data) => ({
  type: actionType.PostUploadPackagingFileDispatch_Type,
  payload: data,
});
export const PostUploadPackagingFile = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const formData = new FormData();
    if (payload.type == "b2b") {
      formData.append("price_file", payload.price_file);
      formData.append("user_id", payload.user_id);
    } else {
      formData.append("price_file", payload.price_file);
    }

    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/bill/UploadPackagingData`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Upload successfully");
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostUploadPackagingFileDispatch(responce));
  };
};
const GetWalletHistoryDispatch = (data) => ({
  type: actionType.GetWalletHistoryDispatch_Type,
  payload: data,
});
export const GetWalletHistory = (payload) => {
  return async (dispatch, getState) => {
    let headersList = {
      Accept: "*/*",
      Authorization: `Bearer ${BearerToken}`,
    };

    let reqOptions = {
      url: `${process.env.REACT_APP_BASE_URL}/wallet/history`,
      method: "get",
      headers: headersList,
    };

    const responce = await axios.request(reqOptions);

    //  await axios
    //   .get(
    //     `${process.env.REACT_APP_BASE_URL}/wallet/history`,

    //       {headers: {
    //         Authorization: `Bearer ${BearerToken}`,
    //       },}

    //   )
    //   .then((res) => {

    //     return res;
    //   })
    //   .catch((err) => {
    //     return err;
    //   });
    dispatch(GetWalletHistoryDispatch(responce));
  };
};

const GetWalletBalanceDispatch = (data) => ({
  type: actionType.GetWalletBalanceDispatch_Type,
  payload: data,
});
export const GetWalletBalance = (payload) => {
  return async (dispatch, getState) => {
    let companyname = sessionStorage.getItem("UserDetailsPayload", false);

    // dispatch(OrderPagesLoaderTrueFalse(true));
    //     let headersList = {
    //       Accept: "*/*",
    //       Authorization: `Bearer ${BearerToken}`,
    //     };

    //     let reqOptions = {
    //       url: `${process.env.REACT_APP_BASE_URL}/wallet/balance`,
    //       method: "POST",
    //       headers: headersList,
    //     };

    //     const response = await axios.request(reqOptions);
    //     if (response.status == 200) {
    //       dispatch(GetWalletHistory());
    //     }
    const response = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/wallet/balance`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        if (res.status == 200) {
          // dispatch(OrderPagesLoaderTrueFalse(false));
          if(Is_delivery_boy!="true" || isEmployeData !== "true"){
            dispatch(GetWalletHistory());
          }
          
        }
        // if (res.status == 200) {
        //   dispatch(GetWalletHistory());
        //   dispatch(OrderPagesLoaderTrueFalse(false));
        //   // dispatch(GetAdminOrderPending());  my commented
        // }
        return res;
      })
      .catch((err) => {
        // dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetWalletBalanceDispatch(response));
  };
};

const PostWalletAddMoneyDispatch = (data) => ({
  type: actionType.PostWalletAddMoneyDispatch_Type,
  payload: data,
});
export const PostWalletAddMoney = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/wallet/add_money`, data, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(GetAdminOrderPending());
        // toast.success("Order Added successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostWalletAddMoneyDispatch(responce));
  };
};

const PostDebitBalanceDispatch = (data) => ({
  type: actionType.PostDebitBalanceDispatch_Type,
  payload: data,
});
export const PostDebitBalance = (payload) => {
  return async (dispatch, getState) => {
    let orderIdData = payload?.order_id?.toString();
    let InvoicePayLoad = {
      product_order_id: orderIdData,
      request_type: "create",
    };
    let Labelpayload = {
      product_order_id: orderIdData,
      request_type: "create",
    };
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/wallet/debit_balance`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success("Order Placed Successfully");
        sessionStorage.removeItem("UserDetailsPayload");
        sessionStorage.removeItem("Eway_bill_URL");
        sessionStorage.removeItem("PayloadOrderData");
        sessionStorage.removeItem("Eway_bill_id");
        sessionStorage.removeItem("OrderDetailsId");
        sessionStorage.removeItem("add_order_tag");

        if(Is_delivery_boy != "true"){
          dispatch(GetWalletBalance());
         }
        
        // dispatch(PostOrderDownloadInvoiceFile(InvoicePayLoad));
        // dispatch(PostOrderDownloadLabelGenerationFile(Labelpayload))
        dispatch(GetCancelOrderDetail());
        dispatch(GetCancelOrderDetail());

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostDebitBalanceDispatch(responce));
  };
};

const PostTrackingOrderDetailsDispatch = (data) => ({
  type: actionType.PostTrackingOrderDetailsDispatch_Type,
  payload: data,
});
export const PostTrackingOrderDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tracking/order_details`,
        payload
        // {
        //   headers: {
        //     Authorization: `Bearer ${BearerToken}`,
        //   },
        // }
      )
      .then((res) => {
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostTrackingOrderDetailsDispatch(responce));
  };
};

const PostBillingCodRemittanceCountDispatch = (data) => ({
  type: actionType.PostBillingCodRemittanceCountDispatch_Type,
  payload: data,
});
export const PostBillingCodRemittanceCount = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_count`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        toast.warn(res.data.message);

        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostBillingCodRemittanceCountDispatch(responce));
  };
};

const PostBillingCodRemittanceDetailsDispatch = (data) => ({
  type: actionType.PostBillingCodRemittanceDetailsDispatch_Type,
  payload: data,
});
export const PostBillingCodRemittanceDetails = (payload) => {
  let data = JSON.stringify(payload);
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/billing/cod_remittance_details`,
        data,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        // toast.success(res.data.message);
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostBillingCodRemittanceDetailsDispatch(responce));
  };
};

const PostCreateTicketDispatch = (data) => ({
  type: actionType.PostCreateTicketDispatch_Type,
  payload: data,
});
export const PostCreateTicket = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/create_ticket`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Issue Raised Successfully");
        let payload = {
          user_type: res.data.user_type,
          ticket_type: res.data.ticket_type,
        };
        dispatch(PostTicketDetail(payload));
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostCreateTicketDispatch(responce));
  };
};

const PostTicketDetailDispatch = (data) => ({
  type: actionType.PostTicketDetailDispatch_Type,
  payload: data,
});
export const PostTicketDetail = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/ticket_detail`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(res?.data?.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostTicketDetailDispatch(responce));
  };
};

const DeleteSupportTicketData = (data) => ({
  type: actionType.DeleteSupportTicketDispatch_Type,
  payload: data,
});

export const DeleteSupportTicket = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/delete_ticket`,
        {
          data: payload,
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success("Ticket Deleted successfully");
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(DeleteSupportTicketData(response));
  };
};

const PostCreateFeedbackDispatch = (data) => ({
  type: actionType.PostCreateFeedbackDispatch_Type,
  payload: data,
});
export const PostCreateFeedback = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/order/feedback`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostCreateFeedbackDispatch(responce));
  };
};

const PatchTrackData = (data) => ({
  type: actionType.PatchTrackDetailsDispatch_Type,
  payload: data,
});

export const PatchTrackDetails = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .patch(
        `${process.env.REACT_APP_BASE_URL}/tracking/update_order`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success("Updated Status Successfully");
        dispatch(GetAdminOrderPickedUp());
        dispatch(GetAdminOrderReadyForPickup());
        dispatch(GetAdminOrderReceivedAtHub());
        dispatch(GetAdminOrderBooked());
        dispatch(GetAdminOrderIntransit());
        dispatch(GetAdminOrderDelivered());
        dispatch(GetAdminOrderReturn());
        dispatch(GetAdminOrderRTODelivered());
        dispatch(GetAdminOutForDelivery());
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchTrackData(responce));
  };
};

const GetCustomerOrderDetailDispatch = (data) => ({
  type: actionType.GetCustomerOrderDetailDispatch_Type,
  payload: data,
});

export const GetCustomerOrderDetail = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/customer/customer_order_detail`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetCustomerOrderDetailDispatch(response));
  };
};

const PostRaiseContactUSDispatch = (data) => ({
  type: actionType.PostRaiseContactUSDispatch_Type,
  payload: data,
});
export const PostRaiseContactUS = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/shipping/contanct_us`,
        payload
        //  {
        //   headers: {
        //     Authorization: `Bearer ${BearerToken}`,
        //   },
        // }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res.data.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostRaiseContactUSDispatch(responce));
  };
};

const PostOrderTrackDispatch = (data) => ({
  type: actionType.PostOrderTrackDispatch_Type,
  payload: data,
});
export const PostOrderTrack = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/tracking/track_order`, payload, {
        // headers: {
        //   Authorization: `Bearer ${BearerToken}`,
        // },
      })
      .then((res) => {
        if (res?.data?.current_status == "PENDING") {
          toast.warn("This Order Id Can't Track Because It Is In Pending");
        } else {
          toast.warn(res?.data?.message);
        }

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostOrderTrackDispatch(responce));
  };
};

const PostGetFeedbackDispatch = (data) => ({
  type: actionType.PostGetFeedbackDispatch_Type,
  payload: data,
});
export const PostGetFeedback = (payload) => {
  return async (dispatch, getState) => {
    // dispatch(OrderPagesLoaderTrueFalse(true))
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/order/response_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.warn(res.data.message);
        // dispatch(OrderPagesLoaderTrueFalse(false))
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        // dispatch(OrderPagesLoaderTrueFalse(false))
        return err;
      });
    dispatch(PostGetFeedbackDispatch(responce));
  };
};

const PostKYCdetailDispatch = (data) => ({
  type: actionType.PostKYCdetailDispatch_Type,
  payload: data,
});
export const PostKYCdetail = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/kyc_details`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.warn(res?.data?.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostKYCdetailDispatch(responce));
  };
};

const GetUserNotificationDispatch = (data) => ({
  type: actionType.GetUserNotificationDispatch_Type,
  payload: data,
});
export const GetUserNotification = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/dashboard/user_notify`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.warn(res?.data?.message);

        return res;
      })
      .catch((err) => {
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetUserNotificationDispatch(responce));
  };
};

const GetAuthDetailsDispatch = (data) => ({
  type: actionType.GetAuthDetailsDispatch_Type,
  payload: data,
});

export const GetAuthDetails = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(`${process.env.REACT_APP_BASE_URL}/getAuthDetails`, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        toast.warn(res?.data?.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetAuthDetailsDispatch(responce));
  };
};

const GetPermissionDispatch = (data) => ({
  type: actionType.GetPermissionDispatch_Type,
  payload: data,
});
export const GetPermission = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/setting/get_permission`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.warn(res?.data?.message);
        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetPermissionDispatch(responce));
  };
};

const GetGoogleCityStateDispatch = (data) => ({
  type: actionType.GetGoogleCityStateDispatch_Type,
  payload: data,
});
export const GetGoogleCityState = (payload) => {
  return async (dispatch, getState) => {
    const response = await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${payload}&key=${process.env.REACT_APP_BASE_GOOGLE_API_KEY}`
      )
      .then((res) => {
        return res?.data?.results;
      })
      .catch((err) => {
        // toast.warn(err.response.data.message);
        return err;
      });
    dispatch(GetGoogleCityStateDispatch(response));
  };
};

const PostTransactionHistoryDispatch = (data) => ({
  type: actionType.PostTransactionHistoryDispatch_Type,
  payload: data,
});
export const PostTransactionHistory = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/user/transaction_history   `,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.warn(res?.data?.message);

        return res;
      })
      .catch((err) => {
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PostTransactionHistoryDispatch(responce));
  };
};

const GetCancelOrderDetailDispatch = (data) => ({
  type: actionType.GetCancelOrderDetailDispatch_Type,
  payload: data,
});
export const GetCancelOrderDetail = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .get(
        `${process.env.REACT_APP_BASE_URL}/admin_panel/orders/cancelled_order_details`,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(res?.data?.message);
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        err?.response?.status != 403 &&
          toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(GetCancelOrderDetailDispatch(responce));
  };
};

const PostTrackingOtpDispatch = (data) => ({
  type: actionType.PostTrackingOtpDispatch_Type,
  payload: data,
});
export const PostTrackingOtp = (payload) => {
  return async (dispatch, getState) => {
    const responce = await axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/tracking/otp_delivered`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${BearerToken}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message);

        return res;
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostTrackingOtpDispatch(responce));
  };
};

const PostQrDetailsDispatch = (data) => ({
  type: actionType.PostQrDetailsDispatch_Type,
  payload: data,
});
export const PostQrDetails = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/qr/qr_details`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostQrDetailsDispatch(responce));
  };
};

const PostPaymentApprovalDispatch = (data) => ({
  type: actionType.PostPaymentApprovalDispatch_Type,
  payload: data,
});
export const PostPaymentApproval = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/qr/qr_chat`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostPaymentApprovalDispatch(responce));
  };
};

const PostPaymentChatDispatch = (data) => ({
  type: actionType.PostPaymentChatDispatch_Type,
  payload: data,
});
export const PostPaymentChat = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .post(`${process.env.REACT_APP_BASE_URL}/qr/qr_commets`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostPaymentChatDispatch(responce));
  };
};

const PatchPaymentApprovalActionDispatch = (data) => ({
  type: actionType.PatchPaymentApprovalActionDispatch_Type,
  payload: data,
});

export const PatchPaymentApprovalAction = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/qr/close_chat`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);
        // dispatch(GetSettingEmployeeInfo());
        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.warn(err?.response?.data?.message);
        return err;
      });
    dispatch(PatchPaymentApprovalActionDispatch(responce));
  };
};

const PostPaymentAddAmountDispatch = (data) => ({
  type: actionType.PostPaymentAddAmountDispatch_Type,
  payload: data,
});
export const PostPaymentAddAmount = (payload) => {
  return async (dispatch, getState) => {
    dispatch(OrderPagesLoaderTrueFalse(true));
    const responce = await axios
      .patch(`${process.env.REACT_APP_BASE_URL}/add_amount`, payload, {
        headers: {
          Authorization: `Bearer ${BearerToken}`,
        },
      })
      .then((res) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.success(res?.data?.message);

        return res;
      })
      .catch((err) => {
        dispatch(OrderPagesLoaderTrueFalse(false));
        toast.error(err?.response?.data?.message);
        return err;
      });
    dispatch(PostPaymentAddAmountDispatch(responce));
  };
};

// export  const FunctionVariableNameCanBeAnyThing=(products)=>{
//     return{
//         type:actionType.THIS_NAME_CAN_BE_ANY_THINKG,
//         payload:products
//     }
// }

// })
// var config = {
//     method: `get`,
//     // url: `${process.env.REACT_APP_BASE_URL}/viewprofile`,
//     url: `${process.env.REACT_APP_BASE_URL}/address/saved_address`,
//     // headers: {
//     //     authorization: `Bearer  ${BearerToken}`
//     // }
//     headers: {
//         authorization: `Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYyMzg5NDQ0LCJqdGkiOiIzN2UwOGRiZDVkMTk0ZGQyYTJhYjAxNjk1NWRlMWE0YSIsInVzZXJfaWQiOjQ1fQ.IWYw--n1F9Hv3qet_rwAOjHjvv864ZDXk9cy5pVS9Wg`
//     }
// };
// const responce = await axios(config)
//     .then((res) => {
//         return res.data

//     })
//     .catch((err) => {
//         return
