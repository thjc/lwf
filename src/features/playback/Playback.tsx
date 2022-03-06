import React from 'react'

import { useAppSelector, useAppDispatch } from '../../app/hooks'

import {
  serverActions,
  selectServer
} from '../server/serverSlice'

import { Button } from '@mui/material'

export function Playback() {
  const dispatch = useAppDispatch()
  const server = useAppSelector(selectServer);

  const prev = server.playbackSequence === undefined ? server.sequence - 1 : server.playbackSequence - 1;
  const next = server.playbackSequence === undefined ? server.sequence : server.playbackSequence + 1;

  // are we in the game?
  return (<div>
    <Button
      onClick={() => { dispatch(serverActions.fetchOldState(prev)) }}
      disabled={server.sequence === 0 || server.playbackSequence === 0}
    >
      ◀
    </Button>
    <Button
      onClick={() => { dispatch(serverActions.fetchOldState(next)) }}
      disabled={server.playbackSequence === undefined || server.playbackSequence === server.sequence}
    >
      ▶
    </Button>
    <Button
      onClick={() => { dispatch(serverActions.resyncState()) }}
      disabled={server.playbackSequence === undefined}
    >
      🔁
    </Button>
    Turn {server.playbackSequence ? server.playbackSequence : server.sequence} of {server.sequence}
  </div>)
}
