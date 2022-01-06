import React from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  nextPlayer,
  PlayerState,
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
  const board = useAppSelector(selectBoard);
  const players = useAppSelector(selectPlayers);
  let player : PlayerState | undefined = undefined;
  let isCurrentPlayer = false;
  if (players.players.length > 0 && players.currentPlayer >= 0) {
    player = players.players[players.currentPlayer];
    isCurrentPlayer = player ? players.username === player.username : false;
  }

  return player === undefined || !isCurrentPlayer ? (<div>Waiting for turn</div>) : (
    <div>
      <div className={styles.row}>
        <Box>
          <Card>
          <div className={styles.handGrid}>
          {Array.from(player.tiles.values()).map((x,n) => {return (<BoardSquare key={n} position={n} tile={ {value: x, state: SquareState.Hand} }></BoardSquare>)})}
        </div>

        <button
          className={styles.button}
          aria-label="Return Tiles To Hand"
          onClick={() => {dispatch(returnTiles({}));}}
        >
          Return Tiles to Hand
        </button>
        <button
          className={styles.button}
          aria-label="Play Tiles"
          onClick={() => {dispatch(playWord({})); dispatch(takeTiles()); dispatch(nextPlayer(false))}}
          disabled={!isValidPlacement([...board.squares.values()])}
        >
          Place Tiles
        </button>
        <button
          className={styles.button}
          aria-label="Pass"
          onClick={() => {dispatch(nextPlayer(true));}}
        >
          Pass
        </button>


          </Card>
  </Box>
      </div>
    </div>
  );
}
