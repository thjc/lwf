import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit'
import boardReducer from '../features/board/boardSlice'
import bagReducer from '../features/bag/bagSlice'
import playersReducer from '../features/player/playersSlice'
import serverReducer from '../features/server/serverSlice'
import serverMiddleware from '../features/server/serverMiddleware'
import { findStartWorkingTile, getDirection, isValidPlacement, isValidWordSet, scoreWords, SquareState } from '../features/board/engine'

const combinedReducer = combineReducers({
  board: boardReducer,
  bag: bagReducer,
  players: playersReducer,
  server: serverReducer
})

type StoreState = ReturnType<typeof combinedReducer>

function crossSliceReducer (state: StoreState, action: any) {
  const pickTiles = (newstate: StoreState) => {
    const availableTiles = [...newstate.bag.tiles]
    for (const player in newstate.players.players) {
      const pickedTiles = []
      const count = 7 - newstate.players.players[player].tiles.length
      for (let ii = 0; ii < count && availableTiles.length > 0; ++ii) {
        const index = Math.floor(Math.random() * availableTiles.length)
        const tileValue = availableTiles.splice(index, 1)
        pickedTiles.push(tileValue[0])
      }
      newstate.players.players[player].tiles.push(...pickedTiles)
    }
    newstate.bag.tiles = availableTiles
  }

  switch (action.type) {
    case 'bag/dumpTiles': {
      const newstate = JSON.parse(JSON.stringify(state))

      newstate.bag.tiles.push(...newstate.players.players[state.players.loggedInPlayer].tiles)
      newstate.players.players[state.players.loggedInPlayer].tiles = []

      pickTiles(newstate)

      return newstate
    }

    case 'bag/takeTiles': {
      const newstate = JSON.parse(JSON.stringify(state))

      pickTiles(newstate)

      return newstate
    }
    // play word commits the current working tiles to a played word
    case 'board/playWord': {
      const squares = state.board.squares
      const newstate: StoreState = JSON.parse(JSON.stringify(state))
      const startPlace = findStartWorkingTile(squares)
      const direction = getDirection(squares)
      if (startPlace !== undefined && isValidPlacement(squares) && isValidWordSet(squares, startPlace[0], startPlace[1], direction)) {
        let score = scoreWords(squares, startPlace[0], startPlace[1], direction)
        let letterCount = 0
        newstate.board.squares.forEach((value) => {
          if (value.state === SquareState.Working) {
            value.state = SquareState.Placed;
            value.age = 1;
            letterCount++;
          } else {
            delete value.age;
          }
        })
        if (letterCount === 7) { score += 50 }
        newstate.players.players[newstate.players.currentPlayer].score += score
      }
      return newstate
    }
    case 'board/returnTiles': {
      const newstate: StoreState = JSON.parse(JSON.stringify(state))

      newstate.board.squares.forEach(sq => {
        if (sq.state === SquareState.Working) {
          newstate.players.players[newstate.players.currentPlayer].tiles.push(sq.value)
          sq.value = ' '
          sq.state = SquareState.Empty
        }
      })

      return newstate
    }
    case 'board/loadGame': {
      // clear out username we recieved with the game state so we reset to current user
      action.payload.players.username = ''
      action.payload.players.loggedInPlayer = -1
      if (!action.payload.server.sequence) {
        action.payload.server.sequence = 0
      }
      action.payload.server.isConnected = state.server.isConnected
      action.payload.server.isEstablishingConnection = state.server.isEstablishingConnection
      action.payload.server.subscribedGame = state.server.subscribedGame

      return action.payload
    }
    default:
      return state
  }
}

function rootReducer (state: any, action: any) {
  const intermediateState = combinedReducer(state, action)
  const finalState = crossSliceReducer(intermediateState, action)
  return finalState
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverMiddleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>
