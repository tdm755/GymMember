import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, FlashlightOff } from 'lucide-react';

function QRCodeOf({setShowQR}) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [data, setData] = useState('No result');
  const [error, setError] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('checking');
  const qrRef = useRef(null);
  const scannerRef = useRef(null);
  const [flashLight, setFlashLight] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const checkCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment'
        } 
      });
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlashlight('torch' in capabilities);
      stream.getTracks().forEach(track => track.stop());
      setPermissionStatus('granted');
      setIsCameraReady(true);
    } catch (error) {
      console.error("Camera permission not granted:", error);
      setPermissionStatus('denied');
      setIsCameraReady(false);
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
      setIsCameraReady(false);
    }
  };

  const initializeScanner = useCallback(async () => {
    if (qrRef.current && isCameraReady) {
      try {
        if (scannerRef.current) {
          await scannerRef.current.stop();
        }
        scannerRef.current = new Html5Qrcode("reader");
        const cameras = await Html5Qrcode.getCameras();
        if (cameras && cameras.length) {
          const cameraId = cameras[cameras.length - 1].id;
          await scannerRef.current.start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              experimentalFeatures: {
                useBarCodeDetectorIfSupported: true
              }
            },
            onScanSuccess,
            onScanFailure
          );
          setIsScannerOpen(true);
        } else {
          setError("No cameras found on the device.");
          setIsCameraReady(false);
        }
      } catch (err) {
        console.error("Error starting QR scanner:", err);
        setError("Unable to start the QR scanner. Your browser might not support this feature.");
        setIsCameraReady(false);
      }
    }
  }, [isCameraReady]);

  useEffect(() => {
    if (isCameraReady) {
      initializeScanner();
    }
  }, [isCameraReady, initializeScanner]);

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
          handleNavigateToLink(decodedText);
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
      scannerRef.current.stop().catch(err => {
        console.error("Error stopping QR scanner:", err);
      }).finally(() => {
        setShowQR(false);
        setIsScannerOpen(false);
        setFlashLight(false);
      });
    } else {
      setShowQR(false);
    }
  }, [setShowQR]);

  const navigate = useNavigate();
  
  const handleNavigateToLink = useCallback((scannedData) => {
    if (scannedData.includes('youtube.com') || scannedData.includes('youtu.be')) {
      window.open(scannedData, '_blank', 'noopener,noreferrer');
    } else {
      // Handle non-YouTube links as needed
      console.log("Non-YouTube link scanned:", scannedData);
    }
    handleClose();
  }, [handleClose]);

  const toggleFlashLight = useCallback(async () => {
    if (!hasFlashlight || !isScannerOpen || !scannerRef.current) return;
    try {
      const newFlashLightState = !flashLight;
      await scannerRef.current.applyVideoConstraints({
        advanced: [{ torch: newFlashLightState }]
      });
      setFlashLight(newFlashLightState);
    } catch (error) {
      console.error("Error toggling flashlight:", error);
      setError("Unable to toggle flashlight. This feature may not be supported on your device or browser.");
    }
  }, [hasFlashlight, isScannerOpen, flashLight]);

  return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center'>
      <div className="bg-white relative w-full max-w-md rounded-md flex flex-col items-center gap-6 p-6">
        <button 
          onClick={handleClose} 
          className='absolute top-4 right-4 w-7 h-7 flex items-center justify-center'
        >
          <img className='w-full h-full' src={CrossIcon} alt="Close" />
        </button>
        
        <div id="reader" ref={qrRef} className="min-h-40 md:min-h-52 my-7 w-[95%] bg-gray-100 flex items-center justify-center transition-all duration-500 ease-in-out">
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
            <p className="text-yellow-500">Initializing camera... Please wait.</p>
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
              <button 
                onClick={toggleFlashLight}
                disabled={!hasFlashlight || !isScannerOpen}
                className={`${(!hasFlashlight || !isScannerOpen) ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {flashLight ? 
                  <Flashlight strokeWidth={'1px'} size={'32px'} color={(hasFlashlight && isScannerOpen) ? 'currentColor' : 'gray'} /> : 
                  <FlashlightOff strokeWidth={'1px'} size={'32px'} color={(hasFlashlight && isScannerOpen) ? 'currentColor' : 'gray'} />
                }
              </button>
            </div>
        </div>

        <p className="text-gray-700 text-center px-4 text-sm">
          {data === 'No result' ? 'Scan a QR code to visit' : <span className='text-blue-500'>{data}</span>}
        </p>
      </div>
    </div>
  );
}

export default QRCodeOf;