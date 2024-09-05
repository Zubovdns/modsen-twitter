import { useCallback, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ChangeImageIcon from '@assets/icons/EditProfile/ChangeImageIcon.svg';
import { Loader } from '@components/Loader';
import { useImageUploader } from '@hooks/useImageUploader';
import { useAppSelector } from '@store/hooks';
import { selectUserData } from '@store/selectors/user';
import { isValidLoginName } from '@utils/isValidLoginName';
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
import { EditProfileFormType } from './types';

export const EditProfile = () => {
	const userData = useAppSelector(selectUserData);

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

	const methods = useForm<EditProfileFormType>({
		defaultValues: useMemo(
			() => ({
				avatar: userData?.profile_image,
				banner: userData?.background_profile_image,
				name: userData?.name,
				loginName: userData?.login_name,
				bio: userData?.bio,
				month: userData?.birth_date?.toDate().getMonth(),
				day: userData?.birth_date?.toDate().getDay(),
				year: userData?.birth_date?.toDate().getFullYear(),
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

	const onSubmit = useCallback((data: EditProfileFormType) => {
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
						error={errors.login_name}
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
