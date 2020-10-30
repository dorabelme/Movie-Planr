describe("Map", () => {
    beforeEach(() => {
        cy.visit('localhost:3000/app')
    })

    it('contains marker with a popover value from the list', () => {
        cy.wait(2000);
        cy.get('area[title="20th and Folsom Streets"]').should('exist');
    })
});