import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetSettingViewB2cFeedback , DeleteSettingDismissTicket , PostTicketDetail,   DeleteSupportTicket
} from "../../Redux/action/ApiCollection";
import { isTomorrow } from "date-fns";
import { PermissionData } from "../../Permission";
import { reactLocalStorage } from "reactjs-localstorage";
const  B2B=()=> {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldnewdata, setOldNewData] = useState(true)
  const [getsettingviewalldata, setGetSettingViewAllData] = useState("")
  const ToggleFunData = useSelector(
    (state) => state.ToggleSideBarReducer.ToggleSideBarData
  );
  const GetSettingViewB2cFeedbackData = useSelector(
    (state) =>
      state.GetSettingViewB2cFeedbackReducer.GetSettingViewB2cFeedbackData?.data
  );
  const DeleteSettingDismissTicketData = useSelector(
    (state) =>
      state.DeleteSettingDismissTicketReducer.DeleteSettingDismissTicketData?.data
  );
  const PostTicketDetailData = useSelector(
    (state) =>
      state.PostTicketDetailReducer.PostTicketDetailData
        ?.data
  );
  const DeleteSupportTicketData = useSelector(
    (state) =>
      state.DeleteSupportTicketReducer.DeleteSupportTicketData
        ?.data
  );
  useEffect(() => {
    let payload= {
      "user_type":"b2c",
      "ticket_type":"active_ticket"
  }
  dispatch(PostTicketDetail(payload))
}, []);
const DeleteTicket = (e, data) => {
  let payload = {
    id: data.feedback_id,
  };
  dispatch(DeleteSupportTicket(payload));
  let payloadd = {
    user_type: "b2c",
    ticket_type: "active_ticket",
  };
  dispatch(PostTicketDetail(payloadd));
};
const TicketChangeFunn =(e)=>{
  if(e.target.value=="close"){
    navigate("/admin/support/b2b/b2cclose")
  }
}
const CustomerChangeFun = (e) =>{
    if(e.target.value=="b2b"){
        navigate("/admin/support/b2b")    
      }
}
const rate = (loop) => {
  const countArray = []
  for (let i = 0; i < Number(loop); i++) {
    countArray.push('star')
  }
  return countArray
}
const NewOldFun = (e) => { 
  if (e.target.value == "OLDEST") { 
    let AllData = getsettingviewalldata?.slice(Math.max(getsettingviewalldata?.length - 5, 0))?.map((item, id) => { 
      return item
    })
    setGetSettingViewAllData(AllData)
  }
  else {
    setOldNewData(true)
    setGetSettingViewAllData(GetSettingViewB2cFeedbackData?.info) 
  }
}
useEffect(() => {
  GetSettingViewB2cFeedbackData && setGetSettingViewAllData(GetSettingViewB2cFeedbackData?.info)
}, [GetSettingViewB2cFeedbackData])
  return (
    <>
      <div className={`${ToggleFunData ? "collapsemenu" : ""}`}>
        <Header />
        <div className="dashboard-part  ">
          <Sidebar />
          <div className="content-sec support-page">
            <div className="title">
              <h2>Tickets</h2>
              <select className=" form-select" onChange={(e)=>CustomerChangeFun(e)}>
              <option value="b2c">B2C</option>
                <option value="b2b">B2B</option>
              </select>
            </div>

            <div className="sptitle">
              <div className="select-box">
                <select className=" form-select" onChange={(e)=>TicketChangeFunn(e)}>
                  <option value="new" className="px-3">New Tickets</option>
                  <option value="close"  className="px-3">Close Tickets</option>
                 </select>
              </div>
              <div className="select-box">
                <span>SORT BY : </span>
                <select className=" form-select"
                  onChange={(e) => NewOldFun(e)}>
                  <option className="px-3" >NEWEST </option>
                  <option className="px-3">OLDEST</option>

                </select>
              </div>
            </div>

            <ul className="support-list">
              {PermissionData()?.VIEW_B2C_TICKETS == "VIEW_B2C_TICKETS" ?
              PostTicketDetailData &&
                PostTicketDetailData?.info?.map((item, id) => {
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
                        <p className="mt-2">
                         {item.description}
                        </p>

                        <div className="d-lg-flex flex-lg-wrap justify-content-lg-between">
                          {/* <div className="">
                            <button className="btn mail-btn" type="button">
                              <svg
                                viewBox="0 0 10 7"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.26669 0.0178526C0.974869 0.0789949 0.7268 0.34912 0.670244 0.667347C0.646377 0.801566 0.646377 5.72447 0.670244 5.85869C0.728143 6.18445 0.974699 6.44752 1.28 6.50929C1.40655 6.5349 8.60281 6.5349 8.72935 6.50929C9.03466 6.44752 9.28121 6.18445 9.33911 5.85869C9.36298 5.72447 9.36298 0.801566 9.33911 0.667347C9.28121 0.341593 9.03466 0.0785234 8.72935 0.0167462C8.61556 -0.00628867 1.37675 -0.0052186 1.26669 0.0178526ZM6.98537 2.13161C5.96596 3.21354 5.45986 3.73828 5.39595 3.77964C5.15772 3.93372 4.85163 3.93372 4.61341 3.77964C4.54949 3.73828 4.04339 3.21354 3.02398 2.13161L1.52835 0.544246H5.00468H8.48101L6.98537 2.13161ZM2.68422 2.53635L3.36412 3.26304L2.51423 4.17109C2.04679 4.67051 1.5515 5.19382 1.4136 5.33399L1.16286 5.58882V3.26295V0.937073L1.58359 1.37336C1.815 1.61332 2.31027 2.13667 2.68422 2.53635ZM8.84236 4.42837L8.83799 5.59372L7.74155 4.42799L6.6451 3.26224L7.74155 2.09858L8.83799 0.934914L8.84236 2.09898C8.84477 2.7392 8.84477 3.78742 8.84236 4.42837ZM3.90855 3.84448C4.21619 4.17526 4.39442 4.30694 4.64769 4.39055C4.75442 4.42579 4.81259 4.43265 5.00468 4.43265C5.26602 4.43265 5.40234 4.3987 5.59965 4.28452C5.74577 4.19994 5.82297 4.13258 6.07068 3.87343L6.27822 3.6563L6.68265 4.07517C6.90508 4.30554 7.40068 4.82921 7.78396 5.23885L8.48086 5.98368L5.00459 5.9829L1.52835 5.98212L2.62155 4.82208C3.22281 4.18407 3.72019 3.66205 3.72682 3.66205C3.73344 3.66205 3.81523 3.74414 3.90855 3.84448Z"
                                  fill="#FFC900"
                                />
                              </svg>{" "}
                              Mail
                            </button>

                            <button className="btn chat-btn" type="button">
                              <svg
                                viewBox="0 0 9 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M0.693363 0.027649C0.386961 0.101228 0.146631 0.31892 0.0658023 0.596075C0.0244906 0.737696 0.0251613 4.96722 0.0665093 5.10899C0.147954 5.38821 0.389553 5.60328 0.703895 5.67641C0.783401 5.69491 0.921294 5.70056 1.29277 5.70056H1.77784L1.78293 6.39552C1.78786 7.06848 1.7892 7.09189 1.8254 7.13516C1.91558 7.243 2.06144 7.28284 2.17971 7.23196C2.21354 7.2174 2.71432 6.86722 3.29257 6.45376L4.34395 5.70199L6.15739 5.70128C8.12887 5.7005 8.06583 5.70324 8.27233 5.60978C8.40013 5.55195 8.56061 5.41135 8.62829 5.29793C8.74567 5.10127 8.73977 5.23065 8.73977 2.85131C8.73977 0.961719 8.73628 0.676777 8.71202 0.593631C8.63058 0.314404 8.38898 0.0993336 8.07464 0.0262081C7.92048 -0.0096504 0.842912 -0.00827433 0.693363 0.027649ZM8.02584 0.561577C8.05337 0.579935 8.09271 0.615065 8.11326 0.639656C8.15059 0.684289 8.15064 0.68798 8.15064 2.84971V5.01506L8.0984 5.07622C8.00225 5.1888 8.12282 5.18252 6.05872 5.18252C4.9064 5.18252 4.17466 5.18848 4.14633 5.19811C4.12108 5.20667 3.7128 5.49079 3.23905 5.82948C2.76528 6.16815 2.37377 6.44526 2.36903 6.44526C2.36429 6.44526 2.35805 6.19808 2.35519 5.896C2.35018 5.37034 2.34835 5.34481 2.31259 5.30204C2.29203 5.27748 2.25271 5.24235 2.2252 5.22399C2.17729 5.19202 2.14629 5.19027 1.48893 5.18252C0.831564 5.17476 0.800567 5.17301 0.752657 5.14104C0.72514 5.12268 0.685822 5.08755 0.665266 5.06296C0.628015 5.01843 0.62787 5.01062 0.622686 2.89465C0.619822 1.72666 0.622178 0.747571 0.627942 0.718885C0.640958 0.653999 0.717146 0.57129 0.790126 0.542814C0.835661 0.525038 1.47424 0.521849 4.4106 0.524714L7.97577 0.528195L8.02584 0.561577ZM1.95026 2.09692C1.83033 2.14377 1.7612 2.26792 1.7869 2.39026C1.8028 2.46596 1.89332 2.55541 1.97551 2.57663C2.02107 2.5884 2.78873 2.59227 4.42873 2.58898C6.80706 2.58421 6.81583 2.58408 6.8657 2.55081C6.96083 2.48738 6.99051 2.43564 6.99051 2.33326C6.99051 2.23088 6.96083 2.17914 6.8657 2.11572C6.8158 2.08243 6.80837 2.08232 4.4106 2.07882C2.43881 2.07596 1.9956 2.07921 1.95026 2.09692ZM1.95026 3.13293C1.83026 3.17999 1.7612 3.30403 1.7869 3.42636C1.8028 3.50201 1.89327 3.59147 1.97551 3.61281C2.02029 3.62443 2.44011 3.62844 3.26859 3.62516C4.47506 3.62037 4.49622 3.61973 4.54543 3.5869C4.64056 3.52347 4.67024 3.47173 4.67024 3.36936C4.67024 3.26698 4.64056 3.21524 4.54543 3.15181C4.49616 3.11893 4.47638 3.11838 3.25047 3.11483C2.24318 3.11194 1.995 3.11538 1.95026 3.13293Z"
                                  fill="#FFC900"
                                />
                              </svg>{" "}
                              Chat
                            </button>
                          </div> */}
                          <button className="btn dismiss-btn" type="button"
                           onClick={(e) => DeleteTicket(e, item)}>
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                }):""}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default B2B;
