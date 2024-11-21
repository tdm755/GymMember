import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import newsBanner from '../../../public/assets/NewBanner.png'
import newsBanner2 from '../../../public/assets/NewsBanner.png'
import ProfileImage from '../../../public/assets/ProfileImage.png'
import members from '../../../public/assets/members.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import SessionsIcon from '../../../public/assets/SessionsIcon.svg'
import NotificationIcon from '../../../public/assets/NotificationIcon.svg'
import QRScanner from '../../../public/assets/QRSccanner.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'
import { User, Star, Award, ArrowRight, Clock, Users, Calendar, Trophy } from 'lucide-react';
import ViewProfile from './ViewProfile.jsx'
import { QrContext } from '../MemberDashboard.jsx'

function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const OccNews = [
    newsBanner,
    newsBanner2,
    newsBanner,
    newsBanner2,
    newsBanner
  ];


  const {setShowQRCode} = useContext(QrContext);


  const sessions = [
    {
      trainer: "Coach Mike",
      exercise: "Chest",
      time: "09:00 AM",
      date: "2024-01-15"
    },
    {
      trainer: "Coach Sarah",
      exercise: "Back & Biceps",
      time: "02:00 PM",
      date: "2024-01-15"
    },
    {
      trainer: "Coach John",
      exercise: "Legs",
      time: "11:00 AM",
      date: "2024-01-16"
    },
    {
      trainer: "Coach Emma",
      exercise: "Shoulders",
      time: "03:30 PM",
      date: "2024-01-16"
    },
    {
      trainer: "Coach Mike",
      exercise: "Core",
      time: "04:45 PM",
      date: "2024-01-17"
    },
    {
      trainer: "Coach Lisa",
      exercise: "Arms",
      time: "01:15 PM",
      date: "2024-01-17"
    },
    {
      trainer: "Coach Tom",
      exercise: "Cardio",
      time: "10:30 AM",
      date: "2024-01-18"
    },
    {
      trainer: "Coach Sarah",
      exercise: "Full Body",
      time: "05:00 PM",
      date: "2024-01-18"
    }
  ]

  const [viewProfileModal, setViewProfileModal] = useState(false)

  useEffect(() => {
    if (viewProfileModal) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'auto'

    }
  }, [viewProfileModal])


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === OccNews.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='md:p-6 flex flex-col gap-8 bg-[#f9fafc] pb-[110px]'>
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
        <div className="flex flex-col md:flex-row gap-4 p-4">
          <div className="h-44 py-5 border md:w-[700px] flex flex-col bg-white shadow-sm p-4">
            <div className="font-semibold">
              <h2>Quick Actions</h2>
            </div>
            <div className="flex justify-around h-full items-center">
              <NavLink to={'notification'} className=''>
                <div className='flex flex-col gap-2 items-center'>
                  <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center `}>
                    <img src={NotificationIcon} alt="" />
                  </div>
                  <span className='text-[11px] text-center'>Notification</span>
                </div>
              </NavLink>
              <NavLink to={'profile'} className='hidden md:flex'>
                <div className='flex flex-col gap-2 items-center'>
                  <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                    <img src={ProfileIcon} alt="" />
                  </div>
                  <span className='text-[11px] text-center'>Profile</span>
                </div>
              </NavLink>


              <div onClick={() => {setShowQRCode(true)}} className={`flex cursor-pointer flex-col gap-2 items-center md:hidden`}>
                <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                  <img src={QRScanner} alt="" />
                </div>
                <span className='text-[11px] text-center'>QR</span>
              </div>


              <NavLink to={'sessions'} className=''>
                <div className='flex flex-col gap-2 items-center'>
                  <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                    <img src={SessionsIcon} alt="" />
                  </div>
                  <span className='text-[11px] text-center whitsp'>Sessions</span>
                </div>
              </NavLink>
              <NavLink to={'setting'} className=''>
                <div className='flex flex-col gap-2 items-center'>
                  <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
                    <img src={SettingIcon} alt="" />
                  </div>
                  <span className='text-[11px] text-center whitsp'>Setting</span>
                </div>
              </NavLink>

            </div>
          </div>

          <div className="w-full bg-white shadow-sm border border-gray-200">
            <div className="py-4 flex flex-col md:flex-row items-center justify-between md:items-start px-10 gap-6">
              {/* Left Section - Profile and Details */}
              <div className="flex-grow">
                <div className="flex justify-center md:justify-start items-center space-x-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-400" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">Trainer Shailesh</h2>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">(48 reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-1">
                    <Award className="w-4 h-4 text-[#dc2626]" />
                    <span className="text-gray-600 text-sm">Fitness, Weight Loss, Strength Training</span>
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex items-center space-x-2">
                      <Trophy className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Certified:</span> CPT, Nutrition
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-600">5+ years experience</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">100+ clients trained</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="text-sm text-gray-600">Available: Mon-Sat</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - Action Button */}
              <div className="flex flex-col items-end gap-2">
                <button onClick={() => setViewProfileModal(true)} className="h-10 bg-[#dc2626] hover:bg-[#b91c1c] text-white py-2 px-4 rounded-m transition-colors duration-200 flex items-center justify-center gap-2">
                  View Full Profile
                  <ArrowRight className="w-4 h-4" />
                </button>
                {/* <span className="text-sm text-gray-500">Response time: &lt;2 hours</span> */}
              </div>
            </div>
          </div>

        </div>

        <div className="h-44 py-5 border  flex flex-col bg-white shadow-sm p-">
          <div className="font-semibold px-8 ">
            <h2>Recent Sessions</h2>
          </div>
          <div className="BTTest flex justify-around h-full items-center overflow-x-auto gap-4">
            {sessions.map((session, index) => (
              <div key={index} className="flex-shrink-0 flex flex-col gap-2 items-center border rounded-lg px-2 py-3 bg-[#f2e9e9c1] min-w-[190px]">
                <div className="text-sm font-medium text-[#dc2626]">{session.exercise}</div>
                <div className="text-xs text-center">
                  <div className="font-medium">{session.trainer}</div>
                  <div className="flex gap-2 justify-between w-full">
                    <div className="text-gray-600">{session.date}</div>
                    <div className="text-gray-600">{session.time}</div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
      {viewProfileModal && <ViewProfile setViewProfileModal={setViewProfileModal} />}
    </div>
  )
}

export default IndexPage
