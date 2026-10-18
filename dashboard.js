const token = localStorage.getItem('accessToken');
if (!token) {
    window.location.href = 'index.html';
}
const logout = document.querySelector('#logout');
logout.addEventListener('click', function() {
    localStorage.removeItem('accessToken');
    window.location.href = 'index.html';
});
fetch('http://localhost:3000/projects', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`
    }
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});