import { configureStore, ThunkAction, Action, combineReducers, bindActionCreators } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import bagReducer from '../features/bag/bagSlice';
import playersReducer from '../features/player/playersSlice';
import { findStartWorkingTile, getDirection, isValidPlacement, isValidWordSet, scoreWords, SquareState } from '../features/board/engine';


const combinedReducer = combineReducers({
  board: boardReducer,
  bag: bagReducer,
  players: playersReducer,
})

type StoreState = ReturnType<typeof combinedReducer>;

function crossSliceReducer(state: StoreState, action:any) {
  switch (action.type) {
    case 'bag/takeTiles': {
      let newstate = JSON.parse(JSON.stringify(state))
      let availableTiles = [...newstate.bag.tiles];
      let pickedTiles = [];
      for (let ii = 0; ii < action.payload.count && availableTiles.length > 0; ++ii)
      {
        let index = Math.floor(Math.random()*newstate.bag.tiles.length);
        let tileValue = availableTiles.splice(index,1);
        pickedTiles.push(tileValue[0]);
      }
      newstate.bag.tiles = availableTiles;
      newstate.players.players[action.payload.player].tiles.push(...pickedTiles)

      return newstate;
      // {
      //   // specifically pass state.b as an additional argument
      //   a: handleSpecialCaseForA(state.a, action, state.b),
      //   b: sliceReducerB(state.b, action)
      // }
    }
    // play word commits the current working tiles to a played word
    case 'board/playWord': {
      const squares = state.board.squares;
      let newstate : StoreState = JSON.parse(JSON.stringify(state))
      let startPlace = findStartWorkingTile(squares);
      let direction = getDirection(squares);
      if (startPlace !== undefined && isValidPlacement(squares) && isValidWordSet(squares, startPlace[0], startPlace[1], direction)) {
        const score = scoreWords(squares, startPlace[0], startPlace[1], direction);
        newstate.players.players[newstate.players.currentPlayer].score += score;
        newstate.board.squares.forEach((value) => {if (value.state === SquareState.Working) { value.state = SquareState.Placed}})
      }
      return newstate;
    }
    case 'board/returnTiles': {
      let newstate : StoreState = JSON.parse(JSON.stringify(state))


      newstate.board.squares.forEach(sq => {
        if (sq.state === SquareState.Working) {
          newstate.players.players[newstate.players.currentPlayer].tiles.push(sq.value);
          sq.value = ' ';
          sq.state = SquareState.Empty;
        }
      })

      return newstate;
    }
    default:
      return state
  }
}

function rootReducer(state : any, action: any) {
  const intermediateState = combinedReducer(state, action)
  const finalState = crossSliceReducer(intermediateState, action)
  return finalState
}


export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
