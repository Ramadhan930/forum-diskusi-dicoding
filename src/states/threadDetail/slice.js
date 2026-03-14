import { createSlice } from '@reduxjs/toolkit';
import api from '../../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState: null,
  reducers: {
    receiveThreadDetail: (_, action) => action.payload,
    clearThreadDetail: () => null,
    addComment: (state, action) => {
      state.comments.unshift(action.payload);
    },
  },
});

export const { receiveThreadDetail, clearThreadDetail, addComment } = threadDetailSlice.actions;

// Thunk untuk ambil detail thread dari API
export const asyncReceiveThreadDetail = (threadId) => async (dispatch) => {
  dispatch(showLoading());
  dispatch(clearThreadDetail()); // Bersihkan data lama
  try {
    const threadDetail = await api.getThreadDetail(threadId); // Kita tambah di api.js nanti
    dispatch(receiveThreadDetail(threadDetail));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

// Thunk untuk kirim komentar
export const asyncAddComment = ({ threadId, content }) => async (dispatch) => {
  dispatch(showLoading());
  try {
    const comment = await api.createComment({ threadId, content }); // Kita tambah di api.js nanti
    dispatch(addComment(comment));
  } catch (error) {
    alert(error.message);
  } finally {
    dispatch(hideLoading());
  }
};

export default threadDetailSlice.reducer;