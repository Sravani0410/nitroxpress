import React, { useEffect, useState } from 'react'
import Layout from '../Components/DashboardLayout/Layout'
import QRCode from 'qrcode'
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";


const Shippingpayment = () => {
    const navigate = useNavigate();


    const [QrcodeImage, setQrcodeImage] = useState("")

    useEffect(() => {
       
        QrCodeScanerFun()
    }, [])

    const QrCodeScanerFun = async () => {
        try {
            const response = await QRCode.toDataURL('Just Test QR-Code')
            setQrcodeImage(response)

        } catch (error) {

        }

    }

    return (
        <Layout>
            <div className="shippingpayment-sec">
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-md-6'>
                            <img src="images/img14.svg" alt="img" />
                        </div>
                        <div className='col-md-6 mt-4   mt-md-0'>
                            <div className='row'>
                                <div className='col-6'>
                                    <label className='creditcard-box'> Credit Card
                                        <input type="radio" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <div className='col-6 text-end'>
                                    <img src="images/shimg1.png" alt='img' className='pe-4' />
                                </div>
                            </div>
                            < hr />
                            <div className='form-group ps-4'>
                                <div className='row'>
                                    <div className='col-12 mb-3'>
                                        <input type="text" placeholder="Card Noumber" className="form-control" />
                                    </div>
                                    <div className='col-12 mb-3'>
                                        <input type="text" placeholder="Name of Card" className="form-control" />
                                    </div>
                                    <div className='col-6 mb-3'>
                                        <input type="date" placeholder="Expiration Date (mm / YY)" className="form-control" />
                                    </div>
                                    <div className='col-6 mb-3'>
                                        <input type="text" placeholder="Security Code" className="form-control" />
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className='row align-items-center'>
                                <div className='col-4'>
                                    {/* <img src="images/shimg2.png" alt='img' /> */}
                                    <img src={QrcodeImage} alt='img' />
                                </div>
                                <div className='col-8'>
                                    <h3 className='mb-3'>Scan and Pay</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque mi blandit adipiscing odio ac platea.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                                </div>
                                <div className='col-12 text-end'>
                                    <button type='btn' className='btn'>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout >
    )
}

export default Shippingpayment