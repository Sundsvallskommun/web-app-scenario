import { answer } from '../fixtures/answers';

describe('Full game flow', () => {
  beforeEach(() => {
    cy.intercept('POST', '**/api/conversations', {
      fixture: 'scenario-base',
    }).as('Start');

    cy.visit('/start', { timeout: 20000 });
    cy.wait('@getMe');
  });

  it('shows the scenario intro', () => {
    //Start
    cy.get('h1').should('contain.text', 'Med livet som insats');
    cy.get('button').contains('Starta').click();
    //Intro
    cy.wait(2000);
    cy.get('h1').should(
      'contain.text',
      'Scenarioövningarna är utformade för att simulera verkliga situationer '
    );
    cy.wait(10000);
    cy.get('h1').should(
      'contain.text',
      'Även om scenariona inte är autentiska'
    );
    cy.wait(7000);
    cy.get('h1').should(
      'contain.text',
      'Vi förstår att innehållet kan vara obehagligt'
    );
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Du kan när som helst pausa scenariot');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Kom ihåg att det alltid finns hjälp');
    cy.wait(7000);
    cy.get('h1').should('contain.text', 'Vi uppmuntrar dig att reflektera');
    cy.wait(7000);
    //Start scenario
    cy.get('h1').should('contain.text', 'Scenario 1');
  });

  it('should skip the scenario intro and go to game play and then stop game play', () => {
    //Start
    cy.get('button').contains('Starta').click();
    //Intro
    cy.get('button').contains('Hoppa över').click();
    //Start scenario
    cy.get('h1').should('contain.text', 'Scenario 1');
    cy.get('button').contains('Kör igång').click();
    //Scenario 1
    cy.wait('@Start');

    //New interception for follow up questions
    cy.intercept(
      'POST',
      '**/api/conversations',

      (req) => {
        const data = JSON.parse(req.body);
        const body = answer(data.question);
        req.reply(body);
      }
    );

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
    //Pause and end
    cy.get('[data-cy="pause-button"]').click();
    cy.get('button').contains('Avsluta').click();
    //End screen
    cy.get('header[data-cy="end-header"]').within(() => {
      cy.get('h1').should('contain.text', 'Med livet som insats');
      cy.get('p').should('contain.text', 'Övningen avslutad');
    });
    cy.get('[data-cy="feed-entry-0"]').should(
      'contain.text',
      'Du frågade: Änglavakt'
    );
  });
});
