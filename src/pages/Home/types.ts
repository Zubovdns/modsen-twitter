export type User = {
	id: string;
	name: string;
	login_name: string;
	profile_image: string;
};

export type Tweet = {
	id: string;
	text: string;
	image_url: string;
	publish_time: { seconds: number };
	user_id: string;
	likes_user_id: string[];
	user?: User;
};
