import { ReceivedUserData } from '@interfaces/user';

export interface ThemeInitialState {
	mode: string;
}

export interface UserInitialState {
	data: ReceivedUserData | null;
	status: 'idle' | 'loading' | 'lazy-loading' | 'succeeded' | 'failed';
	error: string | null;
}
