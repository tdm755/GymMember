import React from 'react'

function IndesPage() {
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
          <div className="flex gap-16 justify-around">
              <button className='px-5 py-2 text-sm bg-[#dc2626] text-white rounded-md'>Trainers</button>
              <button className='px-4 py-2 text-sm bg-[#dc2626] text-white rounded-md'>Members</button>
          </div>
        </div> 
        
        {/* New member sign-ups this week/month */}
        <div className="border w-80 p-4 flex flex-col gap-4 items-center rounded-xl border-[#eac4c4] shadow-md">

        </div>  

         <div className="border w-80 p-4 flex flex-col gap-4 items-center rounded-xl border-[#eac4c4] shadow-md">

        </div>  
        

    </div>
  )
}

export default IndesPage
