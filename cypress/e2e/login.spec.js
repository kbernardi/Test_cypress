describe('Login', () => {
    let user
    beforeEach(()=>{
        const userCreated = {
            userName : 'testUser' + String(new Date().getTime()).slice(-3),
            password: 'testUser'
        }  
        cy.visit('/');
        cy.signUp(userCreated)
        user = userCreated
    })
    it('Login', () => {
        cy.login(user)
    });

    it('Logout', () => {
        cy.login(user)
        cy.wait(1000)
        cy.click('#logout2')
        cy.get('#signin2').should('be.visible')
    });

    it('wrong User', () => {
        cy.get('#login2').click() 
        cy.get('#logInModalLabel').should('be.visible')
        cy.wait(1000)
        cy.get('#loginusername').type('WrongUser000',{delay:100})
        cy.get('#loginpassword').type('WrongUser000',{delay:100})
        cy.get('button').contains('Log in').click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('User does not exist');
        });    
    });
  });