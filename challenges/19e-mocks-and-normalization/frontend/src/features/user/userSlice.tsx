import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  isLoggedIn: false,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const userDataSel = (state) => state.user.data;

export const { setStatus } = userSlice.actions;

export default userSlice.reducer;
