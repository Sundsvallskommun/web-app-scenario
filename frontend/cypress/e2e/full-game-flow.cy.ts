import { answer } from '../fixtures/answers';

describe('Full game flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/conversations', {
      fixture: 'scenario-base',
    }).as('Start');

    cy.intercept('GET', '**/api/scenarios', { fixture: 'scenarios' }).as(
      'Scenarios'
    );
    cy.intercept('GET', '**/api/scenarios/**', { fixture: 'scenario-1' }).as(
      'Scenario'
    );
    cy.intercept('GET', '**/api/scenario-intro-texts', {
      fixture: 'scenario-intro-texts',
    }).as('ScenarioIntroTexts');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
  });

  it('shows the scenario intro from backend data', () => {
    cy.get('h1').should('contain.text', 'Med livet som insats');
    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Gå tillbaka').click();
    cy.get('[data-cy="card-2"]').contains('Scenario 2').click();
    cy.get('button').contains('Starta scenario').click();

    cy.wait('@ScenarioIntroTexts');
    cy.wait(2000);
    cy.get('h1').should(
      'contain.text',
      'Övningarna liknar verkliga situationer'
    );
    cy.wait(9000);
    cy.get('h1').should('contain.text', 'Även om övningarna inte är verkliga');
    cy.wait(7000);
    cy.get('h1').should(
      'contain.text',
      'Vi vet att innehållet kan kännas jobbigt'
    );
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Du kan stoppa övningen när som helst');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Kom ihåg att du alltid kan få hjälp');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Vi vill att du funderar på dina val');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Scenario 1');
  });

  it('skips the scenario intro and goes to game play', () => {
    cy.get('h1').should('contain.text', 'Med livet som insats');
    cy.wait(2000);

    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Starta scenario').click();
    cy.wait(2000);

    cy.get('button').contains('Hoppa över').click();
    cy.get('h1').should('contain.text', 'Scenario 1');
    cy.get('button').contains('Kör igång').click();
    cy.wait('@Start');

    cy.intercept('POST', '**/api/conversations', (req) => {
      const data = JSON.parse(req.body);
      const body = answer(data.question);
      req.reply(body);
    });

    cy.get('h2').should('contain.text', 'Scenario nummer 1');
    cy.get('button').contains('A').click();
    cy.get('[data-cy="feed-entry-1"]').should('contain.text', 'A');
    cy.get('[data-cy="feed-entry-2"]').should('contain.text', 'Du frågade: A');
    cy.get('button').contains('D: Annat').click();
    cy.get('.sk-ai-inputsection-input').type('Uppföljning').type('{enter}');
    cy.get('.sk-ai-inputsection-input').should('not.exist');
    cy.get('[data-cy="feed-entry-3"]').should('contain.text', 'Uppföljning');
    cy.get('[data-cy="feed-entry-4"]').should(
      'contain.text',
      'Du frågade: Uppföljning'
    );
    cy.get('[data-cy="pause-button"]').click();
    cy.get('button').contains('Avsluta').click();
    cy.get('header[data-cy="end-header"]').within(() => {
      cy.get('h1').should('contain.text', 'Med livet som insats');
      cy.get('p').should('contain.text', 'Övningen avslutad');
    });
    cy.get('[data-cy="feed-entry-0"]').should(
      'contain.text',
      'Du frågade: Änglavakt'
    );
  });

  it('goes directly to scenario start when backend returns no intro texts', () => {
    cy.intercept('GET', '**/api/scenario-intro-texts', {
      data: [],
      message: 'success',
    }).as('EmptyScenarioIntroTexts');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Starta scenario').click();

    cy.wait('@EmptyScenarioIntroTexts');
    cy.get('h1').should('contain.text', 'Scenario 1');
  });
});
