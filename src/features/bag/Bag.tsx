import React from 'react';

import {
  Box,
  Heading,
} from 'rebass'

import { useAppSelector } from '../../app/hooks';
import {
  selectBag
} from './bagSlice';
import styles from './Bag.module.css';

export function Bag() {
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
