import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, FlashlightOff, Camera } from 'lucide-react';

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
  const [hasFlashlight, setHasFlashlight] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const checkCameraPermission = useCallback(async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      
      const sortedCameras = [...videoDevices].sort((a, b) => {
        const aLabel = a.label.toLowerCase();
        const bLabel = b.label.toLowerCase();
        if (aLabel.includes('back') || aLabel.includes('rear')) return -1;
        if (bLabel.includes('back') || bLabel.includes('rear')) return 1;
        return 0;
      });

      setCameras(sortedCameras);
      setCurrentCameraIndex(0);

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          deviceId: sortedCameras.length > 0 ? sortedCameras[0].deviceId : undefined
        } 
      });
      
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      setHasFlashlight('torch' in capabilities);
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

  const checkFlashlightCapability = async (deviceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: deviceId }
      });
      const track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities();
      const hasFlash = 'torch' in capabilities;
      stream.getTracks().forEach(track => track.stop());
      return hasFlash;
    } catch (error) {
      console.error("Error checking flashlight capability:", error);
      return false;
    }
  };

  const switchCamera = async () => {
    if (cameras.length < 2) return;
    
    if (scannerRef.current) {
      await scannerRef.current.stop();
      setIsScannerOpen(false);
    }

    const nextCameraIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextCameraIndex);

    const hasFlash = await checkFlashlightCapability(cameras[nextCameraIndex].deviceId);
    setHasFlashlight(hasFlash);
    if (!hasFlash) setFlashLight(false);

    try {
      scannerRef.current = new Html5Qrcode("reader");
      await scannerRef.current.start(
        cameras[nextCameraIndex].deviceId,
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
    } catch (err) {
      console.error("Error switching camera:", err);
      setError("Failed to switch camera. Please try again.");
    }
  };

  const initializeScanner = async () => {
    if (qrRef.current && !scannerRef.current && isCameraReady && cameras.length > 0) {
      try {
        scannerRef.current = new Html5Qrcode("reader");
        await scannerRef.current.start(
          cameras[currentCameraIndex].deviceId,
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
      } catch (err) {
        console.error("Error starting QR scanner:", err);
        setError("Unable to start the QR scanner. Your browser might not support this feature or the camera might be in use by another application.");
        setIsCameraReady(false);
      }
    }
  };

  useEffect(() => {
    if (isCameraReady && cameras.length > 0) {
      initializeScanner();
    }
  }, [isCameraReady, cameras]);

  const onScanSuccess = (decodedText, decodedResult) => {
    setData(decodedText);
    setIsCheckedIn(!isCheckedIn);
    handleNavigateToLink(decodedText);
  };

  const onScanFailure = (error) => {
    // Silently handle scan failures
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
      // Handle other links
    }
    handleClose();
  }, [navigate, handleClose]);

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
    <div className='fixed inset-0 z-50 bg-black/75 backdrop-blur-[2px] flex items-center justify-center px-4'>
      <div className="bg-white relative w-full max-w-[448px] rounded-[20px] shadow-2xl flex flex-col items-center gap-6 p-8">
        <button 
          onClick={handleClose} 
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:scale-110 transition-transform duration-200'
        >
          <img className='w-full h-full opacity-50 hover:opacity-100 transition-opacity duration-200' src={CrossIcon} alt="Close" />
        </button>
        
        <div id="reader" ref={qrRef} className="w-full aspect-square bg-gray-50 rounded-[16px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-6">
          {permissionStatus === 'checking' && (
            <div className="animate-pulse text-gray-500 font-medium">Checking camera permission...</div>
          )}
          {permissionStatus === 'denied' && (
            <div className="text-center space-y-4 max-w-[320px]">
              <p className="text-red-500 font-semibold">Camera access is required for QR scanning.</p>
              <button 
                onClick={requestCameraPermission}
                className="bg-[#de3131] text-white px-7 py-3 rounded-full hover:bg-[#dc2626] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
              >
                Request Camera Permission
              </button>
              <p className="text-sm text-gray-500 leading-relaxed">
                If the button doesn't work, please enable camera access in your browser settings.
              </p>
            </div>
          )}
          {permissionStatus === 'granted' && !error && isCameraReady && (
            <div className="text-emerald-600 font-semibold">QR Scanner is active</div>
          )}
          {permissionStatus === 'granted' && !error && !isCameraReady && (
            <div className="text-amber-500 animate-pulse font-medium">Camera permission granted, initializing...</div>
          )}
          {error && (
            <p className="text-red-500 text-center font-semibold max-w-[320px]">{error}</p>
          )}
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-700 mb-2.5">Upload QR code image:</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="w-full text-sm text-gray-500
                cursor-pointer
                file:mr-4 file:py-2.5 file:px-6
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-[#f9f5f5] file:text-[#dc2626]
                hover:file:bg-[#f5eeee] file:transition-all
                file:duration-300 file:shadow-sm"
            />
          </div>
          <div className="flex gap-6">
            <button 
              onClick={toggleFlashLight}
              disabled={!hasFlashlight || !isScannerOpen}
              className={`p-2.5 rounded-full transition-all duration-300 ${(!hasFlashlight || !isScannerOpen) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 active:bg-gray-200'}`}
            >
              {flashLight ? 
                <Flashlight strokeWidth={1.5} size={28} className="text-[#dc2626]" /> : 
                <FlashlightOff strokeWidth={1.5} size={28} className={hasFlashlight && isScannerOpen ? "text-gray-600" : "text-gray-400"} />
              }
            </button>
            {cameras.length > 1 && (
              <button
                onClick={switchCamera}
                className="p-2.5 rounded-full hover:bg-gray-100 active:bg-gray-200 transition-all duration-300"
              >
                <Camera strokeWidth={1.5} size={28} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full px-5 py-4 bg-gray-50 rounded-[14px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
          <p className="text-gray-700 text-center text-[15px]">
            {data === 'No result' ? 
              'Scan a QR code to visit' : 
              <a className='text-[#dc2626] hover:text-[#de3131] transition-colors duration-300 break-all font-medium' href={data} target="_blank" rel="noopener noreferrer">{data}</a>
            }
          </p>
        </div>

        <button 
          onClick={handleClose}
          className="bg-[#f9f5f5] text-gray-700 px-8 py-3.5 rounded-full text-[17px] font-semibold hover:bg-[#f5eeee] active:bg-[#f0e9e9] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full max-w-[320px]"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TQRCodeOf;