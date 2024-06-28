/// <reference types="Cypress" /> 

describe('tarefas', () => {

  it('deve cadastrar uma nova tarefa', () => {
    cy.visit('http://localhost:3000')

    cy.get('input[placeholder="Add a new Task"]')
      .type('Comprar uma codorna')

    cy.contains('button', 'Create')
      .click()
  });

});