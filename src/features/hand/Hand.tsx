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
  dumpTiles,
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

  // are we in the game?
  if (players.loggedInPlayer >= 0) {
    const player = players.players[players.loggedInPlayer];
    const isCurrentPlayer = players.currentPlayer === players.loggedInPlayer;

    return (
      <div>
        <div className={styles.row}>
          <Box>
            <Card>
              <div className={styles.handGrid}>
                {Array.from(player.tiles.values()).map((x, n) => { return (<BoardSquare key={n} position={n} tile={{ value: x, state: SquareState.Hand }}></BoardSquare>) })}
              </div>

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
          </Box>
        </div>
      </div>
    );
  } else {
    return (<Card>Just chilling and watching</Card>)
  }

}
