import React, {Component} from "react";
import {nanoid} from 'nanoid'

import Footer from "../footer";
import NewTaskForm from "../newTaskForm";
import TaskList from "../taskList";


export default class App extends Component {
    state = {
        taskData: [
            {description: 'Completed task', created: 'created 17 seconds ago', status: 'completed', id: nanoid()},
            {description: 'Editing task', created: 'created 5 minutes ago', status: '', id: nanoid()},
            {description: 'Active task', created: 'created 5 minutes ago', status: '', id: nanoid()},
        ]
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

    render() {
        return (
            <section className="todoapp">
                <header className="header">
                    <h1>todos</h1>
                    <NewTaskForm/>
                </header>
                <section className="main">
                    <TaskList
                        taskData={this.state.taskData}
                        onToggleStatus={this.onToggleStatus}
                        onDeleteItem={this.onDeleteItem}
                    />
                    <Footer/>
                </section>
            </section>
        )
    }
}
