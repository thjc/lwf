import React, { useState } from 'react';

import {
  Box,
  Card,
  Heading,
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { Login } from '../player/Login';
import { selectPlayers } from '../player/playersSlice';
import styles from './Board.module.css';


export function GameManager() {
  const players = useAppSelector(selectPlayers);

  return (
    <Box>
      <Card>
        <Login isLoggedIn={players.username !== ''}/>
        <button
          className={styles.button}
          aria-label="Load Game"
          onClick={() => console.log("Load Game")}
        >
          Load Game
        </button>
        <button
          className={styles.button}
          aria-label="New Game"
          onClick={() => console.log("New Game")}
        >
          New Game
        </button>
      </Card>
    </Box>
  )
};
