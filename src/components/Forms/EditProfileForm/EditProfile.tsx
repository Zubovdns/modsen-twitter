import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ChangeImageIcon from '@assets/icons/EditProfile/ChangeImageIcon.svg';
import { Loader } from '@src/components/Loader';
import { useImageUploader } from '@src/hooks/useImageUploader';
import { isValidLoginName } from '@src/utils/isValidLoginName';
import { isValidName } from '@utils/isValidName';

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
	const {
		image: avatar,
		isUploading: isAvatarUploading,
		handleImageChange: handleAvatarChange,
	} = useImageUploader(userData?.profile_image || null);
	const {
		image: banner,
		isUploading: isBannerUploading,
		handleImageChange: handleBannerChange,
	} = useImageUploader(userData?.background_profile_image || null);

	const methods = useForm<FormData>({
		defaultValues: useMemo(
			() => ({
				avatar: userData?.profile_image,
				banner: userData?.background_profile_image,
				name: userData?.name,
				loginName: userData?.login_name,
				bio: userData?.bio || '',
				month: '',
				day: '',
				year: 0,
			}),
			[userData]
		),
	});

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
	} = methods;

	const onSubmit = useCallback((data: FormData) => {
		console.log(data);
	}, []);

	const isUploading = isAvatarUploading || isBannerUploading;

	return (
		<FormProvider {...methods}>
			<EditProfileContainer onSubmit={handleSubmit(onSubmit)}>
				<EditHeaderContainer>
					<EditBannerImageContainer>
						{banner && <EditImage src={banner} alt='Banner image' />}
						{isBannerUploading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							<EditImageButton as='label' htmlFor='banner-input'>
								<EditImageIcon src={ChangeImageIcon} />
								<HiddenFileInput
									id='banner-input'
									onChange={(e) => handleBannerChange(e, 'banner', setValue)}
								/>
							</EditImageButton>
						)}
					</EditBannerImageContainer>

					<EditProfileImageContainer>
						{avatar && <EditImage src={avatar} alt='Profile image' />}
						{isAvatarUploading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							<EditImageButton as='label' htmlFor='avatar-input'>
								<EditImageIcon src={ChangeImageIcon} />
								<HiddenFileInput
									id='avatar-input'
									onChange={(e) => handleAvatarChange(e, 'avatar', setValue)}
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
