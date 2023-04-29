describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({
      'username': 'testuser',
      'name': 'Test User',
      'password': 'password'
    })
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

    describe('And a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'Cypress Blog', author: 'Mr. Cypress', url: 'cypress.io' })
      })

      it('A user can like a blog', function(){
        cy.get('.blogDetailsBtn').click()
        cy.get('.blogLikes').contains('likes 0')
        cy.get('.blogLikeBtn').click()
        cy.get('.blogLikes').contains('likes 1')
      })

      it('A user can delete his blog', function() {
        cy.get('.blogDetailsBtn').click()
        cy.get('.blog').contains('remove').click()

        cy.get('.blog').should('not.exist')
      })

      describe('A second user', function() {
        beforeEach(function() {
          cy.createUser({
            'username': 'testuser2',
            'name': 'Test2 User',
            'password': 'password2'
          })
          cy.login({ username: 'testuser2', password: 'password2' })
        })

        it.only('can not see remove button', function() {
          cy.get('.blogDetailsBtn').click()
          cy.get('.blog').contains('remove').should('not.exist')
        })
      })
    })
  })
})