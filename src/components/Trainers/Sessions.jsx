import React, { useState, useEffect } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'

function TSessions() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    // Fetch sessions data from API 
    // This is a placeholder. Replace with actual API call
    const fetchSessions = async () => {
      try {
        // const response = await fetch('api/trainer/sessions');
        // const data = await response.json();
        // setSessions(data);

        // Placeholder data
        setSessions([
          {
            id: 1,
            member: "Alex Smith",
            exercise: "Chest",
            date: '2024-01-15',
            startTime: "09:00:00",
            endTime: "10:30:00",
            memberRating: 4
          },
          {
            id: 2,
            member: "Sarah Johnson", 
            exercise: "Back & Biceps",
            date: '2024-01-15',
            startTime: "14:00:00",
            endTime: "15:30:00",
            memberRating: 5
          },
        ])
      } catch (error) {
        console.error('Error fetching sessions:', error)
      }
    }

    fetchSessions()
  }, [])

  return (
    <div className='p-4 md:p-6'>
        <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-4xl md:text-5xl relative z-20 text-white font-bold mb-4">
          Member Sessions
        </h2>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {sessions.map((session) => (
          <div className='border border-[#ccc] rounded-md py-4 px-7 flex flex-col items-center justify-center gap-4' key={session.id} >
            <h3 className='text-[#db3c3c]'>{session.exercise}</h3>
            <div className="">
              <p>Member: {session.member}</p>
              <p>Date: {new Date(session.date).toLocaleDateString()}</p>
              <p>Start: {session.startTime}</p>
              <p>End: {session.endTime}</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>Member Rating:</p>
              <div className="">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    className='cursor-not-allowed'
                    key={star}
                    style={{
                      color: star <= session.memberRating ? 'gold' : 'gray'
                    }}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TSessions
