import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, FlashlightOff, Camera, X, UploadCloud, Scan, AlertCircle } from 'lucide-react';

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

  // Animation wrapper component
  const AnimatedBorder = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-0 left-0 w-16 h-1 bg-red-500 animate-[scanner-line_4s_ease-in-out_infinite]" />
      <div className="absolute top-0 right-0 w-1 h-16 bg-red-500 animate-[scanner-line_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 right-0 w-16 h-1 bg-red-500 animate-[scanner-line_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-0 w-1 h-16 bg-red-500 animate-[scanner-line_4s_ease-in-out_infinite]" />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-white to-gray-50 relative w-full max-w-xl rounded-3xl shadow-2xl flex flex-col items-center gap-8 p-8">
        {/* Header */}
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-500 w-2 h-8 rounded-full" />
            <h2 className="text-2xl font-bold text-gray-800">QR Scanner</h2>
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200 group"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-gray-600" />
          </button>
        </div>

        {/* Scanner Area */}
        <div className="relative w-full aspect-square max-w-md">
          <div 
            id="reader" 
            ref={qrRef}
            className="w-full h-full bg-black rounded-2xl overflow-hidden shadow-inner"
          >
            {permissionStatus === 'checking' && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-white font-medium">Initializing Camera...</p>
                </div>
              </div>
            )}

            {permissionStatus === 'denied' && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur flex items-center justify-center p-6">
                <div className="flex flex-col items-center gap-6 max-w-sm">
                  <AlertCircle className="w-16 h-16 text-red-500" />
                  <p className="text-white text-center text-lg font-medium">Camera access is required for QR scanning</p>
                  <button 
                    onClick={requestCameraPermission}
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-200"
                  >
                    Enable Camera Access
                  </button>
                </div>
              </div>
            )}

            {isCameraReady && !error && <AnimatedBorder />}

            {error && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur flex items-center justify-center p-6">
                <p className="text-red-400 text-lg text-center max-w-sm font-medium">{error}</p>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
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

          <div className="flex justify-end gap-4">
            <button 
              onClick={toggleFlashLight}
              disabled={!hasFlashlight || !isScannerOpen}
              className={`p-3 rounded-xl transition-all duration-200 ${
                !hasFlashlight || !isScannerOpen 
                  ? 'bg-gray-100 cursor-not-allowed' 
                  : 'hover:bg-red-50 hover:text-red-500'
              }`}
            >
              {flashLight ? <Flashlight className="w-6 h-6" /> : <FlashlightOff className="w-6 h-6" />}
            </button>

            {cameras.length > 1 && (
              <button
                onClick={switchCamera}
                className="p-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all duration-200"
              >
                <Camera className="w-6 h-6" />
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

        <button 
          onClick={handleClose}
          className="w-full max-w-sm bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl font-medium
            hover:from-red-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-200
            shadow-lg hover:shadow-xl"
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
}

export default TQRCodeOf;