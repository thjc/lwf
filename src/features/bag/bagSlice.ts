import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'
import { newGame } from '../board/boardSlice'

export interface BagState {
  tiles: string[]
}

const initialState: BagState = {
  // ['A-9, B-2, C-2, D-4, E-12, F-2, G-3, H-2, I-9, J-1, K-1, L-4, M-2, N-6, O-8, P-2, Q-1, R-6, S-4, T-6, U-4, V-2, W-2, X-1, Y-2, Z-1 and Blanks-2.'],

  // eslint-disable-next-line @typescript-eslint/no-array-constructor
  tiles: Array().concat(
    Array(2).fill(' '),
    Array(9).fill('A'),
    Array(2).fill('B'),
    Array(2).fill('C'),
    Array(4).fill('D'),
    Array(12).fill('E'),
    Array(2).fill('F'),
    Array(3).fill('G'),
    Array(2).fill('H'),
    Array(9).fill('I'),
    Array(1).fill('J'),
    Array(1).fill('K'),
    Array(4).fill('L'),
    Array(2).fill('M'),
    Array(6).fill('N'),
    Array(8).fill('O'),
    Array(2).fill('P'),
    Array(1).fill('Q'),
    Array(6).fill('R'),
    Array(4).fill('S'),
    Array(6).fill('T'),
    Array(4).fill('U'),
    Array(2).fill('V'),
    Array(2).fill('W'),
    Array(1).fill('X'),
    Array(2).fill('Y'),
    Array(1).fill('Z'))
}

export const bagSlice = createSlice({
  name: 'bag',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    takeTiles: (state) => {
      // Done in top level store scope
    },
    dumpTiles: (state) => {
      // Done in top level store scope
    }
  },
  extraReducers: (builder) => {
    builder.addCase(newGame, (state) => {
      return initialState
    })
  }
})

export const { dumpTiles, takeTiles } = bagSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectBag = (state: RootState) => state.bag

export default bagSlice.reducer
