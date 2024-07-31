import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef(({ children, buttonLabel, reverse=false }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisible
    }
  })

  const renderChildren = () => {
    const toRender = [children, <button key='close-button' onClick={ toggleVisible } style={ { marginBlock: '1rem' } }>Close</button>]
    return reverse ? toRender.reverse() : toRender
  }

  if (visible) {
    return renderChildren()
  }
  return <button onClick={ toggleVisible } style={ { marginBlock: '1rem' } }>{buttonLabel}</button>
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable