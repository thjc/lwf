import { Grid } from '@mui/material';
import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { takeTiles } from '../bag/bagSlice';
import { Login } from '../player/Login';
import { joinGame, endGame, selectPlayers, PlayerState } from '../player/playersSlice';
import styles from './Board.module.css';
import { newGame, selectBoard } from './boardSlice';
import { findStartWorkingTile } from './engine';


export function GameManager() {
  const players = useAppSelector(selectPlayers);
  const board = useAppSelector(selectBoard);
  const dispatch = useAppDispatch();
  const isLoggedIn = players.username !== '';
  const isInGame = players.loggedInPlayer >= 0;

  // make sure we don't detect end of game when turn in progress, or no players loaded
  let gameOver = false;
  if (players.players.length > 0 && findStartWorkingTile(board.squares) === undefined) {
    gameOver = players.passCount >= players.players.length;
    players.players.forEach((v: PlayerState) => { if (v.tiles.length === 0) { gameOver = true; } })
  }
  const dispatchEnd = () => {
    if (gameOver) {
      dispatch(endGame());
    }
  }
  useEffect(dispatchEnd);

  const loggedInButtons = isLoggedIn ? (<div><button
    className={styles.button}
    aria-label="New Game"
    onClick={() => { dispatch(newGame()); dispatch(takeTiles()) }}
  >
    New Game
  </button>
    {!isInGame ? (<button
      className={styles.button}
      aria-label="Join Game"
      onClick={() => { dispatch(joinGame()); dispatch(takeTiles()) }}
      disabled={!isLoggedIn || gameOver}
    >
      Join Game
    </button>) : ""}
    {gameOver ? (<span>Game Over!!!!</span>) : ""}
  </div>) : '';

  return (
    <Grid>
      <Login isLoggedIn={isLoggedIn} />
      {loggedInButtons}
    </Grid>
  )
};
