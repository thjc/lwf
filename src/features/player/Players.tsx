import React from 'react';

import { Player } from './Player'

import { useAppSelector } from '../../app/hooks';
import {
  PlayerState,
  selectPlayers
} from './playersSlice';
import { Box } from 'rebass';

export function Players() {
  const players = useAppSelector(selectPlayers);

  return (
    <Box width={1/2}>
      Players
      {Array.from(players.players).map((x, n) => {return (<Player key={n} active={n === players.currentPlayer} player={x as PlayerState}></Player>)})}
    </Box>
  );
}
