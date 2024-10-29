import React, { useState, useEffect } from 'react'
import THeader from './Trainers/Header';
import TSideBar from './Trainers/sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import TBottomNavigator from './Trainers/TBottomNavigator';

function TrainerDashboard({ShowQR, setShowQR, setShowLogoutModal}) {
    const [isOpen, setIsOpen] = useState(false);
    const [DropDownView, setDropDownView] = useState(false);
    const [] = useState(false);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <TSideBar isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} setShowLogoutModal={setShowLogoutModal} />

            <div className={`md:ml-60`}>
                <THeader isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} setShowQR={setShowQR} setShowLogoutModal={setShowLogoutModal} />
                <TBottomNavigator ShowQR={ShowQR} setShowQR={setShowQR} />

                <div onClick={()=>setIsOpen(false)} className="min-h-[670px] border">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TrainerDashboard
