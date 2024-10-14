import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import PreLoader from './Utils/PreLoader'
import LoginCredentials from './Authentication/LoginCredentials'
import SignIn from './Authentication/SignIn'
import ForgotPass from './Authentication/ForgotPass'


// Member
import IndexPage from './components/Member/IndesPage'
import Setting from './components/Member/Setting'
import MembersDashDashboard from './components/MemberDashboard'
import Profile from './components/Member/Profile'
import Schedule from './components/Member/Schedule'
import CalendarPage from './components/Member/CalendarPage'
import Sessions from './components/Member/Sessions'
import QRCodeOf from './components/Member/QRCodeOf'


//Trainer
import TIndexPage from './components/Trainers/IndesPage'
import TSetting from './components/Trainers/Setting'
import TrainerDashboard from './components/TrainerDashboard'
import TProfile from './components/Trainers/Profile'
import TSchedule from './components/Trainers/Schedule'
import TCalendarPage from './components/Trainers/CalendarPage'
import TSessions from './components/Trainers/Sessions'
import AllMembers from './components/Trainers/AllMembers'
import TQRCodeOf from './components/Trainers/QRCodeOf'
import QRCodeView from './components/Member/QRCodeView'
// import TQRCodeOf from './components/Trainers/QRCodeOf'


function App() {

  const [ShowQR, setShowQR] = useState(false);
  const [ShowQRCode, setShowQRCode] = useState(false);
  const [TShowQR, setTShowQR] = useState(false);

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
      <Route path='/memberdashboard' element={<MembersDashDashboard ShowQR={ShowQR} setShowQR={setShowQR} setShowQRCode={setShowQRCode} />} >
        <Route index  element={<IndexPage />} />
        <Route path='setting' element={<Setting />} />
        <Route path='profile' element={<Profile />} />
        <Route path='schedule' element={<Schedule />} />
        <Route path='calendar' element={<CalendarPage />} />
        <Route path='sessions' element={<Sessions />} />
      </Route>

      <Route path='/trainerdashboard' element={<TrainerDashboard ShowQR={TShowQR} setShowQR={setTShowQR} />} >
        <Route index  element={<TIndexPage />} />
        <Route path='setting' element={<TSetting />} />
        <Route path='profile' element={<TProfile />} />
        <Route path='schedule' element={<TSchedule />} />
        <Route path='calendar' element={<TCalendarPage />} />
        <Route path='sessions' element={<TSessions />} />
        <Route path='allmembers' element={<AllMembers />} />
      </Route>

      <Route path='/' element={<LoginCredentials />} >
          <Route index element={<SignIn />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='forgotpassword' element={<ForgotPass />} />
      </Route>
    </Routes>
    {ShowQR && <QRCodeOf setShowQR={setShowQR} />}
    {TShowQR && <TQRCodeOf setShowQR={setTShowQR} />}
    {ShowQRCode && <QRCodeView setShowQR={setShowQRCode} />}

    </>
  )
}

export default App
