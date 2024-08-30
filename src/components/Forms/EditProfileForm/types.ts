import { UserData } from '../../../pages/Profile/types';

export type EditingProfileTypes = {
	userData: UserData | null;
};

export interface FormData {
	avatar: string | null;
	banner: string | null;
	name: string;
	loginName: string;
	bio: string;
	month: string;
	day: string;
	year: number;
}
