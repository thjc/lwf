import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

import { placeWorkingTile } from '../board/boardSlice';
import { SquareState } from '../board/engine';

export interface PlayerState {
  tiles: string[];
  score: number;
  playerNumber: number;
  username: string;
}

const initialState : {
  currentPlayer: number;
  players: PlayerState[];
} = {
  currentPlayer: 0,
  players: [
  {
    tiles: [],
    score: 0,
    playerNumber: 0,
    username: "TSP",
  },
  {
    tiles: [],
    score: 0,
    playerNumber: 1,
    username: "SP",
  }
]};

export const playersSlice = createSlice({
  name: 'player',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    accumulateScore: (state, action) => {
      state.players[action.payload.player].score += action.payload.delta
    },
    addTiles: (state, action) => {
      state.players[action.payload.player].tiles += action.payload.tiles
    },
  },
  extraReducers: (builder) => {
    builder.addCase(placeWorkingTile, (state, action) => {
      console.log("placeWorkingtiles, plauers", action);
      if (action.payload.value.state === SquareState.Hand) {
        state.players[state.currentPlayer].tiles.splice(action.payload.from,1);
      }
      return state;
    })
  }
});

export const { accumulateScore, addTiles } = playersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayers = (state: RootState) => state.players.players;

export default playersSlice.reducer;
