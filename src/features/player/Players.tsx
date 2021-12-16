import React, { useState } from 'react';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { Player } from './Player'

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  PlayerState,
  selectPlayers
} from './playersSlice';
import styles from './Player.module.css';

export function Players() {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);

  return (
    <div>
      Players
      {Array.from(players).map((x, n) => {return (<Player key={n} player={x as PlayerState}></Player>)})}
    </div>
  );
}
