import { newScenario, oneScenario, scenariosWithNew } from '../fixtures/scenarios';

describe('Scenarios', () => {
  it('lists scenarios on front page', () => {
    cy.get('[data-cy="resource-card-scenarios"]').within(() => {
      cy.get('[data-cy="resource-card-title"]').should('have.text', 'Scenarion');
      cy.get('[data-cy="resource-card-subtitle"]').should('have.text', '3 scenarion');
    });
  });
  it('lists and sorts scenarios', () => {
    cy.get('[data-cy="resource-card-scenarios"]').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .within(() => {
        cy.get('tbody').children().eq(0).contains('Scenario 1');
        cy.get('tbody').children().eq(1).contains('Scenario 2');
        cy.get('tbody').children().eq(2).contains('Scenario 3');

        cy.get('thead>tr').children().eq(0).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Scenario 3');
        cy.get('tbody').children().eq(1).contains('Scenario 2');
        cy.get('tbody').children().eq(2).contains('Scenario 1');

        cy.get('thead>tr').children().eq(3).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Scenario 2');
        cy.get('tbody').children().eq(1).contains('Scenario 1');
        cy.get('tbody').children().eq(2).contains('Scenario 3');

        cy.get('thead>tr').children().eq(3).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Scenario 1');
        cy.get('tbody').children().eq(1).contains('Scenario 3');
        cy.get('tbody').children().eq(2).contains('Scenario 2');
      });

    cy.get('[data-cy="table-settings-button"]').click();
    cy.get('[data-cy="table-settings-panel"]').children().should('have.length', 5);
    cy.get('[data-cy="table-settings-panel"]').children().eq(0).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Namn');
    cy.get('[data-cy="table-settings-panel"]').children().eq(1).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Skapad');
  });

  it('creates a new scenario', () => {
    cy.intercept('GET', '**/api/admin/scenarios', scenariosWithNew);
    cy.intercept('GET', '**/api/admin/scenarios/4', newScenario);
    cy.intercept('POST', '**/api/admin/scenarios', newScenario).as('save');
    cy.get('[data-cy="mainmenu-resource-scenarios"]>span>button').click();
    cy.contains('Lägg till scenario').click();
    cy.get('h1').should('have.text', 'Lägg till scenario');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-scenarios-name"]').type('Scenario 4');
    cy.get('[data-cy="edit-scenarios-description"]').type('Detta är en beskrivning');
    cy.get('[data-cy="edit-scenarios-assistantId"]').type('fff4-2345-3456-4567');
    cy.get('[data-cy="edit-scenarios-published"]').parent().click();
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-delete"]').click();
    cy.get('article.sk-modal-dialog').within(() => {
      cy.get('h1').should('have.text', 'Du har osparade ändringar');
      cy.get('button').contains('Nej').click();
    });
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@save');
    cy.get('h1').should('have.text', 'Redigera scenario');
    cy.get('header').should('include.text', 'Id: 4');
    cy.get('[data-cy="goback"]').click();
    cy.get('[data-cy="resource-table"]').eq(0).find('tbody').children().should('have.length', 4);
  });

  it('edits a scenario', () => {
    cy.intercept('GET', '**/api/admin/scenarios/1', oneScenario);
    cy.intercept('PATCH', '**/api/admin/scenarios/1', {
      ...oneScenario,
      data: { ...oneScenario.data, description: 'En beskrivning' },
    });
    cy.get('[data-cy="mainmenu-resource-scenarios"]>span>a').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .find('tbody')
      .children()
      .eq(0)
      .find('a[data-cy="edit-resource"]')
      .click();
    cy.get('h1').should('have.text', 'Redigera scenario');
    cy.get('header').should('include.text', 'Id: 1');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-scenarios-name"]').should('have.value', 'Scenario 1');
    cy.get('[data-cy="edit-scenarios-assistantId"]').should('have.value', '1234-2345-3456-4567');
    cy.get('[data-cy="edit-scenarios-description"]').should('have.value', '');
    cy.get('[data-cy="edit-scenarios-description"]').type('En beskrivning');
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="resource-image"]').should('have.attr', 'srcset').should('include', 'files%2Fimage1.png');
    cy.get('[data-cy="resource-image-remove-button"]').click();
    cy.get('[data-cy="resource-image"]').should('not.exist');
    cy.get('[data-cy="resource-image-add-button"]').click();
    cy.get('[data-cy="add-image-modal"]').within(() => {
      cy.get('[data-cy="tabs"]').children().eq(0).children().should('have.length', 2);
      cy.get('[data-cy="images-list"]').children().should('have.length', 3);
      cy.get('[data-cy="images-list"]').children().eq(0).click();
    });
    cy.get('[data-cy="edit-toolbar-save"]').click();
  });
});
