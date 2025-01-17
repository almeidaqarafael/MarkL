/// <reference types="Cypress" /> 

describe('tarefas', () => {

  let testData; 

  before(() => {
    cy.fixture("tasks").then(tarefa => {
      testData = tarefa
    });

  })

  context('cadastro', () => {
    it('deve cadastrar uma nova tarefa', () => {

      const nomeTarefa = 'Comprar uma codorna'
  
      cy.removeTarefaPorNome(nomeTarefa)
      cy.criarTarefa(nomeTarefa)
  
      cy.contains('main div p', nomeTarefa)
        .should('be.visible')
    });
  
    it('não deve permitir tarefa duplicada', () => {
  
      const tarefa = testData.duplicacao
      
      cy.removeTarefaPorNome(tarefa.name)
      cy.postTarefa(tarefa)
      cy.criarTarefa(tarefa.name)
  
      cy.get('.swal2-html-container')
        .should('be.visible')
        .should('have.text', 'Task already exists!')
    });
  
    it('campo obrigatório', () => {
  
      cy.criarTarefa()
      cy.isRequired('This is a required field')
    });

  });

  context('atualização', () => {

    it('deve concluir uma tarefa', () => {
      
      const nomeTarefa = {
        name: 'Comprar ração para codorna', 
        is_done: false
      }

      cy.removeTarefaPorNome(nomeTarefa.name)
      cy.postTarefa(nomeTarefa)
      
      cy.visit('/')
      cy.contains('p', nomeTarefa.name)
        .parent()
        .find('button[class*=ItemToggle]')
        .click()

      cy.contains('p', nomeTarefa.name)
        .should('have.css', 'text-decoration-line', 'line-through')
    }); 
  });

  context('exclusão', () => {

    it('deve excluir uma tarefa', () => {
      
      const nomeTarefa = {
        name: 'Comprar uma codorna', 
        is_done: false
      }

      cy.removeTarefaPorNome(nomeTarefa.name)
      cy.postTarefa(nomeTarefa)
      
      cy.visit('/')
      cy.contains('p', nomeTarefa.name)
        .parent()
        .find('button[class*=ItemDelete]')
        .click()

      cy.contains('p', nomeTarefa.name)
        .should('not.exist')
    }); 
  });

});

