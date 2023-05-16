import React, { useEffect, useState } from "react";
import { actionType } from "../Redux/type/types";

import { reactLocalStorage } from "reactjs-localstorage";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAdminOrderDelivered,
  GetAdminOrderIntransit,
  GetAdminOrderPending,
  GetAdminOrderCustomer,
  GetAdminOrderReturn,
  GetAdminOrderBooked,
  GetAdminOrderSummary,
  PostAdminOrderFilteration,
} from "../Redux/action/ApiCollection";
import tokenData from "../Authanticate";
import { PostAdminOrderFilterationReducer } from "../Redux/reducer/Reducer";

const Order = () => {
  const [filtershowhidebtn, setFilterShowHideBtn] = useState(false);
  const [domesticcheckBox, setDomesticCheckBox] = useState(false);
  const [internationalcheckBox, setInternationalCheckBox] = useState(false);
  const [pandingtab, setPandingTab] = useState("");
  const [booktab, setBookTab] = useState("");
  const [transittab, setTransitTab] = useState("");
  const [deliveredtab, setDeliveredTab] = useState("");
  const [returntab, setReturnTab] = useState("");
  const [pendingpartner, setPendingPartner] = useState(false);
  const [paidcustomer, setPaidCustomer] = useState(false);
  const [recievedpartner, setRecievedPartner] = useState(false);
  const [tabfilteravailable, setTabFilterAvailable] = useState("");
  const [codcheckBox, setCodCheckBox] = useState(false);
  const [prepaidcheckBox, setPrepaidCheckBox] = useState(false);
  const [shippingpartnervalue, setShippingPartnerValue] = useState("");
  const [adminorderfilterationdata, setAdminOrderFilterationData] =
    useState("");
  const [tabfiltersearchdata, setTabFilterSearchData] = useState("");
  const [adminorderpendingdata, setAdminOrderPendingData] = useState("");
  const [adminorderbookeddata, setAdminOrderBookedData] = useState("");
  const [adminorderintransitDate, setAdminOrderIntransitDate] = useState("");
  const [adminorderdeliveredData, setAdminOrderDeliveredData] = useState("");
  const [adminorderreturnData, setAdminOrderReturnData] = useState("");
  const [adminordercustomerdata, setAdminOrderCusrtomerData] = useState("");

  const [filterdatahideaftertabchange, setFilterDataHideAfterTabChange] =
    useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let param = useLocation();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const GetAdminOrderCustomerData = useSelector( 
    (state) =>
      state.GetAdminOrderCustomerReducer.GetAdminOrderCustomerData?.data
  );

  useEffect(() => {
  

    dispatch(GetAdminOrderCustomer());
  }, []);

  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className={`dashboard-part`}>
          <Sidebar />

          <div className="content-sec customer-inner">
            <div className="ordertittle-part">
              <h2>B2C</h2>
              <ul>
                <li>
                  <a
                    href="#"
                    className="download-item d-flex align-items-center justify-content-center"
                  >
                    <svg
                      width="18"
                      height="16"
                      viewBox="0 0 18 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.72237 0.0351605C8.58526 0.0910857 8.40828 0.243903 8.33114 0.373031C8.29123 0.439823 8.2706 1.83814 8.25339 5.64346L8.22994 10.823L6.92956 9.81735C5.57272 8.76809 5.48559 8.71776 5.13628 8.78128C4.83118 8.83679 4.54874 9.16507 4.54874 9.4642C4.54874 9.52699 4.58255 9.66035 4.62391 9.76051C4.68849 9.91706 4.97098 10.1535 6.63474 11.4438C7.69933 12.2694 8.65049 12.9774 8.7484 13.017C9.14006 13.1757 9.12937 13.1821 11.3419 11.467C12.4519 10.6065 13.3946 9.85122 13.437 9.78857C13.7068 9.38932 13.4839 8.85453 12.9876 8.71035C12.6591 8.61496 12.5354 8.68616 11.1197 9.7852C10.3951 10.3477 9.79175 10.8079 9.77876 10.8079C9.76577 10.8079 9.74964 8.47687 9.74289 5.62787C9.7306 0.476333 9.73004 0.447189 9.63386 0.322334C9.58068 0.253269 9.48201 0.156832 9.41463 0.108045C9.27216 0.0049698 8.8941 -0.0348597 8.72237 0.0351605ZM0.445495 10.233C0.271799 10.3109 0.116063 10.4714 0.0500362 10.6403C0.0179606 10.7224 0 11.3591 0 12.4154C0 13.7477 0.0137399 14.1135 0.071795 14.3297C0.282491 15.1139 0.907497 15.718 1.72069 15.9233C2.12543 16.0256 15.882 16.0256 16.2867 15.9233C17.1215 15.7125 17.7883 15.0448 17.9587 14.2489C17.9929 14.0892 18.0062 13.4283 17.9974 12.3193C17.9845 10.6972 17.9802 10.6277 17.8872 10.507C17.7035 10.2685 17.5536 10.194 17.2571 10.194C16.9606 10.194 16.8107 10.2684 16.6269 10.507C16.5343 10.6272 16.5292 10.7049 16.5068 12.3538C16.4843 14.0026 16.4792 14.0804 16.3866 14.2005C16.3334 14.2695 16.2317 14.3682 16.1605 14.4197C16.031 14.5134 16.028 14.5135 9.00369 14.5135C1.97936 14.5135 1.9764 14.5134 1.84693 14.4197C1.7757 14.3682 1.67394 14.2695 1.62076 14.2005C1.52814 14.0804 1.52308 14.0026 1.50062 12.3538C1.47815 10.7049 1.47309 10.6272 1.38047 10.507C1.32729 10.438 1.22863 10.3416 1.16124 10.2928C1.00583 10.1803 0.632369 10.1491 0.445495 10.233Z"
                        fill="black"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="ordertab-sec customer-sec ">
              <div className="tab-content" id="myTabContent">
                <div>
                  <table>
                    <tr>
                      <th>Customer Name </th>
                      <th className="text-center">Address</th>
                      <th>Payment Mode</th>
                      <th>Product Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                    {GetAdminOrderCustomerData &&
                      GetAdminOrderCustomerData.map((item, id) => {
                        return (
                          <tr>
                            <td>
                              <div className="customer-info">
                                <span className="user-img">
                                  <svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27 25" width="27" height="25"><defs><image width="27" height="25" id="img1" href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAZCAMAAAD3wqVsAAAAAXNSR0IB2cksfwAAAORQTFRFAAAA5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn5Obn1NfZx8vOz9LU4uXm0tbXrrS3wcbI09fZv8TG4eTl3N7g09fYub/Bv8THrbO2vcLE4+Xmyc3PsLa53uDizdLT4uTluL3A0NPVtLm8yMzO4OPkzdHSvcHEt73Atru+t7y/u7/Cys3P3+Ljs7m7sri7y8/Rsbe64OLjr7W42dze4+Xn4ePkxsrMrrS3ur/CrrS3rrS3rrS3rrS3v8TGv8TGv8TGv8TGTkzH1QAAAEx0Uk5TAAFYndD5/9moYwp66/SBM8zPNEb6////////////////////////////////////////////////////////+vpG+kYzzM80euv0geJWSm4AAAD8SURBVHicbZJnW8JADIBDodehZbWgniJLrFaWW1RkKqj///9Yekk68P2Uy9vkSe8CoMhp+YIuQgzTsiHFwaGIcYoJUyqLNJUqKdcTWTwXq1jV6kfHJFUlNTyRO06pbTQGHs6kooHncKAcTnguiSZOa4OGn7XYtTFjQR6jDrsuZkwoYHTBTvZUxgAd3SUrn34JKLhid73nuKkfsDMoCm6UalLCAJMLe/1B1x+O+GyCxXXj27v7h8enZ0pYYDtRUHvhWSavdC9Q3AVvMon/ru4ToCKCqczwod4BqrNJVsnpHF9+sdxzyxUtxfozo742iW3afjdifn7TS/jffv4B7SInpcb0eJgAAAAASUVORK5CYII=" /></defs><style></style><use href="#img1" x="0" y="0" /></svg>
                                </span>
                                <span className="user-name">{item.name}</span>
                              </div>
                            </td>
                            <td>{`${item?.address?.address}, ${item?.address?.city}, ${item?.address?.pincode}, ${item?.address?.state}`}</td>
                            <td>{item.method}</td>
                            <td>{item.product_type}</td>
                            <td>{item.status}</td>
                            <td>
                              <div className="action-btngroup">
                                <button type="button">
                                  <svg
                                    width="17"
                                    height="20"
                                    viewBox="0 0 17 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M5.92727 0.0382218C5.61474 0.0967502 5.1847 0.319807 4.94698 0.546731C4.54989 0.925837 4.37242 1.40864 4.3705 2.11524L4.36968 2.41804L3.13158 2.41882C1.73849 2.41968 1.4321 2.44855 1.06161 2.61378C0.729388 2.76194 0.334588 3.13554 0.182374 3.44572C-0.159177 4.14189 -0.0127748 4.94711 0.552698 5.48261C0.748092 5.66765 1.20997 5.93443 1.33497 5.93443C1.36796 5.93443 1.38335 7.58143 1.39137 11.9611L1.40234 17.9878L1.51383 18.3004C1.6683 18.7333 1.88747 19.068 2.20111 19.35C2.52269 19.6391 2.86489 19.8193 3.289 19.9228C3.59518 19.9976 3.75939 20 8.50349 20C13.2476 20 13.4118 19.9976 13.718 19.9228C14.7136 19.6797 15.4275 18.8911 15.5834 17.8622C15.6081 17.6985 15.6238 15.3681 15.6243 11.7688L15.6251 5.94049L15.7786 5.89266C16.3644 5.71012 16.8734 5.11417 16.9792 4.48693C17.0906 3.8269 16.7451 3.09068 16.1539 2.72857C15.7078 2.45531 15.6374 2.44515 14.0657 2.4273L12.6495 2.41124L12.6238 1.95415C12.5952 1.44771 12.5113 1.15483 12.308 0.852423C12.0342 0.445147 11.5394 0.12492 11.0455 0.0355259C10.775 -0.0134692 6.19052 -0.0110468 5.92727 0.0382218ZM11.1033 1.01762C11.4701 1.20973 11.6166 1.47932 11.6452 2.01522L11.6668 2.41804H8.50484H5.34293L5.35799 1.99802C5.37141 1.6249 5.38562 1.55758 5.48548 1.39496C5.54729 1.29432 5.65554 1.17273 5.72602 1.12483C6.00643 0.934238 5.99472 0.93498 8.56489 0.944201C10.7252 0.951976 10.9927 0.959712 11.1033 1.01762ZM15.5228 3.4594C15.7314 3.56657 15.8492 3.68781 15.9349 3.88351C16.0925 4.24359 15.9627 4.67521 15.6296 4.8987L15.4544 5.01626L8.59206 5.02775C3.80126 5.0358 1.68401 5.02665 1.57813 4.99743C1.17048 4.8849 0.909147 4.43528 1.01245 4.02413C1.09013 3.715 1.35089 3.47131 1.68884 3.392C1.75637 3.37614 4.8598 3.3659 8.58535 3.36922L15.3591 3.37528L15.5228 3.4594ZM14.6334 11.7365C14.641 15.655 14.6307 17.5668 14.6009 17.7534C14.5148 18.2937 14.2227 18.6928 13.7513 18.9143L13.4781 19.0428L8.61089 19.0533C3.33058 19.0648 3.46994 19.0698 3.11177 18.854C2.77665 18.652 2.49891 18.2581 2.41017 17.8589C2.37731 17.7109 2.36417 15.9873 2.36417 11.8126V5.97323L8.49326 5.98315L14.6224 5.99304L14.6334 11.7365ZM5.27887 7.37771C5.21269 7.44089 5.1468 7.54857 5.13247 7.61702C5.11815 7.68548 5.1064 9.73538 5.1064 12.1724C5.1064 16.8966 5.10063 16.7552 5.30032 16.9248C5.42389 17.0298 5.64355 17.0505 5.8141 16.9732C6.10654 16.8408 6.08869 17.1558 6.08869 12.1291C6.08869 7.22342 6.10019 7.47305 5.8671 7.32723C5.81038 7.29176 5.68223 7.26285 5.58167 7.26285C5.43432 7.26285 5.37604 7.28496 5.27887 7.37771ZM8.21061 7.35095C8.15085 7.3992 8.08176 7.47707 8.05712 7.524C8.02549 7.58432 8.01235 8.93438 8.01235 12.1285C8.01235 17.1559 7.9945 16.8408 8.28694 16.9732C8.45749 17.0505 8.67716 17.0298 8.80072 16.9248C9.00041 16.7552 8.99464 16.8966 8.99464 12.1724C8.99464 9.73538 8.98289 7.68548 8.96857 7.61702C8.95424 7.54857 8.88835 7.44089 8.82217 7.37771C8.66529 7.22795 8.37858 7.21537 8.21061 7.35095ZM11.0575 7.39569L10.9183 7.52853V12.1057C10.9183 16.0363 10.9267 16.6984 10.9779 16.7929C11.043 16.913 11.2615 17.0306 11.4198 17.0306C11.5728 17.0306 11.792 16.8696 11.8471 16.7167C11.9114 16.5384 11.9221 7.8266 11.8582 7.60722C11.7971 7.39717 11.6113 7.26285 11.3817 7.26285C11.2258 7.26285 11.1747 7.28379 11.0575 7.39569Z"
                                      fill="#DB2C2C"
                                    />
                                  </svg>
                                </button>
                                <button type="button">
                                  <svg
                                    width="20"
                                    height="19"
                                    viewBox="0 0 20 19"
                                    fill="#ffff"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.1633 0.0522525C14.825 0.122575 14.4753 0.274861 14.1675 0.485829C14.0269 0.582245 11.3087 3.13472 8.12722 6.15803L2.34268 11.6549L1.17123 15.0251C0.526987 16.8787 -8.34203e-05 18.4467 9.90328e-09 18.5095C0.000292015 18.74 0.279992 19 0.527571 19C0.569995 19 2.20994 18.4921 4.17184 17.8714L7.73902 16.7427L13.6257 11.1499C20.0391 5.05679 19.6866 5.41644 19.9038 4.74545C19.9794 4.51195 20 4.35539 20 4.01292C20 3.67045 19.9794 3.51389 19.9038 3.28039C19.7139 2.69366 19.6027 2.5546 18.4432 1.45387C17.4152 0.478028 17.3604 0.43277 17.0142 0.274822C16.8163 0.184503 16.5253 0.084642 16.3677 0.0529652C16.0179 -0.0173968 15.4997 -0.017674 15.1633 0.0522525ZM16.3627 1.14197C16.6885 1.25767 16.8671 1.40188 17.8159 2.3154C18.7065 3.17289 18.8285 3.33908 18.8878 3.77641C18.969 4.37491 18.7921 4.79023 18.2309 5.31911L17.8532 5.67496L15.9325 3.85406L14.0118 2.03312L14.388 1.68911C14.5949 1.49988 14.8451 1.30008 14.9439 1.24512C15.3613 1.01289 15.8909 0.974403 16.3627 1.14197ZM15.153 4.61688L17.0612 6.42851L12.2641 10.9818L7.46692 15.5351L5.54794 13.7139L3.62896 11.8928L8.41572 7.349C11.0484 4.84994 13.212 2.80524 13.2236 2.80524C13.2352 2.80524 14.1034 3.62048 15.153 4.61688ZM4.77154 14.4816L6.43505 16.061L3.97474 16.8376C2.62154 17.2647 1.49423 17.6141 1.46962 17.6141C1.44497 17.6141 1.78933 16.5763 2.23476 15.3077C3.1142 12.8034 3.07878 12.9022 3.09605 12.9022C3.10264 12.9022 3.8566 13.613 4.77154 14.4816Z"
                                      fill="black"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Order;
