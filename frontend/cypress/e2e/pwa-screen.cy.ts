describe('PWA screen', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/scenarios', { fixture: 'scenarios' }).as(
      'Scenarios'
    );
    cy.intercept('GET', '**/api/scenarios/**', { fixture: 'scenario-1' }).as(
      'Scenario'
    );
    cy.visit('/', { timeout: 20000 });
  });

  it('should show the PWA installation screen', () => {
    cy.get('h1').should('contain.text', 'Med livet som insats');
    cy.contains('Installera programmet för bästa upplevelse');
  });
});
