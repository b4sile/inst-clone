import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = { value: 0 };

const { actions, reducer } = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state, action: PayloadAction<string>) => {
      ++state.value;
    },
    decrease: (state) => {
      --state.value;
    },
  },
});

export const { increase, decrease } = actions;

export default reducer;
