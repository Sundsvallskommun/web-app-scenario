import { newScenarioIntroText, oneScenarioIntroText, scenarioIntroTextsWithNew } from '../fixtures/scenarioIntroTexts';

describe('Scenario intro texts', () => {
  it('lists intro texts', () => {
    cy.get('[data-cy="resource-card-scenarioIntroTexts"]').within(() => {
      cy.get('[data-cy="resource-card-title"]').should('have.text', 'Introtexter');
      cy.get('[data-cy="resource-card-subtitle"]').should('have.text', '3 introtexter');
    });

    cy.get('[data-cy="resource-card-scenarioIntroTexts"]').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .within(() => {
        cy.get('tbody').children().eq(0).contains('Övningarna liknar verkliga situationer');
        cy.get('tbody').children().eq(1).contains('Även om övningarna inte är verkliga');
        cy.get('tbody').children().eq(2).contains('Vi vet att innehållet kan kännas jobbigt');
      });
  });

  it('creates a new intro text', () => {
    cy.intercept('GET', '**/api/admin/scenario-intro-texts', scenarioIntroTextsWithNew);
    cy.intercept('GET', '**/api/admin/scenario-intro-texts/4', newScenarioIntroText);
    cy.intercept('POST', '**/api/admin/scenario-intro-texts', newScenarioIntroText).as('saveScenarioIntroText');

    cy.get('[data-cy="mainmenu-resource-scenarioIntroTexts"]>span>button').click();
    cy.contains('Lägg till introtext').click();
    cy.get('h1').should('have.text', 'Lägg till introtext');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-sortOrder"]').clear().type('4');
    cy.get('[data-cy="edit-text"]').type('Ny introtext för redaktörer.');
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@saveScenarioIntroText');
    cy.get('h1').should('have.text', 'Redigera introtext');
    cy.get('header').should('include.text', 'Id: 4');
  });

  it('edits an intro text', () => {
    cy.intercept('GET', '**/api/admin/scenario-intro-texts/1', oneScenarioIntroText);
    cy.intercept('PATCH', '**/api/admin/scenario-intro-texts/1', {
      ...oneScenarioIntroText,
      data: {
        ...oneScenarioIntroText.data,
        text: 'Uppdaterad introtext.',
      },
    }).as('updateScenarioIntroText');

    cy.get('[data-cy="mainmenu-resource-scenarioIntroTexts"]>span>a').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .find('tbody')
      .children()
      .eq(0)
      .find('a[data-cy="edit-resource"]')
      .click();
    cy.get('h1').should('have.text', 'Redigera introtext');
    cy.get('[data-cy="edit-sortOrder"]').should('have.value', '1');
    cy.get('[data-cy="edit-text"]').should('contain.value', 'Övningarna liknar verkliga situationer');
    cy.get('[data-cy="edit-text"]').clear().type('Uppdaterad introtext.');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@updateScenarioIntroText');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
  });
});
