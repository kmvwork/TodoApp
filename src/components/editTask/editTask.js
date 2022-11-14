import React, {useEffect, useRef} from 'react'
import './editTask.css'

const EditTask = ({description, onChangeItem, onKeyPressHandler, id, onHandleClickOutside}) => {
  const myRef = useRef()

  useEffect(() => {
    focusTextInput()
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const focusTextInput = () => {
    myRef.current.focus()
    myRef.current.select()
  }

  const handleClickOutside = (event) => {
    if (myRef.current && !myRef.current.contains(event.target)) {
      onHandleClickOutside(id)
    }
  }

  return (
    <input
      ref={myRef}
      type='text'
      className='edit'
      value={description}
      onChange={(event) => onChangeItem(id, event)}
      onKeyDown={(event) => onKeyPressHandler(id, event)}
    />
  )
}

export default EditTask
