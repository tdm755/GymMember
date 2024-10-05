import React from 'react'
import RectangleImage from '../../public/assets/Rectangle.png';
import GymBGImageLoginPage from '../../public/assets/GymBGVideoLoginPage.mp4';
import { Outlet, useNavigate } from 'react-router-dom';

function LoginCredentials() {
    const navigate = useNavigate();
  return (
    <div className='flex h-[650px]'>

        <img className='absolute hidden md:block z-10 w-[1120px] h-[650px]' src={RectangleImage} alt="" />
        <div className="relative z-20 border-black h-full w-full md:w-1/2 px-6 flex items-center justify-center " >
           <Outlet />
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
