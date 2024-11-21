import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#dc2626]">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <div 
        onClick={()=>{navigate(-1)}}          
          className="inline-block px-6 py-3 bg-[#dc2626] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Go Back Home
        </div>
      </div>
    </div>
  )
}

export default PageNotFound
