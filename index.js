const loginForm = document.querySelector('#login-form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const error = document.querySelector('#error');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": email.value,
                "password": password.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = 'dashboard.html';
            }
            else {
                error.textContent = 'Identifiant invalide';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        })
});