import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserCircle, Users } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');



  function handleUserRedirect() {
    if (user === '') {
      toast.error('To login to dashboard select user first.')
    }
    else if (user === 'member') {
      navigate('memberdashboard')      
    }else{
      navigate('trainerdashboard')
    }
  }


  return (
    <div className="w-full md:w-[70%] flex flex-col items-center  gap-9">
     <ToastContainer />
    <h1 className='text-5xl  font-bold'>Sign In</h1>
    
    <span className="text-sm text-gray-600">
        Forgot your password? <Link to="forgotpassword" className="text-[#dc2626] hover:underline">Click here</Link> to reset it.
    </span>

    <div className="flex justify-center w-full gap-12">
      <button 
      onClick={()=>setUser('trainer')} 
      className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ${
        user === 'trainer'
          ? 'bg-red-600 text-white shadow-lg scale-105'
          : 'bg-white text-gray-700 hover:bg-red-100'
      }`}
      >
        <UserCircle className="w-5 h-5" />
       <span>Trainer</span>
      </button>
      <button 
       onClick={()=>setUser('member')} 
       className={`flex items-center gap-2 py-2 px-4 rounded-full transition-all duration-300 ${
        user === 'member'
          ? 'bg-red-600 text-white shadow-lg scale-105'
          : 'bg-white text-gray-700 hover:bg-red-100'
      }`}
       >
        <Users className="w-5 h-5" />
        <span> Member</span>
      </button>
    </div>

    <div className="flex flex-col w-full gap-4">
        <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
            <label htmlFor="Email">Email</label>
            <input
             className='bg-transparent outline-none'
             placeholder='example@gmail.com'
             type="email" />
        </div>
        <div className="border rounded-xl flex flex-col px-3 py-2 bg-[#] outline-dashed outline-1">
            <label htmlFor="password">Password</label>
            <input
             className='bg-transparent outline-none'
             placeholder='bilgate@123'
             type="password" />
        </div>
    </div>
   
    <button onClick={()=>{handleUserRedirect()}} className='border py-2 w-[90%] bg-[#dc2626] text-white text-lg rounded-md'>sign In</button>
    
</div>
  )
}

export default SignIn
