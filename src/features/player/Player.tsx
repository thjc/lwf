import React, { useState } from 'react';

import { PlayerState } from './playersSlice';

import {
  Card,
  Heading,
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
