import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, FlashlightOff } from 'lucide-react';

function TQRCodeOf({setShowQR}) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('checking');
  const qrRef = useRef(null);
  const scannerRef = useRef(null);
  const [flashLight, setFlashLight] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const checkCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      setIsCameraReady(true);
      initializeScanner();
    } catch (error) {
      console.error("Camera permission not granted or camera not accessible:", error);
      setPermissionStatus('denied');
      setIsCameraReady(false);
      if (error.name === 'NotAllowedError') {
        setError("Camera permission denied. Please grant permission in your browser settings.");
      } else if (error.name === 'NotFoundError') {
        setError("No camera found on your device. Please ensure a camera is connected and not in use by another application.");
      } else {
        setError("Unable to access the camera. Please check your device settings and try again.");
      }
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
      setError("Unable to request camera permission. Please check your browser settings and try again.");
      setIsCameraReady(false);
    }
  };

  const initializeScanner = async () => {
    if (qrRef.current && !scannerRef.current && isCameraReady) {
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
              experimentalFeatures: {
                useBarCodeDetectorIfSupported: true,
                torch: flashLight
              }
            },
            onScanSuccess,
            onScanFailure
          );
        } else {
          setError("No cameras found on the device.");
          setIsCameraReady(false);
        }
      } catch (err) {
        console.error("Error starting QR scanner:", err);
        setError("Unable to start the QR scanner. Your browser might not support this feature or the camera might be in use by another application.");
        setIsCameraReady(false);
      }
    }
  };

  useEffect(() => {
    if (isCameraReady) {
      initializeScanner();
    }
  }, [isCameraReady]);

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
  }, [navigate, handleClose]);

  const toggleFlashLight = async () => {
    setFlashLight(!flashLight);
    if (scannerRef.current) {
      await scannerRef.current.applyVideoConstraints({
        advanced: [{ torch: !flashLight }]
      });
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center'>
      <div className="bg-white relative w-full max-w-md rounded-2xl flex flex-col items-center gap-6 p-6">
        <button 
          onClick={handleClose} 
          className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center'
        >
          <img className='w-full h-full' src={CrossIcon} alt="Close" />
        </button>
        
        <div id="reader" ref={qrRef} className="min-h-52 my-7 w-[95%] bg-gray-100 flex items-center justify-center">
          {permissionStatus === 'checking' && (
            <p className="text-gray-500">Checking camera permission...</p>
          )}
          {permissionStatus === 'denied' && (
            <div className="text-center">
              <p className="text-red-500 mb-2">Camera access is required for QR scanning.</p>
              <button 
                onClick={requestCameraPermission}
                className="bg-[#de3131] text-white px-4 py-2 rounded-full hover:bg-[#dc2626] transition duration-300"
              >
                Request Camera Permission
              </button>
              <p className="text-sm text-gray-500 mt-2">
                If the button doesn't work, please enable camera access in your browser settings.
              </p>
            </div>
          )}
          {permissionStatus === 'granted' && !error && isCameraReady && (
            <p className="text-gray-500">QR Scanner is active</p>
          )}
          {permissionStatus === 'granted' && !error && !isCameraReady && (
            <p className="text-yellow-500">Camera permission granted, but camera is not ready. Please wait or refresh the page.</p>
          )}
          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </div>
        
        <div className="w-full flex justify-between items-center px-7">
          <div className="">
          <p className="text-sm text-gray-600 mb-2">Or upload a QR code image:</p>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload}
            className="w-full text-sm text-gray-500
              cursor-pointer
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-[#f9f5f5] file:text-[#dc2626]
              hover:file:bg-[#f5eeee]"
          />
          </div>
            <div className="text-center">
              <button onClick={toggleFlashLight}>{flashLight ? <Flashlight strokeWidth={'1px'} size={'32px'} /> : <FlashlightOff strokeWidth={'1px'} size={'32px'} />}</button>
            </div>
        </div>
        
        <p className="text-gray-700 text-center px-4 text-sm">
          {data === 'No result' ? 'Scan a QR code to visit' : <a className='text-blue-500 hover:text-blue-700' href={data}>{data}</a>}
        </p>

       
        <button 
          onClick={handleClose}
          className="bg-[#f9f5f5] text-gray-700 px-8 py-2 rounded-full text-lg font-semibold hover:bg-[#f5eeee] transition duration-300 shadow-sm w-full max-w-xs"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TQRCodeOf;