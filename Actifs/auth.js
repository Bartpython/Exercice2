const token = localStorage.getItem('token'); // Récupère le token d'authentification depuis le stockage local
if (!token) {
    window.location.href = 'login.html'; // Redirige vers la page de connexion si le token n'existe pas
}
