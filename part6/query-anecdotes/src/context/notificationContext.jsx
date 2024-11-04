import {createContext, useContext, useReducer} from 'react';

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload
    case "RESET_NOTIFICATION":
      return ""
    default:
      return state
  }
}
const NotificationContext = createContext()

export const useNotificationValue = () => {
  const context = useContext(NotificationContext)
  return context[0]
}

export const useNotificationDispatch = () => {
  const context = useContext(NotificationContext)
  return context[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');
  return(
      <NotificationContext.Provider value={[notification, notificationDispatch]}>
        {props.children}
      </NotificationContext.Provider>
  )
}

export default NotificationContext