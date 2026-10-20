/**
 * @jest-environment jsdom
 */

require('jest');

// Préparer
test('affiche une erreur si le nom est inférieur à 4 caractères', () => {
    document.body.innerHTML = 
    '<form id="project-form">' +
      '<input id="project-name" type="text" placeholder="Nom du projet" required>' +
      '<textarea id="project-description" rows="4" placeholder="Description"></textarea>' +
      '<p id="error"></p>' +
      '<button type="submit">Créer</button>' +
    '</form>';
    require('../create-project.js');
    
    let nameInput = document.querySelector('#project-name');
    let descriptionInput = document.querySelector('#project-description');
    let error = document.querySelector('#error');
    let form = document.querySelector('#project-form');

// Agir
    nameInput.value = 'abc';
    form.dispatchEvent(new Event('submit'));

// Vérifier
    expect(error.textContent).toBe('Le nom du projet doit comporter au moins 4 caractères.');
});