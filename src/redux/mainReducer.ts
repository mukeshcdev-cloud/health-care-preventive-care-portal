import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CounterState = {
  count: 0,
  loading: false,
  error: null
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    }
  }
});

export const { increment, decrement, setLoading, setError } = counterSlice.actions;

export default counterSlice.reducer;
