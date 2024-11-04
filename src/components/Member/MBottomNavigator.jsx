import React from 'react'
import HomeIcon from '../../../public/assets/HomeIcon.svg'
import ProfileIcon from '../../../public/assets/ProfileIcon2.svg'
import ArrowCircleIcon from '../../../public/assets/ArrowCircleIcon.svg'
import QRSccanner from '../../../public/assets/QRSccanner.svg'
import NotificationIcon from '../../../public/assets/NotificationIcon.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { faTruckField } from '@fortawesome/free-solid-svg-icons/faTruckField'
import { ScanBarcode } from 'lucide-react'


function MBottomNavigator({ ShowQR, setShowQR, setShowQRCode }) {

  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className='md:hidden Shadow fixed bottom-0 right-0 left-0 z-40 w-full h-[70px] bg-white border-black'>
      <div className="flex justify-center px-7 h-full items-center">


        <div className=" w-full flex justify-around gap-16">
          <div className="flex gap-4">
            <div onClick={() => { navigate('/memberdashboard') }} className={`${pathname === '/memberdashboard' && 'bg-[#f2e9e9c1]'} flex-col py-1 px-3 rounded-2xl flex gap-1 items-center justify-center`}>
              <img className='w-7' src={HomeIcon} alt="" />
              <span className='text-xs'>Home</span>
            </div>
            <div onClick={() => { navigate('/memberdashboard') }} className={`${pathname === '/trainerdashboard' && 'bg-[#f2e9e9c1]'} flex-col py-1 px-3 rounded-2xl flex gap-1 items-center justify-center`}>
              <img className='w-7' src={NotificationIcon} alt="" />
              <span className='text-xs'>Notification</span>
            </div>
            
          </div>
          <div className="flex gap-4">
          <div onClick={()=>{setShowQRCode(true)}} className={`${pathname === '/trainerdashboard' && 'bg-[#f2e9e9c1]'} flex-col py-1 px-3 rounded-2xl flex gap-1 items-center justify-center`}>
              <img className='cursor-pointer' src={QRSccanner} alt="" />
              <span className='text-xs whitespace-nowrap '>Show QR</span>
            </div>
            <div onClick={() => { navigate('profile') }} className={`${pathname.includes('/profile') && 'bg-[#f2e9e9c1]'} flex-col py-1 px-3 gap-1 rounded-2xl flex items-center justify-center`}>
              <img className='w-7' src={ProfileIcon} alt="" />
              <span className='text-xs'>Profile</span>
            </div>
          </div>
        </div>


        <div className="absolute -top-9 bg-white Shadow2 p-2 rounded-full">
          <div onClick={() => setShowQR(faTruckField)} className="bg-[#f2e9e9c1] p-3 rounded-full relative">
            <ScanBarcode color='#dc2626' strokeWidth={'1.5px'} width={'30px'} height={'30px'} />
            <img className={`${ShowQR && 'rotate-90'}  absolute top-[0px] left-[0px] transition-all duration-500 ease-linear`} src={ArrowCircleIcon} alt="" />
          </div>
        </div>
      </div>

      <div className="">

      </div>

    </div>
  )
}

export default MBottomNavigator
