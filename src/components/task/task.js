import {Component} from "react";

export default class Task extends Component {

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
        const {description, created} = taskData

        return (
            <>
                <div className="view">
                    <input onChange={onToggleStatus} className="toggle" type="checkbox" defaultChecked={done}/>
                    <label>
                        <span className="description">{description}</span>
                        <span className="created">{created}</span>
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
