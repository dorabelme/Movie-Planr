describe('Navbar renders properly', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/app')
    })
    it('contains company name', () => {
        cy.get('.Navbar').last().should('contain', 'Movie Route Planr')
    })
})

