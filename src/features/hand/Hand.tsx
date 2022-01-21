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
  dumpTiles,
  takeTiles,
} from './../bag/bagSlice';

import {
  isValidPlacement
} from './../board/engine';

import {
  playWord,
  returnTiles,
  selectBoard,
} from './../board/boardSlice';

import { TileRack } from './TileRack';

import styles from './Hand.module.css';

export function Hand() {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const players = useAppSelector(selectPlayers);

  // are we in the game?
  if (players.loggedInPlayer >= 0) {
    const isCurrentPlayer = players.currentPlayer === players.loggedInPlayer;

    return (
            <Card width={1}>
              <TileRack/>

              {!isCurrentPlayer ? (<div>Waiting for turn</div>) : (<div>
                <button
                  className={styles.button}
                  aria-label="Return Tiles To Hand"
                  onClick={() => { dispatch(returnTiles({})); }}
                >
                  Return Tiles to Hand
                </button>
                <button
                  className={styles.button}
                  aria-label="Play Tiles"
                  onClick={() => { dispatch(playWord({})); dispatch(takeTiles()); dispatch(nextPlayer(false)) }}
                  disabled={!isValidPlacement([...board.squares.values()])}
                >
                  Place Tiles
                </button>
                <button
                  className={styles.button}
                  aria-label="Pass"
                  onClick={() => { dispatch(nextPlayer(true)); }}
                >
                  Pass
                </button>
                <button
                  className={styles.button}
                  aria-label="Dump Tiles"
                  onClick={() => { dispatch(dumpTiles()); dispatch(nextPlayer(false)); }}
                >
                  Dump
                </button>
              </div>)}


            </Card>
    );
  } else {
    return (<Card>Just chilling and watching</Card>)
  }

}
