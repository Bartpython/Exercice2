const form = document.querySelector('#login-form');
const email = document.querySelector('#email'); // Sélection du champ de saisie de l'email par son ID
const password = document.querySelector('#password'); // Sélection du champ de saisie du mot de passe par son ID
const error = document.querySelector('#error'); // Sélection de l'élément d'affichage des erreurs par son ID
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    fetch('http://localhost:3000/Documents/Projet/routes.json', {
        method: 'POST',  // Méthode POST utilisée pour envoyer les données au serveur
        headers: {   // En-têtes pour indiquer le type de contenu
            'Content-Type': 'application/json'  // contenu envoyé est au format JSON
        },
        body: JSON.stringify({   // Corps de la requête contenant les données de l'utilisateur au format JSON chaine de caractères
            email: email.value,  // Email de l'utilisateur
            password: password.value  // Mot de passe de l'utilisateur
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.accesToken) {
            localStorage.setItem('accesToken', data.accesToken);  // Stocke le token d'accès dans le stockage local
            window.location.href = '/da.html';  // Redirige vers la page index après la connexion réussie
        } else {
            error.textContent = 'Échec de la connexion : ' + data.message;  // Affiche un message d'erreur en cas d'échec
        }
    });
});