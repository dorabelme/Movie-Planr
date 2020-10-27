describe('searchForm works as expected', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
  })
  it('inputting an address gives that same address', () => {
    cy.get('.searchForm')
      .type('Polk & Larkin Streets')
    cy.get('.ant-select-item-option-content').contains('Polk & Larkin Streets')
  })
})
