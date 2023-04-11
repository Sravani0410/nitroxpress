import React, { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import { reactLocalStorage } from "reactjs-localstorage";

const Header = () => {
  const [toggleopenclose, setToggleOpenClose] = useState(false);
  let param = useLocation();
  const [profiledropdownshow, setProfileDropDownShow] = useState(false)


  const navigate = useNavigate();


  const ToggleOpenHideFun = () => {
    setToggleOpenClose((o) => !o);
  };

  let Token = reactLocalStorage.get("token", false)

  console.log("tokeen", Token)


  let Role = reactLocalStorage.get("Admin_Role", false)



  const Logoutfun = () => {
    reactLocalStorage.remove('token')
    reactLocalStorage.remove('Admin_Role')
    toast.success(" Logout successfully");
    reactLocalStorage.clear();
    navigate("/")
  }


  const profilefun = () => {
    reactLocalStorage.get('token')
    let Role = reactLocalStorage.get("Admin_Role", false)
    console.log("mnhsdfjsnbsdvmf", JSON.parse(Role))

    if (JSON.parse(Role) == true) {

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
                {/* <NavLink to='/' className={` ${param.pathname === "/" ? "active" : ""} `}>Home</NavLink> */}
              </li>
              <li>
                <a
                  href="/Servicepage"
                  className={` ${param.pathname === "/Servicepage" ? "active" : ""
                    } `}
                >
                  Services
                </a>
                {/* <NavLink to='/Servicepage'>Services</NavLink> */}
              </li>
              {/* <li> 
                                <a href='#contact_page'>Contact Us</a> 
                            </li> */}
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
              
        { JSON.parse(Role) !== true? <>
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
                <NavLink to="/admin/dashboard" className="btn">
                 {JSON.parse(Role)== true || Token? " Go to Dashboard":"Ship with us"}  
                </NavLink>

              </li>}


              {/* <li><NavLink to='javascript:void'>Ship with us</NavLink> </li> */}
              {Token == false ? <li>
                <NavLink
                  to="/login"
                  className={`btn ${
                    param.pathname === "/signup" ? "active" : ""
                  } `}
                >
                  {" "}
                  Login
                </NavLink>{" "}
              </li> :
                <li>
                  < div className='user-box' onClick={() => setProfileDropDownShow(o => !o)} >
                    <img src="/images/icon30.png" alt="img" />
                    {profiledropdownshow && <ul className="dropdown-menubar">
                      {/* <li><a href='javascript:void' onClick={() => setProfileDetailsShow(o => !o)}>My Profile</a> </li> */}
                      <li><a href='javascript:void' onClick={() => profilefun()}>My Profile</a> </li>
                      <li><a href='javascript:void' onClick={() => Logoutfun()}>Log out</a> </li>
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
