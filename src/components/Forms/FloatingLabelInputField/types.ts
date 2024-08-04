import {
	FieldError,
	UseFormClearErrors,
	UseFormRegister,
	UseFormSetError,
	UseFormSetValue,
} from 'react-hook-form';

export interface FloatingLabelInputFieldProps {
	id: string;
	label: string;
	type: string;
	placeholder: string;
	register: UseFormRegister<any>;
	error?: FieldError;
	validationRules: any;
	setValue: UseFormSetValue<any>;
	setError: UseFormSetError<any>;
	clearErrors: UseFormClearErrors<any>;
}
