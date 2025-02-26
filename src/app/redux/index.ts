import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/entities/auth/slice';

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});

// Если TypeScript, можно экспортировать типы (кастомные хуки ниже за ними потянуться):
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
