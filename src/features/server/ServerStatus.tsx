import React from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  selectServer,
  serverActions
} from './serverSlice';
import { selectPlayers } from '../player/playersSlice';
import { Box, Typography } from '@mui/material';

export function ServerStatus() {
  const dispatch = useAppDispatch();
  const server = useAppSelector(selectServer);
  const players = useAppSelector(selectPlayers);

  if (server.isConnected && server.subscribedGame !== players.gameId) {
    dispatch(serverActions.subscribeGame(""));
  }

  return (
    <Box width={1 / 2}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
      Establishing: {server.isEstablishingConnection ? "yes" : "no"} Connected: {server.isConnected ? "yes" : "no"}
      </Typography>
    </Box>
  );
}
