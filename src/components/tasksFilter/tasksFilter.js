import {nanoid} from "nanoid";

const TasksFilter = ({filter, onFilterSelect}) => {
    const buttonsData = [
        {name: 'all', label: 'All'},
        {name: 'active', label: 'Active'},
        {name: 'completed', label: 'Completed'}
    ]

    const buttons = buttonsData.map(({name, label}) => {
        const active = filter === name
        const classNames = active ? ' selected' : ''

        return (
            <li key={nanoid()}>
                <button
                    className={classNames}
                    onClick={() => onFilterSelect(name)}
                >
                    {label}
                </button>
            </li>
        )
    })

    return (
        <ul className="filters">
            {buttons}
        </ul>
    )
}

export default TasksFilter