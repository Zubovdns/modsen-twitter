import { FormProvider, useForm } from 'react-hook-form';

import { DetailsRegistrationData } from '@interfaces/registration';
import { isValidEmailAsync } from '@utils/isValidEmailAsync';
import { isValidName } from '@utils/isValidName';
import { isValidPhoneNumber } from '@utils/isValidPhoneNumber';

import { FloatingLabelInputField } from '../../FloatingLabelInputField';
import { Form, Title } from '../../styled';
import {
	EMAIL_VALIDATION_ERROR,
	NAME_VALIDATION_ERROR,
	NEXT_BUTTON,
	PHONE_VALIDATION_ERROR,
	TITLE,
} from '../constants';
import { DateSelector } from '../DateSelector';
import { SubmitButton } from '../SubmitButton';

import { DetailsFormProps } from './types';

export const DetailsForm = ({ onSubmit }: DetailsFormProps) => {
	const methods = useForm<DetailsRegistrationData>({
		defaultValues: {
			name: '',
			phone: '',
			email: '',
			month: null!,
			day: null!,
			year: new Date().getFullYear(),
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
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
						validate: isValidEmailAsync,
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
				<SubmitButton isSubmitting={isSubmitting} buttonText={NEXT_BUTTON} />
			</Form>
		</FormProvider>
	);
};
