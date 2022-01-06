import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { BoardState, boardSize, SquareState } from './engine';


const initialState: BoardState = {
  squares: Array(boardSize*boardSize).fill({value: ' ', state: SquareState.Empty}),
  blankToSelect: -1
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loadGame: (state, action) => {
      // done in top level store reducer
    },
    playWord: (state, action) => {
      // done in top level store reducer
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
    selectBlank: (state, action) => {
      state.blankToSelect = action.payload;
    },
    setBlank: (state, action) => {
      if (state.blankToSelect >= 0) {
        state.squares[state.blankToSelect].value = ' ' + action.payload;
        state.blankToSelect = -1;
      }
    },
  },
});

export const { loadGame, playWord, placeWorkingTile, newGame, returnTiles, selectBlank, setBlank } = boardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
