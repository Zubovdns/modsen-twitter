import {
	FloatingLabel,
	FloatingLabelInput,
	FloatingLabelInputWrapper,
	ValidationError,
} from './styled';
import { FloatingLabelInputFieldProps } from './types';

export const FloatingLabelInputField = ({
	id,
	label,
	type,
	placeholder,
	register,
	error,
	validationRules,
	setValue,
	setError,
	clearErrors,
}: FloatingLabelInputFieldProps) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setValue(id, value);

		if (error) {
			clearErrors(id);
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const validationError = validationRules.validate(value);
		if (validationError !== true) {
			setError(id, {
				type: 'manual',
				message: validationError,
			});
		} else {
			clearErrors(id);
		}
	};

	return (
		<FloatingLabelInputWrapper>
			<FloatingLabelInput
				type={type}
				id={id}
				placeholder={placeholder}
				{...register(id, validationRules)}
				$error={!!error}
				onChange={handleChange}
				onBlur={handleBlur}
			/>
			<FloatingLabel htmlFor={id}>{label}</FloatingLabel>
			{error && <ValidationError>{error.message}</ValidationError>}
		</FloatingLabelInputWrapper>
	);
};
