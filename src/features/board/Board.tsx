import React from 'react';

import {
  Box,
  Heading,
} from 'rebass'

import { BoardSquare } from './BoardSquare';

import { useAppSelector } from '../../app/hooks';
import {
  selectBoard,
} from './boardSlice';
import styles from './Board.module.css';
import { BlankSelector } from './BlankSelector';
import { selectPlayers } from '../player/playersSlice';

export function Board() {
  const board = useAppSelector(selectBoard);
  const players = useAppSelector(selectPlayers);
  const isCurrentPlayer = players.currentPlayer === players.loggedInPlayer;


  return (
    <div>
      <div className={styles.row}>
        <Box>
          <Heading as='h3'>
            Board
          </Heading>
          <div className={styles.boardGrid}>
            {Array.from(board.squares.values()).map((x, n) => { return (<BoardSquare key={n} position={n} tile={x} canPlay={isCurrentPlayer}></BoardSquare>) })}
          </div>
          {board.blankToSelect >= 0 ? (<BlankSelector></BlankSelector>) : ""}
        </Box>
      </div>
    </div>
  );
}
