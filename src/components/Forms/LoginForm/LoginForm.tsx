import { useForm } from 'react-hook-form';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { useNotification } from '@hooks/useNotification';
import { LoginData } from '@interfaces/login';
import { SIGN_UP_ROUTE } from '@src/routes';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { selectUserError, selectUserStatus } from '@src/store/selectors/user';
import { fetchUserDataWithLoginViaEmail } from '@src/store/thunks/userThunk';
import { status } from '@store/slices/types';
import { requiredField } from '@utils/requiredField';

import { FloatingLabelInputField } from '../FloatingLabelInputField';
import { SubmitButton } from '../RegistrationForm/SubmitButton';
import { Form, FormWrapper, LinkTo, Logo, Title } from '../styled';

import { SUBMIT_BUTTON, TITLE } from './constants';

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<LoginData>({
		defaultValues: {
			login: '',
			password: '',
		},
	});

	const [showNotification, NotificationComponent] = useNotification();

	const dispatch = useAppDispatch();
	const userError = useAppSelector(selectUserError);
	const userStatus = useAppSelector(selectUserStatus);

	const onSubmit = async (data: LoginData) => {
		dispatch(fetchUserDataWithLoginViaEmail(data)).then(() => {
			if (userStatus === status.FAILED && userError !== null) {
				showNotification(userError);
			}
		});
	};

	return (
		<>
			<FormWrapper>
				<Logo src={TwitterLogo} />
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Title>{TITLE}</Title>
					<FloatingLabelInputField
						id='login'
						label='Phone number, email address'
						type='text'
						placeholder=' '
						register={register}
						error={errors.login}
						setValue={setValue}
						setError={setError}
						clearErrors={clearErrors}
						validationRules={{
							validate: requiredField,
						}}
					/>
					<FloatingLabelInputField
						id='password'
						label='Password'
						type='password'
						placeholder=' '
						register={register}
						error={errors.password}
						setValue={setValue}
						setError={setError}
						clearErrors={clearErrors}
						validationRules={{
							validate: requiredField,
						}}
					/>
					<SubmitButton
						isSubmitting={isSubmitting && userStatus === status.LOADING}
						buttonText={SUBMIT_BUTTON}
					/>
					<LinkTo to={SIGN_UP_ROUTE}>Sign up to Twitter</LinkTo>
				</Form>
			</FormWrapper>
			<NotificationComponent />
		</>
	);
};
