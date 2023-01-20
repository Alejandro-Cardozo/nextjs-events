import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState(null);

  useEffect(() => {
    if (activeNotification && activeNotification.status !== 'pending') {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData) {
    setActiveNotification(notificationData);
  }

  function hidNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hidNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
