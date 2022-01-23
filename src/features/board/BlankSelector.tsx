import { Box } from '@mui/material';
import React from 'react';

import { useAppDispatch } from '../../app/hooks';

import styles from './Board.module.css';
import { setBlank } from './boardSlice';
import { SquareState } from './engine';
import { Tile } from './Tile';

export function BlankSelector(props: any) {
  const dispatch = useAppDispatch();
  const letters = [...Array(26).keys()].map(x => String.fromCharCode('A'.charCodeAt(0) + x));

  const selectTile = (value: string) => {
    dispatch(setBlank(value));
  };

  return (
    <Box>
      Select blank tile value
      <div className={styles.letterGrid}>
        {Array.from(letters.values()).map((x, n) => { return (<div key={x} onClick={() => selectTile(x)}><Tile key={x} isDragging={false} tileType={SquareState.Hand}>{x}</Tile></div>) })}
      </div>
    </Box>
  );
}
