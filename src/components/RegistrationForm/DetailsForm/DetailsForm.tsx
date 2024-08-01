import { FormProvider, useForm } from 'react-hook-form';
import { isValidEmail } from '@src/utils/isValidEmail';
import { isValidName } from '@src/utils/isValidName';
import { isValidPhoneNumber } from '@src/utils/isValidPhoneNumber';

import {
	EMAIL_VALIDATION_ERROR,
	NAME_VALIDATION_ERROR,
	NEXT_BUTTON,
	PHONE_VALIDATION_ERROR,
	TITLE,
} from '../constants';
import { DateSelector } from '../DateSelector';
import { FloatingLabelInputField } from '../FloatingLabelInputField';
import { Button, Form, Title } from '../styled';

import { DetailsFormProps, FormData } from './types';

export const DetailsForm = ({ onSubmit }: DetailsFormProps) => {
	const methods = useForm<FormData>({
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			month: '',
			day: '',
			year: new Date().getFullYear(),
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		setError,
		clearErrors,
	} = methods;

	return (
		<FormProvider {...methods}>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Title>{TITLE}</Title>
				<FloatingLabelInputField
					id='name'
					label='Name'
					type='text'
					placeholder=' '
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
					id='phone'
					label='Phone number'
					type='text'
					placeholder=' '
					register={register}
					error={errors.phone}
					validationRules={{
						required: PHONE_VALIDATION_ERROR,
						validate: isValidPhoneNumber,
					}}
					setValue={setValue}
					setError={setError}
					clearErrors={clearErrors}
				/>
				<FloatingLabelInputField
					id='email'
					label='Email'
					type='text'
					placeholder=' '
					register={register}
					error={errors.email}
					validationRules={{
						required: EMAIL_VALIDATION_ERROR,
						validate: isValidEmail,
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
				<Button type='submit'>{NEXT_BUTTON}</Button>
			</Form>
		</FormProvider>
	);
};
