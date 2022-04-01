import { useReducer } from 'react'
import { TOTAL_MINES, MINE_LENGTH } from '../constants'

export const ACTION_TYPES = {
  GET_SCORES: 'getScores',
  ADD_SCORE: 'addScore',
  INIT_MINE: 'initializeMine',
  GAMEOVER: 'gameOver',
  GAME_COMPLETED: 'gameCompleted',
  UPDATE_TIME: 'updateTime',
  SET_OPEN: 'setOpen',
  TOGGLE_FLAG: 'toggleFlag',
  OPEN_NEARBY_MINES_ON: 'openNearbyMinesOn',
  OPEN_NEARBY_MINES_OFF: 'openNearbyMinesOff',
  RESET: 'reset',
}

const STORAGE_NAME = 'minesweeper'

const inititalState = {
  started: false,
  finished: false,
  hasWon: false,
  mineCount: TOTAL_MINES,
  mineMap: [],
  cellsLeft: MINE_LENGTH * MINE_LENGTH,
  totalTime: 0,
  scores: [],
  openingNearby: [],
}

const fetchScores = () => {
  return JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || []
}

const addScore = (scores, score) => {
  let newScores = [...scores, score].sort((a, b) => a[0] - b[0]).slice(0, 10)
  window.localStorage.setItem(STORAGE_NAME, JSON.stringify(newScores))
  return newScores
}

const reducer = (state, action) => {
  let row, col, newCellsLeft, scores

  switch (action.type) {
    case ACTION_TYPES.GET_SCORES:
      scores = fetchScores()
      return { ...state, scores }

    case ACTION_TYPES.ADD_SCORE:
      scores = addScore(state.scores, action.payload)
      return { ...state, scores }

    case ACTION_TYPES.GAMEOVER:
      return { ...state, finished: true, hasWon: false }

    case ACTION_TYPES.GAME_COMPLETED:
      return { ...state, finished: true, hasWon: true }

    case ACTION_TYPES.INIT_MINE:
      return { ...state, mineMap: action.payload }

    case ACTION_TYPES.UPDATE_TIME:
      return { ...state, totalTime: action.payload }

    case ACTION_TYPES.OPEN_NEARBY_MINES_ON:
      return { ...state, openingNearby: [action.payload[0], action.payload[1]] }

    case ACTION_TYPES.OPEN_NEARBY_MINES_OFF:
      return { ...state, openingNearby: [] }

    case ACTION_TYPES.SET_OPEN:
      newCellsLeft = state.cellsLeft - 1
      row = action.payload[0]
      col = action.payload[1]

      if (state.mineMap[row][col].isFlagged || state.mineMap[row][col].isOpen) return state

      return {
        ...state,
        started: true,
        cellsLeft: newCellsLeft,
        mineMap: state.mineMap.map((arr, rowIdx) => {
          if (rowIdx !== row) return arr
          return arr.map((item, colIdx) => {
            if (rowIdx === row && colIdx === col) {
              let newItem = { ...item, isOpen: true }
              return newItem
            }
            return item
          })
        }),
      }

    case ACTION_TYPES.TOGGLE_FLAG:
      let newCount = state.mineCount
      newCellsLeft = state.cellsLeft
      row = action.payload[0]
      col = action.payload[1]

      if (state.mineMap[row][col].isFlagged) {
        newCount++
        newCellsLeft++
      } else {
        if (state.mineCount === 0) return state
        newCount--
        newCellsLeft--
      }

      return {
        ...state,
        mineCount: newCount,
        cellsLeft: newCellsLeft,
        mineMap: state.mineMap.map((arr, rowIdx) => {
          if (rowIdx !== row) return arr
          return arr.map((item, colIdx) => {
            if (rowIdx === row && colIdx === col) {
              let newItem = { ...item }
              newItem.isFlagged = !newItem.isFlagged
              return newItem
            }
            return item
          })
        }),
      }

    case ACTION_TYPES.RESET:
      let newState = { ...inititalState, scores: state.scores }
      return { ...state, ...newState }

    default:
      return state
  }
}

export const useMineReducer = () => {
  return useReducer(reducer, inititalState)
}
