import { createContext } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: () => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  return (
    <NotificationContext.Provider>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
