import { Bag } from './features/bag/Bag';
import { Board } from './features/board/Board';
import { Hand } from './features/hand/Hand';
import { Players } from './features/player/Players';
import {
  Box,
  Flex,
  Heading,
} from 'rebass'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import './App.css';

function App() {
  return (
    <div>
      <Heading
        p={4}
        width={1}>
        Letters with Forklifts
      </Heading>
      <DndProvider backend={HTML5Backend}>
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
    </div>
  );
}

export default App;
