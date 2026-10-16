const projectForm = document.querySelector('#project-form'); // Sélection du formulaire de création de projet par son ID
const projectName = document.querySelector('#project-name'); // Sélection du champ de saisie du titre/nom du projet par son ID
const projectDescription = document.querySelector('#project-description'); // Sélection du champ de saisie de la description du projet par son ID
const error = document.querySelector('#error'); // Sélection de l'élément pour afficher les messages d'erreur par son ID

projectForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    if (projectName.value.length <= 3) {
        error.textContent = 'Le nom du projet doit contenir au moins 3 caractères.';
        return; // sort de la fonction si le nom du projet est trop court
    }

    fetch('http://localhost:3000/projects', {
        method: 'POST', // POST utilisé pour créer un nouveau projet, envoyer les données au serveur
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token'), // Ajoute le token d'authentification dans les en-têtes
            'Content-Type': 'application/json' // Indique que le corps de la requête est au format JSON
        },
        body: JSON.stringify({  // Convertit les données du projet en JSON pour l'envoi au serveur
            name: projectName.value,  // Nom du projet
            description: projectDescription.value  // Description du projet
        })
    })
    .then(response => response.json())  // Convertit la réponse du serveur en JSON
    .then(project => {  // Traite les données renvoyées par le serveur
        console.log('Projet créé avec succès:', project); // Affiche le projet créé dans la console
        window.location.href = '/project.html?id=' + project.id; // Redirige vers la page du tableau de bord après la création du projet avec l'ID du projet dans l'URL 
    })
});
