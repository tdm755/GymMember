import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard'
import AddMemberPage from './Members/AddMemberPage/AddMemberPage'
import Trainers from './Trainers/Trainers'
import Members from './Members/Members'
import MemberDetail from './Members/MemberDetail'
import IndesPage from './components/Admin/IndesPage'
import PreLoader from './Utils/PreLoader'
import LoginCredentials from './Authentication/LoginCredentials'
import SignIn from './Authentication/SignIn'
import ForGotPassword from './Authentication/ForGotPassword'
import Setting from './components/Admin/Setting'

function App() {


  const [loader, setLoader] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setLoader(false);
    },[2000])
  })


  if (loader) {
    return <PreLoader />
  }

  return (
    <>

    <Routes>
      <Route path='/dashboard' element={<AdminDashboard />} >
        <Route index  element={<IndesPage />} />
        <Route path='setting' element={<Setting />} />
        <Route path='addmember' element={<AddMemberPage />} />
        <Route path='addtrainer' element={<AddMemberPage />} />
        <Route path='members' element={<Members />} />
        <Route path='trainers' element={<Members />} />
        <Route path='trainers/memberdetail' element={<MemberDetail />} />
        <Route path='members/memberdetail' element={<MemberDetail />} />
      </Route>

      <Route path='/' element={<LoginCredentials />} >
          <Route path='signin' element={<SignIn />} />
          <Route path='forgotpassword' element={<ForGotPassword />} />
      </Route>
    </Routes>

    </>
  )
}

export default App
