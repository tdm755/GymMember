import React, { useState, useEffect } from 'react'
import THeader from './Trainers/Header';
import TSideBar from './Trainers/sidebar';
import { Outlet, useLocation } from 'react-router-dom';

function TrainerDashboard({ShowQR, setShowQR}) {
    const [isOpen, setIsOpen] = useState(false);
    const [DropDownView, setDropDownView] = useState(false);
    const [] = useState(false);

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <div>
            <TSideBar isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} />

            <div className={`md:ml-60`}>
                <THeader isOpen={isOpen} setIsOpen={setIsOpen} DropDownView={DropDownView} setDropDownView={setDropDownView} setShowQR={setShowQR} />

                <div onClick={()=>setIsOpen(false)} className="min-h-[670px] border">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default TrainerDashboard