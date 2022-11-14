import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {nanoid} from 'nanoid'

import Footer from '../footer'
import NewTaskForm from '../newTaskForm'
import TaskList from '../taskList'
import {ACTIONS} from '../../lib/filterStatus'
import {TASKSTATUS} from '../../lib/taskStatus'
import {useEffect, useState} from "react";

const App = () => {
  const [taskData, setTaskData] = useState(() => {
    return localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : []
  })

  const [filter, setFilter] = useState(ACTIONS.ALL)

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(taskData))
  }, [taskData])

  const onToggleStatus = (id) => {
    const newData = taskData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status:
            item.status === TASKSTATUS.COMPLETED
              ? TASKSTATUS.ACTIVE
              : TASKSTATUS.COMPLETED
        }
      }
      return item
    })
    setTaskData(newData)
  }

  const onDeleteItem = (id) => {
    const idx = taskData.findIndex((el) => el.id === id)
    const newArray = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
    setTaskData(newArray)
  }

  const onSetTime = (id, end, min, sec, start) => {
    let mean = {
      minutes: min,
      seconds: sec,
      endDate: end,
      start: start
    }
    const newData = taskData.map(item => {
      if (item.id === id) {
        return {
          ...item,
          minutes: min,
          seconds: sec,
          endDate: end,
          start: start
        }
      }
      return item
    })
    localStorage.setItem(id, JSON.stringify(mean))
    setTaskData(newData)
  }

  const onAddItem = (states) => {
    const {value, minutes, seconds} = states
    const newItem = {
      description: value,
      created: showTimeCreated(),
      status: ACTIONS.ACTIVE,
      id: nanoid(),
      minutes: minutes,
      seconds: seconds,
      start: false,
      edit: false,
      endDate: new Date()
    }
    const newArray = [...taskData, newItem]
    setTaskData(newArray)
  }

// eslint-disable-next-line class-methods-use-this
  const filterItems = (items, filter) => {
    switch (filter) {
      case ACTIONS.ACTIVE:
        return items.filter((item) => item.status === ACTIONS.ACTIVE)
      case ACTIONS.COMPLETED:
        return items.filter((item) => item.status === ACTIONS.COMPLETED)
      default:
        return items
    }
  }

  const onFilterSelect = (filter) => {
    setFilter(filter)
  }

  const onClearCompleted = () => {
    const newArray = taskData.filter((item) => item.status !== TASKSTATUS.COMPLETED)
    setTaskData(newArray)
  }

  const onEditingItem = (id) => {
    let newArray = taskData.map((item) => {
      if (item.id === id) {
        item.edit = true
        return item
      }
      return item
    })
    setTaskData(newArray)
  }

  const onChangeItem = (id, event) => {
    const {value} = event.target
    let newArray = taskData.map((item) => {
      if (item.id === id) {
        item.description = value
        return item
      }
      return item
    })
    setTaskData(newArray)
  }

  const onKeyPressHandler = (id, event) => {
    if (event.code === 'Enter' || event.code === 'Escape') {
      let newArray = taskData.map((item) => {
        if (item.id === id) {
          item.edit = false
          return item
        }
        return item
      })
      setTaskData(newArray)
    }
  }

  const onHandleClickOutside = (id) => {
    let newArray = taskData.map((item) => {
      if (item.id === id) {
        item.edit = false
        return item
      }
      return item
    })
    setTaskData(newArray)
  }

// eslint-disable-next-line class-methods-use-this
  const showTimeCreated = () => formatDistanceToNow(new Date(), {includeSeconds: true})

  const itemsLeft = taskData.filter((item) => item.status !== TASKSTATUS.COMPLETED).length
  const visibleData = filterItems(taskData, filter)

  return (
    <section className='todoapp'>
      <header className='header'>
        <h1>todos</h1>
        <NewTaskForm onAddItem={onAddItem}/>
      </header>
      <section className='main'>
        <TaskList
          taskData={visibleData}
          onToggleStatus={onToggleStatus}
          onDeleteItem={onDeleteItem}
          onEditingItem={onEditingItem}
          onChangeItem={onChangeItem}
          onKeyPressHandler={onKeyPressHandler}
          onHandleClickOutside={onHandleClickOutside}
          onSetTime={onSetTime}
        />
        <Footer
          itemsLeft={itemsLeft}
          filter={filter}
          onFilterSelect={onFilterSelect}
          onClearCompleted={onClearCompleted}
        />
      </section>
    </section>
  )
}

export default App
