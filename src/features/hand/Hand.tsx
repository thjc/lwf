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
  selectHand
} from './handSlice';

import {
  takeTiles
} from './../bag/bagSlice';

import { Tile } from '../board/Tile';

import styles from './Hand.module.css';

export function Hand() {
  const dispatch = useAppDispatch();
  const hand = useAppSelector(selectHand);

  return (
    <div>
      <div className={styles.row}>
        <Box>
          <Card>
          <div className={styles.handGrid}>
          {Array.from(hand.tiles.values()).map(x => {return (<Tile>{x}</Tile>)})}
        </div>

          <button
          className={styles.button}
          aria-label="Pick Tiles"
          onClick={() => dispatch(takeTiles({player:1, count: (7-hand.tiles.length)}))}
        >
          Pick Tiles
        </button>

          </Card>
        <div>
          {hand.tiles.length}
        </div>
  </Box>
      </div>
    </div>
  );
}
