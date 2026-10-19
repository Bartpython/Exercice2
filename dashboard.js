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
    a.href = 'project.html?id=' + projet.id;
    projectCard.appendChild(a);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Supprimer';
    projectCard.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
    if (!confirm('Supprimer ce projet ?')) {
        return;   // l'utilisateur a annulé
    }

    fetch('http://localhost:3000/projects/' + projet.id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            projectCard.remove();   // retire la carte de la page
        } else {
            console.error('Suppression refusée :', response.status);
        }
    })
    .catch(err => {
        console.error('Error:', err);
    });
});
    });
});