// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add('signUp', (user) => { 
    cy.get('#signin2').click()
    cy.get('#signInModal').should('be.visible')
    cy.wait(1000)
    cy.get('#sign-username').type(user.userName,{delay:100})
    cy.get('#sign-password').type(user.password,{delay:100})
    cy.intercept('POST','https://api.demoblaze.com/signup').as('signUp')
    cy.get('button').contains('Sign up').click()
    cy.wait('@signUp').then((signUp)=>{
      expect(signUp.response.statusCode).to.be.eq(200)
      cy.on('window:alert', (text) => {
        expect(text).to.contains('Sign up successful.');
      });
    })
})
Cypress.Commands.add('login', (user) => { 
    cy.get('#login2').click() 
    cy.get('#logInModalLabel').should('be.visible')
    cy.wait(1000)
    cy.get('#loginusername').type(user.userName,{delay:100})
    cy.get('#loginpassword').type(user.password,{delay:100})
    cy.intercept('POST','https://api.demoblaze.com/login').as('login')
    cy.get('button').contains('Log in').click()
    cy.wait('@login').then((login)=>{
        expect(login.response.statusCode).to.be.eq(200)
        cy.get('#nameofuser').should('contain','Welcome ' + user.userName)
    })
})
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