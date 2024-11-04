import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, UploadCloud, Scan, FlashlightOff, Camera } from 'lucide-react';

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
          fps: 30,
          qrbox: { width: 280, height: 280 },
          aspectRatio: 1,
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
            fps: 30,
            qrbox: { width: 280, height: 280 },
            aspectRatio: 1,
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
        
        <div id="reader" ref={qrRef} className="w-full aspect-square bg-gray-50 rounded-[16px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {permissionStatus === 'checking' && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90 backdrop-blur-sm">
              <div className="animate-pulse text-gray-500 font-medium flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                Checking camera permission...
              </div>
            </div>
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
            <div className="absolute top-4 left-4 bg-emerald-500/10 text-emerald-600 px-4 py-1.5 rounded-full text-sm font-medium">
              Scanner Active
            </div>
          )}
          {permissionStatus === 'granted' && !error && !isCameraReady && (
            <div className="text-amber-500 animate-pulse font-medium flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              Initializing camera...
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-4">
              <p className="text-red-500 text-center font-semibold max-w-[320px]">{error}</p>
            </div>
          )}
        </div>
        
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-2">
        <div className="relative group">
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-full bg-gray-50 hover:bg-gray-100 rounded-xl p-4 flex items-center gap-4 border-2 border-dashed border-gray-200 group-hover:border-red-500 transition-all duration-200">
              <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-red-500" />
              <div>
                <p className="font-medium text-gray-700">Upload QR Image</p>
                <p className="text-sm text-gray-500">Click or drag and drop</p>
              </div>
            </div>
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
        
        {/* Status */}
        <div className="w-full bg-gray-50 rounded-xl p-4 flex items-center gap-3 border border-gray-200">
          <Scan className={`w-5 h-5 ${data === 'No result' ? 'text-gray-400' : 'text-red-500'}`} />
          <p className="flex-1 text-gray-600 text-sm">
            {data === 'No result' 
              ? 'Position QR code within the frame to scan' 
              : <a href={data} className="text-red-500 hover:text-red-600 font-medium break-all">{data}</a>
            }
          </p>
        </div>

        {/* <button 
          onClick={handleClose}
          className="bg-[#f9f5f5] text-gray-700 px-8 py-3.5 rounded-full text-[17px] font-semibold hover:bg-[#f5eeee] active:bg-[#f0e9e9] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 w-full max-w-[320px]"
        >
          Close
        </button> */}
      </div>
    </div>
  );
}

export default TQRCodeOf;