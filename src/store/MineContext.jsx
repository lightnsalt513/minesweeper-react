import React from 'react'

export const StateContext = React.createContext()
export const DispatchContext = React.createContext()

export const MineContext = ({ state, dispatch, children }) => {
  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </StateContext.Provider>
  )
}
