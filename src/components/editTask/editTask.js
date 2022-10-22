import React, { Component } from 'react'
import './editTask.css'

export default class EditTask extends Component {
  myRef = React.createRef()

  componentDidMount() {
    this.focusTextInput()
    document.addEventListener('mousedown', this.handleClickOutside)

  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  focusTextInput = () => {
    this.myRef.current.focus()
    this.myRef.current.select()
  }

  handleClickOutside = (event) => {
    if (this.myRef.current && !this.myRef.current.contains(event.target)) {
      this.props.onHandleClickOutside(this.props.id)
    }
  }

  render() {
    const { description, onChangeItem, onKeyPressHandler, id } = this.props
    return (
      <input
        ref={this.myRef}
        type='text'
        className='edit'
        value={description}
        onChange={(event) => onChangeItem(id, event)}
        onKeyDown={(event) => onKeyPressHandler(id, event)}
      />
    )
  }
}