import { imagesWithNew, newImage, oneImage } from '../fixtures/images';
import { oneScenario } from '../fixtures/scenarios';

describe('Images', () => {
  it('lists images on front page', () => {
    cy.get('[data-cy="resource-card-images"]').within(() => {
      cy.get('[data-cy="resource-card-title"]').should('have.text', 'Bilder');
      cy.get('[data-cy="resource-card-subtitle"]').should('have.text', '3 bilder');
    });
  });
  it('lists and sorts images', () => {
    cy.get('[data-cy="resource-card-images"]').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .within(() => {
        cy.get('tbody').children().eq(0).contains('image1.png');
        cy.get('tbody').children().eq(1).contains('image2.png');
        cy.get('tbody').children().eq(2).contains('image3.png');

        cy.get('thead>tr').children().eq(0).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('image3.png');
        cy.get('tbody').children().eq(1).contains('image2.png');
        cy.get('tbody').children().eq(2).contains('image1.png');

        cy.get('thead>tr').children().eq(4).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('image2.png');
        cy.get('tbody').children().eq(1).contains('image3.png');
        cy.get('tbody').children().eq(2).contains('image1.png');

        cy.get('thead>tr').children().eq(4).find('button.sk-table-sortbutton').click();

        cy.get('tbody').children().eq(0).contains('image1.png');
        cy.get('tbody').children().eq(1).contains('image3.png');
        cy.get('tbody').children().eq(2).contains('image2.png');
      });

    cy.get('[data-cy="table-settings-button"]').click();
    cy.get('[data-cy="table-settings-panel"]').children().should('have.length', 5);
    cy.get('[data-cy="table-settings-panel"]').children().eq(0).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Namn');
    cy.get('[data-cy="table-settings-panel"]').children().eq(1).click();
    cy.get('[data-cy="resource-table"]>thead>tr').children().eq(0).should('include.text', 'Bild');
  });

  it('creates a new image', () => {
    cy.intercept('GET', '**/api/admin/images', imagesWithNew);
    cy.intercept('GET', '**/api/admin/images/4', newImage);
    cy.intercept('POST', '**/api/admin/images', newImage).as('save');
    cy.get('[data-cy="mainmenu-resource-images"]>span>button').click();
    cy.contains('Lägg till bild').click();
    cy.get('h1').should('have.text', 'Lägg till bild');
    cy.get('input[type=file]').selectFile(
      {
        contents: Cypress.Buffer.from('file contents'),
        fileName: 'image4.png',
        mimeType: 'image/png',
        lastModified: Date.now(),
      },
      { force: true }
    );

    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-delete"]').click();
    cy.get('article.sk-modal-dialog').within(() => {
      cy.get('h1').should('have.text', 'Du har osparade ändringar');
      cy.get('button').contains('Nej').click();
    });
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.wait('@save');
    cy.get('h1').should('have.text', 'Redigera bild');
    cy.get('header').should('include.text', 'Id: 4');
    cy.get('[data-cy="goback"]').click();
    cy.get('[data-cy="resource-table"]').eq(0).find('tbody').children().should('have.length', 4);
  });

  it('edits an image', () => {
    cy.intercept('GET', '**/api/admin/images/1', oneImage);
    cy.intercept('GET', '**/api/admin/scenarios/1', oneScenario);
    cy.intercept('PATCH', '**/api/admin/images/1', {
      ...oneImage,
      data: { ...oneImage?.data, name: 'Nytt namn' },
    });
    cy.get('[data-cy="mainmenu-resource-images"]>span>a').click();
    cy.get('[data-cy="resource-table"]')
      .eq(0)
      .find('tbody')
      .children()
      .eq(0)
      .find('a[data-cy="edit-resource"]')
      .click();
    cy.get('h1').should('have.text', 'Redigera bild');
    cy.get('header').should('include.text', 'Id: 1');
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="edit-images-name"]').should('have.value', 'image1.png');
    cy.get('[data-cy="edit-images-name"]').clear();
    cy.get('[data-cy="edit-images-name"]').type('Nytt namn');
    cy.get('[data-cy="edit-toolbar-save"]').should('not.be.disabled');
    cy.get('[data-cy="edit-toolbar-save"]').click();
    cy.get('[data-cy="edit-toolbar-save"]').should('be.disabled');
    cy.get('[data-cy="image-scenario-list"]').children().should('have.length', 2);
    cy.get('[data-cy="image-scenario-list"]').children().eq(0).find('a').click();
    cy.get('h1').should('have.text', 'Redigera scenario');
    cy.get('[data-cy="edit-scenarios-name"]').should('have.value', 'Scenario 1');
  });
});
