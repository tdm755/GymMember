import React from 'react';

function NotificationCompo({ message }) {
  return (
    <div className="notification-modal">
      <p>{message}</p>
    </div>
  );
}

export default NotificationCompo;
