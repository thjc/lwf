import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { newGame, placeWorkingTile } from '../board/boardSlice';
import { SquareState } from '../board/engine';

export interface PlayerState {
  tiles: string[];
  score: number;
  username: string;
}

const initialState : {
  currentPlayer: number;
  username: string;
  players: PlayerState[];
} = {
  currentPlayer: 0,
  username: '',
  players: [
  {
    tiles: [],
    score: 0,
    username: "TSP",
  },
  {
    tiles: [],
    score: 0,
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
    nextPlayer: (state) => {
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },
    joinGame: (state) => {
      state.players.push({username: state.username, score: 0, tiles: []})
    },
    login: (state, action) => {
      state.username = action.payload.username;
      // TODO: Decide if 'current player' is always the logged in user
      // state.currentPlayer = -1;
      // state.players.forEach((v,n) => {if (v.username === state.username) { state.currentPlayer = n; }})
    },
    logout: (state) => {
      state.username = '';
      //state.currentPlayer = -1;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(placeWorkingTile, (state, action) => {
      if (action.payload.value.state === SquareState.Hand) {
        state.players[state.currentPlayer].tiles.splice(action.payload.from,1);
      }
      return state;
    });
    builder.addCase(newGame, (state) => {
      state.players = [{username: state.username, score: 0, tiles: []}]
      state.currentPlayer = 0;
      return state;
    });
  }
});

export const { accumulateScore, addTiles, nextPlayer, joinGame, login, logout} = playersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayers = (state: RootState) => state.players;

export default playersSlice.reducer;
