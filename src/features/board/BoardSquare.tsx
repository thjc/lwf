import React, { useState } from 'react';

import { Tile } from './Tile';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  playWord,
  selectBoard,
} from './boardSlice';
import styles from './Board.module.css';

export function BoardSquare(props:any) {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);

  const tileValue = props.children;

  if (tileValue && tileValue !== ' ') {
    return (
      <Tile>{tileValue.toUpperCase()}</Tile>
    );
  } else {
    return (<Box className={styles.boardSquare}></Box>)
  }
}
