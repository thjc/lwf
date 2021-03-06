import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

export interface ServerState {
  isEstablishingConnection: boolean
  isConnected: boolean
  subscribedGame: string
  sequence: number
  playbackSequence: number | undefined
}

const initialState: ServerState = {
  isEstablishingConnection: true,
  isConnected: false,
  subscribedGame: '',
  sequence: 0,
  playbackSequence: undefined,
}

export const serverSlice = createSlice({
  name: 'server',
  initialState,
  reducers: {
    subscribeGame: (state, action: PayloadAction<string>) => {
      console.log('subscribe to game', action.payload)
      state.subscribedGame = action.payload
    },
    connectionEstablished: state => {
      state.isConnected = true
      state.isEstablishingConnection = false
    },
    sendGameState: (state) => {
      state.sequence = state.sequence + 1
    },
    unsubscribeGame: (state) => {
      state.subscribedGame = '';
    },
    fetchOldState: (state,  action: PayloadAction<number>) => {
      state.playbackSequence = action.payload
    },
    resyncState: (state) => {
      state.playbackSequence = undefined
    },
    disconnected: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    }
  }
})

export const serverActions = serverSlice.actions

export const selectServer = (state: RootState) => state.server

export default serverSlice.reducer
