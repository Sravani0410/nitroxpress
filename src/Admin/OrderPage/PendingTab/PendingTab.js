const PendingTab = ({
  classNameProp,
  tabindexProp,
  permission,
  adminorderpendingdataProp,
  DeletePending,
  IntransitFun,
  DeliveryBoy,
  payloaddeliveryboyidProp,
  GetSettingDeliveryboyInfoDataProp,
  payloadorderidProp,
  handlePageClick,
  ReactPaginate,
  currentItems,
  pageCount,
  items,
}) => {
  console.log("currentItem", currentItems, items);
  return (
    <div
      className={classNameProp}
      id="pending-tab-pane"
      role="tabpanel"
      aria-labelledby="pending-tab"
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
          <th>Delivery Boy</th>
        </tr>

        {/* {permission?.VIEW_ORDER_PENDING == "VIEW_ORDER_PENDING"
          ? adminorderpendingdataProp &&
            adminorderpendingdataProp?.map((item, id) => {
              return (
                <tr>
                  <td>{item.date}</td>

                  <td>
                    <b
                      onClick={(e) =>
                        permission?.VIEW_ORDER_SUMMARY_PAGE ==
                        "VIEW_ORDER_SUMMARY_PAGE"
                          ? IntransitFun(e, item.product_order_id)
                          : ""
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      {item.product_order_id}
                    </b>
                  </td>

                  <td>{item.name ? item.name : ""}</td>
                  <td>{item.receiver_name ? item.receiver_name : ""}</td>

                  <td>{item.method}</td>
                  <td>{item.product_type}</td>

                  <td>
                    {item.payment_status == "SUCCESSFUL" ? (
                      <div className="action-btngroup">
                        <button
                          type="button"
                          className={`${
                            permission?.ALLOW_CANCEL_ACTION ==
                            "ALLOW_CANCEL_ACTION"
                              ? " "
                              : "permission_blur"
                          }`}
                          onClick={(e) =>
                            permission?.ALLOW_CANCEL_ACTION ==
                            "ALLOW_CANCEL_ACTION"
                              ? DeletePending(e, item.product_order_id)
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
                              d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                              fill="#F14336"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="action-btngroup">
                        <button
                          type="button"
                          className={`${
                            permission?.ALLOW_CANCEL_ACTION ==
                            "ALLOW_CANCEL_ACTION"
                              ? " "
                              : "permission_blur"
                          }`}
                          onClick={(e) =>
                            permission?.ALLOW_CANCEL_ACTION ==
                            "ALLOW_CANCEL_ACTION"
                              ? DeletePending(e, item.product_order_id)
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
                              d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                              fill="#F14336"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    {item.payment_status == "SUCCESSFUL" ? (
                      <select
                        className={`${
                          permission?.ALLOW_PENDING_ACTION_APPROVE ==
                          "ALLOW_PENDING_ACTION_APPROVE"
                            ? "form-select"
                            : "permission_blur"
                        }`}
                        value={payloaddeliveryboyidProp[2]}
                        selected
                        onChange={(e) =>
                          permission?.ALLOW_PENDING_ACTION_APPROVE ==
                          "ALLOW_PENDING_ACTION_APPROVE"
                            ? DeliveryBoy(e, item)
                            : ""
                        }
                      >
                        <option
                          value={
                            payloaddeliveryboyidProp == ""
                              ? "none"
                              : payloaddeliveryboyidProp[2]
                          }
                        >
                          {payloaddeliveryboyidProp == ""
                            ? "Select Delivery Boy"
                            : item.product_order_id ==
                              payloadorderidProp.product_order_id
                            ? payloaddeliveryboyidProp[2]
                            : "Select Delivery Boy"}
                        </option>
                        {permission?.ALLOW_PENDING_ACTION_APPROVE ==
                        "ALLOW_PENDING_ACTION_APPROVE"
                          ? GetSettingDeliveryboyInfoDataProp?.data?.delivery_boy_info?.map(
                              (item, id) => {
                                return (
                                  <option
                                    value={[
                                      item.delivery_boy_id,
                                      item?.email,
                                      item?.name,
                                    ]}
                                  >
                                    {item?.name}
                                  </option>
                                );
                              }
                            )
                          : ""}
                      </select>
                    ) : (
                      <select
                        className={`form-select input_filed_block`}
                        disabled
                        onChange={(e) => DeliveryBoy(e, item)}
                      >
                        <option value="none" selected disabled hidden>
                          Select Delivery Boy
                        </option>
                        {GetSettingDeliveryboyInfoDataProp?.data?.delivery_boy_info?.map(
                          (item, id) => {
                            return (
                              <option
                                selected={item?.name == item.delivery_boy_id}
                                value={[
                                  item.delivery_boy_id,
                                  item?.email,
                                  item?.name,
                                ]}
                              >
                                {item?.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                    )}
                  </td>
                </tr>
              );
            })
          : ""} */}
        <div className="App">
          <div className="items">
            {currentItems &&
              currentItems?.map((item, id) => {
                console.log("shgdhas", item);
                return (
                  <tr>
                    <td>{item.date}</td>

                    <td>
                      <b
                        onClick={(e) =>
                          permission?.VIEW_ORDER_SUMMARY_PAGE ==
                          "VIEW_ORDER_SUMMARY_PAGE"
                            ? IntransitFun(e, item.product_order_id)
                            : ""
                        }
                        style={{ cursor: "pointer" }}
                      >
                        {" "}
                        {item.product_order_id}
                      </b>
                    </td>

                    <td>{item.name ? item.name : ""}</td>
                    <td>{item.receiver_name ? item.receiver_name : ""}</td>

                    <td>{item.method}</td>
                    <td>{item.product_type}</td>

                    <td>
                      {item.payment_status == "SUCCESSFUL" ? (
                        <div className="action-btngroup">
                          <button
                            type="button"
                            className={`${
                              permission?.ALLOW_CANCEL_ACTION ==
                              "ALLOW_CANCEL_ACTION"
                                ? " "
                                : "permission_blur"
                            }`}
                            onClick={(e) =>
                              permission?.ALLOW_CANCEL_ACTION ==
                              "ALLOW_CANCEL_ACTION"
                                ? DeletePending(e, item.product_order_id)
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
                                d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                                fill="#F14336"
                              />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="action-btngroup">
                          <button
                            type="button"
                            className={`${
                              permission?.ALLOW_CANCEL_ACTION ==
                              "ALLOW_CANCEL_ACTION"
                                ? " "
                                : "permission_blur"
                            }`}
                            onClick={(e) =>
                              permission?.ALLOW_CANCEL_ACTION ==
                              "ALLOW_CANCEL_ACTION"
                                ? DeletePending(e, item.product_order_id)
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
                                d="M12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25ZM6.80954 6.98509L10.4481 12.5137L6.6175 18.2849H10.1146L12.4999 14.4138L14.875 18.2849H18.3822L14.5314 12.5137L18.2104 6.98509H14.7133L12.4999 10.5832L10.3066 6.98509H6.80954Z"
                                fill="#F14336"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      {item.payment_status !== "SUCCESSFUL" ? (
                        <select
                          className={`${
                            permission?.ALLOW_PENDING_ACTION_APPROVE ==
                            "ALLOW_PENDING_ACTION_APPROVE"
                              ? "form-select"
                              : "permission_blur"
                          }`}
                          value={payloaddeliveryboyidProp[2]}
                          selected
                          onChange={(e) =>
                            permission?.ALLOW_PENDING_ACTION_APPROVE ==
                            "ALLOW_PENDING_ACTION_APPROVE"
                              ? DeliveryBoy(e, item)
                              : ""
                          }
                        >
                          <option
                            value={
                              payloaddeliveryboyidProp == ""
                                ? "none"
                                : payloaddeliveryboyidProp[2]
                            }
                          >
                            {payloaddeliveryboyidProp == ""
                              ? "Select Delivery Boy"
                              : item.product_order_id ==
                                payloadorderidProp.product_order_id
                              ? payloaddeliveryboyidProp[2]
                              : "Select Delivery Boy"}
                          </option>
                          {permission?.ALLOW_PENDING_ACTION_APPROVE ==
                          "ALLOW_PENDING_ACTION_APPROVE"
                            ? GetSettingDeliveryboyInfoDataProp?.data?.delivery_boy_info?.map(
                                (item, id) => {
                                  return (
                                    <option
                                      value={[
                                        item.delivery_boy_id,
                                        item?.email,
                                        item?.name,
                                      ]}
                                    >
                                      {item?.name}
                                    </option>
                                  );
                                }
                              )
                            : ""}
                        </select>
                      ) : (
                        <select
                          className={`form-select input_filed_block`}
                          disabled
                          onChange={(e) => DeliveryBoy(e, item)}
                        >
                          <option value="none" selected disabled hidden>
                            Select Delivery Boy
                          </option>
                          {GetSettingDeliveryboyInfoDataProp?.data?.delivery_boy_info?.map(
                            (item, id) => {
                              return (
                                <option
                                  selected={item?.name == item.delivery_boy_id}
                                  value={[
                                    item.delivery_boy_id,
                                    item?.email,
                                    item?.name,
                                  ]}
                                >
                                  {item?.name}
                                </option>
                              );
                            }
                          )}
                        </select>
                      )}
                    </td>
                  </tr>
                );
              })}
            {/* {currentItems.map((item) => (
              <div key={item}>
                <h3>Item #{item}</h3>
              </div>
            ))} */}
          </div>
        </div>
      </table>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
export default PendingTab;
