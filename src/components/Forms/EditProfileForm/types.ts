import { UserData } from '@interfaces/user';

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

export type EditProfileFormType = Pick<
	UserData,
	| 'name'
	| 'email'
	| 'bio'
	| 'login_name'
	| 'profile_image'
	| 'background_profile_image'
> & {
	month: number;
	day: number;
	year: number;
};
