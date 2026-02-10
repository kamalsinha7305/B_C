import React from 'react';
import { useState } from "react";

function Register() {
    const [data, setdata] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;

        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    console.log(data);
    return (
        <section className='bg-white w-full container mx-auto px-2'>
            <div className=" bg-white my-4 max-w-lg mx-auto rounded p-4">
                <h2>
                    Welcome to Blinkyit
                </h2>
                <form className="grid gap-4 mt-4">
                    <div className='grid'>
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            autoFocus
                            name='name'
                            className='border rounded p-2 bg-blue-50'
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className='grid'>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="text"
                            autoFocus
                            name='email'
                            className='border rounded p-2 bg-blue-50'
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>


                    <div className='grid'>
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoFocus
                            name='password'
                            className='border rounded p-2 bg-blue-50'
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Register