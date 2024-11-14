'use client'
import { useEffect, useState } from 'react';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [acceptedIds, setAcceptedIds] = useState([]);

  useEffect(() => {
    // Fetch notifications
    const fetchNotifications = async () => {
      const res = await fetch('/api/notifications');
      const data = await res.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  const handleAction = async (id, action) => {
    const res = await fetch('/api/acceptRequest', {
      method: 'POST',
      body: JSON.stringify({ id, action }),
    });

    if (res.ok) {
      setAcceptedIds([...acceptedIds, id]);
    }
  };

  return (
    <div>
      {notifications.map(notification => (
        <div key={notification.id}>
          {notification.message}
          {!acceptedIds.includes(notification.id) && (
            <>
              <button onClick={() => handleAction(notification.id, 'accept')}>Accept</button>
              <button onClick={() => handleAction(notification.id, 'deny')}>Deny</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default NotificationsPage;
