import { Middleware } from 'redux'
import { serverActions } from './serverSlice'
import { loadGame } from '../board/boardSlice'
import ServerMessage from './serverMessage'


const ServerMiddleware: Middleware = store => {
  let socket: WebSocket | undefined
  let messages: ServerMessage[] = []

  let waitPong = false;

  const sendOrQueue = (cmd: string, data: string) => {
    const message = { cmd: cmd, data: data }
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify(message))
    } else {
      messages.push(message);
    }
  }

  const CloseSocket = (reconnect: boolean) => {
    if (socket && socket.readyState !== socket.CLOSED) {
      socket.close();
    }
    socket = undefined;
    store.dispatch(serverActions.disconnected());
    if (reconnect) {
      setTimeout(() => {
        if (!socket) {
          socket = ConnectAndSubscribe(store.getState().server.subscribedGame);
        }
      }, 5000);
    }
  }

  const ConnectAndSubscribe = (gameId: string) : WebSocket => {
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const uri = protocol + '://' + window.location.host + '/gamestate';
    console.log("Connecting to ", uri);
    const socket = new WebSocket(uri);
    waitPong = false;

    if (store.getState().server.subscribedGame !== gameId) {
      messages = [];
    }

    let timeoutInterval : NodeJS.Timeout | undefined = undefined;
    if (socket) {
      timeoutInterval = setTimeout(() => {
        console.log("Connection timeout")
        CloseSocket(true);
      }, 5000)

      socket.onopen = () => {
        if (socket) {
          if (timeoutInterval) {
            clearTimeout(timeoutInterval);
          }

          // if we have a gameId make sure we subscribe before we do anything else with the connection
          const gameId = store.getState().players.gameId
          if (gameId) {
            sendOrQueue('load', gameId)
          }
          for (const msg of messages) {
            socket.send(JSON.stringify(msg))
          }
          store.dispatch(serverActions.connectionEstablished())
        }
      }

      socket.onmessage = (event: MessageEvent) => {
        const msg = JSON.parse(String(event.data))
        if (msg.cmd === 'update') {
          const gameState = JSON.parse(atob(msg.data))
          store.dispatch(loadGame(gameState))
        } else if (msg.cmd === "pong") {
          waitPong = false;
        }
      }

      socket.onerror = (event: Event) => {
        console.log("Socket error", event)
        if (timeoutInterval) {
          clearTimeout(timeoutInterval);
        }
        CloseSocket(true);
      }

      socket.onclose = () => {
        if (timeoutInterval) {
          clearTimeout(timeoutInterval);
        }
        CloseSocket(true);
      }
    }

    return socket;
  }

  setInterval(() => {
    if (socket && socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({cmd: "ping", data: ""}))
      waitPong = true;
      setTimeout(() => {
        if (waitPong) {
          console.log("Timeout on Pong");
          CloseSocket(true);
        }
      }, 5000)
    }
  }, 15000)

  return next => action => {
    if (serverActions.sendGameState.match(action)) {
      const stateString = JSON.stringify(store.getState())
      const encodedState = btoa(stateString !== undefined ? stateString : '')
      sendOrQueue('store', encodedState)
    } else if (serverActions.subscribeGame.match(action)) {
      const gameId = action.payload
      console.log("Game of interest changed to ", gameId)
      if (gameId) {
        CloseSocket(false);
        socket = ConnectAndSubscribe(gameId)
      }
    }

    next(action)
  }
}

export default ServerMiddleware
