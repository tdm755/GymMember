import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import AddMemberPage from './Members/AddMemberPage/AddMemberPage'
import Trainers from './Trainers/Trainers'
import Members from './Members/Members'
import MemberDetail from './Members/MemberDetail'
import IndesPage from './components/Admin/IndesPage'

function App() {

  return (
    <>

    <Routes>
      <Route path='/' element={<AdminDashboard />} >
        <Route path='indexpage' element={<IndesPage />} />
        <Route path='addmember' element={<AddMemberPage />} />
        <Route path='addtrainer' element={<AddMemberPage />} />
        <Route path='members' element={<Members />} />
        <Route path='trainers' element={<Members />} />
        <Route path='trainers/memberdetail' element={<MemberDetail />} />
      </Route>
    </Routes>

    </>
  )
}

export default App
