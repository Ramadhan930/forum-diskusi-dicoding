import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { setAuthUser } from '../authUser/slice';

const isPreloadSlice = createSlice({
  name: 'isPreload',
  initialState: true,
  reducers: {
    setIsPreload: (_, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = () => async (dispatch) => {
  // 1. Jalankan Loading Bar segera setelah fungsi dipanggil
  dispatch(showLoading());

  try {
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUser(authUser));
  } catch {
    dispatch(setAuthUser(null));
  } finally {
    // 2. Selesai proses, matikan preload state aplikasi
    dispatch(setIsPreload(false));
    // 3. Matikan Loading Bar (ini yang diminta reviewer)
    dispatch(hideLoading());
  }
};

export default isPreloadSlice.reducer;
