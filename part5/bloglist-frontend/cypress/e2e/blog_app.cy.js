

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#login-button').should('contain', 'login')
  })

  it('Login succeds', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('salainen')
    cy.get('#login-button').click()
    cy.contains('Matti Luukkainen logged in')
  })

  it('Login fails', function () {
    cy.get('#username').type('mluukkai')
    cy.get('#password').type('wrongpass')
    cy.get('#login-button').click()
    cy.get('.notification').should('contain', 'wrong name or password')
    cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
      cy.createBlog({
        title: 'Writing react documentation',
        author: 'Dan Abramov',
        url: 'reactjs.com',
      })
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('the evolution of AI')
      cy.get('#author').type('Peter Norvig')
      cy.get('#url').type('www.ai.com')
      cy.get('#new-blog').click()
      cy.contains('the evolution of AI - Peter Norvig')
    })

    it('a blog can be liked', function () {
      cy.contains('show').click()
      cy.get('.likes').click()
      cy.get('.likes-value').should('contain', '1')
    })

    it('a blog can be deleted', function () {
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.get('.notification').should(
        'contain',
        'Deleted Writing react documentation'
      )
    })

    it('a blog can be deleted only for the user who created it', function () {
      cy.contains('logout').click()
      cy.createUser({
        name: 'Monkey D. Luffy',
        username: 'luffy',
        password: 'sereirei',
      })
      cy.login({ username: 'luffy', password: 'sereirei' })
      cy.contains('show').click()
      cy.contains('remove').click()
      cy.get('.notification').should('contain', 'User invalid')
      cy.contains('logout').click()
    })

    it('blogs are ordered by number of likes', function () {
      cy.createBlog({
        title: 'the evolution of AI',
        author: 'Peter Novig',
        url: 'www.ai.com',
      })
      cy.createBlog({
        title: 'the evolution of Neural Networks',
        author: 'Reaktor',
        url: 'www.reaktor.com',
      })
      cy.get('.blog').eq(1).as('blogLiked')
      cy.get('.blog').eq(1).contains('show').click()
      cy.get('.blog').eq(1).contains('like').click()
      cy.wait(500)
      cy.get('.blog').eq(0).should('contain', 'the evolution of AI - Peter Novig')
      cy.get('.blog').eq(1).should('contain', 'Writing react documentation')
      cy.get('.blog')
        .eq(2)
        .should('contain', 'the evolution of Neural Networks')
    })
  })
})
