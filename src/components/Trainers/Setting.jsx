import React, { useState } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import GymBackgroundImage from '../../../public/assets/GymBackgroundImage.jpg'


function TSetting() {

    const [toggleChangePass, setToggleChangePass] = useState(true);
    const [toggleChangePin, setToggleChangePin] = useState(true);

    return (
        <div className='p-4 md:p-6'>
            <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center bottom -27px' }}>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
                <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
                    Setting
                </h2>
            </div>

            

            <div className=" flex flex-wrap justify-evenly items-center">

                <div className="">
                    <div className="flex items-center justify-center my-6"><h2>Forgot Password</h2></div>

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
                        : <div className="">
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


                <div className="">
                    <div className="flex items-center justify-center my-6"><h2>Forgot MPin</h2></div>

                    {toggleChangePin ?
                        <div className="w-full">
                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 w-full">
                                    <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1 w-1/2">
                                        <label htmlFor="oldpin">Old Pin</label>
                                        <input
                                            id='oldpin'
                                            className='bg-transparent outline-none w-full'
                                            placeholder='7777'
                                            type="password" />
                                    </div>
                                    <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1 w-1/2">
                                        <label htmlFor="newpin">New Pin</label>
                                        <input
                                            id='newpin'
                                            className='bg-transparent outline-none w-full'
                                            placeholder='7777'
                                            type="password" />
                                    </div>
                                </div>
                                <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
                                    <label htmlFor="confirmpin">Confirm Pin</label>
                                    <input
                                        id='confirmpin'
                                        className='bg-transparent outline-none w-full'
                                        placeholder='7777'
                                        type="password" />
                                </div>
                            </div>
                            <div className="flex items-center justify-center">
                                <button
                                    onClick={() => setToggleChangePin(false)}
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
                                    onClick={() => setToggleChangePin(true)}
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
            </div>




        </div>
    )
}

export default TSetting
