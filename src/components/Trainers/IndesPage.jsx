import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import newsBanner from '../../../public/assets/NewBanner.png'
import newsBanner2 from '../../../public/assets/NewsBanner.png'
import members from '../../../public/assets/members.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import SessionsIcon from '../../../public/assets/SessionsIcon.svg'
import SettingIcon from '../../../public/assets/SettingIcon.svg'
import { User, Star, Award, ArrowRight, Clock, Users, Calendar, Trophy } from 'lucide-react';
import DashboardCarousel from '../../Utils/CarouselComponent'
import banner from '../../../public/assets/banner.png'
import banner2 from '../../../public/assets/banner.jpg'


function TIndexPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const OccNews = [
    banner,
    banner,
    banner2,
    banner,
    banner
  ];

  const sessions = [
    {
      Member: "Emma Smith",
      exercise: "Shoulders",
      time: "03:30 PM",
      date: "2024-01-16"
    },
    {
      Member: "Mike Tyson",
      exercise: "Core",
      time: "04:45 PM",
      date: "2024-01-17"
    },
    {
      Member: "Jake Paul",
      exercise: "Arms",
      time: "01:15 PM",
      date: "2024-01-17"
    },
    {
      Member: "Neeraj Goyet",
      exercise: "Cardio",
      time: "10:30 AM",
      date: "2024-01-18"
    },
    {
      Member: "Sarah Johnson",
      exercise: "Full Body",
      time: "05:00 PM",
      date: "2024-01-18"
    },
    {
      Member: "Emma Smith",
      exercise: "Shoulders",
      time: "03:30 PM",
      date: "2024-01-16"
    },
    {
      Member: "Mike Tyson",
      exercise: "Core",
      time: "04:45 PM",
      date: "2024-01-17"
    },
    {
      Member: "Jake Paul",
      exercise: "Arms",
      time: "01:15 PM",
      date: "2024-01-17"
    },
    {
      Member: "Neeraj Goyet",
      exercise: "Cardio",
      time: "10:30 AM",
      date: "2024-01-18"
    },
    {
      Member: "Sarah Johnson",
      exercise: "Full Body",
      time: "05:00 PM",
      date: "2024-01-18"
    }
  ]


  return (
    <div className='p-4 md:p-6 flex flex-col gap-8 bg-[#f9fafc] pb-[110px]'>
      <div className="w-full  flex flex-col gap-4 md:flex-row items-center justify-center">
        <DashboardCarousel images={OccNews} autoPlayInterval={3000} />
        <div className="h-48 py-5 rounded-xl border w-full md:w-[700px] flex flex-col bg-white shadow-sm p-4">
          <div className="font-semibold">
            <h2>Quick Actions</h2>
          </div>
          <div className="flex justify-around h-full items-center">
            <NavLink to={'assignedmembers'} className=''>
              <div className='flex flex-col gap-2 items-center'>
                <div className={`bg-[#f2e9e9c1] w-[50px] h-[50px] rounded-2xl flex items-center justify-center`}>
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

      <div className="flex flex-col lg:flex- gap-8">
        <div className="flex flex-col md:flex-row gap-4">
          
          <div className="h-44 py-5 border md:w-1/3 flex flex-col bg-white shadow-sm p-4">
            <div className="font-semibold">
              <h2>Member Ratings</h2>
            </div>
            <div className="flex flex-col h-full justify-center">
              <div className="flex items-center justify-center gap-4">
                <div className="text-4xl font-bold text-[#dc2626]">4.8</div>
                <div className="flex flex-col">
                  <div className="text-sm font-medium">Average Rating</div>
                  <div className="text-xs text-gray-500">Based on 124 reviews</div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-4">
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">5★</div>
                  <div className="text-xs text-gray-500">82%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">4★</div>
                  <div className="text-xs text-gray-500">12%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">3★</div>
                  <div className="text-xs text-gray-500">4%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">2★</div>
                  <div className="text-xs text-gray-500">1%</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-sm font-medium">1★</div>
                  <div className="text-xs text-gray-500">1%</div>
                </div>
              </div>
            </div>
          </div>
          <div className="h-44 py-5 border md:w-1/3 flex flex-col bg-white shadow-sm p-4"></div>
          <div className="h-44 py-5 border md:w-1/3 flex flex-col bg-white shadow-sm p-4"></div>
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
                      <p onClick={() => { navigate('assignedmembers') }} className="text-sm hover:scale-x-105 hover:text-[#dc2626] cursor-pointer transition-all duration-200 ease-in-out text-gray-600">{session.Member}</p>
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
    </div>
  )
}

export default TIndexPage
