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
  selectPlayers
} from '../player/playersSlice';

import {
  takeTiles,
} from './../bag/bagSlice';

import {
  SquareState,
} from './../board/boardSlice';

import { BoardSquare } from '../board/BoardSquare';

import styles from './Hand.module.css';

export function Hand() {
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayers)[0];

  console.log("Hand", player);

  return (
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
          onClick={() => dispatch(takeTiles({player:0, count: (7-player.tiles.length)}))}
        >
          Pick Tiles
        </button>

          </Card>
  </Box>
      </div>
    </div>
  );
}
