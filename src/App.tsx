import { Bag } from './features/bag/Bag';
import { Board } from './features/board/Board';
import { Hand } from './features/hand/Hand';
import { Players } from './features/player/Players';
import {
  Box,
  Flex,
  Heading,
} from 'rebass'

import './App.css';

function App() {
  return (
    <div>
      <Heading
        p={4}
        width={1}>
      Words with Crown
      </Heading>
      <Flex>
        <Box
          width={1/4}>
          <Bag />
          <Players />
          <Hand />
        </Box>
        <Box>
        <Board />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
