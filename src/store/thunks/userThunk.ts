import {
	followUser,
	getUserData,
	loginViaEmail,
	loginViaGoogle,
	registerViaEmail,
	unfollowUser,
	updateUserDataWithAnotherData,
} from '@api/firebase/auth';
import { EditProfileFormType } from '@components/Forms/EditProfileForm/types';
import { LoginData } from '@interfaces/login';
import { RegistrationData } from '@interfaces/registration';
import { ReceivedUserData } from '@interfaces/user';
import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '../types';

export const fetchUserData: AsyncThunk<
	ReceivedUserData | null,
	void,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserData', async () => {
	const userData = await getUserData();
	return userData;
});

export const fetchUserDataWithLoginViaGoogle: AsyncThunk<
	ReceivedUserData | null,
	void,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserDataWithLoginViaGoogle', async () => {
	await loginViaGoogle();
	const userData = await getUserData();
	return userData;
});

export const fetchUserDataWithRegistrationViaEmail: AsyncThunk<
	ReceivedUserData | null,
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
	ReceivedUserData | null,
	LoginData,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserDataWithLoginViaEmail', async (data) => {
	await loginViaEmail(data);
	const userData = await getUserData();
	return userData;
});

export const logOut: AsyncThunk<void, void, { state: RootState }> =
	createAsyncThunk('user/logOut', async () => {
		logOut();
	});

export const follow: AsyncThunk<
	ReceivedUserData | null,
	{ login_name: string; isFollowed: boolean },
	{ state: RootState }
> = createAsyncThunk('user/follow', async ({ login_name, isFollowed }) => {
	if (isFollowed) {
		await unfollowUser(login_name);
	} else {
		await followUser(login_name);
	}
	const userData = await getUserData();
	return userData;
});

export const updateUserData: AsyncThunk<
	ReceivedUserData | null,
	EditProfileFormType,
	{ state: RootState }
> = createAsyncThunk('user/updateUserData', async (data) => {
	await updateUserDataWithAnotherData(data);
	const userData = await getUserData();
	return userData;
});
