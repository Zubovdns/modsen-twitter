import {
	correctRegistrationData,
	incorrectRegistrationData,
} from '../../fixtures/registration.fixtures';

describe('Registration page', () => {
	beforeEach(() => {
		cy.visit('/registration');
	});

	it('should display the registration form', () => {
		cy.get('form').should('be.visible');
	});

	it('should display the name input field', () => {
		cy.get('input[name="name"]').should('be.visible');
	});

	it('should display the email input field', () => {
		cy.get('input[name="email"]').should('be.visible');
	});

	it('should display the phone input field', () => {
		cy.get('input[name="phone"]').should('be.visible');
	});

	it('should display the privacy policy link', () => {
		cy.get('p')
			.contains(
				'This information will not be publicly available. Verify your age, even if this account is for a company, pet, etc.'
			)
			.should('be.visible');
	});

	it('should allow user to submit the registration form', () => {
		cy.get('form').within(() => {
			cy.get('input[name="name"]').type(correctRegistrationData.name);
			cy.get('input[name="phone"]').type(correctRegistrationData.phone).click();
			cy.get('input[name="email"]').type(correctRegistrationData.email);
			cy.get('select[name="month"]').select('1');
			cy.get('select[name="day"]').select('1');
			cy.get('button[type="submit"]').click();
		});
		cy.get('input[name="password"]').should('exist');
	});

	it('should display the name error message', () => {
		cy.get('input[name="name"]')
			.type(incorrectRegistrationData.name)
			.blur()
			.parent('div')
			.find('p')
			.should('exist');
	});
	it('should display the email error message', () => {
		cy.get('input[name="email"]')
			.type(incorrectRegistrationData.email)
			.blur()
			.parent('div')
			.find('p')
			.should('exist');
	});
	it('should display the phone error message', () => {
		cy.get('input[name="phone"]')
			.type(incorrectRegistrationData.phone)
			.blur()
			.parent('div')
			.find('p')
			.should('exist');
	});

	it('should decline user to submit the registration form', () => {
		cy.get('form').within(() => {
			cy.get('input[name="name"]').type(incorrectRegistrationData.name);
			cy.get('input[name="phone"]')
				.type(incorrectRegistrationData.phone)
				.click();
			cy.get('input[name="email"]').type(incorrectRegistrationData.email);
			cy.get('select[name="month"]').select('1');
			cy.get('select[name="day"]').select('1');
			cy.get('button[type="submit"]').click();
		});
		cy.get('input[name="password"]').should('not.exist');
	});
});
