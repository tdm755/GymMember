import React, { useState } from 'react'
import Header from './Admin/Header'
import SideBar from './Admin/sidebar'
import { Outlet } from 'react-router-dom';

function AdminDashboard() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div >
        <SideBar isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div className={`md:ml-60`}>
        <Header isOpen={isOpen} setIsOpen={setIsOpen}/>

        <div className="">
          <Outlet />
        </div>

        </div>
      
    </div>
  )
}

export default AdminDashboard
