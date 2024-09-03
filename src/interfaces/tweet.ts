import { Timestamp } from 'firebase/firestore';

import { UserData } from './user';

export interface TweetInputData {
	text: string;
	image: File | null;
	imageUrl: string | null;
}

export interface TweetData {
	id: string;
	text: string;
	image_url: string;
	publish_time: Timestamp;
	likes_user_id: string[];
	user_id: string;
	user: UserData;
}
