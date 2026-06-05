import { answer } from '../fixtures/answers';

describe('Full game flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/conversations*', {
      fixture: 'scenario-base',
    }).as('Start');

    cy.intercept('GET', '**/api/scenario-intro-texts', {
      fixture: 'scenario-intro-texts',
    }).as('ScenarioIntroTexts');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
  });

  it('shows the scenario intro from backend data', () => {
    cy.get('[data-cy="category-card-1"]').contains('Kategori 1').click();
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
    cy.get('h1').should('contain.text', 'Vi vill att du funderar på dina val');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Scenario 1');
  });

  it('skips the scenario intro and goes to game play', () => {
    cy.wait(2000);

    cy.get('[data-cy="category-card-1"]').contains('Kategori 1').click();
    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Starta scenario').click();
    cy.wait(2000);

    cy.get('button').contains('Hoppa över').click();
    cy.get('h1').should('contain.text', 'Scenario 1');
    cy.get('button').contains('Kör igång').click();
    cy.wait('@Start');

    cy.intercept('POST', '**/api/conversations*', (req) => {
      const data =
        typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      req.reply(answer(data.question));
    }).as('Answer');

    cy.get('[data-cy="pause-button"]').should('be.visible');
    cy.contains('button', 'A').should('be.enabled').click();
    cy.wait('@Answer');
    cy.get('[data-cy="feed-entry-1"]').should('contain.text', 'A');

    cy.get('button').contains('D: Annat').click();
    cy.get('.sk-ai-inputsection-input').type('Uppföljning').type('{enter}');
    cy.wait('@Answer');
    cy.get('.sk-ai-inputsection-input').should('not.exist');
    cy.get('[data-cy="feed-entry-3"]').should('contain.text', 'Uppföljning');

    cy.get('[data-cy="pause-button"]').click();
    cy.get('button').contains('Avsluta').click();
    cy.get('header[data-cy="end-header"]').within(() => {
      cy.get('h1').should('contain.text', 'Med livet som insats');
      cy.get('p').should('contain.text', 'Övningen avslutad');
    });
  });

  it('goes directly to scenario start when backend returns no intro texts', () => {
    cy.intercept('GET', '**/api/scenario-intro-texts', {
      data: [],
      message: 'success',
    }).as('EmptyScenarioIntroTexts');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
    cy.get('[data-cy="category-card-1"]').contains('Kategori 1').click();
    cy.get('[data-cy="card-1"]').contains('Scenario 1').click();
    cy.get('button').contains('Starta scenario').click();

    cy.wait('@EmptyScenarioIntroTexts');
    cy.get('h1').should('contain.text', 'Scenario 1');
  });
});
