import React, { useRef, useState } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'
import Arrow from '../../../public/assets/ArrowDown.svg';
import SearchIcon from '../../../public/assets/SearchIcon.svg';
import MenuIcon from '../../../public/assets/MenuIcon.svg';
import { User, Ruler, Weight, Target, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



function AssignedMembers() {


  const [menuClick, setMenuClick] = useState(false)
  const navigate = useNavigate();
  const shortRef = useRef();
  function handleSelectTrainerClick() {
    shortRef.current.style.transform = 'rotate(180deg)';
  }
  function handleRemoverSelectClick() {
    shortRef.current.style.transform = 'rotate(0deg)';
  }




  return (
    <div className='p-6'>

      <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-3xl md:text-5xl relative z-20 text-white font-bold mb-4">
          Assigned Members
        </h2>
      </div>


      <div className="">
        {/* headerpart */}
        <div className="flex flex-col md:flex-row w-full gap-7 items-center justify-evenly">
          <div className="relative">
            <select
              onMouseLeave={() => handleRemoverSelectClick()} onMouseDownCapture={() => handleSelectTrainerClick()}
              className='border border-[#dc2626] h-10 w-full px-7 md:w-52 py-1 outline-none rounded-md px-2 appearance-none relative z-20 bg-transparent'
              name="" id="">
              <option value="">select</option>
              <option value="">Beginner</option>
              <option value="">Intermediate</option>
              <option value="">Advance</option>
            </select>
            <span ref={shortRef} className='absolute z-10 right-2 top-1 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
          </div>
          <div className="relative flex items-center">
            <img className='absolute  left-2' src={SearchIcon} alt="" />
            <input
              className='border border-[#decfcf] pl-10 w-full md:w-96 h-10 py-[5px] outline-none focus:border-[#dc2626] rounded-md'
              placeholder='name, mobile'
              type="text"
            />
          </div>

        </div>


        <div className="mt-16 flex items-center justify-center flex-wrap gap-7">

          <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-red-400 to-[#dc2626]">
              <div className="absolute -bottom-12 left-4">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md" style={{ backgroundImage: `url('https://avatar.iran.liara.run/public/boy')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              </div>
              <div className="absolute top-2 right-2 bg-white text-red-500 text-xs font-semibold rounded-full px-3 py-1">
                Intermediate
              </div>
            </div>
             <div className="flex items-center justify-end mt-2 mr-2"><button className='border px-4 py-1 rounded-md'>Schedule</button></div>
            <div className="pt-4 px-4 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">Arpit Tiwari</h2>
              <p className="text-sm text-gray-600">Male, 21 years old</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Ruler className="w-4 h-4 mr-2 text-red-500" />
                  <span>172 cm</span>
                </div>
                <div className="flex items-center text-sm">
                  <Weight className="w-4 h-4 mr-2 text-red-500" />
                  <span>60 kg</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Fitness Goal</h3>
                <div className="bg-[#f5eeee] text-red-600 rounded-lg py-2 px-3 text-sm font-medium">
                  <Target className="w-4 h-4 inline mr-2" />
                  Weight gain
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Medical Condition</h3>
                <div className="bg-gray-100 text-gray-600 rounded-lg py-2 px-3 text-sm">
                  None specified
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <Phone className="w-4 h-4 inline mr-2" />
                Emergency: +91 8090342348
              </div>
            </div>
          </div>
          <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-red-400 to-[#dc2626]">
              <div className="absolute -bottom-12 left-4">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md" style={{ backgroundImage: `url('https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              </div>
              <div className="absolute top-2 right-2 bg-white text-red-500 text-xs font-semibold rounded-full px-3 py-1">
                Intermediate
              </div>
            </div>
            <div className="flex items-center justify-end mt-2 mr-2"><button className='border px-4 py-1 rounded-md'>Schedule</button></div>

            <div className="pt-4 px-4 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">Arpit Tiwari</h2>
              <p className="text-sm text-gray-600">Male, 21 years old</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Ruler className="w-4 h-4 mr-2 text-red-500" />
                  <span>172 cm</span>
                </div>
                <div className="flex items-center text-sm">
                  <Weight className="w-4 h-4 mr-2 text-red-500" />
                  <span>60 kg</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Fitness Goal</h3>
                <div className="bg-[#f5eeee] text-red-600 rounded-lg py-2 px-3 text-sm font-medium">
                  <Target className="w-4 h-4 inline mr-2" />
                  Weight gain
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Medical Condition</h3>
                <div className="bg-gray-100 text-gray-600 rounded-lg py-2 px-3 text-sm">
                  None specified
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <Phone className="w-4 h-4 inline mr-2" />
                Emergency: +91 8090342348
              </div>
            </div>
          </div>
          
          <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-red-400 to-[#dc2626]">
              <div className="absolute -bottom-12 left-4">
                <div className="w-24 h-24 rounded-full border-4 border-white shadow-md" style={{ backgroundImage: `url('https://avatar.iran.liara.run/public')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              </div>
              <div className="absolute top-2 right-2 bg-white text-red-500 text-xs font-semibold rounded-full px-3 py-1">
                Intermediate
              </div>
            </div>
            <div className="flex items-center justify-end mt-3 mr-5 cursor-pointer relative">
              <img onClick={()=>{setMenuClick(!menuClick)}} className={` ${menuClick ? '' : '-rotate-90'} `} src={MenuIcon} alt="" />
                <div className={`flex flex-col gap-2 border bg-white absolute top-9 rounded-lg shadow-xl overflow-hidden ${menuClick ? 'h-24 w-40 p-2' : 'h-0 w-0 p-0'} transition-all duration-500 ease-in-out`}>
                 <div className="flex items-center justify-end "><button onClick={()=>{navigate('setschedule')}} className='border px-4 w-full py-1 rounded-md'>Schedule</button></div>
                 <div className="flex items-center justify-end "><button onClick={()=>{navigate('setreport')}} className='border px-4 w-full py-1 rounded-md'>Set Report</button></div>
                </div>
            </div>

            <div className="pt-4 px-4 pb-4">
              <h2 className="text-xl font-semibold text-gray-800">Rajat Dalal</h2>
              <p className="text-sm text-gray-600">Male, 21 years old</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center text-sm">
                  <Ruler className="w-4 h-4 mr-2 text-red-500" />
                  <span>172 cm</span>
                </div>
                <div className="flex items-center text-sm">
                  <Weight className="w-4 h-4 mr-2 text-red-500" />
                  <span>60 kg</span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Fitness Goal</h3>
                <div className="bg-[#f5eeee] text-red-600 rounded-lg py-2 px-3 text-sm font-medium">
                  <Target className="w-4 h-4 inline mr-2" />
                  Weight gain
                </div>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Medical Condition</h3>
                <div className="bg-gray-100 text-gray-600 rounded-lg py-2 px-3 text-sm">
                  None specified
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <Phone className="w-4 h-4 inline mr-2" />
                Emergency: +91 8090342348
              </div>
            </div>
          </div>


        </div>



      </div>



    </div>
  )
}

export default AssignedMembers
