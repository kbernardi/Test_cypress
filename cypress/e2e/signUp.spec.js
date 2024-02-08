describe('create new user', () => {
  before(()=>{
    cy.visit('/');
  })
  it('SingUp', () => {
    const user = {
      userName : 'testUser' + new Date().getTime(),
      password: 'testUser'
    }
    cy.signUp(user)
  });
});