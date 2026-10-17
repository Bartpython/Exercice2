const form = document.querySelector('#register-form');
const nameinput = document.querySelector('#name'); // Sélection du champ de saisie du nom par son ID
const email = document.querySelector('#email'); // Sélection du champ de saisie de l'email par son ID
const password = document.querySelector('#password'); // Sélection du champ de saisie du mot de passe par son ID
const error = document.querySelector('#error'); // Sélection de l'élément d'affichage des erreurs par son ID

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

    if(nameinput.value.length < 3) {
        fetch('http://localhost:3000/Documents/Projet/routes.json/resister', {  // Fetch appel l'API pour enregistrer un nouvel utilisateur
            method: 'POST',  // Méthode POST utilisée pour envoyer les données au serveur
            headers: {   // En-têtes pour indiquer le type de contenu
                'Content-Type': 'application/json'  // contenu envoyé est au format JSON
            },
            body: JSON.stringify({   // Corps de la requête contenant les données de l'utilisateur au format JSON chaine de caractères
                name: nameinput.value,  // Nom de l'utilisateur
                email: email.value,  // Email de l'utilisateur
                password: password.value  // Mot de passe de l'utilisateur
            })
            .then(() => 
                window.location.href = '/index.html'  // Redirige vers la page index après l'enregistrement
            ),
        });
        error.textContent = 'Le nom doit contenir au moins 3 caractères.';
    } else if(email.value.length < 3) {
        error.textContent = 'L\'email doit contenir au moins 3 caractères.';
    } else if(password.value.length < 5) {
        error.textContent = 'Le mot de passe doit contenir au moins 5 caractères.';
    } else {
        error.textContent = '';
    }
});
