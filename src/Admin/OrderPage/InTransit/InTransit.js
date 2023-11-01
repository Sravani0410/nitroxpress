

const InTransit = ( {
        classNameProp,
        tabindexProp,
        B2BPartner,
        PermissionData,
        adminorderintransitDate,
        IntransitFun,
        DeliveredTrack,
        dots,
        TrackLocation,
    }) => {


    return (
        <div
            className={classNameProp}
            id="transit-tab-pane"
            role="tabpanel"
            aria-labelledby="transit-tab"
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

                {PermissionData?.VIEW_ORDER_IN_TRANSIT ==
                    "VIEW_ORDER_IN_TRANSIT"
                    ? adminorderintransitDate &&
                    adminorderintransitDate.map((item, id) => {
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
                                <td> {item.name ? item.name : ""}</td>
                                <td>
                                    {" "}
                                    {item.receiver_name ? item.receiver_name : ""}
                                </td>
                                <td> {item.product_type} </td>
                                <td> {item.method} </td>
                                {B2BPartner == "false" ? (
                                    <td> {item.delivery_partner}</td>
                                ) : (
                                    ""
                                )}
                                <td>
                                    <div className="action-btngroup actionordergroup">
                                        <button
                                            type="button"
                                            className={`btn btn-ship ${PermissionData
                                                    ?.ALLOW_OUT_FOR_DELIVERY_ACTION ==
                                                    "ALLOW_OUT_FOR_DELIVERY_ACTION"
                                                    ? " "
                                                    : "permission_blur"
                                                }`}
                                            onClick={(e) =>
                                                PermissionData
                                                    ?.ALLOW_OUT_FOR_DELIVERY_ACTION ==
                                                    "ALLOW_OUT_FOR_DELIVERY_ACTION"
                                                    ? DeliveredTrack(
                                                        e,
                                                        item.product_order_id
                                                    )
                                                    : ""
                                            }
                                        >
                                            {" "}
                                            Out For Delivery
                                        </button>
                                        <div className="actionordergroup">
                                            {PermissionData
                                                ?.ALLOW_TRACKING_INTRANSIT_ACTION ==
                                                "ALLOW_TRACKING_INTRANSIT_ACTION" ? (
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

export default InTransit