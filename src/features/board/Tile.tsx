import React from 'react';

import { getTileValue, SquareState } from './engine';
import styles from './Board.module.css';

export function Tile(props:any) {
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
