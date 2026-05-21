import { categoriesWithNew, newCategory, oneCategory } from '../fixtures/categories';

describe('Categories', () => {
  it('lists categories on front page', () => {
    cy.get('[data-cy="resource-card-categories"]').within(() => {
      cy.get('[data-cy="resource-card-title"]').should('have.text', 'Kategorier');
      cy.get('[data-cy="resource-card-subtitle"]').should('have.text', '3 kategorier');
    });
  });

  it('creates a new category', () => {
    cy.intercept('GET', '**/api/admin/categories', categoriesWithNew);
    cy.intercept('GET', '**/api/admin/categories/4', newCategory);
    cy.intercept('POST', '**/api/admin/categories', newCategory).as('save');

    cy.get('[data-cy="mainmenu-resource-categories"]>span>button').click();
    cy.contains('Lägg till kategori').click();
    cy.get('h1').should('have.text', 'Lägg till kategori');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-name"]').type('Category 4');
    cy.get('[data-cy="edit-category-adGroup-input"]').type('group-d');
    cy.get('[data-cy="edit-category-adGroup-add"]').click();
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@save');
    cy.get('h1').should('have.text', 'Redigera kategori');
    cy.get('header').should('include.text', 'Id: 4');
    cy.get('[data-cy="edit-category-adGroup-chip-0"]').should('contain.text', 'group-d');
  });

  it('edits a category', () => {
    cy.intercept('GET', '**/api/admin/categories/1', oneCategory);
    cy.intercept('PATCH', '**/api/admin/categories/1', {
      ...oneCategory,
      data: {
        ...oneCategory.data,
        name: 'Category 1 updated',
        adGroups: ['group-a', 'group-c'],
      },
    }).as('save');

    cy.get('[data-cy="mainmenu-resource-categories"]>span>a').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .find('tbody')
      .children()
      .eq(0)
      .find('a[data-cy="edit-resource"]')
      .click();
    cy.get('h1').should('have.text', 'Redigera kategori');
    cy.get('[data-cy="edit-name"]').should('have.value', 'Category 1');
    cy.get('[data-cy="edit-category-adGroup-chip-0"]').should('contain.text', 'group-a');
    cy.get('[data-cy="edit-category-adGroup-chip-1"]').click();
    cy.get('[data-cy="edit-category-adGroup-input"]').type('group-c');
    cy.get('[data-cy="edit-category-adGroup-add"]').click();
    cy.get('[data-cy="edit-category-adGroup-chip-1"]').should('contain.text', 'group-c');
    cy.get('[data-cy="edit-name"]').clear();
    cy.get('[data-cy="edit-name"]').type('Category 1 updated');
    cy.get('[data-cy="edit-toolbar-save"]').click({ force: true });
    cy.wait('@save');
    cy.get('[data-cy="edit-name"]').should('have.value', 'Category 1 updated');
    cy.get('[data-cy="edit-category-adGroup-chip-1"]').should('contain.text', 'group-c');
  });
});
