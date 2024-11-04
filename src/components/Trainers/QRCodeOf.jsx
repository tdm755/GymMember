import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, UploadCloud, Scan, FlashlightOff, Camera, AlertCircle, CheckCircle2 } from 'lucide-react';

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
        
        <div className="w-full max-w-xl mx-auto">
      <div className="relative w-full aspect-square rounded-2xl overflow-hidden">
        {/* Base QR Reader - Camera Feed */}
        <div 
          id="reader" 
          ref={qrRef} 
          className="absolute inset-0 w-full h-full bg-transparent"
        />

        {/* Scanning Line Animation */}
        {permissionStatus === 'granted' && !error && isCameraReady && (
          <div 
            className="absolute left-8 right-8 h-1 bg-gradient-to-r from-transparent via-[green] to-transparent animate-scan pointer-events-none"
            style={{
              boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
              animation: 'scan 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}
          />
        )}
        
        {/* Corner Markers */}
        <div className="absolute top-6 left-6 w-8 h-8 border-t-4 border-l-4 border-[green] rounded-tl-lg pointer-events-none"></div>
        <div className="absolute top-6 right-6 w-8 h-8 border-t-4 border-r-4 border-[green] rounded-tr-lg pointer-events-none"></div>
        <div className="absolute bottom-6 left-6 w-8 h-8 border-b-4 border-l-4 border-[green] rounded-bl-lg pointer-events-none"></div>
        <div className="absolute bottom-6 right-6 w-8 h-8 border-b-4 border-r-4 border-[green] rounded-br-lg pointer-events-none"></div>

        {/* Status Overlays */}
        {(permissionStatus !== 'granted' || error) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {permissionStatus === 'checking' && (
              <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center">
                <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-gray-600 font-medium">Checking camera access...</p>
              </div>
            )}

            {permissionStatus === 'denied' && (
              <div className="bg-white/90 p-8 rounded-xl shadow-lg text-center max-w-sm">
                <div className="mb-4">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Access Required</h3>
                <p className="text-gray-600 mb-6">Please allow camera access to scan QR codes</p>
                <button 
                  onClick={requestCameraPermission}
                  className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 font-medium w-full"
                >
                  Enable Camera
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  If the button doesn't work, please enable camera access in your browser settings
                </p>
              </div>
            )}

            {error && (
              <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center max-w-sm">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            )}
          </div>
        )}

        {/* Status Badge */}
        {/* {permissionStatus === 'granted' && !error && (
          <div className="absolute top-4 left-4 pointer-events-none">
            {isCameraReady ? (
              <div className="bg-emerald-500/10 text-emerald-600 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                <CheckCircle2 className="w-4 h-4" />
                Scanner Active
              </div>
            ) : (
              <div className="bg-amber-500/10 text-amber-600 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 backdrop-blur-sm">
                <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                Initializing...
              </div>
            )}
          </div>
        )} */}
      </div>
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