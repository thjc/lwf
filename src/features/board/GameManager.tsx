import React, { useEffect } from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { takeTiles } from '../bag/bagSlice';
import { Login } from '../player/Login';
import { joinGame, endGame, selectPlayers, PlayerState } from '../player/playersSlice';
import styles from './Board.module.css';
import { newGame } from './boardSlice';


export function GameManager() {
  const players = useAppSelector(selectPlayers);
  const dispatch = useAppDispatch();
  const isLoggedIn = players.username !== '';

  let gameOver = players.passCount >= players.players.length;
  players.players.forEach((v: PlayerState) => { if (v.tiles.length === 0) { gameOver = true; } })
  const dispatchEnd = () => {if (gameOver) {
    dispatch(endGame());
  }}
  useEffect(dispatchEnd);

  const loggedInButtons = isLoggedIn ? (<div><button
    className={styles.button}
    aria-label="New Game"
    onClick={() => { dispatch(newGame()); dispatch(takeTiles()) }}
  >
    New Game
  </button>
    <button
      className={styles.button}
      aria-label="Join Game"
      onClick={() => { dispatch(joinGame()); dispatch(takeTiles()) }}
      disabled={!isLoggedIn || gameOver}
    >
      Join Game
    </button>
    {gameOver ? (<span>Game Over!!!!</span>) : ""}
  </div>) : '';

  return (
    <Box>
      <Card>
        <Login isLoggedIn={isLoggedIn} />
        {loggedInButtons}
      </Card>
    </Box>
  )
};
