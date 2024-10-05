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
            exercise: "Chest & Triceps",
            startTime: "2023-06-01T09:00:00",
            endTime: "2023-06-01T10:30:00",
            rating: 4
          },
          {
            id: 2,
            trainer: "Jane Smith",
            exercise: "Back & Biceps",
            startTime: "2023-06-02T14:00:00",
            endTime: "2023-06-02T15:30:00",
            rating: 5
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
        session.id === sessionId ? { ...session, rating: newValue } : session
      )
    )
    // Here you would also send the updated rating to your backend
  }

  return (
    <div className='p-6'>
        <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
        Your Sessions
        </h2>
      </div>
      {/* <h2>Your Sessions</h2> */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {sessions.map((session) => (
          <div key={session.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '16px',
            width: '300px'
          }}>
            <h3>{session.exercise}</h3>
            <p>Trainer: {session.trainer}</p>
            <p>Start: {new Date(session.startTime).toLocaleString()}</p>
            <p>End: {new Date(session.endTime).toLocaleString()}</p>
            <div>
              <p>Rate this session:</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRatingChange(session.id, star)}
                  style={{
                    cursor: 'pointer',
                    color: star <= session.rating ? 'gold' : 'gray'
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sessions
