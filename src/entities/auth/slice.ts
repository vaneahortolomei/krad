import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Описываем интерфейс состояния
interface UserState {
  isLoggedIn: boolean;
  name: string | null;
  email: string | null;
}

// 2. Начальное состояние
const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  email: null
};

// 3. createSlice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Нужно (state, action) в сигнатуре, а не только (state)
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string }>
    ) => {
      state.isLoggedIn = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.name = null;
      state.email = null;
    }
  }
});

// 4. Экспортируем экшены и редьюсер
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
