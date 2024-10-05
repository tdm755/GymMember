import React, { useState, useEffect } from 'react'
import weightLiftingBanner from '../../../public/assets/weightLiftingBanner-min.jpg'

function Schedule() {
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    // Fetch the schedule from the trainer's dashboard
    // This is a placeholder. Replace with actual API call
    const fetchSchedule = async () => {
      try {
        // const response = await fetch('api/member/schedule');
        // const data = await response.json();
        // setSchedule(data);

        // Placeholder data for intermediate member
        setSchedule({
          Monday: { 
            title: 'Chest & Triceps', 
            exercises: ['Barbell Bench Press', 'Incline Dumbbell Press', 'Cable Flyes', 'Dips', 'Tricep Pushdowns', 'Overhead Tricep Extensions']
          },
          Tuesday: { 
            title: 'Back & Biceps', 
            exercises: ['Deadlifts', 'Pull-Ups', 'Bent-Over Rows', 'Lat Pulldowns', 'Face Pulls', 'Barbell Curls', 'Hammer Curls']
          },
          Wednesday: { 
            title: 'Legs & Abs', 
            exercises: ['Squats', 'Leg Press', 'Romanian Deadlifts', 'Lunges', 'Leg Extensions', 'Leg Curls', 'Calf Raises', 'Planks']
          },
          Thursday: { 
            title: 'Shoulders & Arms', 
            exercises: ['Military Press', 'Lateral Raises', 'Front Raises', 'Reverse Flyes', 'Upright Rows', 'EZ-Bar Curls', 'Skull Crushers']
          },
          Friday: { 
            title: 'Full Body', 
            exercises: ['Clean and Press', 'Dumbbell Thrusters', 'Pull-Ups', 'Dips', 'Kettlebell Swings', 'Box Jumps', 'Burpees']
          },
          Saturday: { 
            title: 'Cardio & Core', 
            exercises: ['HIIT Treadmill Sprints', 'Jump Rope', 'Mountain Climbers', 'Bicycle Crunches', 'Leg Raises', 'Wood Choppers', 'Plank Variations']
          },
          Sunday: { 
            title: 'Rest & Recovery', 
            exercises: ['Light Walking', 'Stretching', 'Foam Rolling', 'Yoga']
          }
        });
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className='p-4 md:p-6'>
      <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10 " style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center -136px' }}>
        <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
        <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
          Schedule
        </h2>
      </div>

      <div className="Members overflow-auto">
        <table className='w-full'>
          <thead>
            <tr>
              {Object.keys(schedule).map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
           
          </thead>
          <tbody>
          <tr>
              {Object.values(schedule).map((daySchedule, index) => (
                <td className='font-bold text-start' key={index}>{daySchedule.title}</td>
              ))}
            </tr>
            {Array.from({ length: Math.max(...Object.values(schedule).map(day => day.exercises.length)) }).map((_, i) => (
              <tr key={i}>
                {Object.values(schedule).map((daySchedule, dayIndex) => (
                  <td key={dayIndex} className='p-2 text-start'>
                    {daySchedule.exercises[i] || ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Schedule
