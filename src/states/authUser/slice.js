import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';

const authUserSlice = createSlice({
  name: 'authUser',
  initialState: null,
  reducers: {
    // Reducer untuk menyimpan data user ke store
    setAuthUser: (state, action) => action.payload,
    // Reducer untuk menghapus data user (LOGOUT)
    unsetAuthUser: () => null,
  },
});

export const { setAuthUser, unsetAuthUser } = authUserSlice.actions;

export const asyncSetAuthUser = ({ email, password }) => async (dispatch) => {
  try {
    const token = await api.login({ email, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile(); 
    dispatch(setAuthUser(authUser));
  } catch (error) {
    alert(error.message);
  }
};

export default authUserSlice.reducer;