import { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import { StateContext, DispatchContext } from '../store/MineContext'
import { ACTION_TYPES } from '../store/MineReducer'

const Timer = () => {
  const [time, setTime] = useState(0)
  const { started, finished, hasWon } = useContext(StateContext)
  const dispatch = useContext(DispatchContext)
  const timerId = useRef(null)

  useEffect(() => {
    if (started && !timerId.current) {
      timerId.current = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else if (!started) {
      setTime(0)
    }

    return () => {
      clearInterval(timerId.current)
      timerId.current = null
    }
  }, [started])

  useEffect(() => {
    if (finished && timerId.current) {
      clearInterval(timerId.current)
      timerId.current = null
      dispatch({ type: ACTION_TYPES.UPDATE_TIME, payload: time })
      if (hasWon) {
        dispatch({ type: ACTION_TYPES.ADD_SCORE, payload: [time, Date.now()] })
      }
    }
  }, [finished])

  return <Container>{time}</Container>
}

const Container = styled.div`
  font-weight: bold;
  text-align: right;
`

export default Timer
