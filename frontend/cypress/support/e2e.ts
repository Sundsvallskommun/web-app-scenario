import '@cypress/code-coverage/support';

import { getMe } from '../fixtures/getMe';

localStorage.clear();

beforeEach(() => {
  cy.viewport('macbook-16');
  cy.intercept('GET', '**/api/me', getMe).as('getMe');
  cy.intercept('GET', '**/api/scenarios/1', { fixture: 'scenario-1' });
  cy.intercept('GET', '**/api/azure/login', {
    data: { token: '123', region: '1' },
  });
  cy.intercept('*.speech.microsoft.com/**/*', (req) => {
    req.destroy();
  });
});
