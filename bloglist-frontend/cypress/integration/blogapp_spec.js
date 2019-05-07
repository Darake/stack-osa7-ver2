
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'user',
      username: 'user',
      password: 'user'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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

    it('a new blog can be created', function() {
      cy.contains('New blog')
        .click()
      cy.get('#title')
        .type('A new blog')
      cy.get('#author')
        .type('Cypress')
      cy.get('#url')
        .type('www.cypress.com')
      cy.get('#createBlog')
        .click()
      cy.contains('A new blog by Cypress')
    })

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.contains('New blog')
          .click()
        cy.get('#title')
          .type('A new blog')
        cy.get('#author')
          .type('Cypress')
        cy.get('#url')
          .type('www.cypress.com')
        cy.get('#createBlog')
          .click()
        cy.contains('A new blog by Cypress')
        cy.get('#blogView')
          .contains('A new blog by Cypress')
          .click()
      })

      it('it can be liked', function() {
        cy.contains('Like')
          .click()
        cy.contains('1 likes')
      })

      it('it can be commented', function() {
        cy.get('input')
          .type('Comment by Cypress')
        cy.contains('Add comment')
          .click()
        cy.contains('Comment by Cypress')
      })

      it('it can be removed', function() {
        cy.reload()
        cy.contains('Remove')
          .click()
        cy.contains('A new blog by Cypress')
          .should('not.exist')
      })
    })
  })
})