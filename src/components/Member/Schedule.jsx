import React, { useEffect, useState } from 'react'
import ArrowIcon from '../../../public/assets/ArrowDown.svg'
import AlertIcon from '../../../public/assets/AlertIcon.svg'
import Lottie from 'react-lottie'
import FighterAnimation from '../../../public/Lotties/Ud1cfZSgxh.json'

function Schedule() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [monthDates, setMonthDates] = useState([])
  const [schedule, setSchedule] = useState([])
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [userPerformance, setUserPerformance] = useState([])
  const [viewMode, setViewMode] = useState('week') // 'week' or 'month'

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const dayOfWeek = selectedDate.getDay()
        const placeholderSchedule = [
          {
            date: selectedDate.toISOString(),
            title: getDayTitle(dayOfWeek),
            exercises: getDayExercises(dayOfWeek)
          }
        ]
        setSchedule(placeholderSchedule)
      } catch (error) {
        console.error('Error fetching schedule:', error)
      }
    }

    fetchSchedule()
  }, [selectedDate])

  const getDayTitle = (day) => {
    const titles = [
      'Rest & Recovery',
      'Chest & Triceps',
      'Back & Biceps',
      'Legs & Core',
      'Shoulders & Arms',
      'Full Body & HIIT',
      'Rest & Recovery'
    ]
    return titles[day]
  }

  const getDayExercises = (day) => {
    const exercisesByDay = [
      [
        { name: 'Light Walking', sets: 1, reps: '30 minutes', weight: 'N/A', note: 'Keep it low intensity' },
        { name: 'Stretching', sets: 1, reps: '15 minutes', weight: 'N/A', note: 'Focus on major muscle groups' },
        { name: 'Foam Rolling', sets: 1, reps: '10 minutes', weight: 'N/A', note: 'Target sore areas' },
        { name: 'Yoga', sets: 1, reps: '20 minutes', weight: 'N/A', note: 'Gentle flow, avoid intense poses' }
      ],
      [
        { name: 'Barbell Bench Press', sets: 4, reps: '8-10', weight: '135 lbs', note: 'Keep shoulders retracted' },
        { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '40 lbs each', note: 'Control the descent' },
        { name: 'Cable Flyes', sets: 3, reps: '12-15', weight: '30 lbs each side', note: 'Focus on the stretch' },
        { name: 'Dips', sets: 3, reps: '10-12', weight: 'Bodyweight', note: 'Use assistance if needed' },
        { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', weight: '50 lbs', note: 'Keep elbows close to body' },
        { name: 'Overhead Tricep Extensions', sets: 3, reps: '10-12', weight: '30 lbs', note: 'Maintain proper form' }
      ],
      [
        { name: 'Pull-ups', sets: 3, reps: '8-10', weight: 'Bodyweight', note: 'Use assistance if needed' },
        { name: 'Bent-over Rows', sets: 4, reps: '8-10', weight: '95 lbs', note: 'Keep back straight' },
        { name: 'Lat Pulldowns', sets: 3, reps: '10-12', weight: '120 lbs', note: 'Focus on squeezing lats' },
        { name: 'Face Pulls', sets: 3, reps: '12-15', weight: '40 lbs', note: 'Retract shoulder blades' },
        { name: 'Barbell Curls', sets: 3, reps: '10-12', weight: '65 lbs', note: 'Control the movement' },
        { name: 'Hammer Curls', sets: 3, reps: '12-15', weight: '25 lbs each', note: 'Keep elbows close to body' }
      ],
      [
        { name: 'Squats', sets: 4, reps: '8-10', weight: '185 lbs', note: 'Keep chest up' },
        { name: 'Romanian Deadlifts', sets: 3, reps: '10-12', weight: '135 lbs', note: 'Feel the hamstring stretch' },
        { name: 'Leg Press', sets: 3, reps: '12-15', weight: '300 lbs', note: `Don't lock out knees` },
        { name: 'Lunges', sets: 3, reps: '10-12 each leg', weight: '30 lbs each hand', note: 'Keep front knee over ankle' },
        { name: 'Planks', sets: 3, reps: '30-60 seconds', weight: 'Bodyweight', note: 'Keep body straight' },
        { name: 'Russian Twists', sets: 3, reps: '20-30', weight: '20 lbs', note: 'Control the rotation' }
      ],
      [
        { name: 'Overhead Press', sets: 4, reps: '8-10', weight: '85 lbs', note: 'Keep core tight' },
        { name: 'Lateral Raises', sets: 3, reps: '12-15', weight: '15 lbs each', note: 'Control the movement' },
        { name: 'Front Raises', sets: 3, reps: '12-15', weight: '15 lbs each', note: 'Alternate arms' },
        { name: 'Upright Rows', sets: 3, reps: '10-12', weight: '50 lbs', note: 'Keep elbows high' },
        { name: 'Skull Crushers', sets: 3, reps: '10-12', weight: '60 lbs', note: 'Keep upper arms still' },
        { name: 'Concentration Curls', sets: 3, reps: '12-15', weight: '25 lbs', note: 'Focus on the contraction' }
      ],
      [
        { name: 'Burpees', sets: 3, reps: '10-15', weight: 'Bodyweight', note: 'Maintain good form' },
        { name: 'Mountain Climbers', sets: 3, reps: '30 seconds', weight: 'Bodyweight', note: 'Keep hips low' },
        { name: 'Kettlebell Swings', sets: 3, reps: '15-20', weight: '35 lbs', note: 'Drive with the hips' },
        { name: 'Box Jumps', sets: 3, reps: '10-12', weight: 'Bodyweight', note: 'Land softly' },
        { name: 'Battle Ropes', sets: 3, reps: '30 seconds', weight: 'N/A', note: 'Keep intensity high' },
        { name: 'Plank to Push-up', sets: 3, reps: '10-12', weight: 'Bodyweight', note: 'Maintain plank position' }
      ],
      [
        { name: 'Light Swimming', sets: 1, reps: '30 minutes', weight: 'N/A', note: 'Focus on technique' },
        { name: 'Dynamic Stretching', sets: 1, reps: '15 minutes', weight: 'N/A', note: 'Gradually increase range of motion' },
        { name: 'Meditation', sets: 1, reps: '10 minutes', weight: 'N/A', note: 'Focus on deep breathing' },
        { name: 'Self-Massage', sets: 1, reps: '20 minutes', weight: 'N/A', note: 'Use foam roller or massage ball' }
      ]
    ]
    return exercisesByDay[day]
  }

  useEffect(() => {
    if (viewMode === 'week') {
      const dates = getWeekDates(selectedDate)
      setMonthDates(dates)
    } else {
      const dates = getMonthDates(selectedDate)
      setMonthDates(dates)
    }
  }, [selectedDate, viewMode])

  const getWeekDates = (date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    const week = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getMonthDates = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)

    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - startDate.getDay())

    const endDate = new Date(lastDay)
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()))

    const monthDates = []
    let currentDate = new Date(startDate)

    while (currentDate <= endDate) {
      monthDates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return monthDates
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  }

  const handleExerciseClick = (exercise) => {
    setSelectedExercise(exercise)
    setUserPerformance(Array(exercise.sets).fill({ reps: '', weight: '' }))
  }

  const handlePerformanceUpdate = (index, field, value) => {
    setUserPerformance(prev => {
      const newPerformance = [...prev]
      newPerformance[index] = { ...newPerformance[index], [field]: value }
      return newPerformance
    })
  }

  function HandlePreviousClick() {
    if (viewMode === 'week') {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() - 7))
    } else {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))
    }
  }

  function HandleNextClick() {
    if (viewMode === 'week') {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate() + 7))
    } else {
      setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))
    }
  }

  function HandleTodayClick() {
    setSelectedDate(new Date())
  }

  function toggleViewMode() {
    setViewMode(prevMode => prevMode === 'week' ? 'month' : 'week')
  }


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: FighterAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
    <div className=' p-2 md:p-6 bg-[#f9fafc] min-h-screen pb-[110px]'>
      <div className="bg-white border border-[#f5eeee] rounded-lg overflow-hidden">
        <div className='text-center py-6 text-2xl'>
          <span className='border rounded-full px-4 py-1'>
            {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
          </span>
        </div>
        <div className="flex items-center justify-between px-4">
          <button className='border px-7 py-2 border-[#f4eded]' onClick={toggleViewMode}>
            {viewMode === 'week' ? 'Month View' : 'Week View'}
          </button>
          <button className='border px-7 py-2 border-[#f4eded]' onClick={HandleTodayClick}>Today</button>
        </div>
        <hr />
        <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'} gap-4  p-2 relative py-4 px-14`}>
          <img onClick={HandlePreviousClick} className='absolute left-2 top-[50%] h-9 rotate-90 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out' src={ArrowIcon} alt="" />
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center">
              <div className={`font-semibold text-sm ${index === 0 && 'text-[#dc2626]'}`}><span className='hidden md:block'>{day}</span><span className='md:hidden'>{day.slice(0, 1)}</span></div>
            </div>
          ))}
          {monthDates.map((date, index) => (
            <div
              onClick={() => { setSelectedDate(date) }}
              key={index}
              className={`text-center cursor-pointer transition-all duration-300 ease-in-out px-4 py-1 text-[16px]  flex items-center justify-center ${(date.getMonth() === selectedDate.getMonth() &&
                  date.getFullYear() === selectedDate.getFullYear() &&
                  date.getDate() === selectedDate.getDate())
                  ? 'bg-[#f5eeee] text-black transform scale-105'
                  : 'hover:bg-gray-100 border border-[#f5eeee]'
                } ${date.getMonth() !== selectedDate.getMonth() ? 'text-gray-300 opacity-50' : ''}`}
            >
              <div className={`${(date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear() && date.getDate() === selectedDate.getDate()) ? 'text-[#dc2626]' : ''}`}>
                {date.getDate()}
              </div>
            </div>
          ))}
          <img onClick={HandleNextClick} className='absolute right-2 top-[50%] h-9 -rotate-90 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out' src={ArrowIcon} alt="" />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row w-full gap-7 ">
        <div className='flex flex-col gap-4 w-full md:w-1/2'>
          <div className="bg-[#f4eded] rounded-lg p-4 ">
            <span className='text-[#dc2626] text-xl font-semibold'>{schedule[0]?.title}</span>
          </div>
          <div className="bg-white rounded-lg border border-[#f5eeee] p-6">
            {schedule[0] && schedule[0].exercises.map((exercise, i) => (
              <div
                key={i}
                onClick={() => handleExerciseClick(exercise)}
                className='cursor-pointer hover:bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-300 ease-in-out mb-2'
              >
                <div className="flex items-center gap-4">
                  <span className='bg-[#dc2626] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'>{i + 1}</span>
                  <div className="text-gray-800 text-lg font-normal">{exercise.name}</div>
                </div>
                <div className="text-[#dc2626]">
                  <img className='w-4 h-4 transform -rotate-90' src={ArrowIcon} alt="View details" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-6 w-full md:w-1/2 mt-4 md:mt-0 border border-[#f5eeee]">
          {selectedExercise ? (
            <div className=''>
              <h2 className="text-lg ml-2 md:text-2xl font-bold mb-4 text-[]">{selectedExercise.name}</h2>
              <div className="flex flex-col gap-7">
                <div className="bg-[#f4ededb3] p-4 rounded-lg mb-4 relative">
                  <h3 className="font-semibold mb-2 text-gray-700">Trainer's Assignment:</h3>
                  <p><span className="font-medium">Sets:</span> {selectedExercise.sets}</p>
                  <p><span className="font-medium">Reps:</span> {selectedExercise.reps}</p>
                  <p><span className="font-medium">Weight:</span> {selectedExercise.weight}</p>
                  <div className="AlertModule absolute top-2 right-2">
                    <div className="relative group">
                      <img className="cursor-pointer" src={AlertIcon} alt="Alert" />
                      <div className="NoteText invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute bottom-full right-0 mb-2 p-2 bg-[#ebe7c8] text-black rounded-lg shadow-lg transition-all duration-300 ease-in-out w-64">
                        <p className="text-sm break-words">Note: {selectedExercise.note}</p>
                        <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-[#ebe7c8]"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl shadow-md border border-[#f4eded] p-4 md:p-6 flex flex-col gap-4 md:gap-6">
                  <div className="flex items-center justify-between border-b border-[#f4eded] pb-3">
                    <h3 className="text-lg font-semibold text-gray-800">Your Performance</h3>
                    <div className="text-xs text-gray-500 hidden md:block">Track your progress</div>
                  </div>
                  
                  {userPerformance.map((set, index) => (
                    <div key={index} className="flex flex-col gap-3 p-3 md:p-4 bg-[#fafafa] rounded-lg hover:bg-[#f7f7f7] transition-colors duration-200">
                      <div className="flex items-center gap-3 mb-1">
                        <div className="flex items-center whitespace-nowrap justify-center bg-[#dc2626] text-white rounded-full px-2 md:px-8 md:w-8 md:h-8 font-medium text-sm">
                          Set {index + 1}
                        </div>
                        <div className="text-sm text-gray-500">Record your performance</div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                          <label className="text-sm font-medium text-gray-700 min-w-[60px]">Reps</label>
                          <div className="relative w-full">
                            <input
                              type="number"
                              value={set.reps}
                              onChange={(e) => handlePerformanceUpdate(index, 'reps', e.target.value)}
                              className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent transition-all duration-200"
                              placeholder="Number of reps"
                            />
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                          <label className="text-sm font-medium text-gray-700 min-w-[60px]">Weight</label>
                          <div className="relative w-full">
                            <input
                              type="text"
                              value={set.weight}
                              onChange={(e) => handlePerformanceUpdate(index, 'weight', e.target.value)}
                              className="w-full border border-gray-200 rounded-lg py-2.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#dc2626] focus:border-transparent transition-all duration-200"
                              placeholder="Weight in kg/lbs"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center justify-end pt-2 mt-2">
                    <button className="w-full md:w-auto px-6 py-2.5 bg-[#dc2626] text-white text-sm rounded-lg font-medium hover:bg-[#b91c1c] active:bg-[#991b1b] transition-all duration-200 ease-in-out shadow-sm hover:shadow-md flex items-center justify-center gap-2">
                      <span>Save Progress</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="w-full max-w-[400px] h-auto mx-auto">
                <Lottie
                  options={defaultOptions}
                  height="100%"
                  width="100%"
                  isClickToPauseDisabled={true}
                />
              </div>
              <p className="text-gray-600 text-base md:text-xl text-center">Select an exercise to view details and log your performance.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Schedule