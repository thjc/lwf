import { Grid } from '@mui/material'
import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { selectBag, takeTiles } from '../bag/bagSlice'
import { Login } from '../player/Login'
import { joinGame, endGame, selectPlayers, PlayerState } from '../player/playersSlice'
import styles from './Board.module.css'
import { newGame, selectBoard } from './boardSlice'
import { findStartWorkingTile, initialBagSize } from './engine'

import {
  serverActions
} from '../server/serverSlice'

export function GameManager () {
  const players = useAppSelector(selectPlayers)
  const board = useAppSelector(selectBoard)
  const bag = useAppSelector(selectBag)
  const dispatch = useAppDispatch()
  const isLoggedIn = players.username !== ''
  const isInGame = players.loggedInPlayer >= 0

  const gameStarted = bag.tiles.length !== initialBagSize;
  // make sure we don't detect end of game when turn in progress, or no players loaded
  let gameOver = false
  if (gameStarted && players.players.length > 0 && findStartWorkingTile(board.squares) === undefined) {
    gameOver = players.passCount >= players.players.length
    players.players.forEach((v: PlayerState) => { if (v.tiles.length === 0) { gameOver = true } })
  }
  const dispatchEnd = () => {
    if (gameOver) {
      dispatch(endGame())
    }
  }
  useEffect(dispatchEnd)

  const loggedInButtons = isLoggedIn
    ? (
      <div><button
        className={styles.button}
        aria-label='New Game'
        onClick={() => {
          dispatch(serverActions.unsubscribeGame())
          dispatch(newGame())
          dispatch(serverActions.subscribeGame(''))
          dispatch(joinGame())
          dispatch(serverActions.sendGameState())
        }}
           >
        New Game
      </button>
        {!isInGame
          ? (<button
              className={styles.button}
              aria-label='Join Game'
              onClick={() => {
                dispatch(joinGame())
                dispatch(serverActions.sendGameState())
              }}
              disabled={!isLoggedIn || gameOver || gameStarted}
             >
            Join Game
          </button>)
          : ''}
        {!gameStarted ? (<button
          className={styles.button}
          aria-label='Start Game'
          onClick={() => {
            dispatch(takeTiles())
            dispatch(serverActions.sendGameState())
          }}
          disabled={!isLoggedIn || gameOver || gameStarted}
         >
          Start Game
        </button>) : ''}
        {gameOver ? (<span>Game Over!!!!</span>) : ''}
      </div>
      )
    : ''

  return (
    <Grid>
      <Login isLoggedIn={isLoggedIn} />
      {loggedInButtons}
    </Grid>
  )
};
