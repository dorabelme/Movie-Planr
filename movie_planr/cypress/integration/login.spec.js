describe('Login page renders properly', () => {
    beforeEach(() => {
        cy.visit('localhost:3000')
    })
    it('contains company name', () => {
        cy.get('.ant-card-head-title').should('contain', 'Movie Route Planr')
        cy.get('.ant-card-head-title').should('have.css', 'color', 'rgb(24, 144, 255)')
    })
    it('contains welcome text', () => {
        cy.get('.ant-card-meta-title').should('contain', 'Please sign up or login!')
    })
    it('contains a Send button', () => {
        cy.get('button').should('contain', 'Send')
        cy.get('button').should('have.css', 'background-color', 'rgb(24, 144, 255)')
    })
    it('requires an email address and redirects to app', () => {
        cy.get('.ant-input').type('dbelme2@gmail.com')
        cy.get('button').click()
        cy.wait(1000)
        cy.url().should('eq', 'http://localhost:3000/app')
        cy.get('.ant-layout-header').contains('Movie Route Planr')
    })
});
