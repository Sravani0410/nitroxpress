import React, { useEffect, useState } from "react";
import { PostRaiseContactUS } from "../../../Redux/action/ApiCollection";
import { toast } from "react-toastify";
import { useNavigate, NavLink, useLocation, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reactLocalStorage } from "reactjs-localstorage";
import { message } from "antd";
import LodingSpiner from "../../LodingSpiner";

function Contactus() {
  const [name, setName] = useState();
  const [loadspiner, setLoadSpiner] = useState(false);

  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [massage, setMassage] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const PostRaiseContactUSData = useSelector(
    (state) => state.PostRaiseContactUSReducer.PostRaiseContactUSData?.data
  );

  let Token = reactLocalStorage.get("token", false);

  useEffect(() => {
    if (
      PostRaiseContactUSData?.message ===
      "Thanks for contacting us! We will reach back to you soon"
    ) {
      setName("");
      setEmail("");
      setNumber("");
      setMassage("");
    }
  }, [PostRaiseContactUSData]);

  const SendContact = (e) => {
    e.preventDefault();

  
      let payload = {
        name: name,
        email: email,
        number: number,
        message: massage,
      };

      name && email && number && message
        ? dispatch(PostRaiseContactUS(payload))
        : toast.warn("Please Fill all the input Fields !");

  };

  console.log("aaapaaa", PostRaiseContactUSData);

  return (
    <section className="contactus-sec">
      <div className="contactus-inner">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="contactus-part">
                <div className="left-part">
                  <h3>Contact Us</h3>
                  <p>
                    {" "}
                    Raise a Ticket by submitting your queries here and one of
                    our experts will call you back.{" "}
                  </p>
                  <form>
                    <input
                      type="text"
                      placeholder="Name"
                      className="mb-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <input
                      type="number"
                      placeholder="Contact No."
                      className="mb-3"
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email Id"
                      className="mb-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <textarea
                      placeholder="Message"
                      className="mb-3"
                      value={massage}
                      onChange={(e) => setMassage(e.target.value)}
                    /> 
                    <input
                      type="submit"
                      value="Send"
                      onClick={(e) => SendContact(e)}
                    />
                  </form>
                </div>
                <div className="right-part">
                  <h5>Info</h5>
                  <p>
                    Our experts are here to help you with any problem or query;
                    connect with us via any following{" "}
                  </p>
                  <ul>
                    <li>
                      {" "}
                      <img src="/images/icon25.png" alt="img" />{" "}
                      <a href="mailto:contact@nitroxpress.in">
                        contact@nitroxpress.in
                      </a>
                    </li>
                    <li>
                      {" "}
                      <img src="/images/icon26.png" alt="img" />{" "}
                      <a href="tel:+91-8130-302-096">+91-8130-302-096</a>
                    </li>
                    <li>
                      {" "}
                      <img src="/images/icon27.png" alt="img" />{" "}
                      <span>24x7</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LodingSpiner loadspiner={loadspiner} />
    </section>
  );
}

export default Contactus;
