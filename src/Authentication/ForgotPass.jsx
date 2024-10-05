import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function ForgotPass() {
    const navigate = useNavigate();
    const [toggleChangePass, setToggleChangePass] = useState(true);

  return (
   <div className='w-full md:w-[70%] flex flex-col items-center  gap-9'>
    <h1 className='text-5xl  font-bold'>Forgot Password</h1>
    <span className="text-sm text-gray-600">
        remembered your password? <Link to="/" className="text-[#dc2626] hover:underline">Click here</Link> to sign in.
    </span>
   {toggleChangePass ? 
                    <div className="w-full">
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <div className="border rounded-xl flex flex-col px-3 py-2 outline-dashed outline-1 w-1/2">
                                    <label htmlFor="oldpass">Old Password</label>
                                    <input
                                        id='oldpass'
                                        className='bg-transparent outline-none w-full'
                                        placeholder='GeekRider@123'
                                        type="password" />
                                </div>
                                <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1 w-1/2">
                                    <label htmlFor="newpass">New Password</label>
                                    <input
                                        id='newpass'
                                        className='bg-transparent outline-none w-full'
                                        placeholder='GeekRider@123'
                                        type="password" />
                                </div>
                            </div>
                            <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
                                <label htmlFor="confirmpass">Confirm Password</label>
                                <input
                                    id='confirmpass'
                                    className='bg-transparent outline-none'
                                    placeholder='GeekRider@123'
                                    type="password" />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                onClick={() => setToggleChangePass(false)}
                                className=" my-4 text-[#db3c3c] text-sm px-5 py-2 text-md rounded hover:text-[#c53535] transition duration-300"
                            >
                                Try another way
                            </button>
                            <button
                                className="bg-[#db3c3c] my-4 text-white px-5 py-2 text-md rounded hover:bg-[#c53535] transition duration-300"
                            >
                                Change
                            </button>
                        </div>
                    </div>
                        : <div className="w-full">
                            <div className="flex flex-col gap-2">
                                <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id='email'
                                        className='bg-transparent outline-none w-full'
                                        placeholder='geekrider@gmail.com'
                                        type="email" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => setToggleChangePass(true)}
                                    className=" my-4 text-[#db3c3c] text-sm px-5 py-2 text-md rounded hover:text-[#c53535] transition duration-300"
                                >
                                    Try another way
                                </button>
                                <button
                                    className="bg-[#db3c3c] my-4 text-white px-5 py-2 text-md rounded hover:bg-[#c53535] transition duration-300"
                                >
                                    Send Email
                                </button>
                            </div>
                        </div>}
   </div>
  )
}

export default ForgotPass
