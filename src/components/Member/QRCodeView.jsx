import React, { useState } from 'react';
import QRCode from "react-qr-code";
import CrossIcon from '../../../public/assets/CrossIcon.svg';

function QRCodeView({ setShowQR }) {
  const [value, setValue] = useState('');

  const handleClose = () => {
    setShowQR(false);
  };

  return (
    <div className='fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50'>
      <div onClick={()=>{setShowQR(false)}} className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center'></div>

        <div className="bg-white relative w-full max-w-md rounded-md flex flex-col items-center gap-6 p-6 z-50">
          <button
            onClick={handleClose}
            className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center'
          >
            <img className='w-full h-full' src={CrossIcon} alt="Close" />
          </button>

          <div className='flex flex-col items-center justify-center mt-12'>
            <QRCode
              size={300}
              value={value || "https://example.com"}
              className="mb-6"
            />
            <p className='text-[#dc2626] text-lg mt-2'>Show QR To Trainer</p>

          </div>
        </div>
     
    </div>
  );
}

export default QRCodeView;

