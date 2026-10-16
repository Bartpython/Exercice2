const accesToken = localStorage.getItem('accesToken');  // Récupère le token d'accès depuis le stockage local
const logoutButton = document.querySelector('#logout'); // Sélection du bouton de déconnexion par son ID
const projectsContainer = document.querySelector('#projects'); // Sélection de l'élément conteneur des projets par son ID

logoutButton.addEventListener('click', function() {
    localStorage.removeItem('accesToken');  // Supprime le token d'accès du stockage local
    window.location.href = '/index.html';  // Redirige vers la page de connexion
});
fetch('http://localhost:3000/projects', {
    method: 'GET',  // Méthode GET utilisée pour récupérer les projets , nécessite un token d'accès pour l'authentification
    headers: {
        'Authorization': 'Bearer ' + accesToken  // Ajoute le token d'accès dans les en-têtes pour l'authentification
    }
})
    .then(response => response.json())
    .then(data => {
        console.log(data);  // Affiche les projets récupérés dans la console
        projectsContainer.innerHTML = '';  // Vide le conteneur des projets avant d'ajouter les nouveaux
        data.forEach(project => {
            const projectElement = document.createElement('div');  // Crée un nouvel élément (balise div) pour chaque projet
            projectElement.textContent = project.title;  // Définit le contenu textuel de l'élément avec le titre du projet
            projectsContainer.appendChild(projectElement);  // Ajoute l'élément du projet au conteneur des projets
            const h3 = document.createElement('h3');  // Crée un élément h3 pour le nom du projet
            h3.textContent = project.name;  // Définit le contenu textuel de l'élément h3 avec le nom du projet
            projectElement.appendChild(h3);  // Ajoute l'élément h3 au conteneur du projet
            const p = document.createElement('p');  // Crée un élément p pour la description du projet
            p.textContent = project.description;  // Définit le contenu textuel de l'élément p avec la description du projet
            projectElement.appendChild(p);  // Ajoute l'élément p au conteneur du projet
            const a = document.createElement('a');  // Crée un élément a pour le lien du projet
            a.textContent = 'Voir le projet';  // Définit le texte du lien
            a.href = project.html + '?id=' + project.id;  // Définit l'URL du lien avec l'URL du projet et l'ID du projet dans l'URL
            projectElement.appendChild(a);  // Ajoute l'élément a au conteneur du projet
        });
    });