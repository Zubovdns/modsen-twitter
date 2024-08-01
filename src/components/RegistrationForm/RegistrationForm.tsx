import { useState } from 'react';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { auth } from '@src/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { DetailsForm } from './DetailsForm';
import { PasswordForm } from './PasswordForm';
import { FormWrapper, Logo } from './styled';
import { FormData } from './types';

export const RegistrationForm = () => {
	const [step, setStep] = useState<'details' | 'password'>('details');
	const [formData, setFormData] = useState<Partial<FormData>>({});

	const handleDetailsSubmit = (data: Partial<FormData>) => {
		setFormData(data);
		setStep('password');
	};

	const handlePasswordSubmit = async (data: Partial<FormData>) => {
		const completeData = { ...formData, ...data };
		console.log('Success:', completeData);
		await createUserWithEmailAndPassword(
			auth,
			completeData.email,
			completeData.password
		);
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
