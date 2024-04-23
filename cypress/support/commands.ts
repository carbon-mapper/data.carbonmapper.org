/// <reference types="cypress" />
import '@testing-library/cypress/add-commands';
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
    namespace Cypress {
        interface Chainable {
            //   login(email: string, password: string): Chainable<void>
            //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
            //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
            acceptTerms(): Chainable<Element>;
            modalOpenClose(toggle: string, title: string, toggleType?: string): Chainable<Element>;
        }
    }
}

// import {buildUser} from '../support/generate'

// Cypress.Commands.add('createUser', overrides => {
//   const user = buildUser(overrides)
//   cy.request({
//     url: 'http://localhost:3000/register',
//     method: 'POST',
//     body: user,
//   }).then(response => ({...response.body.user, ...user}))
// })

// generate.ts
// import {build, fake} from 'test-data-bot'

// const buildUser = build('User').fields({
//   username: fake(f => f.internet.userName()),
//   password: fake(f => f.internet.password()),
// })

// export {buildUser}

Cypress.Commands.add('acceptTerms', () => {
    localStorage.setItem('termsOfUseAccepted', 'true');
});

Cypress.Commands.add('modalOpenClose', (toggle, title, toggleType = 'icon') => {
    if (toggleType === 'icon') {
        cy.get(`[aria-label="${toggle}"]`).click();
    } else {
        cy.findByText(toggle).click();
    }

    cy.wait(1000);
    cy.findByTestId('modal')
        .contains(title)
        .should('have.text', title)
        .get('[data-testid="modal-closer"] > button')
        .click();
});

// || cy.findByText(toggle)
