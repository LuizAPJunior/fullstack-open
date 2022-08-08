import { useSelector } from 'react-redux'

const Notification = () => {
  const message = useSelector((state) => state.notification['message'])
  const notifError = useSelector((state) => state.notification['notifError'])
  if (message === null) {
    return null
  }

  const notificationStyle = {
    color: notifError ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div className="notification" style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification
