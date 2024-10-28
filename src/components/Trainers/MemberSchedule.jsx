import React, { useState, useEffect } from 'react'
import ArrowIcon from '../../../public/assets/ArrowDown.svg'
import DeleteIcon from '../../../public/assets/DeleteIcon.svg'
import AddIcon from '../../../public/assets/AddIcon.svg'
import Modal from '../../Utils/Modal'
import Lottie from 'react-lottie'
import TrainersAnimation from '../../../public/Lotties/TrainersAnimation.json'

function MemberSchedule() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [monthDates, setMonthDates] = useState([])
  const [schedule, setSchedule] = useState({})
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [viewMode, setViewMode] = useState('week')
  const [defaultMuscleGroups, setDefaultMuscleGroups] = useState({})
  const [showDefaultMuscleModal, setShowDefaultMuscleModal] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [newDefaultMuscle, setNewDefaultMuscle] = useState('')

  // Helper function to format date consistently
  const formatDateKey = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
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

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const storedSchedule = localStorage.getItem('trainerSchedule')
        const storedDefaultMuscleGroups = localStorage.getItem('defaultMuscleGroups')
        if (storedSchedule) {
          setSchedule(JSON.parse(storedSchedule))
        } else {
          const initialSchedule = {}
          setSchedule(initialSchedule)
          localStorage.setItem('trainerSchedule', JSON.stringify(initialSchedule))
        }
        if (storedDefaultMuscleGroups) {
          setDefaultMuscleGroups(JSON.parse(storedDefaultMuscleGroups))
        }
      } catch (error) {
        console.error('Error fetching schedule:', error)
      }
    }

    fetchSchedule()
  }, [])

  // Log schedule and defaultMuscleGroups after they're set
  useEffect(() => {
    console.log('Current schedule:', schedule)
    console.log('Current defaultMuscleGroups:', defaultMuscleGroups)
  }, [schedule, defaultMuscleGroups])

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

  const handleExerciseClick = (exercise) => {
    const dateKey = formatDateKey(selectedDate)
    setSelectedExercise({ ...exercise, dateKey })
  }

  const handleAddExercise = () => {
    const newExercise = {
      id: Date.now(), // Add a unique identifier
      name: '',
      sets: [{ reps: '', weight: '' }]
    }
    const dateKey = formatDateKey(selectedDate)
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: [...(schedule[dateKey]?.exercises || []), newExercise]
      }
    }
    setSchedule(updatedSchedule)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
    setSelectedExercise({ ...newExercise, dateKey })
  }

  const handleExerciseUpdate = (field, value) => {
    const dateKey = selectedExercise.dateKey
    const updatedExercise = { ...selectedExercise, [field]: value }
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: schedule[dateKey]?.exercises.map(exercise =>
          exercise.id === selectedExercise.id ? updatedExercise : exercise
        ) || []
      }
    }
    setSchedule(updatedSchedule)
    setSelectedExercise(updatedExercise)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const handleSetUpdate = (index, field, value) => {
    const dateKey = selectedExercise.dateKey
    const updatedSets = selectedExercise.sets.map((set, i) =>
      i === index ? { ...set, [field]: value } : set
    )
    const updatedExercise = { ...selectedExercise, sets: updatedSets }
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: schedule[dateKey]?.exercises.map(exercise =>
          exercise.id === selectedExercise.id ? updatedExercise : exercise
        ) || []
      }
    }
    setSchedule(updatedSchedule)
    setSelectedExercise(updatedExercise)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const addSet = () => {
    const newSet = { reps: '', weight: '' }
    const dateKey = selectedExercise.dateKey
    const updatedExercise = {
      ...selectedExercise,
      sets: [...selectedExercise.sets, newSet]
    }
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: schedule[dateKey]?.exercises.map(exercise =>
          exercise.id === selectedExercise.id ? updatedExercise : exercise
        ) || []
      }
    }
    setSchedule(updatedSchedule)
    setSelectedExercise(updatedExercise)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const removeSet = (index) => {
    const dateKey = selectedExercise.dateKey
    const updatedSets = selectedExercise.sets.filter((_, i) => i !== index)
    const updatedExercise = { ...selectedExercise, sets: updatedSets }
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: schedule[dateKey]?.exercises.map(exercise =>
          exercise.id === selectedExercise.id ? updatedExercise : exercise
        ) || []
      }
    }
    setSchedule(updatedSchedule)
    setSelectedExercise(updatedExercise)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const removeExercise = () => {
    const dateKey = selectedExercise.dateKey
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        exercises: schedule[dateKey]?.exercises.filter(exercise => exercise.id !== selectedExercise.id) || []
      }
    }
    setSchedule(updatedSchedule)
    setSelectedExercise(null)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const handleMuscleGroupChange = (muscle) => {
    const dateKey = formatDateKey(selectedDate)
    const updatedSchedule = {
      ...schedule,
      [dateKey]: {
        ...schedule[dateKey],
        muscle: muscle
      }
    }
    setSchedule(updatedSchedule)
    localStorage.setItem('trainerSchedule', JSON.stringify(updatedSchedule))
  }

  const handleDefaultMuscleGroupChange = (day, muscle) => {
    const updatedDefaultMuscleGroups = { ...defaultMuscleGroups, [day]: muscle }
    setDefaultMuscleGroups(updatedDefaultMuscleGroups)
    localStorage.setItem('defaultMuscleGroups', JSON.stringify(updatedDefaultMuscleGroups))
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

  function HandleDefaultMuscleInputChange(day) {
    setSelectedDay(day);
    setNewDefaultMuscle(defaultMuscleGroups[day] || '');
    setShowDefaultMuscleModal(true);
  }

  function handleConfirmDefaultMuscle() {
    handleDefaultMuscleGroupChange(selectedDay, newDefaultMuscle);
    setShowDefaultMuscleModal(false);
  }


  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: TrainersAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };


  return (
    <div className='p-6 bg-[#f9fafc]  min-h-screen'>
      <div className="bg-white rounded-lg border border-[#f5eeee] overflow-hidden">
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
        <div className={`grid ${viewMode === 'week' ? 'grid-cols-7' : 'grid-cols-7'} gap-4 border-b border-gray-200 p-2 relative py-4 px-14`}>
          <img onClick={HandlePreviousClick} className='absolute left-2 top-[60%] h-9 rotate-90 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out' src={ArrowIcon} alt="" />
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center">
             <div className="flex items-center justify-center mb-3 cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"> <img onClick={() => HandleDefaultMuscleInputChange(day)} src={AddIcon} alt="" /></div>
              <div className={`font-semibold text-sm ${index === 0 && 'text-[#dc2626]'}`}><span className='hidden md:block'>{day}</span><span className='md:hidden'>{day.slice(0, 1)}</span></div>
            </div>
          ))}
          {monthDates.map((date, index) => (
            <div
              onClick={() => setSelectedDate(date)}
              key={index}
              className={`text-center cursor-pointer transition-all duration-300 ease-in-out p-1 ${
                (date.getMonth() === selectedDate.getMonth() &&
                date.getFullYear() === selectedDate.getFullYear() &&
                date.getDate() === selectedDate.getDate())
                ? 'bg-[#f5eeee] text-black transform scale-105'
                : 'hover:bg-gray-100 border border-[#f5eeee]'
              } ${date.getMonth() !== selectedDate.getMonth() ? 'text-gray-300 opacity-50' : ''}`}
            >
              <div className={`text-lg ${
                (date.getMonth() === selectedDate.getMonth() && 
                date.getFullYear() === selectedDate.getFullYear() && 
                date.getDate() === selectedDate.getDate()) 
                ? 'text-[#dc2626]' : ''
              }`}>
                {date.getDate()}
              </div>
              <div className="text-xs mt-1 text-[#4a4a4a]">
                {schedule[formatDateKey(date)]?.muscle || 
                 defaultMuscleGroups[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][date.getDay()]] || ''}
              </div>
            </div>
          ))}
          <img onClick={HandleNextClick} className='absolute right-2 top-[60%] h-9 -rotate-90 hover:scale-110 cursor-pointer transition-all duration-200 ease-in-out' src={ArrowIcon} alt="" />
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row w-full gap-7">
        <div className='flex flex-col gap-4 w-full md:w-1/2'>
          <div className="bg-[#f4eded] rounded-lg p-4">
            <input
              type="text"
              value={schedule[formatDateKey(selectedDate)]?.muscle || ''}
              onChange={(e) => handleMuscleGroupChange(e.target.value)}
              placeholder="Add muscle group for this day"
              className='w-full p-2 border rounded text-[#dc2626] text-xl font-semibold bg-transparent border-b border-transparent focus:border-[#dc2626] focus:outline-none'
            />
          </div>
          <div className="bg-white rounded-lg p-6 border border-[#f5eeee]">
            {(schedule[formatDateKey(selectedDate)]?.exercises || []).map((exercise, i) => (
              <div
                key={exercise.id}
                onClick={() => handleExerciseClick(exercise)}
                className='cursor-pointer hover:bg-gray-100 px-4 py-3 rounded-lg flex items-center justify-between transition-all duration-300 ease-in-out mb-2'
              >
                <div className="flex items-center gap-4">
                  <span className='bg-[#dc2626] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'>{i + 1}</span>
                  <div className="text-gray-800 text-lg font-normal">{exercise.name || 'New Exercise'}</div>
                </div>
                <div className="text-[#dc2626]">
                  <img className='w-4 h-4 transform -rotate-90' src={ArrowIcon} alt="View details" />
                </div>
              </div>
            ))}
            <button 
              onClick={handleAddExercise}
              className='mt-4 w-full bg-[#dc2626] text-white py-2 rounded-lg hover:bg-[#b91c1c] transition duration-150 ease-in-out'
            >
              Add Exercise
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 w-full md:w-1/2 mt-4 md:mt-0 border border-[#f5eeee]">
          {selectedExercise ? (
            <div className=''>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                <input 
                  autoFocus
                  type="text" 
                  value={selectedExercise.name} 
                  onChange={(e) => handleExerciseUpdate('name', e.target.value)}
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-[#dc2626]"
                  placeholder="Exercise Name"
                />
              </h2>
              <div className="flex flex-col gap-4">
                {selectedExercise.sets.map((set, index) => (
                  <div key={index} className="bg-[#f5eeee8f] border border-[#f5eeee] p-4 rounded-lg relative">
                    <h3 className="font-semibold mb-2 text-gray-700">Set {index + 1}:</h3>
                    <div className="flex items-center gap-4 mb-2">
                      <label className="font-medium">Reps:</label>
                      <input 
                        type="number" 
                        value={set.reps} 
                        onChange={(e) => handleSetUpdate(index, 'reps', e.target.value)}
                        className="border border-gray-300 rounded py-1 px-2 w-16 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                      <label className="font-medium">Weight:</label>
                      <input                         
                        type="text" 
                        value={set.weight} 
                        onChange={(e) => handleSetUpdate(index, 'weight', e.target.value)}
                        className="border border-gray-300 rounded py-1 px-2 w-32 focus:outline-none focus:ring-1 focus:ring-[#dc2626] focus:border-transparent"
                      />
                    </div>
                    <button 
                      onClick={() => removeSet(index)}
                      className='absolute top-2 rounded-full p-2 right-2 bg-white shadow-lg transition-all duration-200 ease-in-out text-red-500 hover:scale-105'
                    >
                      <img src={DeleteIcon} alt="" />
                    </button>
                  </div>
                ))}
               <div className="flex gap-4">
               <button 
                  onClick={addSet}
                  className='mt-2 w-full bg-[#dc2626] text-white py-2 rounded-lg hover:bg-[#b91c1c] transition duration-150 ease-in-out'
                >
                  Add More Sets
                </button>
                <button 
                  onClick={removeExercise}
                  className='mt-2 w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition duration-150 ease-in-out'
                >
                  Remove Exercise
                </button>
               </div>
              </div>
            </div>
          ) : (
            <>
              <Lottie
                options={defaultOptions}
                height={380}
                width={400}
              />
              <p className="text-gray-600 text-xl text-center">Select or add an exercise to set details.</p>
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={showDefaultMuscleModal}
        onClose={() => setShowDefaultMuscleModal(false)}
        onConfirm={handleConfirmDefaultMuscle}
        icon={''}
        title={`Add Default Muscle for ${selectedDay}`}
        size={1}
        message={
          <input
            type="text"
            value={newDefaultMuscle}
            onChange={(e) => setNewDefaultMuscle(e.target.value)}
            placeholder="Enter default muscle"
            className='flex flex-col border outline-none p-2 w-52 mt-2'
          />
        }
        cancelText="Cancel"
        confirmText="Add"
      />
    </div>
  )
}

export default MemberSchedule