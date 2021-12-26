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

export function Players() {
  const dispatch = useAppDispatch();
  const players = useAppSelector(selectPlayers);

  return (
    <div>
      Players
      {Array.from(players.players).map((x, n) => {console.log(n, x, players.currentPlayer); return (<Player key={n} active={n === players.currentPlayer} player={x as PlayerState}></Player>)})}
    </div>
  );
}
