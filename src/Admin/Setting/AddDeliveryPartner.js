import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { useNavigate, NavLink, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import edit from "../AddOrder/icon34.svg";
import Multiselect from "multiselect-react-dropdown";
import { PermissionData } from "../../Permission";

import {
  PostAdminSettingDeliveryPartner,
  GetCategoryDetails,
  GetSettingViewPermission,
  GetSettingDeliveryboyInfo,
  PatchEditDeliveryboy,
  DeleteAdminSettingDeliverypartner,
} from "../../Redux/action/ApiCollection";
import LodingSpiner from "../../Components/LodingSpiner";
const AddDeliveryPartner = () => {
  const [adduser, setAddUser] = useState(false);
  const [edituser, SetEditUser] = useState(false);
  const [partnername, setPartnerName] = useState("");
  const [poc, setPoc] = useState("");

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [conformpassword, setConformPassword] = useState(false);

  const PostAdminSettingDeliveryPartnerData = useSelector(
    (state) =>
      state.PostAdminSettingDeliveryPartnerReducer
        .PostAdminSettingDeliveryPartnerData
  );
  const GetCategoryDetailsData = useSelector(
    (state) => state.GetCategoryDetailsReducer.GetCategoryDetailsData?.data
  );
  const GetSettingViewPermissionData = useSelector(
    (state) =>
      state.GetSettingViewPermissionReducer.GetSettingViewPermissionData?.data
  );

  const GetSettingDeliveryboyInfoData = useSelector(
    (state) =>
      state.GetSettingDeliveryboyInfoReducer.GetSettingDeliveryboyInfoData
  );
  const OrderPagesLoaderTrueFalseData = useSelector(
    (state) =>
      state.OrderPagesLoaderTrueFalseReducer?.OrderPagesLoaderTrueFalseData
  );
  const PatchEditDeliveryboyData = useSelector(
    (state) => state.PatchEditDeliveryboyReducer.PatchEditDeliveryboyData
  );

  const DeleteAdminSettingDeliverypartnerData = useSelector(
    (state) =>
      state.PostAdminSettingDeliveryPartnerReducer
        .PostAdminSettingDeliveryPartnerData
  );

  let IsAdminRole = sessionStorage.getItem("Admin_Role", false);
  let IsDeliveryBoyRole = sessionStorage.getItem("Is_delivery_boy", false);
  useEffect(() => {
    dispatch(GetSettingDeliveryboyInfo());
    if (PostAdminSettingDeliveryPartnerData?.status == 201) {
      setAddUser(false);
      //   dispatch(GetSettingDeliveryboyInfo());
    }
  }, [PostAdminSettingDeliveryPartnerData]);

  const AddUser = (e) => {
    let payload = {
      partner_name: partnername,
      poc: poc,
    };
    console.log("djhaj", payload);
    if (!partnername) {
      toast.warn("Please Enter Partner Name");
    } else {
      dispatch(PostAdminSettingDeliveryPartner(payload));
    }
  };

  const EditUserFun = (e, data) => {
    setPartnerName(data?.partner_name);
    setPoc(data?.poc);
    SetEditUser(true);
  };

  const EditSaveBtn = (e) => {
    let payload = {
      partner_name: partnername,
      poc: poc,
    };

    if (partnername != null && partnername != "") {
      dispatch(PatchEditDeliveryboy(payload));
    } else {
      toast.warn("Please Enter Partner Name");
    }
  };

  const DeleteDeliveryPartner = (e, item) => {
    let payload = {
      //   partner_name: item?.partner_name,
      partner_name: "test",
    };
    // console.log("gsdfahg",payload)
    dispatch(DeleteAdminSettingDeliverypartner(payload));
  };

  useEffect(() => {
    setPartnerName("");
    setPoc("");
  }, [adduser]);

  return (
    <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
      <Header />
      <div className="dashboard-part  ">
        <Sidebar />
        <div className="content-sec settings-sec">
          <div className="ordertittle-part">
            <h2>Delivery Boy</h2>
            <div className="btngroup">
              <button
                className="btn me-md-3 me-2"
                type="button "
                onClick={(e) => {
                  navigate("/admin/setting");
                }}
              >
                {" "}
                Back{" "}
              </button>
              {PermissionData()?.CREATE_DELIVERY_BOY ==
              "CREATE_DELIVERY_BOY" ? (
                <button
                  type="button"
                  className={`btn  ${
                    PermissionData()?.CREATE_DELIVERY_BOY ==
                    "CREATE_DELIVERY_BOY"
                      ? " "
                      : "permission_blur"
                  }`}
                  onClick={(e) =>
                    PermissionData()?.CREATE_DELIVERY_BOY ==
                    "CREATE_DELIVERY_BOY"
                      ? setAddUser((o) => !o)
                      : ""
                  }
                >
                  {" "}
                  + Add Delivery Partner{" "}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>

          <div className="employe-table">
            <table>
              <tr>
                {/* <th>DeliveryBoy_id</th> */}
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
              {PermissionData()?.VIEW_DELIVERY_BOY_DETAILS ==
              "VIEW_DELIVERY_BOY_DETAILS"
                ? GetSettingDeliveryboyInfoData?.data &&
                  GetSettingDeliveryboyInfoData?.data?.delivery_boy_info?.map(
                    (item, id) => {
                      return (
                        <tr>
                          {/* <td>{item.employee_id}</td> */}
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>
                            <div className="action-btngroup">
                              <button
                                type="button "
                                className={`btn svg-btn  ${
                                  PermissionData()?.DELETE_DELIEVERY_BOY ==
                                  "DELETE_DELIEVERY_BOY"
                                    ? " "
                                    : "permission_blur"
                                }`}
                                onClick={(e) =>
                                  PermissionData()?.DELETE_DELIEVERY_BOY ==
                                  "DELETE_DELIEVERY_BOY"
                                    ? DeleteDeliveryPartner(e, item)
                                    : ""
                                }
                              >
                                <svg
                                  width="15"
                                  height="15"
                                  viewBox="0 0 15 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M5.83818 0.0363069C5.55698 0.0957951 5.32379 0.212267 5.10436 0.402842C4.73822 0.720902 4.61087 1.06757 4.61087 1.74637V2.18409L2.50821 2.19373C0.46106 2.20313 0.402221 2.20523 0.279238 2.27391C0.0921099 2.37837 -0.0160374 2.57595 0.00193905 2.78056C0.0181106 2.96513 0.0999792 3.09117 0.278841 3.20685C0.390237 3.2789 0.436369 3.28404 0.971511 3.28404C1.39811 3.28404 1.54874 3.29502 1.55997 3.32693C1.56823 3.35053 1.72168 5.52343 1.90094 8.15563C2.10496 11.1516 2.24827 13.0441 2.28412 13.2159C2.45702 14.0447 3.10619 14.6966 3.99783 14.9368C4.2172 14.9959 4.4375 14.9999 7.5167 14.9999C11.2083 14.9999 10.9864 15.0142 11.5441 14.739C12.1985 14.416 12.6579 13.803 12.7688 13.1045C12.7891 12.9771 12.9446 10.7347 13.1144 8.12133C13.2843 5.50799 13.4298 3.35053 13.4378 3.32693C13.4487 3.29499 13.5989 3.28404 14.0258 3.28404C14.5609 3.28404 14.6071 3.2789 14.7185 3.20685C14.8912 3.09512 14.9762 2.96976 14.9968 2.79654C15.0203 2.59777 14.9132 2.39333 14.7282 2.28403L14.5918 2.20337L12.4929 2.19373L10.3941 2.18413L10.3785 1.66198C10.3653 1.22305 10.3497 1.10792 10.2805 0.939369C10.1256 0.561889 9.76805 0.232749 9.3504 0.0830672C9.14822 0.0106109 9.08812 0.00783214 7.58889 0.00121089C6.47316 -0.00372931 5.98091 0.00615105 5.83818 0.0363069ZM9.12602 1.25191C9.22995 1.36248 9.23132 1.36934 9.23132 1.77509V2.18622H7.49865H5.76598V1.77718C5.76598 1.38944 5.77075 1.36275 5.85745 1.2648C5.90777 1.20796 5.98491 1.15454 6.02892 1.14603C6.07292 1.13756 6.76407 1.13269 7.56482 1.13523L9.02073 1.13986L9.12602 1.25191ZM12.2639 3.39554C12.2641 3.43801 12.1253 5.59548 11.9554 8.18994C11.7459 11.3904 11.6298 12.9638 11.5943 13.0832C11.49 13.4341 11.1637 13.7558 10.8074 13.8586C10.6911 13.8922 9.93518 13.902 7.46255 13.902H4.26795L4.06775 13.8128C3.95766 13.7637 3.80998 13.6755 3.73956 13.6168C3.58531 13.488 3.39443 13.1597 3.36577 12.9737C3.344 12.8324 2.76991 3.64447 2.76991 3.43716V3.31835H7.5167H12.2635L12.2639 3.39554ZM4.89929 5.21381C4.83366 5.25628 4.74598 5.33457 4.70444 5.38785C4.6291 5.48446 4.62892 5.4928 4.62892 8.60162C4.62892 11.7105 4.6291 11.7188 4.70444 11.8154C4.96704 12.1522 5.40981 12.1522 5.67242 11.8154C5.74775 11.7188 5.74793 11.7105 5.74793 8.60162C5.74793 5.4928 5.74775 5.48446 5.67242 5.38785C5.54438 5.22366 5.37675 5.13662 5.18843 5.13662C5.07176 5.13662 4.98127 5.16077 4.89929 5.21381ZM7.20951 5.21381C7.14389 5.25628 7.05621 5.33457 7.01466 5.38785C6.93932 5.48446 6.93914 5.4928 6.93914 8.60162C6.93914 11.7105 6.93932 11.7188 7.01466 11.8154C7.27727 12.1522 7.72004 12.1522 7.98264 11.8154C8.05798 11.7188 8.05816 11.7105 8.05816 8.60162C8.05816 5.4928 8.05798 5.48446 7.98264 5.38785C7.85461 5.22366 7.68697 5.13662 7.49865 5.13662C7.38198 5.13662 7.29149 5.16077 7.20951 5.21381ZM9.51974 5.21381C9.45411 5.25628 9.36643 5.33457 9.32488 5.38785C9.24955 5.48446 9.24937 5.4928 9.24937 8.60162C9.24937 11.7105 9.24955 11.7188 9.32488 11.8154C9.58749 12.1522 10.0303 12.1522 10.2929 11.8154C10.3682 11.7188 10.3684 11.7105 10.3684 8.60162C10.3684 5.4928 10.3682 5.48446 10.2929 5.38785C10.1648 5.22366 9.99719 5.13662 9.80888 5.13662C9.69221 5.13662 9.60171 5.16077 9.51974 5.21381Z"
                                    fill="#DB2C2C"
                                  />
                                </svg>
                              </button>

                              <button
                                type="button "
                                className={`btn svg-btn 
                            ${
                              PermissionData()?.EDIT_DELIVERY_BOY ==
                              "EDIT_DELIVERY_BOY"
                                ? " "
                                : "permission_blur"
                            }`}
                                onClick={(e) =>
                                  PermissionData()?.EDIT_DELIVERY_BOY ==
                                  "EDIT_DELIVERY_BOY"
                                    ? EditUserFun(e, item)
                                    : ""
                                }
                              >
                                <svg
                                  viewBox="0 0 10 10"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                  <rect
                                    width="10"
                                    height="10"
                                    fill="url(#pattern0)"
                                  />
                                  <defs>
                                    <pattern
                                      id="pattern0"
                                      patternContentUnits="objectBoundingBox"
                                      width="1"
                                      height="1"
                                    >
                                      <use
                                        xlinkHref="#image0_949_22401"
                                        transform="scale(0.00195312)"
                                      />
                                    </pattern>
                                    <image
                                      id="image0_949_22401"
                                      width="512"
                                      height="512"
                                      xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAB5VSURBVHic7d17sG9nXR7wJyeH3EgwhIz1BiQiJBgL5oZKECXcYioRRzKxLU21HW2pdZx2LCCdabFTBiIzOhjtdKqlXoaLEh1DR2gMBCskMQ5gFBwEISRQck9DLhASTs7uH+vs5rA5v7Nva633fdf7+cx8xzAR1nrXvjzPuvzWPiIAsExHJXlOkjOTPCPJ05OckuT4JMcleWKSh5J8Ocl9Se5K8ncH5hNJPpTktrl3GgDYvlOT/EKSD2QI9rVdzqeS/EaSC5LsnXEdAMAmjkvyqiTXJdmf3Yf+qrkzya8n+a55lgUAHMrJSV6T5NZMF/qr5kNJXjb9EgGAdY9L8nMZ7tvPHfwb5/1Jzph2uQDACzM8oFc6+A+eh5NcluFWBAAwor1JXp/k0ZQP/FXziSTPnmj9ANCdU5PckPIBv5X5cpJ/Mc1hAIB+nJ3kjpQP9u3OW5LsmeB4AMDivSB1POi307kiydGjHxUAWLCLknwl5UN8t/OeJMeMfGwAYJEuzDLCf32uihIAAIe1tPBXAgBgE0sNfyUAAFZYevgrAQCwQS/hrwQAwAG9hb8SAED3eg1/JQCAbvUe/koAAN0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ0R/koAAJ25KMnDKR+Sm81XkrwpyelJjkxyYpKLk/x1Bfu2lXlvlAAAKtFK+N+b5Lkr1nBMkisq2EclAIAmtHLZ/4tJnrPJWo5M8rYK9nUr43YAAMUsKfzXKQEAcBhLDP91SgAAHMKSw3+dEgAAB+kh/NcpAQCQvsJ/nRIAQNda+qjfuSOvfW+S369gbVuZ9yQ5auT1A9CpHs/8N2rpSsA7kuyZ5jAA0Avh/5iWSsCvT3QMAOhAz5f9V2npdsBPT3QMAFgwZ/6rtXIl4KEkz57oGACwQMJ/c62UgL9JctxExwCABRH+W9dKCXjjVAcAgGUQ/tvXQgl4OMlpUx0AANom/HeuhRJw1WSrB6BZwn/3WigB5022egCaI/zHU3sJePd0SwegJa18zn8tyceSPGmawzCqmt8TsD/Jd063dABa0FL4r89fRgnY7Vw+4boBqFwrl/0PNTcmOXn8QzK6Wm8H3JmhoADQmZbDXwkYZ14y5aIBqE+Ll/1XjdsBO5//OumKAajKEs78N44rATubT0y7XABqscTwVwJ2PvuT/L1plwtAaUu67L9q3A7Y/vzYxGsFoKAln/lvHFcCtjf/fuqFAlBGT+GvBGx/fmvqRQIwvx4u+6+alm4HXJFyx+na6ZcIwJx6Dv/WSsCxGV5xXOIYfXqG9QEwE+HfXgm4JGWOz+1zLA6A6Qn/NkvAk1Lm2Dw4x+IAmJbwb7cEPC5ljssjcywOgOkI/7ZLwBkpc0zunWNxAExD+LdfAt6cMsfjc3MsDoDxCf/2S8B5Kfc1/PgM6wNgZD2+5GesqeVlQWcluSfljsP/nH6JAIxJ+LdfAkqH/1qSX558lQCMxmX/8abU7YBzMzyAV3r9/2rqhQIwjlbC/94M75kvvR81loBawn8tyfdMvFYARtDKZf8vJnnOgX3+zxXsz1ZmrtsBNVz2X58HMrx/AICKtRj+65SAQU3hv5bkqgnXCsAIWrrsf86KNVxWwf5tZaa6HVDTZf/1+fkJ1gnASFo+89+o1ysBtZ35ryXZn+SpI64RgBEtKfzX9VYCagz/tST/e4S1ATCBJVz2X6WX2wE1XvZfn5/axboAmMgSz/w3WvqVgFrP/NeS3JHk2B2sCYAJ9RD+65ZaAmoO/7Ukv7CNtQAwgyVf9l9labcDar7sv5bk/yY5cQvrAGAmPZ35b7SUKwG1n/mvJfnZw+w/ADPrOfzXtV4CWgj/v8kh3vx3xCEWU7sjk5yS5LQkpyd5xoH/fFKS45M8PskJSb4hyZ4iewh9Wktyd5Kbk1yX5MokH0yyr+A+1eyiJO9KclTpHdnEF5O8OMmHJ9zGZUlePeH//lhuTPKiDIGfDJf9/yR1X1rfn+T8NPrxv+OSvCTJm5LckDbukxljhrk7yesy/BzzGGf+X6+1KwEtnPmvJXnDdr4INXhqhl8afxaBb8wS5gtJfjwkfT7wt1WtPBj4sdT9wN/6XJtk77a+AoUcm+TiJFdnuGRR+sAZY8aft2S4jdcr4b+5VkpA7XNrkqds89jP7plJ/keSL6X8ATPGTD9/kD6fz3HZf+tauR1Q69yX5MxtH/UZPSvJ72R4QKj0wTLGzDuXpS/Cf/uUgJ3Nwxke2qzS2Un+OC7zG9P7XJI+CP+dUwK2Nw8nefmOjvTETsxw/88ZvzFmLcODgUv/dIDw3z0lYGuz7fCf62Gci5O8J8kL0+e9P+DrnZDh2Z8Pld6RiVyY5A+THF16RzZxX4aPWv9F6R1Z4ZoML7F5fukdqdgjGa6o/VHpHTnYk5N8IOWbkTGmzrkzy/xUgDP/8bkScOip8rL/D2d4CUjpg2OMqXt+IMsi/KejBHzt7Cr8p2jej8vwhO/lWf79PWD37k1yVemdGInL/tNyO+Ax1V32/+Yk16d8KzLGtDPXZxmc+c+n9ysB1V32/44kn0n5A2OMaWvuTPuE//x6LQHVhf/fz/CRntIHxhjT3jyStgn/cnorAdWF/w9m+MYqfWCMMW1OywVA+JfXSwmoLvxfkOShlD8wxph25460SfjXY+kloLrwf1ba+HOIxpi657q0R/jXZ6klYLLw3+nHAJ+W4QU/J4+4L0Cf3pnhz4C3wkf96rTEjwhW91G/b0zyqZRvRcaYZcx5aYcz//ot5UpAdZf9H5fhcl3pA2OMWcbcnnZeBSz829F6Cagu/JPkzSl/YIwxy5mfTxuEf3taLQFVhv+FSfan/MExxixjPp/k2NRP+LertRJQZfg/Of6wjzFmvNmf5EdTv4sy/FIufbw2m3uTnDPRMWjdb6X812cr83CG77eqHJHh6crSB8cYs5z5T6mfM//2nZnknpT/Gm02VZ75J8krU/7gGGOWM29Psid1E/7tE/679IQkt6b8ATLGtD/7k7wpwn+sEf6rCf8RXJ7yB8gY0/7cnORHUj/h3z7hP4KzkuxL+YNkjGl3bk3yb1P/W/MS4b8Ewn8b9h7m3/1i2nlBB1Del5Pcn+FNodcnuTLJDRku/dfO633bd2aS9yU5qfSObKK61/tu9N1p5zP/NyX5zST/Msn5SZ6a5IkZPr0AsBln/u1z5j+i30/5A3W4+UyS1yd5+kTrB/og/Nsn/Ed0epJHU/5gHWpuTHJp3JoAdk/4t0/4j+ytKX+wNs5tGd5H4LI+MAbh3z7hP7ITkjyY8gfs4Hlbkm+YctFAV4R/+4T/BH4i5Q/YwQfupyZdLdAb4d8+4T+RWt75/2CSl068VqAvwr99wn8iT0kdD/89kOR7Jl4r0Bfh3z7hP6HXpo4D96KpFwp0Rfi3T/hP7E9T/uD99NSLBLoi/Nsn/Cd2TJKHUvbg/d7kqwR6IvzbJ/xn8KKUPXi3Jzlx8lUCvRD+7RP+M3lDyh7AV06/RKATwr99wn9G16fcAfxovOEPGIfwb5/wn9GelL3//4rplwh0QPi3T/jP7NSUO4g3ZSggALsh/Nsn/Au4IOUO5C/OsD5g2YR/+4R/IT+XcgfztBnWByyX8G+f8C/ov6TMwbxljsUBiyX82yf8C3tvyhzQt86xOGCRhH/7hH8FrkuZg/ozcywOWBzh3z7hX4mPpcyBfeEciwMWRfi3T/hX5LMpc3BPnWNxwGII//YJ/8qU+mKcNMfigEUQ/u0T/hV6OGUO8lFzLA5onvBvn/CvVKkDDbAZ4d8+4V8xBQCokfBvn/CvnAIA1Eb4t0/4N0ABAGoi/Nsn/BuhAAC1EP7tE/4NUQCAGgj/9gn/xigAQGnCv33Cv0EKAFCS8G+f8G+UAgCUIvzbJ/wbpgAAJQj/9gn/xikAwNyEf/uE/wIoAMCchH/7hP9CKADAXIR/+4T/gigAwByEf/uE/8IoAMDUhH/7hP8CKQDAlIR/+4T/QikAwFSEf/uE/4IpAMAUhH/7hP/CKQDA2IR/+4R/BxQAYEzCv33CvxMKADAW4d8+4d8RBQAYg/Bvn/DvjAIA7Jbwb5/w75ACAOyG8G+f8O+UAgDslPBvn/DvmAIA7ITwb5/w75wCAGyX8G+f8EcBALZF+LdP+JNEAQC2Tvi3T/jz/ykAwFYI//YJf76GAgBsRvi3T/jzdRQA4HCEf/uEP4ekAACrCP/2CX9WUgCAQxH+7RP+HJYCAGwk/Nsn/NmUAgAcTPi3T/izJQoAsE74t0/4s2UKAJAI/yUQ/myLAgAI//YJf7ZNAYC+Cf/2CX92RAGAfgn/9gl/dkwBgD4J//YJf3ZFAYD+CP/2CX92TQGAvgj/9gl/RqEAQD+Ef/uEP6NRAKAPwr99wp9RKQCwfMK/fcKf0SkAsGzCv33Cn0koALBcwr99wp/JKACwTMK/fcKfSSkAsDzCv33Cn8kpALAswr99wp9ZKACwHMK/fcKf2SgAsAzCv33Cn1kpANA+4d8+4c/sFABom/Bvn/CnCAUA2iX82yf8KUYBgDYJ//YJf4pSAKA9wr99wp/iFABoi/Bvn/CnCgoAtEP4t++sCH8qoQBAG4R/+4Q/VVEAoH7Cv33Cn+ooAFA34d8+4U+VFACol/Bvn/CnWgoA1En4t0/4UzUFAOoj/Nsn/KmeAgB1Ef7tE/40QQGAegj/9gl/mqEAQB2Ef/uEP01RAKA84d8+4U9zFAAoS/i3T/jTJAUAyhH+7RP+NEsBgDKEf/uEP01TAGB+wr99wp/mKQAwL+HfPuHPIigAMB/h3z7hz2IoADAP4d8+4c+iKAAwPeHfPuHP4igAMC3h3z7hzyIpADAd4d8+4c9iKQAwDeHfPuHPoikAMD7h3z7hz+IpADAu4d8+4U8XFAAYj/Bvn/CnGwoAjEP4t0/4j+/IJM9P8stJbkhyZ5J9SR498M83JPmVJD944P+XGSkAsHvCv33Cf1zHJnlthpDf6truTvK6JMcV2N8uKQCwO8K/fcJ/XBcn+Xx2vs4vJLlk9r3ukAIAOyf82yf8x3NEktcn2Z9x1vyWuC0wKQUAdkb4t0/4j2dPkndk/LVfceB/mwmU+oaGlgn/9gn/cb0h0x2Dy2ZcR1dKfVNDq4R/+4T/uF6R8S77rxrPBEyg1Dc2tEj4t0/4j+uYJLdk+uPxhSSPn2lN3Sj1zQ2tEf7tE/7je03mOy6vm2lN3Sj1DQ4tEf7tE/7j25Pk9sx3bO6KTwWMqtQ3ObRC+LdP+E/jeZn/GP3ALCvrRKlvdGiB8G+f8J/OmzP/cfqVWVbWiVLf7FA74d8+4T+tazP/sfrzWVbWiVLf8FAz4d8+4T+92zL/8bprlpV1otQ3PdTqH2T4pVw6GDabe5OcO9ExaN25GY5P6a/RZvNwkosmOgZzeCjzH7OvzrKyTpT6xocanZXkgZQPhs3Gmf9qzvznsy9ljp1PAoyk1Dc/1OYJST6X8sGw2TjzX82Z/7wUgMaV+gGA2vxaygfDZuPMfzVn/vNTABpX6ocAavK0lPtlttVx5r+aM/8yFIDGlfpBgJpcnvLhcLhx5r+aM/9yFIDGlfphgFocmboDxJn/as78y1IAGlfqBwJq8b0pHxCrxpn/as78y1MAGlfqhwJqMedfM9vOOPNfzZl/HRSAxpX6wYBavCvlg2LjOPNfzZl/PRSAxpX64YBa3JTyYXHwCP/VhH9dFIDGlfoBgRqclGR/ygfG+gj/1YR/fRSAxpX6IYEavDjlA2N9hP9qwr9OCkDjSv2gQA1em/KhsRbhfzjCv14KQONK/bBADWp4AFD4ryb866YANK7UDwzUoPQDgMJ/NeFfPwWgcaV+aKC00g8ACv/VhH8bFIDGlfrBgdJKPgAo/FcT/u1QABpX6ocHSiv5BsDnzbC+FnnDX1sUgMaV+gGC0ko9AHhPkiNmWF9rnPm3RwFonAJAr0o9AHjVHItrjPBvkwLQsD2ldwAKOSnJKYW2/ZFC263VWUmuzvA1qdkjSS5J8keldwTGoADQq7NT7jK8AvAY4Q+FKAD06uyC21YABsIfCvMMAD3yAGBZ7vkvg2cAGqcA0CMPAJYj/JdDAWiYWwD0yAOA5bjsD5VQAOiRBwDLEP5QEQWAHnkAcH7CHyrkGQB64wHAebnnv1yeAWicAkBvPAA4H+G/bApAw9wCoDceAJyPy/5QMQWA3ngAcB7CHyqnANAbDwBOT/hDIzwDQE88ADgt9/z74hmAxikA9MQDgNMR/v1RABrmFgA98QDgdFz2h8YoAPTEA4DTEP7QIAWAnngAcHzCHxrmGQB6UeoBwLvnWFwB7vnjGYDGKQD0wgOA4xH+JApA09wCoBceAByPy/6wAAoAvfAA4DiEPyyEAkAvSj4A+OGC2x6T8IeF8QwAPfAA4O6458+heAagcQoAPfAA4M4Jf1ZRABrmFgA98ADgzrnsDwulANADDwDujPCHBVMA6IEHALdP+EMHPAPA0nkAcHvc82erPAPQOAWApfMA4NYJf7ZDAWiYWwAsnQcAt85lf+iIAsDSeQBwa4Q/dEYBYOnOKrjtjxbc9nZ8f5L3p43wvzjCH0axt/QOwMTOKbTde5J8ttC2D+dbMlwVWZ/nJPnGonu0Netn/u8uvSOwFAoAS1fqI4A1XP5vNew3ctkfJqAAsGQ9PQC4lLDfSPjDRBQAlmypDwAuNew3Ev4wIQWAJVvCGwB7CfuNhD9MTAFgyUoVgHuS3LKD/16vYb+R8IcZKAAsWc0PAAr7QxP+MBMFgKWq6QFAYb81wh9mpACwVGel3AOAJyZ5Yx4L/NpfsFOD9Zf8+Jw/zEQBYKlKvQAoSV5VcNst8pIfKMCrgFmqkp8AYOtc9odCFACWquQVALZG+ENBCgBLdFKSp5beCQ5L+ENhCgBLVPINgGxO+EMFFACWyP3/egl/qIQCwBIpAHUS/lARBYAl8gBgfYQ/VEYBYGk8AFgf4Q8VUgBYGg8A1kX4Q6UUAJbG/f96CH+omALA0igAdRD+UDkFgKXxAGB5wh8aoACwJB4ALE/4QyMUAJbEA4BlCX9oiALAkpxVegc69mCSH43wh2bsLb0DMKLvLL0DnbolycuT3Fh6R4CtcwWAJXla6R3ozKNJ3pLkuyL8oTmuALAkjy+9A524O8nvJvnVJDeX3RVgpxQAYDM3JflIkg8n+cCBf95fdI+AXVMAWJI7Su/AAtyWIeDX58+T3FV0j4BJKAAsyU2ld6Ax62f2B8+9RfcImI0CwJJcl+RVpXeiUs7sga9xRJK1gtuGMX1Tks9HsXVmz1z2JTmywHb3ZvgUCrugALA0f5zkwtI7MSNhT0kKQMMUAJbmeUk+WHonJuIyPrVRABqmALBES7gK4MyeFigADVMAWKJvTfKxJE8svSNb5MyeVikADVMAWKoLk1yZ+h4IdGbPkigADVMAWLJLk7w1ZX5BJcKe5VMAGqYAsHQ/nOG99SdOvB1hT48UgIYpAPTglCS/lOQVGef7TtjDQAFomAJAT85J8h+SvCTJ0Vv87wh7WE0BaJgCQI+OT/LSJN+f5NsyvEHw6CS3H5hPR9jDVigADVMAANgpBaBhe0rvAAAwPwUAADqkAABAhxQAAOiQAgAAHVIAAKBDCgAAdEgBAIAOKQAA0CEFAAA6pAAAQIcUAADokAIAAB1SAACgQwoAAHRIAQCADikAANAhBQAAOqQAAECHFAAA6JACAAAdUgAAoEMKAAB0SAEAgA4pAADQIQUAADqkAABAhxQAAOiQAgAAHVIAAKBDCgAAdEgBAIAOKQAA0CEFAAA6pAAAQIcUAADokAIAAB1SAACgQwoAAHRIAQCADikAANAhBQAAOqQAAECHFAAA6JACAAAdUgAAoEMKAAB0SAEAgA4pAADQIQUAADqkAABAhxQAAOiQAgAAHVIAAKBDCgAAdEgBAIAOKQAA0CEFAAA6pAAAQIcUAADokAIAAB1SAACgQwoAAHRIAQCADikAANAhBQAAOqQAAECHFAAA6JACAAAdUgAAoEMKAAB0SAEAgA4pAADQIQUAADqkAABAhxQAAOiQAgAAHVIAAKBDCgAAdEgBAIAOKQAA0CEFAAA6pAAAQIcUAADokAIAAB1SAACgQwoAAHRIAQCADikAANAhBQAAOqQAAECHFAAA6JACAAAdUgAAoEMKAAB0SAEAgA4pAADQIQUAADqkAABAhxQAAOiQAgAAHVIAAKBDCgAAdEgBAIAOKQAA0CEFAAA6pAAAQIcUAADokAIAAB1SAACgQwoAAHRIAQCADikAANAhBQAAOqQAAECHFAAA6JACAAAdUgAAoEMKAAB0SAEAgA4pAADQIQUAADqkAABAh/YkeaTQto8qtF0Adm9vkiMLbHdfkkcLbHdx9iR5sNC2jy+0XQB274RC232g0HYXZ0+S+wtt+8RC2wVg90r9DlcARlLyCsC3F9ouALv3tELbVQBGsiflDuZphbYLwO6V+h2uAIxkT5L7Cm373ELbBWD3zim03VKZtTh7ktxUaNvnF9ouALv3gkLb/Uyh7S7OniSfLLTtJyd5ZqFtA7Bzz0zy1ELb/lSh7S5OyQKQJP+o4LYB2Jl/XHDbf1tw24tzSpK1QnNzyrxIAoCdOTLJZ1MuN06dfon92JPkyyn3xbxk+iUCMJJLUi4vHoqTxtFdl3Jf0L9KcsT0SwRgl47I8Du7VF5cN/0S+7H+x4CuKbgPz0ryEwW3D8DW/GSG39mllMyqxTo/5RrdWpI7k5w0+SoB2KmTMvyuLpkVPj4+gWMy3Fsp+YV91+SrBGCn3p6yGfFQkmMnX2WnrknZL+5akp+ZfJUAbNe/Tvl8eP/kq+zYq1P+C/xIkh+aeqEAbNkPZfjdXDof/t3UC+3ZtyV5NOW/yA8mee7EawVgc9+X4Xdy6Vx4NENGMaH3pfwXei3Jl5JcOPFaAVjtRUnuT/k8WEty9cRrJcmlKf+FXp9HMtx3AmBeP5s6Lvuvz6XTLpckOT51XO45eN4VHxEEmMOTklyR8r/3D54HM2QTM/jNlP+Cb5y7kvyzeGMgwBSOSPLPM/yuLf37fuP89wnXzQbfkWRfyn/RDzUfz3ApaO9kqwfox54kL0vykZT//X6o2ZfktMlWzyG9M+W/8IebW5K8IckZUx0AgAU7I8Pv0FtS/vf54eadUx0AVl9Sf1aSGw/z72vyfzK8xOjDST6Z4U8M353hvtEj5XYLoKijMtw7PznDn30/Lck5GV6n28JH6taSfHeSvy69I0t1uIC/MslFc+0IABzkyiQvL70TS3a4AvDsDGfV7rcDMKd9Ga5W/FXpHVmyIw/z7+7I8JGQ751pXwAgSX41yW+X3oml2+we/wlJPpHkW2fYFwC4PcnpSe4rvSNLt2eTf/9A/AEGAObzbyL8Z7HVp/yvzvBeaACYyvuSvLj0TvRiqwXgm5L85YH/CwBjuyvJmUm+UHpHerHZLYB1tyf5yST7J9wXAPq0P8k/ifCf1eE+BbDRp5Mcm+R5E+0LAH16Y5L/VnonerPdN/3tTfKBKAEAjOODGd5OuK/0jvRmJ6/6PTnJh+IPNACwO59Jcl6G984ws52+6//UJNcm+eYR9wWAftyZ4Wry35XekV5t9SHAjT6b5CVJ7h1xXwDow/1JLojwL2qnBSBJPp7hDzU8NNK+ALB8X0nyIxk+Wk5BuykASfJnGR7euGeEfQFg2R7M8Fdm/7TwfpCdPwOw0RlJ/lfa+BvTAMzv9iQXxpl/NcYqAElySoYS4NMBABzspiQvzfA+GSqx21sAB7s5yfMz3BYAgGTIhO+L8K/Odt4EuBVfSvK7SdYylIExrzAA0I61JJcneWWGvyxLZaYM6POTvC3+gBBAb+5OcmmS95beEVYb8xbARtckOTvJn0y4DQDqcnWSZ0f4V2/KApAkt2Z48OOiJJ+beFsAlHNbkn+a4Xf+rYX3hS0Y+xmAVT6V5DeSfDXJc2fcLgDT2pfk15L8WJK/KLwvbMOcQfzVDC9/eHeGvyFwWjwkCNCqtSRXJvmHSX47ycNld4ftKhnAZyR5TYZvnr0F9wOArduf5D1J/mOSjxbeF3ahhjPwpyd5dZIfT3J84X0B4NAeTPJ7SS6LP+KzCDUUgHXHJHlZho+OXBBXBQBK25/k+iS/k+TtGUoAC1FTATjYt2S4NXBBkvOSHFt2dwC68VCSazO82v0d8UT/YtVaAA52dIbXSJ5/YM5MclzRPQJYjocy3Mu/5sBcHw/0daGFArDREUmekuQZGT5JcHqSb0/yhAzPEJyQ5MQD/3xUoX0EKO2RDJfsv5jhVbwPJrk/wx/m+dskn8zwEe3PZXiin878P4qS4ak+Cqc/AAAAAElFTkSuQmCC"
                                    />
                                  </defs>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )
                : ""}
            </table>
          </div>
        </div>
      </div>
      {/* ===================== Add user poup========================== */}
      {adduser && (
        <div className="popupouter deliverypartneraction-popup">
          <div className="popupinner">
            <h2>Add Delivery Partner</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => setAddUser((o) => !o)}
            >
              <svg
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="popup-body">
              <div className="col-sm-12">
                <label>Partner Name</label>
                <input
                  maxLength={40}
                  type="text"
                  className={`form-control  ${partnername ? "" : ""} `}
                  placeholder="Enter Partner Name"
                  value={partnername}
                  onChange={(e) => setPartnerName(e.target.value)}
                />
              </div>
              <div className="col-sm-12">
                <label>Point of Contact(POC)</label>
                <input
                  maxLength={40}
                  type="text"
                  className={`form-control  ${poc ? "" : ""} `}
                  placeholder="Enter POC"
                  value={poc}
                  onChange={(e) => setPoc(e.target.value)}
                />
              </div>
              <div className="btngroups text-end my-3 col-12">
                <button
                  type="button"
                  className="btn save-btn"
                  onClick={(e) => AddUser(e)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={(e) => setAddUser((o) => !o)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===============================Edit employee========================================== */}

      {edituser && (
        <div className="popupouter deliverypartneraction-popup">
          <div className="popupinner">
            <h2>Edit Delivery Boy User</h2>
            <div
              className="close-btn"
              type="button"
              onClick={(e) => SetEditUser(false)}
            >
              <svg
                viewBox="0 0 10 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.31053 4.37167L0.19544 0H1.47666L4.97286 3.80037L8.46906 0H9.73941L5.65689 4.37167L10 9H8.70793L4.97286 4.95952L1.2595 9H0L4.31053 4.37167Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="popup-body">
              <div className="col-sm-12">
                <label>Partner Name</label>
                <input
                  maxLength={40}
                  type="text"
                  className={`form-control  ${partnername ? "" : ""} `}
                  placeholder="Enter Partner Name"
                  value={partnername}
                  onChange={(e) => setPartnerName(e.target.value)}
                />
              </div>
              <div className="col-sm-12">
                <label>Point of Contant(POC)</label>
                <input
                  maxLength={40}
                  type="text"
                  className={`form-control  ${poc ? "" : ""} `}
                  placeholder="Enter POC"
                  value={poc}
                  onChange={(e) => setPoc(e.target.value)}
                />
              </div>
              <div className="btngroups text-end my-3">
                <button
                  type="button"
                  className="btn save-btn"
                  onClick={(e) => EditSaveBtn(e)}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn cancel-btn"
                  onClick={(e) => SetEditUser(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <LodingSpiner loadspiner={OrderPagesLoaderTrueFalseData} />
    </div>
  );
};

export default AddDeliveryPartner;