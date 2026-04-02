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
    cy.contains(/Installera programmet/);
  });

  it('should skip the PWA installation screen in standalone mode', () => {
    cy.visit('/', {
      timeout: 20000,
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'standalone', {
          configurable: true,
          value: true,
        });
      },
    });

    cy.location('pathname').should('include', '/start');
    cy.contains(/Installera programmet/).should('not.exist');
  });
});
