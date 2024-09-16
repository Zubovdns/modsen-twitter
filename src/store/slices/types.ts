import { ReceivedUserData } from '@interfaces/user';

export interface ThemeInitialState {
	mode: string;
}

export interface UserInitialState {
	data: ReceivedUserData | null;
	status: status;
	error: string | null;
}

export enum status {
	IDLE = 'idle',
	LOADING = 'loading',
	LAZY_LOADING = 'lazy-loading',
	SUCCEEDED = 'succeeded',
	FAILED = 'failed',
}
