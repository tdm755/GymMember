import React, { useState, useEffect } from 'react'
import Header from './Member/Header'
import SideBar from './Member/sidebar'
import { Outlet, useLocation } from 'react-router-dom';
import MBottomNavigator from './Member/MBottomNavigator';

function MembersDashDashboard({ShowQR, setShowQR, setShowQRCode, setShowLogoutModal}) {
    const [isOpen, setIsOpen] = useState(false);
    const [DropDownView, setDropDownView] = useState(false);
    // const [] = useState(false);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <SideBar isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} setShowLogoutModal={setShowLogoutModal} />

            <div className={`md:ml-60`}>
                <Header isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} setShowQR={setShowQR} setShowQRCode={setShowQRCode} />
                <MBottomNavigator ShowQR={ShowQR} setShowQR={setShowQR} />
                <div onClick={()=>setIsOpen(false)} className="min-h-[670px] border">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MembersDashDashboard
