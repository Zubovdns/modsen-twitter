import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import ChangeImageIcon from '@assets/icons/EditProfile/ChangeImageIcon.svg';
import { Loader } from '@components/Loader';
import { useImageUploader } from '@hooks/useImageUploader';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectUserData } from '@store/selectors/user';
import { updateUserData } from '@store/thunks/userThunk';
import { isValidLoginNameAsync } from '@utils/isValidLoginNameAsync';
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
import { EditProfileFormType, EditProfileProps } from './types';

export const EditProfile = ({ onClose }: EditProfileProps) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector(selectUserData);
	const navigate = useNavigate();

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
		defaultValues: {
			profile_image: userData?.profile_image,
			background_profile_image: userData?.background_profile_image,
			name: userData?.name,
			login_name: userData?.login_name,
			bio: userData?.bio,
			month: userData?.birth_date?.toDate().getMonth(),
			day: userData?.birth_date?.toDate().getDay(),
			year: userData?.birth_date?.toDate().getFullYear(),
		},
	});

	const {
		register,
		handleSubmit,
		setValue,
		setError,
		clearErrors,
		formState: { errors },
		getValues,
	} = methods;

	const onSubmit = (data: EditProfileFormType) => {
		dispatch(updateUserData(data)).then(() => {
			onClose();
			navigate(data.login_name);
		});
	};

	const isSameLogin = () =>
		getValues('login_name') === userData?.login_name
			? () => true
			: isValidLoginNameAsync;

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
									onChange={(e) =>
										handleBannerChange(e, 'background_profile_image', setValue)
									}
								/>
							</EditImageButton>
						)}
					</EditBannerImageContainer>

					<EditProfileImageContainer>
						{!!avatar && <EditImage src={avatar} alt='Profile image' />}
						{isAvatarUploading ? (
							<LoaderContainer>
								<Loader />
							</LoaderContainer>
						) : (
							<EditImageButton as='label' htmlFor='avatar-input'>
								<EditImageIcon src={ChangeImageIcon} />
								<HiddenFileInput
									id='avatar-input'
									onChange={(e) =>
										handleAvatarChange(e, 'profile_image', setValue)
									}
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
						id='login_name'
						label='Login name'
						type='text'
						placeholder='Enter your login'
						register={register}
						error={errors.login_name}
						validationRules={{
							required: LOGIN_NAME_VALIDATION_ERROR,
							validate: isSameLogin(),
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
					<SubmitButton type='submit' disabled={isUploading}>
						Save
					</SubmitButton>
				</TextInformationContainer>
			</EditProfileContainer>
		</FormProvider>
	);
};
