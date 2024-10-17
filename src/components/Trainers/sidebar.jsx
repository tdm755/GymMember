import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import HomeIcon from '../../../public/assets/HomeIcon.svg'
import ProfileAddIcon from '../../../public/assets/ProfileAddIcon.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'
import TrainersIcon from '../../../public/assets/TrainersIcon.svg'
import ScheduleIcon from '../../../public/assets/ScheduleIcon.svg'
import CalendarIcon from '../../../public/assets/CalendarIcon2.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import SessionsIcon from '../../../public/assets/SessionsIcon.svg'
import members from '../../../public/assets/members.svg'
import { useSwipeable } from 'react-swipeable'


function TSideBar({ isOpen, setIsOpen, DropDownView, setDropDownView, setShowLogoutModal }) {

    const [Accordian1, setAccordian1] = useState(false);

    const location = useLocation();
    const {pathname} = location;

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (isOpen) {
                setIsOpen(false);
            }
        },
        trackMouse: true,
        preventDefaultTouchmoveEvent: true,
        trackTouch: true,
        delta: 10,
        swipeDuration: 500,
    });

   

    return (
        <div 
            {...handlers} 
            className={`sidebar fixed z-50 shadow-lg border-r bottom-0 top-0 overflow-y-auto no-scrollbar w-60 flex flex-col gap-20 py-7 bg-[#f9fafc] ${!isOpen ? '-left-60 md:left-0' : 'left-0'} transition-all duration-500`}
        >
            <div className="flex items-center justify-center">
                <div className="border rounded-md h-20 w-20"></div>
            </div>
            <div className="flex flex-col gap-3 pl-7">
                <NavLink to={'/trainerdashboard'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${pathname === '/dashboard' && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={HomeIcon} alt="" />
                            </div>

                            <span>Home</span>

                        </div>

                    )}
                </NavLink>


                <NavLink to={'calendar'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={CalendarIcon} alt="" />
                            </div>
                            <span>Calendar</span>
                        </div>

                    )}
                </NavLink>

                <NavLink to={'sessions'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={SessionsIcon} alt="" />
                            </div>
                            <span>Sessions</span>
                        </div>

                    )}
                </NavLink>

                <NavLink to={'assignedmembers'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={members} alt="" />
                            </div>
                            <span>Assigned Members</span>
                        </div>

                    )}
                </NavLink>

                <NavLink to={'allmembers'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={members} alt="" />
                            </div>
                            <span>All Members</span>
                        </div>

                    )}
                </NavLink>

                {/* <NavLink to={'schedule'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={ScheduleIcon} alt="" />
                            </div>
                            <span>Schedule</span>
                        </div>

                    )}
                </NavLink> */}
                <NavLink to={'profile'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={ProfileIcon} alt="" />
                            </div>
                            <span>Profile</span>
                        </div>

                    )}
                </NavLink>

            </div>
            <div className="mt-10 pl-7" >

                <NavLink to={'setting'}>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={SettingIcon} alt="" />
                            </div>
                            <span>Setting</span>
                        </div>

                    )}
                </NavLink>
                            
                <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false); setShowLogoutModal(true)}} className='flex gap-2 items-center cursor-pointer'>
                            <div className={`w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={ProfileIcon} alt="" />
                            </div>
                            <span>Logout</span>
                        </div>

                
            </div>
        </div>
    )
}

export default TSideBar
