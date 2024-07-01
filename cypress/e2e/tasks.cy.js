/// <reference types="Cypress" /> 

describe('tarefas', () => {

  it('deve cadastrar uma nova tarefa', () => {

    const nomeTarefa = 'Comprar uma codorna'

    cy.request({ 
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: nomeTarefa }
    }).then(res => {
        expect(res.status).to.eq(204)
    });
    
    cy.visit('http://localhost:3000')

    cy.get('input[placeholder="Add a new Task"]')
      .type(nomeTarefa)

    cy.contains('button', 'Create')
      .click()

    cy.contains('main div p', nomeTarefa)
      .should('be.visible')
  });

  it('não deve permitir tarefa duplicada', () => {

    const tarefa = {
      name: 'Comprar uma casa para a codorna',
      is_done: false
    }

    cy.request({ 
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: tarefa.name }
    }).then(res => {
        expect(res.status).to.eq(204)
    });

    cy.request({ 
      url: 'http://localhost:3333/tasks',
      method: 'POST',
      body: tarefa
    }).then(res => {
      expect(res.status).to.eq(201)
  });

    cy.visit('http://localhost:3000')

    cy.get('input[placeholder="Add a new Task"]')
      .type(tarefa.name)

    cy.contains('button', 'Create')
      .click()

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!')
  });

});