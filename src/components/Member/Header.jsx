import React, { useState } from 'react'
// import QR from '../../../public/assets/QR.svg'
import QRSccanner from '../../../public/assets/QRSccanner.svg'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import Arrow from '../../../public/assets/ArrowDown.svg'
import '../../../public/styles/Global.css';
import { CheckCheck, QrCodeIcon, ScanBarcode, ScanIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

function Header({setShowQR, isOpen, setIsOpen, DropDownView, setDropDownView, setShowQRCode}) {


  const navigate = useNavigate();

  function DropDownClick() {
    setDropDownView(!DropDownView);
  }

  return (
    <div className='flex abstolute z-40 top-0 items-center justify-end md:justify-between w-full px-7 md:px-24 h-24'>

      <div onClick={()=>{setShowQRCode(true)}} className="hidden md:flex bg-[#f9fafc] h-12 w-12 items-center justify-center rounded-full"><img className='cursor-pointer' src={QRSccanner} alt="" /></div>
       <div className="flex gap-2 items-center">

            <div  onClick={()=>{setShowQR(true)}} className="rounded-full hidden md:flex h-12 w-12 items-center justify-center cursor-pointer bg-[#f9fafc]"><ScanBarcode color='#dc2626' strokeWidth={'1.5px'} width={'30px'} height={'30px'} /></div>
            <div onClick={()=>{DropDownClick(); setIsOpen(false); navigate('profile')}} className="border cursor-pointer relative z-40 rounded-full h-14 w-14" style={{backgroundImage : `url(${ProfileImage})`, backgroundSize: 'contain', backgroundPosition : 'center'}}>
            </div>

            {/* <div onClick={()=>{DropDownClick(); setIsOpen(false)}} className={`cursor-pointer transition-all duration-500 ease-in-out ${DropDownView && 'rotate-180'} `}><img className='' src={Arrow} alt="" /></div> */}
            {/* <div className={` absolute z-40 bg-white shadow-md border border-[#decfcf] rounded-lg transition-all duration-500 ease-in-out ${DropDownView ? 'block top-24 h-40 w-64 right-20' : 'top-16 h-0 w-0 right-36'}`}></div> */}
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
