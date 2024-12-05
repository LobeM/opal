import { createSlice } from '@reduxjs/toolkit';

type initialStateProps = {
  workspaces: {
    id: string;
    name: string;
    type: 'PERSONAL' | 'PUBLIC';
  }[];
};

const initialState: initialStateProps = {
  workspaces: [],
};

export const Workspaces = createSlice({
  name: 'workspaces',
  initialState,
  reducers: {
    WORKSPACES: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACES } = Workspaces.actions;
export default Workspaces.reducer;
