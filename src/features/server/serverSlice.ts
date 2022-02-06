import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import ServerMessage from './serverMessage'

export interface ServerState {
  messages: ServerMessage[]
  isEstablishingConnection: boolean
  isConnected: boolean
  subscribedGame: string
}

const initialState: ServerState = {
  messages: [],
  isEstablishingConnection: true,
  isConnected: false,
  subscribedGame: ''
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
      state.messages = []
    },
    queueMessage: (state, action: PayloadAction<ServerMessage>) => {
      state.messages.push(action.payload)
    },
    sendGameState: (state) => {

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
