import { answer } from '../fixtures/answers';

describe('Menues', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/assistants/**/sessions/?stream=false', {
      fixture: 'scenario-base',
    });
    cy.intercept(
      'POST',
      '**/api/assistants/**/sessions/12345?stream=false',
      (req) => {
        const data = JSON.parse(req.body);
        const body = answer(data.body);
        req.continue((res) => {
          res.body = body;
        });
      }
    );
    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
  });

  it('uses the settings menu', () => {
    cy.get('[data-cy="settings-button"]').click();
    cy.get('[data-cy="settings-menu"]').within(() => {
      cy.get('[data-cy="settings-darkmode"]').should('be.checked');
      cy.get('[data-cy="settings-highcontrastmed"]').should('not.be.checked');
    });
    cy.get('h1').click();
    cy.get('[data-cy="settings-menu"]').should('not.be.visible');
  });

  it('pauses the game and uses the pause menu', () => {
    //Start
    cy.get('button').contains('Starta').click();
    //Intro
    cy.get('button').contains('Hoppa över').click();
    //Start scenario screen + open pause modal
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
    //Scenario started
    cy.get('[data-cy="pause-button"]').click();
    cy.get('[data-cy="quit-button"]').should(
      'have.text',
      'Avsluta och summera'
    );
  });
});
