import { configureStore, ThunkAction, Action, combineReducers, bindActionCreators } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import bagReducer from '../features/bag/bagSlice';
import handReducer from '../features/hand/handSlice';
import playersReducer from '../features/player/playersSlice';


const combinedReducer = combineReducers({
  board: boardReducer,
  bag: bagReducer,
  hand: handReducer,
  players: playersReducer,
})

function crossSliceReducer(state: any, action:any) {
  console.log(action.type)
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
        console.log(index, tileValue);
      }
      newstate.bag.tiles = availableTiles;
      console.log(pickedTiles)
      newstate.hand.tiles.push(...pickedTiles);
      newstate.players[action.payload.player].tiles.push(...pickedTiles)


      return newstate;
      // {
      //   // specifically pass state.b as an additional argument
      //   a: handleSpecialCaseForA(state.a, action, state.b),
      //   b: sliceReducerB(state.b, action)
      // }
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
