import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const baseStyle = {
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const styles = {
    info: {
      ...baseStyle,
      color: 'green',
    },
    warn: {
      ...baseStyle,
      color: 'yellow',
    },
    error: {
      ...baseStyle,
      color: 'red',
    },
  }

  if (notification === null) {
    return null
  }

  return <div style={styles[notification.type]}>{notification.text}</div>
}

export default Notification
