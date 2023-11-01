 


const RTODelivered = (

    {
      classNameProp,
      tabindexProp,
      B2BPartner,
      PermissionData,
      adminorderrtodeliveredData,
      IntransitFun,
       
      showAddressFun,
      activeButton,
      
    }

) => {
  return (
    
    <div
                  className={classNameProp}
                  id="rto-delivered-tab-pane"
                  role="tabpanel"
                  aria-labelledby="rto-delivered-tab"
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
                       
                    </tr>

                    {PermissionData?.VIEW_ORDER_RTO_DELIVERED ==
                    "VIEW_ORDER_RTO_DELIVERED"
                      ? adminorderrtodeliveredData &&
                        adminorderrtodeliveredData?.map((item, id) => {
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
                              <td>{item.name ? item.name : " "}</td>
                              <td>
                                {item.receiver_name ? item.receiver_name : " "}
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

                                                         </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>
  )
}

export default RTODelivered