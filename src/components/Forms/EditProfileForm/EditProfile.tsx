import { Dispatch, SetStateAction, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ChangeImageIcon from '@assets/icons/EditProfile/ChangeImageIcon.svg';
import { Loader } from '@src/components/Loader';
import { isValidLoginName } from '@src/utils/isValidLoginName';
import { isValidName } from '@utils/isValidName';
import {
	getDownloadURL,
	getStorage,
	ref,
	uploadBytesResumable,
} from 'firebase/storage';

import { FloatingLabelInputField } from '../FloatingLabelInputField';
import { DateSelector } from '../RegistrationForm/DateSelector';

import {
	BIO_VALIDATION_ERROR,
	LOGIN_NAME_VALIDATION_ERROR,
	NAME_VALIDATION_ERROR,
} from './constants';
import {
	EditBannerImageContainer,
	EditHeaderContainer,
	EditImage,
	EditImageButton,
	EditImageIcon,
	EditProfileContainer,
	EditProfileImageContainer,
	HiddenFileInput,
	LoaderContainer,
	SubmitButton,
	TextInformationContainer,
} from './styled';
import { EditingProfileTypes, FormData } from './types';

export const EditProfile = ({ userData }: EditingProfileTypes) => {
	const [avatar, setAvatar] = useState(userData?.profile_image);
	const [banner, setBanner] = useState(userData?.background_profile_image);
	const [isUploading, setIsUploading] = useState(false);

	const methods = useForm<FormData>({
		defaultValues: {
			avatar: userData?.profile_image,
			banner: userData?.background_profile_image,
			name: userData?.name,
			loginName: userData?.login_name,
			bio: '',
			month: '',
			day: '',
			year: 0,
		},
	});

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = methods;

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	const handleImageChange = async (
		event: React.ChangeEvent<HTMLInputElement>,
		setImage: Dispatch<SetStateAction<string | null | undefined>>,
		field: 'avatar' | 'banner'
	) => {
		const file = event.target.files?.[0] || null;
		if (file) {
			setIsUploading(true);
			const storage = getStorage();
			const storageRef = ref(storage, `${field}_images/${file.name}`);
			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				() => {},
				(error) => {
					console.error('Image upload failed:', error);
					setIsUploading(false);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setImage(downloadURL);
						setValue(field, downloadURL);
						setIsUploading(false);
					});
				}
			);
		}
	};

	return (
		<FormProvider {...methods}>
			<EditProfileContainer onSubmit={handleSubmit(onSubmit)}>
				<EditHeaderContainer>
					<EditBannerImageContainer>
						{banner && <EditImage src={banner} alt='Banner image' />}
						{isUploading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							<EditImageButton as='label' htmlFor='banner-input'>
								<EditImageIcon src={ChangeImageIcon} />
								<HiddenFileInput
									id='banner-input'
									onChange={(e) => handleImageChange(e, setBanner, 'banner')}
								/>
							</EditImageButton>
						)}
					</EditBannerImageContainer>

					<EditProfileImageContainer>
						{avatar && <EditImage src={avatar} alt='Profile image' />}
						{isUploading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							<EditImageButton as='label' htmlFor='avatar-input'>
								<EditImageIcon src={ChangeImageIcon} />
								<HiddenFileInput
									id='avatar-input'
									onChange={(e) => handleImageChange(e, setAvatar, 'avatar')}
								/>
							</EditImageButton>
						)}
					</EditProfileImageContainer>
				</EditHeaderContainer>
				<TextInformationContainer>
					<FloatingLabelInputField
						id='name'
						label='Name'
						type='text'
						placeholder='Enter your name'
						register={register}
						error={errors.name}
						validationRules={{
							required: NAME_VALIDATION_ERROR,
							validate: isValidName,
						}}
						setValue={setValue}
						setError={setError}
						clearErrors={clearErrors}
					/>

					<FloatingLabelInputField
						id='loginName'
						label='Login name'
						type='text'
						placeholder='Enter your login'
						register={register}
						error={errors.loginName}
						validationRules={{
							required: LOGIN_NAME_VALIDATION_ERROR,
							validate: isValidLoginName,
						}}
						setValue={setValue}
						setError={setError}
						clearErrors={clearErrors}
					/>

					<FloatingLabelInputField
						id='bio'
						label='Bio'
						type='text'
						placeholder='Enter your bio'
						register={register}
						error={errors.bio}
						validationRules={{
							required: BIO_VALIDATION_ERROR,
							validate: isValidName,
						}}
						setValue={setValue}
						setError={setError}
						clearErrors={clearErrors}
					/>
					<DateSelector
						monthError={errors.month?.message}
						dayError={errors.day?.message}
						yearError={errors.year?.message}
					/>
				</TextInformationContainer>

				<SubmitButton type='submit' disabled={isUploading}>
					Save
				</SubmitButton>
			</EditProfileContainer>
		</FormProvider>
	);
};
