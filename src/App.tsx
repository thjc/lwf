import React from 'react';

import { Bag } from './features/bag/Bag';
import { Board } from './features/board/Board';
import { Hand } from './features/hand/Hand';
import { Players } from './features/player/Players';
import {
  Box,
  Flex,
  Heading,
} from 'rebass'

import {isMobile} from 'react-device-detect';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import './App.css';
import { GameManager } from './features/board/GameManager';
import { GameLink } from './features/gameLink/GameLink';

function App() {
  return (
    <div>
      <Heading
        p={4}
        width={1}>
        Letters with Forklifts
      </Heading>
      <GameManager />
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Flex>
          <Box
            width={1 / 4}>
            <Bag />
            <Players />
            <Hand />
          </Box>
          <Box>
            <Board />
          </Box>
        </Flex>
      </DndProvider>
      <GameLink></GameLink>
    </div>
  );
}

export default App;
