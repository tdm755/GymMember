// import React, { useState, useEffect } from 'react'
// import CrossIcon from '../../../public/assets/CrossIcon.svg'
// import QRCode from "react-qr-code";
// import { QrReader } from 'react-qr-reader';

// function QRCodeOf({setShowQR}) {
//   const [isCheckedIn, setIsCheckedIn] = useState(false)
//   const [currentTime, setCurrentTime] = useState(new Date())
//   const [data, setData] = useState('No result');
//   const [hasPermission, setHasPermission] = useState(false);
//   const [facingMode, setFacingMode] = useState('environment');

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000)
//     return () => clearInterval(timer)
//   }, [])

//   useEffect(() => {
//     requestCameraPermission();
//   }, []);

//   const requestCameraPermission = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ 
//         video: { facingMode: facingMode } 
//       });
//       stream.getTracks().forEach(track => track.stop());
//       setHasPermission(true);
//     } catch (err) {
//       console.error("Error requesting camera permission:", err);
//       setHasPermission(false);
//     }
//   };

//   const toggleCamera = () => {
//     setFacingMode(prevMode => prevMode === 'environment' ? 'user' : 'environment');
//     requestCameraPermission();
//   };

//   const handleScan = (result) => {
//     if (result) {
//       setData(result?.text || 'Invalid QR Code');
//       setIsCheckedIn(!isCheckedIn);
//     }
//   }

//   const handleError = (error) => {
//     console.error("QR Reader error:", error);
//   }

//   const value = `
//     name: '',
//     email: '',
//     phone: '',
//     dob : '',
//     address: '',
//     gender : '',
//     weight : '',
//     height : '',
//     emergencycontact : '',
//     membershipType : '', 
//     fitnessGoal : '',
//     fitnessLevel : '',
//     healthCondition : '',
//   `

//   return (
//     <div className='fixed top-0 z-50 right-0 bottom-0 left-0 bg-[#00000098] flex items-center justify-center'>
//       <div className="bg-white relative w-96 md:w-[70%] rounded-2xl flex flex-col items-center gap-10 md:gap-20 py-8 px-6">
//         <span onClick={()=>{setShowQR(false)}} className='absolute top-4 right-4'><img className='w-7' src={CrossIcon} alt="" /></span>
//         <h2 className="text-3xl font-bold text-blue-600">{isCheckedIn ? 'Check Out' : 'Check In'}</h2>
        
//         <div className="flex flex-col gap-12 md:flex-row items-center">
//           <div className="flex flex-col items-center">
//             <div className="border-8 w-full rounded-2xl p-4 mb-6 shadow-lg">
//               {hasPermission ? (
//                 <>
//                   <QrReader
//                     delay={300}
//                     onError={handleError}
//                     onResult={handleScan}
//                     style={{ width: '100%' }}
//                     constraints={{
//                       facingMode: facingMode
//                     }}
//                   />
//                   <button 
//                     onClick={toggleCamera}
//                     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
//                   >
//                     Switch Camera
//                   </button>
//                 </>
//               ) : (
//                 <div className="text-center">
//                   <p className="mb-4">Camera permission is required to scan QR codes.</p>
//                   <button 
//                     onClick={requestCameraPermission}
//                     className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
//                   >
//                     Allow Camera Access
//                   </button>
//                 </div>
//               )}
//               <p className="mt-4 text-center">{data}</p>
//             </div>
//             <p className="text-gray-700 text-center px-4 mb-4 text-lg">
//               Scan this QR code to {isCheckedIn ? 'check out' : 'check in'} at the gym
//             </p>
//             <p className="text-blue-600 font-semibold text-xl animate-pulse">Scan Me</p>
//           </div>

//           <div className="flex flex-col items-center">
//             <p className="text-gray-600 mb-2">Current Time:</p>
//             <p className="text-2xl font-bold text-blue-600 mb-4">
//               {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
//             </p>
//             <div className="flex flex-col gap-2 w-full">           
//               <button 
//                 onClick={() => setShowQR(false)}
//                 className="bg-gray-200 text-gray-700 px-12 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-sm w-full"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default QRCodeOf


// import React, { useState, useEffect } from 'react';
// import CrossIcon from '../../../public/assets/CrossIcon.svg';
// import { Html5QrcodeScanner } from "html5-qrcode";

// function QRCodeOf({setShowQR}) {
//   const [isCheckedIn, setIsCheckedIn] = useState(false);
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [data, setData] = useState('No result');
//   const [hasPermission, setHasPermission] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const scanner = new Html5QrcodeScanner("reader", { 
//       fps: 10, 
//       qrbox: {width: 250, height: 250},
//     });
    
//     scanner.render(onScanSuccess, onScanFailure);

//     return () => {
//       scanner.clear();
//     };
//   }, []);

//   const onScanSuccess = (decodedText, decodedResult) => {
//     setData(decodedText);
//     setIsCheckedIn(!isCheckedIn);
//   };

//   const onScanFailure = (error) => {
//     console.warn(`QR code scan error: ${error}`);
//   };

//   return (
//     <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center'>
//       <div className="bg-white relative w-full max-w-md rounded-2xl flex flex-col items-center gap-6 p-6">
//         <span onClick={() => setShowQR(false)} className='absolute top-4 right-4'>
//           <img className='w-7' src={CrossIcon} alt="Close" />
//         </span>
//         <h2 className="text-2xl font-bold text-blue-600">{isCheckedIn ? 'Check Out' : 'Check In'}</h2>
        
//         <div id="reader" className="w-full"></div>
        
//         <p className="text-gray-700 text-center px-4 text-sm">
//           {data === 'No result' ? 'Scan a QR code to check in/out' : `Scanned: ${data}`}
//         </p>

//         <div className="text-center">
//           <p className="text-gray-600 text-sm">Current Time:</p>
//           <p className="text-xl font-bold text-blue-600">
//             {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
//           </p>
//         </div>

//         <button 
//           onClick={() => setShowQR(false)}
//           className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-sm w-full max-w-xs"
//         >
//           Close
//         </button>
//       </div>
//     </div>
//   );
// }

// export default QRCodeOf;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';

function QRCodeOf({setShowQR}) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('checking');
  const qrRef = useRef(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const checkCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      initializeScanner();
    } catch (error) {
      console.error("Camera permission not granted:", error);
      setPermissionStatus('denied');
    }
  }, []);

  useEffect(() => {
    checkCameraPermission();
  }, [checkCameraPermission]);

  const requestCameraPermission = async () => {
    try {
      await checkCameraPermission();
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setError("Camera permission denied. Please grant permission in your browser settings.");
    }
  };

  const initializeScanner = async () => {
    if (qrRef.current && !scannerRef.current) {
      try {
        scannerRef.current = new Html5Qrcode("reader");
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length) {
          const cameraId = cameras[cameras.length - 1].id; // Use the last camera (usually back camera on mobile)
          await scannerRef.current.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            onScanSuccess,
            onScanFailure
          );
        } else {
          setError("No cameras found on the device.");
        }
      } catch (err) {
        console.error("Error starting QR scanner:", err);
        setError("Unable to start the QR scanner. Your browser might not support this feature.");
      }
    }
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    setData(decodedText);
    setIsCheckedIn(!isCheckedIn);
    handleNavigateToLink(decodedText);
  };

  const onScanFailure = (error) => {
    // Silently handle scan failures to avoid flooding the console
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCode.scanFile(file, true)
        .then(decodedText => {
          setData(decodedText);
          setIsCheckedIn(!isCheckedIn);
        })
        .catch(err => {
          console.error("Error scanning file:", err);
          setError("Unable to scan the uploaded file. Please try a different image.");
        });
    }
  };

  const handleClose = useCallback(() => {
    setShowQR(false);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(err => console.error("Error stopping QR scanner:", err));
    }
  }, [setShowQR]);


  const navigate = useNavigate();
  
  const handleNavigateToLink = useCallback((scannedData) => {
    if (scannedData.includes('youtube.com') || scannedData.includes('youtu.be')) {
      // YouTube link: open in a new tab
      window.open(scannedData, '_blank', 'noopener,noreferrer');
    } else {
      // Non-YouTube link: navigate within the app
      
    }
    // Close the QR scanner after redirection
    handleClose();
  }, [navigate]);

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center'>
      <div className="bg-white relative w-full max-w-md rounded-2xl flex flex-col items-center gap-6 p-6">
        <button 
          onClick={handleClose} 
          className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center'
        >
          <img className='w-full h-full' src={CrossIcon} alt="Close" />
        </button>
        {/* <h2 className="text-2xl font-bold text-blue-600">{isCheckedIn ? 'Check Out' : 'Check In'}</h2> */}
        
        <div id="reader" ref={qrRef} className="min-h-52 my-7 w-[95%] bg-gray-100 flex items-center justify-center">
          {permissionStatus === 'checking' && (
            <p className="text-gray-500">Checking camera permission...</p>
          )}
          {permissionStatus === 'denied' && (
            <div className="text-center">
              <p className="text-red-500 mb-2">Camera access is required for QR scanning.</p>
              <button 
                onClick={requestCameraPermission}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Request Camera Permission
              </button>
              <p className="text-sm text-gray-500 mt-2">
                If the button doesn't work, please enable camera access in your browser settings.
              </p>
            </div>
          )}
          {permissionStatus === 'granted' && !error && (
            <p className="text-gray-500">QR Scanner is active</p>
          )}
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>
        
        <div className="w-full flex">
          <div className="">
          <p className="text-sm text-gray-600 mb-2">Or upload a QR code image:</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          </div>
           {/* <div className="text-center">
          <p className="text-gray-600 text-sm">Current Time:</p>
          <p className="text-xl font-bold text-blue-600">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
          </p>
        </div> */}
        </div>
        
        <p className="text-gray-700 text-center px-4 text-sm">
          {/* {data === 'No result' ? 'Scan a QR code to visit' : <a className='text-blue-500 hover:text-blue-700' href={data} target='blank'>{data}</a>} */}
          {data === 'No result' ? 'Scan a QR code to visit' : data}
        </p>

       
        <button 
          onClick={handleClose}
          className="bg-gray-200 text-gray-700 px-8 py-2 rounded-full text-lg font-semibold hover:bg-gray-300 transition duration-300 shadow-sm w-full max-w-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default QRCodeOf;