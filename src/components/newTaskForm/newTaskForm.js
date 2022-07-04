import { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  state = {
    value: ''
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value })
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.setState({
      value: ''
    })
  }

  render() {
    const { onAddItem } = this.props
    const { value } = this.state

    const buttonAdd = value && (
      <input
        onClick={(e) => onAddItem(e, value)}
        type='submit'
        className='btn btn-primary m10'
        value='ADD TASK'
      />
    )

    return (
      <form onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          placeholder='What needs to be done?'
          value={value}
          onChange={this.handleChange}
        />
        {buttonAdd}
      </form>
    )
  }
}

NewTaskForm.propTypes = {
  onAddItem: PropTypes.func.isRequired
}
