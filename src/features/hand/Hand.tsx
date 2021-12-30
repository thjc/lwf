import React from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  nextPlayer,
  selectPlayers
} from '../player/playersSlice';

import {
  takeTiles,
} from './../bag/bagSlice';

import {
  SquareState,
  isValidPlacement
} from './../board/engine';

import {
  playWord,
  returnTiles,
  selectBoard,
} from './../board/boardSlice';

import { BoardSquare } from '../board/BoardSquare';

import styles from './Hand.module.css';

export function Hand() {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);
  const player = players.players[players.currentPlayer];
  const board = useAppSelector(selectBoard);

  return players.currentPlayer < 0 ? (<div></div>) : (
    <div>
      <div className={styles.row}>
        <Box>
          <Card>
          <div className={styles.handGrid}>
          {Array.from(player.tiles.values()).map((x,n) => {return (<BoardSquare key={n} position={n} tile={ {value: x, state: SquareState.Hand} }></BoardSquare>)})}
        </div>

          <button
          className={styles.button}
          aria-label="Pick Tiles"
          onClick={() => dispatch(takeTiles({count: (7-player.tiles.length)}))}
        >
          Pick Tiles
        </button>

        <button
          className={styles.button}
          aria-label="Return Tiles"
          onClick={() => {dispatch(returnTiles({}));}}
        >
          Return Tiles
        </button>
        <button
          className={styles.button}
          aria-label="Play Tiles"
          onClick={() => {dispatch(playWord({}));}}
          disabled={!isValidPlacement([...board.values()])}
        >
          Place Tiles
        </button>
        <button
          className={styles.button}
          aria-label="Next Player"
          onClick={() => {dispatch(nextPlayer());}}
        >
          Next Player
        </button>


          </Card>
  </Box>
      </div>
    </div>
  );
}
