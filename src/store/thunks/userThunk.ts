import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, loginViaGoogle } from '@src/firebase/firebaseService';
import { UserData } from '@src/interfaces/user';

import { RootState } from '../types';

export const fetchUserData: AsyncThunk<
	UserData | null,
	void,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserData', async () => {
	const userData = await getUserData();
	return userData;
});

export const fetchUserDataWithLoginViaGoogle: AsyncThunk<
	UserData | null,
	void,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserDataWithLoginViaGoogle', async () => {
	await loginViaGoogle();
	const userData = await getUserData();
	return userData;
});
