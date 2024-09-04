export interface DetailsRegistrationData {
	name: string;
	phone: string;
	email: string;
	month: number;
	day: number;
	year: number;
}

export interface PasswordRegistrationData {
	password: string;
}

export interface RegistrationData
	extends DetailsRegistrationData,
		PasswordRegistrationData {}
