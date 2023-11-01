 
const  ReceivedAtHub = ({
    classNameProp,
    receivedathubtab,
    tabindexProp,
PermissionData,
adminorderreceivedathubdata,
IntransitFun,
showAddressFun,
activeButton,
ActionCorrectFun

}) => {


  return (
    
    <div
                  className={classNameProp}
                  id="receivedathub-tab-pane"
                  role="tabpanel"
                  aria-labelledby="receivedathub-tab"
                  tabindex={tabindexProp}
                >
                  <table>
                    <tr>
                      <th> Order Id </th>
                      <th>Delivery Boy Name</th>
                      <th>Customer Name</th>
                      <th style={{ textAlign: "center" }}>Receiver Name</th>
                      <th>Method</th>
                      <th>Pickup Address</th>
                      <th>Action</th>
                    </tr>
                    {
                    PermissionData?.VIEW_ORDER_RECIEVED_AT_HUB ==
                    "VIEW_ORDER_RECIEVED_AT_HUB"
                      ? adminorderreceivedathubdata &&
                        adminorderreceivedathubdata?.map((item, id) => {
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
                              <td>
                                {item.delivery_boy ? item.delivery_boy : ""}
                              </td>
                              <td>{item.name ? item.name : ""}</td>

                              <td style={{ textAlign: "center" }}>
                                {item.receiver_name ? item.receiver_name : ""}
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
                                {
                                  <div className="action-btngroup">
                                    <button
                                      type="button"
                                      className={`${
                                        PermissionData
                                          ?.ALLOW_RECIEVED_AT_HUB_ACTION ==
                                        "ALLOW_RECIEVED_AT_HUB_ACTION"
                                          ? " "
                                          : "permission_blur"
                                      }`}
                                      onClick={(e) =>
                                        PermissionData
                                          ?.ALLOW_RECIEVED_AT_HUB_ACTION ==
                                        "ALLOW_RECIEVED_AT_HUB_ACTION"
                                          ? ActionCorrectFun(e, item)
                                          : ""
                                      }
                                    >
                                      <svg
                                        width="25"
                                        height="25"
                                        viewBox="0 0 25 25"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM18.7793 10.1941C19.4388 9.48749 19.4006 8.38011 18.6941 7.72065C17.9875 7.06119 16.8801 7.09938 16.2207 7.80594L10.4566 13.9817L8.23744 11.7626C7.55402 11.0791 6.44598 11.0791 5.76256 11.7626C5.07915 12.446 5.07915 13.554 5.76256 14.2374L9.26256 17.7374C9.59815 18.073 10.0556 18.2579 10.5302 18.2497C11.0047 18.2416 11.4555 18.041 11.7793 17.6941L18.7793 10.1941Z"
                                          fill="#4BAE4F"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                }
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </table>
                </div>
    
    )
}

export default  ReceivedAtHub