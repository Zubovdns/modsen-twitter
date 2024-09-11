import { correctLoginData } from '../../fixtures/login.fixtures';

describe('Login page', () => {
	beforeEach(() => {
		cy.visit('/login');
	});

	it('should display the registration form', () => {
		cy.get('form').should('be.visible');
	});

	it('should display the login input field', () => {
		cy.get('input[name="login"]').should('be.visible');
	});

	it('should display the password input field', () => {
		cy.get('input[name="password"]').should('be.visible');
	});

	it('should allow user to login', () => {
		cy.get('form').within(() => {
			cy.get('input[name="login"]').type(correctLoginData.login);
			cy.get('input[name="password"]').type(correctLoginData.password);
			cy.get('button[type="submit"]').click();
		});
		cy.url().should('include', '/home');
	});

	it('should allow user to log out', () => {
		cy.get('img[alt="Mini profile image"]').parent().click();
	});
});
