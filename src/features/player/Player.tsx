import React from 'react';

import { PlayerState } from './playersSlice';

import {
  Card,
  Heading,
} from 'rebass'

import styles from './Player.module.css';


export function Player(args : {player: PlayerState, active: boolean}) {
  return (
    <Card className={args.active ? styles.activePlayer : ""}>
      <Heading>Player {args.player.username}</Heading>
      Score: {args.player.score - args.player.penalty}
    </Card>
  )
};
