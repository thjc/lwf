import React, { useState } from 'react';

import { PlayerState } from './playersSlice';

import {
  Card,
  Heading,
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import styles from './Player.module.css';


export function Player(args : {player: PlayerState, active: boolean}) {
  console.log("Player", args)
  return (
    <Card className={args.active ? styles.activePlayer : ""}>
      <Heading>Player {args.player.username}</Heading>
      Score: {args.player.score}
    </Card>
  )
};
