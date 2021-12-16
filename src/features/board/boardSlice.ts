import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { RootState, AppThunk } from '../../app/store';


export enum SquareState {
  Empty,
  Placed,
  Working,
  Hand
}
export interface Square {
  value: string;
  state: SquareState;
}

export interface BoardState {
  squares: Square[];
}

const boardSize = 15;

const initialState: BoardState = {
  squares: Array(boardSize*boardSize).fill({value: ' ', state: SquareState.Empty}),
};

const applyWord = (values: Square[], word: string[], place: number[], direction: string) => {
  let x = place[0];
  let y = place[1];
  for (let letter of word) {
    values[x + y*boardSize] = {value: letter, state: SquareState.Placed};
    if (direction.indexOf('W') >= 0) {
      x -= 1;
    }
    else if (direction.indexOf('E') >= 0) {
      x += 1;
    }
    if (direction.indexOf('S') >= 0) {
      y -= 1;
    }
    else if (direction.indexOf('N') >= 0) {
      y -= 1;
    }
  }
}


export const boardSlice = createSlice({
  name: 'board',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    playWord: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      applyWord(state.squares, action.payload.word, action.payload.position, action.payload.direction);
    },
    placeWorkingTile: (state, action) => {
      state.squares[action.payload.place] = {value: action.payload.value.value, state: SquareState.Working};
      if (action.payload.value.state === SquareState.Working) {

        state.squares[action.payload.from] = {value: '', state: SquareState.Empty};
      }
    },
  },
});

export const { playWord, placeWorkingTile } = boardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoard = (state: RootState) => state.board.squares;

export default boardSlice.reducer;
