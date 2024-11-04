import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from "html5-qrcode";
import CrossIcon from '../../../public/assets/CrossIcon.svg';
import { useNavigate } from 'react-router-dom';
import { Flashlight, FlashlightOff, Camera, QrCode } from 'lucide-react';

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
  const [scannerDimensions, setScannerDimensions] = useState({ width: 250, height: 250 });
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        setShowQR(false);
        setIsScannerOpen(false);
        setFlashLight(false);
      }).catch(err => {
        console.error("Error stopping QR scanner:", err);
      });
    } else {
      setShowQR(false);
    }
  }, [setShowQR]);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let scannerSize;
      if (width < 480) {
        scannerSize = Math.min(width - 40, 280);
      } else if (width < 768) {
        scannerSize = 320;
      } else {
        scannerSize = 380;
      }
      setScannerDimensions({ width: scannerSize, height: scannerSize });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

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
          deviceId: sortedCameras.length > 0 ? sortedCameras[0].deviceId : undefined,
          width: scannerDimensions.width,
          height: scannerDimensions.height
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
  }, [scannerDimensions]);

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
    if (qrRef.current && !scannerRef.current && isCameraReady && cameras.length > 0) {
      try {
        const config = {
          fps: 10,
          qrbox: { width: scannerDimensions.width * 0.7, height: scannerDimensions.height * 0.7 },
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          },
          videoConstraints: {
            deviceId: cameras[currentCameraIndex].deviceId,
            width: scannerDimensions.width,
            height: scannerDimensions.height
          }
        };

        scannerRef.current = new Html5Qrcode("reader");
        await scannerRef.current.start(
          cameras[currentCameraIndex].deviceId,
          config,
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

  const onScanSuccess = useCallback((decodedText) => {
    setData(decodedText);
    setIsCheckedIn(!isCheckedIn);
    handleNavigateToLink(decodedText);
  }, [isCheckedIn]);

  const onScanFailure = (error) => {
    // Silent failure handling
  };

  const handleNavigateToLink = useCallback((scannedData) => {
    if (scannedData.includes('youtube.com') || scannedData.includes('youtu.be')) {
      window.open(scannedData, '_blank', 'noopener,noreferrer');
    } else {
      navigate(scannedData);
    }
    handleClose();
  }, [navigate, handleClose]);

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

  const switchCamera = async () => {
    if (cameras.length < 2) return;
    
    if (scannerRef.current) {
      await scannerRef.current.stop();
      setIsScannerOpen(false);
    }

    const nextCameraIndex = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextCameraIndex);

    try {
      const hasFlash = await checkFlashlightCapability(cameras[nextCameraIndex].deviceId);
      setHasFlashlight(hasFlash);
      if (!hasFlash) setFlashLight(false);

      const config = {
        fps: 10,
        qrbox: { width: scannerDimensions.width * 0.7, height: scannerDimensions.height * 0.7 },
        experimentalFeatures: {
          useBarCodeDetectorIfSupported: true
        },
        videoConstraints: {
          deviceId: cameras[nextCameraIndex].deviceId,
          width: scannerDimensions.width,
          height: scannerDimensions.height
        }
      };

      scannerRef.current = new Html5Qrcode("reader");
      await scannerRef.current.start(
        cameras[nextCameraIndex].deviceId,
        config,
        onScanSuccess,
        onScanFailure
      );
      setIsScannerOpen(true);
    } catch (err) {
      console.error("Error switching camera:", err);
      setError("Failed to switch camera. Please try again.");
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

  return (
    <div className='fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4'>
      <div className="bg-white relative w-full max-w-xl rounded-2xl shadow-2xl flex flex-col items-center gap-6 p-4 md:p-8">
        <button 
          onClick={handleClose} 
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors duration-200'
        >
          <img className='w-5 h-5' src={CrossIcon} alt="Close" />
        </button>
        
        <div className="relative w-full flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <QrCode className="w-6 h-6 text-[#dc2626]" />
            QR Scanner
          </h2>
          
          <div 
            id="reader" 
            ref={qrRef} 
            style={{
              width: `${scannerDimensions.width}px`,
              height: `${scannerDimensions.height}px`,
              position: 'relative'
            }}
            className="rounded-lg overflow-hidden bg-gray-900 shadow-inner"
          >
            {/* Scanner overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute inset-0 border-2 border-white/30"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] border-2 border-[#dc2626] rounded-lg">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#dc2626]"></div>
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#dc2626]"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#dc2626]"></div>
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#dc2626]"></div>
              </div>
            </div>

            {/* Status overlays */}
            {permissionStatus === 'checking' && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm z-20">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-[#dc2626] border-t-transparent rounded-full animate-spin"></div>
                  <div className="text-white text-lg">Initializing camera...</div>
                </div>
              </div>
            )}
            
            {permissionStatus === 'denied' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/95 backdrop-blur-sm p-6 z-20">
                <p className="text-red-400 text-lg mb-4 text-center font-medium">Camera access is required</p>
                <button 
                  onClick={requestCameraPermission}
                  className="bg-[#dc2626] text-white px-6 py-3 rounded-lg hover:bg-[#b91c1c] transition duration-300 shadow-lg"
                >
                  Enable Camera Access
                </button>
                <p className="text-gray-400 text-sm mt-4 text-center">
                  Please enable camera access in your browser settings
                </p>
              </div>
            )}
            
            {error && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900/95 backdrop-blur-sm z-20">
                <p className="text-red-400 text-lg text-center px-6">{error}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center px-2">
          <div className="w-full">
            <p className="text-sm text-gray-600 mb-2 font-medium">Upload QR code image:</p>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload}
              className="w-full text-sm text-gray-500
                cursor-pointer
                file:mr-4 file:py-2.5 file:px-5
                file:rounded-full file:border-0
                file:text-sm file:font-medium
                file:bg-[#f9f5f5] file:text-[#dc2626]
                hover:file:bg-[#f5eeee]
                transition-all duration-200"
            />
          </div>
          <div className="flex justify-center md:justify-end gap-6">
            <button 
              onClick={toggleFlashLight}
              disabled={!hasFlashlight || !isScannerOpen}
              className={`p-3 rounded-full hover:bg-gray-100 transition-colors duration-200 
                ${(!hasFlashlight || !isScannerOpen) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {flashLight ? 
                <Flashlight strokeWidth={1.5} size={28} color={(hasFlashlight && isScannerOpen) ? '#dc2626' : 'gray'} /> : 
                <FlashlightOff strokeWidth={1.5} size={28} color={(hasFlashlight && isScannerOpen) ? '#dc2626' : 'gray'} />
              }
            </button>
            {cameras.length > 1 && (
              <button
                onClick={switchCamera}
                className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Camera strokeWidth={1.5} size={28} color="#dc2626" />
              </button>
            )}
          </div>
        </div>
        
        <div className="w-full px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-gray-700 text-center">
            {data === 'No result' ? 
              'Position QR code within the frame to scan' : 
              <a className='text-[#dc2626] hover:text-[#b91c1c] transition-colors duration-200 break-all' href={data}>{data}</a>
            }
          </p>
        </div>

        <button 
          onClick={handleClose}
          className="bg-[#dc2626] text-white px-8 py-3 rounded-lg text-lg font-medium 
            hover:bg-[#b91c1c] active:bg-[#991b1b] transition-all duration-200 
            shadow-md hover:shadow-lg w-full max-w-xs"
        >
          Close Scanner
        </button>
      </div>
    </div>
  );
}

export default TQRCodeOf;