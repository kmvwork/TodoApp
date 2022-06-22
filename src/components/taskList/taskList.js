import Task from "../task";

const TaskList = ({taskData, onToggleStatus, onDeleteItem, onEditingItem, onChangeItem, onKeyPressHandler}) => {
    const elements = taskData.map(item => {
        const {status, id, ...itemProps} = item
        let classNames = ''
        let done = false

        if (status === 'completed') {
            classNames += ' completed'
            done = true
        }
        if (status === 'editing') {
            classNames += ' editing'
        }

        return (
            <li key={id} className={classNames}>
                <Task
                    taskData={itemProps}
                    onToggleStatus={() => onToggleStatus(id)}
                    onDeleteItem = {() => onDeleteItem(id)}
                    onEditingItem={() => onEditingItem(id)}
                    onChangeItem={onChangeItem}
                    onKeyPressHandler={onKeyPressHandler}
                    done = {done}
                    id={id}
                />
            </li>
        )
    })
    return (
        <ul className='todo-list'>{elements}</ul>
    )
}

export default TaskList