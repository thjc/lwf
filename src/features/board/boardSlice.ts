import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface BoardState {
  value: string[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: BoardState = {
  value: Array(15*15).fill(' '),
  status: 'idle',
};

const applyWord = (values: string[], word: string[], place: number[], direction: string) => {
  const size = 15;
  let x = place[0];
  let y = place[1];
  for (let letter of word) {
    values[x + y*size] = letter;
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
      applyWord(state.value, action.payload.word, action.payload.position, action.payload.direction);
    },
  },
});

export const { playWord } = boardSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBoard = (state: RootState) => state.board.value;

export default boardSlice.reducer;
