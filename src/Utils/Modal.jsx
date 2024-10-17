import React from 'react';

function Modal({ isOpen, onClose, onConfirm, icon, title, message, cancelText, confirmText, size }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 p-6 bg-white rounded-3xl shadow-lg">
        <div className="flex flex-col items-center">
          {icon && (
            <div className="p-4 mb-4 rounded-full bg-[#f4eded]">
              <img src={icon} alt="" className="w-6 h-6" />
            </div>
          )}
          <h2 className={`mb-2 text-${size}xl font-bold text-black`}>{title}</h2>
          <p className="mb-6 text-sm text-center text-black">{message}</p>
          <div className="flex justify-center space-x-4 w-full">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold text-[#dc2626] rounded-md hover:bg-[#f4eded]"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-bold text-white bg-[#ce2626e9] rounded-md hover:bg-[#dc2626]"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;