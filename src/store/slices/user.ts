import { createSlice } from '@reduxjs/toolkit';
import {
	fetchUserData,
	fetchUserDataWithLoginViaEmail,
	fetchUserDataWithLoginViaGoogle,
} from '@store/thunks/userThunk';

import { UserInitialState } from './types';

const initialState: UserInitialState = {
	data: null,
	status: 'idle',
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUserData: (state) => {
			state.data = null;
			state.status = 'idle';
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			})
			.addCase(fetchUserDataWithLoginViaGoogle.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserDataWithLoginViaGoogle.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchUserDataWithLoginViaGoogle.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			})
			.addCase(fetchUserDataWithLoginViaEmail.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUserDataWithLoginViaEmail.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchUserDataWithLoginViaEmail.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			});
	},
});

export const userSliceReducer = userSlice.reducer;
export const { clearUserData } = userSlice.actions;
