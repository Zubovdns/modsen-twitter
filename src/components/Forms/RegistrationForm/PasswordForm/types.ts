export interface FormData {
	password: string;
}

export interface PasswordFormProps {
	onSubmit: (data: FormData) => void;
}
