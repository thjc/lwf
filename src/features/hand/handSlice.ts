import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface HnadState {
  tiles: string[];
}

const initialState: HnadState = {
  tiles: []
};

export const handSlice = createSlice({
  name: 'hand',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addTiles: (state, action) => {
    },
  },
});

export const { addTiles } = handSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHand = (state: RootState) => state.hand;

export default handSlice.reducer;
