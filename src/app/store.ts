import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/board/boardSlice';
import bagReducer from '../features/bag/bagSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    board: boardReducer,
    bag: bagReducer,
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
