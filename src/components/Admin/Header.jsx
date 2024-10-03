import React, { useState } from 'react'
import NotificationIcon from '../../../public/assets/NotificationIcon.svg'
import QRSccanner from '../../../public/assets/QRSccanner.svg'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import Arrow from '../../../public/assets/ArrowDown.svg'
import '../../../public/styles/Global.css';
import { CheckCheck } from 'lucide-react'

function Header({setShowQR, isOpen, setIsOpen, DropDownView, setDropDownView}) {


  function DropDownClick() {
    setDropDownView(!DropDownView);
  }

  return (
    <div className='flex abstolute top-0 items-center justify-between w-full px-7 md:px-24 h-24'>

      <div className="bg-[#f9fafc] h-12 w-12 flex items-center justify-center rounded-full"><img src={NotificationIcon} alt="" /></div>
       <div className="flex gap-2 items-center">

            {/* <div onClick={()=>{setShowQR(true)}} className="rounded-full h-12 w-12 flex items-center justify-center bg-[#f9fafc]"><img src={QRSccanner} alt="" /></div> */}
            <div onClick={()=>{DropDownClick(); setIsOpen(false)}} className="border cursor-pointer relative z-50 rounded-full h-14 w-14" style={{backgroundImage : `url(${ProfileImage})`, backgroundSize: 'contain', backgroundPosition : 'center'}}>
            </div>
            <div onClick={()=>{DropDownClick(); setIsOpen(false)}} className={`cursor-pointer transition-all duration-500 ease-in-out ${DropDownView && 'rotate-180'} `}><img src={Arrow} alt="" /></div>
            
            <div className={` absolute z-50 bg-white shadow-md border border-[#decfcf] rounded-lg transition-all duration-500 ease-in-out ${DropDownView ? 'block top-24 h-40 w-64 right-20' : 'top-16 h-0 w-0 right-36'}`}></div>
            <div className=" md:hidden">
                <input onClick={()=>{setIsOpen(!isOpen); setDropDownView(false)}} type="checkbox" id="checkbox" checked={isOpen} />
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
