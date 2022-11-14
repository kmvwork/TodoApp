import {useEffect, useState} from 'react'

const CountDownTimer = (props) => {
  const [id, setId] = useState(() => {
    return props.id
  })
  const [minutes, setMinutes] = useState(() => {
    return props.mins
  })
  const [seconds, setSeconds] = useState(() => {
    return props.secs
  })
  const [start, setStart] = useState(() => {
    return props.start
  })
  const [end, setEnd] = useState(false)
  const [startDate, setStartDate] = useState(() => {
    return new Date()
  })
  const [endDate, setEndDate] = useState(() => {
    return new Date(props.endDate)
  })

  useEffect(() => {
    if (start && startDate !== endDate) {
      let secondsSpend = Math.floor((new Date() - endDate) / 1000)
      let minutesSpend = Math.floor(secondsSpend / 60) % 60
      let m = minutes - minutesSpend
      let s = seconds - secondsSpend
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
      setMinutes(m)
      setSeconds(endS)
      setStart(true)
    }
  }, [])

  useEffect(() => {
    let interval = null
    if (start) {
      interval = setInterval(() => {
        if (minutes == 0 && seconds == 0) {
          setEnd(true)
          setStart(false)
        } else if (minutes == 0) {
          setSeconds(seconds => seconds - 1)
        } else if (seconds == 0) {
          setMinutes(minutes => minutes - 1)
          setSeconds(59)
        } else {
          setSeconds(seconds => seconds - 1)
        }
      }, 1000)
      props.onSetTime(id, new Date(), minutes, seconds, start)
    }
    return () => {
      clearInterval(interval)
    }
  }, [start, minutes, seconds])

  return (
    <>
      {
        <>
          <button
            disabled={!!start}
            className='icon icon-play'
            onClick={() => setStart(true)}
          >
          </button>
          <button
            disabled={!start}
            className='icon icon-pause'
            onClick={() => setStart(false)}
          >
          </button>
          {
            <span>{`${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')} `}</span>
          }
        </>
      }
    </>
  )
}
export default CountDownTimer