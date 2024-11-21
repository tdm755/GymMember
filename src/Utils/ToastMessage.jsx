import React from 'react';
import { toast } from 'react-hot-toast';

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CustomToast = ({title, message, type}) => {
  const getConfig = () => {
    switch(type) {
      case "error":
        return {
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          borderColor: "border-l-red-500",
          titleColor: "text-red-700"
        };
      case "warning":
        return {
          icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
          borderColor: "border-l-amber-500",
          titleColor: "text-amber-700"
        };
      default:
        return {
          icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
          borderColor: "border-l-emerald-500",
          titleColor: "text-emerald-700"
        };
    }
  };

  const showToast = () => {
    toast.custom((t) => (
      <div className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-sm w-[70%] bg-white shadow-2xl rounded-lg pointer-events-auto flex border-l-4 border border-[#dc2626] ${getConfig().borderColor}`}>
        <div className="flex-1 w-0 p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {getConfig().icon}
            </div>
            <div className="ml-3 flex-1">
              <p className={`text-sm font-medium ${getConfig().titleColor}`}>
                {title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
            </div>
          </div>
        </div>
        <div className="flex">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg m-2 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Close</span>
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    ));
  };

  return { showToast };
};

export default CustomToast;