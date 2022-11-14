import PropTypes from 'prop-types'

import Task from '../task'

import './taskList.css'

function TaskList({
                    taskData,
                    onToggleStatus,
                    onDeleteItem,
                    onEditingItem,
                    onChangeItem,
                    onKeyPressHandler,
                    onChangeTime,
                    onHandleClickOutside,
                    onSetTime
                  }) {
  const p = <p className='noItemText'>No item</p>

  const elements = taskData.map((item) => {
    const {status, id, edit, start, endDate, ...itemProps} = item
    return (

      <li key={id} className={status}>
        <Task
          itemProps={itemProps}
          onToggleStatus={() => onToggleStatus(id)}
          onDeleteItem={() => onDeleteItem(id)}
          onEditingItem={() => onEditingItem(id)}
          onChangeItem={onChangeItem}
          onKeyPressHandler={onKeyPressHandler}
          onChangeTime={onChangeTime}
          onHandleClickOutside={onHandleClickOutside}
          onSetTime={onSetTime}
          endDate={endDate}
          id={id}
          status={status}
          edit={edit}
          start={start}
        />
      </li>
    )
  })

  const showElements = taskData.length > 0 ? elements : p

  return (
    <ul className='todo-list'>{showElements}</ul>
  )
}

export default TaskList

TaskList.defaultProps = {
  taskData: []
}

TaskList.propTypes = {
  taskData: PropTypes.arrayOf(PropTypes.object),
  onToggleStatus: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditingItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onKeyPressHandler: PropTypes.func
}
