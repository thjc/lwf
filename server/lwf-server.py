#!/usr/bin/env python3

import aionotify
import asyncio
import base64
import json
import os
import sys


datadir = sys.argv[1]

game_id = "test-game"
last_game_state = ""

# Setup the watcher
watcher = aionotify.Watcher()
watcher.watch(alias='gamedata', path=datadir, flags=aionotify.Flags.MODIFY | aionotify.Flags.CREATE)

# Prepare the loop
loop = asyncio.get_event_loop()


def send_message(cmd, data):
    print(json.dumps({"cmd": cmd, "data": data}))
    sys.stdout.flush()

def readgame(gameid):
    global last_game_state
    try:
        game_state = open(os.path.join(datadir, gameid)).readline()
        if (game_state != last_game_state):
            send_message("update", game_state)
            last_game_state = game_state
    except FileNotFoundError:
        send_message("nogame", "")

def writegame(gameid, state):
    global last_game_state
    if gameid.replace("-","").isalnum():
        open(os.path.join(datadir, gameid), 'w+').write(state)
        last_game_state = state

def stdinread():
    global game_id
    global last_game_state
    try:
        line = sys.stdin.readline()
        msg = json.loads(line)
        cmd = msg.get("cmd", "")
        data = msg.get("data", "")
        if cmd == "load":
            game_id = data
            last_game_state = ""
            readgame(game_id)
        elif cmd == "store" and game_id != "":
            writegame(game_id, data)
        elif cmd == "ping":
            send_message("pong", "")
        else:
            print("Unknown Command", cmd, file=sys.stderr)
    except Exception as e:
        print("Failed to decode msg:", line, e, file=sys.stderr)


async def work():
    await watcher.setup(loop)
    while True:
        event = await watcher.get_event()
        if event.name == game_id:
            readgame(game_id)

loop.add_reader(sys.stdin, stdinread)
loop.run_until_complete(work())
loop.stop()
loop.close()



