import React, { useState } from 'react';

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
import { getTileValue } from './engine';
import styles from './Board.module.css';

export function Tile(props:any) {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);

  return (
    <div className={styles.tile}>
      <div className={styles.tileLetter}>{props.children}</div>
      <div className={styles.tileValue}>{getTileValue(props.children)}</div>
    </div>
  );
}
