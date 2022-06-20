import {Component} from "react";

export default class NewTaskForm extends Component {
    state = {
        value: '',
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    onSubmit = (event) => {
        event.preventDefault()
        this.setState(({
            value: ''
        }))
    }

    render() {
        const {onAddItem} = this.props
        const {value} = this.state

        const buttonAdd = value ? <input
            onClick={(e) => onAddItem(e, value)}
            type="submit"
            className="btn btn-primary m10"
            value='ADD TASK'/> : null

        return (
            <>
                <form onSubmit={this.onSubmit}>
                    <input
                        className="new-todo"
                        placeholder="What needs to be done?"
                        value={value}
                        onChange={this.handleChange}
                        autoFocus
                    />
                    {buttonAdd}
                </form>
            </>
        )
    }
}

