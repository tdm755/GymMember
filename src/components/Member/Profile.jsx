import React, { useState } from 'react'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import GymBackgroundImage from '../../../public/assets/GymBackgroundImage.jpg'

function Profile() {

  const [ProfileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dob : '',
    address: '',
    gender : '',
    weight : '',
    height : '',
    emergencycontact : '',
    membershipType : '', 
    fitnessGoal : '',
    fitnessLevel : '',
    healthCondition : '',
  });

  const handleinnputchange = () =>{

  }


  return (
    <div className='pb-32'>

        <div className="relative h-40" style={{backgroundImage : `url(${GymBackgroundImage})`, backgroundSize : 'contain'}}>
            <div className="h-36 w-36 rounded-full absolute -bottom-12 left-7" style={{backgroundImage : `url(${ProfileImage})`, backgroundSize : 'cover'}}></div>
        </div>

        <div className="mt-32 w-full flex flex-wrap px-7 gap-4">
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="name">Full Name : </label>
                <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full' type="text" id="name" name='fullname' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="email">Email : </label>
                <input onChange={handleinnputchange} className='flex flex-col border outline-none p-2 w-full' type="email" id="email" name='email' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                <label htmlFor="phone">Phone : </label>
                <input  className='flex flex-col border outline-none p-2 w-full' type="tel" id="phone" name='phone' />
            </div>
            <div className= "w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="dob">Date of Birth : </label>
                <input className='flex flex-col border outline-none p-2 w-full' type="date" id="dob" name='dob' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="gender">Gender : </label>
                <select className='flex flex-col border outline-none p-2 w-full' id="gender" name='gender'>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                <label htmlFor="weight">Weight (kg) : </label>
                <input className='flex flex-col border outline-none p-2 w-full' type="number" id="weight" name='weight' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="height">Height (cm) : </label>
                <input className='flex flex-col border outline-none p-2 w-full' type="number" id="height" name='height' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="emergency-contact">Emergency Contact : </label>
                <input className='flex flex-col border outline-none p-2 w-full' type="tel" id="emergency-contact"  name='emergencycontact' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 ">
                <label htmlFor="membership-type">Membership Type : </label>
                <select className='flex flex-col border outline-none p-2 w-full' id="membership-type" name='membershipType'>
                    <option value="">Select Membership Type</option>
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="vip">VIP</option>
                </select>
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="address">Address : </label>
                <textarea className='flex flex-col border outline-none p-2 w-full' type="text" id="address" name='address' />
            </div>
           
            
            
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4">
                <label htmlFor="fitness-goals">Fitness Goals : </label>
                <select className='flex flex-col border outline-none p-2 w-full' id="fitness-goals" name='fitnessGoal'>
                    <option value="">Select Fitness Goal</option>
                    <option value="weight-loss">Weight Loss</option>
                    <option value="muscle-gain">Muscle Gain</option>
                    <option value="endurance">Improve Endurance</option>
                    <option value="flexibility">Increase Flexibility</option>
                    <option value="overall-health">Overall Health Improvement</option>
                </select>
            </div>
            <div className="address w-full md:w-[45%] lg:w-[32%] mb-4">
                <label htmlFor="fitness-level">Current Fitness Level : </label>
                <select className='flex flex-col border outline-none p-2 w-full' id="fitness-level" name='fitnessLevel'>
                    <option value="">Select Fitness Level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                </select>
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="health-conditions">Health Conditions : </label>
                <textarea className='flex flex-col border outline-none p-2 w-full' id="health-conditions" rows="3" name='healthCondition'></textarea>
            </div>
            <div className="w-full flex items-center justify-end">
                <button className='border px-7 py-3 rounded-lg bg-[#dc2626] text-white'>Save Changes</button>
            </div>
        </div>


              
    </div>
  )
}

export default Profile
