import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice';
import bagReducer from '../features/bag/bagSlice';
import playersReducer from '../features/player/playersSlice';

export const store = configureStore({
  reducer: {
    board: boardReducer,
    bag: bagReducer,
    players: playersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
