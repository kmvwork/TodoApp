import React, {useEffect, useState} from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'
import {nanoid} from 'nanoid'
import CountDownTimer from '../countDownTimer/countDownTimer'
import EditTask from '../editTask'

const Task = ({
                itemProps,
                onToggleStatus,
                onDeleteItem,
                onEditingItem,
                onChangeItem,
                onKeyPressHandler,
                onHandleClickOutside,
                onSetTime,
                id,
                status,
                edit,
                start,
                endDate
              }) => {
  const [create, setCreate] = useState('')
  const [data, setData] = useState(new Date())
  const [timerStart, setTimerStart] = useState(false)

  useEffect(() => {
    if (!timerStart) {
      showTimeCreated()
      setTimerStart(true)
      setInterval(() => showTimeCreated(), 10000)
    }
  }, [])

  const showTimeCreated = () => {
    const result = formatDistanceToNow(new Date(data), {
      includeSeconds: true,
      addSuffix: true
    })
    setCreate(result)
  }

  const {description, minutes, seconds} = itemProps
  const checked = status !== 'active'

  return (
    <>
      {edit ?
        <EditTask
          description={description}
          onChangeItem={onChangeItem}
          onKeyPressHandler={onKeyPressHandler}
          onHandleClickOutside={onHandleClickOutside}
          id={id}
        /> :
        <div className='view'>
          <input
            className='toggle'
            type='checkbox'
            onChange={onToggleStatus}
            defaultChecked={checked}
          />
          <label htmlFor={id}>
            <span className='title'>{description}</span>
            <span className='description'>
                <CountDownTimer
                  onSetTime={onSetTime}
                  mins={minutes}
                  secs={seconds}
                  start={start}
                  endDate={endDate}
                  id={id}
                />
            </span>
            <span className='created description'>{`created ${create}`}</span>
          </label>
          <button
            aria-label='Edit'
            type='button'
            className='icon icon-edit'
            onClick={onEditingItem}
          />
          <button
            aria-label='Delete'
            type='button'
            className='icon icon-destroy'
            onClick={onDeleteItem}
          />
        </div>
      }
    </>
  )
}

export default Task

Task.defaultProps = {
  taskData: {},
  done: false,
  id: nanoid()
}

Task.propTypes = {
  taskData: PropTypes.shape({
    description: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.string
  }),
  onToggleStatus: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditingItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onKeyPressHandler: PropTypes.func,
  done: PropTypes.bool,
  id: PropTypes.string
}
