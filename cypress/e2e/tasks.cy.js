/// <reference types="Cypress" /> 

describe('tarefas', () => {

  it('deve cadastrar uma nova tarefa', () => {

    cy.request({ 
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: 'Comprar uma codorna' }
    }).then(res => {
        expect(res.status).to.eq(204)
    });
    
    cy.visit('http://localhost:3000')

    cy.get('input[placeholder="Add a new Task"]')
      .type('Comprar uma codorna')

    cy.contains('button', 'Create')
      .click()

    cy.contains('main div p', 'Comprar uma codorna')
      .should('be.visible')
  });

});