import React, { useRef } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'
import Arrow from '../../../public/assets/ArrowDown.svg';
import SearchIcon from '../../../public/assets/SearchIcon.svg';



function AllMembers() {


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
        <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
          Members
        </h2>
      </div>


      <div className="">
        {/* headerpart */}
        <div className="flex flex-col md:flex-row w-full gap-7 items-center justify-evenly">
          <div className="relative">
            <select
              onMouseLeave={() => handleRemoverSelectClick()} onMouseDownCapture={() => handleSelectTrainerClick()}
              className='border border-[#dc2626] h-10 w-full md:w-52 py-1 outline-none rounded-md px-2 appearance-none relative z-20 bg-transparent'
              name="" id="">
              <option value="">select</option>
              <option value="">due date</option>
              <option value="">balance</option>
              {/* <option value=""></option> */}
            </select>
            <span ref={shortRef} className='absolute z-10 right-2 top-1 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
          </div>
          <div className="relative flex items-center">
            <img className='absolute  left-2' src={SearchIcon} alt="" />
            <input
              className='border border-[#decfcf] pl-10 w-96 h-10 py-[5px] outline-none focus:border-[#dc2626] rounded-md'
              placeholder='search....'
              type="text"
            />
          </div>

        </div>


          <div className="mt-16 flex flex-wrap gap-7">
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
            <div className="h-80 w-[30%] border-[black]  border ">
              <div className="w-32 h-32 rounded-full border"></div>
              <div className="">
                <label htmlFor="Name">Name</label>
                <input type="text" className='border' />
              </div>
            </div>
          </div>



      </div>



    </div>
  )
}

export default AllMembers
