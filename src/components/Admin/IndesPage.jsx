import React from 'react'
import { useNavigate } from 'react-router-dom'

function IndesPage() {

  const navigate = useNavigate();

  function handleNavigateClick() {
    navigate('members')
  }

  function handleAddMemNavigateClick(navto) {
    navigate(navto)
  }
  return (
    <div className='p-8 flex gap-10 flex-wrap'>


        {/* Total number of active users */}
        <div className="border w-80 p-4 flex flex-col gap-4 items-center rounded-xl border-[#eac4c4] shadow-md">
          <div className="">
            <p className='text-md font-semibold uppercase'>Total number of active users</p>
          </div>
          <div className="flex w-full gap-4">
             <div className="border w-1/2 h-24 rounded-xl flex items-center justify-center text-4xl font-semibold">120</div>
             <div className="border w-1/2 h-24 rounded-xl flex items-center justify-center text-4xl font-semibold">170</div>
          </div>
          <div className="flex gap-6 justify-around w-full">
              <button onClick={()=>handleAddMemNavigateClick('trainers')} className='w-1/2 py-2 text-sm bg-[#dc2626] text-white rounded-md'>Trainers</button>
              <button onClick={()=>handleAddMemNavigateClick('members')} className='w-1/2 py-2 text-sm bg-[#dc2626] text-white rounded-md'>Members</button>
          </div>
        </div> 
        
        {/* New member sign-ups this week/month */}
        <div className="flex flex-col gap-4">
        <div className="border w-80 h-1/2 p-4 flex flex-col gap-4 items-center justify-between rounded-xl border-[#eac4c4] shadow-md">
          <div className="">
            <p className='text-md font-semibold uppercase'>New member sign-ups this month</p>
          </div>
          <div className="flex items-center justify-around w-full">
          <div className="text-4xl font-semibold">
            20
          </div>        
             <button onClick={()=>handleAddMemNavigateClick('addmember')} className='font-semibold px-4 py-2 text-sm bg-[#dc2626] text-white rounded-md'>Add Members</button>        
          </div>
        </div>  

         <div className="border w-80 h-1/2 p-4 flex flex-col gap-4 items-center rounded-xl border-[#eac4c4] shadow-md">
            <div className="text-md font-semibold uppercase">
               Membership renewals due
            </div>
            <div className="flex items-center justify-around w-full">
          <div className="text-4xl font-semibold">
            20
          </div>        
             <button onClick={handleNavigateClick} className='font-semibold px-12 py-2 text-sm bg-[#dc2626] text-white rounded-md'>View</button>        
          </div>
        </div> </div> 
        

    </div>
  )
}

export default IndesPage
