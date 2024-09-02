import { RegistrationData } from '@interfaces/registration';
import { UserData } from '@interfaces/user';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import {
	getUserData,
	loginViaEmail,
	loginViaGoogle,
	registerViaEmail,
} from '@src/firebase/firebaseService';
import { LoginData } from '@src/interfaces/login';

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

export const fetchUserDataWithRegistrationViaEmail: AsyncThunk<
	UserData | null,
	RegistrationData,
	{ state: RootState }
> = createAsyncThunk(
	'user/fetchUserDataWithRegistrationViaEmail',
	async (data) => {
		await registerViaEmail(data);
		const userData = await getUserData();
		return userData;
	}
);

export const fetchUserDataWithLoginViaEmail: AsyncThunk<
	UserData | null,
	LoginData,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserDataWithLoginViaEmail', async (data) => {
	await loginViaEmail(data);
	const userData = await getUserData();
	return userData;
});
