import { Component } from 'react'

class CountDownTimer extends Component {
  state = {
    id: this.props.id,
    minutes: this.props.mins,
    seconds: this.props.secs,
    start: this.props.start,
    end: false,
    startDate: new Date(),
    endDate: new Date(this.props.endDate)
  }

  componentDidMount() {
    if (this.props.start && this.state.startDate !== this.state.endDate) {
      let secondsSpend = Math.floor((new Date() - this.state.endDate) / 1000)
      let minutesSpend = Math.floor(secondsSpend / 60) % 60

      let m = this.state.minutes - minutesSpend
      let s = this.state.seconds - secondsSpend

      let endS = 0
      if (m <= 0) {
        m = 0
      }

      if (s <= 0) {
        endS = 60 - Math.abs(s)
        if (m <= 0) {
          m = 0
          endS = 0
        } else {
          m = m - 1
        }
      } else {
        endS = s
      }

      this.setState(() => ({
        minutes: m,
        seconds: endS
      }))
      this.setLocalStorageValue(this.state)
      this.startTimer()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    this.setLocalStorageValue(this.state)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState !== this.state) {
      this.setLocalStorageValue(this.state)
      this.props.onSetTime(this.props.id, new Date(), this.state.minutes, this.state.seconds, this.state.start)
    }
  }

  startTimer = () => {
      this.setState(() => ({ start: true }))
    this.timerId = setInterval(() => {
      if (this.state.minutes == 0 && this.state.seconds == 0) {
        clearTimeout(this.timerId)
        this.setState(() => {
          return { end: true, start: false }
        })

      } else if (this.state.minutes == 0) {
        this.setState(({ seconds }) => {
          return {
            minutes: 0,
            seconds: seconds - 1
          }
        })
      } else if (this.state.seconds == 0) {
        this.setState(({ minutes }) => {
          return {
            minutes: minutes - 1,
            seconds: 59
          }
        })
      } else {
        this.setState(({ seconds }) => {
          return {
            seconds: seconds - 1
          }
        })
      }
    }, 1000)
  }

  stopTimer = () => {
    this.setState(() => {
      return { start: false }
    })
    clearInterval(this.timerId)
  }

  setLocalStorageValue = (value) => {
    localStorage.setItem((this.state.id).toString(), JSON.stringify(value))
  }

  getLocalStorage = (id) => {
    return JSON.parse(localStorage.getItem(id))
  }

  getLocalStorageValue = (value) => {
    return this.getLocalStorage(this.state.id)[value]
  }

  render() {
    const { minutes, seconds, timeUp } = this.state

    return (
      <>
        {
          <>
            <button
              disabled={this.state.start}
              className='icon icon-play'
              onClick={() => this.startTimer()}
            >
            </button>
            <button
              disabled={!this.state.start}
              className='icon icon-pause'
              onClick={() => this.stopTimer()}
            >
            </button>
            {
              timeUp ?
                <span>00:00</span>
                :
                <span>{`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} `}</span>
            }
          </>
        }
      </>
    )
  }
}

export default CountDownTimer