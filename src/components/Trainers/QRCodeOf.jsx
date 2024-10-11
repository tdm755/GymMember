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
  const streamRef = useRef(null);
  const isMountedRef = useRef(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => {
      clearInterval(timer);
      isMountedRef.current = false;
    };
  }, []);

  const checkCameraPermission = useCallback(async () => {
    if (!isMountedRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
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
    return () => {
      isMountedRef.current = false;
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (scannerRef.current) {
        scannerRef.current.stop().catch(err => console.error("Error stopping QR scanner:", err));
      }
    };
  }, [checkCameraPermission]);

  const requestCameraPermission = async () => {
    if (!isMountedRef.current) return;
    try {
      await checkCameraPermission();
    } catch (error) {
      console.error("Error requesting camera permission:", error);
      setError("Camera permission denied. Please grant permission in your browser settings.");
    }
  };

  const initializeScanner = async () => {
    if (!isMountedRef.current) return;
    if (qrRef.current && !scannerRef.current) {
      try {
        scannerRef.current = new Html5Qrcode("reader");
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length) {
          const cameraId = cameras[cameras.length - 1].id;
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

  const onScanSuccess = useCallback((decodedText, decodedResult) => {
    if (!isMountedRef.current) return;
    setData(decodedText);
    setIsCheckedIn(prevState => !prevState);
    handleNavigateToLink(decodedText);
  }, []);

  const onScanFailure = useCallback((error) => {
    // Silently handle scan failures to avoid flooding the console
  }, []);

  const handleFileUpload = useCallback((event) => {
    if (!isMountedRef.current) return;
    const file = event.target.files[0];
    if (file) {
      const html5QrCode = new Html5Qrcode("reader");
      html5QrCode.scanFile(file, true)
        .then(decodedText => {
          if (isMountedRef.current) {
            setData(decodedText);
            setIsCheckedIn(prevState => !prevState);
          }
        })
        .catch(err => {
          console.error("Error scanning file:", err);
          if (isMountedRef.current) {
            setError("Unable to scan the uploaded file. Please try a different image.");
          }
        });
    }
  }, []);

  const handleClose = useCallback(() => {
    setShowQR(false);
    if (scannerRef.current) {
      scannerRef.current.stop().catch(err => console.error("Error stopping QR scanner:", err));
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  }, [setShowQR]);

  const handleNavigateToLink = useCallback((scannedData) => {
    if (!isMountedRef.current) return;
    if (scannedData.includes('youtube.com') || scannedData.includes('youtu.be')) {
      window.open(scannedData, '_blank', 'noopener,noreferrer');
    } else {
      // Non-YouTube link: navigate within the app
      // You can add your navigation logic here
    }
    handleClose();
  }, [navigate, handleClose]);

  const toggleFlashlight = useCallback(async () => {
    if (!isMountedRef.current) return;
    try {
      if (!flashLight) {
        // Turn on the flashlight
        if (!streamRef.current) {
          streamRef.current = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
          });
        }
        const track = streamRef.current.getVideoTracks()[0];
        const capabilities = track.getCapabilities();
        
        if (!('torch' in capabilities)) {
          throw new Error('Flashlight not supported on this device');
        }
        
        await track.applyConstraints({
          advanced: [{ torch: true }]
        });
      } else {
        // Turn off the flashlight
        if (streamRef.current) {
          const track = streamRef.current.getVideoTracks()[0];
          await track.applyConstraints({
            advanced: [{ torch: false }]
          });
          track.stop();
          streamRef.current = null;
        }
      }
      
      setFlashLight(prevState => !prevState);
    } catch (err) {
      console.error('Error accessing flashlight:', err);
      setError(err.message);
    }
  }, [flashLight]);

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
          {permissionStatus === 'granted' && !error && (
            <p className="text-gray-500">QR Scanner is active</p>
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
      <button onClick={toggleFlashlight} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors">
        {flashLight ? <FlashlightOff strokeWidth={'1px'} size={'32px'} /> : <Flashlight strokeWidth={'1px'} size={'32px'} />}
      </button>
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