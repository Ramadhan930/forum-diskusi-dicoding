import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/slice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true, // Defaultnya true (sedang loading ngecek data)
  reducers: {
    setIsPreload: (_, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = () => async (dispatch) => {
  try {
    // 1. Ambil data user yang sedang login dari API
    const authUser = await api.getOwnProfile(); // Kita perlu tambah fungsi ini di api.js nanti
    dispatch(setAuthUser(authUser));
  } catch {
    dispatch(setAuthUser(null));
  } finally {
    // 2. Selesai ngecek, set preload jadi false
    dispatch(setIsPreload(false));
  }
};

export default isPreloadSlice.reducer;