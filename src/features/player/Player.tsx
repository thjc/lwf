import React, { useState } from 'react';

import { PlayerState } from './playersSlice';

import {
  Box,
  Card,
  Image,
  Heading,
  Text
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function Player(args : {player: PlayerState}) {
  return (
    <Card>
      <Heading>Player {args.player.username}</Heading>
      Score: {args.player.score}
    </Card>
  )
};
