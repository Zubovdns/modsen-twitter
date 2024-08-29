export type Tweet = {
	id: string;
	text: string;
	image_url: string | undefined;
	publish_time: { seconds: number };
	user_id: string;
	likes_user_id: string[];
};

export type UseProfileTweetsReturnType = [
	Tweet[],
	boolean,
	React.Dispatch<React.SetStateAction<Tweet[]>>
];
