import { answer } from '../fixtures/answers';

describe('Menues', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/assistants/**/sessions/?stream=false', {
      fixture: 'scenario-base',
    });
    cy.intercept('POST', '**/api/conversations', {
      fixture: 'scenario-base',
    }).as('Start');
    cy.intercept('POST', '**/api/assistants/**/sessions/12345?stream=false', (req) => {
      const data = JSON.parse(req.body);
      const body = answer(data.body);
      req.continue((res) => {
        res.body = body;
      });
    });
    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
  });

  it('uses the settings menu', () => {
    cy.get('[data-cy="settings-button"]').click();
    cy.get('[data-cy="settings-menu"]').within(() => {
      cy.get('[data-cy="settings-darkmode"]').should('be.checked');
      cy.get('[data-cy="settings-highcontrastmed"]').should('not.be.checked');
    });
    cy.get('[data-cy="category-card-1"]').click('top');
    cy.get('[data-cy="settings-menu"]').should('not.be.visible');
  });

  it('does not show install in settings when app runs as standalone', () => {
    cy.visit('/start', {
      timeout: 20000,
      onBeforeLoad: (win) => {
        Object.defineProperty(win.navigator, 'standalone', {
          configurable: true,
          value: true,
        });
      },
    });
    cy.wait('@getMe');

    cy.get('[data-cy="settings-button"]').click();
    cy.contains('button', 'Installera').should('not.exist');
  });

  it('pauses the game and uses the pause menu', () => {
    cy.get('[data-cy="category-card-1"]').contains('Kategori 1').click();
    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Starta scenario').click();
    cy.get('button').contains('Hoppa över').click();
    cy.get('[data-cy="pause-button"]').click();
    cy.get('[data-cy="pause-modal"]').within(() => {
      cy.get('h1').should('have.text', 'Scenario pausat');
      cy.get('h2').should('have.text', 'Med livet som insats');
      cy.get('[data-cy="darkmode"]').should('be.checked');
      cy.get('[data-cy="highcontrastmode"]').should('not.be.checked');
      cy.get('[data-cy="quit-button"]').should('have.text', 'Starta om');
      cy.get('[data-cy="read-intro-button"]').click();
    });
    cy.get('[data-cy="instruction-modal"]').within(() => {
      cy.get('h1').should('have.text', 'Introduktion');
      cy.get('h2').should('have.text', 'Med livet som insats');
      cy.get('button').contains('Ok').click();
    });
    cy.get('[data-cy="instruction-modal"]').should('not.exist');
    cy.get('[data-cy="continue-button"]').click();
    cy.get('[data-cy="pause-modal"]').should('not.exist');
    cy.get('button').contains('Kör igång').click();
    cy.get('[data-cy="pause-button"]').click();
    cy.get('[data-cy="quit-button"]').should('have.text', 'Avsluta och summera');
  });
});
