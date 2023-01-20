import { createContext, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState(null);

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
