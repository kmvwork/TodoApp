import { Component } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';

export default class Task extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    create: '',
  };

  data = new Date();

  timerStart = false;

  componentDidMount() {
    if (!this.timerStart) {
      this.showTimeCreated();
      this.timerStart = true;
    } else {
      this.timerID = setInterval(() => this.showTimeCreated(), 10000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  showTimeCreated = () => {
    const result = formatDistanceToNow(new Date(this.data), {
      includeSeconds: true,
      addSuffix: true,
    });
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      create: result,
    });
  };

  render() {
    const {
      taskData,
      onToggleStatus,
      onDeleteItem,
      done,
      onEditingItem,
      onChangeItem,
      onKeyPressHandler,
      id,
    } = this.props;

    const { description, create } = taskData;

    return (
      <>
        <div className="view">
          <input
            id={id}
            onChange={onToggleStatus}
            className="toggle"
            type="checkbox"
            defaultChecked={done}
          />
          <label htmlFor={id}>
            <span className="description">{description}</span>
            <span className="created">{`created ${create}`}</span>
          </label>
          <button
            aria-label="Edit"
            type="button"
            className="icon icon-edit"
            onClick={() => onEditingItem()}
          />
          <button
            aria-label="Delete"
            type="button"
            className="icon icon-destroy"
            onClick={onDeleteItem}
          />
        </div>
        <input
          type="text"
          className="edit"
          value={description}
          onChange={(event) => onChangeItem(id, event)}
          onKeyDown={(event) => onKeyPressHandler(id, event)}
        />
      </>
    );
  }
}

Task.defaultProps = {
  taskData: {},
  done: false,
  id: nanoid(),
};

Task.propTypes = {
  taskData: PropTypes.shape({
    description: PropTypes.string,
    status: PropTypes.string,
    id: PropTypes.string,
  }),
  onToggleStatus: PropTypes.func,
  onDeleteItem: PropTypes.func,
  onEditingItem: PropTypes.func,
  onChangeItem: PropTypes.func,
  onKeyPressHandler: PropTypes.func,
  done: PropTypes.bool,
  id: PropTypes.string,
};
