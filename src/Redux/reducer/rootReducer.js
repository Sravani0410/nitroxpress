import { combineReducers } from "redux";
import {
  productReducer,
  orderDetailsReducer,
  patchUserDetailsReducer,
  DeleteUserAddressReducer,
  PostTrackLocationDetailsReducer,
  ResetPasswordPatchReducer,
  PostPincodesAvailabilityReducer,
  PostPincodesDeliveredReducer,
  PostPickupAddressReducer,
  PatchPickupAddressReducer,
  PostDeliveryAddressReducer,
  GetShipmentDetailsReducer,
  PostShipmentDetailsReducer,
  GetAdminDashboardViewOrderReducer,
  PostAdminDashboardTransactionReducer,
  PostAdminDashboardShippingMatrixReducer,
  GetAdminOrderIntransitReducer,
  GetAdminOrderDeliveredReducer,
  GetAdminOutForDeliveryReducer,
  GetAdminOrderPendingReducer,
  PostViewOrderDetailsReducer,
  GetAdminOrderReturnReducer,
  GetAdminOrderRTODeliveredReducer,
  GetAdminOrderSummaryReducer,
  PostAddRemarkReducer,
  GetAdminOrderBookedReducer,
  GetAdminOrderPickedUpReducer,
  GetAdminOrderReadyForPickupReducer,
  GetAdminOrderReceivedAtHubReducer,
  ToggleSideBarReducer,
  OrderPageBookNavigateReducer,
  OrderPageBoookNavigateReducer,
  PostAdminOrderFilterationReducer,
  GetAdminOrderCustomerReducer,
  PatchAdminOrderEditReducer,
  GetAdminOrderCallBuyerReducer,
  GetAdminOrderGenerateOrderIdReducer,
  PostAdminOrderPaymentOrderReducer,
  PostAdminOrderEwayBillReducer,
  GetAdminOrderPaymentOrderReducer,
  PostAdminOrderPaymentCalReducer,
  PostAdminOrderAddShipmentReducer,
  PostViewAdminOrderReducer,
  GetDeliveryPriceDetailReducer,
  GetAdminOrderCloneOrderReducer,
  PostAdminOrderActionReducer,
  DeleteAdminPendingOrderActionReducer,
  PostAdminSettingAddEmployeeReducer,
  PostAdminSettingAddDeliveryboyReducer,
  GetSettingDeliveryboyInfoReducer,
  PostAssignDeliveryBoyPartnerReducer,
  GetCategoryDetailsReducer,
  GetSettingViewPermissionReducer,
  GetSettingEmployeeInfoReducer,
  PostAdminSettingAddCategoryReducer,
  GetSettingUserInfoReducer,
  DeleteAdminSettingDeleteUserReducer,
  PatchEditUserPermissionReducer,
  GetSettingViewB2bFeedbackReducer,
  GetSettingViewB2bCloseFeedbackReducer,
  GetSettingViewB2cFeedbackReducer,
  GetSettingViewB2cCloseFeedbackReducer,
  DeleteSettingDismissTicketReducer,
  PatchEditCategoryDetailsReducer,
  DeleteCategoryDetailsReducer,
  GetAdminProfileReducer,
  PatchEditProfileReducer,
  PatchAdminEditProfileReducer,
  PostAdminOrderCsvFileReducer,
  GetAdminCloneOrderReducer,
  PostOrderDownloadInvoiceFileReducer,
  GetOrderDownloadInvoiceReducer,
  PostOrderDownloadLabelGenerationFileReducer,
  GetOrderDownloadILabelGenerationReducer,
  DeleteAdminOrderReducer,
  PatchEditEmployeeReducer,
  PatchEditDeliveryboyReducer,
  GetBillingInvoiceDetailReducer,
  GetBillingAmountCountReducer,
  GetDashboardNotificationReducer,
  PostDeliveryBoyNotificationReducer,
  GetDeliveryBoyNotificationReducer,
  GetAdminRemarkNotificationReducer,
  PostRemarkNotificationReducer,
  PostAddOrderTagReducer,
  PostUploadFileReducer,
  PostDashboardRevenueReducer,
  PostDashboardViewOrderReducer,
  GetCodRemittanceReducer,
  GetCodRemittanceBillingAmountReducer,
  GetB2bCompanyInfoReducer,
  PostUploadBillRemittanceFileReducer,
  PostUploadTariffFileReducer,
  PostUploadInsuranceFileReducer,
  PostUploadPackagingFileReducer,
  GetWalletHistoryReducer,
  GetWalletBalanceReducer,
  PostWalletAddMoneyReducer,
  PostPincodeUploadFileReducer,
  PostDebitBalanceReducer,
  PostTrackingOrderDetailsReducer,
  PostCreateTicketReducer,
  PostTicketDetailReducer,
  DeleteSupportTicketReducer,
  PostBillingCodRemittanceCountReducer,
  PostBillingCodRemittanceDetailsReducer,
  HeaderToggleClassAddReducer,
  PostCreateFeedbackReducer,
  PatchTrackDetailsReducer,
  GetCustomerOrderDetailReducer,
  PostRaiseContactUSReducer,
  PostOrderTrackReducer,
  PostCompanyFileReducer,
  PostGetFeedbackReducer,
  PostKYCdetailReducer,
  PostClearNotificationReducer,
  GetUserNotificationReducer,
  ShipmentLoaderTrueFalseReducer,
  ToggleSideBarTrueFalseReducer,
  GetAuthDetailsReducer,
  GetPermissionReducer,
  GetGoogleCityStateReducer,
  PaymentPopupValueReducer,
  PostTransactionHistoryReducer,
  GetCancelOrderDetailReducer,
  PostTrackingOtpReducer,
  PostQrDetailsReducer,
  PostPaymentApprovalReducer,
  OrderPagesLoaderTrueFalseReducer,
  PostPaymentChatReducer,
  PatchPaymentApprovalActionReducer,
  PostPaymentAddAmountReducer,
} from "./Reducer";

const rootReducer = combineReducers({
  productReducer,
  orderDetailsReducer,
  patchUserDetailsReducer,
  DeleteUserAddressReducer,
  PostTrackLocationDetailsReducer,
  ResetPasswordPatchReducer,
  PostPincodesAvailabilityReducer,
  PostPincodesDeliveredReducer,
  PostPickupAddressReducer,
  PatchPickupAddressReducer,
  PostDeliveryAddressReducer,
  GetShipmentDetailsReducer,
  PostShipmentDetailsReducer,
  GetAdminDashboardViewOrderReducer,
  PostAdminDashboardTransactionReducer,
  PostAdminDashboardShippingMatrixReducer,
  GetAdminOrderIntransitReducer,
  GetAdminOrderDeliveredReducer,
  GetAdminOutForDeliveryReducer,
  GetAdminOrderPendingReducer,
  PostViewOrderDetailsReducer,
  GetAdminOrderReturnReducer,
  GetAdminOrderRTODeliveredReducer,
  GetAdminOrderSummaryReducer,
  PostAddRemarkReducer,
  GetAdminOrderBookedReducer,
  GetAdminOrderPickedUpReducer,
  GetAdminOrderReadyForPickupReducer,
  GetAdminOrderReceivedAtHubReducer,
  ToggleSideBarReducer,
  OrderPageBookNavigateReducer,
  OrderPageBoookNavigateReducer,
  PostAdminOrderFilterationReducer,
  GetAdminOrderCustomerReducer,
  PatchAdminOrderEditReducer,
  GetAdminOrderCallBuyerReducer,
  GetAdminOrderGenerateOrderIdReducer,
  GetAdminOrderPaymentOrderReducer,
  PostAdminOrderPaymentOrderReducer,
  PostAdminOrderPaymentCalReducer,
  PostAdminOrderEwayBillReducer,
  PostAdminOrderAddShipmentReducer,
  PostViewAdminOrderReducer,
  GetDeliveryPriceDetailReducer,
  GetAdminOrderCloneOrderReducer,
  PostAdminOrderActionReducer,
  DeleteAdminPendingOrderActionReducer,
  PostAdminSettingAddEmployeeReducer,
  PostAdminSettingAddDeliveryboyReducer,
  GetSettingDeliveryboyInfoReducer,
  PostAssignDeliveryBoyPartnerReducer,
  GetCategoryDetailsReducer,
  GetSettingViewPermissionReducer,
  GetSettingEmployeeInfoReducer,
  PostAdminSettingAddCategoryReducer,
  GetSettingUserInfoReducer,
  DeleteAdminSettingDeleteUserReducer,
  PatchEditUserPermissionReducer,
  GetSettingViewB2bFeedbackReducer,
  GetSettingViewB2bCloseFeedbackReducer,
  GetSettingViewB2cFeedbackReducer,
  GetSettingViewB2cCloseFeedbackReducer,
  DeleteSettingDismissTicketReducer,
  PatchEditCategoryDetailsReducer,
  DeleteCategoryDetailsReducer,
  GetAdminProfileReducer,
  PatchEditProfileReducer,
  PatchAdminEditProfileReducer,
  PostAdminOrderCsvFileReducer,
  GetAdminCloneOrderReducer,
  PostOrderDownloadInvoiceFileReducer,
  GetOrderDownloadInvoiceReducer,
  PostOrderDownloadLabelGenerationFileReducer,
  GetOrderDownloadILabelGenerationReducer,
  GetOrderDownloadInvoiceReducer,
  DeleteAdminOrderReducer,
  PatchEditEmployeeReducer,
  PatchEditDeliveryboyReducer,
  GetBillingInvoiceDetailReducer,
  GetBillingAmountCountReducer,
  GetDashboardNotificationReducer,
  GetDeliveryBoyNotificationReducer,
  GetAdminRemarkNotificationReducer,
  PostRemarkNotificationReducer,
  PostDeliveryBoyNotificationReducer,
  PostAddOrderTagReducer,
  PostUploadFileReducer,
  PostDashboardRevenueReducer,
  PostDashboardViewOrderReducer,
  GetCodRemittanceReducer,
  GetCodRemittanceBillingAmountReducer,
  GetB2bCompanyInfoReducer,
  PostUploadBillRemittanceFileReducer,
  PostUploadTariffFileReducer,
  PostUploadInsuranceFileReducer,
  PostUploadPackagingFileReducer,
  GetWalletHistoryReducer,
  GetWalletBalanceReducer,
  PostWalletAddMoneyReducer,
  PostPincodeUploadFileReducer,
  PostDebitBalanceReducer,
  PostTrackingOrderDetailsReducer,
  PostCreateTicketReducer,
  PostTicketDetailReducer,
  DeleteSupportTicketReducer,
  PostBillingCodRemittanceCountReducer,
  PostBillingCodRemittanceDetailsReducer,
  HeaderToggleClassAddReducer,
  PostCreateFeedbackReducer,
  PatchTrackDetailsReducer,
  GetCustomerOrderDetailReducer,
  PostRaiseContactUSReducer,
  PostOrderTrackReducer,
  PostCompanyFileReducer,
  PostGetFeedbackReducer,
  PostKYCdetailReducer,
  PostClearNotificationReducer,
  GetUserNotificationReducer,
  ShipmentLoaderTrueFalseReducer,
  ToggleSideBarTrueFalseReducer,
  GetAuthDetailsReducer,
  GetPermissionReducer,
  GetGoogleCityStateReducer,
  PaymentPopupValueReducer,
  PostTransactionHistoryReducer,
  GetCancelOrderDetailReducer,
  PostTrackingOtpReducer,
  PostQrDetailsReducer,
  OrderPagesLoaderTrueFalseReducer,
  PostPaymentApprovalReducer,
  PostPaymentChatReducer,
  PatchPaymentApprovalActionReducer,
  PostPaymentAddAmountReducer,
});

export default rootReducer;
