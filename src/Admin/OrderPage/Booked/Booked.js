import React from 'react'

const Booked = ({
    classNameProp,
tabindexProp,
PermissionData,
adminorderbookeddata,
IntransitFun,
showAddressFun,
activeButton,
TransitTrack,

}) => {
    return (

        <div
            className={classNameProp}
            id="booked-tab-pane"
            role="tabpanel"
            aria-labelledby="booked-tab"
            tabindex={tabindexProp}
        >
            <table>
                <tr>
                    <th> Order Id </th>
                    <th>Customer Name</th>
                    <th>Receiver Name</th>
                    <th style={{ textAlign: "center" }}>Package Detail</th>
                    <th>Method</th>
                    <th>Pickup Address</th>
                    <th>Action</th>
                </tr>
                {PermissionData?.VIEW_ORDER_BOOKED == "VIEW_ORDER_BOOKED"
                    ? adminorderbookeddata &&
                    adminorderbookeddata?.map((item, id) => {
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

                                <td style={{ textAlign: "center" }}>
                                    {item.package_details}
                                </td>
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
                                            className={`btn btn-ship ${PermissionData?.ALLOW_BOOKED_ACTION ==
                                                    "ALLOW_BOOKED_ACTION"
                                                    ? " "
                                                    : "permission_blur"
                                                }`}
                                            onClick={(e) =>
                                                PermissionData?.ALLOW_BOOKED_ACTION ==
                                                    "ALLOW_BOOKED_ACTION"
                                                    ? TransitTrack(e, item.product_order_id)
                                                    : ""
                                            }
                                        >
                                            In-Transit
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

export default Booked