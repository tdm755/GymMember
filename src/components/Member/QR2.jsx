import React, { useState, useRef } from 'react';

const CameraCapture = () => {
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Camera Capture</h1>
        {!stream && !capturedImage && (
          <button
            onClick={startCamera}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Open Camera
          </button>
        )}
        {stream && (
          <div className="mb-4">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-w-md border border-gray-300 rounded"
            />
            <button
              onClick={captureImage}
              className="mt-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Capture Image
            </button>
          </div>
        )}
        {capturedImage && (
          <div>
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full max-w-md border border-gray-300 rounded"
            />
            <button
              onClick={() => {
                setCapturedImage(null);
                startCamera();
              }}
              className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            >
              Retake
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;