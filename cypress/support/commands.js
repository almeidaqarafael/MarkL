Cypress.Commands.add('criarTarefa', (nomeTarefa = '') => {
  cy.visit('http://localhost:3000')

  cy.get('input[placeholder="Add a new Task"]').as('inputTarefa')

  if(nomeTarefa !== '') {
    cy.get('@inputTarefa')
      .type(nomeTarefa)
  }

  cy.contains('button', 'Create')
    .click()
});

Cypress.Commands.add('isRequired', (mensagemAlvo) => {

  cy.get('@inputTarefa')
    .invoke('prop', 'validationMessage')
    .should((texto) => {
      expect(
        mensagemAlvo
      ).to.eq(texto)
  })
});

Cypress.Commands.add('removeTarefaPorNome', (nomeTarefa) => {
  cy.request({ 
    url: 'http://localhost:3333/helper/tasks',
    method: 'DELETE',
    body: { name: nomeTarefa }
  }).then(res => {
      expect(res.status).to.eq(204)
  });
});

Cypress.Commands.add('postTarefa', (tarefa) => {
  cy.request({ 
    url: 'http://localhost:3333/tasks',
    method: 'POST',
    body: tarefa
  }).then(res => {
    expect(res.status).to.eq(201)
});
});