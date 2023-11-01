import React from 'react'

const Delivered = (
    {
        classNameProp,
tabindexProp,
B2BPartner,
PermissionData,
adminorderdeliveredData,
IntransitFun,
    }
) => {
  return (
    <div
    className={classNameProp}
    id="delivered-tab-pane"
    role="tabpanel"
    aria-labelledby="delivered-tab"
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
      </tr>

      {PermissionData?.VIEW_ORDER_DELIVERED ==
      "VIEW_ORDER_DELIVERED"
        ? adminorderdeliveredData &&
          adminorderdeliveredData.map((item, id) => {
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
                <td> {item.product_type}</td>
                <td> {item.method}</td>
                {B2BPartner == "false" ? (
                  <td> {item.delivery_partner}</td>
                ) : (
                  ""
                )}
                
                
                

                
              </tr>
            );
          })
        : ""}
    </table>
  </div>
  )
}

export default Delivered