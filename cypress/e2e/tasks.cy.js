/// <reference types="Cypress" /> 

describe('tarefas', () => {

  it('deve cadastrar uma nova tarefa', () => {

    const nomeTarefa = 'Comprar uma codorna'

    cy.removeTarefaPorNome(nomeTarefa)
    cy.criarTarefa(nomeTarefa)

    cy.contains('main div p', nomeTarefa)
      .should('be.visible')
  });

  it('não deve permitir tarefa duplicada', () => {

    const tarefa = {
      name: 'Comprar uma casa para a codorna',
      is_done: false
    }
    
    cy.removeTarefaPorNome(tarefa.name)
    cy.postTarefa(tarefa)
    cy.criarTarefa(tarefa.name)

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!')
  });

});

