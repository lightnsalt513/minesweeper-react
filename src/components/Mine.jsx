import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { MINE_IDENTIFIER } from '../constants'
import { ACTION_TYPES } from '../store/MineReducer'
import { DispatchContext } from '../store/MineContext'

const CONTENT_MINE = '💣'
const CONTENT_FLAG = '🚩'

const Mine = ({ data }) => {
  const { isFlagged, isOpen, value, row, col } = data
  const [content, setContent] = useState('')
  const dispatch = useContext(DispatchContext)

  useEffect(() => {
    if (isFlagged) {
      setContent(CONTENT_FLAG)
    } else {
      setContent('')
    }
  }, [isFlagged])

  useEffect(() => {
    if (isOpen) {
      if (value === 0) return setContent('')
      if (value === MINE_IDENTIFIER) return setContent(CONTENT_MINE)
      setContent(value)
    }
  }, [isOpen])

  const onClickMine = (e) => {
    e.preventDefault()
    if (isFlagged || isOpen) return

    dispatch({ type: ACTION_TYPES.SET_OPEN, payload: [row, col] })
    if (value === MINE_IDENTIFIER) {
      dispatch({ type: ACTION_TYPES.GAMEOVER })
    } else if (value === 0) {
      dispatch({ type: ACTION_TYPES.OPEN_NEARBY_MINES_ON, payload: [row, col] })
    }
  }

  const onRightClickMine = (e) => {
    e.preventDefault()
    if (isOpen) return
    dispatch({ type: ACTION_TYPES.TOGGLE_FLAG, payload: [row, col] })
  }

  return (
    <Container onClick={onClickMine} onContextMenu={onRightClickMine} isOpen={isOpen}>
      {content}
    </Container>
  )
}

const Container = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid #aaa;
  background: ${(props) => (props.isOpen ? '#ddd' : '#f1f1f1')};
`

export default React.memo(Mine)
