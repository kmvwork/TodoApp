import PropTypes from 'prop-types'

import Task from '../task'
import { ACTIONS } from '../../lib/filterStatus'

import './taskList.css'

function TaskList({
                    taskData,
                    onToggleStatus,
                    onDeleteItem,
                    onEditingItem,
                    onChangeItem,
                    onKeyPressHandler
                  }) {
  const p = <p className='noItemText'>No item</p>
  const elements = taskData.map((item) => {
    const { status, id, ...itemProps } = item
    let classNames = ''
    let done = false

    if (status === ACTIONS.COMPLETED) {
      classNames += ' completed'
      done = true
    }
    if (status === ACTIONS.EDITING) {
      classNames += ' editing'
    }

    return (
      <li key={id} className={classNames}>
        <Task
          taskData={itemProps}
          onToggleStatus={() => onToggleStatus(id)}
          onDeleteItem={() => onDeleteItem(id)}
          onEditingItem={() => onEditingItem(id)}
          onChangeItem={onChangeItem}
          onKeyPressHandler={onKeyPressHandler}
          done={done}
          id={id}
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
