import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#dc2626]">404</h1>
        <h2 className="text-4xl font-semibold text-gray-800 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-4 mb-8">The page you are looking for doesn't exist or has been moved.</p>
        <Link 
          to="/"
          className="inline-block px-6 py-3 bg-[#dc2626] text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
