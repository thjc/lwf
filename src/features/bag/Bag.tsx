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
  takeTiles,
  selectBag
} from './bagSlice';
import styles from './Bag.module.css';

export function Bag() {
  const dispatch = useAppDispatch();
  const bag = useAppSelector(selectBag);

  return (
    <div>
      <div className={styles.row}>
        <Box>
        <Heading as='h3'>
          Tiles Remaining
        </Heading>
        <div>
          {bag.tiles.length}
        </div>
  </Box>
      </div>
    </div>
  );
}
