import { Timestamp } from 'firebase/firestore';

export type TweetItemProps = {
	text: string;
	avatarUrl: string | null;
	userName: string;
	userLogin: string;
	publishDate: Timestamp;
	likesArray: string[];
	image?: string;
	likesAmount: number;
	id: string;
	userId: string;
	onDeleteTweet: (tweetId: string) => void;
};
