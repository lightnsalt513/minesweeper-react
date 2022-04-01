import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Timer from './Timer'
import Mine from './Mine'
import RecordList from './RecordList'
import { createMineMap, nearbyMinesToOpen } from '../utils'
import { TOTAL_MINES, MINE_LENGTH, MINE_IDENTIFIER } from '../constants'
import { ACTION_TYPES, useMineReducer } from '../store/MineReducer'
import { MineContext } from '../store/MineContext'

const App = () => {
  const [state, dispatch] = useMineReducer()
  const [timestamp, setTimestamp] = useState(Date.now())

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.GET_SCORES })
    dispatch({
      type: ACTION_TYPES.INIT_MINE,
      payload: generateMineMap(),
    })
  }, [])

  useEffect(() => {
    if (state.cellsLeft === 0) {
      dispatch({ type: ACTION_TYPES.GAME_COMPLETED })
    }
  }, [state.cellsLeft])

  useEffect(() => {
    if (state.openingNearby.length) {
      const row = state.openingNearby[0]
      const col = state.openingNearby[1]
      const minesToOpen = nearbyMinesToOpen(state.mineMap, row, col, MINE_IDENTIFIER)
      for (let location of minesToOpen) {
        dispatch({ type: ACTION_TYPES.SET_OPEN, payload: [location[0], location[1]] })
      }
      dispatch({ type: ACTION_TYPES.OPEN_NEARBY_MINES_OFF })
    }
  }, [state.openingNearby])

  const generateMineMap = () => {
    return createMineMap(TOTAL_MINES, MINE_LENGTH, MINE_IDENTIFIER)
  }

  const handleReset = (e) => {
    e.preventDefault()
    setTimestamp(Date.now())
    dispatch({ type: ACTION_TYPES.RESET })
    dispatch({
      type: ACTION_TYPES.INIT_MINE,
      payload: generateMineMap(),
    })
  }

  const renderMine = () => {
    return state.mineMap.map((row, rowIdx) => {
      return (
        <MineRow key={timestamp + rowIdx}>
          {row.map((cell, idx) => (
            <Mine key={timestamp + rowIdx + idx} data={cell} />
          ))}
        </MineRow>
      )
    })
  }

  return (
    <MineContext state={state} dispatch={dispatch}>
      <Container>
        <Title>MineSweeper Game</Title>
        <GameArea>
          <TopPanel>
            <Count>{state.mineCount}</Count>
            <ButtonArea>
              <Button onClick={handleReset}>Reset</Button>
            </ButtonArea>
            <Timer />
          </TopPanel>
          <MineArea>
            {state.finished && (
              <Overlay>
                {state.hasWon ? 'Yay! 이겼어요!' : 'Game Over...'} <br />
                다시 시작하려면 <br />
                "RESET"을 눌러주세요.
              </Overlay>
            )}
            {renderMine()}
          </MineArea>
        </GameArea>
        {state.hasWon && <Notice>당신의 타임 스코어는 {state.totalTime} 입니다.</Notice>}
        <RecordList scores={state.scores} />
      </Container>
    </MineContext>
  )
}

const Container = styled.section`
  min-width: 400px;
  padding: 30px 20px;
  text-align: center;
  box-sizing: border-box;
`

const Title = styled.h1`
  font-size: 40px;
`

const GameArea = styled.div`
  display: inline-block;
  margin: 60px 0 20px;
  border: 1px solid #333;
  text-align: left;
`

const TopPanel = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 10px;
  background: #333;
  color: #fff;

  & > * {
    flex: 1;
  }
`

const Count = styled.div`
  font-weight: bold;
`

const ButtonArea = styled.div`
  text-align: center;
`

const Button = styled.button`
  display: inline-block;
  padding: 8px 16px;
  border: 0;
  text-transform: uppercase;
  cursor: pointer;
`

const MineArea = styled.div`
  position: relative;
`

const MineRow = styled.div`
  display: flex;
`

const Overlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 18px;
  background: rgba(0, 0, 0, 0.65);
  color: #fff;
  font-size: 16px;
  text-align: center;
  line-height: 1.8;
  box-sizing: border-box;
`

const Notice = styled.div`
  max-width: 500px;
  padding: 10px;
  margin: 0 auto;
  background: #ffecd5;
  box-sizing: border-box;
`

export default App
