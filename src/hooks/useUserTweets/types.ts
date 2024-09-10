import { TweetData } from '@src/interfaces/tweet';

export type UseUserTweetsReturnType = [
	TweetData[],
	boolean,
	React.Dispatch<React.SetStateAction<TweetData[]>>,
	() => Promise<void>
];
