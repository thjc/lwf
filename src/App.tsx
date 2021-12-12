import { Board } from './features/board/Board';
import { Bag } from './features/bag/Bag';
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
        </Box>
        <Box>
        <Board />
        </Box>
      </Flex>
    </div>
  );
}

export default App;
