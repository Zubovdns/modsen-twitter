describe('SignUp page', () => {
	beforeEach(() => {
		cy.visit('/sign_up');
	});

	it('should display the Google sign up button', () => {
		cy.get('button').contains('Sign up with Google').should('be.visible');
	});

	it('should display the Email sign up button', () => {
		cy.get('button').contains('Sign up with Email').should('be.visible');
	});

	it('should navigate to the registration page when clicking on Email sign up button', () => {
		cy.get('button').contains('Sign up with Email').click();
		cy.url().should('include', '/registration');
	});

	it('should display the disclaimer text', () => {
		cy.get('p').contains('By signing up you agree to the').should('be.visible');
	});

	it('should display the terms of service link', () => {
		cy.get('a').contains('Terms of Service').should('be.visible');
	});

	it('should display the privacy policy link', () => {
		cy.get('a').contains('Privacy Policy').should('be.visible');
	});

	it('should display the cookie use link', () => {
		cy.get('a').contains('Cookie Use').should('be.visible');
	});
});
