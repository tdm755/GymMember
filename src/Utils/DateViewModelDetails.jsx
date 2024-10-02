import React from 'react';
import { X } from 'lucide-react';

const GymSessionModal = ({ isOpen, onClose, date, sessions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex ml-72 items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
        <div className="text-[#dc2626] bg-[#f5eeee] p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Sessions for {date}</h2>
          <button onClick={onClose} className="text-[#e25656] hover:text-[#dc2626]">
            <X size={24} />
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {sessions.map((session, index) => (
            <div key={index} className="mb-6 last:mb-0 border-b pb-4 last:border-b-0">
              <h3 className="font-semibold text-lg">{session.userName}</h3>
              <p className="text-sm text-gray-600">Body Part: {session.bodyPart}</p>
              <p className="text-sm text-gray-600">Time: {session.time}</p>
              <p className="text-sm text-gray-600">Trainer: {session.trainer}</p>
              <p className="text-sm text-gray-600">Duration: {session.duration} minutes</p>
            </div>
          ))}
        </div>
        {sessions.length === 0 && (
          <p className="text-center py-4 text-gray-500">No sessions scheduled for this date.</p>
        )}
      </div>
    </div>
  );
};

export default GymSessionModal;