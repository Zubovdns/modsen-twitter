import { useState } from 'react';
import TwitterLogo from '@assets/icons/TwitterLogo.svg';
import { auth, db } from '@src/firebase';
import { createUserWithEmailAndPassword, deleteUser } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { FormWrapper, Logo } from '../styled';

import { months } from './constants';
import { DetailsForm } from './DetailsForm';
import { PasswordForm } from './PasswordForm';
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
					phone_number: completeData.phone,
					birth_date: birthDate,
					email: completeData.email,
					profile_image: null,
					bio: null,
					background_profile_image: null,
					login_name: user.uid,
					followers: [],
					following: [],
				});
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
