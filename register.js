const registerform = document.querySelector('#register-form'); // Sélection du formulaire d'inscription par son ID
const nameinput = document.querySelector('#name'); // Sélection du champ de saisie du nom par son ID
const email = document.querySelector('#email'); // Sélection du champ de saisie de l'email par son ID
const password = document.querySelector('#password'); // Sélection du champ de saisie du mot de passe par son ID
const error = document.querySelector('#error'); // Sélection de l'élément d'affichage des erreurs par son ID

registerform.addEventListener('submit', function(event) { // Gestion de la soumission du formulaire , appelant un événement
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
      if(nameinput.value.length >= 3 && email.value.length >= 3 && password.value.length >= 5) { // Vérifie si le nom au moins 3 caractères, l'email au moins 3 caractères et le mot de passe au moins 5 caractères
        // Logique à exécuter si tous les champs sont valides
    } else {
        error.textContent = 'Veuillez remplir correctement tous les champs avec minimum 5 caractères requis'; // Affiche un message d'erreur si les champs ne sont pas valides
    }
});