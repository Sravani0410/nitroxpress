import React from 'react'
import { useNavigate} from "react-router-dom";

function Servicetabs() {

    const navigate = useNavigate();

    return (
        <div className='servicetabs'>
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <div className='servicetabs-part'>
                            <h6>We Offer</h6>
                            <h2>Everything that you might Need</h2>
                            <p>We have utilized Advanced Technology with our Classic Logistic System to serve you effortless Shipping Experience on your digital devices. </p>
                        </div>

                        <ul class="nav nav-pills" id="pills-tab" role="tablist">
                            <li class="nav-item" role="presentation">
                                <button class="nav-link active" id="pills-SameDay-tab" data-bs-toggle="pill" data-bs-target="#pills-SameDay" type="button" role="tab" aria-controls="pills-SameDay" aria-selected="true">
                                    <div className='tabimg-box'>
                                        <img src="images/ser1.png" alt="img" className='active-img' />
                                        <img src="images/ser1-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4> Same-Day Delivery</h4>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-Air-tab" data-bs-toggle="pill" data-bs-target="#pills-Air" type="button" role="tab" aria-controls="pills-Air" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser2.png" alt="img" className='active-img' />
                                        <img src="images/ser2-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Air Express  Delivery</h4>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-Surface-tab" data-bs-toggle="pill" data-bs-target="#pills-Surface" type="button" role="tab" aria-controls="pills-Surface" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser3.png" alt="img" className='active-img' />
                                        <img src="images/ser3-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Surface Express Delivery</h4>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-International-tab" data-bs-toggle="pill" data-bs-target="#pills-International" type="button" role="tab" aria-controls="pills-International" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser4.png" alt="img" className='active-img' />
                                        <img src="images/ser4-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>International Courier</h4>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-Zero-tab" data-bs-toggle="pill" data-bs-target="#pills-Zero" type="button" role="tab" aria-controls="pills-Zero" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser5.png" alt="img" className='active-img' />
                                        <img src="images/ser5-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Reverse pickup with same prices</h4>
                                </button>
                            </li>
                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-SDP-tab" data-bs-toggle="pill" data-bs-target="#pills-SDP" type="button" role="tab" aria-controls="pills-SDP" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser6.png" alt="img" className='active-img' />
                                        <img src="images/ser6-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Same day pickup/drop</h4></button>
                            </li>

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-Private-tab" data-bs-toggle="pill" data-bs-target="#pills-Private" type="button" role="tab" aria-controls="pills-Private" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser7.png" alt="img" className='active-img' />
                                        <img src="images/ser7-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Interstate private delivery </h4>
                                </button>
                            </li>

                            {/* <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-COD-tab" data-bs-toggle="pill" data-bs-target="#pills-COD" type="button" role="tab" aria-controls="pills-COD" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser8.png" alt="img" className='active-img' />
                                        <img src="images/ser8-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Cash on delivery</h4>
                                </button>
                            </li> */}

                            <li class="nav-item" role="presentation">
                                <button class="nav-link" id="pills-Delivery-tab" data-bs-toggle="pill" data-bs-target="#pills-Delivery" type="button" role="tab" aria-controls="pills-Delivery" aria-selected="false">
                                    <div className='tabimg-box'>
                                        <img src="images/ser9.png" alt="img" className='active-img' />
                                        <img src="images/ser9-h.png" alt="img" className='hover-img' />
                                    </div>
                                    <h4>Special  Delivery</h4>
                                </button>
                            </li>

                        </ul>
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-SameDay" role="tabpanel" aria-labelledby="pills-SameDay-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Reliable Same-Day Delivery</h3>
                                    <p>If you are looking for same-day courier or freight delivery then look no further than NitroXpress. Any package that you pact our company for will surely be delivered the same day, and we guarantee that no damage or connections will influence your delivery. Our logistics team is trained to deliver packages to their targetted location on time. </p>
                                    <p>Our same-day delivery fleet of vehicles comprises bikes, cargo vans, and box trucks that are always ready to pick up your package and drop-ship it to the receiver in the shortest time possible. We are comfortably open 24 hours a day and 7 days a week.  </p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser1-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-Air" role="tabpanel" aria-labelledby="pills-Air-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Flexible Air Delivery Solution For Your Business</h3>
                                    <p>If you depend on air delivery for your business, trust NitroXpress for cost-efficient, smooth delivery of your packages via our air delivery services. Our air freight solutions is an accelerating process full of planning and managing the delivery of freight from one point to another by air. </p>
                                    <p>Our flexible air delivery solutions will give your business the freedom and trusted experience that is needed in a logistic partner.</p>
                                    <p>The air delivery solution includes a global partnership for your cargo needs along with combined air and truck services for the combined benefits of air and truck services for quick transportation. With our end-to-end air delivery service keep control of your shipment while you stay in motion.</p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser2-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="pills-Surface" role="tabpanel" aria-labelledby="pills-Surface-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Highly Dependable Over-the-Road Logistics: Surface Express</h3>
                                    <p>No matter what you are shipping, NitroXpress will match your freight with a well-fitted vehicle and a well-fitted route. We have our way into the right tool, vehicle, and team along with the capacity you need. Our truckload logistics service is an ideal way to minimize costs, improve your distribution chain, and optimize your supply chain. </p>
                                    <p>Our express or surface delivery includes less-than-truckload (LTL), trailer on flatcar(TOFC), and rail transport. NitroXpress offers a systematic, and cost-efficient way to deliver the goods where they need to go. Now keep your global shipment model on track with our expertise in surface and intermodal freight movement.</p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser3-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-International" role="tabpanel" aria-labelledby="pills-International-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>International Shipping</h3>
                                    <p>We have profoundly integrated with major Worldwide Supply Chains to provide you fast and secure international Shipping from india to anywhere in the world or visa varsa. We accept single, bulk or business shipments under our International Shiping Services. We also allows you to opt for insurance of your shipment to reduce any damage and loss.  </p>
                                    <p>In India, International eCommerce businesses are at boom; even small businesses are sending their products overseas. To fulfill that requirements we have enabled cheap and secure paths that helps them in reaching their customers while making their products cost effective as well. If you are looking for international shipping partner for your business who can hendle regional, national and international shipping for you then NitroXpress is the right partner for you. </p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser4-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>
                           
                            <div class="tab-pane fade" id="pills-Zero" role="tabpanel" aria-labelledby="pills-Zero-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Zero-Cost Return Pickup</h3>
                                    <p>Returns can be frustrating for businesses of any scale; They cost us money along with unwrapped products. To support clients, we have initiated Zero-Cost Return Pickups; Which means you don’t have to extra for your returns, Just the same amount that you pay for your regular shipments.  </p>
                                    <p>At NitroXpress, our top most priority is to value our clients and we do that from starting to provide our best to end-users. Still, some users returns their bought products back to sallers which costs the sallers. To reduce this, we have enabled return pickups without any fees.</p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser5-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="pills-SDP" role="tabpanel" aria-labelledby="pills-SDP-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Same Day Pick &#38; Drop</h3>
                                    <p>For Faster Delivery types, We have provided Same Day Pickup &#38; Drop Services. Now give your customers advantage of faster delivery with on demand same day pickup and delivery services with us. </p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser6-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>

                            <div class="tab-pane fade" id="pills-Private" role="tabpanel" aria-labelledby="pills-Private-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Interstate Private Courier</h3>
                                    <p>Laverage our Interstate Private Logistic Services to take your business to another lavel. NitroXpress can help you in reaching nation wide customerbase and serve your customers from one state to another with faster and cost effective shipping. </p>
                                    <p>One time users can also use our Interstate Private Courier Service to send their goods and packages to their loved ones in no time. Just request a shipment and leave everything on use. Our team will pack, ship and deliver your package in less then 5 days from one state to another.</p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser7-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-COD" role="tabpanel" aria-labelledby="pills-COD-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Cash On Delivery (COD) Services</h3>
                                    <p>In order to meet the demand of bulk customers for amount collection and for costlier goods, Cash On Delivery(COD) service option is available. </p>
                                    <p>This COD service is available for organizational deliveries, business deliveries, and speed couriers. COD services are fast, safe, and economical solutions for the collection of goods and their remittance to the sender. The amount retrieved from the addressee at the time of delivery will be remitted to the sender through ePayment. </p>
                                    <p>COD will be an address-specific delivery, which means the article will be delivered to any person at the mentioned address on the realization of the required amount. </p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser8-img.png" alt="img" />

                                    </figure>
                                </div>
                            </div>
                            <div class="tab-pane fade" id="pills-Delivery" role="tabpanel" aria-labelledby="pills-Delivery-tab" tabindex="0">
                                <div className='left-part'>
                                    <h3>Special Delivery</h3>
                                    <p>We have introduced Hyper Delivery Services in some selected regions as Special Delivery. With our Special Delivery Service, We can deliver packages within minutes. This is the most fastest logistic shipping service which will allow you to get your item in minutes. </p>
                                    <p>Just provide pickup and delivery address and one of our team member will dedicatedly get pick your product and deliver it to your requested location ; Just in Minutes.</p>
                                    <a  className='btn' onClick={(e)=>{navigate("/support/#contactdata");window.location.reload(false)}} >Get a Quote</a>
                                </div>
                                <div className='right-part'>
                                    <figure>
                                        <img src="images/ser9-img.png" alt="img" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Servicetabs