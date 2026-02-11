import { externalUsers, externalUsersWithNew, newExternalUser, oneExternalUser } from '../fixtures/externalUsers';

describe('External users', () => {
  it('lists external users on front page', () => {
    cy.get('[data-cy="resource-card-externalUsers"]').within(() => {
      cy.get('[data-cy="resource-card-title"]').should('have.text', 'Externa användare');
      cy.get('[data-cy="resource-card-subtitle"]').should('have.text', '3 externa användare');
    });
  });

  it('lists and sorts external users', () => {
    cy.intercept('GET', '**/api/admin/external-users', externalUsers);
    cy.get('[data-cy="resource-card-externalUsers"]').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .within(() => {
        cy.get('tbody').children().eq(0).contains('Test Testsson 1');
        cy.get('tbody').children().eq(1).contains('Test Testsson 2');
        cy.get('tbody').children().eq(2).contains('Test Testsson 3');

        cy.get('thead>tr').children().eq(0).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Test Testsson 3');
        cy.get('tbody').children().eq(1).contains('Test Testsson 2');
        cy.get('tbody').children().eq(2).contains('Test Testsson 1');

        cy.get('thead>tr').children().eq(2).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Test Testsson 1');
        cy.get('tbody').children().eq(1).contains('Test Testsson 2');
        cy.get('tbody').children().eq(2).contains('Test Testsson 3');

        cy.get('thead>tr').children().eq(2).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('Test Testsson 3');
        cy.get('tbody').children().eq(1).contains('Test Testsson 2');
        cy.get('tbody').children().eq(2).contains('Test Testsson 1');
      });

    cy.get('[data-cy="table-settings-button"]').click();
    cy.get('[data-cy="table-settings-panel"]').children().should('have.length', 6);
    cy.get('[data-cy="table-settings-panel"]').children().eq(0).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Namn');
    cy.get('[data-cy="table-settings-panel"]').children().eq(1).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Organisation');
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(1).should('include.text', 'Personnummer');
  });

  it('creates a new external user', () => {
    cy.intercept('GET', '**/api/admin/external-users', externalUsersWithNew);
    cy.intercept('GET', '**/api/admin/external-user/4', newExternalUser);
    cy.intercept('POST', '**/api/admin/external-user', newExternalUser).as('save');

    cy.get('[data-cy="mainmenu-resource-externalUsers"]>span>button').click();
    cy.contains('Lägg till extern användare').click();
    cy.get('h1').should('have.text', 'Lägg till extern användare');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-name"]').type('Test Testsson 4');
    cy.get('[data-cy="edit-org"]').type('Sundsvalls kommun');
    cy.get('[data-cy="edit-personNumber"]').type('199001012385');
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-delete"]').click();
    cy.get('article.sk-modal-dialog').within(() => {
      cy.get('h1').should('have.text', 'Du har osparade ändringar');
      cy.get('button').contains('Nej').click();
    });
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@save');
  });

  it('edits an external user', () => {
    cy.intercept('GET', '**/api/admin/external-user/1', oneExternalUser);
    cy.intercept('PATCH', '**/api/admin/external-user/1', {
      ...oneExternalUser,
      data: { ...oneExternalUser.data, org: 'SK' },
    });
    cy.get('[data-cy="mainmenu-resource-externalUsers"]>span>a').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .find('tbody')
      .children()
      .eq(0)
      .find('a[data-cy="edit-resource"]')
      .click();
    cy.get('h1').should('have.text', 'Redigera extern användare');
    cy.get('header').should('include.text', 'Id: 1');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-name"]').should('have.value', 'Test Testsson 1');
    cy.get('[data-cy="edit-org"]').should('have.value', 'Sundsvalls kommun').clear().type('SK');
    cy.get('[data-cy="edit-personNumber"]').should('have.value', '199001012385');
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
  });
});
