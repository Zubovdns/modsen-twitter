import { createSlice } from '@reduxjs/toolkit';
import {
	fetchUserData,
	fetchUserDataWithLoginViaEmail,
	fetchUserDataWithLoginViaGoogle,
	fetchUserDataWithRegistrationViaEmail,
	follow,
	logOut,
	updateUserData,
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
		updateUserData: (state, action) => {
			if (state.data) {
				state.data = { ...state.data, ...action.payload };
			} else {
				state.data = action.payload;
			}
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
			.addCase(fetchUserDataWithRegistrationViaEmail.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(
				fetchUserDataWithRegistrationViaEmail.fulfilled,
				(state, action) => {
					state.status = 'succeeded';
					state.data = action.payload;
				}
			)
			.addCase(
				fetchUserDataWithRegistrationViaEmail.rejected,
				(state, action) => {
					state.status = 'failed';
					state.error = action.error.message || 'Failed to fetch user data';
				}
			)
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
			})
			.addCase(logOut.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logOut.fulfilled, (state) => {
				state.status = 'succeeded';
				state.data = null;
			})
			.addCase(logOut.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			})
			.addCase(follow.pending, (state) => {
				state.status = 'lazy-loading';
			})
			.addCase(follow.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(follow.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			})
			.addCase(updateUserData.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(updateUserData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(updateUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message || 'Failed to fetch user data';
			});
	},
});

export const userSliceReducer = userSlice.reducer;
export const { clearUserData } = userSlice.actions;
