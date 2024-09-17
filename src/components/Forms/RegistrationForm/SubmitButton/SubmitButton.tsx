import { LOADING_BUTTON } from '../constants';

import { Button } from './styled';
import { SubmitButtonProps } from './types';

export const SubmitButton = ({
	isSubmitting,
	buttonText,
}: SubmitButtonProps) => (
	<Button type='submit'>{isSubmitting ? LOADING_BUTTON : buttonText}</Button>
);
