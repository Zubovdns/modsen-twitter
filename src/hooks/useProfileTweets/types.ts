import { TweetData } from '@src/interfaces/tweet';

export type UseProfileTweetsReturnType = [
	TweetData[],
	boolean,
	React.Dispatch<React.SetStateAction<TweetData[]>>,
	() => Promise<void>
];
