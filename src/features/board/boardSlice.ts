import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BoardState, boardSize, SquareState } from './engine';


const initialState: BoardState = {
  squares: Array(boardSize*boardSize).fill({value: ' ', state: SquareState.Empty}),
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // play word commits the current working tiles to a played word
    playWord: (state, action) => {
      // done in top level stop reducer
    },
    placeWorkingTile: (state, action) => {
      state.squares[action.payload.place] = {value: action.payload.value.value, state: SquareState.Working};
      if (action.payload.value.state === SquareState.Working) {

        state.squares[action.payload.from] = {value: '', state: SquareState.Empty};
      }
    },
    newGame: (state) => {
      state.squares = initialState.squares;
    },
    returnTiles: (state, action) => {
      // done in top level stop reducer
    },
  },
});

export const { playWord, placeWorkingTile, newGame, returnTiles } = boardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoard = (state: RootState) => state.board.squares;

export default boardSlice.reducer;
