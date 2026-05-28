import '@cypress/code-coverage/support';

import { getMe } from '../fixtures/getMe';

localStorage.clear();

beforeEach(() => {
  cy.viewport('macbook-16');
  cy.intercept('GET', '**/api/me', getMe).as('getMe');
  cy.intercept('GET', '**/api/categories', { fixture: 'categories' }).as('Categories');
  cy.intercept('GET', '**/api/categories/*/scenarios', { fixture: 'scenarios' }).as('Scenarios');
  cy.intercept('GET', '**/api/categories/*/scenarios/*', { fixture: 'scenario-1' }).as('Scenario');
  cy.intercept('GET', '**/api/scenario-intro-texts', {
    fixture: 'scenario-intro-texts',
  }).as('ScenarioIntroTexts');
  cy.intercept('GET', '**/api/azure/login', {
    data: { token: '123', region: '1' },
  });
  cy.intercept('*.speech.microsoft.com/**/*', (req) => {
    req.destroy();
  });
});
