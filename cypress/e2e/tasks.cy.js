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

  it('não deve permitir tarefa duplicada', () => {

    cy.request({ 
      url: 'http://localhost:3333/helper/tasks',
      method: 'DELETE',
      body: { name: 'Comprar uma casa para a codorna' }
    }).then(res => {
        expect(res.status).to.eq(204)
    });

    cy.request({ 
      url: 'http://localhost:3333/tasks',
      method: 'POST',
      body: { 
        name: 'Comprar uma casa para a codorna',
        is_done: false
       }
    }).then(res => {
      expect(res.status).to.eq(201)
  });

    cy.visit('http://localhost:3000')

    cy.get('input[placeholder="Add a new Task"]')
      .type('Comprar uma casa para a codorna')

    cy.contains('button', 'Create')
      .click()

    cy.get('.swal2-html-container')
      .should('be.visible')
      .should('have.text', 'Task already exists!')
  });

});