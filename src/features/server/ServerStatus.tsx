import React from 'react'

import { useAppSelector } from '../../app/hooks'
import {
  selectServer,
} from './serverSlice'
import { Box, IconButton } from '@mui/material'

export function ServerStatus() {
  const server = useAppSelector(selectServer)

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
