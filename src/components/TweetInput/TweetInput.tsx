import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

import { createTweet } from '@api/firebase/firestore';
import DeleteImageIcon from '@assets/icons/TweetInput/DeleteImageIcon.svg';
import SelectImageIcon from '@assets/icons/TweetInput/SelectImageIcon.svg';
import { useNotification } from '@hooks/useNotification';
import { TweetInputData } from '@interfaces/tweet';
import { useAppSelector } from '@store/hooks';
import { selectUserData } from '@store/selectors/user';
import { isTweetButtonDisabled } from '@utils/isTweetButtonDisabled';

import { INPUT_PLACEHOLDER, TWEET_BUTTON_NAME } from './constants';
import {
	Avatar,
	AvatarContainer,
	DeleteIcon,
	HiddenFileInput,
	ImageContainer,
	ImagePreview,
	Input,
	InputForm,
	InputOptions,
	LoadingSpinner,
	OptionButton,
	OptionIcon,
	OptionsGroup,
	TweetButton,
	UserTweetAvatarWrapper,
	UserTweetContainer,
} from './styled';
import { TweetInputProps } from './types';

export const TweetInput = ({ onTweetClick, setTweets }: TweetInputProps) => {
	const { control, handleSubmit, setValue, watch } = useForm<TweetInputData>({
		defaultValues: {
			text: '',
			image: null,
			imageUrl: null,
		},
	});

	const userData = useAppSelector(selectUserData);
	const [showNotification, NotificationComponent] = useNotification();
	const [isUploading, setIsUploading] = useState(false);

	const text = watch('text');
	const image = watch('image');

	const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setValue('image', file);
			setIsUploading(true);
			const storage = getStorage();
			const storageRef = ref(storage, `tweet_images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				() => {},
				() => {
					showNotification('Image upload failed');
					setIsUploading(false);
					setValue('image', null);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setValue('imageUrl', downloadURL);
						setIsUploading(false);
					});
				}
			);
		}
	};

	const handleDeleteImage = () => {
		setValue('image', null);
		setValue('imageUrl', null);
		setIsUploading(false);
	};

	const onSubmit = async (data: TweetInputData) => {
		try {
			await createTweet(data);

			onTweetClick?.();
			setTweets?.();

			setValue('text', '');
			setValue('image', null);
			setValue('imageUrl', null);
		} catch (error) {
			showNotification('Error with creating tweet');
		}
	};

	return (
		<>
			<UserTweetContainer id='tweet-input-container'>
				<UserTweetAvatarWrapper>
					<AvatarContainer>
						<Avatar src={userData?.profile_image || undefined} />
					</AvatarContainer>
				</UserTweetAvatarWrapper>

				<InputForm onSubmit={handleSubmit(onSubmit)}>
					<Controller
						name='text'
						control={control}
						render={({ field }) => (
							<Input placeholder={INPUT_PLACEHOLDER} {...field} />
						)}
					/>
					{(isUploading || image) && (
						<ImageContainer>
							<DeleteIcon onClick={handleDeleteImage} src={DeleteImageIcon} />
							{isUploading ? (
								<LoadingSpinner />
							) : (
								image && (
									<ImagePreview
										src={URL.createObjectURL(image)}
										alt='Selected image'
									/>
								)
							)}
						</ImageContainer>
					)}
					<InputOptions>
						<OptionsGroup>
							<OptionButton type='button'>
								<OptionIcon as='label'>
									<OptionIcon src={SelectImageIcon} />
									<HiddenFileInput onChange={handleImageChange} />
								</OptionIcon>
							</OptionButton>
						</OptionsGroup>
						<TweetButton
							type='submit'
							disabled={isTweetButtonDisabled(text, isUploading)}
						>
							{TWEET_BUTTON_NAME}
						</TweetButton>
					</InputOptions>
				</InputForm>
			</UserTweetContainer>
			<NotificationComponent />
		</>
	);
};
