import PropTypes from 'prop-types'

import TasksFilter from "../tasksFilter";

const Footer = ({filter, itemsLeft, onFilterSelect, onClearCompleted}) => {
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

TasksFilter.defaultProps = {
    itemsLeft: 0,
    filter: 'all',
}

TasksFilter.propTypes = {
    itemsLeft: PropTypes.number,
    filter: PropTypes.string,
    onFilterSelect: PropTypes.func,
    onClearCompleted: PropTypes.func,
}


export default Footer