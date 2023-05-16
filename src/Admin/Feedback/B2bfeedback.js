import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetSettingViewB2bFeedback,
  DeleteSettingDismissTicket,
  PostGetFeedback,
} from "../../Redux/action/ApiCollection";
import { isTomorrow } from "date-fns";
import { PermissionData } from "../../Permission";
import { reactLocalStorage } from "reactjs-localstorage";


function B2bfeedback() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let IsAdminRole=reactLocalStorage.get("Admin_Role",false)
  const[date, setDate]= useState("")

  const [oldnewdata, setOldNewData] = useState(true);
  const [getsettingviewalldata, setGetSettingViewAllData] = useState("");
  const [seefeedback, setSeeFeedback] = useState(false);
  const [popupshowalldata, setPopUpShowAllData] = useState();

  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );

  const GetSettingViewB2bFeedbackData = useSelector(
    (state) =>
      state.GetSettingViewB2bFeedbackReducer.GetSettingViewB2bFeedbackData?.data
  );
  const DeleteSettingDismissTicketData = useSelector(
    (state) =>
      state.DeleteSettingDismissTicketReducer.DeleteSettingDismissTicketData
        ?.data
  );
  const PostGetFeedbackData = useSelector(
    (state) =>
      state.PostGetFeedbackReducer.PostGetFeedbackData
        ?.data
  );

  useEffect(() => {
    dispatch(GetSettingViewB2bFeedback());
  }, []);

  const DeleteTicket = (e, data) => {
    let payload = {
      id: data.feedback_id,
    };
    dispatch(DeleteSettingDismissTicket(payload));
  };

  const TicketChangeFun = (e) => {
    // if (e.target.value == "close") {
    //   navigate("/admin/support/b2b/b2bclose")
    // }
  };

  const CustomerChangeFun = (e) => {
    if (e.target.value == "b2cc") {
      navigate("/admin/setting/b2cfeedback");
    }
  };

  const rate = (loop) => {
    const countArray = [];
    for (let i = 0; i < Number(loop); i++) {
      countArray.push("star");
    }
    return countArray;
  };

  const NewOldFun = (e) => {
    if (e.target.value == "OLDEST") {
      let AllData = getsettingviewalldata
        .slice(Math.max(getsettingviewalldata.length - 5, 0))
        .map((item, id) => {
          return item;
        });
      setGetSettingViewAllData(AllData);
    } else {
      setOldNewData(true);
      setGetSettingViewAllData(GetSettingViewB2bFeedbackData?.info);
    }
  };

  useEffect(() => {
    GetSettingViewB2bFeedbackData &&
      setGetSettingViewAllData(GetSettingViewB2bFeedbackData?.info);
  }, [GetSettingViewB2bFeedbackData]);

  const data = [
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "1",
    },
    {
      data: "displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "2",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "3",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "4",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "5",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "6",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "7",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "8",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "9",
    },
    {
      data: "Our pagination hook must return the range of numbers to be displayed in our pagination component as an array.The computation logic needs to re-run when either  currentPage, pageSize, siblingCount, or totalCount change The total number of items returned by the hook should remain constant. This will avoid resizing our pagination component if the length of the range array changes while the user is interacting with the component Keeping the above things in mind lets create a file called usePagination.js in our project src folder and start with the implementation.",
      id: "11",
    },
  ];

  const ShowFeedbackDataFun = (e, itemData) => {
    setSeeFeedback((o) => !o);
    setPopUpShowAllData(itemData.description);
    setDate(itemData.date)
  };



  useEffect(()=>{
    let payload={
      "user_type":"b2b"
  }
  dispatch(PostGetFeedback(payload))
  },[])
  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className="dashboard-part  ">
          <Sidebar />
          <div className="content-sec support-page">
            <div className="title">
              <h2>Feedback</h2>
              <select
                className=" form-select"
                onChange={(e) => CustomerChangeFun(e)}
              >
                <option value="b2bb">B2B</option>
               {IsAdminRole==="true"?<option value="b2cc">B2C</option>:""}
              </select>
            </div>

            <div className="sptitle">
              <div className="select-box">
                <select
                  className=" form-select"
                  // onChange={(e) => TicketChangeFun(e)}
                >
                  <option value="new" className="px-3">
                    New Tickets
                  </option>
                  <option value="close" className="px-3">
                    Close Tickets
                  </option>
                </select>
              </div>
              <div className="select-box">
                <span>SORT BY : </span>
                <select
                  className=" form-select"
                  //   onChange={(e) => NewOldFun(e)}
                >
                  <option className="px-3">NEWEST </option>
                  <option className="px-3">OLDEST</option>
                </select>
              </div>
            </div>
            <ul className="support-list ">
            {PermissionData()?.VIEW_B2B_FEEDBACK == "VIEW_B2B_FEEDBACK" ?
            PostGetFeedbackData &&
                PostGetFeedbackData?.info?.map((item, id) => {
                  return (
                    <li>
                      <div className="left-part">
                        <img src="/images/user.png" alt="img" />
                        <div>
                        <h4>{item.username}</h4>
                          <h3>{item.company_name}</h3>
                          <p>#{item.product_order_id}</p>
                        </div>
                      </div>
                      <div className="right-part">
                      <button className="btn dot-btn" type="button">
                          <svg
                            viewBox="0 0 16 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M1.18121 3.53495C0.891647 3.4721 0.697355 3.36821 0.472144 3.15574C0.15145 2.8532 0 2.50494 0 2.07003C0 1.63224 0.151238 1.28708 0.4783 0.978543C1.07359 0.416918 1.97143 0.433186 2.55721 1.0162C3.15041 1.60662 3.15041 2.53345 2.55721 3.12387C2.32722 3.35279 2.06444 3.49172 1.75351 3.54889C1.499 3.59565 1.45623 3.59463 1.18121 3.53495ZM7.27762 3.55196C6.49246 3.41472 5.9225 2.62795 6.04748 1.85385C6.1798 1.0343 6.9548 0.457782 7.75206 0.585882C8.7503 0.746235 9.31538 1.78673 8.89804 2.69606C8.61633 3.30984 7.93907 3.66757 7.27762 3.55196ZM13.2665 3.5394C13.1594 3.51618 12.9923 3.45883 12.895 3.41197C12.6534 3.29552 12.3298 2.96585 12.2181 2.72246C11.9437 2.12466 12.0569 1.47058 12.5135 1.0162C13.0992 0.433221 13.9971 0.416954 14.5924 0.978543C14.9195 1.28708 15.0707 1.63224 15.0707 2.07003C15.0707 2.50494 14.9192 2.8532 14.5985 3.15574C14.3688 3.37252 14.1799 3.47164 13.873 3.53654C13.596 3.59512 13.5251 3.59544 13.2665 3.5394Z"
                              fill="#C8C8C8"
                            />
                          </svg>
                        </button>
                        <span className=" star-svg me-2"> 
                          {rate(item?.rating).map((item, id) => { 
                            return <svg
                              viewBox="0 0 10 10"

                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.29114 2.12099C3.69512 3.62238 3.67239 3.67567 3.62821 3.6754C3.52252 3.67472 0.529479 3.87303 0.466926 3.88485L0.398438 3.89778L1.64944 4.96274C2.33747 5.54846 2.90042 6.03818 2.90042 6.05102C2.90042 6.06387 2.71715 6.79537 2.49314 7.67661C2.26914 8.55784 2.08811 9.2811 2.09084 9.28386C2.09358 9.28659 2.73081 8.88626 3.50691 8.3942L4.91799 7.49957L6.33036 8.39493C7.10715 8.88738 7.74455 9.2883 7.74679 9.28586C7.74992 9.28245 7.24799 7.29621 6.96757 6.20242L6.92525 6.03732L8.18305 4.96755L9.44085 3.89778L9.37272 3.88485C9.31025 3.87298 6.31863 3.6749 6.21011 3.67545C6.16374 3.67568 6.14922 3.64168 5.54577 2.1211C5.20647 1.26609 4.92422 0.566477 4.91859 0.566406C4.91294 0.566353 4.63059 1.26591 4.29114 2.12099Z"
                                fill="#FFC900"
                              />

                            </svg>
                          })} 
                           
                          {rate(5-item?.rating).map((item, id) => {
                            return <svg viewBox="50 0 10 10"

                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M54.5255 2.12099C53.9295 3.62238 53.9068 3.67567 53.8626 3.6754C53.7569 3.67472 50.7639 3.87303 50.7013 3.88485L50.6328 3.89778L51.8838 4.96274C52.5718 5.54846 53.1348 6.03818 53.1348 6.05102C53.1348 6.06387 52.9515 6.79537 52.7275 7.67661C52.5035 8.55784 52.3225 9.2811 52.3252 9.28386C52.328 9.28659 52.9652 8.88626 53.7413 8.3942L55.1524 7.49957L56.5647 8.39493C57.3415 8.88738 57.9789 9.2883 57.9812 9.28586C57.9843 9.28245 57.4824 7.29621 57.2019 6.20242L57.1596 6.03732L58.4174 4.96755L59.6752 3.89778L59.6071 3.88485C59.5446 3.87298 56.553 3.6749 56.4445 3.67545C56.3981 3.67568 56.3836 3.64168 55.7801 2.1211C55.4408 1.26609 55.1586 0.566477 55.153 0.566406C55.1473 0.566353 54.865 1.26591 54.5255 2.12099Z"
                                fill="#DFDFDF"
                              />
                            </svg>
                          })}
                        </span>
                        <span>{item.date}</span>
                        
                      {item.description.length <= 40 ? <p className="mt-2"> {item.description}</p> :<p className="mt-2">
                          {item?.description.substring(0, 150)}
                          <span>
                            {" "}
                            ....
                            <span
                              className="text-primary"
                              role="button"
                              onClick={(e) => ShowFeedbackDataFun(e, item)}
                            >
                              more
                            </span>
                          </span>
                          {/* {data[0]?.data.length===100} */}
                        </p> }

                       
                      </div>
                    </li>
                  );
                })
              :""}
            </ul>
          </div>
        </div>
        {/* {**************************** feedback popup **********************************} */}

        {seefeedback && (
          <div className="popupouter feedback-popup">
            <div className="popupinner">
              <h2>John Doe</h2>
              <div
                className="close-btn"
                type="button"
                onClick={(e) => setSeeFeedback((o) => !o)}
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
                <h6>{popupshowalldata}</h6>
                <p className="text-end mb-0">{date}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default B2bfeedback;
