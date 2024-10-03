import React, { useEffect, useRef, useState } from 'react'
import weightLiftingBanner from '../../public/assets/weightLiftingBanner-min.jpg'
import './Members.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Arrow from '../../public/assets/ArrowDown.svg';
import SearchIcon from '../../public/assets/SearchIcon.svg';

function Members() {
  
  const Mpin = 7777;
  const [MPinCheck, setMpinCheck] = useState(0);
  const [enteredMpin, setEnteredMpin] = useState('');

  const location = useLocation();
  const { pathname } = location;
  const isTrainer = pathname.includes('trainers');

  const [errorOf, setError] = useState('');


  
  const [AllFormData, setAllFormData] = useState([]);

  const [formData, setFormData] = useState([
    {
      trainer: 'Denesh Kartik',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },
    {
      trainer: 'Rudransh Rana',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },
    {
      trainer: 'John Kartik',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },
    {
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },{
      trainer: 'Virat',
      name: 'Arpit',
      email: 'tdm75513@gmail.com',
      phone: '+91 8090426993',
      dob: '16/10/2003',
      gender: 'Male',
      address: 'Flat No. 503, Shivaji Park View Dr. Ketkar Marg, Opposite Portuguese Church Dadar West, Mumbai - 400028 Maharashtra, India',
      membershipType: 'Premium',
      startDate: '34/34/3434',
      endDate: '23/23/2332',
      fitnessGoal: 'Weight Gain',
      paymentStatus: 'Paid',
      paid: '3,000',
      balance: '0',
      total: '3,000',
      admittedBy: 'Dinesh Kartik'
    },
    
  ]);

  const [TrainersFormData, setTrainersFormData] = useState([
    {
      name: 'Denesh Kartik',
      email: 'denesh.kartik@example.com',
      phone: '+91 9876543210',
      dob: '15/05/1985',
      gender: 'Male',
      address: 'Flat No. 301, Fitness Avenue, Mumbai - 400001 Maharashtra, India',
      specialization: 'Weight Training',
      experience: '10 years',
      certification: 'Certified Personal Trainer (CPT)',
      availableHours: '6 AM - 9 PM',
      rating: '4.8',
      totalClients: '25',
      salary: '50,000',
      joiningDate: '01/01/2020'
    },
    {
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      phone: '+91 9876543211',
      dob: '22/09/1990',
      gender: 'Female',
      address: 'Apartment 502, Fitness Heights, Delhi - 110001, India',
      specialization: 'Yoga and Pilates',
      experience: '8 years',
      certification: 'Registered Yoga Teacher (RYT-200)',
      availableHours: '7 AM - 8 PM',
      rating: '4.9',
      totalClients: '20',
      salary: '45,000',
      joiningDate: '15/03/2021'
    },
    {
      name: 'Rahul Verma',
      email: 'rahul.verma@example.com',
      phone: '+91 9876543212',
      dob: '10/12/1988',
      gender: 'Male',
      address: 'House No. 123, Fitness Street, Bangalore - 560001, Karnataka, India',
      specialization: 'Crossfit and Functional Training',
      experience: '7 years',
      certification: 'CrossFit Level 2 Trainer',
      availableHours: '5 AM - 7 PM',
      rating: '4.7',
      totalClients: '18',
      salary: '48,000',
      joiningDate: '01/06/2022'
    }
  ]);

  useEffect(()=>{
    if (isTrainer) {
      setAllFormData(TrainersFormData);
    }else {
      setAllFormData(formData);
    }
  })

 
  function handleMpinChange(e, index) {
    const value = e.target.value;
    if (value && !isNaN(value)) {
      const newEnteredMpin = enteredMpin.slice(0, index) + value + enteredMpin.slice(index + 1);
      setEnteredMpin(newEnteredMpin);

      const inputs = e.target.parentNode.parentNode.querySelectorAll('input');
      if (index < 3) {
        inputs[index + 1].focus();
      } else {
        // Check if MPIN is correct
        if (newEnteredMpin === Mpin.toString()) {
          setMpinCheck(parseInt(newEnteredMpin));
          setError('Access granted');
        } else {
          setError('Incorrect MPIN');
          // Reset the entered MPIN
          setEnteredMpin('');
          inputs.forEach(input => input.value = '');
          inputs[0].focus();
        }
      }
    }
  }

  function handleKeyDownMpin(e, index) {
    if (e.key === 'Backspace' && !e.target.value) {
      const inputs = e.target.parentNode.parentNode.querySelectorAll('input');
      if (index > 0) {
        inputs[index - 1].focus();
      }
      const newEnteredMpin = enteredMpin.slice(0, index - 1) + enteredMpin.slice(index);
      setEnteredMpin(newEnteredMpin);
    }
  }

  const navigate = useNavigate();

  function handleNavigate() {
    navigate('memberdetail')
  }



  const shortRef = useRef();
  function handleSelectTrainerClick() {
    shortRef.current.style.transform = 'rotate(180deg)';    
  }
  function handleRemoverSelectClick() {       
    shortRef.current.style.transform = 'rotate(0deg)';    
  }
  

  const [selectedPage, setSelectedPage] = useState(1);
  const itemPerPage = 5;

  
  function HandleBackwardClick() {
    if (selectedPage >  1) {
      setSelectedPage(selectedPage - 1)
    }else{
      setSelectedPage(Math.ceil(AllFormData.length / itemPerPage))
    }
  }
  
  function HandleForwardClick() {
    const totalPages = Math.ceil(AllFormData.length / itemPerPage)
    if (selectedPage < totalPages) {
      setSelectedPage(selectedPage + 1)
    }else{
      setSelectedPage(1);
    }
  }
  


  return (
    <>
      {Mpin === MPinCheck ? <div className='p-6 bg-gray-100'>
        <div className="GymBannerImage flex relative items-center justify-center rounded-2xl overflow-hidden h-36 border mb-10" style={{ backgroundImage: `url(${weightLiftingBanner})`, backgroundPosition: 'center bottom -27px' }}>
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[#db3c3c3e]"></div>
          <h2 className="text-5xl relative z-20 text-white font-bold mb-4">
            {isTrainer ? 'Trainers' : 'Members'}
          </h2>
        </div>

          {/* headerpart */}
          <div className="flex items-center justify-evenly">

            <div className="relative">
              <select
               onMouseLeave={()=>handleRemoverSelectClick()} onMouseDownCapture={()=>handleSelectTrainerClick()}
               className='border border-[#dc2626] w-52 py-1 outline-none rounded-md px-2 appearance-none relative z-20 bg-transparent' 
               name="" id="">
                <option value="">select</option>
                <option value="">due date</option>
                <option value="">balance</option>
                {/* <option value=""></option> */}
              </select>
            <span ref={shortRef} className='absolute z-10 right-2 top-1 transition-all duration-300 ease-in-out'><img src={Arrow} alt="" /></span>
            </div>           
            <div className="relative flex items-center">
              <img className='absolute  left-2' src={SearchIcon} alt="" />
              <input 
                className='border border-[#decfcf] pl-10 w-96 py-[5px] outline-none focus:border-[#dc2626] rounded-md' 
                placeholder='search....'
                type="text" 
              />
            </div>

          </div>

        <div className="Members overflow-x-auto mt-16">
          <table>
            <thead>
              <tr>
                {!isTrainer && <th>Trainer</th>}
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Address</th>
                <th>{isTrainer ? 'Specialization' : 'Membership Type'}</th>
                <th>{isTrainer ? 'Joining Date' : 'Start Date'}</th>
                <th>{isTrainer ? 'Experience' : 'End Date'}</th>
                <th>{isTrainer ? 'Certification' : 'Fitness Goal'}</th>
                <th>{isTrainer ? 'Available Hours' :'Payment Status'}</th>
                <th>{isTrainer ? 'Rating' : 'Paid'}</th>
                <th>{isTrainer ? 'Total Clients' : 'Balance'}</th>
                <th>{isTrainer ? 'Salary' : 'Total'}</th>
                {!isTrainer && <th>Admitted By</th>}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(AllFormData.slice(selectedPage * itemPerPage - itemPerPage, selectedPage * itemPerPage)).map((member, index) => (
                <tr key={index}>
                 {!isTrainer && <td>{member.trainer}</td>}
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.dob}</td>
                  <td>{member.gender}</td>
                  <td>{member.address}</td>
                  <td>{isTrainer ? member.specialization : member.membershipType}</td>
                  <td>{isTrainer ? member.joiningDate : member.startDate}</td>
                  {!isTrainer && <td>{member.endDate}</td>}
                  <td>{isTrainer ? member.experience : member.fitnessGoal}</td>
                  <td>{isTrainer ? member.certification : member.paymentStatus}</td>
                  <td>{isTrainer ? member.availableHours : member.paid}</td>
                  <td>{isTrainer ? member.rating : member.balance}</td>
                  {!isTrainer && <td>{member.total}</td>}
                  <td>{isTrainer ? member.totalClients : member.admittedBy}</td>
                  {isTrainer && <td>{member.salary}</td>}
                  <td onClick={handleNavigate}>View</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border h-32 flex items-center justify-end px-16 gap-3">
            <div  onClick={()=>{HandleBackwardClick()}} className="border h-9 w-9 flex items-center justify-center rotate-90 rounded-md border-[#decfcf]"><img src={Arrow} alt="" /></div>

            <div onClick={()=>setSelectedPage(1)}  className={`${selectedPage <= 2 ? 'hidden' : 'flex'} cursor-pointer border h-10 w-10 items-center justify-center rounded-md `}>1</div>
            <div  className={`${selectedPage <= 3 ? 'hidden' : 'flex'} cursor-pointer border h-10 w-10 items-center justify-center rounded-md `}>...</div>
                {AllFormData.length > 0 && [...Array(Math.ceil((AllFormData.length / itemPerPage))-1)].map((_, i)=>{
                   return <div onClick={()=>{setSelectedPage(i+1)}} className={`${selectedPage === i + 1 ? 'border-[#dc2626]' : 'border-[#decfcf]'} ${selectedPage === i + 1 || selectedPage + 1 === i + 1 || selectedPage - 1 === i + 1 ? 'flex' : 'hidden'} cursor-pointer border h-10 w-10 items-center justify-center rounded-md `}>{i + 1}</div>
                    
                })}
                
            <div  className={`${selectedPage >= (Math.ceil(AllFormData.length/itemPerPage))-2 || selectedPage === Math.ceil(AllFormData.length/itemPerPage) ? 'hidden' : 'flex'} cursor-pointer border h-10 w-10 items-center justify-center rounded-md `}>...</div>
            <div onClick={()=>setSelectedPage(Math.ceil(AllFormData.length/itemPerPage))} className={`${selectedPage === Math.ceil(AllFormData.length/itemPerPage) ? 'border-[#dc2626]' : 'border-[#decfcf]'} flex cursor-pointer border h-10 w-10 items-center justify-center rounded-md `}>{Math.ceil(AllFormData.length / itemPerPage)}</div>
                              
            <div onClick={()=>{HandleForwardClick()}} className="border h-9 w-9 flex items-center justify-center -rotate-90 rounded-md border-[#decfcf]"><img src={Arrow} alt="" /></div>
        </div>
      </div>
        : <div className='flex items-center justify-center h-[400px]'>
          <div className="border w-96 h-48 flex flex-col gap-4 justify-center items-center shadow-md rounded-lg border-[#dc2626]">
            <span className='text-16'>Enter Mpin to View Member Details</span>
            <div className="flex gap-4">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="border w-12 h-12 flex items-center justify-center">
                  <input
                    className='w-10 outline-none text-center text-[#dc2626]'
                    type="text"
                    maxLength={1}
                    pattern="\d*"
                    inputMode="numeric"
                    onChange={(e) => handleMpinChange(e, index)}
                    onKeyDown={(e) => handleKeyDownMpin(e, index)}
                    value={enteredMpin[index] || ''}
                  />
                </div>
              ))}
            </div>
            <span className='text-[#db3c3c]'>{errorOf}</span>
            <span className='text-gray-500 text-xs'>Enter the 4-digit MPIN to access member information</span>
          </div>
        </div>}
    </>
  )
}

export default Members
