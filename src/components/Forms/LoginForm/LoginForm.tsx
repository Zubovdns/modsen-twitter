import { useForm } from 'react-hook-form';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { SIGN_UP_ROUTE } from '@src/routes';

import { FloatingLabelInputField } from '../FloatingLabelInputField';
import { SubmitButton } from '../RegistrationForm/SubmitButton';
import { Form, FormWrapper, LinkTo, Logo, Title } from '../styled';

import { SUBMIT_BUTTON, TITLE } from './constants';
import { FormData } from './types';

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<FormData>({
		defaultValues: {
			login: '',
			password: '',
		},
	});

	const onSubmit = (data: FormData) => {
		console.log(data);
	};

	return (
		<FormWrapper>
			<Logo src={TwitterLogo} />
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Title>{TITLE}</Title>
				<FloatingLabelInputField
					id='login'
					label='Phone number, email address'
					type='login'
					placeholder=' '
					register={register}
					error={errors.login}
					setValue={setValue}
					setError={setError}
					clearErrors={clearErrors}
					validationRules={undefined}
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
					validationRules={undefined}
				/>
				<SubmitButton isSubmitting={isSubmitting} buttonText={SUBMIT_BUTTON} />
				<LinkTo to={SIGN_UP_ROUTE}>Sign up to Twitter</LinkTo>
			</Form>
		</FormWrapper>
	);
};
