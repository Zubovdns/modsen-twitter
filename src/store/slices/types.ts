import { UserData } from '@interfaces/user';

export interface ThemeInitialState {
	mode: string;
}

export interface UserInitialState {
	data: UserData | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}
