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

	it('should display the home page', () => {
		cy.get('div[id="home-page"]').should('be.visible');
	});

	it('should contains tweet input', () => {
		cy.get('div[id="tweet-input-container"]').should('be.visible');
	});

	it('should contains tweet list', () => {
		cy.get('div[id="tweet-list-container"]').should('be.visible');
	});
});
