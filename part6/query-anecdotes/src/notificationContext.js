import { createContext, useContext, useReducer } from "react";

const initialState = {
  text: null,
  type: undefined
}

const notificationReducer = (state, action) => {
  switch(action.type) {
    case 'SET': return action.payload
    case 'RESET': return initialState
    default: return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, initialState)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  return useContext(NotificationContext)[0]
}

export const useNotificationDispatch = () => {
  return useContext(NotificationContext)[1]
}

export const useShowNotification = (timeout) => {
  // The dispatcher has to be stored in the outer function
  // because the inner one is called outside of a render function
  const dispatch = useNotificationDispatch()

  return (text, type) => {
    dispatch({
      type: 'SET',
      payload: {
        text,
        type: type || 'info'
      }
    })
    setTimeout(() => dispatch({ type: 'RESET' }), timeout)
  }
}