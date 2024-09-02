import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import { getUserData, UserData } from '@src/firebase/firebaseService';

import { RootState } from '../types';

export const fetchUserData: AsyncThunk<
	UserData | null,
	void,
	{ state: RootState }
> = createAsyncThunk('user/fetchUserData', async () => {
	const userData = await getUserData();
	return userData;
});
