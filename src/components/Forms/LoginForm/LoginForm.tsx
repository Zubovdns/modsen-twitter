import { useForm } from 'react-hook-form';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { auth, db } from '@src/firebase';
import { SIGN_UP_ROUTE } from '@src/routes';
import { requiredField } from '@src/utils/requiredField';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

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

	const onSubmit = async (data: FormData) => {
		const { login, password } = data;
		try {
			const isEmail = login.includes('@');
			const usersRef = collection(db, 'users');
			const q = query(
				usersRef,
				where(isEmail ? 'email' : 'phone_number', '==', login)
			);
			const querySnapshot = await getDocs(q);

			if (querySnapshot.empty) {
				console.log('Пользователь не найден');
				return;
			}

			const userDoc = querySnapshot.docs[0];
			const userData = userDoc.data();

			await signInWithEmailAndPassword(auth, userData.email, password);
		} catch (error) {
			console.log('Неверные данные для входа', error);
		}
	};

	return (
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
				<SubmitButton isSubmitting={isSubmitting} buttonText={SUBMIT_BUTTON} />
				<LinkTo to={SIGN_UP_ROUTE}>Sign up to Twitter</LinkTo>
			</Form>
		</FormWrapper>
	);
};
