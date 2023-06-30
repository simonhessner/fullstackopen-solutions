import { useNotificationValue } from "../notificationContext"

const Notification = () => {
  const {text, type} = useNotificationValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: type === 'info' ? 'black' : 'red'
  }

  if (text === null) return null

  return (
    <div style={style}>
      {text}
    </div>
  )
}

export default Notification
