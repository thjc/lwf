import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import { newGame, placeWorkingTile } from '../board/boardSlice';
import { getTileValue, SquareState } from '../board/engine';

export interface PlayerState {
  tiles: string[];
  score: number;
  penalty: number;
  username: string;
}

const initialState : {
  currentPlayer: number;
  loggedInPlayer: number;
  username: string;
  passCount: number;
  players: PlayerState[];
} = {
  currentPlayer: 0,
  loggedInPlayer: -1,
  username: '',
  passCount: 0,
  players: []};

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
    nextPlayer: (state, action) => {
      state.passCount = action.payload ? state.passCount + 1 : 0;
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
    },
    joinGame: (state) => {
      const playerCount = state.players.push({username: state.username, score: 0, penalty: 0, tiles: []});
      state.loggedInPlayer = playerCount - 1;
    },
    endGame: (state) => {
      state.players.forEach((element, index) => {
        element.penalty = element.tiles.reduce((acc: number, val: string) => acc + getTileValue(val), 0)
      })
    },
    login: (state, action) => {
      state.username = action.payload.username;
      state.players.forEach((element, index) => {if (element.username === state.username) {state.loggedInPlayer = index};});
    },
    logout: (state) => {
      state.username = '';
      state.loggedInPlayer = -1;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(placeWorkingTile, (state, action) => {
      let removeFrom = action.payload.from;
      if (action.payload.dropType === SquareState.Hand || action.payload.dropType === SquareState.HandEnd) {
        state.players[state.currentPlayer].tiles.splice(action.payload.place, 0, action.payload.value.value);
        if (removeFrom >= action.payload.place) {
          removeFrom += 1;
        }
      }
      if (action.payload.value.state === SquareState.Hand) {
        state.players[state.currentPlayer].tiles.splice(removeFrom, 1);
      }
      return state;
    });
    builder.addCase(newGame, (state) => {
      state.players = [{username: state.username, score: 0, penalty: 0, tiles: []}]
      state.currentPlayer = 0;
      state.passCount = 0;
      state.loggedInPlayer = 0;
      return state;
    });
  }
});

export const { accumulateScore, addTiles, nextPlayer, joinGame, endGame, login, logout} = playersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPlayers = (state: RootState) => state.players;

export default playersSlice.reducer;
