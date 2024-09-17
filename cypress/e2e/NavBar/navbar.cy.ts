import { correctLoginData } from '../../fixtures/login.fixtures';

describe('Login page', () => {
	before(() => {
		cy.visit('/login');
		cy.get('form')
			.within(() => {
				cy.get('input[name="login"]').type(correctLoginData.login);
				cy.get('input[name="password"]').type(correctLoginData.password);
				cy.get('button[type="submit"]').click();
			})
			.wait(3000);
	});

	after(() => {
		cy.get('img[alt="Mini profile image"]').parent().click();
	});

	beforeEach(() => {
		cy.visit('/home');
	});

	it('should display the navbar', () => {
		cy.get('nav').should('be.visible');
	});

	it('should go to explore page when clicking on explore button', () => {
		cy.get('nav').should('be.visible').contains('Explore').click();
		cy.url().should('include', '/explore');
	});

	it('should go to messages page when clicking on messages button', () => {
		cy.get('nav').should('be.visible').contains('Messages').click();
		cy.url().should('include', '/messages');
	});

	it('should go to notifications page when clicking on notifications button', () => {
		cy.get('nav').should('be.visible').contains('Notification').click();
		cy.url().should('include', '/notifications');
	});
});
