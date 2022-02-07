import { Middleware } from 'redux'
import { serverActions } from './serverSlice'
import { loadGame } from '../board/boardSlice'

const ServerMiddleware: Middleware = store => {
  let socket: WebSocket | undefined
  let timeoutInterval: any;

  setInterval(() => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({cmd: "ping", data: ""}))
    }
  }, 15000)

  return next => action => {
    const isConnectionEstablished = socket && store.getState().server.isConnected

    if (socket === undefined || socket.readyState === socket.CLOSED) {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws'

      socket = new WebSocket(protocol + '://' + window.location.host + '/gamestate')
      if (socket !== undefined) {
        timeoutInterval = setTimeout(() => {
          console.log("Connection timeout")
          socket?.close()
        }, 5000)

        socket.onopen = () => {
          if (socket != null) {
            clearTimeout(timeoutInterval);

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
          const msg = JSON.parse(String(event.data))
          if (msg.cmd === 'update') {
            const gameState = JSON.parse(atob(msg.data))
            store.dispatch(loadGame(gameState))
          }
        }

        socket.onerror = (event: Event) => {
          console.log("Socket error", event)
          socket?.close()
        }

        socket.onclose = () => {
          if (store.getState().server.isConnected) {
            setTimeout(() => (store.dispatch(serverActions.disconnected())), 1000);
          }
        }
      }
    }

    const sendOrQueue = (cmd: string, data: string) => {
      const message = { cmd: cmd, data: data }
      if (socket && socket.readyState === socket.OPEN && isConnectionEstablished) {
        socket.send(JSON.stringify(message))
      } else {
        store.dispatch(serverActions.queueMessage(message))
      }
    }

    if (socket && socket.readyState === socket.OPEN && isConnectionEstablished) {
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