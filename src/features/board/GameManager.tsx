import React from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { takeTiles } from '../bag/bagSlice';
import { Login } from '../player/Login';
import { joinGame, selectPlayers } from '../player/playersSlice';
import styles from './Board.module.css';
import { newGame } from './boardSlice';


export function GameManager() {
  const players = useAppSelector(selectPlayers);
  const dispatch = useAppDispatch();
  const isLoggedIn = players.username !== '';

  const loggedInButtons = isLoggedIn ? (<div><button
    className={styles.button}
    aria-label="New Game"
    onClick={() => {dispatch(newGame()); dispatch(takeTiles())}}
  >
    New Game
  </button>
  <button
    className={styles.button}
    aria-label="Join Game"
    onClick={() => {dispatch(joinGame()); dispatch(takeTiles())}}
    disabled={!isLoggedIn}
  >
    Join Game
  </button></div>) : '';

  return (
    <Box>
      <Card>
        <Login isLoggedIn={isLoggedIn}/>
        {loggedInButtons}
      </Card>
    </Box>
  )
};
