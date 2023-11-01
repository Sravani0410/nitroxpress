
const ReadyToPickup = (


    {
        Accesspage, 
        classNameProp, tabindexProp, Is_delivery_boy,
        PermissionData,
        adminorderreadyforpickupdata,
        IntransitFun,
        showAddressFun,
        activeButton,
        PickupTrack,
        ReceivedAtHubTrack,
        adminorderpickupdata
    }
) => {
    return (

        <div
            className={classNameProp}
            id="readyforpickup-tab-pane"
            role="tabpanel"
            aria-labelledby="readyforpickup-tab"
            tabindex={tabindexProp}
        >
            <table>
                <tr>
                    {Is_delivery_boy !== "true" ? "" : <th>Date</th>}
                    <th> Order Id </th>
                    {Is_delivery_boy !== "true" ? (
                        <th>Delivery Boy Name</th>
                    ) : (
                        <th>Picked Number</th>
                    )}
                    <th>Customer Name</th>
                    {Is_delivery_boy !== "true" ? (
                        <th style={{ textAlign: "center" }}>Receiver Name</th>
                    ) : (
                        <th style={{ textAlign: "center" }}>Pickedup Name</th>
                    )}
                    <th>Method</th>
                    <th>Pickedup Address</th>
                    <th>Action</th>
                </tr>

                {
                    Accesspage=="#ready_for_pickup"?
                
                PermissionData?.VIEW_ORDER_READY_TO_PICKUP ==
                    "VIEW_ORDER_READY_TO_PICKUP"
                    ? adminorderreadyforpickupdata &&
                    adminorderreadyforpickupdata?.map((item, id) => {
                        return (
                            <tr>
                                {Is_delivery_boy !== "true" ? (
                                    ""
                                ) : (
                                    <td>
                                        {new Date(
                                            item?.date_time
                                        )?.toLocaleDateString()}
                                    </td>
                                )}
                                <td>
                                    <b
                                        type="button"
                                        onClick={(e) =>
                                            IntransitFun(e, item.product_order_id)
                                        }
                                    >
                                        {" "}
                                        {item.product_order_id}
                                    </b>
                                </td>
                                {Is_delivery_boy !== "true" ? (
                                    <td>
                                        {item.delivery_boy ? item.delivery_boy : ""}
                                    </td>
                                ) : (
                                    <td>
                                        {item?.address?.phone_number
                                            ? item?.address?.phone_number
                                            : ""}
                                    </td>
                                )}
                                <td>{item.name ? item.name : ""}</td>

                                {Is_delivery_boy !== "true" ? (
                                    <td style={{ textAlign: "center" }}>
                                        {item.receiver_name ? item.receiver_name : ""}
                                    </td>
                                ) : (
                                    <td style={{ textAlign: "center" }}>
                                        {item?.address?.name
                                            ? item?.address?.name
                                            : ""}
                                    </td>
                                )}
                                <td>{item.method}</td>

                                <td>
                                    {item?.product_order_id != activeButton
                                        ? item?.address?.address.slice(0, 10)
                                        : item?.address?.address.slice(0, 10)}
                                    <span
                                        onClick={(e) => showAddressFun(e, item)}
                                        role="button"
                                        style={{
                                            color: "#faad14",
                                            fontWeight: "400",
                                            fontSize: "13px",
                                        }}
                                    >
                                        {item?.product_order_id != activeButton
                                            ? "..more"
                                            : "..less"}
                                    </span>

                                    <span
                                        className="order-btn text-primary"
                                        role="button"
                                    >
                                        {item?.product_order_id == activeButton && (
                                            <div className="dropdown">
                                                <ul className=" address_all ">
                                                    <li className="text-dark text-nowrap">
                                                        {`${item?.address?.address}, ${item?.address?.city}, ${item?.address?.pincode}, ${item?.address?.state}`}
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </span>
                                </td>
                                <td>
                                    <div className="action-btngroup">
                                        <button
                                            type="button"
                                            className={`btn btn-ship ${PermissionData
                                                    ?.ALLOW_READY_TO_PICKUP_ACTION ==
                                                    "ALLOW_READY_TO_PICKUP_ACTION"
                                                    ? " "
                                                    : "permission_blur"
                                                }`}
                                            onClick={(e) =>
                                                PermissionData
                                                    ?.ALLOW_READY_TO_PICKUP_ACTION ==
                                                    "ALLOW_READY_TO_PICKUP_ACTION"
                                                    ? PickupTrack(e, item.product_order_id)
                                                    : ""
                                            }
                                        >
                                            Picked Up
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                    : 
                    
                    "":PermissionData?.VIEW_ORDER_PICKUP == "VIEW_ORDER_PICKUP"
                    ? adminorderpickupdata &&
                      adminorderpickupdata?.map((item, id) => {
                        return (
                          <tr>
                            {Is_delivery_boy !== "true" ? (
                              ""
                            ) : (
                              <td>
                                {new Date(
                                  item?.date_time
                                )?.toLocaleDateString()}
                              </td>
                            )}
                            <td>
                              <b
                                type="button"
                                onClick={(e) =>
                                  IntransitFun(e, item.product_order_id)
                                }
                              >
                                {" "}
                                {item.product_order_id}
                              </b>
                            </td>
                            {Is_delivery_boy !== "true" ? (
                              <td>
                                {item.delivery_boy ? item.delivery_boy : ""}
                              </td>
                            ) : (
                              <td>
                                {item?.address?.phone_number
                                  ? item?.address?.phone_number
                                  : ""}
                              </td>
                            )}
                            <td>{item.name ? item.name : ""}</td>

                            {Is_delivery_boy !== "true" ? (
                              <td style={{ textAlign: "center" }}>
                                {item.receiver_name ? item.receiver_name : ""}
                              </td>
                            ) : (
                              <td style={{ textAlign: "center" }}>
                                {item.address.name ? item.address.name : ""}
                              </td>
                            )}
                            <td>{item.method}</td>

                            <td>
                              {item?.product_order_id != activeButton
                                ? item?.address?.address.slice(0, 10)
                                : item?.address?.address.slice(0, 10)}
                              <span
                                onClick={(e) => showAddressFun(e, item)}
                                role="button"
                                style={{
                                  color: "#faad14",
                                  fontWeight: "400",
                                  fontSize: "13px",
                                }}
                              >
                                {item?.product_order_id != activeButton
                                  ? "..more"
                                  : "..less"}
                              </span>

                              <span
                                className="order-btn text-primary"
                                role="button"
                              >
                                {item?.product_order_id == activeButton && (
                                  <div className="dropdown">
                                    <ul className=" address_all ">
                                      <li className="text-dark text-nowrap">
                                        {`${item?.address?.address}, ${item?.address?.city}, ${item?.address?.pincode}, ${item?.address?.state}`}
                                      </li>
                                    </ul>
                                  </div>
                                )}
                              </span>
                            </td>
                            <td>
                              <div className="action-btngroup">
                                <button
                                  type="button"
                                  className={`btn btn-ship ${
                                    PermissionData?.ALLOW_PICKUP_ACTION ==
                                    "ALLOW_PICKUP_ACTION"
                                      ? " "
                                      : "permission_blur"
                                  }`}
                                  onClick={(e) =>
                                    PermissionData?.ALLOW_PICKUP_ACTION ==
                                    "ALLOW_PICKUP_ACTION"
                                      ? ReceivedAtHubTrack(
                                          e,
                                          item.product_order_id
                                        )
                                      : ""
                                  }
                                >
                                  Recieved At Hub
                                </button>
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

export default ReadyToPickup