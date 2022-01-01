import React from 'react';

import {
  Box,
  Card,
} from 'rebass'

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {
  selectBag,
} from './../bag/bagSlice';

import {
  loadGame,
} from './../board/boardSlice';

import { useStore } from 'react-redux';

export function GameLink() {
  const dispatch = useAppDispatch();
  const store = useStore();
  const bag = useAppSelector(selectBag);

  const stateString = JSON.stringify(store.getState());

  const encodedState = btoa(stateString !== undefined ? stateString : '');
  const gameLink = window.location.origin + "/?game=" + encodedState

  if (bag && bag.tiles.length === 100) {
    // TODO make this parsing more robust
    const search = window.location.search;
    if (search.startsWith('?game='))
    {
      const gameState = JSON.parse(atob(search.substring(search.indexOf('=')+1)));
      dispatch(loadGame(gameState));
    }
  }

  return (
    <div>
      <Box>
        <Card>
          <a href={gameLink}>Link to this game</a>
        </Card>
      </Box>
    </div>
  );
}
