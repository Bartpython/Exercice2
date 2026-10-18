const registerForm = document.querySelector('#register-form');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');

registerForm.addEventListener('submit', function(event) {
    event.preventDefault();
    if (nameInput.value.length >= 3 && email.value.length >= 3 && password.value.length >= 5) {
        error.textContent = '';
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": nameInput.value,
                "email": email.value,
                "password": password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

        window.location.href = 'index.html';
        
    } else { 
        error.textContent = 'Veillez saisir les champs nom et email avec au moins 3 caractères et le mot de passe avec au moins 5 caractères.';
    }
});