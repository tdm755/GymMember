import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import newsBanner from '../../../public/assets/NewBanner.png'
import newsBanner2 from '../../../public/assets/NewsBanner.png'
import banner from '../../../public/assets/banner.png'
import banner2 from '../../../public/assets/banner.jpg'
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
import DashboardCarousel from '../../Utils/CarouselComponent.jsx'

function IndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const OccNews = [
    banner,
    banner,
    banner2,
    banner,
    banner
  ];


  const { setShowQRCode } = useContext(QrContext);


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
    <div className='p-1 md:p-6 flex flex-col gap-8 bg-[#f9fafc] pb-[110px]'>
      <div className="w-full  flex flex-col gap-4 md:flex-row items-center justify-center">
        <DashboardCarousel images={OccNews} autoPlayInterval={3000} />
        <div className="h-48 py-5 rounded-xl border w-full md:w-[700px] flex flex-col bg-white shadow-sm p-4">
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


            <div onClick={() => { setShowQRCode(true) }} className={`flex cursor-pointer flex-col gap-2 items-center md:hidden`}>
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
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col  gap-4">
          {/* Trainer Profile */}
          <div className="bg-white rounded-xl shadow-sm border">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/6 mx-12">
                  <div className="aspect-square rounded-xl bg-gray-100 flex items-center justify-center">
                    <User className="w-1/3 h-1/3 text-[#d1dbea]" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Coach Shailesh</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">(48 reviews)</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewProfileModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors"
                    >
                      <span className='hidden md:block'>View</span> Profile
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mt-6 grid grid-cols-1 md:grid-cols-3  gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Award className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Specialization</div>
                        <div className="text-sm text-gray-600">Strength & Conditioning</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Clients Trained</div>
                        <div className="text-sm text-gray-600">100+ satisfied clients</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                        <Trophy className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Certifications</div>
                        <div className="text-sm text-gray-600">CPT, Nutrition Expert</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Availability</div>
                        <div className="text-sm text-gray-600">Mon-Sat, 6 AM - 9 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Recent Sessions */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Recent Sessions</h2>
            <NavLink to="sessions" className="text-red-600 hover:text-red-700 text-sm font-medium">
              View All
            </NavLink>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {sessions.map((session, index) => {
              if (index < 3) {
                return <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-gray-900">{session.exercise}</h3>
                      <p className="text-sm text-gray-600">{session.trainer}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${session.intensity === 'High'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-blue-100 text-blue-700'
                      }`}>
                      {session.intensity}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-[#dc2626]" />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-[#dc2626]" />
                      <span>{session.time}</span>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex justify-end items-center">
                    {/* <div className="flex items-center gap-1 text-sm">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span>{session.caloriesBurned} cal</span>
                </div> */}

                    <span className="text-green-600 text-sm font-medium">Completed</span>


                  </div>
                </div>
              }
            })}
          </div>
        </div>

      </div>
      {viewProfileModal && <ViewProfile setViewProfileModal={setViewProfileModal} />}
    </div>
  )
}

export default IndexPage
