const Task = ({taskData, onToggleStatus, onDeleteItem, done}) => {
    const {description, created} = taskData

    return (
        <>
            <div className="view">
                <input onChange={onToggleStatus} className="toggle" type="checkbox" defaultChecked={done}/>
                <label>
                    <span className="description">{description}</span>
                    <span className="created">{created}</span>
                </label>
                <button className="icon icon-edit"></button>
                <button
                    className="icon icon-destroy"
                    onClick={onDeleteItem}
                ></button>
            </div>
            <input type="text" className="edit" defaultValue="Editing task"/>
        </>
    )
}
export default Task