import React from 'react'
import RectangleImage from '../../public/assets/Rectangle.png';
import GymBGImageLoginPage from '../../public/assets/GymBGVideoLoginPage.mp4';
import { useNavigate } from 'react-router-dom';

function LoginCredentials() {
    const navigate = useNavigate();
  return (
    <div className='flex h-[650px]'>

        <img className='absolute hidden md:block z-10 w-[1120px] h-[650px]' src={RectangleImage} alt="" />
        <div className="relative z-20 border-black h-full w-full md:w-1/2 px-6 flex items-center justify-center " >
            <div className="w-full md:w-[70%] flex flex-col items-center  gap-9">
                <h1 className='text-5xl  font-bold'>Sign In</h1>
                <span className="text-sm text-gray-600">
                    Forgot your password? <a href="/forgotpassword" className="text-[#dc2626] hover:underline">Click here</a> to reset it.
                </span>

                <div className="flex flex-col w-full gap-4">
                    <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
                        <label htmlFor="Email">Email</label>
                        <input
                         className='bg-transparent outline-none'
                         placeholder='example@gmail.com'
                         type="email" />
                    </div>
                    <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
                        <label htmlFor="password">Password</label>
                        <input
                         className='bg-transparent outline-none'
                         placeholder='bilgate@123'
                         type="password" />
                    </div>
                </div>
               
                <button onClick={()=>{navigate('dashboard')}} className='border py-2 w-[90%] bg-[#dc2626] text-white text-lg rounded-md'>sign In</button>
                
            </div>
        </div>
        <div className="hidden md:flex items-center justify-center overflow-hidden h-full md:w-1/2 relative"  style={{backgroundImage : ``, backgroundSize : '750px', backgroundPosition : 'bottom 140px'}}>
          <div className="flex items-center bg-[#e92a2a20] justify-end absolute  top-0 right-0 bottom-0 left-0"></div>
            <video 
            autoPlay
            loop
            muted
            playsInline            
            className='w-[750px]'
            >
            <source src={GymBGImageLoginPage} type="video/mp4"></source>
            </video>
          
        </div>
        
      
    </div>
  )
}

export default LoginCredentials
