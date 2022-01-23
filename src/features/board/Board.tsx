import React from 'react';

import { BoardSquare } from './BoardSquare';

import { useAppSelector } from '../../app/hooks';
import {
  selectBoard,
} from './boardSlice';
import styles from './Board.module.css';
import { BlankSelector } from './BlankSelector';
import { selectPlayers } from '../player/playersSlice';
import { Container } from '@mui/material';

export function Board() {
  const board = useAppSelector(selectBoard);
  const players = useAppSelector(selectPlayers);
  const isCurrentPlayer = players.currentPlayer === players.loggedInPlayer;


  return (
        <Container>
          <div className={styles.boardGrid}>
            {Array.from(board.squares.values()).map((x, n) => { return (<BoardSquare key={n} position={n} tile={x} canPlay={isCurrentPlayer}></BoardSquare>) })}
          </div>
          {board.blankToSelect >= 0 ? (<BlankSelector></BlankSelector>) : ""}
        </Container>
  );
}
