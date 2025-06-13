import { getMe } from '../fixtures/getMe';

describe('PWA screen', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/me', getMe);
    cy.visit('/');
  });

  it('should show the PWA installation screen', () => {
    cy.get('h1').should('contain.text', 'Med livet som insats');
    cy.contains('Installera programmet för bästa upplevelse');
  });
});
