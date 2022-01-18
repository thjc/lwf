import React from 'react';

import {
  Card,
} from 'rebass'

import { useAppSelector } from '../../app/hooks';
import {
  selectPlayers
} from '../player/playersSlice';


import {
  SquareState,
} from '../board/engine';

import { BoardSquare } from '../board/BoardSquare';

import styles from './Hand.module.css';

export function TileRack() {
  const players = useAppSelector(selectPlayers);
  const player = players.players[players.loggedInPlayer];


  return (
    <div className={styles.row}>
      <Card>
        <div className={styles.handGrid}>
          {Array.from(player.tiles.values()).map((x, n) => { return (<BoardSquare key={n} position={n} tile={{ value: x, state: SquareState.Hand }}></BoardSquare>) })}
          {/* extra empty tile for dropping back to hand */}
          <BoardSquare key={player.tiles.length} position={player.tiles.length} tile={{ value: '', state: SquareState.HandEnd}}></BoardSquare>
        </div>
      </Card>
    </div>
  );

}
