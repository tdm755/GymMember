import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import AddMemberPage from './Members/AddMemberPage/AddMemberPage'
import Members from './Members/Members'
import MemberDetail from './Members/MemberDetail'
import IndesPage from './components/Member/IndesPage'
import PreLoader from './Utils/PreLoader'
import LoginCredentials from './Authentication/LoginCredentials'
import SignIn from './Authentication/SignIn'
import ForGotPassword from './Authentication/ForGotPassword'
import Setting from './components/Member/Setting'
import MembersDashDashboard from './components/MemberDashboard'
import ForgotPass from './Authentication/ForgotPass'
import Profile from './components/Member/Profile'
import Schedule from './components/Member/Schedule'
import CalendarPage from './components/Member/CalendarPage'
import Sessions from './components/Member/Sessions'
import QRCodeOf from './components/Member/QRCodeOf'

function App() {

  const [ShowQR, setShowQR] = useState(false);

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
      <Route path='/dashboard' element={<MembersDashDashboard ShowQR={ShowQR} setShowQR={setShowQR} />} >
        <Route index  element={<IndesPage />} />
        <Route path='setting' element={<Setting />} />
        <Route path='profile' element={<Profile />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='sessions' element={<Sessions />} />
        <Route path='addmember' element={<AddMemberPage />} />
        <Route path='addtrainer' element={<AddMemberPage />} />
        <Route path='members' element={<Members />} />
        <Route path='trainers' element={<Members />} />
        <Route path='trainers/memberdetail' element={<MemberDetail />} />
        <Route path='members/memberdetail' element={<MemberDetail />} />
      </Route>

      <Route path='/' element={<LoginCredentials />} >
          <Route index element={<SignIn />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='forgotpassword' element={<ForgotPass />} />
      </Route>
    </Routes>
    {ShowQR && <QRCodeOf setShowQR={setShowQR} />}
    </>
  )
}

export default App
