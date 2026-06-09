describe('PWA screen', () => {
  beforeEach(() => {
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
    cy.get('[data-cy="category-card-1"]').should('contain.text', 'Kategori 1');
  });

  it('redirects directly to the single category when only one is available', () => {
    cy.intercept('GET', '**/api/categories', {
      data: [{ id: 1, name: 'Kategori 1' }],
      message: 'success',
    }).as('SingleCategory');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@SingleCategory');
    cy.location('pathname').should('include', '/1');
  });
});
