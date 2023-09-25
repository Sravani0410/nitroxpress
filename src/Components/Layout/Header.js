import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
const Header = () => {
  const [toggleopenclose, setToggleOpenClose] = useState(false);
  const [profiledropdownshow, setProfileDropDownShow] = useState(false)
  const navigate = useNavigate();
  let param = useLocation();

  const ToggleOpenHideFun = () => {
    setToggleOpenClose((o) => !o);
  };
  let Token = sessionStorage.getItem("token", false)
  let Role = sessionStorage.getItem("Admin_Role", false)
  let B2bRole = sessionStorage.getItem("Is_Business", false)
  let as_individual = sessionStorage.getItem("as_individual", false)

  const Logoutfun = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('Admin_Role')
    toast.success(" Logout successfully");
    sessionStorage.clear();
    navigate("/")
  }



  const profilefun = () => {
    sessionStorage.getItem('token')
    let Role = sessionStorage.getItem("Admin_Role", false)
    if (JSON.parse(as_individual) !== true) {
      navigate("/admin/setting/adminsetting#pending")
      // window.location.reload(true);
    } else {
      navigate("/profile")
    }
  }

  return (
    <header
      className={`main-header ${toggleopenclose == true ? "menu-show" : ""}`}
    >
      <div className="container">
        <div className="row">
          <div
            className="col-lg-2  col-5"
            onClick={(e) => {
              navigate("/");
            }}
          >
            <a href="/">
              <img src="/images/logo.png" alt="logo" />
            </a>
          </div>
          <div className="col-lg-10 col-7 clearfix">
            <div
              className="humberger-menu  clearfix"
              onClick={(e) => ToggleOpenHideFun(e)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className="menu">
              <li>
                <a
                  href="/"
                  className={` ${param.pathname === "/" ? "active" : " "} `}
                >
                  Home
                </a>
               </li>
              <li>
                <a
                  href="/Servicepage"
                  className={` ${param.pathname === "/Servicepage" ? "active" : ""
                    } `}
                >
                  Services
                </a>
               </li>
               <li>
                <a
                  href="/support"
                  className={` ${param.pathname === "/support" ? "active" : ""
                    } `}
                >
                  Support
                </a>
                {/* <NavLink to='/support' className={` ${param.pathname === "/support" ? "active" : ""} `}>Support</NavLink>  */}
              </li>
              {/* <li><NavLink to='/signup' className={` ${param.pathname === "/signup" ? "active" : ""} `}> Login / Sign up</NavLink> </li> */}
              {/* JSON.parse(B2bRole) */}

              {JSON?.parse(as_individual) ? <>
                {Token !== false ? <li>
                  <NavLink to="/shipping" className="btn">
                    Ship with us
                  </NavLink>

                </li> : <li>
                  <NavLink to="/login" className="btn">
                    Ship with us
                  </NavLink>

                </li>
                } </>
                :
                <li>
                  {JSON.parse(Role) == true || Token ? <NavLink to="/admin/dashboard" className="btn">
                     Go to Dashboard 
                  </NavLink>
                    :
                    <NavLink to="/login" className="btn">
                      Ship with us
                    </NavLink>
                    
                    }

                </li>}


               {Token == null ? <li>
                <NavLink
                  to="/login"
                  className={`btn ${param.pathname === "/signup" ? "active" : ""
                    } `}
                >
                  {" "}
                  Login
                </NavLink>{" "}
              </li> :
                <li>
                  <div className='user-box' onClick={() => setProfileDropDownShow(o => !o)} >
                    <img src="/images/icon30.png" alt="img" />
                    {profiledropdownshow && <ul className="dropdown-menubar">
                      {/* <li><a href='javascript:void' onClick={() => setProfileDetailsShow(o => !o)}></a> </li> */}
                      <li><a href='#' onClick={() => profilefun()}>My Profile</a> </li>
                      <li><a href='#' onClick={() => Logoutfun()}>Log out</a> </li>
                    </ul>}
                  </div>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
