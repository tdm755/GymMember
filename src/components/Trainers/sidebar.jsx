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
import { useSwipeable } from 'react-swipeable'


function TSideBar({ isOpen, setIsOpen, DropDownView, setDropDownView }) {

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


                {/* <div className="">
                    <div onClick={()=> {setAccordian1(!Accordian1); setDropDownView(false);}} className='flex cursor-pointer gap-2 items-center'>
                        <div className={`${(pathname.includes('addmember') || pathname.includes('addtrainer')) && 'bg-[#f2e9e9c1]'}  w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                            <img src={ProfileIcon} alt="" />
                        </div>
                        <div className="flex justify-between items-center gap-2"><span>Add User</span> <img className={`${Accordian1 && 'rotate-180'} transition-all duration-500 ease-in-out`} src={ArrowDown} alt="" /></div>
                    </div>
                    <div onClick={()=>{setIsOpen(false);}} className={`ml-4  pb-0 flex-col gap-4 flex overflow-hidden ${Accordian1 ? 'h-24 p-4' : 'h-0 p-0'} transition-all duration-500 ease-in-out`}>
                        <NavLink to={'addtrainer'} className=''>
                            {({ isActive }) => (
                                <div className='flex gap-2 items-center'>
                                    <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[30px] h-[30px] rounded-xl flex items-center justify-center`}>
                                        <img className='w-5'  src={ProfileAddIcon} alt="" />
                                    </div>
                                    <span>Add Trainer</span>
                                </div>

                            )}
                        </NavLink>
                        <NavLink to={'addmember'} className=''>
                            {({ isActive }) => (
                                <div onClick={()=>{setIsOpen(false);}} className='flex gap-2 items-center'>
                                    <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[30px] h-[30px] rounded-xl flex items-center justify-center`}>
                                        <img  className='w-5' src={ProfileAddIcon} alt="" />
                                    </div>
                                    <span>Add Member</span>
                                </div>

                            )}
                        </NavLink>
                    </div>
                </div> */}

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

                <NavLink to={'allmembers'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={SessionsIcon} alt="" />
                            </div>
                            <span>Members</span>
                        </div>

                    )}
                </NavLink>

                <NavLink to={'schedule'} className=''>
                    {({ isActive }) => (
                        <div onClick={()=>{setAccordian1(false); setIsOpen(false); setDropDownView(false)}} className='flex gap-2 items-center'>
                            <div className={`${isActive && 'bg-[#f2e9e9c1]'} w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                                <img src={ScheduleIcon} alt="" />
                            </div>
                            <span>Schedule</span>
                        </div>

                    )}
                </NavLink>
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
            </div>
        </div>
    )
}

export default TSideBar
