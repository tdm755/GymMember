import React from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'
import Calendar from '../../Utils/Calendar'


function CalendarPage() {
  return (
    <div className='p-2 md:p-6 pb-[110px]'>
      <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-4xl md:text-5xl relative z-20 text-white font-bold mb-4">
          Calendar
        </h2>
      </div>

        <Calendar />
      
    </div>
  )
}

export default CalendarPage
