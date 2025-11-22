import { medicalHealthTips } from "./../constants/healthTips";
import {
  configureStore,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { DayOfWeek } from "../constants/days";

type ReduxState = {
  count: number;
  loading: boolean;
  error: string | null;
  healthTip: string;
  patientDashboard: {
    stepsTaken: number | null;
    sleepHours: { day: DayOfWeek; value: number }[];
    waterIntake: number | null;
    calories: number | null;
    hydration: number | null;
    reminders: { id: number; title: string; date: string }[];
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
  healthTip:
    medicalHealthTips[Math.floor(Math.random() * medicalHealthTips.length)],
  patientDashboard: {
    stepsTaken: 7500,
    sleepHours: [
      { day: "Monday", value: 2 },
      { day: "Tuesday", value: 8 },
      { day: "Wednesday", value: 10 },
      { day: "Thursday", value: 2 },
      { day: "Friday", value: 5 },
      { day: "Saturday", value: 10 },
      { day: "Sunday", value: 5 },
    ],
    waterIntake: 7.5,
    calories: 600,
    hydration: 1.5,
    reminders: [
      { id: 1, title: "Annual Blood Test", date: "25 Jan 2025" },
      { id: 2, title: "Dental Checkup", date: "10 Feb 2025" },
      { id: 3, title: "Eye Examination", date: "15 Feb 2025" },
    ],
  },
};

const counterSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    reminderAccomplished: (state, action) => {
      state.patientDashboard.reminders =
        state.patientDashboard.reminders.filter(
          ({ id }) => id !== action.payload
        );
    },
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

export const {
  increment,
  decrement,
  setLoading,
  setError,
  reminderAccomplished,
} = counterSlice.actions;

export default counterSlice.reducer;
export const store = configureStore({
  reducer: { root: counterSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
