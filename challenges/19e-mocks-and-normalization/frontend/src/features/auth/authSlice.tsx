import { createSlice } from '@reduxjs/toolkit';
import { TRootState } from 'app/store';
import { IUserState } from 'common/types/user.interface';

const initialState: IUserState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: TRootState) => state.auth.user;
export const selectCurrentToken = (state: TRootState) => state.auth.token;
