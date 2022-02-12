import React from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  selectBag
} from './../bag/bagSlice'

import {
  loadGame
} from './../board/boardSlice'

import { useStore } from 'react-redux'
import { Box } from '@mui/material'
import { setGameId } from '../player/playersSlice'

export function GameLink () {
  const dispatch = useAppDispatch()
  const store = useStore()
  const bag = useAppSelector(selectBag)

  const stateString = JSON.stringify(store.getState())

  const encodedState = btoa(stateString !== undefined ? stateString : '')
  const gameLink = window.location.origin + '/?game=' + encodedState

  if (store.getState().players.gameId) {
    window.history.replaceState({}, '', '?gameid=' + store.getState().players.gameId)
  }

  if (bag && bag.tiles.length === 100) {
    // TODO make this parsing more robust
    const search = window.location.search
    if (search.startsWith('?game=')) {
      const gameState = JSON.parse(atob(search.substring(search.indexOf('=') + 1)))
      dispatch(loadGame(gameState))
    } else if (search.startsWith('?gameid=')) {
      dispatch(setGameId(search.substring(search.indexOf('=') + 1)))
    }
  }

  return (
    <Box>
      <a href={gameLink}>Backup link to this game</a>
    </Box>
  )
}
