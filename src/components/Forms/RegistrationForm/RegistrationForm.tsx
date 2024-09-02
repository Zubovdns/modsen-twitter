import { useState } from 'react';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import {
	DetailsRegistrationData,
	PasswordRegistrationData,
} from '@interfaces/registration';
import { useAppDispatch } from '@store/hooks';
import { fetchUserDataWithRegistrationViaEmail } from '@store/thunks/userThunk';

import { FormWrapper, Logo } from '../styled';

import { DetailsForm } from './DetailsForm';
import { PasswordForm } from './PasswordForm';

export const RegistrationForm = () => {
	const [step, setStep] = useState<'details' | 'password'>('details');
	const [formData, setFormData] = useState<DetailsRegistrationData>(null!);

	const dispatch = useAppDispatch();

	const handleDetailsSubmit = (data: DetailsRegistrationData) => {
		setFormData(data);
		setStep('password');
	};

	const handlePasswordSubmit = async (data: PasswordRegistrationData) => {
		const completeData = { ...formData, ...data };
		dispatch(fetchUserDataWithRegistrationViaEmail(completeData));
	};

	return (
		<FormWrapper>
			<Logo src={TwitterLogo} />
			{step === 'details' ? (
				<DetailsForm onSubmit={handleDetailsSubmit} />
			) : (
				<PasswordForm onSubmit={handlePasswordSubmit} />
			)}
		</FormWrapper>
	);
};
