import React from 'react';
import { toast } from 'react-hot-toast';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const CustomToast = ({ title, message, type }) => {
  const getConfig = () => {
    switch (type) {
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
      } w-auto max-w-xs bg-white shadow-2xl rounded-lg pointer-events-auto flex border-l-4 border border-[#f7eded] ${getConfig().borderColor} p-4`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            {getConfig().icon}
          </div>
          <div className="ml-3 flex-1">
            {/* <p className={`text-base font-semibold ${getConfig().titleColor}`}>
              {title}
            </p> */}
            <p className="text-sm text-gray-600">
              {message}
            </p>
          </div>
        </div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-label="Close"
        >
          <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    ));
  };

  return { showToast };
};

export default CustomToast;