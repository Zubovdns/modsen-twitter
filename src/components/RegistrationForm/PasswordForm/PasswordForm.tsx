import { useForm } from 'react-hook-form';
import { isValidPassword } from '@utils/isValidPassword';

import { PASSWORD_VALIDATION_ERROR, SUBMIT_BUTTON, TITLE } from '../constants';
import { FloatingLabelInputField } from '../FloatingLabelInputField';
import { Form, Title } from '../styled';
import { SubmitButton } from '../SubmitButton';

import { FormData, PasswordFormProps } from './types';

export const PasswordForm = ({ onSubmit }: PasswordFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		setValue,
		setError,
		clearErrors,
	} = useForm<FormData>({
		defaultValues: {
			password: '',
		},
	});

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Title>{TITLE}</Title>
			<FloatingLabelInputField
				id='password'
				label='Password'
				type='password'
				placeholder=' '
				register={register}
				error={errors.password}
				validationRules={{
					required: PASSWORD_VALIDATION_ERROR,
					validate: isValidPassword,
				}}
				setValue={setValue}
				setError={setError}
				clearErrors={clearErrors}
			/>
			<SubmitButton isSubmitting={isSubmitting} buttonText={SUBMIT_BUTTON} />
		</Form>
	);
};
