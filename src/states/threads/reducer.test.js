import { describe, it, expect } from 'vitest';
import threadsReducer from './slice';

describe('threadsReducer', () => {
  it('should return the initial state when given an unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given receiveThreads action', () => {
    const initialState = [];
    const action = {
      type: 'threads/receiveThreads',
      payload: [
        { id: 'thread-1', title: 'Thread Test' },
      ],
    };
    const nextState = threadsReducer(initialState, action);
    expect(nextState).toEqual(action.payload);
  });
});