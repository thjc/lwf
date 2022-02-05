import React from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import {
  nextPlayer,
  selectPlayers
} from '../player/playersSlice'

import {
  dumpTiles,
  takeTiles
} from './../bag/bagSlice'

import {
  isValidPlacement
} from './../board/engine'

import {
  playWord,
  returnTiles,
  selectBoard
} from './../board/boardSlice'

import {
  serverActions
} from '../server/serverSlice'

import { TileRack } from './TileRack'

import { Box, Button, Stack } from '@mui/material'

export function Hand () {
  const dispatch = useAppDispatch()
  const board = useAppSelector(selectBoard)
  const players = useAppSelector(selectPlayers)

  // are we in the game?
  if (players.loggedInPlayer >= 0) {
    const isCurrentPlayer = players.currentPlayer === players.loggedInPlayer

    return (
      <Stack>
        <TileRack />

        {!isCurrentPlayer
          ? (<div>Waiting for turn</div>)
          : (<div>
            <Button
              onClick={() => { dispatch(returnTiles({})) }}
            >
              Return Tiles to Hand
            </Button>
            <Button
              onClick={() => {
                dispatch(playWord({}))
                dispatch(takeTiles())
                dispatch(nextPlayer(false))
                dispatch(serverActions.sendGameState())
              }}
              disabled={!isValidPlacement([...board.squares.values()])}
            >
              Place Tiles
            </Button>
            <Button
              onClick={() => {
                dispatch(nextPlayer(true))
                dispatch(serverActions.sendGameState())
              }}
            >
              Pass
            </Button>
            <Button
              onClick={() => {
                dispatch(dumpTiles())
                dispatch(nextPlayer(false))
                dispatch(serverActions.sendGameState())
              }}
            >
              Dump
            </Button>
          </div>)}
      </Stack>
    )
  } else {
    return (<Box>Just chilling and watching</Box>)
  }
}
