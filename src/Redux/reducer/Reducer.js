import { actionType } from "../type/types";

const stateData = {
  userDetails: [], //initial state
  orderDetails: [],
  patchUserDetails: [],
  ResetPasswordPatchData: "",
  PostPincodesAvailabilityData: "",
  PostPincodesDeliveredData: "",
  PostShipmentDetailsData: "",
  PostDeliveryAddressData: "",
  PostPickupAddressData: "",
  PatchPickupAddressData: "",
  GetShipmentDetailsData: [],
  DeleteUserAddressData: "",
  GetAdminDashboardViewOrderData: [],
  PostAdminDashboardTransactionData: [],
  PostAdminDashboardShippingMatrixData: [],
  PostAdminOrderCsvFileData:[],
  GetAdminOrderIntransitData: [],
  GetAdminOrderDeliveredData: [],
  GetAdminOutForDeliveryData: [],
  GetAdminOrderPendingData: [],
  PostViewOrderDetailsData: [],
  GetAdminOrderCustomerData: [],
  GetAdminOrderEditData: [],
  GetAdminOrderReturnData: [],
  GetAdminOrderRTODeliveredData: [],
  GetAdminOrderRebookData: [],
  PostTrackLocationDetailsData:[],
  GetAdminOrderSummaryData: [],
  PostAddRemarkData: [],
  GetAdminOrderBookedData: [],
  GetAdminOrderPickedUpData: [],
  GetAdminOrderReadyForPickupData: [],
  GetAdminOrderReceivedAtHubData: [],
  PostAdminOrderFilterationData: [],
  ToggleSideBarData: false,
  PaymentPopupValueData: false,
  OrderPageBookNavigateData: false,
  OrderPageBoookNavigateData: false,
  GetAdminOrderCallBuyerData: [],
  GetAdminOrderGenerateOrderIdData: [],
  GetAdminOrderPaymentOrderData: [],
  PostAdminOrderPaymentOrderData: [],
  PostAdminOrderEwayBillData: [],
  PostAdminOrderPaymentCalReducerData: [],
  PostAdminOrderAddShipmentData: [],
  PostViewAdminOrderData: [],
  GetDeliveryPriceDetailData: [],
  GetDeliveryPriceDetailReducerData: [],
  PostAdminOrderActionData: [],
  DeleteAdminPendingOrderActionData: [],
  PostAdminSettingAddDeliveryboyData: [],
  PostAssignDeliveryBoyPartnerData:[],
  PostAdminSettingAddData: [],
  GetCategoryDetailsData: [],
  GetSettingViewPermissionData: [],
  GetSettingEmployeeInfoData: [],
  PostAdminSettingAddCategoryData: [],
  GetSettingUserInfoData: [],
  DeleteAdminSettingDeleteUserData: [],
  PatchEditUserPermissionData: [],
  GetSettingViewB2bFeedback: [],
  GetSettingViewB2bCloseFeedback: [],
  GetSettingViewB2cFeedback: [],
  GetSettingViewB2cCloseFeedback: [],
  DeleteSettingDismissTicket: [],
  PatchEditCategoryDetailsData: [],
  DeleteCategoryDetails: [],
  GetAdminProfile: [],
  PatchEditProfile: [],
  PostAdminOrderCsvFile: [],
  GetAdminCloneOrder: [],
  GetAdminCloneOrderData: [],
  PostOrderDownloadInvoiceFileData: [],
  GetOrderDownloadInvoiceData: [],
  PostOrderDownloadLabelGenerationFileData: [],
  GetOrderDownloadLabelGenerationData: [],
  DeleteAdminOrderData: [],
  PatchEditEmployeeData: [],
  PatchEditDeliveryboyData: [],
  GetBillingInvoiceDetailData: [],
  GetBillingAmountCountData: [],
  GetDashboardNotificationData: [],
  PostDeliveryBoyNotificationData:[],
  GetDeliveryBoyNotificationData:[],
  GetAdminRemarkNotificationData:[],
  PostRemarkNotificationData:[],
  PostAddOrderTagData: [],
  PostUploadFileData: [],
  PostDashboardRevenueData: [],
  PostDashboardViewOrderData: [],
  GetCodRemittanceData: [],
  GetCodRemittanceBillingAmountData: [],
  GetB2bCompanyInfoData: [],
  PostUploadBillRemittanceFileData: [],
  PostUploadTariffFileData: [],
  PostUploadInsuranceFileData: [],
  PostUploadPackagingFileData: [],
  GetWalletHistoryData: [],
  GetWalletBalanceData: [],
  PostWalletAddMoneyData: [],
  PostPincodeUploadFileData: [],
  PostDebitBalanceData: [],
  PostTrackingOrderDetails: [],
  PostCreateTicketData: [],
  PostTicketDetailData: [],
  DeleteSupportTicketData: [],
  PostTrackingOrderDetails: "",
  PostBillingCodRemittanceCountData: [],
  PostBillingCodRemittanceDetailsData: [],
  HeaderToggleClassAddData: "",
  PostCreateFeedbackData: [],
  PatchTrackDetailsData: [],
  GetCustomerOrderDetailData: [],
  PostRaiseContactUSData: [],
  PostOrderTrackData: [],
  PostCompanyFileData: [],
  PostGetFeedbackData: [],
  PostKYCdetailData: [],
  PostClearNotificationData: [],
  ShipmentLoaderTrueFalseData: true,
  GetUserNotificationData: [],
  ToggleSideBarTrueFalseData: true,
  GetAuthDetailsData: [],
  GetPermissionData: [],
  GetGoogleCityStateData: [],
  PostTransactionHistoryData: [],
  GetCancelOrderDetailData: [],
  PostTrackingOtpData: [],
  PostOtpTrackingUpdateOrderData: [],
  PostQrDetailsData: [],
  PostPaymentApprovalData: [],
  PostPaymentChatData: [],
  PostPaymentAddAmountData: [],
  OrderPagesLoaderTrueFalseData: false,
};

export const productReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ViewProfile_Type:
      return {
        ...state,
        userDetails: action.payload, //updated state
      };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ViewOrderDetails_Type:
      return {
        ...state,
        orderDetails: action.payload,
      };
    default:
      return state;
  }
};

export const patchUserDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchUserDetails_Type:
      return {
        ...state,
        // patchUserDetails: action.payload
      };
    default:
      return state;
  }
};

export const DeleteUserAddressReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.DeleteUserAddress_Type:
      return {
        ...state,
        DeleteUserAddressData: action.payload,
      };
    default:
      return state;
  }
};
export const ResetPasswordPatchReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ResetPasswordPatchReducer_Type:
      return {
        ...state,
        ResetPasswordPatchData: action.payload,
      };
    default:
      return state;
  }
};
export const PostPincodesAvailabilityReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPincodesAvailabilityDispatch_Type:
      return {
        ...state,
        PostPincodesAvailabilityData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPincodesDeliveredReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPincodesDeliveredDispatch_Type:
      return {
        ...state,
        PostPincodesDeliveredData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPickupAddressReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPickupAddressDispatch_Type:
      return {
        ...state,
        PostPickupAddressData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchPickupAddressReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchPickupAddressDispatch_Type:
      return {
        ...state,
        PatchPickupAddressData: action.payload,
      };
    default:
      return state;
  }
};

export const PostDeliveryAddressReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostDeliveryAddressDispatch_Type:
      return {
        ...state,
        PostDeliveryAddressData: action.payload,
      };
    default:
      return state;
  }
};

export const PostShipmentDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostShipmentDetailsDispatch_Type:
      return {
        ...state,
        PostShipmentDetailsData: action.payload,
      };
    default:
      return state;
  }
};
export const GetShipmentDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetShipmentDetailsDispatch_Type:
      return {
        ...state,
        GetShipmentDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminDashboardViewOrderReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetAdminDashboardViewOrderDispatch_Type:
      return {
        ...state,
        GetAdminDashboardViewOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminDashboardTransactionReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminDashboardTransactionDispatch_Type:
      return {
        ...state,
        PostAdminDashboardTransactionData: action.payload,
      };
    default:
      return state;
  }
};
export const PostAdminDashboardShippingMatrixReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminDashboardShippingMatrixDispatch_Type:
      return {
        ...state,
        PostAdminDashboardShippingMatrixData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderIntransitReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderIntransitDispatch_Type:
      return {
        ...state,
        GetAdminOrderIntransitData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderDeliveredReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderDeliveredDispatch_Type:
      return {
        ...state,
        GetAdminOrderDeliveredData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOutForDeliveryReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOutForDeliveryDispatch_Type:
      return {
        ...state,
        GetAdminOutForDeliveryData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderPendingReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderPendingDispatch_Type:
      return {
        ...state,
        GetAdminOrderPendingData: action.payload,
      };
    default:
      return state;
  }
};
export const PostViewOrderDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostViewOrderDetailsDispatch_Type:
      return {
        ...state,
        PostViewOrderDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderReturnReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderReturnDispatch_Type:
      return {
        ...state,
        GetAdminOrderReturnData: action.payload,
      };
    default:
      return state;
  }
};
export const GetAdminOrderRTODeliveredReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderRTODeliveredDispatch_Type:
      return {
        ...state,
        GetAdminOrderRTODeliveredData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderRebookDispatch = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderRebookDispatch_Type:
      return {
        ...state,
        GetAdminOrderRebookData: action.payload,
      };
    default:
      return state;
  }
};
export const PostTrackLocationDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostTrackLocationDetailsDispatch_Type:
      return {
        ...state,
        PostTrackLocationDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderSummaryReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderSummaryDispatch_Type:
      return {
        ...state,
        GetAdminOrderSummaryData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAddRemarkReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAddRemarkDispatch_Type:
      return {
        ...state,
        PostAddRemarkData: action.payload,
      };
    default:
      return state;
  }
};
export const GetAdminOrderBookedReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderBookedDispatch_Type:
      return {
        ...state,
        GetAdminOrderBookedData: action.payload,
      };
    default:
      return state;
  }
};


export const GetAdminOrderPickedUpReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderPickedUpDispatch_Type:
      return {
        ...state,
        GetAdminOrderPickedUpData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderReadyForPickupReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderReadyForPickupDispatch_Type:
      return {
        ...state,
        GetAdminOrderReadyForPickupData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderReceivedAtHubReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderReceivedAtHubDispatch_Type:
      return {
        ...state,
        GetAdminOrderReceivedAtHubData: action.payload,
      };
    default:
      return state;
  }
};
export const ToggleSideBarReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ToggleSideBar_Type:
      return {
        ...state,
        ToggleSideBarData: action.payload,
      };
    default:
      return state;
  }
};

export const PaymentPopupValueReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderAddShipmentDispatch_Type:
      return {
        ...state,
        PostAdminOrderAddShipmentData: action.payload,
      };
    default:
      return state;
  }
};

export const ToggleSideBarTrueFalseReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ToggleSideBarTrueFalse_Type:
      return {
        ...state,
        ToggleSideBarTrueFalseData: action.payload,
      };
    default:
      return state;
  }
};

export const OrderPageBookNavigateReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.OrderPageBookNavigate_Type:
      return {
        ...state,
        OrderPageBookNavigateData: action.payload,
      };
    default:
      return state;
  }
};

export const HeaderToggleClassAddReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.HeaderToggleClassAdd_Type:
      return {
        ...state,
        HeaderToggleClassAddData: action.payload,
      };
    default:
      return state;
  }
};

export const ShipmentLoaderTrueFalseReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.ShipmentLoaderTrueFalse_Type:
      return {
        ...state,
        ShipmentLoaderTrueFalseData: action.payload,
      };
    default:
      return state;
  }
};

export const OrderPagesLoaderTrueFalseReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.OrderPagesLoaderTrueFalse_Type:
      return {
        ...state,
        OrderPagesLoaderTrueFalseData: action.payload,
      };
    default:
      return state;
  }
};

export const OrderPageBoookNavigateReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.OrderPageBoookNavigate_Type:
      return {
        ...state,
        OrderPageBoookNavigateData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderFilterationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderFilterationDispatch_Type:
      return {
        ...state,
        PostAdminOrderFilterationData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderCustomerReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderCustomerDispatch_Type:
      return {
        ...state,
        GetAdminOrderCustomerData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchAdminOrderEditReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchAdminOrderEditDispatch_Type:
      return {
        ...state,
        PatchAdminOrderEditData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderCallBuyerReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderCallBuyerDispatch_Type:
      return {
        ...state,
        GetAdminOrderCallBuyerData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderGenerateOrderIdReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetAdminOrderGenerateOrderIdDispatch_Type:
      return {
        ...state,
        GetAdminOrderGenerateOrderIdData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderPaymentOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderPaymentOrderDispatch_Type:
      return {
        ...state,
        GetAdminOrderPaymentOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderPaymentOrderReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminOrderPaymentOrderDispatch_Type:
      return {
        ...state,
        PostAdminOrderPaymentOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderEwayBillReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderEwayBillDispatch_Type:
      return {
        ...state,
        PostAdminOrderEwayBillData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderPaymentCalReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderPaymentCalDispatch_Type:
      return {
        ...state,
        PostAdminOrderPaymentCalReducerData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminOrderCloneOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminOrderCloneOrderDispatch_Type:
      return {
        ...state,
        GetAdminOrderCloneOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderAddShipmentReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderAddShipmentDispatch_Type:
      return {
        ...state,
        PostAdminOrderAddShipmentData: action?.payload,
      };
    default:
      return state;
  }
};

export const PostAdminOrderActionReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminOrderActionDispatch_Type:
      return {
        ...state,
        PostAdminOrderActionData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteAdminPendingOrderActionReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.DeleteAdminPendingOrderActionDispatch_Type:
      return {
        ...state,
        DeleteAdminPendingOrderActionData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminSettingAddEmployeeReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminSettingAddEmployeeDispatch_Type:
      return {
        ...state,
        PostAdminSettingAddEmployeeData: action.payload,
      };
    default:
      return state;
  }
};
export const PostAdminSettingAddDeliveryboyReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminSettingAddDeliveryboyDispatch_Type:
      return {
        ...state,
        PostAdminSettingAddDeliveryboyData: action.payload,
      };
    default:
      return state;
  }
};
export const PostAssignDeliveryBoyPartnerReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAssignDeliveryBoyPartnerDispatch_Type:
      return {
        ...state,
        PostAssignDeliveryBoyPartnerData: action.payload,
      };
    default:
      return state;
  }
};
export const GetSettingDeliveryboyInfoReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingDeliveryboyInfoDispatch_Type:
      return {
        ...state,
        GetSettingDeliveryboyInfoData: action.payload,
      };
    default:
      return state;
  }
};
export const GetCategoryDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetCategoryDetailsDispatch_Type:
      return {
        ...state,
        GetCategoryDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingViewPermissionReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingViewPermissionDispatch_Type:
      return {
        ...state,
        GetSettingViewPermissionData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingEmployeeInfoReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingEmployeeInfoDispatch_Type:
      return {
        ...state,
        GetSettingEmployeeInfoData: action.payload,
      };
    default:
      return state;
  }
};

export const PostViewAdminOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostViewAdminOrderDispatch_Type:
      return {
        ...state,
        PostViewAdminOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const GetDeliveryPriceDetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetDeliveryPriceDetailDispatch_Type:
      return {
        ...state,
        GetDeliveryPriceDetailData: action.payload,
      };
    default:
      return state;
  }
};

export const PostAdminSettingAddCategoryReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostAdminSettingAddCategoryDispatch_Type:
      return {
        ...state,
        PostAdminSettingAddCategoryData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingUserInfoReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingUserInfoDispatch_Type:
      return {
        ...state,
        GetSettingUserInfoData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteAdminSettingDeleteUserReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.DeleteAdminSettingDeleteUserDispatch_Type:
      return {
        ...state,
        DeleteAdminSettingDeleteUserData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchEditUserPermissionReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchEditUserPermissionDispatch_Type:
      return {
        ...state,
        PatchEditUserPermissionData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingViewB2bFeedbackReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingViewB2bFeedbackDispatch_Type:
      return {
        ...state,
        GetSettingViewB2bFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingViewB2bCloseFeedbackReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetSettingViewB2bCloseFeedbackDispatch_Type:
      return {
        ...state,
        GetSettingViewB2bCloseFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingViewB2cFeedbackReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetSettingViewB2cFeedbackDispatch_Type:
      return {
        ...state,
        GetSettingViewB2cFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const GetSettingViewB2cCloseFeedbackReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetSettingViewB2cCloseFeedbackDispatch_Type:
      return {
        ...state,
        GetSettingViewB2cCloseFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteSettingDismissTicketReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.DeleteSettingDismissTicketDispatch_Type:
      return {
        ...state,
        DeleteSettingDismissTicketData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchEditCategoryDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchEditCategoryDetailsDispatch_Type:
      return {
        ...state,
        PatchEditCategoryDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteCategoryDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.DeleteCategoryDetailsDispatch_Type:
      return {
        ...state,
        DeleteCategoryDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAdminProfileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminProfileDispatch_Type:
      return {
        ...state,
        GetAdminProfileData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchEditProfileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchEditProfileDispatch_Type:
      return {
        ...state,
        PatchEditProfileData: action.payload,
      };
    default:
      return state;
  }
};
export const PatchAdminEditProfileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchAdminEditProfileDispatch_Type:
      return {
        ...state,
        PatchAdminEditProfileData: action.payload,
      };
    default:
      return state;
  }
};
export const PostAdminOrderCsvFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAdminOrderCsvFileDispatch_Type:
      return {
        ...state,
        PostAdminOrderCsvFileData: action?.payload,
      };
    default:
      return state;
  }
};

export const GetAdminCloneOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminCloneOrderDispatch_Type:
      return {
        ...state,
        GetAdminCloneOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PostOrderDownloadInvoiceFileReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostOrderDownloadInvoiceFileDispatch_Type:
      return {
        ...state,
        PostOrderDownloadInvoiceFileData: action.payload,
      };
    default:
      return state;
  }
};

export const GetOrderDownloadInvoiceReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetOrderDownloadInvoiceDispatch_Type:
      return {
        ...state,
        GetOrderDownloadInvoiceData: action.payload,
      };
    default:
      return state;
  }
};

// label generation

export const PostOrderDownloadLabelGenerationFileReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostOrderDownloadLabelGenerationFileDispatch_Type:
      return {
        ...state,
        PostOrderDownloadLabelGenerationFileData: action.payload,
      };
    default:
      return state;
  }
};

export const GetOrderDownloadILabelGenerationReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetOrderDownloadLabelGenerationDispatch_Type:
      return {
        ...state,
        GetOrderDownloadLabelGenerationData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteAdminOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.DeleteAdminOrderDispatch_Type:
      return {
        ...state,
        DeleteAdminOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchEditEmployeeReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchEditEmployeeDispatch_Type:
      return {
        ...state,
        PatchEditEmployeeData: action.payload,
      };
    default:
      return state;
  }
};
export const PatchEditDeliveryboyReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchEditDeliveryboyDispatch_Type:
      return {
        ...state,
        PatchEditDeliveryboyData: action.payload,
      };
    default:
      return state;
  }
};

export const GetBillingInvoiceDetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetBillingInvoiceDetailDispatch_Type:
      return {
        ...state,
        GetBillingInvoiceDetailData: action.payload,
      };
    default:
      return state;
  }
};

export const GetBillingAmountCountReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetBillingAmountCountDispatch_Type:
      return {
        ...state,
        GetBillingAmountCountData: action.payload,
      };
    default:
      return state;
  }
};

export const GetDashboardNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetDashboardNotificationDispatch_Type:
      return {
        ...state,
        GetDashboardNotificationData: action.payload,
      };
    default:
      return state;
  }
};
export const PostDeliveryBoyNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostDeliveryBoyNotificationDispatch_Type:
      return {
        ...state,
        PostDeliveryBoyNotificationData: action.payload,
      };
    default:
      return state;
  }
};
export const GetDeliveryBoyNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetDeliveryBoyNotificationDispatch_Type:
      return {
        ...state,
        GetDeliveryBoyNotificationData: action.payload,
      };
    default:
      return state;
  }
};
export const GetAdminRemarkNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAdminRemarkNotificationDispatch_Type:
      return {
        ...state,
        GetAdminRemarkNotificationData: action.payload,
      };
    default:
      return state;
  }
};
// PostRemarkNotification
export const PostRemarkNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostRemarkNotificationDispatch_Type:
      return {
        ...state,
        PostRemarkNotificationData: action.payload,
      };
    default:
      return state;
  }
};
export const PostAddOrderTagReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostAddOrderTagDispatch_Type:
      return {
        ...state,
        PostAddOrderTagData: action.payload,
      };
    default:
      return state;
  }
};

export const PostUploadFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostUploadFileDispatch_Type:
      return {
        ...state,
        PostUploadFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostDashboardRevenueReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostDashboardRevenueDispatch_Type:
      return {
        ...state,
        PostDashboardRevenueData: action.payload,
      };
    default:
      return state;
  }
};

export const PostDashboardViewOrderReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostDashboardViewOrderDispatch_Type:
      return {
        ...state,
        PostDashboardViewOrderData: action.payload,
      };
    default:
      return state;
  }
};

export const GetCodRemittanceReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetCodRemittanceDispatch_Type:
      return {
        ...state,
        GetCodRemittanceData: action.payload,
      };
    default:
      return state;
  }
};

export const GetCodRemittanceBillingAmountReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.GetCodRemittanceBillingAmountDispatch_Type:
      return {
        ...state,
        GetCodRemittanceBillingAmountData: action.payload,
      };
    default:
      return state;
  }
};

export const GetB2bCompanyInfoReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetB2bCompanyInfoDispatch_Type:
      return {
        ...state,
        GetB2bCompanyInfoData: action.payload,
      };
    default:
      return state;
  }
};

export const PostUploadBillRemittanceFileReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostUploadBillRemittanceFileDispatch_Type:
      return {
        ...state,
        PostUploadBillRemittanceFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostUploadTariffFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostUploadTariffFileDispatch_Type:
      return {
        ...state,
        PostUploadTariffFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostUploadInsuranceFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostUploadInsuranceFileDispatch_Type:
      return {
        ...state,
        PostUploadInsuranceFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostUploadPackagingFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostUploadPackagingFileDispatch_Type:
      return {
        ...state,
        PostUploadPackagingFileData: action.payload,
      };
    default:
      return state;
  }
};

export const GetWalletHistoryReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetWalletHistoryDispatch_Type:
      return {
        ...state,
        GetWalletHistoryData: action.payload,
      };
    default:
      return state;
  }
};

export const GetWalletBalanceReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetWalletBalanceDispatch_Type:
      return {
        ...state,
        GetWalletBalanceData: action.payload,
      };
    default:
      return state;
  }
};

export const PostWalletAddMoneyReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostWalletAddMoneyDispatch_Type:
      return {
        ...state,
        PostWalletAddMoneyData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPincodeUploadFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPincodeUploadFileDispatch_Type:
      return {
        ...state,
        PostPincodeUploadFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostDebitBalanceReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostDebitBalanceDispatch_Type:
      return {
        ...state,
        PostDebitBalanceData: action.payload,
      };
    default:
      return state;
  }
};

export const PostTrackingOrderDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostTrackingOrderDetailsDispatch_Type:
      return {
        ...state,
        PostTrackingOrderDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const PostCreateTicketReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostCreateTicketDispatch_Type:
      return {
        ...state,
        PostCreateTicketData: action.payload,
      };
    default:
      return state;
  }
};
export const PostBillingCodRemittanceCountReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostBillingCodRemittanceCountDispatch_Type:
      return {
        ...state,
        PostBillingCodRemittanceCountData: action.payload,
      };
    default:
      return state;
  }
};

export const PostTicketDetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostTicketDetailDispatch_Type:
      return {
        ...state,
        PostTicketDetailData: action.payload,
      };
    default:
      return state;
  }
};

export const DeleteSupportTicketReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.DeleteSupportTicketDispatch_Type:
      return {
        ...state,
        DeleteSupportTicketData: action.payload,
      };
    default:
      return state;
  }
};
export const PostBillingCodRemittanceDetailsReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PostBillingCodRemittanceDetailsDispatch_Type:
      return {
        ...state,
        PostBillingCodRemittanceDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const PostCreateFeedbackReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostCreateFeedbackDispatch_Type:
      return {
        ...state,
        PostCreateFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchTrackDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PatchTrackDetailsDispatch_Type:
      return {
        ...state,
        PatchTrackDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetCustomerOrderDetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetCustomerOrderDetailDispatch_Type:
      return {
        ...state,
        GetCustomerOrderDetailData: action.payload,
      };
    default:
      return state;
  }
};

export const PostRaiseContactUSReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostRaiseContactUSDispatch_Type:
      return {
        ...state,
        PostRaiseContactUSData: action.payload,
      };
    default:
      return state;
  }
};

export const PostOrderTrackReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostOrderTrackDispatch_Type:
      return {
        ...state,
        PostOrderTrackData: action.payload,
      };
    default:
      return state;
  }
};

export const PostCompanyFileReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostCompanyFileDispatch_Type:
      return {
        ...state,
        PostCompanyFileData: action.payload,
      };
    default:
      return state;
  }
};

export const PostGetFeedbackReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostGetFeedbackDispatch_Type:
      return {
        ...state,
        PostGetFeedbackData: action.payload,
      };
    default:
      return state;
  }
};

export const PostKYCdetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostKYCdetailDispatch_Type:
      return {
        ...state,
        PostKYCdetailData: action.payload,
      };
    default:
      return state;
  }
};

export const PostClearNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostClearNotificationDispatch_Type:
      return {
        ...state,
        PostClearNotificationData: action.payload,
      };
    default:
      return state;
  }
};

export const GetUserNotificationReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetUserNotificationDispatch_Type:
      return {
        ...state,
        GetUserNotificationData: action.payload,
      };
    default:
      return state;
  }
};

export const GetAuthDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetAuthDetailsDispatch_Type:
      return {
        ...state,
        GetAuthDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const GetPermissionReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetPermissionDispatch_Type:
      return {
        ...state,
        GetPermissionData: action.payload,
      };
    default:
      return state;
  }
};

export const GetCancelOrderDetailReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetCancelOrderDetailDispatch_Type:
      return {
        ...state,
        GetCancelOrderDetailData: action.payload,
      };
    default:
      return state;
  }
};

export const GetGoogleCityStateReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.GetGoogleCityStateDispatch_Type:
      return {
        ...state,
        GetGoogleCityStateData: action.payload,
      };
    default:
      return state;
  }
};

export const PostTransactionHistoryReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostTransactionHistoryDispatch_Type:
      return {
        ...state,
        PostTransactionHistoryData: action.payload,
      };
    default:
      return state;
  }
};

export const PostTrackingOtpReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostTrackingOtpDispatch_Type:
      return {
        ...state,
        PostTrackingOtpData: action.payload,
      };
    default:
      return state;
  }
};

export const PostQrDetailsReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostQrDetailsDispatch_Type:
      return {
        ...state,
        PostQrDetailsData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPaymentApprovalReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPaymentApprovalDispatch_Type:
      return {
        ...state,
        PostPaymentApprovalData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPaymentChatReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPaymentChatDispatch_Type:
      return {
        ...state,
        PostPaymentChatData: action.payload,
      };
    default:
      return state;
  }
};

export const PatchPaymentApprovalActionReducer = (
  state = stateData,
  action
) => {
  switch (action.type) {
    case actionType.PatchPaymentApprovalActionDispatch_Type:
      return {
        ...state,
        PatchPaymentApprovalActionData: action.payload,
      };
    default:
      return state;
  }
};

export const PostPaymentAddAmountReducer = (state = stateData, action) => {
  switch (action.type) {
    case actionType.PostPaymentAddAmountDispatch_Type:
      return {
        ...state,
        PostPaymentAddAmountData: action.payload,
      };
    default:
      return state;
  }
};
