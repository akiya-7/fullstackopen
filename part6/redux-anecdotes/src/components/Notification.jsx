import {useSelector} from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification.visible ? 'block' : 'none',
    marginBottom: 16
  }

  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification