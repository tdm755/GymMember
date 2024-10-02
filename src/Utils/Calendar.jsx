import React, { useCallback, useEffect, useRef, useState } from 'react'
import Arrow from '../../public/assets/ArrowDown.svg'
import GymSessionModal from './DateViewModelDetails';

function Calendar() {
  const [currentDate, setselectedDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(currentDate);


  const getCurrentMonth = useCallback(()=>{selectedDate.getMonth()},[selectedDate])
  const getCurrentYear = useCallback(()=>{selectedDate.getFullYear()},[selectedDate])
  const getCurrentDate = useCallback(()=>{selectedDate.getDate()},[selectedDate])

  const years = Array.from({ length: currentDate.getFullYear() - 1899 }, (_, index) => currentDate.getFullYear() - index);
  

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();



  const rightBTNRef = useRef();

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    // rightBTNRef.current.style.display = 'block';

  };
  
  const handleNextMonth = () => {
    if (selectedDate.getFullYear() === 2024 && selectedDate.getMonth() === 11) {
      // rightBTNRef.current.style.display = 'none';
    }else{
      setSelectedDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
      // rightBTNRef.current.style.display = 'block';

    }
  };




  const HandleYearChange = (e) => {
    let val = parseInt(e.target.value);
    setSelectedDate(new Date(val, selectedDate.getMonth(), 1));
  };
  const HandleMonthChange = (e) => {
    let val = parseInt(e.target.value);
    setSelectedDate(new Date(selectedDate.getFullYear(), val, 1));
  };


  const [showModel, setShowModel] = useState(false);

  function HandleSessonModalView() {
    setShowModel(true);
  }
 

  const renderCalendarDays = () => {
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const  dateOf = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);

      days.push(
        <div onClick={HandleSessonModalView} key={i} className={`h-32 hover:bg-[#f2e9e9c1] cursor-pointer ${(
          currentDate.getFullYear() === dateOf.getFullYear()
          && currentDate.getMonth() === dateOf.getMonth() 
          && currentDate.getDate() === dateOf.getDate()
          ) && 'bg-[#f2e9e9c1]'} flex items-start pt-2 justify-center border border-[#decfcf]`}>
          {i}
        </div>
      );
    }
    return days;
  };
  
  console.log('sdjfksjd', selectedDate.getMonth());
  

  return (
    <div className='px-10'>
      <div className="border h-16 flex items-center justify-around">
        <button onClick={handlePrevMonth}><img className='rotate-90 h-10' src={Arrow} alt="Previous Month" /></button>
        <div className='text-3xl font-medium flex gap-2 items-center'>
          {/* <span>{monthNames[selectedDate.getMonth()]} </span> */}
          <select value={selectedDate.getMonth()} onChange={(e)=>HandleMonthChange(e)} name="" id=""  className='outline-none border  border-[#dea5a5] rounded-lg focus:border-[#dc2626]'>
            {monthNames.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select value={selectedDate.getFullYear()} onChange={(e)=>HandleYearChange(e)} name="" id="" className='outline-none border  border-[#dea5a5] rounded-lg focus:border-[#dc2626]'>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button ref={rightBTNRef} onClick={handleNextMonth}><img className='-rotate-90 h-10' src={Arrow} alt="Next Month" /></button>
      </div>   
      <div className="grid grid-cols-7 gap-1 mt-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold">{day}</div>
        ))}
        {renderCalendarDays()}
      </div>  
      {/* <div className="fixed flex items-center justify-center top-0 right-0 bottom-0 left-0 bg-[#00000010]"> */}
        <GymSessionModal
          isOpen={showModel}
          onClose={()=>setShowModel(false)}
          date={`12/12/2024`}
          sessions={[
            { userName: "Arpit Tiwari", bodyPart: "Legs", time: "10:00 AM" },
            // { userName: "Jane Smith", bodyPart: "Arms", time: "2:00 PM" },
          ]}
         />
      {/* </div>  */}
    </div>
  )
}

export default Calendar
