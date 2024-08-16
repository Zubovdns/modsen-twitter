import { ChangeEvent, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import DeleteImageIcon from '@assets/icons/Tweet/DeleteImageIcon.svg';
import SelectImageIcon from '@assets/icons/Tweet/SelectImageIcon.svg';
import { useNotification } from '@hooks/useNotification';
import { isTweetButtonDisabled } from '@src/utils/isTweetButtonDisabled';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

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
import { FormData, TweetInputProps } from './types';

export const TweetInput = ({ avatarUrl }: TweetInputProps) => {
	const { control, handleSubmit, setValue, watch } = useForm<FormData>({
		defaultValues: {
			text: '',
			image: null,
			imageUrl: null,
		},
	});

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

	const onSubmit = (data: FormData) => {
		// Handle form submission
		console.log(data);
	};

	return (
		<>
			<UserTweetContainer>
				<UserTweetAvatarWrapper>
					<AvatarContainer>
						<Avatar src={avatarUrl || undefined} />
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
