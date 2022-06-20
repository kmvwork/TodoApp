import TasksFilter from "../tasksFilter";

const Footer = ({itemsLeft, filter, onFilterSelect, onClearCompleted}) => {
    return (
        <footer className="footer">
            <span className="todo-count">{itemsLeft} items left</span>
            <TasksFilter
                filter={filter}
                onFilterSelect={onFilterSelect}
            />
            <button
                className="clear-completed"
                onClick={(e) => onClearCompleted(e)}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default Footer