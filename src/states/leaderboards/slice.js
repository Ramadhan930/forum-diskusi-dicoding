import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
// 1. Tambahkan import loading bar
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState: [],
  reducers: {
    receiveLeaderboards: (state, action) => action.payload,
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export const asyncReceiveLeaderboards = () => async (dispatch) => {
  // 2. Jalankan loading bar
  dispatch(showLoading());
  try {
    const leaderboards = await api.getLeaderboards();
    dispatch(receiveLeaderboards(leaderboards));
  } catch (error) {
    alert(error.message);
  } finally {
    // 3. Pastikan selalu ditutup di blok finally
    dispatch(hideLoading());
  }
};

export default leaderboardsSlice.reducer;