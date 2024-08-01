export interface FormData {
	name: string;
	phone: string;
	email: string;
	month: string;
	day: string;
	year: number;
}

export interface DetailsFormProps {
	onSubmit: (data: FormData) => void;
}
