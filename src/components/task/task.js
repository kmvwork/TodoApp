import {Component} from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import PropTypes from "prop-types";
import {nanoid} from "nanoid";

export default class Task extends Component {
    state = {
        create: ''
    }

    data = new Date()

    timerStart = false

    showTimeCreated = () => {
        let result = formatDistanceToNow(
            new Date(this.data),
            {includeSeconds: true, addSuffix: true}
        )
        this.setState(({create}) => {
            return {
                create: result
            }
        })
    }

    componentDidMount() {
        if (!this.timerStart) {
            this.showTimeCreated()
            this.timerStart = true
        } else {
            this.timerID = setInterval(() => this.showTimeCreated(), 10000)
        }

    }

    componentWillUnmount() {
        clearInterval(this.timerID)
    }


    render() {
        const {
            taskData,
            onToggleStatus,
            onDeleteItem,
            done,
            onEditingItem,
            onChangeItem,
            onKeyPressHandler,
            id
        } = this.props
        const {description} = taskData

        return (
            <>
                <div className="view">
                    <input onChange={onToggleStatus} className="toggle" type="checkbox" defaultChecked={done}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{'created ' + this.state.create}</span>
                    </label>
                    <button
                        className="icon icon-edit"
                        onClick={() => onEditingItem()}
                    >
                    </button>
                    <button
                        className="icon icon-destroy"
                        onClick={onDeleteItem}
                    ></button>
                </div>
                <input
                    type="text"
                    className="edit"
                    value={description}
                    onChange={(event) => onChangeItem(id, event)}
                    onKeyPress={(event) => onKeyPressHandler(id, event)}
                />
            </>
        )
    }
}

Task.defaultProps = {
    taskData: {},
    done: false,
    id: nanoid()
}

Task.propTypes = {
    taskData: PropTypes.object,
    onToggleStatus: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onEditingItem: PropTypes.func,
    onChangeItem: PropTypes.func,
    onKeyPressHandler: PropTypes.func,
    done: PropTypes.bool,
    id: PropTypes.string
}
