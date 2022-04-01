const getRandomPosition = (limit) => {
  return Math.floor(Math.random() * limit)
}

export const createMineMap = (totalMines, mineLength, mineSymbol) => {
  let mineCount = totalMines
  let mineMap = []

  for (let i = 0; i < mineLength; i++) {
    mineMap[i] = []
    for (let j = 0; j < mineLength; j++) {
      mineMap[i][j] = { value: 0, isFlagged: false, isOpen: false }
      mineMap[i][j].row = i
      mineMap[i][j].col = j
    }
  }

  while (mineCount) {
    const row = getRandomPosition(mineLength)
    const col = getRandomPosition(mineLength)
    if (mineMap[row][col].value !== mineSymbol) {
      mineMap[row][col].value = mineSymbol
      mineCount--

      function dfs(newRow) {
        if (newRow >= mineLength || newRow > row + 1) return
        if (newRow >= 0) {
          const colStart = col - 1 >= 0 ? col - 1 : 0
          const colEnd = col + 1 < mineLength ? col + 1 : mineLength - 1
          for (let i = colStart; i <= colEnd; i++) {
            if (mineMap[newRow][i].value === mineSymbol) continue
            mineMap[newRow][i].value += 1
          }
        }
        dfs(newRow + 1)
      }
      dfs(row - 1)
    }
  }

  return mineMap
}

export const nearbyMinesToOpen = (mineMap, targetRow, targetCol, mineSymbol) => {
  let positions = []
  let visited = {}

  visited['' + targetRow + targetCol] = true

  function dfs(startRow, endRow, originnCol) {
    if (startRow >= mineMap.length || startRow > endRow) return
    if (startRow >= 0) {
      const colStart = originnCol - 1 >= 0 ? originnCol - 1 : 0
      const colEnd = originnCol + 1 < mineMap.length ? originnCol + 1 : mineMap.length - 1
      for (let i = colStart; i <= colEnd; i++) {
        if (visited?.['' + startRow + i]) continue
        visited['' + startRow + i] = true
        if (
          mineMap[startRow][i].value === mineSymbol ||
          mineMap[startRow][i].isOpen ||
          mineMap[startRow][i].isFlagged
        )
          continue
        positions.push([startRow, i])
        if (mineMap[startRow][i].value === 0) {
          dfs(startRow - 1, startRow + 1, i)
        }
      }
    }
    dfs(startRow + 1, endRow, originnCol)
  }
  dfs(targetRow - 1, targetRow + 1, targetCol)

  return positions
}
