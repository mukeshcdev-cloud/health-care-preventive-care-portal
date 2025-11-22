import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { DayOfWeek } from "../constants/days";

type ReduxState = {
  count: number;
  loading: boolean;
  error: string | null;
  patientDashboard: {
    stepsTaken: number | null;
    sleepHours: { day: DayOfWeek; value: number }[];
  };
};

const DaysObject: Record<DayOfWeek, number | null> = {
  Monday: null,
  Tuesday: null,
  Wednesday: null,
  Thursday: null,
  Friday: null,
  Saturday: null,
  Sunday: null,
};
const initialState: ReduxState = {
  count: 0,
  loading: false,
  error: null,
  patientDashboard: {
    stepsTaken: null,
    sleepHours: [
      { day: "Monday", value: 12 },
      { day: "Tuesday", value: 18 },
      { day: "Wednesday", value: 10 },
      { day: "Thursday", value: 22 },
      { day: "Friday", value: 15 },
      { day: "Saturday", value: 30 },
      { day: "Sunday", value: 25 },
    ],
    waterIntake: "",
    calories: "",
  },
};

const counterSlice = createSlice({
  name: "root",
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
    },
  },
});

export const { increment, decrement, setLoading, setError } =
  counterSlice.actions;

export default counterSlice.reducer;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
