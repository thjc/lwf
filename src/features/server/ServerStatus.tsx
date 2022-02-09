import React from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectServer,
  serverActions
} from './serverSlice'
import { selectPlayers } from '../player/playersSlice'
import { Box, IconButton } from '@mui/material'

export function ServerStatus() {
  const dispatch = useAppDispatch()
  const server = useAppSelector(selectServer)
  const players = useAppSelector(selectPlayers)

  if (server.subscribedGame !== players.gameId) {
    dispatch(serverActions.subscribeGame(players.gameId))
  }

  let iconValue = '👤';
  if (server.isEstablishingConnection) {
    iconValue = '☇'
  } else if (server.isConnected) {
    iconValue = '👥'
  }

  return (
    <Box width={1 / 2}>
      <IconButton
        size='large'
        edge='start'
        color='inherit'
        aria-label='menu'
        sx={{ mr: 2 }}
      >
        {iconValue}
      </IconButton>
    </Box>
  )
}
