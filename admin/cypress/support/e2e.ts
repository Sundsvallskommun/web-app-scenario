import '@cypress/code-coverage/support';

import { CookieConsentUtils } from '@sk-web-gui/react';
import { externalUsers } from '../fixtures/externalUsers';
import me from '../fixtures/me';
import { categories } from '../fixtures/categories';
import images from '../fixtures/images';
import { scenarios } from '../fixtures/scenarios';
import { scenarioIntroTexts } from '../fixtures/scenarioIntroTexts';

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
  cy.intercept('GET', '**/api/admin/categories', categories).as('categories');
  cy.intercept('GET', '**/api/admin/scenario-intro-texts', scenarioIntroTexts).as('scenarioIntroTexts');
  cy.intercept('GET', '**/api/admin/external-users', externalUsers).as('externalUsers');
});
