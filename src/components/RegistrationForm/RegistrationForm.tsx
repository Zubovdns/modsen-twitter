import { useState } from 'react';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { auth, db } from '@src/firebase';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { months } from './constants';
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

		console.log('Success:', completeData); // ! удалить

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				completeData.email!,
				completeData.password!
			);
			const user = userCredential.user;

			try {
				const birthDate = new Date(
					Date.UTC(
						+completeData.year!,
						+months.indexOf(completeData.month!),
						+completeData.day!,
						0,
						0,
						0,
						0
					)
				);

				await setDoc(doc(db, 'users', user.uid), {
					name: completeData.name,
					phone: completeData.phone,
					birthDate,
				});
				console.log('User data saved successfully');
			} catch (error) {
				await deleteUser(user);
				console.error('Error saving user data, user deleted: ', error);
			}
		} catch (error) {
			console.error('Error creating user: ', error);
		}
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
