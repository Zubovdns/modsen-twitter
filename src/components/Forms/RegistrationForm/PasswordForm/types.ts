import { PasswordRegistrationData } from '@interfaces/registration';

export interface PasswordFormProps {
	onSubmit: (data: PasswordRegistrationData) => void;
}
