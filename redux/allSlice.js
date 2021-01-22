import { createSlice } from "@reduxjs/toolkit";

export const allSlice = createSlice({
  name: "all",
  initialState: {
    users: undefined,
    due: undefined,
    winner: undefined,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setDue: (state, action) => {
      state.due = action.payload;
    },
    setWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});
export const { setUsers, setDue, setWinner } = allSlice.actions;
export default allSlice.reducer;
export const selectAll = (state) => state.all;
