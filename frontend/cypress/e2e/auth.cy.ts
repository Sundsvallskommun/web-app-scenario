import { getMe } from 'cypress/fixtures/getMe';

describe('Login', () => {
  it('sends you to the login screen when unauthorized', () => {
    cy.intercept('GET', '**/api/me', {
      statusCode: 401,
      body: { message: 'NOT_AUTHORIZED' },
    });
    cy.visit('/start');
    cy.get('h1').should('have.text', 'Med livet som insats');

    cy.intercept('GET', '**/api/me', getMe);
    cy.intercept('**/api/saml/login*', (req) => {
      req.destroy();
    }).as('login');

    cy.get('[data-cy="loginButton"]').click();

    cy.wait('@login').then(() => {
      cy.visit('/start');
    });
    cy.get('h1').should('have.text', 'Med livet som insats');
    cy.get('[data-cy="settings-button"]').click();
    cy.get('[data-cy="settings-logout"]').should('be.visible');
  });
});
