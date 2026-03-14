import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { receiveUsers } from '../users/slice';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const threadsSlice = createSlice({
  name: 'threads',
  initialState: [],
  reducers: {
    receiveThreads: (_, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
  },
});

export const { receiveThreads, addThread } = threadsSlice.actions;

// PASTIKAN HANYA ADA SATU VERSI INI:
export const asyncPopulateUsersAndThreads = () => async (dispatch) => {
  dispatch(showLoading());
  try {
    const [users, threads] = await Promise.all([
      api.getAllUsers(),
      api.getAllThreads(),
    ]);
    
    dispatch(receiveUsers(users));
    dispatch(receiveThreads(threads));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

// DAN SATU VERSI INI:
export const asyncAddThread = ({ title, body, category = '' }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const thread = await api.createThread({ title, body, category });
    dispatch(addThread(thread));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default threadsSlice.reducer;