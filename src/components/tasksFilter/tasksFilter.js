import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

function TasksFilter({ filter, onFilterSelect }) {
  const buttonsData = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = buttonsData.map(({ name, label }) => {
    const active = filter === name;
    const classNames = active ? ' selected' : '';

    return (
      <li key={nanoid()}>
        <button type="button" className={classNames} onClick={() => onFilterSelect(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

export default TasksFilter;

TasksFilter.defaultProps = {
  filter: 'all',
};

TasksFilter.propTypes = {
  filter: PropTypes.string,
  onFilterSelect: PropTypes.func,
};
