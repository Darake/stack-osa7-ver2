
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('user can login', function() {
    cy.get('#username')
      .type('user')
    cy.get('#password')
      .type('user')
    cy.contains('Kirjaudu')
      .click()
    cy.contains('user logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username')
        .type('user')
      cy.get('#password')
        .type('user')
      cy.contains('Kirjaudu')
        .click()
    })

    it('user can logout', function() {
      cy.contains('Log out')
        .click()
      cy.contains('Log in to application')
    })
  })
})