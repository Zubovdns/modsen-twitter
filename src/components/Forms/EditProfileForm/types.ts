import { UserData } from '@interfaces/user';

export interface EditProfileProps {
	onClose: () => void;
}

export type EditProfileFormType = Pick<
	UserData,
	'name' | 'bio' | 'login_name' | 'profile_image' | 'background_profile_image'
> & {
	month: number;
	day: number;
	year: number;
};
