import React from 'react'

const Cancel = (

    {
        classNameProp,
        tabindexProp,
        
        PermissionData,
        adminordercancelData,
        IntransitFun, 
        RebookFun,
    }
) => {
    return (
        <div
            className={classNameProp}
            id="cancel-tab-pane"
            role="tabpanel"
            aria-labelledby="cancel-tab"
            tabindex={tabindexProp}
        >
            <table>
                <tr>
                    <th> Order Date </th>
                    <th>Order Id</th>

                    <th>Customer Name</th>
                    <th>Receiver Name</th>
                    <th>Method</th>
                    <th>Product Type</th>
                    <th>Action</th>
                </tr>

                {PermissionData?.VIEW_ORDER_CANCEL_DETAILS ==
                    "VIEW_ORDER_CANCEL_DETAILS"
                    ? adminordercancelData &&
                    adminordercancelData?.map((item, id) => {
                        return (
                            <tr>
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


                                <td>{item.name ? item.name : " "}</td>
                                <td>
                                    {item.receiver_name ? item.receiver_name : " "}
                                </td>
                                <td>{item.method}</td>
                                <td>{item.product_type}</td>
                                <td>
                                    <button
                                        type="button"
                                        className={`btn btn-ship  ${PermissionData?.ALLOW_REBOOK_ACTION ==
                                                "ALLOW_REBOOK_ACTION"
                                                ? " "
                                                : "permission_blur"
                                            }`}
                                        onClick={(e) =>
                                            PermissionData?.ALLOW_REBOOK_ACTION ==
                                                "ALLOW_REBOOK_ACTION"
                                                ? RebookFun(e, item)
                                                : ""
                                        }

                                    >
                                        {" "}
                                        Rebook

                                    </button>
                                </td>
                            </tr>
                        );
                    })
                    : ""}
            </table>
        </div>
    )
}

export default Cancel