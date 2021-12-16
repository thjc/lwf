import React, { useState } from 'react';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { BoardSquare } from './BoardSquare';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  playWord,
  selectBoard,
} from './boardSlice';
import styles from './Board.module.css';

export function Board() {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Play Word"
          onClick={() => dispatch(playWord({word: "quirky", position: [7,7], direction: "E"}))}
        >
          Test
        </button>
        <Box width={256}>
        <Heading as='h3'>
          Board
        </Heading>
        <div className={styles.boardGrid}>
          {Array.from(board.values()).map((x, n) => {return (<BoardSquare key={n} position={n} tile={x}></BoardSquare>)})}
        </div>
  </Box>
      </div>
    </div>
  );
}
