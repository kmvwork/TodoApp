import React, {Component} from "react";
import {nanoid} from 'nanoid'

import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";


export default class App extends Component {
    state = {
        taskData: [
            {description: 'Completed task', created: 'created 17 seconds ago', status: 'completed', id: nanoid()},
            {description: 'Editing task', created: 'created 5 minutes ago', status: 'active', id: nanoid()},
            {description: 'Active task', created: 'created 5 minutes ago', status: 'active', id: nanoid()},
        ],
        filter: 'all'
    }

    onToggleStatus = (id) => {
        this.setState(({taskData}) => {
            const idx = taskData.findIndex(elem => elem.id === id)
            const old = taskData[idx]
            let newItem
            if (old.status === 'completed') {
                newItem = {...old, status: ' '}
            } else {
                newItem = {...old, status: 'completed'}
            }

            const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
            return {
                taskData: newArray
            }
        })
    }

    onDeleteItem = (id) => {
        this.setState(({taskData}) => {
            const idx = taskData.findIndex(el => el.id === id)
            const newArray = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
            return {taskData: newArray}
        })
    }

    onAddItem = (e, description) => {
        e.target.value = ''
        const newItem = {
            description,
            created: '5min ago',
            status: 'active',
            id: nanoid()
        }
        this.setState(({taskData}) => {
            const newArray = [...taskData, newItem]
            return {
                taskData: newArray
            }
        })
    }

    filterItems = (items, filter) => {
        switch (filter) {
            case 'active':
                return items.filter(item => item.status === 'active')
            case 'completed':
                return items.filter(item => item.status === 'completed')
            default:
                return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState(({filter}))
    }

    onClearCompleted = () => {
        this.setState(({taskData}) => {
            const newArray =  taskData.filter(item => item.status !== 'completed')
            return {
                taskData: newArray
            }
        })
    }


    render() {
        const {taskData, filter} = this.state
        const itemsLeft = taskData.filter(item => item.status !== 'completed').length
        const visibleData = this.filterItems(taskData, filter)

        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm onAddItem={this.onAddItem}/>
                </header>
                <section className="main">
                    <TaskList
                        taskData={visibleData}
                        onToggleStatus={this.onToggleStatus}
                        onDeleteItem={this.onDeleteItem}
                    />
                    <Footer
                        itemsLeft={itemsLeft}
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}
                        onClearCompleted={this.onClearCompleted}
                    />
                </section>
            </section>
        )
    }
}
