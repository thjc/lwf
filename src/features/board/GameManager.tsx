import React from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Login } from '../player/Login';
import { joinGame, selectPlayers } from '../player/playersSlice';
import styles from './Board.module.css';
import { newGame } from './boardSlice';


export function GameManager() {
  const players = useAppSelector(selectPlayers);
  const dispatch = useAppDispatch();
  const isLoggedIn = players.username !== '';

  return (
    <Box>
      <Card>
        <Login isLoggedIn={isLoggedIn}/>
        <button
          className={styles.button}
          aria-label="New Game"
          onClick={() => dispatch(newGame())}
        >
          New Game
        </button>
        <button
          className={styles.button}
          aria-label="Join Game"
          onClick={() => dispatch(joinGame())}
          disabled={!isLoggedIn}
        >
          Join Game
        </button>
      </Card>
    </Box>
  )
};
