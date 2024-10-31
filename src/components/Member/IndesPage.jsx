import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import newsBanner from '../../../public/assets/NewBanner.png'
import newsBanner2 from '../../../public/assets/NewsBanner.png'
import members from '../../../public/assets/members.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import SessionsIcon from '../../../public/assets/SessionsIcon.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'

function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const OccNews = [
    newsBanner,
    newsBanner2,
    newsBanner,
    newsBanner2,
    newsBanner
  ];


  const sessions = [
    {
      trainer: "Coach Mike",
      exercise: "Chest",
      time: "09:00 AM"
    },
    {
      trainer: "Coach Sarah", 
      exercise: "Back & Biceps",
      time: "02:00 PM"
    },
    {
      trainer: "Coach John",
      exercise: "Legs",
      time: "11:00 AM" 
    },
    {
      trainer: "Coach Emma",
      exercise: "Shoulders",
      time: "03:30 PM"
    },
    {
      trainer: "Coach Mike",
      exercise: "Core",
      time: "04:45 PM"
    },
    {
      trainer: "Coach Lisa",
      exercise: "Arms",
      time: "01:15 PM"
    },
    {
      trainer: "Coach Tom",
      exercise: "Cardio",
      time: "10:30 AM"
    },
    {
      trainer: "Coach Sarah",
      exercise: "Full Body",
      time: "05:00 PM"
    }
  ]


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === OccNews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='p-4 md:p-6 flex flex-col gap-8 bg-[#f9fafc] pb-[110px]'>
    <div className="w-full flex items-center justify-center">
    <div className="h-32 md:h-36 lg:h-48  w-full md:w-[470px] lg:w-[700px] border relative overflow-hidden">
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
    </div>

     <div className="flex flex-col lg:flex- gap-8">
     <div className="flex flex-col md:flex-row gap-4">
     <div className="h-44 py-5 border md:w-[700px] flex flex-col bg-white shadow-sm p-4">
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
      <div className="h-44 py-5 border w-full flex flex-col bg-white shadow-sm p-4">
       
      </div>
     </div>
      <div className="h-44 py-5 border  flex flex-col bg-white shadow-sm p-4">
        <div className="font-semibold">
        <h2>Recent Sessions</h2>
        </div>
       <div className="BTTest flex justify-around h-full items-center overflow-x-auto gap-4">
          {sessions.map((session, index) => (          
            <div key={index} className="flex-shrink-0 flex flex-col gap-2 items-center border rounded-lg p-3 bg-[#f2e9e9c1] min-w-[120px]">
              <div className="text-sm font-medium text-[#dc2626]">{session.exercise}</div>
              <div className="text-xs text-center">
                <div className="font-medium">{session.trainer}</div>
                <div className="text-gray-600">{session.time}</div>
              </div>
            </div>
          ))}

       </div>
      </div>
    </div>
     </div>
  )
}

export default IndexPage
