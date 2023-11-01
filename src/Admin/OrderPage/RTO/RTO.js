import React from 'react'

const RTO = ( 
    {
        classNameProp,
        tabindexProp,
        B2BPartner,
        PermissionData,
        adminorderreturnData,
        IntransitFun,
         
        showAddressFun,
        activeButton,
        ReturnDeliveredTrack,
        dots,
        TrackLocation,
    } ) => {

        
    return (
        <div
            className={classNameProp}
            id="returns-tab-pane"
            role="tabpanel"
            aria-labelledby="returns-tab"
            tabindex={tabindexProp}
        >
            <table>
                <tr>
                    <th>Order Id </th>

                    <th>Customer Name</th>
                    <th>Receiver Name</th>
                    <th>Shipped Date</th>
                    <th>Product Type</th>
                    <th>RTO Address</th>
                    {B2BPartner == "false" ? <th>Partner</th> : ""}
                    <th>Action</th>
                </tr>
                {PermissionData?.VIEW_ORDER_RETURNS ==
                    "VIEW_ORDER_RETURNS"
                    ? adminorderreturnData &&
                    adminorderreturnData?.map((item, id) => {
                        return (
                            <tr>


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
                                <td>{item.name ? item.name : ""}</td>
                                <td>
                                    {item.receiver_name ? item.receiver_name : ""}
                                </td>
                                <td>
                                    {new Date(item.date_time).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            year: "numeric",
                                            day: "numeric",
                                        }
                                    )}
                                </td>
                                <td>{item.product_type}</td>
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
                                {B2BPartner == "false" ? (
                                    <td>{item.delivery_partner} </td>
                                ) : (
                                    ""
                                )}
                                <td>
                                    <div className="action-btngroup actionordergroup">
                                        <button
                                            type="button"
                                            className={`btn btn-ship ${PermissionData
                                                    ?.ALLOW_RTO_DELIVERED_ACTION ==
                                                    "ALLOW_RTO_DELIVERED_ACTION"
                                                    ? " "
                                                    : "permission_blur"
                                                }`}
                                            onClick={
                                                (e) =>
                                                    PermissionData
                                                        ?.ALLOW_RTO_DELIVERED_ACTION ==
                                                        "ALLOW_RTO_DELIVERED_ACTION"
                                                        ? ReturnDeliveredTrack(
                                                            e,
                                                            item.product_order_id
                                                        )
                                                        : ""
                                            }
                                        >
                                            RTO Delivered
                                        </button>
                                        <div className="actionordergroup ms-4">
                                            {PermissionData
                                                ?.ALLOW_TRACKING_RTO_ACTION ==
                                                "ALLOW_TRACKING_RTO_ACTION" ? (
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

export default RTO