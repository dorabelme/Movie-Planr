describe('searchForm works as expected', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/app')
  })
  it('Searching for a place and selecting it adds the place to the itinerary and clicking the trash icon removes it from the itinerary', () => {
    cy.get('.searchForm').type('Polk & Larkin Streets')
    cy.get('.ant-select-item-option-content').contains('Polk & Larkin Streets').click()
    cy.get('.ant-timeline-item-content > div > h3').contains('Polk & Larkin Streets')
    cy.get('.Place-buttons > button').click();
    cy.get('.PlaceList').contains('Polk & Larkin Streets').should('not.exist');
  })
})
