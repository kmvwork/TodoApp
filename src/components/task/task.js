import React from 'react'
import { Component } from 'react'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import PropTypes from 'prop-types'
import { nanoid } from 'nanoid'
import CountDownTimer from '../countDownTimer/countDownTimer'
import EditTask from '../editTask'

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    create: ''
  }
  data = new Date()

  timerStart = false

  componentDidMount() {
    if (!this.timerStart) {
      this.showTimeCreated()
      this.timerStart = true
      setInterval(() => this.showTimeCreated(), 10000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  showTimeCreated = () => {
    const result = formatDistanceToNow(new Date(this.data), {
      includeSeconds: true,
      addSuffix: true
    })
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      create: result
    })
  }

  render() {
    const {
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
      // editTimerMean
    } = this.props

    const { description, minutes, seconds} = itemProps
    const { create } = this.state
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
              {/*<Timer*/}
                {/*  initialMins={minutes}*/}
                {/*  initialSecs={seconds}*/}
                {/*  // editTimerMean={editTimerMean}*/}
                {/*  id={id}*/}
                {/*/>*/}
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
}

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
