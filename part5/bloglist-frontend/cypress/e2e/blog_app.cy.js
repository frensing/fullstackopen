describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      'username': 'testuser',
      'name': 'Test User',
      'password': 'password'
    })
    cy.visit('http://localhost:3000')
  })

  it('5.17 - front page can be opened and shows login', () => {
    cy.contains('log in to application')
    cy.contains('username:')
    cy.contains('password:')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('password')
      cy.get('#loginBtn').click()

      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testuser')
      cy.get('#password').type('wrong')
      cy.get('#loginBtn').click()

      cy.contains('Wrong credentials').should('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Test User logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('.newTitleInp').type('A Cypress Blog')
      cy.get('.newAuthorInp').type('Test Author')
      cy.get('.newUrlInp').type('cypress.io')
      cy.get('.subBtn').click()

      cy.contains('A Cypress Blog')
    })
  })
})