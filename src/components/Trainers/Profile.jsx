import React, { useState } from 'react'
import ProfileImage from '../../../public/assets/GymProfileImage.jpg'
import GymBackgroundImage from '../../../public/assets/GymBackgroundImage.jpg'

function TProfile() {

  const [ProfileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dob : '',
    address: '',
    gender : '',
    specialization : '',
    experience : '',
    certifications : '',
  });

  const handleInputChange = () =>{

  }


  return (
    <div className='pb-32'>

        <div className="relative h-40" style={{backgroundImage : `url(${GymBackgroundImage})`, backgroundSize : 'contain'}}>
            <div className="h-36 w-36 rounded-full absolute -bottom-12 left-7" style={{backgroundImage : `url(${ProfileImage})`, backgroundSize : 'cover'}}></div>
        </div>

        <div className="mt-32 w-full flex flex-wrap px-7 gap-4">
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="name">Full Name : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="text" id="name" name='fullname' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="email">Email : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="email" id="email" name='email' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                <label htmlFor="phone">Phone : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="tel" id="phone" name='phone' />
            </div>
            <div className= "w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="dob">Date of Birth : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="date" id="dob" name='dob' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="gender">Gender : </label>
                <select onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' id="gender" name='gender'>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pl-2">
                <label htmlFor="specialization">Specialization : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="text" id="specialization" name='specialization' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 pr-2">
                <label htmlFor="experience">Experience (years) : </label>
                <input onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' type="number" id="experience" name='experience' />
            </div>
            <div className=" w-full md:w-[45%] lg:w-[32%] mb-4 px-2">
                <label htmlFor="certifications">Certifications : </label>
                <textarea onChange={handleInputChange} className='flex flex-col border outline-none p-2 w-full' id="certifications" rows="3" name='certifications'></textarea>
            </div>
            <div className="w-full flex items-center justify-end">
                <button className='border px-7 py-3 rounded-lg bg-[#dc2626] text-white'>Save Changes</button>
            </div>
        </div>
              
    </div>
  )
}

export default TProfile
