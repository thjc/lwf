import React from 'react'

import { Bag } from './features/bag/Bag'
import { Board } from './features/board/Board'
import { Hand } from './features/hand/Hand'
import { Players } from './features/player/Players'
import { ServerStatus } from './features/server/ServerStatus'

import { isMobile } from 'react-device-detect'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

// import './App.css';
import { GameManager } from './features/board/GameManager'
import { GameLink } from './features/gameLink/GameLink'
import { ThemeProvider } from '@emotion/react'

import { theme } from './theme'
import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material'
import { Playback } from './features/playback/Playback'

function App () {
  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <ServerStatus />
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Letters with Forklifts
              </Typography>
              <GameManager />
            </Toolbar>
          </AppBar>
        </Box>
        <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
          <Board />
          <Hand />
          <Players />
          <Bag />
          <Playback />
        </DndProvider>
        <GameLink />
      </Stack>
    </ThemeProvider>
  )
}

export default App
