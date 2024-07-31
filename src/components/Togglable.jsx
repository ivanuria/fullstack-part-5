import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ children, buttonLabel }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  if (visible) {
    return (
    <>
    { children }
    <button onClick={toggleVisible} style={ { marginBlock: '1rem' } }>Close</button>
    </>
    )
  }
  return <button onClick={toggleVisible} style={ { marginBlock: '1rem' } }>{buttonLabel}</button>
})

export default Togglable