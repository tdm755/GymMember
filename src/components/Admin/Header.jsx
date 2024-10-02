import React from 'react'
import NotificationIcon from '../../../public/assets/NotificationIcon.svg'
import QRSccanner from '../../../public/assets/QRSccanner.svg'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import '../../../public/styles/Global.css';

function Header({setShowQR, isOpen, setIsOpen}) {
  return (
    <div className='flex abstolute top-0 items-center justify-between w-full px-7 md:px-24 h-24'>

      <div className="bg-[#f9fafc] h-12 w-12 flex items-center justify-center rounded-full"><img src={NotificationIcon} alt="" /></div>
       <div className="flex gap-6 items-center">
            {/* <div onClick={()=>{setShowQR(true)}} className="rounded-full h-12 w-12 flex items-center justify-center bg-[#f9fafc]"><img src={QRSccanner} alt="" /></div> */}
            <div className="border rounded-full h-14 w-14" style={{backgroundImage : `url(${ProfileImage})`, backgroundSize: 'contain', backgroundPosition : 'center'}}></div>
            <div className=" md:hidden">
                <input onClick={()=>{setIsOpen(!isOpen)}} type="checkbox" id="checkbox" />
                    <label for="checkbox" className="toggle">
                    <div className="bars" id="bar1"></div>
                    <div className="bars" id="bar2"></div>
                    <div className="bars" id="bar3"></div>
                </label>
            </div>
       </div>
      
    </div>
  )
}

export default Header
