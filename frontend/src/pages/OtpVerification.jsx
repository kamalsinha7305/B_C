import React from 'react';
import { useState } from "react";
import { FaEyeSlash ,FaEye} from "react-icons/fa";
import toast from 'react-hot-toast';
import axios  from 'axios'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError';
import {useNavigate, Link} from "react-router-dom"
function OtpVerification() {
    const [data, setdata] = useState(["","","","","",""])
    const navigate =useNavigate();
    const valideValue = data.every(el => el)
    const handlesubmit = async(e)=>{
        e.preventDefault() 
    
        try{
             const response =await Axios({
            ...SummaryApi.otpVerification,
               data: data             
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.success(response.data.message)
            setdata(["","","","","",""])
            //navigate('/verification-otp');
        }

        }catch(error){
            AxiosToastError(error);
        }
       
    }


    return (
        <section className='bg-white w-full container mx-auto px-2'>
            <div className=" bg-white my-4 max-w-lg mx-auto rounded p-7">
                <h2 className="font-semibold textt-lg">Enter Your Otp</h2>
                <form className="grid gap-4 mt-4" onSubmit={handlesubmit}>
                    <div className='grid'>
                        <label htmlFor="otp">Enter Otp :</label>
                        <input
                            id="text"
                            type="otp"
                            autoFocus
                            className='border rounded p-2 bg-blue-50'
                            placeholder='Enter Your Email'
                        />
                    </div>

                   <button disabled={!valideValue} className={` ${ valideValue ?"bg-green-600" : "bg-gray-400"} text-white py-2 rounded font-semibold my-3 tracking-wide transition-all duration-300 hover:scale-105 `}>Verify Otp</button>

                </form>

                <p>
                    Already have a account ?<Link to={"/login"}>login</Link>
                </p>
            </div>
        </section>
    )
}


export default OtpVerification