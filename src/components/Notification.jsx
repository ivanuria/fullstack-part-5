import { useEffect } from 'react'

const Notification = ({ message, level, setNotification }) => {

  let style = {
    display: 'none',
    padding: '1rem',
    marginBlock: '1rem',
    width: 'fit-content',
    border: '1px solid currentcolor',
    color: 'black',
    borderRadius: '.5rem'
  }

  if (level == 'info' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'green'
    }
  }

  if (level == 'alert' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'orange'
    }
  }

  if (level == 'error' && message !== '') {
    style = {
      ...style,
      display: 'block',
      color: 'red'
    }
  }

  useEffect(() => {
    if (message !== '') {
      setTimeout(() => setNotification({
        message: '',
        level: 'info'
      }), 5000)
    }
  })

  return (
    <div className='notification' data-level={ level } style={ style }>
      { message }
    </div>
  )
}

export default Notification