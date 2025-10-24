import '@cypress/code-coverage/support';

import { CookieConsentUtils } from '@sk-web-gui/react';
import me from '../fixtures/me';
import images from '../fixtures/images';
import { scenarios } from '../fixtures/scenarios';

export const DEFAULT_COOKIE_VALUE = 'necessary%2Cstats';

localStorage.clear();

beforeEach(() => {
  cy.visit('/', { failOnStatusCode: false });
  cy.on('uncaught:exception', () => {
    return false;
  });

  cy.setCookie(CookieConsentUtils.defaultCookieConsentName, DEFAULT_COOKIE_VALUE);
  cy.viewport('macbook-16');
  cy.intercept('GET', '**/api/admin/me', me).as('me');
  cy.intercept('GET', '**/api/admin/images', images).as('images');
  cy.intercept('GET', '**/api/admin/scenarios', scenarios).as('scenarios');
});
