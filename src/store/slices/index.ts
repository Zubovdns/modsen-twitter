import { combineReducers } from '@reduxjs/toolkit';

import { themeSliceReducer } from './theme';
import { userSliceReducer } from './user';

export const rootReducer = combineReducers({
	theme: themeSliceReducer,
	user: userSliceReducer,
});
