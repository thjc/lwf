import React, { useState } from 'react';
import { useDrag } from 'react-dnd'

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectBoard,
} from './boardSlice';
import { getTileValue, SquareState } from './engine';
import styles from './Board.module.css';

export function Tile(props:any) {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const tileLetter = props.children;
  return (
    <div className={[
        props.isDragging ? styles.dragTile: "",
        props.tileType === SquareState.Working ? styles.workingTile: "",
        styles.tile
      ].join(" ")}>
      <div className={styles.tileLetter}>{tileLetter}</div>
      <div className={styles.tileValue}>{getTileValue(tileLetter)}</div>
    </div>
  );
}
