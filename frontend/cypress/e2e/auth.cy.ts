describe('Login', () => {
  it('sends you to the login screen when unauthorized', () => {
    cy.intercept('GET', '**/api/me', {
      statusCode: 401,
      body: { message: 'NOT_AUTHORIZED' },
    });

    cy.visit('/start', { timeout: 20000 });

    cy.location('pathname').should('match', /\/login$/);
    cy.location('search').should('include', 'path=/start');
    cy.location('search').should('include', 'failMessage=NOT_AUTHORIZED');
    cy.get('h1').should('have.text', 'Med livet som insats');
    cy.get('[data-cy="loginButton"]').should('be.visible');
  });
});
