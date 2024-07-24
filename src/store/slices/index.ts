import { combineReducers } from '@reduxjs/toolkit';

import { themeSliceReducer } from './theme';

export const rootReducer = combineReducers({
	theme: themeSliceReducer,
});
