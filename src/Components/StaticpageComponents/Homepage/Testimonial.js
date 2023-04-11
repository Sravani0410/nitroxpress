import React, { useState } from "react";

function Testimonial() {
  const [moredata, setMoreData] = useState(false);

  const [moredataid, setMoreDataId] = useState("");

  let Data = [
    { id:"1",
      info: "I highly suggest using NitroXpress as your 3PL solution if customer satisfaction is the prime goal of your business. They have the flexibility to deliver big volumes and are capable to execute same-day accurate delivery directly to the customers. Great customer service from NitroXpress and they deliver the products with care!",
    },
    { id:"2",
      info: "We care about our clients and give them the best of our service, no matter how big or small their business is; we focus to deliver our best to the end user. Ultimately to our Clients.",
    },
    { id:"3",
      info: "We have established a strong business relationship with NitroXpress. We have relied a lot on NitroXpress to deliver our products timely to our customers without having to add any expensive infrastructure. Their reliable product handling and response have allowed us successfully manage the orders without being constrained by our physical space. I’ll highly recommend NitroXpress as a reliable, repetitive, and cost-effective 3PL service.",
    },
    { id:"4",
      info: "Our experience working with me NitroXpress has been excellent so far. The entire team of NitroXpress has been amazingly supportive in helping our company with its facility. They have provided quick solutions to our unique business. Their customer service is on point, no concerns were ever left unanswered. We can say, without the help of NitroXpress we won’t be able to grow at this rate.",
    },
    { id:"5",
      info: "We admire NitroXpress efficiency and inventiveness to help us serve our customers. We couldn’t have accomplished our goals without you.",
    },
  ];

  console.log("aaaa", Data);


  const ReadmoreFun =(id)=>{ 
    setMoreDataId(id)

    console.log(id)

    // setMoreData(o => !o)

  }

  const ShowFeedbackDataFun =(e,value)=>{

    console.log(value)

    if(value=="more"){
      setMoreData(true)
    }
    else{
      setMoreData(false)
    }

    // setMoreData(o => !o)

  }

  return (
    <section className="testimonials-sec">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h5>Our Testimonials</h5>
            <h2> Let's know about all of our client says </h2>
            {/* <p>
              We care about our clients and give them the best of our service,
              no matter how big or small their business is; we focus to deliver
              our best to the end user. Ultimately to our Clients.
            </p> */}
          </div>
          <div 
          // className="owl-carousel owl-theme testimonials-slider"

          className="owl-theme owl-carousel testimonials-slider"

          >
            {Data.map((item, id) => {
              console.log("item12",moredata)
              return  <div className="item">
                  <div className="testimonials-box">
                    <img src="images/icon5.png" alt="logo" />

                    {item?.info?.length <= 40
                     || moredata == true
                      &&
                        moredataid==item?.id
                    ? 
                     (
                      <p>
                        {item?.info}
                        <span 
                        onClick={(e) => ShowFeedbackDataFun(e,"less") }
                        // onClick={(e) =>  setMoreData(o => !o)}
                        >
                          {" "}
                          ....
                          <span
                            className="text-primary"
                            role="button"
                            onClick={(e) => ReadmoreFun(item?.id)}
                            // onClick={(e) => ShowFeedbackDataFun(e, item)}
                          >
                            less
                          </span>
                        </span>
                      </p>
                    ) : (
                      <p>
                        {item?.info?.substring(0, 150)}
                        <span 
                        onClick={(e) => ShowFeedbackDataFun(e,"more")}
                        // onClick={(e) => setMoreData(o => !o)}
                        >
                          {" "}
                          ....
                          <span
                            className="text-primary"
                            role="button"
                            // onClick={(e) => ShowFeedbackDataFun(e, item)}
                            onClick={(e) => ReadmoreFun(item?.id)}
                          >
                            more
                          </span>
                        </span>
                      </p>
                    )}
                  </div>
                  <div className="client-box">
                    <img src="images/client1.png" alt="img" />
                    <div className="client-text">
                      <h5>Louis Carlson</h5>
                      <p>CEO Autocar inc</p>
                    </div>
                  </div>
                </div>
              ;
            })}
            {/* <div className="item">
              <div className="testimonials-box">
                <img src="images/icon5.png" alt="logo" />
                {Data[1]?.length <= 20 ||moredata==true ? <p>{Data[1]}</p> : <p>
                {Data[1]?.substring(0, 150)}
                <span onClick={(e)=>setMoreData(o=>!o)}>
                            {" "}
                            ....
                            <span
                              className="text-primary"
                              role="button"
                            >
                              more
                            </span>
                          </span>
                </p>}
              </div>
              <div className="client-box">
                <img src="images/client2.png" alt="img" />
                <div className="client-text">
                  <h5>Louis Carlson</h5>
                  <p>CEO Autocar inc</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="testimonials-box">
                <img src="images/icon5.png" alt="logo" />
                {Data[2]?.length <= 20 ? <p>{Data[2]}</p> : <p>
                {Data[2]?.substring(0, 150)}
                <span>
                            {" "}
                            ....
                            <span
                              className="text-primary"
                              role="button"
                            >
                              more
                            </span>
                          </span>
                </p>}
              </div>
              <div className="client-box">
                <img src="images/client3.png" alt="img" />
                <div className="client-text">
                  <h5>Louis Carlson</h5>
                  <p>CEO Autocar inc</p>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="testimonials-box">
                <img src="images/icon5.png" alt="logo" />
                {Data[3]?.length <= 20 ? <p>{Data[3]}</p> : <p>
                {Data[3]?.substring(0, 150)}
                <span>
                            {" "}
                            ....
                            <span
                              className="text-primary"
                              role="button"
                            >
                              more
                            </span>
                          </span>
                </p>}
              </div>
              <div className="client-box">
                <img src="images/client1.png" alt="img" />
                <div className="client-text">
                  <h5>Louis Carlson</h5>
                  <p>CEO Autocar inc</p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
