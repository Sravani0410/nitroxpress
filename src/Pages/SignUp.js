import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { reactLocalStorage } from "reactjs-localstorage";
import Carosel from "./Carosel";
import LodingSpiner from "../Components/LodingSpiner";
import { toast } from "react-toastify"; 
import { useDispatch, useSelector } from "react-redux";


const SignUp = () => {
  const [name, setName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("+91");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [Businessdetails, setBusinessDetails] = useState("");
  const [BusinessActive, setBusinessActive] = useState(false);
  const [individualActive, setIndividualActive] = useState("");
  const [countrycode, setCountryCode] = useState("");
  const [showpassword, setShowPassword] = useState(false);
  const [conformpassword, setConformPassword] = useState(false);
  const [loadspiner, setLoadSpiner] = useState(false);

  const navigate = useNavigate(); 
  const dispatch = useDispatch();

  const BusinessAlert = () => {
    toast.warn("Please select the Business ");
    setLoadSpiner((o) => !o);
  };
  const VerifyOtp = async () => {
   
    reactLocalStorage.set("User_Mail", email)
    reactLocalStorage.set("user_right",Businessdetails)
     if(Businessdetails.toString()=="as_individual"){
      reactLocalStorage.set("as_individual",true)  
    }
    else{
      reactLocalStorage.set("as_individual",false)  

    }
    setLoadSpiner((o) => !o);
    name && email && password && confirmpassword && !Businessdetails
      ? BusinessAlert()
      : Businessdetails && !phonenumber
      ? setLoadSpiner((o) => !o)
      : phonenumber
      ? axios
          .post(`${process.env.REACT_APP_BASE_URL}/signup`, {
            name: name,
            email,
            password,
            confirm_password: confirmpassword,
            phone_number:`${countrycode}-${phonenumber}`,
            user_right: Businessdetails,
           
            // contry_code: countrycode,
          })


          .then((Response) => {
           
            if(Businessdetails === "as_business"){
              navigate("/page/kyc")
            }else{
            setLoadSpiner((o) => !o);
            reactLocalStorage.set(
              "userDetails",
              JSON.stringify({
                email: Response.data.email,
                phoneNumber: Response.data.phone_number,
              })
            );
            reactLocalStorage.set("token", Response.data.Token);
            if (Response.status === 200) {
              navigate("/profile"); 
            }
            // navigate("/login")
            navigate("/verifyemail")
            toast.success("OTP Send SuccessFully")
             
          }})
          .catch((err) => {
            setLoadSpiner((o) => !o);
            if(err?.response?.status == 409){
               navigate("/verifyemail")
               toast.warn("Please Verify your Email")
               
            }
            console.log(err);
            toast.warn(err?.response?.data?.message)
            
          })
      :
      toast.warn("Please fill the fields")
       
  };

  const BusinessdetailsActiveFun = (value) => {
    if (value === "individual") {
      setIndividualActive(true);
      setBusinessActive(false);
    } else {
      setIndividualActive(false);
      setBusinessActive(true);
    }
  };

  const handleOnChange1 = (
    currentValue,
    objectValue,
    eventData,
    eventTargetValue
  ) => {
    // we are not using all the parameters in this function , but all parameters are important becouse of this library
    let data = [];
    let CountryCode = eventTargetValue.split(" ");
    setCountryCode(CountryCode[0]);
    CountryCode.slice(1).map((items, id) => {
      data.push(items);
    });
    let myString = data.join("").replace(/\D/g, "");
    setPhoneNumber(myString);
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-7  carosel_bg d-lg-block d-md-block d-none">
          <div className="accountslider-part">
            <Carosel />
          </div>
        </div>
        <div className="col-md-5 col-sm-12 col-12 account-part">
          <div className="right_part signup-part">
            <div className="sign_up ">Sign Up</div>
            <div className="sign_up_ ">
              Already Have an Account ?
              <div onClick={() => navigate("/login")}>Sign in</div>
            </div>

            <br />
            <div className="choose_business">
              <button
                onClick={(e) => {
                  setBusinessDetails(e.target.value);
                  BusinessdetailsActiveFun("individual");
                }}
                value="as_individual"
                className={`${
                  individualActive ? "choose_business_active" : ""
                }`}
              >
                As a individual
              </button>

              <button
                onClick={(e) => {
                  setBusinessDetails(e.target.value);
                  BusinessdetailsActiveFun("as_business");
                }}
                value="as_business"
                className={`${BusinessActive ? "choose_business_active" : ""}`}
              >
                As a Business
              </button>
            </div>

            <br></br>
            <div className=" ">
              <div className="input_filed text-center  mb-3">
                <span>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 18 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.0298 1.75921L11.9118 1.93643L12.0298 1.7592C11.0122 1.08125 9.88492 0.78783 8.66115 0.881873L8.67885 1.11208L8.66115 0.881873C7.40079 0.978744 6.16283 1.57584 5.30482 2.50105C3.35855 4.59977 3.43079 7.81244 5.47476 9.78906C6.54236 10.8215 7.90048 11.3418 9.34721 11.267C11.5543 11.153 13.3948 9.73277 14.068 7.62508C14.2585 7.02855 14.3111 6.5815 14.2843 5.84675C14.2486 4.86809 14.0208 4.11856 13.506 3.28587C13.3554 3.04235 13.0993 2.73729 12.832 2.46083C12.5647 2.18437 12.2683 1.9181 12.0298 1.75921ZM11.8101 3.31322L11.986 3.13557L11.8101 3.31322C13.2919 4.78048 13.3507 7.15955 11.9461 8.68382L12.13 8.85323L11.9461 8.68382C11.4845 9.18487 10.9744 9.51336 10.3185 9.73103C8.47705 10.3422 6.51371 9.52759 5.64105 7.78903C4.66622 5.84691 5.49643 3.48852 7.49243 2.55525C7.78437 2.41875 8.26763 2.27228 8.54902 2.23315L8.54905 2.23314C8.70283 2.21174 8.95081 2.20526 9.21079 2.21435C9.47046 2.22343 9.72045 2.24729 9.87798 2.2798C10.5945 2.42767 11.2937 2.80184 11.8101 3.31322ZM1.18457 21.1495L1.25779 21.2227H1.36135H9.1044H16.8475H16.9542L17.028 21.1456L17.1457 21.0227L17.1457 21.0227L17.1482 21.0201C17.1742 20.993 17.211 20.9546 17.241 20.9092C17.2771 20.8545 17.2993 20.797 17.3119 20.7318C17.3315 20.6309 17.3292 20.4916 17.3259 20.2998L17.3255 20.2759C17.2822 17.6763 16.0457 15.1968 14.0232 13.6674C12.3387 12.3936 10.1981 11.824 8.08999 12.0874L8.12099 12.3355L8.08998 12.0874C5.65917 12.3913 3.60717 13.6781 2.24745 15.7484C1.40905 17.0248 0.869141 18.8209 0.869141 20.3358L0.86914 20.3495C0.869123 20.5185 0.86911 20.6504 0.892465 20.7498C0.925394 20.8901 1.00162 20.9665 1.06347 21.0284L1.18457 21.1495ZM9.55653 13.3914L9.57452 13.1421L9.55653 13.3914C10.7777 13.4795 11.8699 13.8395 12.8103 14.4584C14.6382 15.6616 15.7517 17.5707 15.9665 19.8941H9.09479H2.22874C2.32408 19.0596 2.42187 18.6063 2.62805 18.0091C3.53016 15.3962 5.85002 13.5925 8.5536 13.394L8.5353 13.1447L8.55361 13.394C8.67378 13.3852 8.78563 13.3765 8.86915 13.3696C8.91081 13.3662 8.94601 13.3632 8.97188 13.3608L9.0054 13.3574L9.00895 13.357C9.01473 13.3572 9.02247 13.3575 9.03236 13.3579C9.06154 13.3592 9.10365 13.3615 9.15604 13.3646C9.26053 13.3709 9.40249 13.3803 9.55653 13.3914Z"
                      fill="#828282"
                      stroke="#828282"
                      stroke-width="0.5"
                    />
                  </svg>
                </span>

                {Businessdetails === "as_business"?<input
                  type="text"
                  value={name}
                  placeholder="Company Name"
                  onChange={(e) => setName(e.target.value)}
                />:
                <input
                  type="text"
                  value={name}
                  placeholder="Full Name"
                  onChange={(e) => setName(e.target.value)}
                />}
              </div>


              <div className="mb-3">
                <PhoneInput
                  country={"in"}
                  // value={phonenumber}
                  onChange={handleOnChange1}
                  className="input_filed"
                />

                {/* <span>
                <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M5.35923 1.01151C4.38216 1.12713 3.69888 1.38853 3.04756 1.89591C2.80326 2.08623 2.3921 2.50306 2.21305 2.74195C1.68749 3.44305 1.33362 4.29064 1.13227 5.33059C1.02688 5.8749 0.998953 6.21487 1.00003 6.9412C1.00119 7.71434 1.04012 8.11462 1.18312 8.82327C1.47282 10.2588 2.09505 11.6461 2.96513 12.7965C3.71138 13.7832 5.87069 15.9467 8.06483 17.9061C9.64367 19.3161 10.7391 20.2318 11.2404 20.5607C12.2967 21.2538 13.3977 21.69 14.6037 21.8933C16.122 22.1492 17.7504 21.9394 19.0454 21.321C20.2881 20.7274 21.2308 19.744 21.7822 18.4658C22.0559 17.8313 22.0676 17.5515 21.84 17.0771C21.7139 16.8143 21.4409 16.5255 21.1994 16.3995C20.9259 16.2567 17.0255 14.541 16.8628 14.4919C16.6533 14.4287 16.1742 14.4296 15.9194 14.4936C15.6534 14.5604 15.3392 14.7189 15.1548 14.8791C15.0667 14.9557 14.7272 15.2765 14.4005 15.592C14.0737 15.9074 13.76 16.1965 13.7035 16.2343C13.5314 16.3493 13.2709 16.4202 13.0178 16.4209C12.7987 16.4215 12.7878 16.4185 12.5236 16.2839C11.0738 15.5452 9.34838 14.0559 7.88767 12.2822C7.18879 11.4335 6.61644 10.573 6.55197 10.2739C6.51257 10.091 6.55859 9.84333 6.67828 9.5944C6.7646 9.41487 6.83266 9.33773 7.48565 8.6795C8.0979 8.06231 8.21207 7.93478 8.29279 7.77767C8.49118 7.39161 8.56523 7.05271 8.54413 6.62752C8.53289 6.40068 8.51025 6.30046 8.37291 5.86946C8.28586 5.5963 7.98786 4.65526 7.7107 3.77827C7.43354 2.90127 7.16572 2.09993 7.11555 1.99749C6.94956 1.65869 6.62537 1.33249 6.28309 1.15988C6.02502 1.02976 5.67722 0.973899 5.35923 1.01151ZM5.96576 1.80659C6.14179 1.88987 6.34487 2.08437 6.45504 2.27522C6.4924 2.33992 6.65319 2.80456 6.81238 3.30775C6.97157 3.81094 7.26531 4.73433 7.46516 5.35973L7.82851 6.49682L7.82615 6.78436C7.82413 7.02918 7.81346 7.09838 7.75438 7.25014C7.71624 7.3482 7.65937 7.46583 7.62803 7.51154C7.59669 7.55729 7.27261 7.89465 6.90789 8.26126C6.24634 8.92621 6.13133 9.06645 5.99557 9.37373C5.82866 9.75147 5.78553 10.2647 5.8942 10.5801C6.04251 11.0106 6.70349 11.9806 7.46698 12.888C8.97928 14.6856 10.6035 16.0751 12.1498 16.894C12.4516 17.0538 12.6248 17.111 12.8853 17.1365C13.2317 17.1706 13.7291 17.0529 14.0569 16.8593C14.1509 16.8037 14.4812 16.5073 14.9282 16.0771C15.324 15.6961 15.7031 15.3526 15.7705 15.3138C15.8379 15.2749 15.964 15.2246 16.0507 15.202C16.2353 15.1537 16.5799 15.1465 16.707 15.1882C16.7559 15.2043 17.7099 15.6211 18.8269 16.1145C20.9861 17.0682 21.0034 17.0773 21.1627 17.3272C21.2033 17.3908 21.2491 17.5038 21.2647 17.5782C21.301 17.7521 21.2439 17.9492 21.0286 18.3926C20.6502 19.1724 20.0495 19.8652 19.3475 20.3315C18.7074 20.7567 17.933 21.0445 16.9964 21.2053C16.6972 21.2566 16.5622 21.2639 15.9062 21.2641C15.3245 21.2643 15.0973 21.2544 14.8873 21.2199C13.5718 21.0037 12.3486 20.4962 11.31 19.736C11.0348 19.5345 9.76871 18.4589 8.89283 17.6826C6.8475 15.8696 4.72313 13.7914 3.83944 12.739C2.91874 11.6424 2.25259 10.2786 1.93329 8.83634C1.76501 8.07632 1.70948 7.4818 1.72936 6.65366C1.74925 5.82651 1.84384 5.25455 2.07614 4.55682C2.63012 2.89283 3.85121 1.86059 5.42183 1.72853C5.7073 1.70454 5.76861 1.71334 5.96576 1.80659ZM10.0324 4.97885C9.80447 5.07758 9.75797 5.37921 9.9434 5.55602C10.0206 5.62957 10.0333 5.63229 10.3967 5.65336C11.3524 5.70878 12.1689 5.88201 12.9075 6.18609C14.2585 6.7423 15.3747 7.65212 16.1931 8.86418C16.9193 9.93965 17.337 11.2079 17.3934 12.509C17.4031 12.731 17.4254 12.9377 17.4448 12.9855C17.4918 13.1007 17.6227 13.1754 17.7783 13.1755C17.8843 13.1755 17.9184 13.1619 18.0016 13.0859L18.0997 12.9962L18.0979 12.5435C18.0938 11.4924 17.8218 10.4067 17.2961 9.34304C16.3714 7.4722 14.6919 6.0143 12.6958 5.34975C11.7957 5.0501 10.3369 4.84695 10.0324 4.97885ZM10.4791 7.24233C10.3717 7.31082 10.2991 7.47121 10.3215 7.59038C10.3592 7.79043 10.5175 7.8953 10.7816 7.8953C11.0237 7.8953 11.5315 7.96797 11.8083 8.04224C12.8832 8.33061 13.7934 8.97755 14.3965 9.88183C14.8484 10.5595 15.0933 11.2901 15.1413 12.1042C15.1633 12.4766 15.1809 12.5374 15.2914 12.6239C15.4471 12.7458 15.6723 12.7147 15.7949 12.5544C15.8647 12.4631 15.8666 12.4516 15.8605 12.16C15.8495 11.6419 15.7107 10.9674 15.5134 10.4731C15.0919 9.41725 14.3176 8.50604 13.3453 7.92165C12.596 7.47126 11.6278 7.19057 10.8232 7.19044C10.6059 7.19042 10.5464 7.19938 10.4791 7.24233Z" fill="#828282" stroke="#828282" stroke-width="0.5" />
                </svg>

              </span>
              <input
                type="number"
                value={phonenumber}
                placeholder="Contact No."
                onChange={(e) => setPhoneNumber(e.target.value)}
              /> */}
              </div>

              <div className="input_filed text-center mb-3">
                <span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.636 5.04492H19.363C20.267 5.04492 21 5.77792 21 6.68192V17.3179C21 18.2219 20.267 18.9539 19.364 18.9539H4.636C3.733 18.9549 3 18.2219 3 17.3179V6.68192C3 5.77792 3.733 5.04492 4.636 5.04492Z"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M3.11914 6.07504L10.8131 11.578C11.5081 12.075 12.4421 12.076 13.1381 11.58L20.8761 6.06104"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="input_filed text-center mb-3">
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10.3384V7.33838V7.33838C8 5.12938 9.791 3.33838 12 3.33838V3.33838C14.209 3.33838 16 5.12938 16 7.33838V7.33838V10.3384"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14.3384V17.3384"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 21.3384H7C5.895 21.3384 5 20.4434 5 19.3384V12.3384C5 11.2334 5.895 10.3384 7 10.3384H17C18.105 10.3384 19 11.2334 19 12.3384V19.3384C19 20.4434 18.105 21.3384 17 21.3384Z"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type={showpassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showpassword ? (
                  <span
                    className="password_eye"
                    onClick={() => setShowPassword((o) => !o)}
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868"
                        stroke="#828282"
                        stroke-width="1.4286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="password_eye"
                    onClick={() => setShowPassword((o) => !o)}
                  >
                    <svg
                      width="20"
                      height="18"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706"
                        stroke="#828282"
                        stroke-width="1.4286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="16.9229"
                        y="0.598172"
                        width="2.14538"
                        height="22.1961"
                        rx="1.07269"
                        transform="rotate(43.9016 16.9229 0.598172)"
                        fill="#828282"
                        stroke="#F5F5F5"
                        stroke-width="0.5"
                      />
                    </svg>
                  </span>
                )}
              </div>

              <div className="input_filed text-center mb-3">
                <span>
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 10.3384V7.33838V7.33838C8 5.12938 9.791 3.33838 12 3.33838V3.33838C14.209 3.33838 16 5.12938 16 7.33838V7.33838V10.3384"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 14.3384V17.3384"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M17 21.3384H7C5.895 21.3384 5 20.4434 5 19.3384V12.3384C5 11.2334 5.895 10.3384 7 10.3384H17C18.105 10.3384 19 11.2334 19 12.3384V19.3384C19 20.4434 18.105 21.3384 17 21.3384Z"
                      stroke="#828282"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
                <input
                  type={conformpassword ? "text" : "password"}
                  value={confirmpassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {conformpassword ? (
                  <span
                    className="password_eye"
                    onClick={() => setConformPassword((o) => !o)}
                  >
                    <svg
                      width="20"
                      height="16"
                      viewBox="0 0 20 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.11775 8.467C0.96075 8.176 0.96075 7.823 1.11775 7.532C3.00975 4.033 6.50475 1 9.99975 1C13.4948 1 16.9898 4.033 18.8818 7.533C19.0388 7.824 19.0388 8.177 18.8818 8.468C16.9898 11.967 13.4948 15 9.99975 15C6.50475 15 3.00975 11.967 1.11775 8.467Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.1213 5.87868C13.2929 7.05025 13.2929 8.94975 12.1213 10.1213C10.9497 11.2929 9.05025 11.2929 7.87868 10.1213C6.70711 8.94975 6.70711 7.05025 7.87868 5.87868C9.05025 4.70711 10.9497 4.70711 12.1213 5.87868"
                        stroke="#828282"
                        stroke-width="1.4286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span
                    className="password_eye"
                    onClick={() => setConformPassword((o) => !o)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.11775 9.80538C0.96075 9.51438 0.96075 9.16138 1.11775 8.87038C3.00975 5.37138 6.50475 2.33838 9.99975 2.33838C13.4948 2.33838 16.9898 5.37138 18.8818 8.87138C19.0388 9.16238 19.0388 9.51538 18.8818 9.80638C16.9898 13.3054 13.4948 16.3384 9.99975 16.3384C6.50475 16.3384 3.00975 13.3054 1.11775 9.80538Z"
                        stroke="#828282"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12.1213 7.21706C13.2929 8.38863 13.2929 10.2881 12.1213 11.4597C10.9497 12.6313 9.05025 12.6313 7.87868 11.4597C6.70711 10.2881 6.70711 8.38863 7.87868 7.21706C9.05025 6.04549 10.9497 6.04549 12.1213 7.21706"
                        stroke="#828282"
                        stroke-width="1.4286"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect
                        x="16.9229"
                        y="0.598172"
                        width="2.14538"
                        height="22.1961"
                        rx="1.07269"
                        transform="rotate(43.9016 16.9229 0.598172)"
                        fill="#828282"
                        stroke="#F5F5F5"
                        stroke-width="0.5"
                      />
                    </svg>
                  </span>
                )}
              </div>

              <div className="button_otp_div">
                <button className="button_otp" onClick={(e) => VerifyOtp(e)}>
                  Submit
                </button>
              </div>
            </div>
            {/* <div className="sign_up_with"> Or </div>

            <div className="verify_logo">
              <div>
                <a href={`${process.env.REACT_APP_BASE_URL}/accounts/google/login`}>
                  <button>
                    <span>
                      <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4114 6.73969L19.4838 3.66723C17.1283 1.13243 10.2152 -2.04245 4.07031 3.66723L7.11717 6.73969C10.2408 3.76965 14.2606 4.69139 16.4114 6.73969Z" fill="#EB4134" />
                        <path d="M7.14849 6.7151L4.07602 3.69385C-1.99219 10.0692 1.95082 17.2383 4.10162 19.1074L7.14849 16.0093C4.92095 13.9354 4.33206 9.42911 7.14849 6.7151Z" fill="#FBBE04" />
                        <path d="M4.07031 19.0568L7.11717 15.9844C9.9848 19.0568 14.7215 17.9815 16.437 15.9844L19.4838 19.0568C15.5152 23.1535 8.16693 23.4095 4.07031 19.0568Z" fill="#34AA51" />
                        <path d="M11.75 13.578V9.19971H22.4268C23.3741 13.9364 21.0186 17.8282 19.4312 19.1084C18.5948 18.2379 16.8247 16.3944 16.4355 15.9847C17.2139 15.2064 17.7669 14.0559 17.9461 13.578H11.75Z" fill="#4186F7" />
                      </svg>

                    </span>
                    Sign Up With Google
                  </button>
                </a>
              </div>
            </div> */}
          </div>
          <LodingSpiner loadspiner={loadspiner} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
