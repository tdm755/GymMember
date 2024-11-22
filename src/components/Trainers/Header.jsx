import React, { useState } from 'react'
import NotificationIcon from '../../../public/assets/NotificationIcon.svg'
// import QRSccanner from '../../../public/assets/'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import Arrow from '../../../public/assets/ArrowDown.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import TrainersIcon from '../../../public/assets/TrainersIcon.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'
import LogoutIcon from '../../../public/assets/LogoutIcon.svg'

import '../../../public/styles/Global.css';
import { CheckCheck, ScanBarcode } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

function THeader({ setShowQR, isOpen, setIsOpen, DropDownView, setDropDownView, setShowLogoutModal }) {


  const navigate = useNavigate();

  function DropDownClick() {
    setDropDownView(!DropDownView);
  }

  return (
    <div className='flex abstolute z-40 top-0 items-center justify-between w-full px-7 md:px-24 h-24'>

      <div className="h-12 w-12 flex items-center border justify-center rounded-md">
        {/* <img src={NotificationIcon} alt="" /> */}
      </div>
      <div className="flex gap-2 items-center">

        <div onClick={() => { setShowQR(true) }} className="cursor-pointer rounded-full h-12 w-12 hidden md:flex items-center justify-center bg-[#f9fafc]"><ScanBarcode color='#dc2626' strokeWidth={'1.5px'} width={'30px'} height={'30px'} /></div>
        <div onClick={() => { DropDownClick(); setIsOpen(false)}} className="border cursor-pointer relative z-40 rounded-full h-14 w-14" style={{ backgroundImage: `url(${ProfileImage})`, backgroundSize: 'contain', backgroundPosition: 'center' }}>
        </div>
        <div onClick={() => { DropDownClick(); setIsOpen(false) }} className={`cursor-pointer transition-all duration-500 ease-in-out ${DropDownView && 'rotate-180'} `}><img src={Arrow} alt="" /></div>

        <div className={` absolute z-40 bg-white shadow-md border border-[#decfcf] rounded-lg transition-all duration-500 ease-in-out ${DropDownView ? 'block top-24 h-40 w-64 right-20 py-2' : 'top-16 h-0 w-0 right-36 py-0'} overflow-hidden`}>
          <ul className='flex flex-col gap-4 justify-evenly h-full'>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center">
                <NavLink to={'assignedmembers'}>
                  {({ isActive }) => (
                    <div onClick={()=>{setDropDownView(false)}} className="flex gap-2 px-2">
                     <div className={`${isActive && 'bg-[#f4eded]'} px-2 py-1 rounded-lg flex items-center justify-center`}>
                        <img className='w-5' src={TrainersIcon} alt="" />
                      </div>
                      <li className='cursor-pointer  py-1 px-2 '>Assigned Members</li>
                    </div>
                  )}
                </NavLink>
              </div>

              <div className="flex gap-2 justify-between px-3">
                <NavLink to={'profile'}>
                  {({ isActive }) => (
                    <div onClick={()=>{setDropDownView(false)}} className="flex gap-2">
                       <div className={`${isActive && 'bg-[#f4eded]'} px-2  py-1 rounded-lg flex items-center justify-center`}>
                        <img className='w' src={ProfileIcon} alt="" />
                      </div>
                      <li className='cursor-pointer  py-1 px-2 '>Profile</li>
                    </div>
                  )}
                </NavLink>
                <span className="text-[#dc2626]">|</span>
                <NavLink to={'setting'}>
                  {({ isActive }) => (
                    <div onClick={()=>{setDropDownView(false)}} className="flex gap-2">
                      <li className='curs or-pointer  py-1 px-2 '>Setting</li>
                      <div className={`${isActive && 'bg-[#f4eded]'} px-2 py-1 rounded-lg flex items-center justify-center`}>
                        <img className='' src={SettingIcon} alt="" />
                      </div>
                    </div>

                  )}
                </NavLink>
              </div>
            </div>

            <div className="flex items-center justify-center">
              
                  <div onClick={()=>{setIsOpen(false); setDropDownView(false); setShowLogoutModal(true)}} className="flex gap-1 px-2 ">
                    <div className=" px-2 py-1 rounded-lg flex items-center justify-center">
                      <img className='w-5' src={LogoutIcon} alt="" />
                    </div>
                    <li className='cursor-pointer py-1 px-2 '>Logout</li>
                  </div>
               
            </div>

          </ul>
        </div>
        <div className=" md:hidden">
          <input onClick={() => { setIsOpen(!isOpen); setDropDownView(false) }} type="checkbox" id="checkbox" checked={isOpen} />
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

export default THeader
