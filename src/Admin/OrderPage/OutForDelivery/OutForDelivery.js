import React from 'react'

const OutForDelivery = (

    {
        classNameProp,
        tabindexProp,
        B2BPartner,
        PermissionData,
        adminoutfordeliveryData,
        IntransitFun,
        OutForDevliveryActionFun,
        reasonActionValue,
         
        dots,
        TrackLocation,
    }

) => {
  return (
   
    <div
                  className={classNameProp}
                  id="outfordelivery-tab-pane"
                  role="tabpanel"
                  aria-labelledby="outfordelivery-tab"
                  tabindex={tabindexProp}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Customer Name</th>
                      <th>Receiver Name</th>
                      <th>Product Type</th>
                      <th>Method</th>
                      {B2BPartner == "false" ? <th>Partner</th> : ""}
                      <th>Action</th>
                    </tr>

                    {PermissionData?.VIEW_ORDER_OUT_FOR_DELIVERED ==
                    "VIEW_ORDER_OUT_FOR_DELIVERED"
                      ? adminoutfordeliveryData &&
                        adminoutfordeliveryData.map((item, id) => {
                          return (
                            <tr>
                              <td>
                                <b
                                  onClick={(e) =>
                                    IntransitFun(e, item.product_order_id)
                                  }
                                  style={{ cursor: "pointer" }}
                                >
                                  {" "}
                                  {item.product_order_id}
                                </b>
                              </td>
                              <td> {item.name ? item.name : " "}</td>
                              <td>
                                {" "}
                                {item.receiver_name ? item.receiver_name : " "}
                              </td>
                              <td> {item.product_type}</td>
                              <td> {item.method}</td>
                              {B2BPartner == "false" ? (
                                <td> {item.delivery_partner}</td>
                              ) : (
                                ""
                              )}
                              <td>
                                <div className="action-btngroup actionordergroup">
                                  <select
                                    disabled={
                                      PermissionData
                                        ?.ALLOW_DELIVERED_ACTION ==
                                        "ALLOW_DELIVERED_ACTION" ||
                                      PermissionData
                                        ?.ALLOW_IN_TRANSIT_ACTION ==
                                        "ALLOW_IN_TRANSIT_ACTION" ||
                                      PermissionData?.ALLOW_RETURN_ACTION ==
                                        "ALLOW_RETURN_ACTION"
                                        ? ""
                                        : "disabled"
                                    }
                                    type="button"
                                    className="btn order-btn"
                                    onChange={(e) =>
                                      OutForDevliveryActionFun(e, item)
                                    }
                                  >
                                    <option
                                      selected={reasonActionValue == "null"}
                                      value="null"
                                    >
                                      Select
                                    </option>
                                    {PermissionData?.ALLOW_DELIVERED_ACTION ==
                                    "ALLOW_DELIVERED_ACTION" ? (
                                      <option value="DELIVERED">
                                        Delivered
                                      </option>
                                    ) : (
                                      <option
                                        value="delivered"
                                        disabled
                                        className={`btn ${
                                          PermissionData
                                            ?.ALLOW_DELIVERED_ACTION ==
                                          "ALLOW_DELIVERED_ACTION"
                                            ? "permission_blur"
                                            : ""
                                        }`}
                                      >
                                        Delivered
                                      </option>
                                    )}
                                    {PermissionData
                                      ?.ALLOW_IN_TRANSIT_ACTION ==
                                    "ALLOW_IN_TRANSIT_ACTION" ? (
                                      <option value="IN_TRANSIT">
                                        In-Transit
                                      </option>
                                    ) : (
                                      <option
                                        value="intransit"
                                        disabled
                                        className={`btn permission-btn ${
                                          PermissionData
                                            ?.ALLOW_IN_TRANSIT_ACTION ==
                                          "ALLOW_IN_TRANSIT_ACTION"
                                            ? "permission_blur"
                                            : ""
                                        }`}
                                      >
                                        In-transit
                                      </option>
                                    )}
                                    {PermissionData?.ALLOW_RETURN_ACTION ==
                                    "ALLOW_RETURN_ACTION" ? (
                                      <option value="RTO">RTO</option>
                                    ) : (
                                      <option
                                        disabled
                                        className={`btn ${
                                          PermissionData
                                            ?.ALLOW_RETURN_ACTION ==
                                          "ALLOW_RETURN_ACTION"
                                            ? "permission_blur"
                                            : ""
                                        }`}
                                        value="rto"
                                      >
                                        RTO
                                      </option>
                                    )}

                                   
                                  </select>

                                  
                                  
                                  <div className="actionordergroup ms-2">
                                    {PermissionData
                                      ?.ALLOW_TRACKING_OUT_FOR_DELIVERY_ACTION ==
                                    "ALLOW_TRACKING_OUT_FOR_DELIVERY_ACTION" ? (
                                      <button className="actionordermenu">
                                        <img
                                          src={dots}
                                          alt="img"
                                          onClick={(e) =>
                                            TrackLocation(e, item)
                                          }
                                        />{" "}
                                      </button>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>
    
  )
}

export default OutForDelivery