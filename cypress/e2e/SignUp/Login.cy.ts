describe('Registration page', () => {
	beforeEach(() => {
		cy.visit('/registration');
	});

	it('should display the registration form', () => {
		cy.get('form').should('be.visible');
	});

	it('should display the login input field', () => {
		cy.get('input[name="email"]').should('be.visible');
	});

	it('should display the password input field', () => {
		cy.get('input[name="password"]').should('be.visible');
	});
});
