import { LIGHT } from '@constants/theme';
import { createSlice } from '@reduxjs/toolkit';

import { ThemeInitialState } from './types';

const initialState: ThemeInitialState = {
	mode: LIGHT,
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme: (state, action) => {
			state.mode = action.payload;
		},
	},
});

export const themeSliceReducer = themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
