const projects = document.querySelector('.projects');

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
data.forEach(projet => {

    const projectCard = document.createElement('div');
    projectCard.classList.add('project-card');
    projects.appendChild(projectCard);

    const h3 = document.createElement('h3');
    h3.textContent = projet.title;
    projectCard.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = projet.description;
    projectCard.appendChild(p);

    const a = document.createElement('a');
    a.textContent = 'Voir le projet';
    a.href = projet.html;
    projectCard.appendChild(a);
    });
});