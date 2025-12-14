/// <reference types="cypress" />

describe('Task App E2E', () => {
  const email = 'test@example.com';
  const password = '123456';

  it('logs in, creates, edits, marks done and deletes a task', () => {
    cy.visit('http://localhost:5173/login');

    // LOGIN
    cy.get('input[label="Email"]').type(email);
    cy.get('input[label="Contraseña"]').type(password);
    cy.get('button').contains('Iniciar sesión').click();

    // DEBERÍA REDIRECCIONAR A TASKS
    cy.url().should('include', '/tasks');

    // CREAR TASK
    cy.get('button').contains('Add New Task').click();
    cy.get('input[label="Título"]').type('Mi tarea de prueba');
    cy.get('input[label="Descripción"]').type('Descripción prueba');
    cy.get('button').contains('Crear').click();

    // VERIFICAR TASK CREADA
    cy.contains('Mi tarea de prueba').should('exist');

    // EDITAR TASK
    cy.get('button').contains('edit', { matchCase: false }).click();
    cy.get('input').first().clear().type('Mi tarea editada');
    cy.get('button').contains('save', { matchCase: false }).click();
    cy.contains('Mi tarea editada').should('exist');

    // MARCAR COMO DONE
    cy.get('input[type="checkbox"]').check();
    cy.get('input[type="checkbox"]').should('be.checked');

    // ELIMINAR TASK
    cy.get('button').contains('delete', { matchCase: false }).click();
    cy.contains('Mi tarea editada').should('not.exist');
  });
});
