export type TweetItemProps = {
	text: string;
	avatarUrl: string;
	userName: string;
	userLogin: string;
	publishDate: Date;
	liked: boolean;
	image?: string;
	likesAmount: number;
	id: string;
	userId: string;
	onDeleteTweet: (tweetId: string) => void;
};
