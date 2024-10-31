import React, { useState, useEffect } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'

function Sessions() {
  const [sessions, setSessions] = useState([])

  useEffect(() => {
    // Fetch sessions data from API
    // This is a placeholder. Replace with actual API call
    const fetchSessions = async () => {
      try {
        // const response = await fetch('api/member/sessions');
        // const data = await response.json();
        // setSessions(data);

        // Placeholder data
        setSessions([
          {
            id: 1,
            trainer: "John Doe",
            exercise: "Chest",
            date: '',
            startTime: "09:00:00",
            endTime: "10:30:00",
            rating: 0,
            isRated: false
          },
          {
            id: 2,
            trainer: "Jane Smith",
            exercise: "Back & Biceps",
            date: '',
            startTime: "14:00:00",
            endTime: "15:30:00",
            rating: 0,
            isRated: false
          },
          // Add more session objects as needed
        ])
      } catch (error) {
        console.error('Error fetching sessions:', error)
      }
    }

    fetchSessions()
  }, [])

  const handleRatingChange = (sessionId, newValue) => {
    setSessions(prevSessions =>
      prevSessions.map(session =>
        session.id === sessionId ? { ...session, rating: newValue, isRated: true } : session
      )
    )
    // Here you would also send the updated rating to your backend
  }

  return (
    <div className='p-2 md:p-6 pb-[110px]'>
        <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-4xl md:text-5xl relative z-20 text-white font-bold mb-4">
        Your Sessions
        </h2>
      </div>
      {/* <h2>Your Sessions</h2> */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {sessions.map((session) => (
          <div className='border border-[#ccc] rounded-md py-4 px-7 flex flex-col items-center justify-center gap-4' key={session.id} >
            <h3 className='text-[#db3c3c]'>{session.exercise}</h3>
           <div className="">
           <p>Trainer: {session.trainer}</p>
            <p>Start: {session.startTime}</p>
            <p>End: {new Date(session.endTime).toLocaleString()}</p>
           </div>
            {/* <div className="flex items-center justify-end text-[gold] hover:text-[#efc63f]"><button>Give Rating</button></div> */}
            <div className='flex flex-col items-center'>
              <p>Rate this session:</p>
              <div className="">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => {
                    if (!session.isRated) {
                      handleRatingChange(session.id, star);
                    }
                  }}
                  style={{
                    cursor: session.isRated ? 'default' : 'pointer',
                    color: star <= session.rating ? 'gold' : 'gray',
                    opacity: session.isRated ? 0.5 : 1
                  }}
                >
                  ★
                </span>
              ))}
              </div>
              {session.isRated && <p className="text-sm text-gray-500 mt-2">Rating submitted</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sessions
