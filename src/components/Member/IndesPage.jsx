import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import newsBanner from '../../../public/assets/NewBanner.png'
import members from '../../../public/assets/members.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import SessionsIcon from '../../../public/assets/SessionsIcon.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'

function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const OccNews = [
    '../../../public/assets/NewBanner.png',
    '../../../public/assets/NewsBanner.png',
    '../../../public/assets/NewBanner.png',
    '../../../public/assets/NewsBanner.png',
    '../../../public/assets/NewBanner.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === OccNews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='p-4 md:p-6 flex flex-col lg:flex-row gap-10 bg-[#f9fafc]'>
      <div className="h-32 border relative overflow-hidden md:w-[400px]">
        {OccNews.map((image, index) => (
          <img
            key={index}
            src={`${image}`}
            alt=""
            className={`slide absolute w-full h-full object-cover ${index === currentIndex ? 'left-0' :
                index < currentIndex ? 'left' : 'right'
              }`}
            style={{
              transform: `translateX(${(index - currentIndex) * 100}%)`
            }}
          />
        ))}
      </div>

      <div className="h-44 py-5 border md:w-[400px] flex flex-col bg-white shadow-sm p-4">
        <div className="font-semibold">
            <h2>Quich Actions</h2>
        </div>
       <div className="flex justify-around h-full items-center">
       <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              {/* <img src={members} alt="" /> */}
              <span className='text-[#dc2626] text-lg'>10</span>
            </div>
            <span className='text-xs text-center font-medium'>A-Members</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={ProfileIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium'>Profile</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SessionsIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Sessions</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SettingIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Setting</span>
          </div>
        </NavLink>

       </div>
      </div>
      <div className="h-44 py-5 border md:w-[400px] flex flex-col bg-white shadow-sm p-4">
        <div className="font-semibold">
            <h2>Quich Actions</h2>
        </div>
       <div className="BTTest flex justify-around h-full items-center overflow-x-auto gap-4">
       <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              {/* <img src={members} alt="" /> */}
              <span className='text-[#dc2626] text-lg'>10</span>
            </div>
            <span className='text-xs text-center font-medium'>A-Members</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={ProfileIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium'>Profile</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SessionsIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Sessions</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SettingIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Setting</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              {/* <img src={members} alt="" /> */}
              <span className='text-[#dc2626] text-lg'>10</span>
            </div>
            <span className='text-xs text-center font-medium'>A-Members</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={ProfileIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium'>Profile</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SessionsIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Sessions</span>
          </div>
        </NavLink>
        <NavLink to={'assignedmembers'} className=''>
          <div className='flex flex-col gap-2 items-center'>
            <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
              <img src={SettingIcon} alt="" />
            </div>
            <span className='text-xs text-center font-medium whitsp'>Setting</span>
          </div>
        </NavLink>

       </div>
      </div>
    </div>
  )
}

export default IndexPage
