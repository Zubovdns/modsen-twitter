import { Timestamp } from 'firebase/firestore';

export interface UserData {
	name: string;
	email: string;
	bio: string | null;
	followers: string[];
	following: string[];
	login_name: string;
	birth_date: Timestamp | null;
	phone_number: string | null;
	profile_image: string | null;
	background_profile_image: string | null;
}

export interface ReceivedUserData extends UserData {
	id: string;
}
