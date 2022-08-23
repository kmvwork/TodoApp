import { Component } from 'react'

import PropTypes from 'prop-types'

export default class Timer extends Component {
  state = {
    mins: this.props.initialMins,
    secs: this.props.initialSecs,
    start: false,
    id: this.props.id
  }

  componentDidMount() {
    if (window.localStorage.getItem(this.props.id) && JSON.parse(window.localStorage.getItem(this.props.id)).start === true) {
      const oldTimeStart = new Date(JSON.parse(window.localStorage.getItem(this.state.id)).timestamp)
      const newTimeStamp = new Date()
      const minStay = +JSON.parse(window.localStorage.getItem(this.state.id)).min
      const secStay = +JSON.parse(window.localStorage.getItem(this.state.id)).sec
      oldTimeStart.setMinutes(oldTimeStart.getMinutes() + minStay)
      oldTimeStart.setSeconds(oldTimeStart.getSeconds() + secStay)

      const futureDay = new Date(oldTimeStart - newTimeStamp)
      const seconds = futureDay.getSeconds()
      const minutes = futureDay.getMinutes()

      this.setState({
        mins: minutes,
        secs: seconds,
        start: true
      })
      this.startTimer()
      this.edit(this.state.mins, this.state.secs, this.state.id, this.state.start)
    }

    if (window.localStorage.getItem(this.props.id) && JSON.parse(window.localStorage.getItem(this.props.id)).start === false) {
      this.setState({
        mins: this.props.initialMins,
        secs: this.props.initialSecs,
        start: false
      })
      this.stopTimer()
      this.edit(this.state.mins, this.state.secs, this.state.id, this.state.start)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.initialMins !== this.state.mins || prevProps.initialSecs !== this.state.secs) {
      this.edit(this.state.mins, this.state.secs, this.state.id, this.state.start)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerInterval)
  }

  startTimer = async () => {
    await this.setState({ start: true })
    if (this.state.start) {
      this.timerInterval = setInterval(() => {
        if (this.state.mins === 0 && this.state.secs === 0) {
          clearInterval(this.timerInterval)
        } else if (this.state.secs == 0) {
          this.setState({ mins: this.state.mins - 1, secs: 59 })
        } else if (this.state.mins == 0) {
          this.setState({ mins: 0, secs: this.state.secs - 1 })
        } else {
          this.setState({ mins: this.state.mins, secs: this.state.secs - 1 })
        }
      }, 1000)
      this.edit(this.state.mins, this.state.secs, this.state.id, true)
    }
  }

  stopTimer = () => {
    clearTimeout(this.timerInterval)
    this.edit(this.state.mins, this.state.secs, this.state.id, false)
  }

  edit = (mins, secs, id, start) => {
    this.props.editTimerMean(mins, secs, id, start)
  }

  render() {
    return (
      <>
        <button
          className='icon icon-play'
          onClick={() => this.startTimer()}
        >
        </button>
        <button
          className='icon icon-pause'
          onClick={() => this.stopTimer()}
        >
        </button>
        {this.state.mins === 0 && this.state.secs === 0 ?
          <span>0:0</span>
          : <> {this.state.mins}:{this.state.secs < 10 ? '0' + this.state.secs : this.state.secs}</>
        }
      </>
    )
  }
}

Timer.defaultProps = {
  initialMins: '0',
  initialSecs: '0'
}

Timer.propTypes = {
  initialMins: PropTypes.string,
  initialSecs: PropTypes.string
}