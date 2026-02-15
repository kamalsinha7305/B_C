import React from 'react';
import { useState } from "react";
import { FaEyeSlash ,FaEye} from "react-icons/fa";
import toast from 'react-hot-toast';
import axios  from 'axios'
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError';
function Register() {
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [showpassword,setshowpasword] = useState(false);
    const [showconfirmPassword,setshowconfirmPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handlesubmit = async(e)=>{
        e.preventDefault() 
        if(data.password !== data.confirmPassword){
            toast.error(
            "password and confirm password should be same"
            )
            return;

        }

        try{
             const response =await Axios({
            ...SummaryApi.register,
               data: data             
        })
        if(response.data.error){
            toast.error(response.data.message)
        }
        if(response.data.success){
            toast.error(response.data.message)
        }

        }catch(error){
            AxiosToastError(error);
        }
       
    }
    const valideValue = Object.values(data).every(el => el)
    return (
        <section className='bg-white w-full container mx-auto px-2'>
            <div className=" bg-white my-4 max-w-lg mx-auto rounded p-7">
                <h2>
                    Welcome to Blinkyit
                </h2>
                <form className="grid gap-4 mt-4" onSubmit={handlesubmit}>
                    <div className='grid'>
                        <label htmlFor="name">Name :</label>
                        <input
                            id="name"
                            type="text"
                            autoFocus
                            name='name'
                            className='border rounded p-2 bg-blue-50'
                            value={data.name}
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                        />
                    </div>

                    <div className='grid'>
                        <label htmlFor="email">Email :</label>
                        <input
                            id="email"
                            type="text"
                            autoFocus
                            name='email'
                            className='border rounded p-2 bg-blue-50'
                            value={data.email}
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                        />
                    </div>

                    <div className='grid'>
                        <label htmlFor="password">Password :</label>
                        <div className="border rounded p-2 bg-blue-50 flex items-center focus-within:border-primary-200">
                            <input
                            id="password"
                            type={showpassword ?"text":"password"}
                            autoFocus
                            name='password'
                            className='w-full outline-none'
                            value={data.password}
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                        />    
                        
                        <div onClick={()=>{
                            setshowpasword(preve =>! preve)
                        }} className='cursor-pointer w-'>
                            {
                                showpassword?(
                                            <FaEye />
                                ):(
                                            <FaEyeSlash />
                                )
                            }
                        
                        </div>
                        </div>
                        
                    </div>

                     <div className='grid'>
                        <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className="border rounded p-2 bg-blue-50 flex items-center focus-within:border-primary-200">
                            <input
                            id="confirmPassword"
                            type={showconfirmPassword ?"text":"password"}
                            autoFocus
                            name='confirmPassword'
                            className='w-full outline-none'
                            value={data.confirmPassword}
                            onChange={handleChange}
                            placeholder='Enter Your Password'
                        />    
                        
                        <div onClick={()=>{
                            setshowconfirmPassword(preve =>! preve)
                        }} className='cursor-pointer w-'>
                            {
                                showconfirmPassword?(
                                            <FaEye />
                                ):(
                                            <FaEyeSlash />
                                )
                            }
                        
                        </div>
                        </div>
                        
                    </div>

                   <button disabled={!valideValue} className={` ${ valideValue ?"bg-green-600" : "bg-gray-400"} text-white py-2 rounded font-semibold my-3 tracking-wide transition-all duration-300 hover:scale-105 `}>Register User</button>

                </form>
            </div>
        </section>
    )
}

export default Register