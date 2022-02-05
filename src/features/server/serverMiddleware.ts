import { Middleware } from 'redux'
import { serverActions } from './serverSlice'
import { loadGame } from '../board/boardSlice'

const ServerMiddleware: Middleware = store => {
  let socket: WebSocket | undefined

  return next => action => {
    const isConnectionEstablished = (socket != null) && store.getState().server.isConnected

    console.log('middleware', action, socket)

    if (socket === undefined) {
      const protocol = window.location.protocol === 'https' ? 'wss' : 'ws'

      socket = new WebSocket(protocol + '://' + window.location.host + '/gamestate')
      if (socket !== undefined) {
        socket.onopen = () => {
          if (socket != null) {
            console.log('Connected')
            for (const msg of store.getState().server.messages) {
              socket.send(JSON.stringify(msg))
            }
            // if we have a gameId make sure we subscribe before we do anything else with the connection
            const gameId = store.getState().players.gameId
            if (gameId) {
              sendOrQueue('load', action.payload)
            }
            store.dispatch(serverActions.connectionEstablished())
          }
        }

        socket.onmessage = (event: MessageEvent) => {
          console.log(event)
          const msg = JSON.parse(String(event.data))
          if (msg.cmd === 'update') {
            const gameState = JSON.parse(atob(msg.data))
            store.dispatch(loadGame(gameState))
          }
        }
      }
    }

    const sendOrQueue = (cmd: string, data: string) => {
      const message = { cmd: cmd, data: data }
      if ((socket != null) && isConnectionEstablished) {
        socket.send(JSON.stringify(message))
      } else {
        store.dispatch(serverActions.queueMessage(message))
      }
    }

    if (socket && isConnectionEstablished) {
      if (serverActions.sendGameState.match(action)) {
        const stateString = JSON.stringify(store.getState())
        const encodedState = btoa(stateString !== undefined ? stateString : '')
        sendOrQueue('store', encodedState)
      } else if (serverActions.subscribeGame.match(action)) {
        const gameId = store.getState().players.gameId
        action.payload = gameId
        sendOrQueue('load', gameId)
      }
    }

    next(action)
  }
}

export default ServerMiddleware
